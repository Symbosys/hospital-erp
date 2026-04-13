

const BoxIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>
);

const AlertIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
);

const DRUG_DATA = [
  { id: "RX-901", name: "Paracetamol 500mg", category: "Analgesics", stock: 1240, batch: "B-2024-X", expiry: "12/2025", status: "Optimal" },
  { id: "RX-902", name: "Amoxicillin 250mg", category: "Antibiotics", stock: 85, batch: "B-2023-Y", expiry: "05/2024", status: "Low Stock" },
  { id: "RX-903", name: "Insulin Glargine", category: "Endocrine", stock: 42, batch: "B-2024-Z", expiry: "02/2024", status: "Expiring Soon" },
  { id: "RX-904", name: "Atorvastatin 20mg", category: "Cardiovascular", stock: 520, batch: "B-2024-W", expiry: "08/2026", status: "Optimal" },
];

export function PharmacyHub() {
  return (
    <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      <div className="p-10 border-b border-slate-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 bg-slate-50/30">
        <div>
          <h3 className="text-xl font-black text-slate-900 leading-none">Pharmaceutical Inventory</h3>
          <p className="text-sm text-slate-400 font-medium mt-2">Managing drug stocks, batch lifecycle, and institutional fulfillment.</p>
        </div>
        <div className="flex gap-4 w-full xl:w-auto">
           <div className="flex-1 xl:flex-none p-4 px-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg">
                 <AlertIcon />
              </div>
              <div>
                 <p className="text-[0.6rem] font-black text-rose-400 uppercase tracking-widest">Urgent Attention</p>
                 <p className="text-sm font-black text-rose-600">12 Items Low Stock</p>
              </div>
           </div>
           <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs shadow-lg shadow-primary-glow hover:-translate-y-0.5 transition-all">Restock Wizard</button>
        </div>
      </div>

      <div className="p-10 overflow-x-auto">
        <table className="w-full text-left border-collapse">
           <thead>
              <tr className="border-b border-slate-100">
                 <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Drug Meta</th>
                 <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Batch ID</th>
                 <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Unit Count</th>
                 <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Expiry</th>
                 <th className="pb-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-right">Fulfillment</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-slate-50">
              {DRUG_DATA.map((drug) => (
                <tr key={drug.id} className="group hover:bg-slate-50/50 transition-colors">
                   <td className="py-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                            <BoxIcon className="w-5 h-5" />
                         </div>
                         <div>
                            <h4 className="font-black text-slate-900 leading-tight">{drug.name}</h4>
                            <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">{drug.id} • {drug.category}</span>
                         </div>
                      </div>
                   </td>
                   <td className="py-6 text-center font-bold text-slate-600 font-mono text-sm">{drug.batch}</td>
                   <td className="py-6 text-center">
                      <div className="inline-block px-4 py-2 bg-slate-50 rounded-xl font-black text-slate-700">
                         {drug.stock} <span className="text-[0.6rem] text-slate-400 uppercase ml-1">Units</span>
                      </div>
                   </td>
                   <td className="py-6 text-center">
                      <span className={`text-sm font-black ${
                        drug.status === 'Expiring Soon' ? 'text-rose-600 animate-pulse' : 'text-slate-600'
                      }`}>{drug.expiry}</span>
                   </td>
                   <td className="py-6 text-right">
                      <span className={`px-4 py-1.5 rounded-lg text-[0.65rem] font-black uppercase tracking-widest ${
                        drug.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : 
                        drug.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                      }`}>{drug.status}</span>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
      
      <div className="p-10 bg-slate-50 border-t border-slate-100">
         <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4">
            {['Antibiotics', 'Analgesics', 'Surgical', 'IV Fluids', 'Pediatric', 'Emergency'].map((cat) => (
              <button key={cat} className="whitespace-nowrap px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[0.7rem] font-black text-slate-400 hover:border-primary/30 hover:text-slate-900 transition-all shadow-sm">
                {cat}
              </button>
            ))}
         </div>
      </div>
    </div>
  );
}
