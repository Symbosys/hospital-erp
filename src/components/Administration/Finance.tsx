import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useBillingRecords } from "../../config/hooks/operations.hooks";

// ─── Design Language ──────────────────────────────────────────────────────────
const fmt = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  return `₹${n.toLocaleString("en-IN")}`;
};

// ── Icons ──
const IconCompass = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m16 8-1 1-3 3-1 1"/><path d="m8 16 1-1 3-3 1-1"/></svg>
);

const IconFlash = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);

// ── Component ──
export function Finance() {
  const { data: billing = [], isLoading } = useBillingRecords();

  const totalRev = billing.reduce((s, b) => s + b.paidAmount, 0);
  const outstanding = billing.reduce((s, b) => s + (b.amount - b.paidAmount), 0);
  const realization = billing.length > 0 ? Math.round((billing.filter(b => b.status === "Paid").length / billing.length) * 100) : 0;

  const chartData = [
    { name: 'Apr', value: 4200 },
    { name: 'May', value: 3800 },
    { name: 'Jun', value: 5400 },
    { name: 'Jul', value: 7200 },
    { name: 'Aug', value: 6100 },
    { name: 'Sep', value: 8900 },
  ];

  return (
    <div className="space-y-16 animate-fade pb-24 max-w-[1600px] mx-auto px-4">
      
      {/* ── Immersive Header ─────────────────────────────────────────────── */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12 pt-10">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-4 h-12 bg-indigo-600 rounded-full"></div>
              <h1 className="text-5xl font-black font-outfit text-slate-900 tracking-tighter">Institutional <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent italic">Capital Force.</span></h1>
           </div>
           <p className="text-slate-400 font-bold text-xs uppercase tracking-[5px] ml-6">Digital Fiscal Architecture v4.2.0</p>
        </div>

        <div className="flex bg-white p-2 rounded-[32px] shadow-2xl shadow-indigo-100 border border-slate-50">
           <button className="px-10 py-4 bg-indigo-600 rounded-[24px] text-white font-black text-[11px] uppercase tracking-widest hover:scale-[1.05] transition-all shadow-xl shadow-indigo-200">System Recon</button>
           <button className="px-10 py-4 text-slate-400 font-black text-[11px] uppercase tracking-widest hover:text-slate-900 transition-all">Audit Ledger</button>
        </div>
      </header>

      {/* ── Dynamic Command Bento ─────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-10">
        
        {/* Main Revenue Node */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-[60px] p-16 shadow-2xl shadow-indigo-100/50 border border-slate-50 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110"></div>
           <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                 <div className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full mb-8">
                    <IconFlash />
                    <span className="text-[10px] font-black uppercase tracking-widest">Live Flow Active</span>
                 </div>
                 <h2 className="text-7xl font-black font-outfit text-slate-900 tracking-tighter leading-none mb-4">
                   {isLoading ? '...' : fmt(totalRev)}
                 </h2>
                 <p className="text-slate-400 font-bold text-sm tracking-tight uppercase">Net Institutional Settlements (24h Period)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 pt-10 border-t border-slate-100">
                 <div>
                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2 block">Outstanding</span>
                    <div className="text-2xl font-black text-slate-900">{isLoading ? '...' : fmt(outstanding)}</div>
                 </div>
                 <div>
                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2 block">Realization</span>
                    <div className="text-2xl font-black text-indigo-600">{realization}% Velocity</div>
                 </div>
                 <div>
                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2 block">Ledger Node</span>
                    <div className="text-2xl font-black text-emerald-500">Secured &bull; SSL</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Categories Analysis */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900 rounded-[60px] p-16 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
           <div className="absolute top-0 right-0 p-12 opacity-5 text-white">
              <IconCompass />
           </div>
           <h3 className="text-2xl font-black font-outfit mb-12">Revenue <span className="text-indigo-400 italic">Distro.</span></h3>
           
           <div className="space-y-8">
              {['Consultation', 'Laboratory', 'Surgery', 'Pharmacy'].map((cat, i) => (
                <div key={cat}>
                   <div className="flex justify-between items-baseline mb-4">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{cat}</span>
                      <span className="text-[11px] font-black text-white">{(80 - i*15)}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-1000 ${
                        i === 0 ? 'bg-indigo-500' : 
                        i === 1 ? 'bg-pink-500' : 
                        i === 2 ? 'bg-emerald-500' : 'bg-slate-600'
                      }`} style={{ width: `${(80 - i*15)}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
           
           <button className="w-full mt-12 py-5 bg-white/10 rounded-3xl border border-white/10 text-white font-black text-[11px] uppercase tracking-[4px] hover:bg-white/20 transition-all">Download Audit Trail</button>
        </div>
      </div>

      {/* ── Financial Visualization Deck ─────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-10">
         <div className="col-span-12 bg-white rounded-[60px] p-16 shadow-2xl shadow-slate-100 border border-slate-50 relative overflow-hidden">
            <div className="flex justify-between items-center mb-20 relative z-10">
               <div>
                  <h3 className="text-3xl font-black font-outfit text-slate-900 tracking-tighter">Fiscal <span className="text-indigo-600 italic">Pulses.</span></h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[5px] mt-2">Active Asset Growth Reconciliation (7-Day Stream)</p>
               </div>
               <div className="flex bg-slate-50 p-2 rounded-3xl border border-slate-100">
                  <button className="px-8 py-3 bg-white rounded-2xl shadow-sm text-[10px] font-black text-indigo-600 uppercase tracking-widest">Analytical</button>
                  <button className="px-8 py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors">Cumulative</button>
               </div>
            </div>

            <div className="h-[500px] w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                     <defs>
                        <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
                           <stop offset="0%" stopColor="#6366f1" />
                           <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 900}} dy={20} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 900}} />
                     <Tooltip 
                       contentStyle={{ borderRadius: '32px', border: 'none', boxShadow: '0 30px 60px rgba(0,0,0,0.1)', padding: '24px' }}
                       itemStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                     />
                     <Area 
                       type="monotone" 
                       dataKey="value" 
                       stroke="url(#rainbow)" 
                       strokeWidth={8} 
                       fillOpacity={1} 
                       fill="url(#areaFill)" 
                       dot={{ r: 6, fill: '#fff', strokeWidth: 4, stroke: '#6366f1' }}
                       activeDot={{ r: 10, strokeWidth: 0, fill: '#6366f1' }}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <footer className="mt-20 text-center pb-12">
         <p className="text-slate-300 font-black text-[10px] uppercase tracking-[8px]">Institutional Economic Backbone &bull; V4.2 &bull; Secure Node</p>
      </footer>
    </div>
  );
}
