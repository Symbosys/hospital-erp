import { useState } from "react";
import { Appointments } from "../Operations/Appointments";
import { Billing } from "../Operations/Billing";
import { EHR } from "../Operations/EHR";
import { Emergency } from "../Operations/Emergency";

export function Operations() {
  const [subTab, setSubTab] = useState("appointments");

  const tabs = [
    { id: "appointments", label: "Scheduling & Queue" },
    { id: "billing", label: "Revenue & Claims" },
    { id: "ehr", label: "Clinical Intelligence" },
    { id: "emergency", label: "Critical Response" },
  ];

  return (
    <div className="space-y-10 animate-fade">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-6 bg-slate-900 rounded-full"></div>
            <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[3px]">
              Institutional Workflow & Processes
            </span>
          </div>
          <h2 className="text-4xl font-outfit font-black text-slate-900 leading-none">
            Operations{" "}
            <span className="text-emerald-500 italic">& Workflow.</span>
          </h2>
          <p className="text-slate-400 font-medium mt-3 max-w-xl">
            Unified control over clinical scheduling, financial ecosystems, and
            emergency response logistics.
          </p>
        </div>

        <div className="flex bg-slate-50 border border-slate-100 p-2 rounded-2xl gap-2 shadow-inner relative z-10 w-full xl:w-auto overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex-1 xl:flex-none px-6 py-3 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all whitespace-nowrap ${
                subTab === tab.id
                  ? "bg-white text-emerald-600 shadow-md border border-slate-200/50"
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
        {subTab === "appointments" && <Appointments />}
        {subTab === "billing" && <Billing />}
        {subTab === "ehr" && <EHR />}
        {subTab === "emergency" && <Emergency />}
      </div>
    </div>
  );
}
