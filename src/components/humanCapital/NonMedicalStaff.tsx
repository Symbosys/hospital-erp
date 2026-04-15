import { useState } from "react";
import { 
  useNonMedicalStaff, 
  useCreateNonMedicalStaff, 
  useDeleteNonMedicalStaff, 
  type NonMedicalStaff 
} from "../../config/hooks/staff.hooks";

// ─── Add Staff Modal ──────────────────────────────────────────────────────────
function AddStaffModal({ onClose }: { onClose: () => void }) {
  const createStaff = useCreateNonMedicalStaff();
  const [form, setForm] = useState({
    staffId: "", 
    name: "", 
    designation: "", 
    department: "",
    phone: "", 
    shift: "Morning" as NonMedicalStaff["shift"],
    status: "Active" as NonMedicalStaff["status"],
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try { 
      await createStaff.mutateAsync(form); 
      onClose(); 
    } catch (err: any) { 
      setError(err?.response?.data?.message ?? "Failed to onboard personnel."); 
    }
  };

  const inputCls = "w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-sm";
  const labelCls = "text-[10px] font-black uppercase tracking-[3px] text-slate-400 mb-2 block ml-1";

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl p-10 relative overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <div className="relative z-10 flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-outfit tracking-tighter">
              Onboard <span className="text-indigo-600 italic">Personnel.</span>
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Institutional Support Registry</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {error && <div className="mb-6 px-6 py-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-black rounded-2xl animate-shake">{error}</div>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 relative z-10">
          <div><label className={labelCls}>Entity ID</label><input className={inputCls} placeholder="ADM-001" value={form.staffId} onChange={(e) => setForm({ ...form, staffId: e.target.value })} required /></div>
          <div><label className={labelCls}>Full Identity</label><input className={inputCls} placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><label className={labelCls}>Designation</label><input className={inputCls} placeholder="Operations Manager" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} required /></div>
          <div><label className={labelCls}>Functional Node</label><input className={inputCls} placeholder="Administration" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required /></div>
          <div><label className={labelCls}>Direct Line</label><input className={inputCls} placeholder="+91 00000 00000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div>
          <div>
            <label className={labelCls}>Rotational Shift</label>
            <select className={inputCls} value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value as any })}>
              <option>Morning</option><option>Evening</option><option>Night</option>
            </select>
          </div>
          <div className="col-span-2 flex gap-6 mt-4">
            <button type="submit" disabled={createStaff.isPending} className="flex-1 py-5 bg-slate-900 text-white rounded-[24px] font-black text-[11px] uppercase tracking-[4px] shadow-2xl shadow-slate-900/20 hover:-translate-y-1 active:scale-95 transition-all">
              {createStaff.isPending ? "Validating..." : "Commit Entity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function NonMedicalStaff() {
  const [activeShift, setActiveShift] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: staff = [], isLoading } = useNonMedicalStaff(activeShift !== "All" ? { shift: activeShift } : undefined);
  const deleteStaff = useDeleteNonMedicalStaff();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanent decommission of entity record?")) return;
    setDeletingId(id);
    try { await deleteStaff.mutateAsync(id); }
    finally { setDeletingId(null); }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "On Leave": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-slate-50 text-slate-400 border-slate-100";
    }
  };

  return (
    <div className="space-y-10 animate-fade pb-24">
      {showAdd && <AddStaffModal onClose={() => setShowAdd(false)} />}

      {/* --- Executive Header --- */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 bg-white p-12 rounded-[50px] border border-slate-200/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 to-slate-900"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-10 bg-indigo-600 rounded-full"></div>
            <h1 className="text-4xl font-black font-outfit text-slate-900 tracking-tighter">
              Institutional <br/><span className="text-indigo-600 italic">Support Infrastructure.</span>
            </h1>
          </div>
          <p className="text-slate-400 font-medium max-w-xl text-[1rem] leading-relaxed">
            Managing operational logistics, administrative personnel, and facility maintenance nodes.
          </p>
        </div>

        <div className="flex bg-slate-50 p-2 rounded-[30px] border border-slate-100 gap-2 relative z-10">
          {["All", "Morning", "Evening", "Night"].map((shift) => (
            <button key={shift} onClick={() => setActiveShift(shift)}
              className={`px-8 py-3.5 rounded-[22px] font-black text-[10px] uppercase tracking-widest transition-all ${activeShift === shift ? "bg-white text-indigo-600 shadow-xl shadow-indigo-500/10 border border-slate-100" : "text-slate-400 hover:text-slate-600"}`}>
              {shift}
            </button>
          ))}
          <div className="w-[1px] h-10 bg-slate-200 my-auto mx-2"></div>
          <button onClick={() => setShowAdd(true)} className="px-8 py-3.5 bg-indigo-600 text-white rounded-[22px] font-black text-[10px] uppercase tracking-[3px] shadow-xl shadow-indigo-600/20 hover:scale-[1.05] active:scale-95 transition-all">
            + Onboard
          </button>
        </div>
      </div>

      {/* --- Grid View --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-[350px] bg-white rounded-[40px] animate-pulse border border-slate-100"></div>
          ))
        ) : staff.length === 0 ? (
          <div className="col-span-full py-32 text-center bg-white rounded-[50px] border border-dashed border-slate-200">
             <div className="text-4xl mb-6">👥</div>
             <div className="text-slate-300 font-black uppercase text-xs tracking-[10px]">Registry Empty</div>
          </div>
        ) : (
          staff.map((s) => (
            <div key={s.id} className="bg-white p-8 rounded-[45px] border border-slate-200/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-2 transition-all duration-500 group">
              <div className="flex justify-between items-start mb-10">
                <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center font-black text-2xl text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  {s.name.charAt(0)}
                </div>
                <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(s.status)}`}>
                  {s.status}
                </div>
              </div>

              <div className="space-y-1 mb-10">
                <h4 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{s.name}</h4>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{s.designation}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-50">
                <div className="space-y-1">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Node</span>
                   <div className="text-xs font-bold text-slate-700">{s.department}</div>
                </div>
                <div className="space-y-1">
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Shift</span>
                   <div className="text-xs font-bold text-slate-700">{s.shift}</div>
                </div>
              </div>

              <button onClick={() => handleDelete(s.id)} disabled={deletingId === s.id}
                className="w-full mt-10 py-4 bg-slate-50 text-slate-400 rounded-[20px] font-black text-[9px] uppercase tracking-[4px] border border-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 shadow-sm transition-all active:scale-95 disabled:opacity-50">
                {deletingId === s.id ? "Decommissioning..." : "Remove Entity"}
              </button>
            </div>
          ))
        )}
      </div>

      <footer className="text-center py-10">
         <p className="text-slate-300 font-black text-[10px] uppercase tracking-[12px] italic">Secured Institutional Ledger &bull; Support Infrastructure</p>
      </footer>
    </div>
  );
}
