import { useState, useMemo } from "react";
import { 
  useAppointments, 
  useUpdateAppointment, 
  type Appointment 
} from "../../config/hooks/appointment.hooks";

export function Appointments() {
  const { data: appointments = [], isLoading } = useAppointments();
  const updateAppointment = useUpdateAppointment();

  const queueStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todaysAppts = appointments.filter(a => a.date.startsWith(today));
    const waiting = appointments.filter(a => a.status === "Waiting").length;
    
    return [
      { label: "Today's Total", value: todaysAppts.length.toString(), trend: "+12%", color: "emerald" },
      { label: "Waiting Now", value: waiting.toString(), trend: waiting > 10 ? "High Volume" : "Normal", color: "rose" },
      { label: "Avg. Wait Time", value: "18m", trend: "-5m", color: "blue" },
      { label: "Doctor Activity", value: "92%", trend: "Optimal", color: "amber" },
    ];
  }, [appointments]);

  const handleStatusChange = async (id: string, status: Appointment["status"]) => {
    try {
      await updateAppointment.mutateAsync({ id, status });
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-8 animate-in fade-in duration-700">
      
      {/* Stats Row */}
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {queueStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full blur-2xl group-hover:blur-xl transition-all ${
              stat.color === 'emerald' ? 'bg-emerald-50' :
              stat.color === 'rose' ? 'bg-rose-50' :
              stat.color === 'blue' ? 'bg-blue-50' :
              stat.color === 'amber' ? 'bg-amber-50' : 'bg-slate-50'
            }`}></div>
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{stat.label}</span>
              <div className="flex items-end gap-3 mt-2">
                <h3 className="text-3xl font-outfit font-black text-slate-900">{stat.value}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="col-span-12 xl:col-span-8 space-y-8">
        {/* Waiting Queue Management */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden text-black ">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <div>
              <h3 className="font-outfit font-black text-xl text-slate-900">Waiting Queue <span className="text-emerald-500 font-normal">Management</span></h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">Real-time patient flow & doctor assignments.</p>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-xl">
               <button className="px-4 py-2 bg-white shadow-sm rounded-lg text-[10px] font-black uppercase text-emerald-600">Active</button>
               <button className="px-4 py-2 text-[10px] font-black uppercase text-slate-400">Delayed</button>
            </div>
          </div>
          
          <div className="overflow-x-auto overflow-y-auto max-h-[600px] no-scrollbar">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead className="sticky top-0 z-20">
                <tr className="bg-slate-50/80 backdrop-blur-md">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ID / Patient</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Consultant</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time / Type</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {isLoading ? (
                  [1,2,3,4].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-8 py-6"><div className="h-12 bg-slate-50 rounded-2xl w-full"></div></td>
                    </tr>
                  ))
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="text-3xl mb-4">📅</div>
                      <div className="text-slate-400 font-black uppercase text-[10px] tracking-[4px]">No Appointments Today</div>
                    </td>
                  </tr>
                ) : appointments.map((apt) => (
                  <tr key={apt.id} className="group hover:bg-slate-50/30 transition-all">
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-900">{apt.patient?.name || "Unknown Patient"}</div>
                      <div className="text-[10px] text-slate-400 font-medium tracking-tighter uppercase">{apt.appointmentId}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-700">{apt.doctor?.name || "Unassigned"}</div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase">{apt.doctor?.specialty}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-bold text-slate-900">{apt.timeSlot}</div>
                      <span className={`text-[9px] font-black border uppercase px-1.5 py-0.5 rounded ${apt.type === 'Online' ? 'border-primary/20 text-primary bg-primary/5' : 'border-emerald-200 text-emerald-600 bg-emerald-50'}`}>
                        {apt.type}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                       <select 
                         value={apt.status}
                         onChange={(e) => handleStatusChange(apt.id, e.target.value as any)}
                         className={`px-3 py-1 rounded-full text-[10px] font-bold border-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer ${
                           apt.status === 'In-Progress' ? 'bg-emerald-500 text-white' : 
                           apt.status === 'Waiting' ? 'bg-amber-100 text-amber-700' : 
                           apt.status === 'Completed' ? 'bg-blue-50 text-blue-600' :
                           apt.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' :
                           'bg-slate-100 text-slate-500'
                         }`}
                       >
                         <option value="Scheduled">Scheduled</option>
                         <option value="Waiting">Waiting</option>
                         <option value="In-Progress">In-Progress</option>
                         <option value="Completed">Completed</option>
                         <option value="Cancelled">Cancelled</option>
                       </select>
                    </td>
                    <td className="px-8 py-5">
                      <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sidebar: Notifications & Quick Actions */}
      <div className="col-span-12 xl:col-span-4 space-y-8">
        {/* Doctor Notifications */}
        <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group">
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-all"></div>
          
          <div className="relative z-10">
            <h3 className="font-outfit font-black text-xl mb-6">Doctor <span className="text-emerald-400">Notifications.</span></h3>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">New Booking Request</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Dr. Thorne has a new emergency consult pending in Ward C.</p>
                    <span className="text-[9px] text-emerald-400 font-bold mt-2 inline-block">2 mins ago</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-4 bg-white text-slate-900 font-black text-[11px] uppercase tracking-[2px] rounded-2xl hover:bg-emerald-400 hover:text-white transition-all">
              Broadcast Alert
            </button>
          </div>
        </div>
        
        {/* Quick Booking */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
           <h3 className="font-outfit font-black text-lg text-slate-900 mb-6">Omni-Channel Booking</h3>
           <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-emerald-500 transition-all cursor-pointer">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg">📱</div>
                    <div>
                       <div className="text-[11px] font-black uppercase text-slate-900">Virtual Portal</div>
                       <div className="text-[10px] text-slate-400">Open App Interface</div>
                    </div>
                 </div>
                 <div className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all">→</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-emerald-500 transition-all cursor-pointer">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-lg">🏥</div>
                    <div>
                       <div className="text-[11px] font-black uppercase text-slate-900">Walk-in Register</div>
                       <div className="text-[10px] text-slate-400">Offline Counter Entry</div>
                    </div>
                 </div>
                 <div className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all">→</div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
