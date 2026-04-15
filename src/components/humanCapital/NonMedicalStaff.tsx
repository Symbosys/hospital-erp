import { useState } from "react";
import { useNonMedicalStaff, useCreateNonMedicalStaff, useDeleteNonMedicalStaff, type NonMedicalStaff } from "../../config/hooks/staff.hooks";

// Icons
const ToolIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
);
const AdminIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

function getDesignationIcon(designation: string) {
  const d = designation.toLowerCase();
  if (d.includes("admin") || d.includes("hr") || d.includes("reception")) return <AdminIcon />;
  return <ToolIcon />;
}

// ─── Add Staff Modal ──────────────────────────────────────────────────────────
function AddNonMedicalModal({ onClose }: { onClose: () => void }) {
  const createStaff = useCreateNonMedicalStaff();
  const [form, setForm] = useState({
    staffId: "", name: "", designation: "", department: "",
    phone: "", shift: "Morning" as NonMedicalStaff["shift"],
    status: "Active" as NonMedicalStaff["status"],
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
          <div className="w-2 h-8 bg-slate-900 rounded-full"></div>
          <h2 className="text-2xl font-black text-slate-900">Onboard Operational Staff</h2>
        </div>
        {error && <div className="mb-6 px-5 py-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <div><label className={labelCls}>Staff ID</label><input className={inputCls} placeholder="ADM-301" value={form.staffId} onChange={(e) => setForm({ ...form, staffId: e.target.value })} required /></div>
          <div><label className={labelCls}>Full Name</label><input className={inputCls} placeholder="Marc Spector" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><label className={labelCls}>Designation</label><input className={inputCls} placeholder="Security Lead" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} required /></div>
          <div><label className={labelCls}>Department</label><input className={inputCls} placeholder="Facility" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required /></div>
          <div><label className={labelCls}>Phone</label><input className={inputCls} placeholder="+91 99999 99999" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div>
          <div>
            <label className={labelCls}>Shift</label>
            <select className={inputCls} value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value as NonMedicalStaff["shift"] })}>
              <option>Morning</option><option>Evening</option><option>Night</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as NonMedicalStaff["status"] })}>
              <option>Active</option><option>Inactive</option><option>On Leave</option>
            </select>
          </div>
          <div className="col-span-2 flex gap-4 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-500 font-black text-sm hover:bg-slate-50 transition-all">Cancel</button>
            <button type="submit" disabled={createStaff.isPending} className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm hover:-translate-y-0.5 transition-all disabled:opacity-60">
              {createStaff.isPending ? "Onboarding..." : "Onboard Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function NonMedicalStaff() {
  const [showAdd, setShowAdd] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: staff = [], isLoading, error } = useNonMedicalStaff();
  const deleteStaff = useDeleteNonMedicalStaff();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this staff record?")) return;
    setDeletingId(id);
    try { await deleteStaff.mutateAsync(id); }
    finally { setDeletingId(null); }
  };

  const statusStyle = (s: string) => ({
    "Active": "bg-emerald-50 text-emerald-600",
    "On Leave": "bg-amber-50 text-amber-600",
    "Inactive": "bg-slate-50 text-slate-400",
  }[s] ?? "bg-slate-50 text-slate-400");

  return (
    <>
      {showAdd && <AddNonMedicalModal onClose={() => setShowAdd(false)} />}

      <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-outfit font-black text-slate-900 leading-none">Operational Personnel</h3>
            <p className="text-sm text-slate-400 font-medium mt-2">Managing the foundational workforce that moves the institution.</p>
          </div>
          <button onClick={() => setShowAdd(true)} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm hover:-translate-y-0.5 transition-all">
            + Onboard
          </button>
        </div>

        <div className="p-10 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
              <span className="ml-4 text-slate-400 font-bold text-sm">Loading operational staff...</span>
            </div>
          )}
          {error && <div className="text-center py-16 text-rose-500 font-bold">Failed to load staff.</div>}
          {!isLoading && !error && staff.length === 0 && (
            <div className="text-center py-16 text-slate-400 font-medium">No operational staff registered yet.</div>
          )}

          {!isLoading && staff.map((s) => (
            <div key={s.id} className="group flex items-center justify-between p-6 bg-slate-50 hover:bg-white border border-slate-100 hover:shadow-xl hover:-translate-y-0.5 rounded-2xl transition-all">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform text-slate-600">
                  {getDesignationIcon(s.designation)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{s.name}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">{s.designation}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">{s.department}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-[0.7rem] font-bold text-slate-400">{s.shift}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className={`px-4 py-1.5 rounded-lg text-[0.65rem] font-black uppercase tracking-widest ${statusStyle(s.status)}`}>
                  {s.status}
                </span>
                <button onClick={() => handleDelete(s.id)} disabled={deletingId === s.id}
                  className="px-5 py-2.5 bg-white border border-slate-200 text-slate-400 font-bold text-xs rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all disabled:opacity-50">
                  {deletingId === s.id ? "..." : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-10 bg-slate-50 border-t border-slate-100">
          <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-200/50 relative overflow-hidden">
            <div>
              <h4 className="font-black text-slate-900">Institutional Maintenance Flow</h4>
              <p className="text-xs text-slate-400 font-medium">Auto-dispatching tasks based on facility sensor telemetry.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-black text-slate-500">{staff.length} Personnel</span>
              <button className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-xs shadow-lg shadow-primary-glow">Configure Workflows</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
