import { useState } from "react";
import { Compliance } from "./Compliance";
import { Finance } from "./Finance";
import { Reports } from "./Reports";

export function Administration() {
  const [subTab, setSubTab] = useState("compliance");

  const tabs = [
    { id: "compliance", label: "Governance & Compliance" },
    { id: "finance", label: "Institutional Finance" },
    { id: "reports", label: "Performance Intelligence" },
  ];

  return (
    <div className="space-y-10 animate-fade">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-2 h-8 bg-slate-900 rounded-full"></div>
             <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[3px]">Institutional Executive Oversight</span>
          </div>
          <h2 className="text-4xl font-outfit font-black text-slate-900 leading-none">
            Administrative <span className="text-slate-500 italic">Oversight.</span>
          </h2>
          <p className="text-slate-400 font-medium mt-3 max-w-xl">Governing the institutional ecosystem through financial intelligence, regulatory compliance, and performance reporting.</p>
        </div>
        
        <div className="flex bg-slate-50 border border-slate-100 p-2 rounded-2xl gap-2 shadow-inner relative z-10 w-full xl:w-auto overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex-1 xl:flex-none px-6 py-3 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all whitespace-nowrap ${
                subTab === tab.id 
                  ? "bg-slate-900 text-white shadow-xl border border-slate-900" 
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
        {subTab === "compliance" && <Compliance />}
        {subTab === "finance" && <Finance />}
        {subTab === "reports" && <Reports />}
      </div>
    </div>
  );
}
