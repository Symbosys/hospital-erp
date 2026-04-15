import { useState } from "react";
import { useBillingRecords, useCreateBilling, useUpdateBilling, type BillingRecord } from "../../config/hooks/operations.hooks";
import { usePatients } from "../../config/hooks/patient.hooks";

const STATUS_STYLE: Record<string, string> = {
  Paid: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Partial: "bg-blue-50 text-blue-600",
  Waived: "bg-slate-50 text-slate-400",
};

// ─── Create Bill Modal ────────────────────────────────────────────────────────
function CreateBillModal({ onClose }: { onClose: () => void }) {
  const createBill = useCreateBilling();
  const { data: patients = [] } = usePatients();
  const [form, setForm] = useState({
    billId: "", patientId: "", amount: "",
    category: "Consultation" as BillingRecord["category"],
    status: "Pending" as BillingRecord["status"],
    paymentMode: "" as string,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createBill.mutateAsync({
        ...form,
        amount: Number(form.amount),
        paymentMode: form.paymentMode || null,
      } as any);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to create billing record.");
    }
  };

  const inputCls = "w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all";
  const labelCls = "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block";

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl p-10 animate-fade">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-black text-slate-900">Create New Invoice</h2>
        </div>
        {error && <div className="mb-6 px-5 py-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <div><label className={labelCls}>Bill ID</label><input className={inputCls} placeholder="BILL-5001" value={form.billId} onChange={(e) => setForm({ ...form, billId: e.target.value })} required /></div>
          <div>
            <label className={labelCls}>Patient</label>
            <select className={inputCls} value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} required>
              <option value="">Select patient...</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Amount (₹)</label><input className={inputCls} type="number" placeholder="5000" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required /></div>
          <div>
            <label className={labelCls}>Category</label>
            <select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as BillingRecord["category"] })}>
              <option>Consultation</option><option>Surgery</option><option>Lab</option><option>Pharmacy</option><option>Room</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as BillingRecord["status"] })}>
              <option>Pending</option><option>Paid</option><option>Partial</option><option>Waived</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Payment Mode</label>
            <select className={inputCls} value={form.paymentMode} onChange={(e) => setForm({ ...form, paymentMode: e.target.value })}>
              <option value="">—</option><option>Cash</option><option>Card</option><option>Insurance</option><option>UPI</option>
            </select>
          </div>
          <div className="col-span-2 flex gap-4 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-500 font-black text-sm hover:bg-slate-50 transition-all">Cancel</button>
            <button type="submit" disabled={createBill.isPending} className="flex-1 py-4 rounded-2xl bg-blue-600 text-white font-black text-sm shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 transition-all disabled:opacity-60">
              {createBill.isPending ? "Creating..." : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Billing() {
  const [billingMode, setBillingMode] = useState("All");
  const [showAdd, setShowAdd] = useState(false);

  const statusParam = billingMode !== "All" ? billingMode : undefined;
  const { data: billing = [], isLoading } = useBillingRecords(statusParam ? { status: statusParam } : undefined);
  const updateBill = useUpdateBilling();

  const totalRevenue = billing.reduce((s, b) => s + b.paidAmount, 0);
  const totalPending = billing.filter(b => b.status === "Pending" || b.status === "Partial").reduce((s, b) => s + (b.amount - b.paidAmount), 0);
  const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString()}`;

  const financialMetrics = [
    { label: "Collected Revenue", value: isLoading ? "..." : fmt(totalRevenue), trend: `${billing.filter(b => b.status === "Paid").length} paid bills`, color: "blue" },
    { label: "TPA Pending", value: billing.filter(b => b.paymentMode === "Insurance" && b.status !== "Paid").length + " Cases", trend: `${fmt(totalPending)} value`, color: "rose" },
    { label: "Outstanding Dues", value: isLoading ? "..." : fmt(totalPending), trend: `${billing.filter(b => b.status === "Pending").length} invoices`, color: "amber" },
    { label: "Collections", value: billing.filter(b => b.status === "Paid").length + " Cleared", trend: billing.length > 0 ? `${Math.round((billing.filter(b => b.status === "Paid").length / billing.length) * 100)}% Realized` : "0%", color: "emerald" },
  ];

  const handleMarkPaid = async (b: BillingRecord) => {
    try {
      await updateBill.mutateAsync({ id: b.id, status: "Paid", paidAmount: b.amount, paymentMode: b.paymentMode ?? "Cash" });
    } catch {}
  };

  return (
    <>
      {showAdd && <CreateBillModal onClose={() => setShowAdd(false)} />}

      <div className="space-y-8 animate-fade">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialMetrics.map((item, id) => (
            <div key={id} className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                  <h4 className="text-2xl font-outfit font-black text-slate-900 mt-2">{item.value}</h4>
                </div>
                <div className={`w-3 h-3 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] ${item.color === 'blue' ? 'bg-blue-500' : item.color === 'rose' ? 'bg-rose-500' : item.color === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500">{item.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Live Billing Table */}
          <div className="col-span-12 xl:col-span-8 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden text-black">
            <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="font-outfit font-black text-2xl text-slate-900">Unified <span className="text-blue-500 italic">Invoicing.</span></h3>
                <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Live Billing Registry</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
                  {["All", "Pending", "Paid", "Partial"].map((mode) => (
                    <button key={mode} onClick={() => setBillingMode(mode)}
                      className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all ${billingMode === mode ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>
                      {mode}
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowAdd(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 transition-all">
                  + New Invoice
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              {isLoading && (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"></div>
                  <span className="ml-4 text-slate-400 font-bold text-sm">Loading billing records...</span>
                </div>
              )}
              {!isLoading && (
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-4 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Bill ID</th>
                      <th className="px-8 py-4 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Patient</th>
                      <th className="px-8 py-4 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Category</th>
                      <th className="px-8 py-4 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                      <th className="px-8 py-4 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {billing.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-16 text-slate-400 font-medium">No billing records found.</td></tr>
                    )}
                    {billing.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5 font-black text-slate-900 text-sm">{b.billId}</td>
                        <td className="px-8 py-5">
                          <div className="font-bold text-slate-800 text-sm">{b.patient?.name ?? "—"}</div>
                          <div className="text-[10px] text-slate-400 font-bold">{b.patient?.patientId}</div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600">{b.category}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="font-black text-slate-900 text-sm">₹{b.amount.toLocaleString()}</div>
                          {b.paidAmount > 0 && b.paidAmount < b.amount && (
                            <div className="text-[10px] text-emerald-600 font-bold">Paid: ₹{b.paidAmount.toLocaleString()}</div>
                          )}
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1.5 rounded-xl text-[0.65rem] font-black uppercase tracking-widest ${STATUS_STYLE[b.status] ?? "bg-slate-50 text-slate-400"}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          {b.status !== "Paid" && (
                            <button onClick={() => handleMarkPaid(b)}
                              className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-black text-[10px] uppercase hover:bg-emerald-600 hover:text-white transition-all">
                              Mark Paid
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Insurance & TPA Node */}
          <div className="col-span-12 xl:col-span-4 space-y-8">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[40px] p-10 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-all duration-1000"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-xl">🛡️</div>
                <h3 className="font-outfit font-black text-2xl mb-2">Insurance <span className="text-indigo-200">Processing.</span></h3>
                <p className="text-white/60 text-xs font-medium leading-relaxed mb-10">Real-time TPA claim verification & cashless authorization node.</p>
                <div className="space-y-4 mb-10">
                  {[
                    { name: "ICICI Lombard", status: "Active", delay: "2h avg" },
                    { name: "Star Health", status: "Slow", delay: "24h avg" },
                    { name: "HDFC ERGO", status: "Active", delay: "1h avg" }
                  ].map((comp, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                      <div>
                        <div className="text-xs font-bold">{comp.name}</div>
                        <div className="text-[9px] text-white/50 uppercase tracking-widest mt-1">Verification Node</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-[10px] font-black ${comp.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>{comp.status}</div>
                        <div className="text-[9px] text-white/50">{comp.delay}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-white text-indigo-700 rounded-2xl py-4 font-black text-[11px] uppercase tracking-[3px] hover:bg-indigo-50 transition-all shadow-xl">Initiate Claim Verification</button>
              </div>
            </div>

            <div className="bg-rose-50 rounded-[40px] p-10 border border-rose-100">
              <h4 className="text-rose-900 font-outfit font-black text-lg mb-6 underline decoration-rose-300 decoration-4 underline-offset-4">Audit Warnings</h4>
              <div className="flex gap-4 p-4 bg-white rounded-2xl border border-rose-200 shadow-sm">
                <div className="text-xl text-rose-500">⚠</div>
                <div>
                  <div className="text-[11px] font-black text-rose-900 uppercase">Outstanding Bills</div>
                  <p className="text-[10px] text-rose-600 leading-relaxed mt-1">
                    {billing.filter(b => b.status === "Pending").length} pending invoices totalling {fmt(totalPending)} require immediate attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
