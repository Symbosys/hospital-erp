import { useState } from "react";

export function FrontEndOps() {
  const [subTab, setSubTab] = useState("registration");

  const tabs = [
    { id: "registration", label: "Patient Registration" },
    { id: "appointments", label: "Appointment Booking" },
    { id: "queue", label: "Visitor & Queue Hub" },
    { id: "records", label: "Front-Desk Records" },
  ];

  return (
    <div className="space-y-10 animate-fade">
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-6 bg-slate-900 rounded-full"></div>
            <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[3px]">
              Institutional Reception & Engagement
            </span>
          </div>
          <h2 className="text-4xl font-outfit font-black text-slate-900 leading-none">
            Front-End{" "}
            <span className="text-violet-500 italic">Operations.</span>
          </h2>
          <p className="text-slate-400 font-medium mt-3 max-w-xl">
            Streamlined patient intake, high-fidelity scheduling, and institutional 
            hospitality management nodes.
          </p>
        </div>

        <div className="flex bg-slate-50 border border-slate-100 p-2 rounded-2xl gap-2 shadow-inner relative z-10 w-full xl:w-auto overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`flex-1 xl:flex-none px-6 py-3 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all whitespace-nowrap ${
                subTab === tab.id
                  ? "bg-white text-violet-600 shadow-md border border-slate-200/50"
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
        {subTab === "registration" && <RegistrationNode />}
        {subTab === "appointments" && <AppointmentNode />}
        {subTab === "queue" && <QueueNode />}
        {subTab === "records" && <RecordsNode />}
      </div>
    </div>
  );
}

