import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Finance() {
  const data = [
    { month: 'Apr', revenue: 42000, expenses: 31000 },
    { month: 'May', revenue: 58000, expenses: 35000 },
    { month: 'Jun', revenue: 48000, expenses: 33000 },
    { month: 'Jul', revenue: 65000, expenses: 40000 },
    { month: 'Aug', revenue: 52000, expenses: 38000 },
    { month: 'Sep', revenue: 71000, expenses: 42000 },
  ];

  const deptPnl = [
    { name: "Radiology & Imaging", profit: "+₹1.2M", health: "88%" },
    { name: "Surgical Operations", profit: "+₹4.8M", health: "92%" },
    { name: "Internal Medicine", profit: "+₹2.1M", health: "84%" },
    { name: "Institutional R&D", profit: "-₹0.4M", health: "70%" },
  ];

  return (
    <div className="space-y-10 animate-fade">
      <div className="grid grid-cols-12 gap-8">
        {/* Main P&L Chart */}
        <div className="col-span-12 xl:col-span-9 bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
           <div className="flex justify-between items-center mb-10">
              <div>
                 <h3 className="font-outfit font-black text-2xl text-slate-900 leading-none">Institutional <span className="text-emerald-500 italic">P&L.</span></h3>
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-[2px] mt-2">Fiscal Cycle Performance Intelligence</p>
              </div>
              <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2">
                 <button className="px-5 py-2.5 bg-white rounded-xl shadow-sm text-[10px] font-black uppercase text-slate-800">Revenue</button>
                 <button className="px-5 py-2.5 text-[10px] font-black uppercase text-slate-400">Payroll Ops</button>
              </div>
           </div>

           <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data}>
                    <defs>
                       <linearGradient id="financeRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                    <Tooltip 
                       contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px' }}
                       itemStyle={{ fontWeight: 800, fontSize: '0.8rem' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#financeRevenue)" />
                    <Area type="monotone" dataKey="expenses" stroke="#94a3b8" strokeWidth={2} strokeDasharray="10 10" fill="transparent" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Dept P&L Sidebar */}
        <div className="col-span-12 xl:col-span-3 space-y-6 text-black ">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div>
                 <h4 className="text-lg font-black leading-none mb-10">Unit <span className="text-emerald-400">Profitability.</span></h4>
                 <div className="space-y-8">
                    {deptPnl.map((dept, i) => (
                      <div key={i} className="group cursor-pointer">
                         <div className="flex justify-between items-baseline mb-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{dept.name}</span>
                            <span className={`text-[11px] font-black ${dept.profit.startsWith('-') ? 'text-rose-400' : 'text-emerald-400'}`}>{dept.profit}</span>
                         </div>
                         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 group-hover:bg-primary transition-all duration-700" style={{ width: dept.health }}></div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <button className="w-full mt-10 py-5 bg-emerald-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[3px] shadow-xl shadow-emerald-900/40 hover:-translate-y-1 transition-all">Audit Global Expenses</button>
           </div>
        </div>

        {/* Financial Actions */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { title: "Payroll Management", desc: "Automate institutional salary disbursement.", val: "₹1.4Cr", color: "blue" },
             { title: "Expense Audit", desc: "Verifying logistical outflow vs diagnostic in.", val: "₹42.8L", color: "slate" },
             { title: "Insurance Claims", desc: "Processing TPA & institutional billings.", val: "₹12.5L", color: "emerald" },
             { title: "Tax Compliance", desc: "Aggregated institutional GST liability.", val: "Pending", color: "amber" },
           ].map((card, i) => (
             <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm group hover:-translate-y-2 transition-all">
                <span className={`w-3 h-3 rounded-full block mb-6 shadow-xl ${
                  card.color === 'emerald' ? 'bg-emerald-500' :
                  card.color === 'blue' ? 'bg-blue-500' :
                  card.color === 'amber' ? 'bg-amber-500' : 'bg-slate-900'
                }`}></span>
                <h4 className="text-lg font-black text-slate-900 mb-1">{card.title}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed mb-6">{card.desc}</p>
                <div className="text-2xl font-black text-slate-800 tracking-tighter">{card.val}</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
