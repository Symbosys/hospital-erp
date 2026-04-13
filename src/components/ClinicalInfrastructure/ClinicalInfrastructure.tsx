import { useState } from "react";
import { Departments } from "./Departments";
import { Wards } from "./Wards";
import { OperationTheatres } from "./OperationTheatres";
import { Laboratories } from "./Laboratories";
import { ClinicalSchedule } from "./ClinicalSchedule";

export function ClinicalInfrastructure() {
  const [subTab, setSubTab] = useState("wards");

  const tabs = [
    { id: "wards", label: "Ward Matrix" },
    { id: "departments", label: "Executive Depts" },
    { id: "ot", label: "Op-Theatres" },
    { id: "labs", label: "Diagnostic Node" },
    { id: "schedule", label: "Master Schedule" },
  ];

  return (
    <div className="space-y-8 animate-fade">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-outfit font-black text-slate-900 leading-none">
            Clinical <span className="text-primary italic">Infrastructure.</span>
          </h2>
          <p className="text-slate-400 font-medium mt-2">Space-time management of physical hospital capacity and clinical labs.</p>
        </div>
        
        <div className="flex bg-white/50 border border-slate-200 p-1.5 rounded-2xl gap-2 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${    
                subTab === tab.id 
                  ? "bg-primary text-white shadow-lg shadow-primary-glow" 
                  : "text-slate-500 hover:bg-white hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[600px]">
        {subTab === "wards" && <Wards />}
        {subTab === "departments" && <Departments />}
        {subTab === "ot" && <OperationTheatres />}
        {subTab === "labs" && <Laboratories />}
        {subTab === "schedule" && <ClinicalSchedule />}
      </div>
    </div>
  );
}