function RegistrationNode() {
  return (
    <div className="grid grid-cols-12 gap-8 animate-fade-in-up">
      <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-xl font-outfit font-black text-slate-900">New Patient Enrollment</h3>
            <p className="text-sm text-slate-400 font-medium">Initialize primary clinical identity record.</p>
          </div>
          <button className="bg-violet-600/10 text-violet-600 px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all">
            Scan Govt ID
          </button>
        </div>

        <form className="space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity Name</label>
              <input type="text" placeholder="e.g. Elena Gilbert" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-violet-500/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Matrix</label>
              <input type="text" placeholder="+91 98765 43210" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-violet-500/20 transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Biological Gender</label>
              <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-violet-500/20 transition-all appearance-none">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-Binary</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age Reference</label>
              <input type="number" placeholder="24" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-violet-500/20 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Blood Archetype</label>
              <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-violet-500/20 transition-all appearance-none">
                <option>Select Blood Type</option>
                <option>A+</option>
                <option>O+</option>
                <option>B+</option>
                <option>AB+</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Residence Address</label>
            <textarea placeholder="Line 1, Landmark, District, Pincode" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-violet-500/20 transition-all min-h-[120px] resize-none"></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="bg-violet-600 text-white px-10 py-5 rounded-2xl font-black text-sm shadow-xl shadow-violet-500/20 hover:-translate-y-1 transition-all">
              ENROLL PATIENT
            </button>
          </div>
        </form>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-8">
        <div className="bg-violet-600 p-8 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-violet-500/30">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <h4 className="text-xl font-outfit font-black mb-4 leading-tight">Patient Registry Growth</h4>
          <div className="text-5xl font-black mb-2">+12.4k</div>
          <p className="text-violet-100 font-medium text-sm">Active clinical identities synchronized across MedCore institutional nodes.</p>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm">
          <h4 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Recent Admissions</h4>
          <div className="space-y-6">
            {[
              { name: "Alaric Saltzman", id: "PT-4201", type: "OPD" },
              { name: "Bonnie Bennett", id: "PT-4202", type: "Emergency" },
              { name: "Stefan Salvatore", id: "PT-4203", type: "Diagnostic" },
            ].map((patient, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-bold text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all text-xs">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{patient.name}</div>
                    <div className="text-[0.65rem] font-black text-slate-400 uppercase">{patient.id}</div>
                  </div>
                </div>
                <div className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${
                  patient.type === 'Emergency' ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500'
                }`}>
                  {patient.type}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 border border-dashed border-slate-200 rounded-2xl text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all">
            View All Entries
          </button>
        </div>
      </div>
    </div>
  );
}

function AppointmentNode() {
  return (
    <div className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm animate-fade-in-up">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-xl font-outfit font-black text-slate-900">Clinical Scheduling Grid</h3>
          <p className="text-sm text-slate-400 font-medium">Manage doctor availability and patient check-ins.</p>
        </div>
        <div className="flex gap-4">
          <input type="date" className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 focus:outline-none" defaultValue={new Date().toISOString().split('T')[0]} />
          <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all">Today</button>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-6 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest px-4">Time Slot</th>
              <th className="pb-6 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest px-4">Consultant</th>
              <th className="pb-6 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest px-4">Patient Profile</th>
              <th className="pb-6 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest px-4">Department</th>
              <th className="pb-6 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest px-4">Status Node</th>
              <th className="pb-6 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { time: "09:30 AM", doctor: "Dr. Meredith Grey", patient: "Damon Salvatore", dept: "General Surgery", status: "In Waiting" },
              { time: "10:15 AM", doctor: "Dr. Greg House", patient: "Katherine Pierce", dept: "Diagnostics", status: "Engaged" },
              { time: "11:00 AM", doctor: "Dr. Shaun Murphy", patient: "Jeremy Gilbert", dept: "Pediatrics", status: "Scheduled" },
              { time: "11:45 AM", doctor: "Dr. Derek Shepherd", patient: "Matt Donovan", dept: "Neurosurgery", status: "Scheduled" },
            ].map((apt, i) => (
              <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-6 px-4 font-black text-xs text-slate-900">{apt.time}</td>
                <td className="py-6 px-4 font-bold text-xs text-slate-700">{apt.doctor}</td>
                <td className="py-6 px-4 font-bold text-xs text-slate-700">{apt.patient}</td>
                <td className="py-6 px-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{apt.dept}</span>
                </td>
                <td className="py-6 px-4">
                  <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${
                    apt.status === 'In Waiting' ? 'bg-amber-50 text-amber-600' :
                    apt.status === 'Engaged' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
                  }`}>
                    {apt.status}
                  </span>
                </td>
                <td className="py-6 px-4 text-right">
                  <button className="text-violet-600 font-bold text-[10px] uppercase hover:underline">Check-In</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QueueNode() {
  return (
    <div className="grid grid-cols-4 gap-8 animate-fade-in-up">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-200/60 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center font-outfit font-black text-2xl text-slate-900 mb-6">
            0{i}
          </div>
          <h4 className="font-bold text-slate-900 mb-1">Queue Stream {i}</h4>
          <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-6">General OPD</p>
          <div className="w-full h-1 bg-slate-100 rounded-full mb-8 overflow-hidden">
            <div className="h-full bg-violet-600 w-3/4 rounded-full shadow-[0_0_10px_rgba(124,58,237,0.3)]"></div>
          </div>
          <div className="space-y-1">
             <div className="text-2xl font-black text-slate-900">12 / 20</div>
             <div className="text-[0.65rem] font-bold text-slate-500 uppercase">Wait: ~45 Mins</div>
          </div>
          <button className="w-full mt-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">Manage Hub</button>
        </div>
      ))}
    </div>
  );
}

function RecordsNode() {
  return (
    <div className="bg-white p-10 rounded-[40px] border border-slate-200/60 shadow-sm animate-fade-in-up flex flex-col items-center justify-center min-h-[500px] text-center">
       <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 mb-8 border border-slate-100">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
       </div>
       <h3 className="text-2xl font-outfit font-black text-slate-900 mb-3">Digitization Node Alpha</h3>
       <p className="text-slate-500 font-medium max-w-md mx-auto mb-10">Scan and synchronize physical reports directly into the institutional electronic health registry.</p>
       <div className="flex gap-4">
          <button className="bg-violet-600 text-white px-8 py-4 rounded-2xl font-black text-xs shadow-xl shadow-violet-500/20 hover:-translate-y-1 transition-all">START BATCH SCAN</button>
          <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-black text-xs hover:bg-slate-50 transition-all shadow-sm">SEARCH ARCHIVES</button>
       </div>
    </div>
  );
}
