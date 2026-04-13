export function Reports() {
  const kpis = [
    { label: "Avg. Length of Stay", val: "4.2 Days", trend: "-0.8", color: "blue", desc: "Institutional ALOS threshold meta" },
    { label: "Bed Turnover Rate", val: "1.2x", trend: "+14%", color: "emerald", desc: "Total patient volume per clinical bay" },
    { label: "Clinical Success Rate", val: "92.4%", trend: "Stable", color: "rose", desc: "Institutional diagnostic efficacy grade" },
    { label: "Readmission Rate", val: "2.1%", trend: "-5%", color: "amber", desc: "30-day post-discharge return metrics" },
  ];

  return (
    <div className="space-y-10 animate-fade">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm flex flex-col justify-between h-[300px] group hover:border-primary/20 transition-all">
             <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">{kpi.label}</span>
                <div className="flex items-baseline gap-4">
                   <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{kpi.val}</h3>
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                     kpi.trend.startsWith('-') ? 'bg-emerald-50 text-emerald-600' :
                     kpi.trend === 'Stable' ? 'bg-slate-50 text-slate-400' : 'bg-rose-50 text-rose-600'
                   }`}>{kpi.trend}</span>
                </div>
             </div>
             
             <div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-6">{kpi.desc}</p>
                <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                   <div className={`h-full bg-${kpi.color}-500 rounded-full`} style={{ width: '70%' }}></div>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
         <div className="col-span-12 lg:col-span-8 bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Institutional Performance Report</span>
               </div>
               <h3 className="text-3xl font-black mb-8 leading-tight">Monthly Clinical <span className="text-primary italic">Throughput Analysis.</span></h3>
               <div className="grid grid-cols-3 gap-10">
                  <div>
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Caseload</div>
                     <div className="text-2xl font-black">2,482</div>
                  </div>
                  <div>
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">OT Proficiency</div>
                     <div className="text-2xl font-black">89.4%</div>
                  </div>
                  <div>
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Inpatient Load</div>
                     <div className="text-2xl font-black">94.2%</div>
                  </div>
               </div>
            </div>
            
            <button className="mt-14 w-full py-5 bg-primary text-white rounded-3xl font-black text-[11px] uppercase tracking-[4px] shadow-xl shadow-primary-glow hover:-translate-y-1 transition-all">Initialize Full Audit Generation</button>
         </div>

         <div className="col-span-12 lg:col-span-4 bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm flex flex-col justify-between text-black ">
            <div>
               <h4 className="font-outfit font-black text-xl mb-6 underline decoration-emerald-500/20 underline-offset-8">Departmental <span className="text-slate-400 font-normal">Rank.</span></h4>
               <div className="space-y-6">
                  {[
                    { name: "Radiology Unit B", val: "9.8", color: "emerald", label: "Diagnostic Max" },
                    { name: "Emergency Response", val: "9.2", color: "blue", label: "Response Threshold" },
                    { name: "Pediatric Ward", val: "8.4", color: "amber", label: "Patient Care" },
                  ].map((item, i) => (
                    <div key={i} className="group cursor-pointer">
                       <div className="flex justify-between items-baseline mb-2">
                          <span className="text-[11px] font-black text-slate-900 uppercase group-hover:text-primary transition-colors">{item.name}</span>
                          <span className={`text-[12px] font-black text-${item.color}-600`}>{item.val}</span>
                       </div>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{item.label}</p>
                    </div>
                  ))}
               </div>
            </div>
            <button className="mt-10 text-primary font-black text-[11px] uppercase tracking-[2px] text-center hover:underline italic">Export Strategic Deck (PPTX)</button>
         </div>
      </div>
    </div>
  );
}
