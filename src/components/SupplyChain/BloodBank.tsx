

const DropIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5L12 2 8 9.5c-2 1.6-3 3.5-3 5.5a7 7 0 0 0 7 7z"></path></svg>
);

const BLOOD_TYPES = [
  { type: "O+", units: 24, status: "Critical", color: "rose" },
  { type: "A+", units: 142, status: "Optimal", color: "emerald" },
  { type: "B+", units: 84, status: "Good", color: "blue" },
  { type: "AB-", units: 8, status: "Emergency", color: "red" },
  { type: "O-", units: 12, status: "Low", color: "amber" },
  { type: "AB+", units: 45, status: "Good", color: "blue" },
];

export function BloodBank() {
  return (
    <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      <div className="p-12 border-b border-slate-100 flex justify-between items-end">
         <div>
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-rose-500 text-white rounded-2xl shadow-lg ring-8 ring-rose-50">
                  <DropIcon />
               </div>
               <h3 className="text-3xl font-outfit font-black text-slate-900 leading-none tracking-tight">Hematological Reserve</h3>
            </div>
            <p className="text-slate-400 font-medium max-w-lg">Managing critical blood inventory, cross-matching protocol, and donor history.</p>
         </div>
         <div className="flex gap-4">
            <button className="px-8 py-4 bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl font-black text-xs hover:bg-slate-100 transition-all">Donor Database</button>
            <button className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black text-xs shadow-xl shadow-rose-200 hover:-translate-y-1 transition-all">Emergency Extraction</button>
         </div>
      </div>

      <div className="p-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 bg-slate-50/20">
        {BLOOD_TYPES.map((bt) => (
          <div key={bt.type} className={`bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group flex flex-col items-center gap-6 relative overflow-hidden`}>
              <div className={`absolute top-0 left-0 w-full h-1.5 ${
                bt.color === 'rose' ? 'bg-rose-500' :
                bt.color === 'emerald' ? 'bg-emerald-500' :
                bt.color === 'blue' ? 'bg-blue-500' :
                bt.color === 'red' ? 'bg-red-500' :
                bt.color === 'amber' ? 'bg-amber-500' : 'bg-slate-500'
              }`}></div>
              <div className="text-center">
                 <span className={`text-[0.6rem] font-black uppercase tracking-widest text-slate-400 mb-2 block`}>{bt.status}</span>
                 <h4 className={`text-4xl font-outfit font-black tracking-tighter ${
                   bt.color === 'rose' ? 'text-rose-600' :
                   bt.color === 'emerald' ? 'text-emerald-600' :
                   bt.color === 'blue' ? 'text-blue-600' :
                   bt.color === 'red' ? 'text-red-600' :
                   bt.color === 'amber' ? 'text-amber-600' : 'text-slate-600'
                 }`}>{bt.type}</h4>
              </div>
              <div className="space-y-2 text-center">
                 <p className="text-2xl font-black text-slate-800">{bt.units}</p>
                 <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest leading-none">Standard Units</p>
              </div>
              
              <div className={`w-full h-1 rounded-full overflow-hidden ${
                bt.color === 'rose' ? 'bg-rose-50' :
                bt.color === 'emerald' ? 'bg-emerald-50' :
                bt.color === 'blue' ? 'bg-blue-50' :
                bt.color === 'red' ? 'bg-red-50' :
                bt.color === 'amber' ? 'bg-amber-50' : 'bg-slate-50'
              }`}>
                 <div className={`h-full ${
                    bt.color === 'rose' ? 'bg-rose-500' :
                    bt.color === 'emerald' ? 'bg-emerald-500' :
                    bt.color === 'blue' ? 'bg-blue-500' :
                    bt.color === 'red' ? 'bg-red-500' :
                    bt.color === 'amber' ? 'bg-amber-500' : 'bg-slate-500'
                 }`} style={{ width: `${Math.max(bt.units, 10)}%` }}></div>
              </div>
          </div>
        ))}
      </div>

      <div className="p-12 pt-0 grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative group">
            <div className="flex justify-between items-start mb-8">
               <h4 className="text-xl font-black">Cross-Matching <span className="text-primary italic">Engine.</span></h4>
               <span className="flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-widest text-primary animate-pulse">
                  <div className="w-2 h-2 bg-primary rounded-full"></div> Activity
               </span>
            </div>
            
            <div className="space-y-6">
               <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center group-hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center font-black">O-</div>
                     <span className="text-sm font-bold text-white/50">TO</span>
                     <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center font-black">AB+</div>
                  </div>
                  <span className="text-xs font-black text-emerald-400">COMPATIBLE</span>
               </div>
               <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center group-hover:bg-white/10 transition-all opacity-40">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center font-black">A+</div>
                     <span className="text-sm font-bold text-white/50">TO</span>
                     <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center font-black">O-</div>
                  </div>
                  <span className="text-xs font-black text-rose-400 uppercase italic">Incompatible</span>
               </div>
            </div>
            
            <button className="w-full mt-10 py-5 bg-primary text-white rounded-[24px] font-black text-sm shadow-xl shadow-primary-glow">Initiate Full Grid Scan</button>
         </div>

         <div className="flex flex-col gap-6">
            <div className="flex-1 bg-white border border-slate-200 rounded-[40px] p-10 shadow-sm hover:border-primary/20 transition-all">
               <h4 className="text-lg font-black text-slate-900 mb-2">Donor Logistics</h4>
               <p className="text-sm text-slate-400 font-medium mb-8">Scheduling screening for 12 new high-frequency donors.</p>
               <div className="flex -space-x-3 mb-8">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-2xl bg-slate-100 border-4 border-white flex items-center justify-center font-black text-primary text-xs shadow-sm">U{i}</div>
                  ))}
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white border-4 border-white flex items-center justify-center font-black text-xs">+8</div>
               </div>
               <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline">Manage Queue</button>
            </div>
            <div className="p-8 bg-rose-50 border border-rose-100 rounded-[32px] flex items-center justify-between">
               <div>
                  <h5 className="font-black text-rose-900 leading-none mb-1 text-lg">Rare Type Alert</h5>
                  <p className="text-rose-700/60 font-bold text-xs uppercase tracking-widest">AB- is below threshold.</p>
               </div>
               <button className="bg-rose-600 text-white px-6 py-3 rounded-xl font-black text-xs shadow-lg">Broadcast Request</button>
            </div>
         </div>
      </div>
    </div>
  );
}
