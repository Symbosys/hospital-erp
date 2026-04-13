import { useState } from "react";
import { useLoginMutation } from "../config/hooks/auth.hooks";

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

function Login({ onHomeClick }: { onHomeClick: () => void, onLoginSuccess: () => void }) {
  const [formData, setFormData] = useState({ personnelId: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const loginMutation = useLoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    loginMutation.mutate(formData, {
      onError: (error: any) => {
        setErrorMessage(
          error.response?.data?.message || "Protocol rejection: Institutional handshake failed."
        );
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute top-1/2 right-[-10%] translate-y-[-50%] w-[60%] h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)] z-0"></div>
      <div className="w-full max-w-[580px] p-16 lg:p-24 z-10 bg-white animate-fade">
        <header className="flex justify-between items-center mb-24">
          <div className="flex items-center gap-4 font-extrabold text-[1.1rem] text-slate-900 tracking-wider cursor-pointer" onClick={onHomeClick}>
            <div className="w-3 h-3 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)]"></div>
            <span>MEDICARE+</span>
          </div>
          <div className="flex items-center gap-2.5 text-[0.65rem] font-extrabold tracking-[1.5px] text-slate-400 bg-slate-50 px-5 py-2.5 rounded-full">
            <LockIcon />
            <span>256-BIT ENCRYPTION</span>
          </div>
        </header>

        <div className="login-body">
          <h2 className="text-[3.5rem] leading-none font-black mb-6 tracking-[-2px]">
            Administrative <span className="text-blue-600">Access.</span>
          </h2>
          <p className="text-[1.1rem] text-slate-500 leading-relaxed mb-20">
            Initialize your clinical management environment by entering your institutional credentials.
          </p>

          <form onSubmit={handleSubmit} className="space-y-10">
            {errorMessage && (
              <div className="p-5 bg-red-50 border border-red-100 rounded-2xl text-[0.85rem] font-bold text-red-600 animate-shake">
                {errorMessage}
              </div>
            )}

            <div className="space-y-5">
              <label className="block text-[0.75rem] font-black uppercase tracking-[2px] text-slate-400">Personnel ID</label>
              <div className="h-[65px] border-[1.5px] border-slate-100 rounded-2xl flex items-center px-7 gap-4 bg-slate-50 focus-within:border-blue-600 focus-within:bg-white focus-within:shadow-[0_15px_30px_rgba(37,99,235,0.05)] transition-all">
                <div className="text-blue-600"><UserIcon /></div>
                <input 
                  type="text" 
                  placeholder="ID-4922-PX" 
                  className="border-none outline-none bg-transparent w-full text-[1.1rem] font-semibold text-slate-900"
                  value={formData.personnelId}
                  onChange={(e) => setFormData({ ...formData, personnelId: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[0.75rem] font-black uppercase tracking-[2px] text-slate-400">Security Key</label>
                <a href="#" className="text-blue-600 font-extrabold text-[0.75rem] uppercase">Recover</a>
              </div>
              <div className="h-[65px] border-[1.5px] border-slate-100 rounded-2xl flex items-center px-7 gap-4 bg-slate-50 focus-within:border-blue-600 focus-within:bg-white focus-within:shadow-[0_15px_30px_rgba(37,99,235,0.05)] transition-all">
                <div className="text-blue-600"><LockIcon /></div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="border-none outline-none bg-transparent w-full text-[1.1rem] font-semibold text-slate-900" 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loginMutation.isPending}
              className={`w-full h-[65px] ${loginMutation.isPending ? 'bg-slate-400' : 'bg-slate-900'} text-white font-extrabold text-[0.95rem] rounded-2xl tracking-wider mt-8 shadow-[0_20px_40px_rgba(15,23,42,0.15)] hover:bg-slate-800 hover:-translate-y-0.5 transition-all`}
            >
              {loginMutation.isPending ? "SYNCHRONIZING..." : "INITIALIZE PROTOCOL"}
            </button>
          </form>

          <footer className="border-t border-slate-100 pt-12 mt-16 flex justify-between items-center">
            <button onClick={onHomeClick} className="bg-transparent font-extrabold text-[0.75rem] text-slate-400 tracking-wider hover:text-red-500 transition-colors">
              ← TERMINATE SESSION
            </button>
            <div className="text-[0.65rem] font-black tracking-wider text-green-500 uppercase">SYSTEMS: ONLINE</div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;
