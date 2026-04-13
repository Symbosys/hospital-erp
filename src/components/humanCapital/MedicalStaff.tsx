import { useState } from "react";

// Icons
// Mock Data for Medical Staff
const STAFF = [
  { id: "S-201", name: "Nurse Sarah Jenkins", role: "Head Nurse", department: "ICU", shift: "Morning", status: "Active", certification: "ACLS Certified" },
  { id: "S-202", name: "David Miller", role: "Lab Technician", department: "Diagnostics", shift: "Morning", status: "Active", certification: "MLT Expert" },
  { id: "S-203", name: "Emily Watson", role: "Pharmacist", department: "Pharmacy Node B", shift: "Night", status: "On-Call", certification: "B.Pharm" },
  { id: "S-204", name: "Kevin Hart", role: "Nurse", department: "Emergency", shift: "Rotation", status: "Active", certification: "First-Response" },
  { id: "S-205", name: "Rachel Adams", role: "Nurse", department: "Pediatrics", shift: "Evening", status: "Off-Duty", certification: "Pediatric-Special" },
];

export function MedicalStaff() {
  const [activeShift, setActiveShift] = useState("All");

  return (
    <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      {/* Table Header */}
      <div className="p-8 border-b border-slate-100 flex flex-col md:row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-xl font-outfit font-black text-slate-900 leading-none">Medical Staff & Caregivers</h3>
          <p className="text-sm text-slate-400 font-medium mt-2">Overseeing shift rotations and certifications for clinical staff.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2 h-fit">
          {["All", "Morning", "Evening", "Night"].map((shift) => (
            <button
              key={shift}
              onClick={() => setActiveShift(shift)}
              className={`px-5 py-2.5 rounded-xl font-bold text-[0.75rem] transition-all ${
                activeShift === shift ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {shift}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-6 bg-slate-50/30">
        {STAFF.filter(s => activeShift === "All" || s.shift === activeShift).map((staff) => (
          <div key={staff.id} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-outfit font-black text-xl group-hover:bg-primary group-hover:text-white transition-all ${
                staff.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                staff.status === 'On-Call' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
              }`}>
                {staff.name.charAt(0)}
              </div>
              <div className={`px-3 py-1.5 rounded-lg text-[0.65rem] font-black uppercase tracking-wider ${
                staff.status === "Active" ? "bg-emerald-50 text-emerald-600" :
                staff.status === "On-Call" ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400"
              }`}>
                {staff.status}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{staff.name}</h4>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{staff.role} • {staff.department}</p>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-50">
              <div className="flex justify-between items-center text-[0.7rem] font-bold">
                <span className="text-slate-400">SHIFT TIMING</span>
                <span className="text-slate-700">{staff.shift}</span>
              </div>
              <div className="flex justify-between items-center text-[0.7rem] font-bold">
                <span className="text-slate-400">CREDENTIALS</span>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md">{staff.certification}</span>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 bg-slate-50 text-slate-500 rounded-xl font-bold text-xs hover:bg-slate-900 hover:text-white transition-all">
              Modify Credentials
            </button>
          </div>
        ))}

        {/* Add Card */}
        <button className="bg-white/50 border-2 border-dashed border-slate-200 rounded-[24px] p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary/40 hover:text-primary transition-all group min-h-[250px]">
          <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-primary transition-all">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
          <span className="font-bold text-sm tracking-tight">Onboard Staff Member</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center px-10">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900">{STAFF.length}</span>
            <span className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">Active Personnel</span>
          </div>
          <div className="w-[1px] h-8 bg-slate-200"></div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-emerald-600">84%</span>
            <span className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">Efficiency Load</span>
          </div>
        </div>
        <button className="text-primary font-black text-sm hover:underline tracking-tight italic">Export Roster (PDF)</button>
      </div>
    </div>
  );
}
