import { useState } from "react";

// Icons
const MoreVerticalIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);

const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

// Mock Data
const DOCTORS = [
  { id: "D-101", name: "Dr. Alexander Pierce", specialty: "Cardiology", availability: "Available", appointment: "12 Today", performance: 98, status: "Active" },
  { id: "D-102", name: "Dr. Elena Gilbert", specialty: "Neurology", availability: "In Surgery", appointment: "8 Today", performance: 95, status: "Active" },
  { id: "D-103", name: "Dr. Robert Chase", specialty: "Pediatrics", availability: "Away", appointment: "0 Today", performance: 92, status: "Inactive" },
  { id: "D-104", name: "Dr. Lisa Cuddy", specialty: "Internal Medicine", availability: "Available", appointment: "15 Today", performance: 99, status: "Active" },
  { id: "D-105", name: "Dr. Eric Foreman", specialty: "Diagnostics", availability: "On Leave", appointment: "0 Today", performance: 94, status: "Inactive" },
];

export function Doctors() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
      {/* Table Header */}
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-xl font-outfit font-black text-slate-900 leading-none">Medical Consultants</h3>
          <p className="text-sm text-slate-400 font-medium mt-2">Managing institutional doctor directories and availability.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative group w-full md:w-[300px]">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search consultants..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-transparent focus:border-primary/20 focus:bg-white px-12 py-3.5 rounded-2xl outline-none text-sm font-semibold transition-all shadow-inner"
            />
          </div>
          <button className="p-3.5 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-100 transition-all border border-transparent active:scale-95">
            <FilterIcon />
          </button>
          <button className="bg-primary text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-primary-glow hover:-translate-y-0.5 transition-all active:scale-95 whitespace-nowrap">
            Add Consultant
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Consultant Info</th>
              <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Specialty</th>
              <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Availability</th>
              <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Load</th>
              <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-center">Diagnostics</th>
              <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {DOCTORS.filter(d => d.name.toLowerCase().includes(search.toLowerCase())).map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-outfit font-black text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      {doc.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">{doc.name}</span>
                        <CheckCircleIcon className="text-blue-500" />
                      </div>
                      <span className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-tighter">{doc.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-slate-600">
                  <span className="px-3 py-1.5 bg-slate-100 rounded-lg">{doc.specialty}</span>
                </td>
                <td className="px-8 py-6 text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      doc.availability === 'Available' ? 'bg-emerald-500' :
                      doc.availability === 'In Surgery' ? 'bg-rose-500' : 'bg-slate-300'
                    }`}></div>
                    <span className={doc.availability === 'Available' ? 'text-emerald-600' : doc.availability === 'In Surgery' ? 'text-rose-600' : 'text-slate-500'}>
                      {doc.availability}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-slate-700">{doc.appointment}</td>
                <td className="px-8 py-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden max-w-[100px]">
                      <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${doc.performance}%` }}></div>
                    </div>
                    <span className="text-[0.65rem] font-black text-primary">{doc.performance}% Efficiency</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                    <MoreVerticalIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center px-10">
        <span className="text-[0.75rem] font-bold text-slate-400">Showing {DOCTORS.length} active medical consultants</span>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[0.75rem] font-bold text-slate-400 hover:text-slate-900 transition-all shadow-sm">Previous</button>
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[0.75rem] font-bold text-slate-900 hover:border-primary/30 transition-all shadow-sm">Next Page</button>
        </div>
      </div>
    </div>
  );
}
