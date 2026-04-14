import { useState } from "react";
import { useConsumables, useUpdateConsumable } from "../../config/hooks/supply-chain.hooks";

const ToolIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
);

export function Consumables() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: consumables, isLoading, isError, refetch } = useConsumables();
  const updateConsumable = useUpdateConsumable();

  const handleQuickRestock = (id: string, currentStock: number) => {
    updateConsumable.mutate({ id, stock: currentStock + 50, status: "Optimal" });
  };

  const handleAutoOrder = () => {
    const criticalItems = consumables?.filter(c => c.status === "Critical");
    criticalItems?.forEach(item => {
      updateConsumable.mutate({ 
        id: item.id, 
        stock: item.stock + 200, 
        status: "Optimal" 
      });
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm h-[600px] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black text-[0.6rem] uppercase tracking-widest">Scanning Logistical Grid...</p>
         </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-rose-50 p-12 rounded-[40px] border border-rose-100 text-center">
         <h4 className="text-xl font-black text-rose-600 mb-2">Supply Chain Disruption</h4>
         <p className="text-rose-400 font-medium">Failed to retrieve consumables inventory. Manual audit required.</p>
      </div>
    );
  }

  const filteredConsumables = consumables?.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.itemId.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      <div className="p-10 border-b border-slate-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-slate-50/20">
         <div className="w-full xl:w-auto">
            <h3 className="text-xl font-black text-slate-900 leading-none">Clinical Consumables</h3>
            <p className="text-sm text-slate-400 font-medium mt-2">Logistical tracking for surgical tools and daily essentials.</p>
            <div className="mt-6 flex bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
               <input 
                 type="text" 
                 placeholder="Search clinical supplies inventory..." 
                 className="bg-transparent border-none outline-none w-full font-bold text-xs"
                 onChange={(e) => setSearch(e.target.value)}
               />
            </div>
         </div>
         <div className="flex flex-col xl:flex-row gap-4 w-full xl:w-auto mt-6 xl:mt-0">
            <div className="flex bg-slate-100 p-1 rounded-xl">
               {['All', 'Surgical', 'PPE', 'General'].map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-6 py-2 rounded-lg text-[0.65rem] font-black transition-all ${
                     activeCategory === cat ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                   }`}
                 >
                   {cat.toUpperCase()}
                 </button>
               ))}
            </div>
            <button 
              onClick={() => refetch()}
              className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-xs shadow-xl shadow-slate-200 hover:scale-105 active:scale-95 transition-all"
            >
               System Inventory Audit
            </button>
         </div>
      </div>

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredConsumables?.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-[36px] border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all group flex flex-col justify-between h-[280px]">
             <div>
                <div className="flex justify-between items-start mb-6">
                   <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      <ToolIcon />
                   </div>
                   <div className="flex flex-col items-end gap-2">
                      <span className={`text-[0.6rem] font-black uppercase tracking-[2px] px-3 py-1 rounded-lg ${
                        item.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'Critical' ? 'bg-rose-50 text-rose-600 animate-pulse' : 'bg-amber-50 text-amber-600'
                      }`}>{item.status} Load</span>
                      <button 
                         onClick={() => handleQuickRestock(item.id, item.stock)}
                         disabled={updateConsumable.isPending}
                         className="text-[0.6rem] font-black text-primary hover:underline"
                      >
                         + QUICK RESTOCK
                      </button>
                   </div>
                </div>
                <h4 className="text-xl font-black text-slate-900">{item.name}</h4>
                <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.itemId} • {item.category}</p>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900">{item.stock}</span>
                      <span className="text-xs font-bold text-slate-400">Units</span>
                   </div>
                   <div className="text-right">
                      <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest block">Min Level</span>
                      <span className="text-sm font-black text-slate-600 underline underline-offset-4 decoration-primary/20">100</span>
                   </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-1000 ${
                     item.status === 'Critical' ? 'bg-rose-500' : 'bg-primary'
                   }`} style={{ width: `${Math.min((item.stock / 200) * 100, 100)}%` }}></div>
                </div>
             </div>
          </div>
        ))}

        {/* Predictive Card */}
        <div className="bg-gradient-to-br from-primary to-blue-700 p-10 rounded-[40px] text-white flex flex-col justify-between md:col-span-2 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-110 transition-transform"></div>
           <div>
              <h3 className="text-2xl font-black mb-4">Institutional <span className="text-white/40 italic">Predictive Restocking.</span></h3>
              <p className="text-white/60 font-medium text-sm max-w-2xl leading-relaxed">Our AI logistics engine predicts that surgical kits will drop below critical levels in node "Wing B" within 48 hours based on the current surgery schedule.</p>
           </div>
           
           <div className="flex justify-between items-center mt-12">
              <div className="flex gap-10">
                 <div className="space-y-1">
                    <span className="text-[0.65rem] font-black text-white/30 uppercase tracking-widest">Confidence</span>
                    <p className="font-black text-2xl tracking-tight">98.4%</p>
                 </div>
                 <div className="space-y-1 text-primary-glow">
                    <span className="text-[0.65rem] font-black text-white/30 uppercase tracking-widest">Target Arrival</span>
                    <p className="font-black text-2xl tracking-tight">24h</p>
                 </div>
              </div>
              <button 
                  onClick={handleAutoOrder}
                  disabled={updateConsumable.isPending || !consumables?.some(c => c.status === "Critical")}
                  className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
               >
                  {updateConsumable.isPending ? "PROCESSING..." : "GENERATE AUTO-ORDER"}
               </button>
           </div>
        </div>
      </div>
    </div>
  );
}
