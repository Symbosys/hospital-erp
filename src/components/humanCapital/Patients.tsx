import { useState, useMemo } from "react";
import { 
  usePatients, 
  useCreatePatient, 
  useDeletePatient, 
  type Patient 
} from "../../config/hooks/patient.hooks";

// ─── Registration Modal ───────────────────────────────────────────────────────
function RegisterPatientModal({ onClose }: { onClose: () => void }) {
  const createPatient = useCreatePatient();
  const [form, setForm] = useState({
    patientId: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
    name: "",
    age: "",
    gender: "Male",
    bloodGroup: "O+",
    phone: "",
    condition: "",
    status: "Inpatient" as Patient["status"],
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPatient.mutateAsync({
        ...form,
        age: Number(form.age),
      });
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed.");
    }
  };

  const inputCls = "w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-sm";
  const labelCls = "text-[10px] font-black uppercase tracking-[3px] text-slate-400 mb-2 block ml-1";

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl p-10 relative overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <div className="relative z-10 flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-outfit tracking-tighter">
              Patient <span className="text-emerald-600 italic">Registration.</span>
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Institutional Admission Node</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {error && <div className="mb-6 px-6 py-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-black rounded-2xl">{error}</div>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 relative z-10">
          <div className="col-span-2"><label className={labelCls}>Full Identity</label><input className={inputCls} placeholder="Sarah Johnson" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><label className={labelCls}>Age</label><input className={inputCls} type="number" placeholder="24" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required /></div>
          <div>
            <label className={labelCls}>Gender</label>
            <select className={inputCls} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Blood Group</label>
            <select className={inputCls} value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}>
              <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
            </select>
          </div>
          <div><label className={labelCls}>Direct Line</label><input className={inputCls} placeholder="+91 00000 00000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div>
          <div className="col-span-2"><label className={labelCls}>Primary Clinical Condition</label><input className={inputCls} placeholder="Hypertension / Routine Checkup" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} required /></div>
          
          <div className="col-span-2 flex gap-6 mt-4">
            <button type="submit" disabled={createPatient.isPending} className="flex-1 py-5 bg-slate-900 text-white rounded-[24px] font-black text-[11px] uppercase tracking-[4px] shadow-2xl shadow-slate-900/20 hover:-translate-y-1 active:scale-95 transition-all">
              {createPatient.isPending ? "Configuring Node..." : "Admit Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Patients() {
  const [activeTab, setActiveTab] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: patients = [], isLoading } = usePatients(activeTab !== "All" ? { status: activeTab } : undefined);
  const deletePatient = useDeletePatient();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanent decommission of clinical record?")) return;
    setDeletingId(id);
    try { await deletePatient.mutateAsync(id); }
    finally { setDeletingId(null); }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Inpatient": return "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-500/5";
      case "Outpatient": return "bg-blue-50 text-blue-600 border-blue-100 shadow-blue-500/5";
      case "Discharged": return "bg-slate-50 text-slate-400 border-slate-100 shadow-slate-500/5";
      default: return "bg-slate-50 text-slate-500";
    }
  };

  return (
    <div className="space-y-10 animate-fade pb-24 max-w-[1600px] mx-auto">
      {showAdd && <RegisterPatientModal onClose={() => setShowAdd(false)} />}

      {/* --- Immersive Header --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10 bg-white p-12 rounded-[60px] border border-slate-200/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
               <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></span> Registry Verified
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[4px]">V7.2 Compliance</span>
          </div>
          <h1 className="text-5xl font-black font-outfit text-slate-900 tracking-tighter leading-none">
            Patient <span className="text-emerald-600 italic">Capital Node.</span>
          </h1>
          <p className="text-slate-400 font-medium mt-4 max-w-xl text-[1.05rem]">
            Secure management of clinical identities, admission timelines, and longitudinal health records.
          </p>
        </div>

        <div className="flex bg-slate-50 p-2.5 rounded-[35px] border border-slate-100 gap-2 relative z-10 w-full xl:w-auto">
          {["All", "Inpatient", "Outpatient", "Discharged"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 xl:flex-none px-8 py-4 rounded-[28px] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white text-emerald-600 shadow-xl shadow-emerald-500/10 border border-slate-100" : "text-slate-400 hover:text-slate-600 underline-offset-4 hover:underline"}`}>
              {tab}
            </button>
          ))}
          <div className="w-[1px] h-12 bg-slate-200 my-auto mx-2 hidden xl:block"></div>
          <button onClick={() => setShowAdd(true)} className="flex-1 xl:flex-none px-10 py-4 bg-emerald-600 text-white rounded-[28px] font-black text-[10px] uppercase tracking-[3px] shadow-xl shadow-emerald-600/20 hover:scale-[1.05] active:scale-95 transition-all">
            + New Admission
          </button>
        </div>
      </div>

      {/* --- Unified Registry List --- */}
      <div className="bg-white rounded-[70px] border border-slate-200/40 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/40">
                <th className="px-12 py-10 text-[10px] font-black text-slate-400 uppercase tracking-[5px]">Clinical Identity</th>
                <th className="px-12 py-10 text-[10px] font-black text-slate-400 uppercase tracking-[5px]">Vital Specs</th>
                <th className="px-12 py-10 text-[10px] font-black text-slate-400 uppercase tracking-[5px]">Condition Node</th>
                <th className="px-12 py-10 text-[10px] font-black text-slate-400 uppercase tracking-[5px]">Lifecycle Status</th>
                <th className="px-12 py-10 text-[10px] font-black text-slate-400 uppercase tracking-[5px] text-right">Ops</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="px-12 py-10"><div className="h-12 bg-slate-50 rounded-[25px] w-full"></div></td>
                  </tr>
                ))
              ) : patients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-40 text-center">
                     <div className="text-5xl mb-8 grayscale opacity-50">🧬</div>
                     <div className="text-slate-300 font-black uppercase text-xs tracking-[15px] italic">Zero Clinical Entities Detected</div>
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-12 py-10">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[28px] bg-slate-100 flex items-center justify-center font-black text-2xl text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-700 shadow-inner">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-lg font-black text-slate-900 font-outfit tracking-tight">{p.name}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{p.patientId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-black text-slate-700 uppercase tracking-tighter">{p.age}Y • {p.gender}</div>
                        <div className="inline-flex px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{p.bloodGroup} Node</div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <div className="max-w-[200px]">
                         <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight truncate">{p.condition}</div>
                         <div className="text-[9px] font-black text-slate-400 uppercase tracking-[2px] mt-1.5">{p.ward || "Awaiting Assignment"}</div>
                      </div>
                    </td>
                    <td className="px-12 py-10">
                      <span className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[3px] border ${getStatusColor(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-12 py-10 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                         <button className="w-12 h-12 flex items-center justify-center bg-slate-950 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                         </button>
                         <button onClick={() => handleDelete(p.id)} disabled={deletingId === p.id} className="w-12 h-12 flex items-center justify-center bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                         </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="text-center py-10">
         <p className="text-slate-300 font-black text-[10px] uppercase tracking-[15px] italic">Secured Clinical Identity Node &bull; V7.2 Stable Ledger</p>
      </footer>
    </div>
  );
}
