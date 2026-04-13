import { useState } from "react";

export function EHR() {
  const [activeCategory, setActiveCategory] = useState("prescriptions");

  const patientBio = {
    name: "Jonathan Harker",
    age: "34",
    blood: "O+",
    id: "MRN-9920",
    vitals: [
      { label: "BP", value: "118/76", unit: "mmHg", trend: "Normal" },
      { label: "HR", value: "72", unit: "bpm", trend: "Steady" },
      { label: "SPO2", value: "98", unit: "%", trend: "Optimal" },
      { label: "Temp", value: "98.6", unit: "°F", trend: "Stable" },
    ]
  };

  return (
    <div className="grid grid-cols-12 gap-8 animate-in zoom-in-95 duration-500">
      
      {/* Patient Vitals Header */}
      <div className="col-span-12 bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm overflow-hidden relative group text-black">
        <div className="absolute top-0 right-0 w-80 h-80 bg-slate-50 rounded-full -mr-40 -mt-40 blur-3xl opacity-50"></div>
        
        <div className="flex flex-col lg:flex-row justify-between gap-10 relative z-10">
          <div className="flex gap-6 items-center">
             <div className="w-20 h-20 bg-slate-900 rounded-[30px] flex items-center justify-center text-white text-2xl font-black italic">JH</div>
             <div>
                <div className="flex items-center gap-3">
                   <h3 className="text-2xl font-outfit font-black text-slate-900">{patientBio.name}</h3>
                   <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase rounded-full tracking-wider border border-emerald-100">Verified EHR</span>
                </div>
                <div className="flex gap-4 mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                   <span>ID: {patientBio.id}</span>
                   <span>Age: {patientBio.age}</span>
                   <span>Blood: <span className="text-rose-500 font-black">{patientBio.blood}</span></span>
                </div>
             </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 lg:max-w-2xl">
             {patientBio.vitals.map((vital, i) => (
               <div key={i} className="bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex flex-col justify-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{vital.label}</span>
                  <div className="flex items-baseline gap-1 mt-1">
                     <span className="text-xl font-black text-slate-900 font-outfit">{vital.value}</span>
                     <span className="text-[10px] font-bold text-slate-400">{vital.unit}</span>
                  </div>
                  <div className="w-full h-1 bg-slate-200 mt-3 rounded-full overflow-hidden">
                     <div className="w-3/4 h-full bg-emerald-400 rounded-full"></div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Main EHR Content */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden text-black">
          <div className="flex border-b border-slate-100">
             <button 
               onClick={() => setActiveCategory("prescriptions")}
               className={`flex-1 py-8 font-black text-[11px] uppercase tracking-widest transition-all ${activeCategory === 'prescriptions' ? 'text-primary border-b-2 border-primary shadow-[inset_0_-10px_10px_-10px_rgba(37,99,235,0.1)]' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Digital Prescriptions (e-Rx)
             </button>
             <button 
               onClick={() => setActiveCategory("imaging")}
               className={`flex-1 py-8 font-black text-[11px] uppercase tracking-widest transition-all ${activeCategory === 'imaging' ? 'text-primary border-b-2 border-primary shadow-[inset_0_-10px_10px_-10px_rgba(37,99,235,0.1)]' : 'text-slate-400 hover:text-slate-600'}`}
             >
               Diagnostic Imaging (PACS)
             </button>
          </div>

          <div className="p-10 min-h-[400px]">
             {activeCategory === 'prescriptions' ? (
               <div className="space-y-8">
                  <div className="flex justify-between items-center">
                     <h4 className="font-outfit font-black text-xl">Active <span className="text-primary italic">Medications.</span></h4>
                     <button className="bg-primary text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">+ New Rx</button>
                  </div>
                  
                  <div className="grid gap-4">
                     {[
                       { med: "Amoxicillin CLV", dose: "625mg", freq: "BD (Morning/Night)", duration: "5 Days", refill: "No" },
                       { med: "Pantoprazole", dose: "40mg", freq: "OD (Empty Stomach)", duration: "10 Days", refill: "Yes" },
                       { med: "Paracetamol", dose: "500mg", freq: "SOS", duration: "3 Days", refill: "Yes" }
                     ].map((rx, i) => (
                       <div key={i} className="group flex items-center justify-between p-6 bg-slate-50/50 rounded-[30px] border border-slate-100 hover:bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-xl">💊</div>
                             <div>
                                <div className="font-bold text-slate-900">{rx.med} <span className="text-[10px] text-slate-400 font-medium ml-2">{rx.dose}</span></div>
                                <div className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-wider">{rx.freq} • {rx.duration}</div>
                             </div>
                          </div>
                          <div className="flex items-center gap-6">
                             <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${rx.refill === 'Yes' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                   Refill: {rx.refill}
                                </span>
                             </div>
                             <button className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                             </button>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
             ) : (
               <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="flex justify-between items-center text-black ">
                     <h4 className="font-outfit font-black text-xl">Visual <span className="text-blue-500 italic">Diagnostics.</span></h4>
                     <div className="flex gap-2">
                        <button className="p-3 bg-slate-100 rounded-xl">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        </button>
                        <button className="p-3 bg-slate-100 rounded-xl">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        </button>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {[
                       { label: "Chest X-Ray (A/P View)", date: "08 April 2024", file: "Radiology Node B", size: "128MB", color: "blue" },
                       { label: "Head MRI (T2 Weighted)", date: "05 April 2024", file: "Neurology Node A", size: "4.2GB", color: "indigo" }
                     ].map((item, i) => (
                       <div key={i} className="group relative rounded-[32px] overflow-hidden border border-slate-100 aspect-video bg-slate-900 flex flex-col justify-end p-6 hover:border-primary/50 transition-all cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity">
                             <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                          </div>
                          <div className="relative z-10">
                             <span className={`px-2 py-0.5 bg-${item.color}-500 text-white text-[9px] font-black uppercase rounded tracking-widest`}>{item.size} DICOM</span>
                             <h5 className="text-white font-bold mt-2">{item.label}</h5>
                             <div className="flex justify-between items-center mt-3">
                                <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{item.date}</span>
                                <span className="text-white/40 text-[10px] uppercase font-bold">{item.file}</span>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* EHR Timeline Sidebar */}
      <div className="col-span-12 lg:col-span-4 bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 text-black">
         <h4 className="font-outfit font-black text-xl mb-8">Clinical <span className="text-primary italic">Timeline.</span></h4>
         
         <div className="space-y-10 relative">
            <div className="absolute top-0 bottom-0 left-[19px] w-0.5 bg-slate-100"></div>
            
            {[
              { title: "Physical Consultation", author: "Dr. Thorne", time: "10:30 AM", type: "Visit", current: true },
              { title: "Vitals Synchronized", author: "Staff Nurse", time: "09:45 AM", type: "Data" },
              { title: "Lab Reports Uploaded", author: "MedLab Node", time: "Yesterday", type: "Test" },
              { title: "Emergency Triage", author: "Dept EMS", time: "04 April", type: "Priority" },
            ].map((ev, i) => (
              <div key={i} className="relative pl-12">
                 <div className={`absolute left-0 top-1 w-10 h-10 rounded-2xl border-4 border-white shadow-md flex items-center justify-center z-10 ${ev.current ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400'}`}>
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{ev.time}</div>
                    <div className="font-bold text-slate-900 text-sm">{ev.title}</div>
                    <div className="text-[11px] text-slate-500 font-medium">Logged by {ev.author}</div>
                 </div>
              </div>
            ))}
         </div>
         
         <button className="w-full mt-10 py-4 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[2px] rounded-2xl hover:bg-primary transition-all">Export Clinical Summary</button>
      </div>

    </div>
  );
}
