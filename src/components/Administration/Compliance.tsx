

export function Compliance() {
  const documents = [
    { title: "Institutional License 2024", type: "Legal", expiry: "20 Dec 2024", status: "Active", level: "Critical" },
    { title: "Narayana Bio-Waste Cert", type: "Regulation", expiry: "12 Oct 2024", status: "Expiring", level: "High" },
    { title: "Fire Safety Audit", type: "Safety", expiry: "15 Jan 2025", status: "Active", level: "Standard" },
    { title: "Radiology Equipment Ver", type: "Medical", expiry: "05 Nov 2024", status: "Pending", level: "Standard" },
  ];

  return (
    <div className="space-y-10 animate-fade">
      <div className="grid grid-cols-12 gap-8">
        {/* Compliance Summary */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h4 className="text-xl font-black mb-2">Compliance <span className="text-primary italic">Score.</span></h4>
            <div className="text-5xl font-black mt-6">94.8%</div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Institutional Health Grade</p>
            <div className="mt-10 pt-10 border-t border-white/10 flex justify-between">
              <div>
                <div className="text-[10px] text-slate-500 font-black uppercase">Audits Passed</div>
                <div className="text-lg font-black text-emerald-400">12 / 14</div>
              </div>
              <div className="text-right">
                <button className="text-[10px] text-primary font-black uppercase tracking-widest hover:underline">Full Disclosure</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
             <h4 className="font-outfit font-black text-lg mb-6">Legislative <span className="text-slate-400 font-normal underline decoration-primary/20">Roadmap.</span></h4>
             <div className="space-y-6">
                {[
                  { month: "OCT", task: "Annual Bio-Waste Renewal", dept: "Facility Mgmt" },
                  { month: "NOV", task: "Radiology Safety Review", dept: "Diagnostics" },
                  { month: "DEC", task: "Institutional Audit", dept: "Legal" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 text-xs">{item.month}</div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 tracking-tight leading-none">{item.task}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{item.dept}</div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Document Vault */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
             <div>
                <h3 className="font-outfit font-black text-2xl text-slate-900">Document <span className="text-primary italic">Vault.</span></h3>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">Regulatory & Institutional Certifications</p>
             </div>
             <button className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs shadow-lg shadow-primary-glow hover:-translate-y-0.5 transition-all">Upload Document</button>
          </div>
          
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50">
                  <th className="px-6 py-4 text-left font-black">Title & Type</th>
                  <th className="px-6 py-4 text-center font-black">Maturity/Expiry</th>
                  <th className="px-6 py-4 text-center font-black">Priority</th>
                  <th className="px-6 py-4 text-right font-black">Integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {documents.map((doc, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                    <td className="px-6 py-6 font-bold">
                       <div className="text-slate-900 group-hover:text-primary transition-colors">{doc.title}</div>
                       <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{doc.type}</div>
                    </td>
                    <td className="px-6 py-6 text-center text-sm font-black text-slate-600 font-mono italic">{doc.expiry}</td>
                    <td className="px-6 py-6 text-center">
                       <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                         doc.level === 'Critical' ? 'bg-rose-50 text-rose-600' :
                         doc.level === 'High' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                       }`}>{doc.level}</span>
                    </td>
                    <td className="px-6 py-6 text-right">
                       <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black ${
                         doc.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                         doc.status === 'Expiring' ? 'bg-amber-50 text-amber-600 animate-pulse' : 'bg-slate-50 text-slate-400'
                       }`}>{doc.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-8 bg-slate-50/50 mt-auto border-t border-slate-50 flex justify-center">
             <button className="text-[11px] font-black uppercase tracking-[3px] text-slate-400 hover:text-slate-900 transition-colors">Digital Verification Engine Active</button>
          </div>
        </div>
      </div>
    </div>
  );
}
