

// Icons
const ToolIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
);

const SecurityIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const AdminIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

// Mock Data
const NM_STAFF = [
  { id: "NM-501", name: "Marc Spector", role: "Security Lead", dept: "Facility", status: "On-Patrol", icon: <SecurityIcon />, color: "slate" },
  { id: "NM-502", name: "Steven Grant", role: "Admin Officer", dept: "Admissions", status: "Active", icon: <AdminIcon />, color: "blue" },
  { id: "NM-503", name: "Arthur Harrow", role: "Maintenance", dept: "Plant/OT", status: "Repairing", icon: <ToolIcon />, color: "amber" },
  { id: "NM-504", name: "Layla El-Faouly", role: "Coordination", dept: "HR", status: "Active", icon: <AdminIcon />, color: "blue" },
];

export function NonMedicalStaff() {
  return (
    <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      <div className="p-10 border-b border-slate-100">
        <h3 className="text-xl font-outfit font-black text-slate-900 leading-none">Operational Personnel</h3>
        <p className="text-sm text-slate-400 font-medium mt-2">Managing the foundational workforce that moves the institution.</p>
      </div>

      <div className="p-10 space-y-4">
        {NM_STAFF.map((staff) => (
          <div key={staff.id} className="group flex items-center justify-between p-6 bg-slate-50 hover:bg-white border border-slate-100 hover:shadow-xl hover:-translate-y-0.5 rounded-2xl transition-all">
            <div className="flex items-center gap-6">
              <div className={`w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${
                staff.color === 'slate' ? 'text-slate-600' :
                staff.color === 'blue' ? 'text-blue-600' :
                staff.color === 'amber' ? 'text-amber-600' : 'text-slate-600'
              }`}>
                {staff.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{staff.name}</h4>
                <div className="flex items-center gap-3">
                   <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">{staff.role}</span>
                   <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                   <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">{staff.dept}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-10">
               <div className="text-right">
                  <span className={`px-4 py-1.5 rounded-lg text-[0.65rem] font-black uppercase tracking-widest ${
                    staff.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                    staff.status === 'On-Patrol' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {staff.status}
                  </span>
               </div>
               <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-400 font-bold text-xs rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">Details</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-10 bg-slate-50 border-t border-slate-100">
         <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <AdminIcon />
            </div>
            <div>
               <h4 className="font-black text-slate-900">Institutional Maintenance Flow</h4>
               <p className="text-xs text-slate-400 font-medium">Auto-dispatching tasks based on facility sensor telemetry.</p>
            </div>
            <button className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-xs shadow-lg shadow-primary-glow">Configure Workflows</button>
         </div>
      </div>
    </div>
  );
}
