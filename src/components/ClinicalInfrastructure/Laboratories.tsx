import { useState } from "react";
import { useLabTests } from "../../config/hooks/lab.hooks";

const FlaskIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.5"></path><path d="M14 2v7.5"></path><path d="M8.5 2h7"></path><path d="M14 11.5c.66 0 1.2.55 1.2 1.22 0 .3-.1.57-.29.82a6.11 6.11 0 0 1 1.09 3.42 6 6 0 0 1-12 0c0-1.3.4-2.5 1.09-3.42a1.36 1.36 0 0 1-.29-.82c0-.67.54-1.22 1.2-1.22h8Z"></path></svg>
);

export function Laboratories() {
  const [search, setSearch] = useState("");
  const { data: tests, isLoading, isError } = useLabTests();

  const filteredTests = tests?.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.testId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 leading-none">Diagnostic Node & Labs</h3>
          <p className="text-sm text-slate-400 font-medium mt-2">Managing test catalogs, clinical samples, and result pipelines.</p>
        </div>
        
        <div className="relative group w-full md:w-[400px]">
           <input 
             type="text" 
             placeholder="Search diagnostic tests..." 
             className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-primary/30 px-6 py-4 rounded-2xl outline-none font-bold text-sm transition-all"
             onChange={(e) => setSearch(e.target.value)}
           />
        </div>
      </div>

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-4">
            <h5 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest pl-2">Active Catalog</h5>
            
            {isLoading && (
              <div className="space-y-4 animate-pulse">
                {Array(4).fill(0).map((_, i) => (
                   <div key={i} className="bg-slate-50 h-[80px] rounded-[28px] border border-slate-100"></div>
                ))}
              </div>
            )}

            {isError && (
               <div className="bg-rose-50 p-8 rounded-[28px] border border-rose-100 text-center">
                  <p className="text-rose-500 font-black text-xs uppercase tracking-widest">Diagnostic Handshake Failed</p>
               </div>
            )}

            {!isLoading && !isError && filteredTests?.map((test) => (
              <div key={test.id} className="bg-white p-6 rounded-[28px] border border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all flex justify-between items-center group">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                       <FlaskIcon />
                    </div>
                    <div>
                       <h4 className="font-black text-slate-900 leading-tight">{test.name}</h4>
                       <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">{test.testId} • {test.type}</span>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-black text-slate-900 mb-1">{test.price}</p>
                    <span className={`px-3 py-1 rounded-lg text-[0.6rem] font-black uppercase tracking-widest ${
                      test.status === 'Critical Priority' ? 'bg-red-50 text-red-600' :
                      test.status === 'Urgent' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                    }`}>{test.status}</span>
                 </div>
              </div>
            ))}

            {!isLoading && !isError && filteredTests?.length === 0 && (
               <div className="bg-slate-50 p-12 rounded-[28px] border border-dashed border-slate-200 text-center">
                  <p className="text-slate-400 font-bold text-sm tracking-tight">No diagnostic tests matching your query.</p>
               </div>
            )}
         </div>

         <div className="bg-slate-900 rounded-[36px] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <FlaskIcon />
            </div>
            
            <div className="relative z-10 mb-12">
               <h3 className="text-2xl font-black mb-2">Sample Tracking <span className="text-primary italic">Live.</span></h3>
               <p className="text-white/40 font-medium text-sm">Automated diagnostic pipeline tracking.</p>
            </div>

            <div className="space-y-8 relative z-10">
               <div className="flex gap-6 items-start">
                  <div className="w-1 h-12 bg-primary rounded-full"></div>
                  <div>
                     <span className="text-[0.6rem] font-black text-primary uppercase tracking-[2px]">Phase 1: Collection</span>
                     <p className="font-bold text-sm text-white/80">Batch #4092-A processed at Phlebotomy Node 4.</p>
                     <span className="text-[0.6rem] font-bold text-white/30 italic">2 mins ago</span>
                  </div>
               </div>
               <div className="flex gap-6 items-start">
                  <div className="w-1 h-12 bg-white/10 rounded-full"></div>
                  <div>
                     <span className="text-[0.6rem] font-black text-white/40 uppercase tracking-[2px]">Phase 2: Centrifugation</span>
                     <p className="font-bold text-sm text-white/40 italic">Waiting for next batch cycle...</p>
                  </div>
               </div>
            </div>

            <button className="w-full mt-12 py-5 bg-white text-slate-900 rounded-[24px] font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl">DOWNLOAD STATUS REPORT</button>
         </div>
      </div>
    </div>
  );
}
