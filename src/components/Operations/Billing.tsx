import { useState } from "react";

export function Billing() {
  const [billingMode, setBillingMode] = useState("outpatient");

  const financialMetrics = [
    { label: "Today's Revenue", value: "₹45,280", trend: "72% Invoiced", color: "blue" },
    { label: "TPA Pending", value: "18 Cases", trend: "₹1.2L value", color: "rose" },
    { label: "Tax Liability (GST)", value: "₹8,150", trend: "Current Quarter", color: "amber" },
    { label: "Collections", value: "₹38,000", trend: "84% Realized", color: "emerald" },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((item, id) => (
          <div key={id} className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                 <h4 className="text-2xl font-outfit font-black text-slate-900 mt-2">{item.value}</h4>
              </div>
              <div className={`w-3 h-3 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] ${
                item.color === 'blue' ? 'bg-blue-500' :
                item.color === 'rose' ? 'bg-rose-500' :
                item.color === 'amber' ? 'bg-amber-500' :
                item.color === 'emerald' ? 'bg-emerald-500' : 'bg-slate-500'
              }`}></div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
               <span className="text-[10px] font-bold text-slate-500">{item.trend}</span>
               <div className="text-primary text-[10px] font-black uppercase">View Details</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Invoicing Interface */}
        <div className="col-span-12 xl:col-span-8 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden text-black">
          <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
               <h3 className="font-outfit font-black text-2xl text-slate-900">Unified <span className="text-blue-500 italic">Invoicing.</span></h3>
               <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">Dynamic Tax & GST Calculation Engine</p>
            </div>
            <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
               <button 
                 onClick={() => setBillingMode("outpatient")}
                 className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all ${billingMode === 'outpatient' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
               >
                 Outpatient
               </button>
               <button 
                 onClick={() => setBillingMode("inpatient")}
                 className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-all ${billingMode === 'inpatient' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
               >
                 Inpatient
               </button>
            </div>
          </div>

          <div className="p-10">
             <div className="grid grid-cols-12 gap-10">
                {/* Billing Table Area */}
                <div className="col-span-12 space-y-6">
                   <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
                      <div className="flex justify-between items-end mb-8">
                         <div>
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[3px]">New Invoice</span>
                            <h4 className="text-lg font-bold text-slate-900 mt-1">Transaction: #INV-2024-001</h4>
                         </div>
                         <div className="text-right">
                            <div className="text-[10px] font-bold text-slate-400 uppercase">Issue Date</div>
                            <div className="text-sm font-black text-slate-900">09 April 2024</div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         {[
                           { desc: "General Consultation (Specialist)", unit: "1", rate: "₹1,500", tax: "5% GST" },
                           { desc: "Diagnostic: CBC & Lipid Profile", unit: "1", rate: "₹2,500", tax: "12% GST" },
                           { desc: "Pharmacy: Antibiotic (Course A)", unit: "3", rate: "₹450", tax: "18% GST" }
                         ].map((row, i) => (
                           <div key={i} className="flex justify-between items-center py-4 border-b border-slate-200/50 last:border-0 group">
                              <div>
                                 <div className="font-bold text-slate-900 text-sm">{row.desc}</div>
                                 <div className="text-[10px] text-slate-400 mt-0.5">{row.tax} applied</div>
                              </div>
                              <div className="text-right">
                                 <div className="text-sm font-black text-slate-900">{row.rate}</div>
                                 <div className="text-[10px] text-slate-400">Qty: {row.unit}</div>
                              </div>
                           </div>
                         ))}
                      </div>

                      <div className="mt-10 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                            <div>
                               <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Subtotal</div>
                               <div className="text-xl font-bold font-outfit mt-1">₹5,350.00</div>
                            </div>
                            <div>
                               <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tax (GST)</div>
                               <div className="text-xl font-bold font-outfit mt-1 text-emerald-400">+ ₹580.40</div>
                            </div>
                            <div className="border-l border-white/10 pl-8">
                               <div className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Grand Total</div>
                               <div className="text-3xl font-black font-outfit mt-1 text-white">₹5,930.40</div>
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex gap-4">
                      <button className="flex-1 bg-blue-600 text-white rounded-2xl py-4 font-black text-[11px] uppercase tracking-[3px] hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">Process Payment</button>
                      <button className="px-8 bg-slate-100 text-slate-600 rounded-2xl py-4 font-black text-[11px] uppercase tracking-[3px] hover:bg-slate-200 transition-all">Print</button>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Insurance & TPA Node */}
        <div className="col-span-12 xl:col-span-4 space-y-8">
           <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[40px] p-10 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-all duration-1000"></div>
              
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-xl">🛡️</div>
                 <h3 className="font-outfit font-black text-2xl mb-2">Insurance <span className="text-indigo-200">Processing.</span></h3>
                 <p className="text-white/60 text-xs font-medium leading-relaxed mb-10">Real-time TPA claim verification & cashless authorization node.</p>
                 
                 <div className="space-y-4 mb-10">
                    {[
                      { name: "ICICI Lombard", status: "Active", delay: "2h avg" },
                      { name: "Star Health", status: "Slow", delay: "24h avg" },
                      { name: "HDFC ERGO", status: "Active", delay: "1h avg" }
                    ].map((comp, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                         <div>
                            <div className="text-xs font-bold">{comp.name}</div>
                            <div className="text-[9px] text-white/50 uppercase tracking-widest mt-1">Verification Node</div>
                         </div>
                         <div className="text-right">
                            <div className={`text-[10px] font-black ${comp.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>{comp.status}</div>
                            <div className="text-[9px] text-white/50">{comp.delay}</div>
                         </div>
                      </div>
                    ))}
                 </div>

                 <button className="w-full bg-white text-indigo-700 rounded-2xl py-4 font-black text-[11px] uppercase tracking-[3px] hover:bg-indigo-50 transition-all shadow-xl">Initiate Claim Verification</button>
              </div>
           </div>

           <div className="bg-rose-50 rounded-[40px] p-10 border border-rose-100 relative overflow-hidden">
              <div className="relative z-10">
                 <h4 className="text-rose-900 font-outfit font-black text-lg mb-2 underline decoration-rose-300 decoration-4 underline-offset-4">Audit Warnings</h4>
                 <div className="mt-6 flex gap-4 p-4 bg-white rounded-2xl border border-rose-200 shadow-sm shadow-rose-500/5">
                    <div className="text-xl text-rose-500">⚠</div>
                    <div>
                       <div className="text-[11px] font-black text-rose-900 uppercase">GST Mismatch</div>
                       <p className="text-[10px] text-rose-600 leading-relaxed mt-1">Pharmacy invoice #782 has a tax variance of ₹42.20 in GST category B.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

    </div>
  );
}
