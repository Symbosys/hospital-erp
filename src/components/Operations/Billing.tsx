import { useState, useMemo } from "react";
import {
  useBillingRecords,
  useCreateBilling,
  useUpdateBilling,
  type BillingRecord,
} from "../../config/hooks/operations.hooks";
import { usePatients } from "../../config/hooks/patient.hooks";

// --- Design Tokens ---
const STATUS_VARIANTS = {
  Paid: "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-500/10",
  Pending: "bg-amber-50 text-amber-600 border-amber-100 shadow-amber-500/10",
  Partial: "bg-blue-50 text-blue-600 border-blue-100 shadow-blue-500/10",
  Waived: "bg-slate-50 text-slate-400 border-slate-100 shadow-slate-500/10",
};

const CATEGORY_ICONS: Record<string, string> = {
  Consultation: "🩺",
  Surgery: "🔪",
  Lab: "🔬",
  Pharmacy: "💊",
  Room: "🏥",
};

// --- Currency Formatter ---
const fmt = (n: number) => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

// ─── Create Invoice Modal ──────────────────────────────────────────────────
function InvoiceModal({ onClose }: { onClose: () => void }) {
  const createBill = useCreateBilling();
  const { data: patients = [] } = usePatients();
  const [form, setForm] = useState({
    billId: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
    patientId: "",
    amount: "",
    category: "Consultation" as BillingRecord["category"],
    status: "Pending" as BillingRecord["status"],
    paymentMode: "Cash" as string,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBill.mutateAsync({
        ...form,
        amount: Number(form.amount),
      } as any);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl p-10 relative overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-outfit tracking-tighter">
              New <span className="text-blue-600 italic">Bill.</span>
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
              Transaction Node Authorization
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-8 relative z-10"
        >
          <div className="col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">
              Entity Selection
            </label>
            <select
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
              value={form.patientId}
              onChange={(e) => setForm({ ...form, patientId: e.target.value })}
              required
            >
              <option value="">Search Patient Registry...</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.patientId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">
              Gross Amount
            </label>
            <input
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="₹ 0.00"
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">
              Fiscal Category
            </label>
            <select
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-500 transition-all"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value as any })
              }
            >
              <option>Consultation</option>
              <option>Surgery</option>
              <option>Lab</option>
              <option>Pharmacy</option>
              <option>Room</option>
            </select>
          </div>

          <div className="col-span-2 pt-4">
            <button
              disabled={createBill.isPending}
              className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-[11px] uppercase tracking-[4px] shadow-2xl shadow-slate-900/20 hover:-translate-y-1 active:scale-95 transition-all"
            >
              {createBill.isPending
                ? "Configuring Ledger..."
                : "Commit Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main View ─────────────────────────────────────────────────────────────
export function Billing() {
  const [showAdd, setShowAdd] = useState(false);
  const { data: billing = [], isLoading } = useBillingRecords();
  const updateBill = useUpdateBilling();

  // Metrics
  const realized = useMemo(
    () => billing.reduce((s, b) => s + b.paidAmount, 0),
    [billing],
  );
  const receivables = useMemo(
    () => billing.reduce((s, b) => s + (b.amount - b.paidAmount), 0),
    [billing],
  );
  const velocity = useMemo(() => {
    const paid = billing.filter((b) => b.status === "Paid").length;
    return billing.length > 0 ? Math.round((paid / billing.length) * 100) : 0;
  }, [billing]);

  const handleSettle = async (b: BillingRecord) => {
    try {
      await updateBill.mutateAsync({
        id: b.id,
        status: "Paid",
        paidAmount: b.amount,
        paymentMode: b.paymentMode ?? "Cash",
      });
    } catch {}
  };

  return (
    <div className="space-y-12 animate-fade max-w-[1500px] mx-auto pb-24">
      {showAdd && <InvoiceModal onClose={() => setShowAdd(false)} />}

      {/* --- Immersive Header --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-white p-12 rounded-[50px] border border-slate-200/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>{" "}
              Revenue Node Active
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[4px]">
              V4.0 Operational
            </span>
          </div>
          <h1 className="text-5xl font-black font-outfit text-slate-900 tracking-tighter leading-none">
            Institutional{" "}
            <span className="text-blue-600 italic">Capital Flow.</span>
          </h1>
          <p className="text-slate-400 font-medium mt-4 max-w-xl text-[1.05rem]">
            Real-time management of clinical settlements, insurance
            reconciliations, and departmental revenue streams.
          </p>
        </div>

        <div className="flex gap-4 relative z-10">
          <button className="px-10 py-5 bg-white border border-slate-200 rounded-[30px] font-black text-[11px] uppercase tracking-widest text-slate-900 hover:bg-slate-50 transition-all shadow-sm">
            Export Audit Trail
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="px-10 py-5 bg-slate-900 text-white rounded-[30px] font-black text-[11px] uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-slate-900/10"
          >
            + New Transaction
          </button>
        </div>
      </div>

      {/* --- Command Center Metrics --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {[
          {
            label: "Realized Assets",
            val: fmt(realized),
            trend: "+12.5%",
            color: "blue",
          },
          {
            label: "Awaiting Settlement",
            val: fmt(receivables),
            trend: "Critical",
            color: "rose",
          },
          {
            label: "Collection Velocity",
            val: `${velocity}%`,
            trend: "Optimal",
            color: "emerald",
          },
          {
            label: "TPA Reconciliations",
            val: "14 Nodes",
            trend: "Active",
            color: "violet",
          },
        ].map((m, i) => (
          <div
            key={i}
            className="bg-white p-10 rounded-[48px] border border-slate-200/50 shadow-sm group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-700"
          >
            <div className="flex justify-between items-start mb-8">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {m.label}
              </span>
              <span
                className={`text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter ${m.color === "emerald" ? "bg-emerald-50 text-emerald-600" : m.color === "rose" ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"}`}
              >
                {m.trend}
              </span>
            </div>
            <div className="text-4xl font-black font-outfit text-slate-900 tracking-tight">
              {m.val}
            </div>
            <div
              className={`h-1 w-12 rounded-full mt-6 ${m.color === "blue" ? "bg-blue-500" : m.color === "rose" ? "bg-rose-500" : m.color === "emerald" ? "bg-emerald-500" : "bg-violet-500"}`}
            ></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* --- Unified Ledger Node --- */}
        <div className="col-span-12 xl:col-span-8 bg-white rounded-[60px] border border-slate-200/40 shadow-sm overflow-hidden flex flex-col">
          <div className="p-12 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-2xl font-black font-outfit text-slate-900 tracking-tight italic">
              Unified Ledger.
            </h3>
            <div className="flex bg-slate-50 p-2 rounded-2xl gap-2 border border-slate-100">
              <button className="px-6 py-2 bg-white rounded-xl shadow-sm text-[10px] font-black text-blue-600 uppercase tracking-widest">
                Active Stream
              </button>
              <button className="px-6 py-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900">
                Historical
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-50/30">
                  <th className="px-12 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[4px]">
                    Transaction Entity
                  </th>
                  <th className="px-12 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[4px]">
                    Spectral Node
                  </th>
                  <th className="px-12 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[4px]">
                    Gross Capital
                  </th>
                  <th className="px-12 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[4px]">
                    Status
                  </th>
                  <th className="px-12 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[4px] text-right">
                    Ops
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan={5} className="px-12 py-10">
                          <div className="h-6 bg-slate-50 rounded-lg w-full"></div>
                        </td>
                      </tr>
                    ))
                ) : billing.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-24 text-center">
                      <div className="text-slate-300 font-black italic uppercase tracking-[8px] opacity-30">
                        Zero Transactions Detected
                      </div>
                    </td>
                  </tr>
                ) : (
                  billing.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-slate-50/50 transition-all group"
                    >
                      <td className="px-12 py-10">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shadow-inner">
                            {CATEGORY_ICONS[b.category] || "📄"}
                          </div>
                          <div>
                            <div className="text-sm font-black text-slate-900 uppercase">
                              {b.patient?.name}
                            </div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">
                              {b.billId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <span className="px-4 py-2 bg-slate-100 text-[10px] font-black text-slate-500 rounded-xl uppercase tracking-widest">
                          {b.category}
                        </span>
                      </td>
                      <td className="px-12 py-10">
                        <div className="text-lg font-black font-outfit text-slate-900 tracking-tight">
                          {fmt(b.amount)}
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase">
                          Settled: {fmt(b.paidAmount)}
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        <span
                          className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[2px] border ${STATUS_VARIANTS[b.status as keyof typeof STATUS_VARIANTS]}`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="px-12 py-10 text-right">
                        {b.status !== "Paid" ? (
                          <button
                            onClick={() => handleSettle(b)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[9px] uppercase tracking-[3px] shadow-lg shadow-blue-200 hover:scale-[1.05] active:scale-95 transition-all"
                          >
                            Settle Flow
                          </button>
                        ) : (
                          <div className="w-10 h-10 inline-flex items-center justify-center bg-emerald-50 text-emerald-500 rounded-full">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Side Insights Desk --- */}
        <div className="col-span-12 xl:col-span-4 space-y-10">
          <div className="bg-slate-900 rounded-[60px] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full -mr-40 -mt-40 blur-[80px]"></div>
            <h4 className="text-3xl font-black font-outfit mb-4">
              Insurance{" "}
              <span className="text-blue-400 italic font-medium">
                Clearance.
              </span>
            </h4>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-10 leading-relaxed">
              External TPA node verification and automated claims
              reconciliation.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { name: "ICICI Lombard", stat: "Connected", code: "TH-092" },
                { name: "Star Health", stat: "Syncing", code: "TH-411" },
                { name: "HDFC ERGO", stat: "Standby", code: "TH-001" },
              ].map((tpa, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-6 bg-white/5 rounded-[30px] border border-white/5 hover:border-white/20 transition-all cursor-pointer"
                >
                  <div className="text-xs font-black tracking-tight">
                    {tpa.name}
                  </div>
                  <div className="text-[9px] font-black text-blue-400 uppercase">
                    {tpa.stat}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-5 bg-white text-slate-900 rounded-[28px] font-black text-[10px] uppercase tracking-[5px] hover:scale-[1.02] transition-all">
              Connect Provider
            </button>
          </div>

          <div className="bg-white rounded-[60px] p-12 border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h4 className="text-xl font-black font-outfit text-slate-900 mb-8 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
                !
              </span>{" "}
              Audit Control
            </h4>
            <p className="text-slate-400 text-xs font-medium leading-relaxed mb-8">
              System detected{" "}
              <span className="text-rose-600 font-black">
                {billing.filter((b) => b.status === "Pending").length}{" "}
                outstanding records
              </span>{" "}
              requiring immediate administrative oversight to prevent fiscal
              leakage.
            </p>
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-[9px] uppercase tracking-widest border border-rose-100 italic">
                Flag Overdue
              </button>
              <button className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-[9px] uppercase tracking-widest italic">
                Ignore View
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-10">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[10px]">
          Institutional Fiscal Backbone &bull; V4.0 Stable Node
        </p>
      </div>
    </div>
  );
}
