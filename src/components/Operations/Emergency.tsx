import { useState } from "react";

export function Emergency() {
  const [alertLevel, setAlertLevel] = useState("normal");

  const alertAssets = [
    { label: "Active Ambulances", value: "04", total: "06", color: "blue", trend: "On-Call" },
    { label: "Trauma Bays", value: "02", total: "08", color: "emerald", trend: "Available" },
    { label: "Blood Reserve", value: "Critical", total: "O-", color: "rose", trend: "Request Sent" },
    { label: "Response Team", value: "Beta", total: "On-Site", color: "amber", trend: "Standby" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Critical Status Bar */}
      <div className={`p-8 rounded-[40px] border flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 shadow-2xl ${
        alertLevel === 'code-blue' 
          ? 'bg-rose-600 border-rose-500 shadow-rose-500/30' 
          : 'bg-white border-slate-100 shadow-slate-200/20'
      }`}>
        <div className="flex items-center gap-6">
           <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black transition-all ${
             alertLevel === 'code-blue' ? 'bg-white text-rose-600 animate-pulse' : 'bg-rose-50 text-rose-500'
           }`}>
              🚨
           </div>
           <div className="text-center md:text-left">
              <h3 className={`text-2xl font-outfit font-black transition-colors ${alertLevel === 'code-blue' ? 'text-white' : 'text-slate-900'}`}>
                Emergency <span className={alertLevel === 'code-blue' ? 'text-rose-100 italic' : 'text-rose-500 italic'}>Response Node.</span>
              </h3>
              <p className={`text-xs font-bold uppercase tracking-[3px] mt-1 transition-colors ${alertLevel === 'code-blue' ? 'text-rose-200' : 'text-slate-400'}`}>
                Level: {alertLevel === 'code-blue' ? 'Critical Action Required' : 'Standard Monitoring'}
              </p>
           </div>
        </div>
        
        <div className="flex gap-4">
           {alertLevel !== 'code-blue' ? (
             <button 
               onClick={() => setAlertLevel("code-blue")}
               className="px-10 py-5 bg-rose-600 text-white rounded-3xl font-black text-[11px] uppercase tracking-[4px] shadow-xl shadow-rose-600/20 hover:bg-rose-700 transition-all hover:-translate-y-1 active:scale-95"
             >
               Trigger Code Blue
             </button>
           ) : (
             <button 
               onClick={() => setAlertLevel("normal")}
               className="px-10 py-5 bg-white text-rose-600 rounded-3xl font-black text-[11px] uppercase tracking-[4px] shadow-xl hover:bg-rose-50 transition-all"
             >
               Clear Critical Alert
             </button>
           )}
           <button className="px-10 py-5 bg-slate-100 text-slate-900 rounded-3xl font-black text-[11px] uppercase tracking-[2px] hover:bg-slate-200 transition-all">Triage Register</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 ">
        {/* Ambulance Tracking Simulation */}
        <div className="col-span-12 xl:col-span-8 bg-slate-900 rounded-[40px] p-10 border border-slate-800 shadow-2xl relative overflow-hidden group min-h-[500px]">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
           
           <div className="flex justify-between items-start relative z-10 mb-10">
              <div>
                 <h4 className="text-white font-outfit font-black text-2xl uppercase tracking-tighter">Live Fleet <span className="text-blue-400">Tracking.</span></h4>
                 <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Satellite Telemetry Data Active</p>
              </div>
              <div className="flex gap-4">
                 <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-white uppercase tracking-widest">
                    Sat: 12 Active
                 </div>
                 <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
                    Connection Stable
                 </div>
              </div>
           </div>

           {/* Stylized Map Backdrop Placeholder */}
           <div className="absolute inset-x-10 bottom-10 top-32 rounded-[32px] bg-slate-800 border border-white/5 overflow-hidden group-hover:bg-slate-800/80 transition-all">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
              
              {/* Dynamic Markers */}
              {[
                { top: '20%', left: '30%', id: 'AM-01', status: 'En-Route', eta: '4 min' },
                { top: '60%', left: '70%', id: 'AM-04', status: 'Returning', eta: '12 min' }
              ].map((am, i) => (
                <div key={i} className="absolute" style={{ top: am.top, left: am.left }}>
                   <div className="relative group/marker">
                      <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute opacity-50"></div>
                      <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white relative z-10"></div>
                      <div className="absolute left-6 top-0 bg-slate-900/90 border border-white/10 p-3 rounded-xl backdrop-blur-md opacity-0 group-hover/marker:opacity-100 translate-x-4 group-hover/marker:translate-x-0 transition-all whitespace-nowrap">
                         <div className="text-[9px] font-black text-blue-400 uppercase">{am.id}</div>
                         <div className="text-white text-[11px] font-bold">{am.status}</div>
                         <div className="text-slate-400 text-[9px] font-black mt-1 uppercase">ETA: {am.eta}</div>
                      </div>
                   </div>
                </div>
              ))}

              <div className="absolute bottom-6 right-6 flex gap-3">
                 <div className="bg-slate-900 border border-white/10 p-4 rounded-2xl backdrop-blur-md text-white">
                    <div className="text-[10px] font-black text-slate-500 uppercase">Current Call</div>
                    <div className="text-sm font-bold mt-1 text-rose-500 animate-pulse uppercase tracking-wider">Sector 4 • RTA Trauma</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">Assigned: Unit 01 • Dr. Evans</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Rapid Assessment Sidebar */}
        <div className="col-span-12 xl:col-span-4 space-y-8 text-black ">
           <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
              <h4 className="font-outfit font-black text-xl mb-6">Immediate <span className="text-rose-500 italic">Triage.</span></h4>
              
              <div className="space-y-4">
                 {[
                   { zone: "Red", label: "Catastrophic", count: "0", desc: "Life-threatening, immediate surgery" },
                   { zone: "Yellow", label: "Urgent", count: "2", desc: "Stable for 30-60 mins" },
                   { zone: "Green", label: "Minor", count: "5", desc: "Non-critical casualties" }
                 ].map((tr, i) => (
                   <div key={i} className="group p-5 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-white hover:border-slate-200 transition-all cursor-pointer">
                      <div className="flex justify-between items-start">
                         <div className="flex gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                              tr.zone === 'Red' ? 'bg-rose-50 text-rose-500' : 
                              tr.zone === 'Yellow' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'
                            }`}>
                               {tr.zone[0]}
                            </div>
                            <div>
                               <div className="text-xs font-bold text-slate-900 tracking-tight">{tr.label} <span className="text-[10px] text-slate-400 font-medium ml-2">{tr.zone} Zone</span></div>
                               <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{tr.desc}</p>
                            </div>
                         </div>
                         <div className="text-xl font-black font-outfit text-slate-900">{tr.count}</div>
                      </div>
                   </div>
                 ))}
              </div>

              <button className="w-full mt-8 py-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl font-black text-[11px] uppercase tracking-[2px] hover:bg-rose-100 transition-all">Submit Triage Report</button>
           </div>

           <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden text-black ">
              <div className="relative z-10">
                 <h4 className="text-white font-outfit font-black text-lg mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    Resource <span className="text-slate-400 font-normal">Buffer.</span>
                 </h4>
                 
                 <div className="grid grid-cols-2 gap-4">
                    {alertAssets.map((asset, i) => (
                       <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{asset.label}</div>
                          <div className="flex items-baseline gap-1 mt-1">
                             <div className={`text-xl font-black font-outfit ${
                               asset.color === 'blue' ? 'text-blue-400' :
                               asset.color === 'emerald' ? 'text-emerald-400' :
                               asset.color === 'rose' ? 'text-rose-400' :
                               asset.color === 'amber' ? 'text-amber-400' : 'text-slate-400'
                             }`}>{asset.value}</div>
                             <div className="text-[10px] text-white/20">/ {asset.total}</div>
                          </div>
                          <div className="mt-2 text-[8px] font-bold text-slate-400 uppercase tracking-tighter opacity-60 italic">{asset.trend}</div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
