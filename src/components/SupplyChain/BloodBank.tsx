

import { useState } from "react";
import { useBloodBank, useUpdateBloodStock, useDonors } from "../../config/hooks/supply-chain.hooks";

const DropIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5L12 2 8 9.5c-2 1.6-3 3.5-3 5.5a7 7 0 0 0 7 7z"></path></svg>
);

const STATUS_COLORS: Record<string, string> = {
  rose: 'bg-rose-500 text-rose-600 ring-rose-50',
  emerald: 'bg-emerald-500 text-emerald-600 ring-emerald-50',
  amber: 'bg-amber-500 text-amber-600 ring-amber-50',
  red: 'bg-red-500 text-red-600 ring-red-50',
  blue: 'bg-blue-500 text-blue-600 ring-blue-50',
};

const getStatusColorName = (status: string) => {
  switch (status) {
    case "Critical": return "rose";
    case "Optimal": return "emerald";
    case "Low": return "amber";
    case "Emergency": return "red";
    default: return "blue";
  }
};

export function BloodBank() {
  const [view, setView] = useState<"inventory" | "donors">("inventory");
  const { data: bloodStocks, isLoading: stocksLoading, isError: stocksError } = useBloodBank();
  const { data: donors, isLoading: donorsLoading } = useDonors();
  const updateBlood = useUpdateBloodStock();

  const handleExtraction = (id: string, currentUnits: number) => {
    if (currentUnits <= 0) return;
    updateBlood.mutate({ 
      id, 
      units: Math.max(0, currentUnits - 10), 
      status: currentUnits - 10 < 20 ? "Critical" : "Optimal" 
    });
  };

  const handleRestock = (id: string, currentUnits: number) => {
    updateBlood.mutate({ 
      id, 
      units: currentUnits + 20, 
      status: "Optimal" 
    });
  };

  if (stocksLoading || donorsLoading) {
    return (
      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm h-[600px] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black text-[0.6rem] uppercase tracking-widest">Accessing Hematological Reserve...</p>
         </div>
      </div>
    );
  }

  if (stocksError) {
    return (
      <div className="bg-rose-50 p-12 rounded-[40px] border border-rose-100 text-center">
         <h4 className="text-xl font-black text-rose-600 mb-2">Registry De-synchronization</h4>
         <p className="text-rose-400 font-medium">Failed to retrieve blood inventory. Institutional protocols active.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      <div className="p-12 border-b border-slate-100 flex justify-between items-end">
         <div>
            <div className="flex items-center gap-4 mb-4">
               <div className="p-3 bg-rose-500 text-white rounded-2xl shadow-lg ring-8 ring-rose-50">
                  <DropIcon />
               </div>
               <h3 className="text-3xl font-outfit font-black text-slate-900 leading-none tracking-tight">
                 {view === 'inventory' ? 'Hematological Reserve' : 'Donor Database Registry'}
               </h3>
            </div>
            <p className="text-slate-400 font-medium max-w-lg">
              {view === 'inventory' 
                ? 'Managing critical blood inventory, cross-matching protocol, and institutional supply.' 
                : 'Centralized registry of eligible Institutional donors and contribution history.'}
            </p>
         </div>
         <div className="flex gap-4">
            <button 
              onClick={() => setView(view === 'inventory' ? 'donors' : 'inventory')}
              className={`px-8 py-4 rounded-2xl font-black text-xs transition-all border shadow-sm ${
                view === 'donors' ? 'bg-slate-900 text-white border-transparent' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {view === 'inventory' ? 'Donor Database' : 'Back to Inventory'}
            </button>
            <button 
               onClick={() => {
                  if (!bloodStocks || bloodStocks.length === 0) {
                    alert("Registry Error: No blood nodes identified.");
                    return;
                  }
                  
                  // Pick the group with maximum units
                  const mostAvailable = [...bloodStocks].sort((a, b) => b.units - a.units)[0];
                  
                  if (mostAvailable && mostAvailable.units >= 25) {
                    const groupName = mostAvailable.group;
                    updateBlood.mutate(
                      { 
                        id: mostAvailable.id, 
                        units: mostAvailable.units - 25, 
                        status: (mostAvailable.units - 25) < 30 ? "Low" : "Optimal" 
                      },
                      {
                        onSuccess: () => alert(`Emergency Protocol: 25 units of ${groupName} extracted and dispatched.`),
                        onError: () => alert("Institutional Override: Extraction failed. Verify security clearance.")
                      }
                    );
                  } else {
                    alert("Resource Insufficiency: No group has >= 25 units available.");
                  }
               }}
               disabled={updateBlood.isPending || !bloodStocks?.some(b => b.units >= 25)}
               className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black text-xs shadow-xl shadow-rose-200 hover:-translate-y-1 transition-all disabled:opacity-50"
            >
               {updateBlood.isPending ? "EXTRACTION IN PROGRESS..." : "Emergency Extraction (25u)"}
            </button>
         </div>
      </div>

      {view === 'inventory' ? (
        <div className="animate-fade">
          <div className="p-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 bg-slate-50/20">
            {bloodStocks?.map((bt) => {
              const colorName = getStatusColorName(bt.status);
              const barColorClass = colorName === 'rose' ? 'bg-rose-500' : colorName === 'emerald' ? 'bg-emerald-500' : colorName === 'amber' ? 'bg-amber-500' : colorName === 'red' ? 'bg-red-500' : 'bg-blue-500';
              const textColorClass = colorName === 'rose' ? 'text-rose-600' : colorName === 'emerald' ? 'text-emerald-600' : colorName === 'amber' ? 'text-amber-600' : colorName === 'red' ? 'text-red-600' : 'text-blue-600';
              const bgColorClass = colorName === 'rose' ? 'bg-rose-50' : colorName === 'emerald' ? 'bg-emerald-50' : colorName === 'amber' ? 'bg-amber-50' : colorName === 'red' ? 'bg-red-50' : 'bg-blue-50';

              return (
                <div key={bt.id} className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group flex flex-col items-center gap-6 relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1.5 ${barColorClass}`}></div>
                    <div className="text-center">
                       <div className="flex flex-col items-center gap-1">
                          <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400 mb-2 block">{bt.status}</span>
                          <div className="flex gap-2">
                             <button onClick={() => handleExtraction(bt.id, bt.units)} disabled={updateBlood.isPending || bt.units <= 0} className="text-[0.6rem] font-black text-rose-500 hover:underline disabled:opacity-30">- USE</button>
                             <button onClick={() => handleRestock(bt.id, bt.units)} disabled={updateBlood.isPending} className="text-[0.6rem] font-black text-emerald-500 hover:underline">+ ADD</button>
                          </div>
                       </div>
                       <h4 className={`text-4xl font-outfit font-black tracking-tighter ${textColorClass}`}>{bt.group}</h4>
                    </div>
                    <div className="space-y-2 text-center">
                       <p className="text-2xl font-black text-slate-800">{bt.units}</p>
                       <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest leading-none">Standard Units</p>
                    </div>
                    <div className={`w-full h-1 rounded-full overflow-hidden ${bgColorClass}`}>
                       <div className={`h-full ${barColorClass} transition-all duration-1000`} style={{ width: `${Math.min((bt.units / 200) * 100, 100)}%` }}></div>
                    </div>
                </div>
              );
            })}
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
                <button 
              onClick={() => {
                alert("Initiating Full Grid Scan: Cross-referencing current inventory against scheduled surgical requirements...");
              }}
              className="w-full mt-10 py-5 bg-primary text-white rounded-[24px] font-black text-sm shadow-xl shadow-primary-glow hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Initiate Full Grid Scan
            </button>
             </div>

             <div className="flex flex-col gap-6">
                <div className="flex-1 bg-white border border-slate-200 rounded-[40px] p-10 shadow-sm hover:border-primary/20 transition-all">
                   <h4 className="text-lg font-black text-slate-900 mb-2">Donor Logistics</h4>
                   <p className="text-sm text-slate-400 font-medium mb-8">Scheduling screening for {donors?.length || 0} recognized institutional donors.</p>
                   <div className="flex -space-x-3 mb-8">
                      {donors?.slice(0, 4).map((d, i) => (
                        <div key={d.id} className="w-12 h-12 rounded-2xl bg-slate-100 border-4 border-white flex items-center justify-center font-black text-primary text-xs shadow-sm uppercase">{d.name[0]}</div>
                      ))}
                      {(donors?.length || 0) > 4 && (
                        <div className="w-12 h-12 rounded-2xl bg-primary text-white border-4 border-white flex items-center justify-center font-black text-xs">+{donors!.length - 4}</div>
                      )}
                   </div>
                   <button 
                     onClick={() => setView('donors')}
                     className="text-primary font-black text-xs uppercase tracking-widest hover:underline hover:scale-105 transition-all"
                   >
                     Manage Queue & Registry
                   </button>
                </div>
                {bloodStocks?.some(bt => bt.status === 'Critical') && (
                   <div className="p-8 bg-rose-50 border border-rose-100 rounded-[32px] flex items-center justify-between animate-pulse">
                      <div>
                         <h5 className="font-black text-rose-900 leading-none mb-1 text-lg">Rare Type Alert</h5>
                         <p className="text-rose-700/60 font-bold text-xs uppercase tracking-widest">
                            {bloodStocks.find(b => b.status === 'Critical')?.group} is below threshold.
                         </p>
                      </div>
                      <button 
                        onClick={() => alert(`Mass-Broadcast: Critical need for ${bloodStocks.find(b => b.status === "Critical")?.group} blood groups initiated.`)}
                        className="bg-rose-600 text-white px-6 py-3 rounded-xl font-black text-xs shadow-lg hover:bg-rose-700 transition-colors"
                      >
                        Broadcast Request
                      </button>
                   </div>
                )}
             </div>
          </div>
        </div>
      ) : (
        <div className="p-12 animate-fade overflow-x-auto min-h-[600px]">
           <table className="w-full text-left border-collapse">
             <thead>
                <tr className="border-b border-slate-100">
                   <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Donor Identity</th>
                   <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Group</th>
                   <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Eligibility</th>
                   <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Contact Protocol</th>
                   <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-right">Contribution History</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-50">
                {donors?.map((donor) => (
                   <tr key={donor.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-6">
                         <div className="flex flex-col">
                            <span className="font-black text-slate-900">{donor.name}</span>
                            <span className="text-[0.6rem] text-slate-400 uppercase tracking-widest font-bold">Contributor ID: {donor.id.slice(0, 8)}</span>
                         </div>
                      </td>
                      <td className="py-6 text-center">
                         <div className="inline-block w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center font-black font-outfit text-xl">
                            {donor.bloodGroup}
                         </div>
                      </td>
                      <td className="py-6 text-center">
                         <span className={`px-4 py-1.5 rounded-lg text-[0.6rem] font-black uppercase tracking-widest ${
                           donor.status === 'Eligible' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                         }`}>{donor.status}</span>
                      </td>
                      <td className="py-6 text-center text-sm font-mono font-bold text-slate-500">{donor.phone}</td>
                      <td className="py-6 text-right">
                         <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-slate-600">{donor.lastDonated ? new Date(donor.lastDonated).toLocaleDateString() : 'N/A'}</span>
                            <span className="text-[0.6rem] text-slate-400 uppercase font-black tracking-widest">Institutional Date</span>
                         </div>
                      </td>
                   </tr>
                ))}
                {!donors?.length && (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-slate-400 font-bold italic">No donor records synchronized.</td>
                  </tr>
                )}
             </tbody>
           </table>
        </div>
      )}
    </div>
  );
}
