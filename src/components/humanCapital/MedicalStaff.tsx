import { useState } from "react";
import { useMedicalStaff, useCreateMedicalStaff, useDeleteMedicalStaff, type MedicalStaff } from "../../config/hooks/staff.hooks";

// ─── Add Staff Modal ──────────────────────────────────────────────────────────
function AddStaffModal({ onClose }: { onClose: () => void }) {
  const createStaff = useCreateMedicalStaff();
  const [form, setForm] = useState({
    staffId: "", name: "", role: "", department: "",
    phone: "", shift: "Morning" as MedicalStaff["shift"],
    status: "On Duty" as MedicalStaff["status"],
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try { await createStaff.mutateAsync(form); onClose(); }
    catch (err: any) { setError(err?.response?.data?.message ?? "Failed to onboard staff."); }
  };

  const inputCls = "w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition-all";
  const labelCls = "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block";

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl p-10 animate-fade">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-8 bg-primary rounded-full"></div>
          <h2 className="text-2xl font-black text-slate-900">Onboard Medical Staff</h2>
        </div>
        {error && <div className="mb-6 px-5 py-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <div><label className={labelCls}>Staff ID</label><input className={inputCls} placeholder="NRS-201" value={form.staffId} onChange={(e) => setForm({ ...form, staffId: e.target.value })} required /></div>
          <div><label className={labelCls}>Full Name</label><input className={inputCls} placeholder="Sarah Jenkins" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><label className={labelCls}>Role</label><input className={inputCls} placeholder="Head Nurse" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></div>
          <div><label className={labelCls}>Department</label><input className={inputCls} placeholder="ICU" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required /></div>
          <div><label className={labelCls}>Phone</label><input className={inputCls} placeholder="+91 99999 99999" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div>
          <div>
            <label className={labelCls}>Shift</label>
            <select className={inputCls} value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value as MedicalStaff["shift"] })}>
              <option>Morning</option><option>Evening</option><option>Night</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as MedicalStaff["status"] })}>
              <option>On Duty</option><option>Off Duty</option><option>On Leave</option>
            </select>
          </div>
          <div className="col-span-2 flex gap-4 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-500 font-black text-sm hover:bg-slate-50 transition-all">Cancel</button>
            <button type="submit" disabled={createStaff.isPending} className="flex-1 py-4 rounded-2xl bg-primary text-white font-black text-sm shadow-lg shadow-primary-glow hover:-translate-y-0.5 transition-all disabled:opacity-60">
              {createStaff.isPending ? "Onboarding..." : "Onboard Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function MedicalStaff() {
  const [activeShift, setActiveShift] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const shiftParam = activeShift !== "All" ? activeShift : undefined;
  const { data: staff = [], isLoading, error } = useMedicalStaff(shiftParam ? { shift: shiftParam } : undefined);
  const deleteStaff = useDeleteMedicalStaff();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this staff record?")) return;
    setDeletingId(id);
    try { await deleteStaff.mutateAsync(id); }
    finally { setDeletingId(null); }
  };

  const statusColor = (s: string) =>
    s === "On Duty" ? "emerald" : s === "On Leave" ? "rose" : "slate";

  return (
    <>
      {showAdd && <AddStaffModal onClose={() => setShowAdd(false)} />}

      <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-outfit font-black text-slate-900 leading-none">Medical Staff & Caregivers</h3>
            <p className="text-sm text-slate-400 font-medium mt-2">Overseeing shift rotations for clinical staff.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2">
              {["All", "Morning", "Evening", "Night"].map((shift) => (
                <button key={shift} onClick={() => setActiveShift(shift)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-[0.75rem] transition-all ${activeShift === shift ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
                  {shift}
                </button>
              ))}
            </div>
            <button onClick={() => setShowAdd(true)} className="bg-primary text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-primary-glow hover:-translate-y-0.5 transition-all">
              + Onboard
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-6 bg-slate-50/30">
          {isLoading && (
            <div className="col-span-3 flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <span className="ml-4 text-slate-400 font-bold text-sm">Loading staff registry...</span>
            </div>
          )}
          {error && <div className="col-span-3 text-center py-16 text-rose-500 font-bold">Failed to load staff.</div>}

          {!isLoading && !error && staff.length === 0 && (
            <div className="col-span-3 text-center py-16 text-slate-400 font-medium">No staff on this shift. Onboard the first member.</div>
          )}

          {!isLoading && staff.map((s) => {
            const color = statusColor(s.status);
            return (
              <div key={s.id} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-outfit font-black text-xl group-hover:bg-primary group-hover:text-white transition-all bg-${color}-50 text-${color}-600`}>
                    {s.name.charAt(0)}
                  </div>
                  <div className={`px-3 py-1.5 rounded-lg text-[0.65rem] font-black uppercase tracking-wider bg-${color}-50 text-${color}-600`}>
                    {s.status}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{s.name}</h4>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{s.role} • {s.department}</p>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-slate-50">
                  <div className="flex justify-between items-center text-[0.7rem] font-bold">
                    <span className="text-slate-400">SHIFT TIMING</span>
                    <span className="text-slate-700">{s.shift}</span>
                  </div>
                  <div className="flex justify-between items-center text-[0.7rem] font-bold">
                    <span className="text-slate-400">STAFF ID</span>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md">{s.staffId}</span>
                  </div>
                </div>

                <button onClick={() => handleDelete(s.id)} disabled={deletingId === s.id}
                  className="w-full mt-6 py-3 bg-slate-50 text-slate-500 rounded-xl font-bold text-xs hover:bg-rose-50 hover:text-rose-600 transition-all disabled:opacity-50">
                  {deletingId === s.id ? "Removing..." : "Remove Record"}
                </button>
              </div>
            );
          })}

          {/* Add CTA */}
          <button onClick={() => setShowAdd(true)} className="bg-white/50 border-2 border-dashed border-slate-200 rounded-[24px] p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-primary/40 hover:text-primary transition-all group min-h-[250px]">
            <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-primary transition-all">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
            <span className="font-bold text-sm tracking-tight">Onboard Staff Member</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center px-10">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900">{staff.length}</span>
              <span className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">Active Personnel</span>
            </div>
            <div className="w-[1px] h-8 bg-slate-200"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-emerald-600">
                {staff.length > 0 ? Math.round((staff.filter(s => s.status === "On Duty").length / staff.length) * 100) : 0}%
              </span>
              <span className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest">On Duty Now</span>
            </div>
          </div>
          <button className="text-primary font-black text-sm hover:underline tracking-tight italic">Export Roster (PDF)</button>
        </div>
      </div>
    </>
  );
}
