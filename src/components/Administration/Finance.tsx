import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo, useState } from "react";
import {
  useBillingRecords,
  type BillingRecord,
} from "../../config/hooks/operations.hooks";

// --- Design Tokens ---
const fmt = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

// ── Main UI Component ──
export function Finance() {
  const [view, setView] = useState<"overview" | "stream">("overview");
  const { data: billing = [], isLoading } = useBillingRecords();

  const totalRev = useMemo<number>(
    () => billing.reduce((s, b) => s + b.paidAmount, 0),
    [billing],
  );
  const outstanding = useMemo<number>(
    () => billing.reduce((s, b) => s + (b.amount - b.paidAmount), 0),
    [billing],
  );
  const velocity = useMemo<number>(
    () =>
      billing.length > 0
        ? Math.round(
            (billing.filter((b) => b.status === "Paid").length /
              billing.length) *
              100,
          )
        : 0,
    [billing],
  );

  const chartData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    interface ChartDataPoint {
      name: string;
      value: number;
      monthIdx: number;
      year: number;
    }

    const last6Months: ChartDataPoint[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last6Months.push({
        name: months[d.getMonth()],
        value: 0,
        monthIdx: d.getMonth(),
        year: d.getFullYear(),
      });
    }
    billing.forEach((b) => {
      const date = new Date(b.issuedOn);
      const match = last6Months.find(
        (m) => m.monthIdx === date.getMonth() && m.year === date.getFullYear(),
      );
      if (match) match.value += b.paidAmount;
    });
    return last6Months;
  }, [billing]);

  const categoryDist = useMemo(() => {
    const categories = [
      "Consultation",
      "Laboratory",
      "Surgery",
      "Pharmacy",
      "Room",
    ];
    const totals = categories.map((cat) => ({
      name: cat,
      value: billing
        .filter((b) => b.category === (cat === "Laboratory" ? "Lab" : cat))
        .reduce((s, b) => s + b.amount, 0),
    }));
    const grandTotal = totals.reduce((s, t) => s + t.value, 0);
    return totals
      .map((t) => ({
        ...t,
        percentage:
          grandTotal > 0 ? Math.round((t.value / grandTotal) * 100) : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }, [billing]);

  return (
    <div className="space-y-16 animate-fade pb-24 max-w-[1600px] mx-auto px-4">
      {/* --- Executive Header --- */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 pt-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-12 bg-indigo-600 rounded-full"></div>
            <h1 className="text-6xl font-black font-outfit text-slate-900 tracking-tighter leading-none">
              Institutional <br />
              <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent italic underline decoration-indigo-200">
                Capital Force.
              </span>
            </h1>
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[6px] ml-6">
            Digital Fiscal Architecture v4.2.0
          </p>
        </div>

        <div className="flex bg-white p-2.5 rounded-[35px] shadow-2xl shadow-indigo-100 border border-slate-50">
          <button 
            onClick={() => setView("overview")}
            className={`px-10 py-5 rounded-[28px] font-black text-[11px] uppercase tracking-widest transition-all ${
              view === "overview" 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" 
                : "text-slate-400 hover:text-slate-900"
            }`}
          >
            Executive Audit
          </button>
          <button 
            onClick={() => setView("stream")}
            className={`px-10 py-5 rounded-[28px] font-black text-[11px] uppercase tracking-widest transition-all ${
              view === "stream" 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" 
                : "text-slate-400 hover:text-slate-900"
            }`}
          >
            Fiscal Stream
          </button>
        </div>
      </header>

      {/* --- Main Dashboard Pulse --- */}
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-[70px] p-20 shadow-2xl shadow-indigo-100/40 border border-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full -mr-64 -mt-64 blur-[100px] transition-transform duration-1000 group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-indigo-50 text-indigo-600 rounded-full mb-12 border border-indigo-100">
              <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-widest">
                Global Liquid Assets
              </span>
            </div>
            <h2 className="text-7xl lg:text-9xl font-black font-outfit text-slate-900 tracking-tighter leading-none mb-6">
              {isLoading ? "..." : fmt(totalRev)}
            </h2>
            <p className="text-slate-400 font-bold text-lg tracking-tight ml-2">
              Cumulative Institutional Realizations
            </p>

            <div className="grid grid-cols-3 gap-16 mt-24 pt-12 border-t border-slate-100">
              <div>
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3 block opacity-60">
                  Pending Assets
                </span>
                <div className="text-3xl font-black text-slate-900">
                  {isLoading ? "..." : fmt(outstanding)}
                </div>
              </div>
              <div>
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3 block opacity-60">
                  Cycle Velocity
                </span>
                <div className="text-3xl font-black text-indigo-600">
                  {velocity}% Flow
                </div>
              </div>
              <div>
                <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-3 block opacity-60">
                  Node Integrity
                </span>
                <div className="text-3xl font-black text-emerald-500">
                  L1 Secure
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-slate-950 rounded-[70px] p-16 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-16 opacity-5">
            <svg
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m16 8-1 1-3 3-1 1" />
              <path d="m8 16 1-1 3-3 1-1" />
            </svg>
          </div>
          <div>
            <h3 className="text-3xl font-black font-outfit mb-16 tracking-tight">
              Spectral <span className="text-indigo-400 italic">Analysis.</span>
            </h3>
            <div className="space-y-10">
              {categoryDist.map((cat, i) => (
                <div key={cat.name}>
                  <div className="flex justify-between items-baseline mb-5 text-[11px] font-black uppercase tracking-[3px]">
                    <span className="text-slate-500">{cat.name}</span>
                    <span className="text-white">{cat.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${i === 0 ? "bg-indigo-500" : i === 1 ? "bg-pink-500" : i === 2 ? "bg-emerald-500" : i === 3 ? "bg-amber-500" : "bg-slate-600"}`}
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => {
              const csv = "Date,BillID,Category,Amount,PaidAmount\n" + billing.map(b => `${new Date(b.issuedOn).toLocaleDateString()},${b.billId},${b.category},${b.amount},${b.paidAmount}`).join("\n");
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `institutional_audit_${new Date().getTime()}.csv`;
              a.click();
            }}
            className="w-full mt-16 py-6 bg-white/10 rounded-[30px] border border-white/10 text-white font-black text-[11px] uppercase tracking-[6px] hover:bg-white/20 transition-all"
          >
            Download Audit
          </button>
        </div>
      </div>

      {view === "overview" ? (
        <div className="bg-white rounded-[70px] p-20 shadow-2xl shadow-indigo-50/50 border border-slate-50 animate-fade">
        <div className="flex justify-between items-end mb-24">
          <div>
            <h3 className="text-4xl font-black font-outfit text-slate-900 tracking-tighter mb-4">
              Fiscal <span className="text-indigo-600 italic">Momentum.</span>
            </h3>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[6px]">
              Institutional Resource Velocity (6-Month Stream)
            </p>
          </div>
        </div>

        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="8 8"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 900 }}
                dy={20}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 900 }}
                tickFormatter={(v) => fmt(v)}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "35px",
                  border: "none",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.1)",
                  padding: "30px",
                }}
                formatter={(value: any) => [
                  fmt(Number(value) || 0),
                  "Institutional Net",
                ]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="url(#rainbow)"
                strokeWidth={10}
                fillOpacity={1}
                fill="url(#areaFill)"
                dot={{ r: 8, fill: "#fff", strokeWidth: 5, stroke: "#6366f1" }}
                activeDot={{ r: 12, strokeWidth: 0, fill: "#6366f1" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      ) : (
        <div className="bg-white rounded-[70px] p-20 shadow-2xl shadow-indigo-50/50 border border-slate-50 animate-in slide-in-from-bottom duration-700">
           <div className="flex justify-between items-center mb-16">
              <div>
                 <h3 className="text-4xl font-black font-outfit text-slate-900 tracking-tighter mb-4">Live Fiscal <span className="text-indigo-600 italic">Streaming.</span></h3>
                 <p className="text-slate-400 text-xs font-black uppercase tracking-[6px]">Real-time institutional realization nodes</p>
              </div>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="border-b border-slate-100">
                       <th className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Node ID</th>
                       <th className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Category</th>
                       <th className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Total Amount</th>
                       <th className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Realized</th>
                       <th className="py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 text-right">Integrity</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {billing.map(b => (
                       <tr key={b.id} className="group hover:bg-indigo-50/30 transition-all">
                          <td className="py-8 px-4">
                             <div className="font-black text-slate-900">{b.billId}</div>
                             <div className="text-[9px] font-bold text-slate-400 uppercase mt-1">{new Date(b.issuedOn).toLocaleDateString()}</div>
                          </td>
                          <td className="py-8 px-4 font-bold text-slate-600 text-sm">{b.category}</td>
                          <td className="py-8 px-4 font-black text-slate-900">{fmt(b.amount)}</td>
                          <td className="py-8 px-4 font-black text-indigo-600">{fmt(b.paidAmount)}</td>
                          <td className="py-8 px-4 text-right">
                             <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                                b.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                                b.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                             }`}>{b.status}</span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      <footer className="text-center py-20">
        <p className="text-slate-300 font-black text-[12px] uppercase tracking-[12px] italic">
          Secured Fiscal Backbone &bull; Institutional Intelligence
        </p>
      </footer>
    </div>
  );
}
