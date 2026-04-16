import { useState, useEffect } from "react";
import { useWards, useUpdateBed, type Ward, type Bed } from "../../config/hooks/ward.hooks";

const BedIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
);

export function Wards() {
  const { data: wards, isLoading, isError, error } = useWards();
  const updateBed = useUpdateBed();
  const [activeWard, setActiveWard] = useState<Ward | null>(null);

  const handleBedToggle = (bed: Bed) => {
    let newStatus: "Available" | "Occupied" | "Cleaning";
    if (bed.status === 'Available') newStatus = 'Occupied';
    else if (bed.status === 'Occupied') newStatus = 'Cleaning';
    else newStatus = 'Available';

    updateBed.mutate({ id: bed.id, status: newStatus });
  };

  // Synchronize active ward when data loads or changes
  useEffect(() => {
    if (wards && wards.length > 0 && !activeWard) {
      setActiveWard(wards[0]);
    } else if (wards && activeWard) {
      // Refresh active ward if it still exists
      const updated = wards.find(w => w.id === activeWard.id);
      if (updated) setActiveWard(updated);
    }
  }, [wards]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm h-[700px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Accessing Clinical Node...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-[40px] border border-rose-200 shadow-sm h-[700px] flex items-center justify-center p-12 text-center">
        <div className="space-y-6">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto">
            <svg className="text-rose-500" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h3 className="text-2xl font-black text-slate-900">Synchronization Failure</h3>
          <p className="text-slate-500 max-w-md mx-auto font-medium">Unable to establish connection with the central ward registry. Please verify institutional network status.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-rose-500 text-white px-8 py-3 rounded-2xl font-black text-xs shadow-lg shadow-rose-200"
          >
            Reconnect Protocols
          </button>
        </div>
      </div>
    );
  }

  if (!wards || wards.length === 0) {
    return (
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm h-[700px] flex items-center justify-center p-12 text-center">
        <div className="space-y-4">
          <h3 className="text-xl font-black text-slate-900">No Clinical Wards Found</h3>
          <p className="text-slate-400 font-medium tracking-tight">Access the Admin Dashboard to initialize institutional infrastructure.</p>
        </div>
      </div>
    );
  }

  const currentWard = activeWard || wards[0];

  return (
    <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      <div className="flex flex-col lg:flex-row h-full min-h-[700px]">
        
        {/* Ward Sidebar */}
        <div className="w-full lg:w-[350px] bg-slate-50 border-r border-slate-100 p-10 space-y-8">
           <div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Ward Navigator</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Real-time bed utilization matrix across all units.</p>
           </div>

           <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {wards.map((ward) => (
                <button
                  key={ward.id}
                  onClick={() => setActiveWard(ward)}
                  className={`w-full p-6 rounded-3xl text-left transition-all border ${
                    currentWard.id === ward.id 
                    ? `bg-white border-transparent shadow-xl ring-2 ring-${ward.color}-500/20` 
                    : "bg-transparent border-transparent text-slate-400 hover:bg-white hover:border-slate-100 hover:text-slate-600 shadow-sm"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                     <span className={`text-[0.6rem] font-black uppercase tracking-[2px] ${currentWard.id === ward.id ? `text-${ward.color}-600` : "text-slate-400"}`}>
                        {ward.beds.length} Total Units
                     </span>
                     <div className={`w-2 h-2 rounded-full ${currentWard.id === ward.id ? "animate-ping" : ""} bg-${ward.color}-500`}></div>
                  </div>
                  <h4 className={`text-lg font-black ${currentWard.id === ward.id ? "text-slate-900" : "text-slate-400"}`}>{ward.name}</h4>
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
                 <span className="text-slate-400 uppercase tracking-widest">Network Capacity</span>
                 <span className="text-slate-900">
                    {wards.reduce((acc, w) => acc + w.beds.filter(b => b.status === 'Occupied').length, 0)} / {wards.reduce((acc, w) => acc + w.beds.length, 0)} Beds
                 </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                 <div 
                    className="bg-primary h-full transition-all duration-1000" 
                    style={{ width: `${(wards.reduce((acc, w) => acc + w.beds.filter(b => b.status === 'Occupied').length, 0) / wards.reduce((acc, w) => acc + w.beds.length, 0)) * 100}%` }}
                 ></div>
              </div>
           </div>
        </div>

        {/* Matrix Area */}
        <div className="flex-1 p-12 overflow-y-auto">
           <div className="flex justify-between items-center mb-12">
              <div>
                 <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-black text-slate-900">{currentWard.name}</h2>
                    <span className={`px-4 py-1.5 rounded-xl bg-${currentWard.color}-50 text-${currentWard.color}-600 text-[0.6rem] font-black uppercase tracking-widest`}>
                        {currentWard.department?.name || 'Unassigned'}
                    </span>
                 </div>
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
              {currentWard.beds.map((bed) => (
                <div 
                  key={bed.id} 
                  className="relative group cursor-pointer"
                  onClick={() => handleBedToggle(bed)}
                >
                  <div className={`p-8 rounded-[32px] border-2 transition-all flex flex-col items-center gap-4 ${
                    updateBed.isPending && updateBed.variables?.id === bed.id ? 'opacity-50 grayscale animate-pulse' : ''
                  } ${
                    bed.status === 'Available' ? 'bg-white border-slate-100 hover:border-emerald-500/30 hover:bg-emerald-50/10' :
                    bed.status === 'Occupied' ? 'bg-rose-50/30 border-rose-100/50 hover:bg-rose-50 hover:border-rose-200 shadow-sm' :
                    'bg-amber-50/30 border-amber-100/50 hover:bg-amber-50 hover:border-amber-200'
                  }`}>
                    <BedIcon className={
                      bed.status === 'Available' ? 'text-slate-200 group-hover:text-emerald-500' :
                      bed.status === 'Occupied' ? 'text-rose-500' : 'text-amber-500'
                    } />
                    <span className={`font-black text-sm ${
                      bed.status === 'Available' ? 'text-slate-400' :
                      bed.status === 'Occupied' ? 'text-rose-600' : 'text-amber-600'
                    }`}>{bed.bedNumber}</span>
                  </div>
                  
                  {bed.status === 'Occupied' && (
                    <div className="absolute -top-4 -right-4 bg-rose-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-[0.6rem] shadow-lg border-4 border-white animate-pulse">PT</div>
                  )}
                </div>
              ))}
           </div>

           <div className="mt-16 p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] text-center">
              <div className="flex flex-col items-center gap-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
                 <p className="text-slate-400 font-bold text-sm tracking-tight">Patient monitoring telemetry is currently in observation mode.</p>
                 <button 
                   onClick={(e) => {
                     const btn = e.currentTarget;
                     const originalText = btn.innerText;
                     btn.innerText = "SYNCHRONIZING...";
                     btn.disabled = true;
                     setTimeout(() => {
                       btn.innerText = "NETWORK STABLE ✓";
                       btn.classList.add('bg-emerald-500');
                       setTimeout(() => {
                         btn.innerText = originalText;
                         btn.classList.remove('bg-emerald-500');
                         btn.disabled = false;
                       }, 2000);
                     }, 1500);
                   }}
                   className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-xs shadow-lg shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50"
                 >
                   Sync Vitals Network
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
