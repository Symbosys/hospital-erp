import { useBillingRecords } from "../../config/hooks/operations.hooks";
import { useOperationTheatres } from "../../config/hooks/ot.hooks";
import { useAppointments } from "../../config/hooks/appointment.hooks";
import { useDepartments } from "../../config/hooks/department.hooks";
import { useMemo } from "react";

export function Reports() {
  const { data: billing = [] } = useBillingRecords();
  const { data: ots = [] } = useOperationTheatres();
  const { data: appointments = [] } = useAppointments();
  const { data: departments = [] } = useDepartments();

  const metrics = useMemo(() => {
    const totalBills = billing.length;
    const paidBills = billing.filter(b => b.status === "Paid").length;
    const proficiency = ots.length > 0 ? (ots.filter(o => o.status === "Ready" || o.status === "Active Surgery").length / ots.length) * 100 : 0;
    
    return {
      caseload: appointments.length,
      proficiency: Math.round(proficiency),
      realization: totalBills > 0 ? Math.round((paidBills / totalBills) * 100) : 0,
      deptRank: [...departments].sort((a, b) => b.occupancy - a.occupancy).slice(0, 3)
    };
  }, [billing, ots, appointments, departments]);

  const kpis = [
    { label: "Institutional Realization", val: `${metrics.realization}%`, trend: "+12%", color: "blue", desc: "Fiscal realization efficiency against billing backlog" },
    { label: "OT Proficiency Rate", val: `${metrics.proficiency}%`, trend: "+4%", color: "emerald", desc: "Surgical node operational readiness and turnover" },
    { label: "Active Caseload", val: metrics.caseload.toString(), trend: "Stable", color: "rose", desc: "Current synchronized clinical registry volume" },
    { label: "Dept Flow Grade", val: "A2 Secure", trend: "Optimal", color: "amber", desc: "Inter-departmental resource velocity metrics" },
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
                     <div className="text-2xl font-black">{metrics.caseload}</div>
                  </div>
                  <div>
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">OT Proficiency</div>
                     <div className="text-2xl font-black">{metrics.proficiency}%</div>
                  </div>
                  <div>
                     <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Institutional Realization</div>
                     <div className="text-2xl font-black">{metrics.realization}%</div>
                  </div>
               </div>
            </div>
            
            <button 
               onClick={() => {
                 const btn = document.activeElement as HTMLButtonElement;
                 if (btn) {
                   btn.innerText = "GENERATING SYSTEM AUDIT...";
                   btn.disabled = true;
                   setTimeout(() => {
                     btn.innerText = "AUDIT PACK READY ✓";
                     btn.classList.replace('bg-primary', 'bg-emerald-500');
                     setTimeout(() => {
                       btn.innerText = "Initialize Full Audit Generation";
                       btn.classList.replace('bg-emerald-500', 'bg-primary');
                       btn.disabled = false;
                     }, 3000);
                   }, 2000);
                 }
               }}
               className="mt-14 w-full py-5 bg-primary text-white rounded-3xl font-black text-[11px] uppercase tracking-[4px] shadow-xl shadow-primary-glow hover:-translate-y-1 transition-all disabled:opacity-50"
            >
               Initialize Full Audit Generation
            </button>
         </div>

         <div className="col-span-12 lg:col-span-4 bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm flex flex-col justify-between text-black ">
            <div>
               <h4 className="font-outfit font-black text-xl mb-6 underline decoration-emerald-500/20 underline-offset-8">Departmental <span className="text-slate-400 font-normal">Rank.</span></h4>
               <div className="space-y-6">
                  {metrics.deptRank.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Synchronizing departmental nodes...</p>
                  ) : metrics.deptRank.map((dept, i) => (
                    <div key={i} className="group cursor-pointer">
                       <div className="flex justify-between items-baseline mb-2">
                          <span className="text-[11px] font-black text-slate-900 uppercase group-hover:text-primary transition-colors">{dept.name}</span>
                          <span className={`text-[12px] font-black text-primary`}>{dept.occupancy}%</span>
                       </div>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Load Factor: {dept.status}</p>
                    </div>
                  ))}
               </div>
            </div>
            <button 
               onClick={() => alert("Downloading Institutional Strategic Deck (PPTX)...\nContains: Caseload metrics, Proficiency Trends, and Dept Rankings.")}
               className="mt-10 text-primary font-black text-[11px] uppercase tracking-[2px] text-center hover:underline italic"
            >
               Export Strategic Deck (PPTX)
            </button>
         </div>
      </div>
    </div>
  );
}
