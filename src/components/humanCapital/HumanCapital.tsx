import { useState } from "react";
import { Doctors } from "./Doctors";
import { MedicalStaff } from "./MedicalStaff";
import { Patients } from "./Patients";

export function HumanCapital() {
  const [subTab, setSubTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Executive Overview" },
    { id: "doctors", label: "Consultants" },
    { id: "medical_staff", label: "Medical Staff" },
    { id: "patients", label: "Patient Registry" },
  ];

  return (
    <div className="space-y-10 animate-fade">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2 h-8 bg-primary rounded-full"></div>
             <span className="text-[0.65rem] font-black text-primary uppercase tracking-[3px]">Institutional Resource Management</span>
          </div>
          <h2 className="text-4xl font-outfit font-black text-slate-900 leading-none">
            Human <span className="text-primary italic">Capital.</span>
          </h2>
          <p className="text-slate-400 font-medium mt-3 max-w-xl">Comprehensive oversight of all medical, administrative, and clinical personnel within the hospital ecosystem.</p>
        </div>
        
        <div className="flex bg-slate-50 border border-slate-100 p-2 rounded-2xl gap-2 shadow-inner relative z-10 w-full xl:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex-1 xl:flex-none px-8 py-3 rounded-xl font-bold text-xs transition-all ${
                subTab === tab.id 
                  ? "bg-white text-primary shadow-md border border-slate-200/50" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Module Content */}
      <div className="min-h-[600px]">
        {subTab === "overview" && <HumanCapitalOverview onNavigate={setSubTab} />}
        {subTab === "doctors" && <Doctors />}
        {subTab === "medical_staff" && <MedicalStaff />}
        {subTab === "patients" && <Patients />}
      </div>
    </div>
  );
}

function HumanCapitalOverview({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Doctors", val: "142", sub: "12 In Surgery", color: "blue" },
          { label: "Nursing Staff", val: "408", sub: "Shift Change in 2h", color: "emerald" },
          { label: "Active Patients", val: "1,240", sub: "+14 New Admits", color: "rose" },
          { label: "Admissions Ops", val: "24", sub: "Front-desk Active", color: "amber" },
        ].map((m, i) => (
          <div key={i} className="bg-white p-8 rounded-[36px] border border-slate-200/60 shadow-sm group">
            <span className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest block mb-4">{m.label}</span>
            <p className="text-4xl font-black text-slate-900 mb-2">{m.val}</p>
            <span className={`text-[0.7rem] font-bold text-${m.color}-600 bg-${m.color}-50 px-2.5 py-1 rounded-lg`}>{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-slate-900 rounded-[40px] p-10 text-white flex flex-col justify-between relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -mr-48 -mt-48 blur-3xl group-hover:bg-primary/20 transition-all"></div>
            
            <div className="relative z-10">
               <h3 className="text-3xl font-black mb-4">Personnel Efficiency <span className="text-primary italic">Live.</span></h3>
               <p className="text-white/50 font-medium max-w-lg mb-10">Institutional performance metrics tracked against diagnostic benchmarks and patient recovery times.</p>
               
               <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-3">
                     <span className="text-[0.65rem] font-black text-white/30 uppercase tracking-[2px]">Clinical Load</span>
                     <div className="flex items-end gap-3">
                        <span className="text-3xl font-black">94.2%</span>
                        <span className="text-emerald-400 font-bold text-xs mb-1.5">▲ 2.5%</span>
                     </div>
                     <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[94%]"></div>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <span className="text-[0.65rem] font-black text-white/30 uppercase tracking-[2px]">Patient Satisfaction</span>
                     <div className="flex items-end gap-3">
                        <span className="text-3xl font-black">4.8</span>
                        <span className="text-white/40 font-bold text-xs mb-1.5">/ 5.0</span>
                     </div>
                     <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="bg-white h-full w-[96%]"></div>
                     </div>
                  </div>
               </div>
            </div>

            <button className="mt-12 w-fit bg-primary text-white px-10 py-5 rounded-2xl font-black text-sm shadow-xl shadow-primary-glow hover:-translate-y-1 active:scale-95 transition-all">
               View Analytical Deep-Dive
            </button>
         </div>

         <div className="space-y-6">
            <div className="bg-primary p-8 rounded-[40px] text-white shadow-xl shadow-primary/30 group cursor-pointer hover:-translate-y-1 transition-all" onClick={() => onNavigate("doctors")}>
               <h4 className="text-xl font-black mb-1">Doctor Directory</h4>
               <p className="text-white/60 font-medium text-sm mb-6">Manage consultants and clinical specializations.</p>
               <div className="flex justify-between items-center">
                  <span className="text-[0.6rem] font-black uppercase tracking-widest text-primary-glow bg-white p-2 px-3 rounded-lg">View Profile</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
               </div>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-[40px] shadow-sm group cursor-pointer hover:-translate-y-1 transition-all" onClick={() => onNavigate("patients")}>
               <h4 className="text-xl font-black text-slate-900 mb-1">Patient Registry</h4>
               <p className="text-slate-400 font-medium text-sm mb-6">Real-time EHR and clinical history oversight.</p>
               <div className="flex justify-between items-center">
                  <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-500">Access Global Database</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
