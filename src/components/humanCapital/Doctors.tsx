import { useState } from "react";
import { useDoctors, useCreateDoctor, useDeleteDoctor, type Doctor } from "../../config/hooks/doctor.hooks";

// Icons
const MoreVerticalIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

// ─── Add Doctor Modal ─────────────────────────────────────────────────────────
function AddDoctorModal({ onClose }: { onClose: () => void }) {
  const createDoctor = useCreateDoctor();
  const [form, setForm] = useState({
    doctorId: "", name: "", specialty: "", phone: "",
    email: "", experience: "", schedule: "",
    status: "On Duty" as Doctor["status"],
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createDoctor.mutateAsync({
        ...form,
        experience: Number(form.experience),
      });
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to register doctor.");
    }
  };

  const inputCls = "w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition-all";
  const labelCls = "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block";

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl p-10 animate-fade">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-8 bg-primary rounded-full"></div>
          <h2 className="text-2xl font-black text-slate-900">Register New Doctor</h2>
        </div>
        {error && <div className="mb-6 px-5 py-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <div><label className={labelCls}>Doctor ID</label><input className={inputCls} placeholder="DR-001" value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })} required /></div>
          <div><label className={labelCls}>Full Name</label><input className={inputCls} placeholder="Dr. Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div><label className={labelCls}>Specialty</label><input className={inputCls} placeholder="Cardiology" value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} required /></div>
          <div><label className={labelCls}>Phone</label><input className={inputCls} placeholder="+91 99999 99999" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></div>
          <div><label className={labelCls}>Email</label><input className={inputCls} type="email" placeholder="doctor@hospital.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label className={labelCls}>Experience (Years)</label><input className={inputCls} type="number" placeholder="10" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} /></div>
          <div><label className={labelCls}>Schedule</label><input className={inputCls} placeholder="Mon-Fri 9AM-5PM" value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} /></div>
          <div>
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Doctor["status"] })}>
              <option>On Duty</option><option>Off Duty</option><option>On Leave</option>
            </select>
          </div>
          <div className="col-span-2 flex gap-4 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-500 font-black text-sm hover:bg-slate-50 transition-all">Cancel</button>
            <button type="submit" disabled={createDoctor.isPending} className="flex-1 py-4 rounded-2xl bg-primary text-white font-black text-sm shadow-lg shadow-primary-glow hover:-translate-y-0.5 transition-all disabled:opacity-60">
              {createDoctor.isPending ? "Registering..." : "Register Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Doctors() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: doctors = [], isLoading, error } = useDoctors();
  const deleteDoctor = useDeleteDoctor();

  const filtered = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this doctor record?")) return;
    setDeletingId(id);
    try { await deleteDoctor.mutateAsync(id); }
    finally { setDeletingId(null); }
  };

  const availabilityColor = (status: string) => {
    if (status === "On Duty") return "emerald";
    if (status === "On Leave") return "rose";
    return "slate";
  };

  return (
    <>
      {showAdd && <AddDoctorModal onClose={() => setShowAdd(false)} />}

      <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl font-outfit font-black text-slate-900 leading-none">Medical Consultants</h3>
            <p className="text-sm text-slate-400 font-medium mt-2">Managing institutional doctor directories and availability.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-[300px]">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input type="text" placeholder="Search consultants..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-transparent focus:border-primary/20 focus:bg-white px-12 py-3.5 rounded-2xl outline-none text-sm font-semibold transition-all shadow-inner" />
            </div>
            <button onClick={() => setShowAdd(true)} className="bg-primary text-white px-6 py-3.5 rounded-2xl font-black text-sm shadow-lg shadow-primary-glow hover:-translate-y-0.5 transition-all whitespace-nowrap">
              + Add Doctor
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <span className="ml-4 text-slate-400 font-bold text-sm">Loading doctors...</span>
            </div>
          )}
          {error && <div className="text-center py-16 text-rose-500 font-bold">Failed to load doctors.</div>}
          {!isLoading && !error && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Consultant Info</th>
                  <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Specialty</th>
                  <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Availability</th>
                  <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Experience</th>
                  <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Schedule</th>
                  <th className="px-8 py-5 text-[0.7rem] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-16 text-slate-400 font-medium">No doctors found. Register the first consultant.</td></tr>
                )}
                {filtered.map((doc) => {
                  const color = availabilityColor(doc.status);
                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-outfit font-black text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                            {doc.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">{doc.name}</span>
                              <CheckCircleIcon className="text-blue-500" />
                            </div>
                            <span className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-tighter">{doc.doctorId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-slate-600">
                        <span className="px-3 py-1.5 bg-slate-100 rounded-lg">{doc.specialty}</span>
                      </td>
                      <td className="px-8 py-6 text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-${color}-500`}></div>
                          <span className={`text-${color}-600`}>{doc.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-slate-700">{doc.experience} yrs</td>
                      <td className="px-8 py-6 text-sm text-slate-500 font-medium">{doc.schedule ?? "—"}</td>
                      <td className="px-8 py-6 text-right">
                        <button onClick={() => handleDelete(doc.id)} disabled={deletingId === doc.id}
                          className="p-2 text-rose-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-50">
                          <MoreVerticalIcon />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center px-10">
          <span className="text-[0.75rem] font-bold text-slate-400">
            Showing {filtered.length} of {doctors.length} medical consultants
          </span>
        </div>
      </div>
    </>
  );
}
