import { useState } from "react";
import { usePharmacy, useUpdatePharmacy } from "../../config/hooks/supply-chain.hooks";

const BoxIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
);

const AlertIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
);

export function PharmacyHub() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: drugs, isLoading, isError } = usePharmacy();
  const updatePharmacy = useUpdatePharmacy();

  const handleRestock = (id: string, currentStock: number) => {
    updatePharmacy.mutate({ id, stock: currentStock + 100, status: "In Stock" });
  };

  const handleBulkRestock = () => {
    const criticalItems = drugs?.filter(d => d.status !== 'In Stock');
    criticalItems?.forEach(item => {
      updatePharmacy.mutate({ id: item.id, stock: item.stock + 500, status: "In Stock" });
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm h-[600px] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 font-black text-[0.6rem] uppercase tracking-widest">Accessing Pharmacological Node...</p>
         </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-rose-50 p-12 rounded-[40px] border border-rose-100 text-center">
         <h4 className="text-xl font-black text-rose-600 mb-2">Central Fulfillment Error</h4>
         <p className="text-rose-400 font-medium">Failed to retrieve pharmacy inventory. Institutional security protocols active.</p>
      </div>
    );
  }

  const filteredDrugs = drugs?.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.itemId.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || d.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockCount = drugs?.filter(d => d.status !== 'In Stock').length || 0;

  return (
    <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      <div className="p-10 border-b border-slate-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-slate-50/30">
        <div className="w-full xl:w-auto">
          <h3 className="text-xl font-black text-slate-900 leading-none">Pharmaceutical Inventory</h3>
          <p className="text-sm text-slate-400 font-medium mt-2">Managing drug stocks, batch lifecycle, and institutional fulfillment.</p>
          <div className="mt-6 flex bg-white border border-slate-200 rounded-2xl px-6 py-3 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
             <input 
               type="text" 
               placeholder="Search pharmacological registry..." 
               className="bg-transparent border-none outline-none w-full font-bold text-xs"
               onChange={(e) => setSearch(e.target.value)}
             />
          </div>
        </div>
        <div className="flex gap-4 w-full xl:w-auto">
           {lowStockCount > 0 && (
             <div className="flex-1 xl:flex-none p-4 px-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4 animate-fade">
                <div className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg">
                   <AlertIcon />
                </div>
                <div>
                   <p className="text-[0.6rem] font-black text-rose-400 uppercase tracking-widest">Urgent Attention</p>
                   <p className="text-sm font-black text-rose-600">{lowStockCount} Items Low Stock</p>
                </div>
             </div>
           )}
           <button 
             onClick={handleBulkRestock}
             disabled={updatePharmacy.isPending || lowStockCount === 0}
             className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs shadow-lg shadow-primary-glow hover:-translate-y-0.5 transition-all disabled:opacity-50"
           >
              {updatePharmacy.isPending ? "NODE REFUELING..." : "Restock Wizard"}
           </button>
        </div>
      </div>

      <div className="p-10 overflow-x-auto">
        <table className="w-full text-left border-collapse">
           <thead>
              <tr className="border-b border-slate-100">
                 <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Drug Meta</th>
                 <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Stock Node</th>
                 <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Unit Count</th>
                 <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Price</th>
                 <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-right">Fulfillment</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-50">
              {filteredDrugs?.map((drug) => (
                <tr key={drug.id} className="group hover:bg-slate-50/50 transition-colors">
                   <td className="py-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                            <BoxIcon className="w-5 h-5" />
                         </div>
                         <div>
                            <h4 className="font-black text-slate-900 leading-tight">{drug.name}</h4>
                            <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">{drug.itemId} • {drug.category}</span>
                         </div>
                      </div>
                   </td>
                   <td className="py-6 text-center font-bold text-slate-600 font-mono text-sm uppercase">Active Reservoir</td>
                   <td className="py-6 text-center">
                      <div className="inline-block px-4 py-2 bg-slate-50 rounded-xl font-black text-slate-700">
                         {drug.stock} <span className="text-[0.6rem] text-slate-400 uppercase ml-1">{drug.unit}</span>
                      </div>
                   </td>
                   <td className="py-6 text-center text-sm font-black text-slate-600">{drug.price}</td>
                   <td className="py-6 text-right">
                      <div className="flex flex-col items-end gap-2">
                         <span className={`px-4 py-1.5 rounded-lg text-[0.65rem] font-black uppercase tracking-widest ${
                           drug.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600' : 
                           drug.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                         }`}>{drug.status}</span>
                         {drug.status !== 'In Stock' && (
                           <button 
                             onClick={() => handleRestock(drug.id, drug.stock)}
                             disabled={updatePharmacy.isPending}
                             className="text-[0.6rem] font-black text-primary hover:underline hover:scale-105 transition-all"
                           >
                              + RESTOCK NODE
                           </button>
                         )}
                      </div>
                    </td>
                 </tr>
              ))}
              {!isLoading && filteredDrugs?.length === 0 && (
                 <tr>
                    <td colSpan={5} className="py-20 text-center text-slate-400 font-bold italic tracking-tight">No medications match the current logistical filter.</td>
                 </tr>
              )}
           </tbody>
        </table>
      </div>
      
      <div className="p-10 bg-slate-50 border-t border-slate-100">
         <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {['All', 'Antibiotic', 'Analgesic', 'Endocrine', 'Surgical', 'IV Fluids'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-8 py-4 border rounded-2xl text-[0.7rem] font-black transition-all shadow-sm ${
                  activeCategory === cat ? 'bg-primary border-transparent text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
         </div>
      </div>
    </div>
  );
}
