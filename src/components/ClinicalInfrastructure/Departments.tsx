

// Icons
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
);

const BrainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 4 4 0 0 0 6.99 0 4 4 0 0 0 .521-8.105 4 4 0 0 0-2.527-5.77A3 3 0 0 0 12 5Z"></path><path d="M9 13a4.5 4.5 0 0 0 3-4"></path><path d="M6.003 5.125A3 3 0 1 0 12 5"></path><path d="M12 5a4.5 4.5 0 0 1 3 4"></path><path d="M15 13a4.5 4.5 0 0 1-3-4"></path></svg>
);

const RadioIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"></path><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4"></path><circle cx="12" cy="12" r="2"></circle><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4"></path><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"></path></svg>
);

// Mock Data
const DEPARTMENTS = [
  { id: "DEP-01", name: "Cardiology", head: "Dr. Alexander Pierce", staff: 42, occupancy: 85, status: "High Load", icon: <HeartIcon />, color: "rose" },
  { id: "DEP-02", name: "Neurology", head: "Dr. Elena Gilbert", staff: 28, occupancy: 62, status: "Optimal", icon: <BrainIcon />, color: "blue" },
  { id: "DEP-03", name: "Radiology", head: "Dr. Sarah Connor", staff: 15, occupancy: 45, status: "Available", icon: <RadioIcon />, color: "indigo" },
  { id: "DEP-04", name: "Emergency", head: "Dr. Gregory House", staff: 55, occupancy: 95, status: "Critical", icon: <HeartIcon />, color: "red" },
];

export function Departments() {
  return (
    <div className="space-y-8 animate-fade">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DEPARTMENTS.map((dept) => (
          <div key={dept.id} className="bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${dept.color}-50 rounded-bl-[60px] -mr-8 -mt-8 opacity-50`}></div>
            
            <div className="mb-8 relative z-10">
              <div className={`w-14 h-14 bg-${dept.color}-50 text-${dept.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {dept.icon}
              </div>
              <h4 className="text-xl font-black text-slate-900 leading-tight">{dept.name}</h4>
              <p className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest mt-1">Head: {dept.head}</p>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-end">
                 <span className="text-[0.65rem] font-black text-slate-400 uppercase">Current Occupancy</span>
                 <span className={`text-lg font-black text-${dept.color}-600`}>{dept.occupancy}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className={`bg-${dept.color}-500 h-full transition-all duration-1000`} style={{ width: `${dept.occupancy}%` }}></div>
              </div>
              <div className="flex justify-between items-center text-[0.7rem] font-bold">
                 <span className="text-slate-400">{dept.staff} Active Personnel</span>
                 <span className={`px-2 py-0.5 rounded-md ${
                   dept.status === 'Critical' ? 'bg-red-50 text-red-600' : 
                   dept.status === 'High Load' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                 }`}>{dept.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm">
         <div className="flex justify-between items-center mb-10">
            <div>
               <h3 className="text-xl font-black text-slate-900">Inter-Departmental Flow</h3>
               <p className="text-sm text-slate-400 font-medium">Monitoring patient transfer logistics and resource sharing.</p>
            </div>
            <button className="px-6 py-3 bg-slate-50 text-slate-600 font-bold text-xs rounded-2xl hover:bg-slate-900 hover:text-white transition-all">Configure Hierarchy</button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
               <h5 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-4">Top Performing</h5>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-black">1</div>
                  <span className="font-bold text-slate-800 text-lg italic underline decoration-emerald-200 underline-offset-4">Radiology Node</span>
               </div>
            </div>
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
               <h5 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-4">Target Efficiency</h5>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black">92%</div>
                  <span className="font-bold text-slate-800 text-lg">System Baseline</span>
               </div>
            </div>
            <div className="p-8 bg-primary text-white rounded-[32px] shadow-xl shadow-primary/20">
               <h5 className="text-[0.65rem] font-black text-white/60 uppercase tracking-widest mb-4">New Request</h5>
               <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm uppercase">Open Dept Node</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
