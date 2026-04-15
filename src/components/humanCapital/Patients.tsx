import { useState } from "react";
import { usePatients, useCreatePatient, useDeletePatient, useUpdatePatient, type Patient } from "../../config/hooks/patient.hooks";

// Icons
const PatientIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const ActivityIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);
const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const STATUS_COLOR: Record<string, string> = {
  Inpatient: "blue",
  Outpatient: "amber",
  Discharged: "slate",
};

const CONDITION_COLOR: Record<string, string> = {
  Critical: "rose",
  Stable: "emerald",
  Recovery: "blue",
  Observation: "amber",
};

function getColor(patient: Patient): string {
  const condKey = Object.keys(CONDITION_COLOR).find((k) =>
    patient.condition.toLowerCase().includes(k.toLowerCase())
  );
  return condKey ? CONDITION_COLOR[condKey] : STATUS_COLOR[patient.status] ?? "slate";
}

// ─── Add Patient Modal ────────────────────────────────────────────────────────
function AddPatientModal({ onClose }: { onClose: () => void }) {
  const createPatient = useCreatePatient();
  const [form, setForm] = useState({
    patientId: "", name: "", age: "", gender: "Male",
    bloodGroup: "", phone: "", condition: "", ward: "",
    status: "Inpatient" as Patient["status"],
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createPatient.mutateAsync({
        ...form,
        age: Number(form.age),
      });
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to register patient.");
    }
  };

  const inputCls = "w-full px-5 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition-all";
  const labelCls = "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5 block";

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl p-10 animate-fade">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-8 bg-primary rounded-full"></div>
          <h2 className="text-2xl font-black text-slate-900">Register New Patient</h2>
        </div>

        {error && (
          <div className="mb-6 px-5 py-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold rounded-2xl">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Patient ID</label>
            <input className={inputCls} placeholder="PT-0001" value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} required />
          </div>
          <div>
            <label className={labelCls}>Full Name</label>
            <input className={inputCls} placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className={labelCls}>Age</label>
            <input className={inputCls} type="number" placeholder="35" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />
          </div>
          <div>
            <label className={labelCls}>Gender</label>
            <select className={inputCls} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Blood Group</label>
            <input className={inputCls} placeholder="O+" value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} required />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input className={inputCls} placeholder="+91 99999 99999" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div>
            <label className={labelCls}>Condition / Diagnosis</label>
            <input className={inputCls} placeholder="Hypertension" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} required />
          </div>
          <div>
            <label className={labelCls}>Ward / Room</label>
            <input className={inputCls} placeholder="Ward 4A" value={form.ward} onChange={(e) => setForm({ ...form, ward: e.target.value })} />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Patient["status"] })}>
              <option>Inpatient</option><option>Outpatient</option><option>Discharged</option>
            </select>
          </div>

          <div className="col-span-2 flex gap-4 mt-2">
            <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-500 font-black text-sm hover:bg-slate-50 transition-all">
              Cancel
            </button>
            <button type="submit" disabled={createPatient.isPending} className="flex-1 py-4 rounded-2xl bg-primary text-white font-black text-sm shadow-lg shadow-primary-glow hover:-translate-y-0.5 transition-all disabled:opacity-60">
              {createPatient.isPending ? "Registering..." : "Register Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Patients() {
  const [filter, setFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const statusParam = filter !== "All" ? filter : undefined;
  const { data: patients = [], isLoading, error } = usePatients(statusParam ? { status: statusParam } : undefined);
  const deletePatient = useDeletePatient();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Decommission this patient record?")) return;
    setDeletingId(id);
    try {
      await deletePatient.mutateAsync(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      {showAdd && <AddPatientModal onClose={() => setShowAdd(false)} />}

      <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-sm overflow-hidden animate-fade">
        {/* Table Header */}
        <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary-glow">
                <PatientIcon />
              </div>
              <h3 className="text-2xl font-outfit font-black text-slate-900 leading-none">Global Patient Registry</h3>
            </div>
            <p className="text-slate-400 font-medium max-w-md">Institutional Electronic Health Records (EHR) and clinical lifecycle management.</p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-slate-50 border border-slate-100 p-2 rounded-2xl flex gap-1">
              {['All', 'Inpatient', 'Outpatient', 'Discharged'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${filter === type ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {type}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="px-6 py-3 bg-primary text-white rounded-2xl font-black text-xs shadow-lg shadow-primary-glow hover:-translate-y-0.5 transition-all"
            >
              + Admit Patient
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-10 bg-slate-50/20">
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <span className="ml-4 text-slate-400 font-bold text-sm">Loading patient registry...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-16 text-rose-500 font-bold">
              Failed to load patients. Check backend connectivity.
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {patients.length === 0 && (
                <div className="xl:col-span-2 text-center py-16 text-slate-400 font-medium">
                  No patients found. Register the first admission.
                </div>
              )}

              {patients.map((p) => {
                const color = getColor(p);
                return (
                  <div key={p.id} className="bg-white p-8 rounded-[32px] border border-slate-200/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col md:flex-row gap-8 relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-50 rounded-bl-[100px] -mr-16 -mt-16 group-hover:scale-110 transition-transform`}></div>

                    <div className="flex-1 space-y-6 relative z-10">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className={`text-[0.65rem] font-black uppercase tracking-[2px] text-${color}-600 mb-1 block`}>{p.patientId}</span>
                          <h4 className="text-xl font-black text-slate-900">{p.name}</h4>
                          <div className="flex items-center gap-3 mt-1 font-bold text-slate-400 text-sm italic">
                            {p.age} Years • {p.condition}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-${color}-50 text-${color}-600 border border-${color}-100`}>
                            {p.status}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{p.gender} · {p.bloodGroup}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[0.65rem] font-bold text-slate-400 uppercase">Allocation</span>
                            <ActivityIcon className="text-slate-300 w-3.5 h-3.5" />
                          </div>
                          <p className="text-sm font-black text-slate-700">{p.ward ?? "OPD / Unassigned"}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[0.65rem] font-bold text-slate-400 uppercase">Phone</span>
                            <ShieldIcon className="text-slate-300 w-3.5 h-3.5" />
                          </div>
                          <p className="text-sm font-black text-slate-700">{p.phone}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 bg-${color}-500 rounded-full animate-pulse`}></div>
                          <span className="text-[0.7rem] font-bold text-slate-400">
                            Admitted {p.admittedOn ? new Date(p.admittedOn).toLocaleDateString() : "—"}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="px-5 py-2 border border-rose-100 text-rose-400 rounded-xl font-bold text-xs hover:bg-rose-50 transition-all disabled:opacity-50"
                        >
                          {deletingId === p.id ? "..." : "Discharge"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add New CTA */}
              <button
                onClick={() => setShowAdd(true)}
                className="xl:col-span-2 group border-2 border-dashed border-slate-200 rounded-[32px] p-12 flex flex-col items-center justify-center gap-4 transition-all hover:bg-white hover:border-primary/50"
              >
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </div>
                <div className="text-center">
                  <h4 className="font-black text-slate-900">New Emergency Admission</h4>
                  <p className="text-slate-400 font-medium text-sm">Synchronize with Triage and Front-Desk</p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
