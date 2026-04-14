import { useOperationTheatres, useUpdateOperationTheatre } from "../../config/hooks/ot.hooks";

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

export function OperationTheatres() {
  const { data: theatres, isLoading, isError } = useOperationTheatres();
  const updateOT = useUpdateOperationTheatre();

  const handleTheatreAction = (ot: any) => {
    if (ot.status === 'Ready') {
      updateOT.mutate({
        id: ot.id,
        status: 'Active Surgery',
        doctor: 'Dr. Sarah Connor',
        procedure: 'Emergency Appendectomy',
        progress: 10
      });
    } else if (ot.status === 'Active Surgery') {
      updateOT.mutate({
        id: ot.id,
        status: 'Cleaning',
        doctor: null,
        procedure: null,
        progress: 0
      });
    } else {
      updateOT.mutate({
        id: ot.id,
        status: 'Ready'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm h-[600px] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black text-[0.6rem] uppercase tracking-widest">Accessing Surgical Matrix...</p>
         </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-rose-50 p-12 rounded-[40px] border border-rose-100 text-center">
         <h4 className="text-xl font-black text-rose-600 mb-2">Surgical Node De-synchronization</h4>
         <p className="text-rose-400 font-medium italic">Failed to retrieve theatre records. Institutional security protocols active.</p>
      </div>
    );
  }

  if (!theatres || theatres.length === 0) {
    return (
      <div className="bg-slate-50 p-12 rounded-[40px] border border-dashed border-slate-200 text-center">
         <h4 className="text-xl font-black text-slate-400">No Surgical Nodes Initialized</h4>
         <p className="text-slate-300 font-medium mt-2 tracking-tight">Access Clinical Infrastructure for OT Expansion.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
        <div>
          <h3 className="text-xl font-black text-slate-900 leading-none">Operation Theatres (OT) Matrix</h3>
          <p className="text-sm text-slate-400 font-medium mt-2">Managing theatre slots, equipment status, and surgical flow.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-bold text-xs text-slate-700 shadow-sm hover:bg-slate-50">Surgery Logs</button>
           <button 
             onClick={() => {
               theatres?.filter(o => o.status === 'Ready').forEach(o => {
                 handleTheatreAction(o);
               });
             }}
             disabled={updateOT.isPending || !theatres?.some(o => o.status === 'Ready')}
             className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs shadow-lg shadow-primary-glow hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
           >
             {updateOT.isPending ? 'DEPLOYING...' : 'Emergency Protocol'}
           </button>
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 xl:grid-cols-2 gap-8">
        {theatres.map((ot) => (
          <div key={ot.id} className="bg-white p-8 rounded-[36px] border border-slate-200/60 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-2 h-full ${
              ot.status === 'Active Surgery' ? 'bg-rose-500' :
              ot.status === 'Ready' ? 'bg-emerald-500' : 'bg-amber-500'
            }`}></div>
            
            <div className="flex justify-between items-start mb-8 pl-4">
               <div>
                  <h4 className="text-2xl font-black text-slate-900">{ot.theatreId}</h4>
                  <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mt-1">Surgical Node Capacity</p>
               </div>
               <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                 ot.status === 'Active Surgery' ? 'bg-rose-50 text-rose-600 border border-rose-100 animate-pulse' :
                 ot.status === 'Ready' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                 'bg-amber-50 text-amber-600 border border-amber-100'
               }`}>
                 {ot.status}
               </div>
            </div>

            <div className="bg-slate-50 rounded-[28px] p-8 space-y-6 ml-4">
               {ot.status === "Active Surgery" ? (
                 <>
                    <div className="flex justify-between items-center">
                       <div className="space-y-1">
                          <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Lead Surgeon</span>
                          <p className="text-sm font-black text-slate-800 underline decoration-primary/20 underline-offset-4">{ot.doctor || 'PT-PENDING'}</p>
                       </div>
                       <div className="text-right space-y-1">
                          <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Procedural Code</span>
                          <p className="text-sm font-black text-slate-800">{ot.procedure || 'GENERAL'}</p>
                       </div>
                    </div>
                    
                    <div className="space-y-3">
                       <div className="flex justify-between items-center text-[0.7rem] font-black uppercase text-rose-600">
                          <span>Surgery in Progress</span>
                          <span>{ot.progress}% Complete</span>
                       </div>
                       <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full transition-all duration-1000" style={{ width: `${ot.progress}%` }}></div>
                       </div>
                    </div>
                 </>
               ) : ot.status === "Ready" ? (
                  <div className="py-10 text-center space-y-4">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-emerald-500 border border-emerald-50 ring-8 ring-emerald-50/30">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                     </div>
                     <div>
                        <h5 className="font-black text-slate-900">Immediate Slot Available</h5>
                        <p className="text-xs text-slate-400 font-semibold tracking-tight">Full clinical sanitization completed.</p>
                     </div>
                  </div>
               ) : (
                  <div className="flex items-center justify-center gap-4 py-10 opacity-60 italic text-slate-400 font-bold tracking-tight">
                     <ClockIcon />
                     <span>Post-Operative Sanitization...</span>
                  </div>
               )}
            </div>

            <div className="mt-8 flex justify-between items-center pl-4 pr-4">
               <div className="flex items-center gap-2">
                  <span className="text-[0.65rem] font-bold text-slate-400">EQUIPMENT:</span>
                  <span className="text-[0.65rem] font-black text-slate-700 uppercase">{ot.equipment}</span>
               </div>
                <button 
                  onClick={() => handleTheatreAction(ot)}
                  disabled={updateOT.isPending}
                  className={`px-6 py-2 rounded-xl font-black text-[0.6rem] uppercase tracking-widest transition-all ${
                    ot.status === 'Ready' ? 'bg-primary text-white' : 
                    ot.status === 'Active Surgery' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
                  }`}
                >
                   {updateOT.isPending ? 'Updating...' : 
                    ot.status === 'Ready' ? 'Book Slot' : 
                    ot.status === 'Active Surgery' ? 'Complete Surgery' : 'Mark Ready'}
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
