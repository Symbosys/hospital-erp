import { useState } from "react";

export function ClinicalSchedule() {
  const [activeDate, setActiveDate] = useState(new Date().toISOString().split('T')[0]);

  const SCHEDULE_DATA = [
    {
      id: 1,
      time: "08:00 AM",
      unit: "OT-01",
      procedure: "Cardiovascular Bypass",
      staff: "Dr. Alexander Pierce",
      status: "In Progress",
      type: "Surgery",
      progress: 65,
    },
    {
      id: 2,
      time: "09:30 AM",
      unit: "Lab-X1",
      procedure: "Blood Panel Sweep",
      staff: "Tech. Sarah Miller",
      status: "Scheduled",
      type: "Diagnostic",
      progress: 0,
    },
    {
      id: 3,
      time: "10:00 AM",
      unit: "Ward-B",
      procedure: "Critical Rounds",
      staff: "Dr. Meredith Grey",
      status: "Scheduled",
      type: "Round",
      progress: 0,
    },
    {
      id: 4,
      time: "11:30 AM",
      unit: "OT-03",
      procedure: "Neurological Resection",
      staff: "Dr. Derek Shepherd",
      status: "Preparing",
      type: "Surgery",
      progress: 10,
    },
    {
      id: 5,
      time: "01:00 PM",
      unit: "Lab-A2",
      procedure: "Biometric Scans",
      staff: "Tech. James Wilson",
      status: "Routine",
      type: "Diagnostic",
      progress: 0,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Schedule Header & Controls */}
      <div className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div>
            <h3 className="text-xl font-outfit font-black text-slate-900 leading-none">Institutional Schedule</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5">Synchronized Clinical Timeline</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="bg-slate-50 text-slate-600 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all">Previous</button>
          <div className="bg-primary text-white px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary-glow flex items-center gap-2">
            <span>{new Date(activeDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <button className="bg-slate-50 text-slate-600 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all">Next</button>
        </div>
      </div>

      {/* Main Schedule Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Timeline View */}
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest px-2">Daily Flow Matrix</h4>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Surgery</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Diagnostic</span>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              {SCHEDULE_DATA.map((item) => (
                <div key={item.id} className="group relative flex items-start gap-6 p-6 rounded-3xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                  <div className="w-24 shrink-0 pt-1">
                    <span className="text-sm font-black text-slate-900 block">{item.time}</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider px-2 py-0.5 bg-slate-100/50 rounded-full mt-1 inline-block">{item.unit}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                          <h5 className="text-[0.95rem] font-bold text-slate-900 group-hover:text-primary transition-colors">{item.procedure}</h5>
                          <p className="text-[0.7rem] text-slate-500 font-medium">Led by <span className="text-slate-900 font-bold">{item.staff}</span></p>
                       </div>
                       <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${
                         item.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                         item.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-600' :
                         item.status === 'Preparing' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'
                       }`}>
                         {item.status}
                       </span>
                    </div>

                    {item.progress > 0 && (
                      <div className="mt-4">
                         <div className="flex justify-between items-center mb-1.5 px-1">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Operational Progress</span>
                            <span className="text-[10px] font-black text-primary">{item.progress}%</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all duration-1000" style={{ width: `${item.progress}%` }}></div>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Stats & Quick Actions */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
           <div className="bg-slate-900 p-8 rounded-[40px] text-white overflow-hidden relative shadow-2xl shadow-slate-900/40">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <h4 className="text-lg font-outfit font-black mb-6">Schedule Density</h4>
              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <div className="text-3xl font-black mb-1">84%</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Theater Load</div>
                 </div>
                 <div>
                    <div className="text-3xl font-black mb-1">12</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pending Lab Sets</div>
                 </div>
              </div>
              <button className="w-full mt-8 py-4 bg-primary text-white rounded-2xl font-black text-xs shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">MODIFY MASTER GRID</button>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm">
              <h4 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Critical Time Alerts</h4>
              <div className="space-y-6">
                 {[
                    { time: "In 15m", alert: "Shift Change: Surgical Nursing Wing B", color: "blue" },
                    { time: "In 45m", alert: "Maintenance: Diagnostic Unit X-Ray Core", color: "amber" },
                    { time: "Delayed", alert: "PT-4202 Preparation for Cardiac Unit", color: "red" },
                 ].map((alert, i) => (
                    <div key={i} className="flex gap-4 group">
                       <div className={`w-1 shadow-sm rounded-full shrink-0 ${
                         alert.color === 'red' ? 'bg-red-500' : 
                         alert.color === 'amber' ? 'bg-amber-500' : 'bg-blue-500'
                       }`}></div>
                       <div>
                          <div className="text-[9px] font-black text-slate-400 uppercase mb-1">{alert.time}</div>
                          <div className="text-xs font-bold text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors">{alert.alert}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
