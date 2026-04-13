import { useEffect, useState } from "react";

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

function Home({ onLoginClick }: { onLoginClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <nav className={`fixed top-0 left-0 right-0 h-[100px] z-[1000] flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "bg-white/85 backdrop-blur-[25px] h-20 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border-b border-black/5" : ""}`}>
        <div className="max-w-[1400px] mx-auto px-8 w-full flex justify-between items-center">
          <div className="flex items-center gap-4 text-xl font-extrabold text-slate-900 tracking-tight">
             <div className="w-3.5 h-3.5 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)]"></div>
             <span>MEDICARE+ ERP</span>
          </div>
          <ul className="hidden lg:flex gap-16 list-none">
            <li><a href="#solutions" className="no-underline text-[0.85rem] font-bold text-slate-500 uppercase tracking-[1.5px] hover:text-blue-600 transition-colors">Solutions</a></li>
            <li><a href="#about" className="no-underline text-[0.85rem] font-bold text-slate-500 uppercase tracking-[1.5px] hover:text-blue-600 transition-colors">The Network</a></li>
          </ul>
          <div className="flex gap-8 items-center">
            <button className="bg-transparent text-slate-500 font-bold text-[0.85rem] tracking-wider uppercase hover:text-blue-600 transition-colors" onClick={onLoginClick}>Login</button>
          </div>
        </div>
      </nav>

      <section className="pt-[220px] pb-[120px] relative overflow-hidden min-h-[90vh]">
          <div className="max-w-[1400px] mx-auto px-8 relative z-10">
              <div className="max-w-[850px] animate-fade">
                  <div className="inline-block px-5.5 py-2.5 bg-slate-100 text-blue-600 rounded-full text-[0.75rem] font-extrabold uppercase tracking-[2px] mb-12">Clinical Intelligence Platform</div>
                  <h1 className="text-8xl leading-[0.95] font-black text-slate-900 mb-14 tracking-tight">Enterprise Healthcare <span className="text-blue-600">Engineered.</span></h1>
                  <p className="text-2xl text-slate-500 leading-relaxed mb-20 max-w-[680px]">A unified ERP solution for modern medical institutions. Streamline patient life-cycles, automate clinical workflows, and govern institutional finance with precision.</p>
                  <div className="flex gap-8">
                      <button className="bg-slate-900 text-white px-14 py-5.5 rounded-full font-extrabold text-base tracking-wider shadow-[0_15px_35px_rgba(15,23,42,0.15)] hover:bg-slate-800 hover:-translate-y-0.5 transition-all" onClick={onLoginClick}>Initialize ERP Suite</button>
                      <button className="bg-transparent border-[1.5px] border-slate-200 px-14 py-5.5 rounded-full font-extrabold text-slate-900 text-base hover:bg-slate-50 transition-colors">Request Institutional Demo</button>
                  </div>
              </div>
          </div>
          <div className="absolute top-0 right-0 w-[60%] h-full z-0 pointer-events-none">
              <img src="/src/assets/ultra_premium_medical_abstract_hero_1775112193920.png" alt="Medical Abstract" className="w-full h-full object-cover opacity-70 mask-linear-to-r" />
          </div>
      </section>

      <section id="solutions" className="max-w-[1400px] mx-auto px-8 py-[120px]">
          <div className="mb-24">
              <h2 className="text-[3.5rem] font-black mb-8 tracking-tight">A Unified Protocol For <span className="text-blue-600">Medical Oversight.</span></h2>
              <p className="text-xl text-slate-500 max-w-[680px]">Our modular approach allows institutions to integrate only what they need, synchronized across all departments.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
              <div className="p-16 lg:p-20 bg-slate-50 rounded-[40px] transition-all hover:translate-y-[-10px]">
                  <div className="flex justify-between items-center mb-16">
                      <div className="text-blue-600"><ShieldIcon /></div>
                      <span className="font-black text-[0.9rem] opacity-20 tracking-[2px]">01</span>
                  </div>
                  <h3 className="text-[1.8rem] mb-8 font-extrabold tracking-tight">Clinical Registry</h3>
                  <p className="text-slate-500 leading-loose mb-14 text-base">Comprehensive patient charts and medical history storage with 256-bit encryption standards.</p>
                  <a href="#" className="no-underline font-extrabold text-blue-600 text-[0.85rem] uppercase tracking-wider">Explore Module →</a>
              </div>
              <div className="p-16 lg:p-20 bg-slate-900 text-white rounded-[40px] transition-all hover:translate-y-[-10px]">
                  <div className="flex justify-between items-center mb-16">
                      <div className="text-blue-600"><ShieldIcon /></div>
                      <span className="font-black text-[0.9rem] opacity-20 tracking-[2px]">02</span>
                  </div>
                  <h3 className="text-[1.8rem] mb-8 font-extrabold tracking-tight text-white">Resource Chain</h3>
                  <p className="text-white/40 leading-loose mb-14 text-base">Advanced pharmaceutical inventory and surgical equipment tracking with automated procurement.</p>
                  <a href="#" className="no-underline font-extrabold text-blue-600 text-[0.85rem] uppercase tracking-wider">Explore Module →</a>
              </div>
              <div className="p-16 lg:p-20 bg-slate-50 rounded-[40px] transition-all hover:translate-y-[-10px]">
                  <div className="flex justify-between items-center mb-16">
                      <div className="text-blue-600"><ShieldIcon /></div>
                      <span className="font-black text-[0.9rem] opacity-20 tracking-[2px]">03</span>
                  </div>
                  <h3 className="text-[1.8rem] mb-8 font-extrabold tracking-tight">Financial Ledger</h3>
                  <p className="text-slate-500 leading-loose mb-14 text-base">Transparent institutional revenue tracking and insurance claims processing automation.</p>
                  <a href="#" className="no-underline font-extrabold text-blue-600 text-[0.85rem] uppercase tracking-wider">Explore Module →</a>
              </div>
          </div>
      </section>

      <footer className="max-w-[1400px] mx-auto px-8 py-[120px] pb-[60px] border-t border-slate-100">
          <div className="flex flex-col lg:flex-row justify-between mb-20 gap-16 lg:gap-0">
              <div className="flex items-center gap-4 text-xl font-extrabold text-slate-900 tracking-tight">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                  <span>MEDICARE+</span>
              </div>
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-32">
                  <div className="flex flex-col">
                      <h4 className="text-[0.85rem] uppercase tracking-[2px] text-slate-900 mb-8 font-bold">Platform</h4>
                      <a href="#" className="block no-underline text-slate-500 font-semibold mb-4 text-[0.9rem] hover:text-blue-600">Security Protocol</a>
                      <a href="#" className="block no-underline text-slate-500 font-semibold mb-4 text-[0.9rem] hover:text-blue-600">API Documentation</a>
                  </div>
                  <div className="flex flex-col">
                      <h4 className="text-[0.85rem] uppercase tracking-[2px] text-slate-900 mb-8 font-bold">Support</h4>
                      <a href="#" className="block no-underline text-slate-500 font-semibold mb-4 text-[0.9rem] hover:text-blue-600">Emergency Desk</a>
                      <a href="#" className="block no-underline text-slate-500 font-semibold mb-4 text-[0.9rem] hover:text-blue-600">Client Governance</a>
                  </div>
              </div>
          </div>
          <div className="border-t border-slate-100 pt-10 text-center text-slate-400 text-[0.75rem] font-extrabold tracking-[2px]">
              <span>©2026 MediCare Platforms. Institutional ERP.</span>
          </div>
      </footer>
    </div>
  );
}

export default Home;
