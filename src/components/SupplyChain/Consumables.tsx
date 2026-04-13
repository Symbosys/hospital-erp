

const ToolIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
);

const CONSUMABLES_DATA = [
  { id: "CNS-01", name: "Disposable Syringe 5ml", type: "Utility", stock: 4500, min: 1000, trend: "Stable" },
  { id: "CNS-02", name: "Surgical Kit - Grade A", type: "Operation", stock: 120, min: 150, trend: "Deficit" },
  { id: "CNS-03", name: "Sterile Dressings", type: "Wound Care", stock: 820, min: 200, trend: "Stable" },
  { id: "CNS-04", name: "IV Catheter G22", type: "Utility", stock: 240, min: 500, trend: "Declining" },
];

export function Consumables() {
  return (
    <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
         <div>
            <h3 className="text-xl font-black text-slate-900 leading-none">Clinical Consumables</h3>
            <p className="text-sm text-slate-400 font-medium mt-2">Logistical tracking for surgical tools and daily essentials.</p>
         </div>
         <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-xs shadow-xl shadow-slate-200">System Inventory Audit</button>
      </div>

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {CONSUMABLES_DATA.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-[36px] border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all group flex flex-col justify-between h-[280px]">
             <div>
                <div className="flex justify-between items-start mb-6">
                   <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <ToolIcon />
                   </div>
                   <span className={`text-[0.6rem] font-black uppercase tracking-[2px] px-3 py-1 rounded-lg ${
                     item.trend === 'Stable' ? 'bg-emerald-50 text-emerald-600' :
                     item.trend === 'Declining' ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-amber-50 text-amber-600'
                   }`}>{item.trend} Load</span>
                </div>
                <h4 className="text-xl font-black text-slate-900">{item.name}</h4>
                <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.id} • {item.type}</p>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900">{item.stock}</span>
                      <span className="text-xs font-bold text-slate-400">Units</span>
                   </div>
                   <div className="text-right">
                      <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest block">Min Level</span>
                      <span className="text-sm font-black text-slate-600 underline underline-offset-4 decoration-primary/20">{item.min}</span>
                   </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-1000 ${
                     item.stock < item.min ? 'bg-rose-500' : 'bg-primary'
                   }`} style={{ width: `${Math.min((item.stock/item.min)*50, 100)}%` }}></div>
                </div>
             </div>
          </div>
        ))}

        {/* Predictive Card */}
        <div className="bg-gradient-to-br from-primary to-blue-700 p-10 rounded-[40px] text-white flex flex-col justify-between md:col-span-2 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-110 transition-transform"></div>
           <div>
              <h3 className="text-2xl font-black mb-4">Institutional <span className="text-white/40 italic">Predictive Restocking.</span></h3>
              <p className="text-white/60 font-medium text-sm max-w-2xl leading-relaxed">Our AI logistics engine predicts that surgical kits will drop below critical levels in node "Wing B" within 48 hours based on the current surgery schedule.</p>
           </div>
           
           <div className="flex justify-between items-center mt-12">
              <div className="flex gap-10">
                 <div className="space-y-1">
                    <span className="text-[0.65rem] font-black text-white/30 uppercase tracking-widest">Confidence</span>
                    <p className="font-black text-2xl tracking-tight">98.4%</p>
                 </div>
                 <div className="space-y-1 text-primary-glow">
                    <span className="text-[0.65rem] font-black text-white/30 uppercase tracking-widest">Target Arrival</span>
                    <p className="font-black text-2xl tracking-tight">24h</p>
                 </div>
              </div>
              <button className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">GENERATE AUTO-ORDER</button>
           </div>
        </div>
      </div>
    </div>
  );
}
