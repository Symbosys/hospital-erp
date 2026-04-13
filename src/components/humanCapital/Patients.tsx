import { useState } from "react";

// Icons
const PatientIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const ActivityIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

// Mock Patient Data
const PATIENTS = [
  { id: "PT-4092", name: "John Doe", age: 42, condition: "Hypertension", admission: "Ward 4A", insurance: "BlueCross Core", vitals: "Stable", lastCheck: "20 mins ago", color: "blue" },
  { id: "PT-4105", name: "Emily Watson", age: 28, condition: "Appendicitis", admission: "ICU Unit B", insurance: "HealthGuard Plus", vitals: "Critical", lastCheck: "5 mins ago", color: "rose" },
  { id: "PT-4112", name: "Robert Wilson", age: 65, condition: "Diabetes Type II", admission: "OPD Visit", insurance: "Medicare", vitals: "Observation", lastCheck: "1 hour ago", color: "amber" },
  { id: "PT-4128", name: "Sophia Martinez", age: 34, condition: "Recovering (Surgery)", admission: "Ward 2C", insurance: "SecureHealth", vitals: "Normal", lastCheck: "2 hours ago", color: "emerald" },
];

export function Patients() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      {/* Table Header */}
      <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary-glow">
                <PatientIcon />
             </div>
             <h3 className="text-2xl font-outfit font-black text-slate-900 leading-none">Global Patient Registry</h3>
          </div>
          <p className="text-slate-400 font-medium max-w-md">Institutional Electronic Health Records (EHR) and clinical lifecycle management.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="bg-slate-50 border border-slate-100 p-2 rounded-2xl flex gap-1">
              {['All', 'Inpatient', 'Outpatient', 'Emergency'].map((type) => (
                <button 
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    filter === type ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {type}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="p-10 grid grid-cols-1 xl:grid-cols-2 gap-8 bg-slate-50/20">
        {PATIENTS.map((p) => (
          <div key={p.id} className="bg-white p-8 rounded-[32px] border border-slate-200/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col md:flex-row gap-8 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${p.color}-50 rounded-bl-[100px] -mr-16 -mt-16 group-hover:scale-110 transition-transform`}></div>
            
            <div className="flex-1 space-y-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-[0.65rem] font-black uppercase tracking-[2px] text-${p.color}-600 mb-1 block`}>{p.id}</span>
                  <h4 className="text-xl font-black text-slate-900">{p.name}</h4>
                  <div className="flex items-center gap-3 mt-1 underline decoration-slate-200 underline-offset-4 decoration-2 font-bold text-slate-400 text-sm italic">
                    {p.age} Years • {p.condition}
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-${p.color}-50 text-${p.color}-600 border border-${p.color}-100`}>
                  {p.vitals}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[0.65rem] font-bold text-slate-400 uppercase">Allocation</span>
                    <ActivityIcon className="text-slate-300 w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm font-black text-slate-700">{p.admission}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[0.65rem] font-bold text-slate-400 uppercase">Coverage</span>
                    <ShieldIcon className="text-slate-300 w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm font-black text-slate-700 line-clamp-1">{p.insurance}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   <span className="text-[0.7rem] font-bold text-slate-400">Checked {p.lastCheck}</span>
                </div>
                <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-md shadow-primary-glow hover:px-8 transition-all">View Clinical File</button>
              </div>
            </div>
          </div>
        ))}

        <button className="xl:col-span-2 group border-2 border-dashed border-slate-200 rounded-[32px] p-12 flex flex-col items-center justify-center gap-4 transition-all hover:bg-white hover:border-primary/50">
           <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
           </div>
           <div className="text-center">
              <h4 className="font-black text-slate-900">New Emergency Admission</h4>
              <p className="text-slate-400 font-medium text-sm">Synchronize with Triage and Front-Desk</p>
           </div>
        </button>
      </div>
    </div>
  );
}
