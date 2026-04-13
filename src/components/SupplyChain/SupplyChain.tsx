import { useState } from "react";
import { PharmacyHub } from "./PharmacyHub";
import { Consumables } from "./Consumables";
import { BloodBank } from "./BloodBank";

export function SupplyChain() {
  const [subTab, setSubTab] = useState("pharmacy");

  const tabs = [
    { id: "pharmacy", label: "Pharmacy Node" },
    { id: "consumables", label: "Clinical Consumables" },
    { id: "blood", label: "Hematological Bank" },
  ];

  return (
    <div className="space-y-10 animate-fade">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-blue-500 to-rose-500"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-1.5 h-6 bg-slate-900 rounded-full"></div>
             <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[3px]">Global Logistics & Inventory</span>
          </div>
          <h2 className="text-4xl font-outfit font-black text-slate-900 leading-none">
            Supply <span className="text-primary italic">Chain.</span>
          </h2>
          <p className="text-slate-400 font-medium mt-3 max-w-xl">Critical oversight of pharmaceutical reserves, hematological assets, and clinical consumables.</p>
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
        {subTab === "pharmacy" && <PharmacyHub />}
        {subTab === "consumables" && <Consumables />}
        {subTab === "blood" && <BloodBank />}
      </div>
    </div>
  );
}
