import { useState } from "react";

const BedIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
);

// Mock Data for Bed Matrix
const WARD_DATA = [
  { name: "ICU Unit A", beds: Array(12).fill(null).map((_, i) => ({ id: `B-${i+1}`, status: i % 4 === 0 ? "Cleaning" : i % 3 === 0 ? "Available" : "Occupied" })), color: "rose" },
  { name: "General Ward 4B", beds: Array(16).fill(null).map((_, i) => ({ id: `B-${i+1}`, status: i % 5 === 0 ? "Available" : "Occupied" })), color: "blue" },
  { name: "VIP Suite", beds: Array(4).fill(null).map((_, i) => ({ id: `S-${i+1}`, status: i === 1 ? "Occupied" : "Available" })), color: "amber" },
];

export function Wards() {
  const [activeWard, setActiveWard] = useState(WARD_DATA[0]);

  return (
    <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      <div className="flex flex-col lg:flex-row h-full min-h-[700px]">
        
        {/* Ward Sidebar */}
        <div className="w-full lg:w-[350px] bg-slate-50 border-r border-slate-100 p-10 space-y-8">
           <div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Ward Navigator</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Real-time bed utilization matrix across all units.</p>
           </div>

           <div className="space-y-3">
              {WARD_DATA.map((ward) => (
                <button
                  key={ward.name}
                  onClick={() => setActiveWard(ward)}
                  className={`w-full p-6 rounded-3xl text-left transition-all border ${
                    activeWard.name === ward.name 
                    ? `bg-white border-transparent shadow-xl ring-2 ring-${ward.color}-500/20` 
                    : "bg-transparent border-transparent text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                     <span className={`text-[0.6rem] font-black uppercase tracking-[2px] ${activeWard.name === ward.name ? `text-${ward.color}-600` : "text-slate-400"}`}>
                        {ward.beds.length} Total Units
                     </span>
                     <div className={`w-2 h-2 rounded-full ${activeWard.name === ward.name ? "animate-ping" : ""} bg-${ward.color}-500`}></div>
                  </div>
                  <h4 className={`text-lg font-black ${activeWard.name === ward.name ? "text-slate-900" : "text-slate-400"}`}>{ward.name}</h4>
                  <div className="mt-4 flex gap-2">
                     <div className={`px-3 py-1 bg-${ward.color}-50 text-${ward.color}-600 rounded-lg text-[0.65rem] font-black`}>
                        {ward.beds.filter(b => b.status === "Occupied").length} Occupied
                     </div>
                  </div>
                </button>
              ))}
           </div>

           <div className="pt-8 border-t border-slate-200 space-y-4">
              <div className="flex justify-between text-[0.7rem] font-bold">
                 <span className="text-slate-400">TOTAL CAPACITY</span>
                 <span className="text-slate-900">32 / 120 Beds</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                 <div className="bg-primary h-full w-[26%]"></div>
              </div>
           </div>
        </div>

        {/* Matrix Area */}
        <div className="flex-1 p-12">
           <div className="flex justify-between items-center mb-12">
              <div>
                 <h2 className="text-3xl font-black text-slate-900">{activeWard.name}</h2>
                 <p className="text-slate-400 font-medium">Select a patient-unit to view telemetry or clinical records.</p>
              </div>
              
              <div className="flex gap-4">
                 {["Available", "Occupied", "Cleaning"].map((status) => (
                   <div key={status} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-md ${
                        status === 'Available' ? 'bg-emerald-500' :
                        status === 'Occupied' ? 'bg-rose-500' : 'bg-amber-500'
                      }`}></div>
                      <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">{status}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
              {activeWard.beds.map((bed) => (
                <div key={bed.id} className="relative group cursor-pointer">
                  <div className={`p-8 rounded-[32px] border-2 transition-all flex flex-col items-center gap-4 ${
                    bed.status === 'Available' ? 'bg-white border-slate-100 hover:border-emerald-500/30 hover:bg-emerald-50/10' :
                    bed.status === 'Occupied' ? 'bg-rose-50/30 border-rose-100/50 hover:bg-rose-50 hover:border-rose-200' :
                    'bg-amber-50/30 border-amber-100/50 hover:bg-amber-50 hover:border-amber-200'
                  }`}>
                    <BedIcon className={
                      bed.status === 'Available' ? 'text-slate-200 group-hover:text-emerald-500' :
                      bed.status === 'Occupied' ? 'text-rose-500' : 'text-amber-500'
                    } />
                    <span className={`font-black text-sm ${
                      bed.status === 'Available' ? 'text-slate-400' :
                      bed.status === 'Occupied' ? 'text-rose-600' : 'text-amber-600'
                    }`}>{bed.id}</span>
                  </div>
                  
                  {/* Hover Tooltip/Popup placeholder */}
                  {bed.status === 'Occupied' && (
                    <div className="absolute -top-4 -right-4 bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-[0.6rem] shadow-lg border-4 border-white">PT</div>
                  )}
                </div>
              ))}
           </div>

           <div className="mt-16 p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] text-center">
              <p className="text-slate-400 font-bold text-sm tracking-tight mb-4">Patient monitoring telemetry is currently in observation mode.</p>
              <button className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-xs shadow-lg shadow-primary-glow">Sync Vitals Network</button>
           </div>
        </div>
      </div>
    </div>
  );
}
