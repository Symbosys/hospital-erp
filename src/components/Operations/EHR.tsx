import { useState } from "react";
import { 
  useEhrRecords, 
  useCreateEhrRecord, 
  type EHRRecord 
} from "../../config/hooks/ehr.hooks";
import { usePatients } from "../../config/hooks/patient.hooks";

// ─── Entry Modal ──────────────────────────────────────────────────────────────
function AddRecordModal({ onClose }: { onClose: () => void }) {
  const createEhr = useCreateEhrRecord();
  const { data: patients = [] } = usePatients();
  const [form, setForm] = useState({
    ehrId: `EHR-${Math.floor(10000 + Math.random() * 90000)}`,
    patientId: "",
    diagnosis: "",
    prescription: "",
    vitals: "",
    doctorName: "",
    visitDate: new Date().toISOString().split('T')[0],
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEhr.mutateAsync(form);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const inputCls = "w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500 transition-all";
  const labelCls = "text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1";

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-outfit tracking-tighter">
              Clinical <span className="text-indigo-600 italic">Encounter.</span>
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">EHR Node Authorization</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 transition-all">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 relative z-10">
          <div className="col-span-2">
            <label className={labelCls}>Subject Identity</label>
            <select className={inputCls} value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })} required>
              <option value="">Select Patient Record...</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>)}
            </select>
          </div>
          <div><label className={labelCls}>Attending Consultant</label><input className={inputCls} placeholder="Dr. Elena Vance" value={form.doctorName} onChange={(e) => setForm({ ...form, doctorName: e.target.value })} required /></div>
          <div><label className={labelCls}>Encounter Date</label><input className={inputCls} type="date" value={form.visitDate} onChange={(e) => setForm({ ...form, visitDate: e.target.value })} required /></div>
          <div className="col-span-2"><label className={labelCls}>Primary Diagnosis</label><input className={inputCls} placeholder="Type clinical diagnosis..." value={form.diagnosis} onChange={(e) => setForm({ ...form, diagnosis: e.target.value })} required /></div>
          <div className="col-span-2"><label className={labelCls}>Vital Metrics</label><input className={inputCls} placeholder="BP: 120/80, HR: 72bpm..." value={form.vitals} onChange={(e) => setForm({ ...form, vitals: e.target.value })} /></div>
          <div className="col-span-2"><label className={labelCls}>Prescription Node</label><textarea className={`${inputCls} h-24 resize-none`} placeholder="Enter medication details..." value={form.prescription} onChange={(e) => setForm({ ...form, prescription: e.target.value })} /></div>
          
          <div className="col-span-2 pt-4">
            <button disabled={createEhr.isPending} className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black text-[11px] uppercase tracking-[4px] shadow-xl hover:-translate-y-1 transition-all">
              {createEhr.isPending ? "Integrating Node..." : "Commit Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main View ─────────────────────────────────────────────────────────────
export function EHR() {
  const [showAdd, setShowAdd] = useState(false);
  const [searchId, setSearchId] = useState("");
  const { data: records = [], isLoading } = useEhrRecords();

  const filteredRecords = searchId 
    ? records.filter(r => r.patient?.name.toLowerCase().includes(searchId.toLowerCase()) || r.ehrId.toLowerCase().includes(searchId.toLowerCase()))
    : records;

  return (
    <div className="space-y-12 animate-fade max-w-[1500px] mx-auto pb-24">
      {showAdd && <AddRecordModal onClose={() => setShowAdd(false)} />}

      {/* --- Executive Header --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 bg-white p-12 rounded-[50px] border border-slate-200/50 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="px-5 py-2 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-2">
               <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span> Identity Ledger Active
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[4px]">V9.1 Clinical Matrix</span>
          </div>
          <h1 className="text-5xl font-black font-outfit text-slate-900 tracking-tighter leading-none">
            Digital Health <span className="text-indigo-600 italic">Ledger.</span>
          </h1>
          <p className="text-slate-400 font-medium mt-4 max-w-xl text-[1.05rem]">
            Consolidated longitudinal history including encounters, prescriptions, and spectral vitals encryption.
          </p>
        </div>

        <div className="flex gap-4 relative z-10">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search Identity..." 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="px-10 py-5 bg-slate-50 border border-slate-100 rounded-[30px] font-bold text-sm text-slate-900 focus:outline-none focus:border-indigo-400 w-64 lg:w-80 transition-all placeholder:text-slate-300 shadow-inner"
            />
            <svg className="absolute left-4 top-5 text-slate-300" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <button onClick={() => setShowAdd(true)} className="px-10 py-5 bg-slate-900 text-white rounded-[30px] font-black text-[11px] uppercase tracking-widest hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-slate-900/10">
            + New Encounter
          </button>
        </div>
      </div>

      {/* --- Ledger Node List --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-64 bg-white rounded-[45px] animate-pulse border border-slate-100"></div>
          ))
        ) : filteredRecords.length === 0 ? (
          <div className="col-span-full py-40 text-center bg-white rounded-[60px] border border-dashed border-slate-200">
             <div className="text-4xl mb-6">🩺</div>
             <div className="text-slate-300 font-black uppercase text-xs tracking-[10px]">No Encounters Cataloged</div>
          </div>
        ) : (
          filteredRecords.map((record) => (
            <div key={record.id} className="bg-white p-10 rounded-[50px] border border-slate-200/40 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                 <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{record.ehrId}</div>
              </div>
              
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 rounded-[24px] bg-slate-100 flex items-center justify-center font-black text-2xl text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  {record.patient?.name.charAt(0)}
                </div>
                <div className="flex-1">
                   <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-black text-slate-900 font-outfit tracking-tight">{record.patient?.name}</h3>
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-full">{record.visitDate.split('T')[0]}</span>
                   </div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-[3px] mb-8">Consultant: {record.doctorName}</div>
                   
                   <div className="grid grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-[35px] border border-slate-100">
                      <div>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Diagnosis</span>
                         <div className="text-xs font-bold text-slate-800 line-clamp-2">{record.diagnosis}</div>
                      </div>
                      <div>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Spectral Vitals</span>
                         <div className="text-xs font-bold text-indigo-600">{record.vitals || "No Data"}</div>
                      </div>
                   </div>

                   <button className="mt-8 text-[11px] font-black text-indigo-600 uppercase tracking-[4px] hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                     Retrieve Full Matrix →
                   </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <footer className="text-center pt-12">
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[15px]">Digital Fiscal Backbone &bull; V9.1 Stable Matrix</p>
      </footer>
    </div>
  );
}
