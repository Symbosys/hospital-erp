import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { HumanCapital } from "../components/humanCapital/HumanCapital";
import { ClinicalInfrastructure } from "../components/ClinicalInfrastructure/ClinicalInfrastructure";
import { SupplyChain } from "../components/SupplyChain/SupplyChain";
import { Operations } from "../components/Operations/Operations";
import { ClinicalSchedule } from "../components/ClinicalInfrastructure/ClinicalSchedule";
import { FrontEndOps } from "../components/FrontEndOps/FrontEndOps";
import { Administration } from "../components/Administration/Administration";

// --- Assets & Icons ---
const GridIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const StaffIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ActivityIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const BillingIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const LogOutIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

// --- Mock Data ---
const PERFORMANCE_DATA = [
  { name: "Mon", patients: 32, revenue: 1200 },
  { name: "Tue", patients: 45, revenue: 1800 },
  { name: "Wed", patients: 28, revenue: 1400 },
  { name: "Thu", patients: 65, revenue: 2400 },
  { name: "Fri", patients: 48, revenue: 1900 },
  { name: "Sat", patients: 38, revenue: 1600 },
  { name: "Sun", patients: 22, revenue: 1100 },
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: "emergency",
    title: "Emergency Admissions",
    desc: "Dr. Pierce requested immediate ICU review for PT-4092.",
    time: "4 mins ago",
    color: "red",
  },
  {
    id: 2,
    type: "task",
    title: "Inventory Low",
    desc: "Insulin stocks in Pharmacy Wing B are below 10%.",
    time: "22 mins ago",
    color: "amber",
  },
  {
    id: 3,
    type: "update",
    title: "System Synchronized",
    desc: "Global patient registry updated with latest lab data.",
    time: "1 hour ago",
    color: "blue",
  },
  {
    id: 4,
    type: "success",
    title: "Revenue Milestone",
    desc: "Daily billing targets exceeded by 15%.",
    time: "3 hours ago",
    color: "emerald",
  },
];

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-inter select-none">
      {/* --- Sidebar Navigation --- */}
      <aside className="w-[300px] bg-white border-r border-slate-200 flex flex-col p-8 z-50 shadow-sm">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary-glow">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20"></path>
              <path d="M22 12H2"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-outfit font-black tracking-tight leading-none text-slate-900">
              MEDCORE
            </h1>
            <span className="text-[0.65rem] font-black tracking-[2px] text-primary uppercase">
              Institutional OS
            </span>
          </div>
        </div>

        {/* Menu Sections */}
        <nav className="flex-1 space-y-8 overflow-y-auto no-scrollbar">
          <div>
            <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
              Executive Dashboard
            </p>
            <div className="space-y-1">
              {[
                { id: "overview", icon: <GridIcon />, label: "Command Center" },
                { id: "reception", icon: <BellIcon />, label: "Front-End Ops" },
                { id: "staff", icon: <StaffIcon />, label: "Human Capital" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-[0.85rem] transition-all group ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-md shadow-primary-glow"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={`${activeTab === tab.id ? "text-white" : "text-slate-400 group-hover:text-primary"} transition-colors`}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
              Clinical Modules
            </p>
            <div className="space-y-1">
              {[
                {
                  id: "operations",
                  icon: <ActivityIcon />,
                  label: "Process & Workflow",
                },
                {
                  id: "patients",
                  icon: <UserIcon />,
                  label: "Patient Registry",
                },
                {
                  id: "infrastructure",
                  icon: <GridIcon />,
                  label: "Infrastructure",
                },
                {
                  id: "activity",
                  icon: <ActivityIcon />,
                  label: "Clinical Schedule",
                },
                {
                  id: "billing",
                  icon: <BillingIcon />,
                  label: "Financial Node",
                },
                {
                  id: "pharmacy",
                  icon: <ActivityIcon />,
                  label: "Pharmacy Hub",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-[0.85rem] transition-all group ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-md shadow-primary-glow"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={`${activeTab === tab.id ? "text-white" : "text-slate-400 group-hover:text-primary"} transition-colors`}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
              Institutional Governance
            </p>
            <div className="space-y-1">
              {[
                {
                  id: "administration",
                  icon: <GridIcon />,
                  label: "Administrative Oversight",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-[0.85rem] transition-all group ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={`${activeTab === tab.id ? "text-white" : "text-slate-400 group-hover:text-primary"} transition-colors`}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer Sidebar */}
        <div className="mt-8 pt-8 border-t border-slate-100">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold text-[0.8rem] hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
          >
            <LogOutIcon />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col h-full bg-[#f8fafc] overflow-y-auto relative no-scrollbar">
        {/* Sticky Header */}
        <header className="h-[90px] glass sticky top-0 z-40 flex items-center justify-between px-10 border-b border-slate-200/60">
          <div className="flex items-center gap-4 bg-white/60 border border-slate-200/50 px-6 py-2.5 rounded-2xl w-[500px] shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <SearchIcon className="text-slate-400" />
            <input
              type="text"
              placeholder="Search patients, medical records, or staff..."
              className="bg-transparent border-none outline-none w-full font-medium text-[0.95rem] text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-primary transition-colors">
              <BellIcon />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-[1px] bg-slate-200 mx-1"></div>
            <div className="flex items-center gap-4 cursor-pointer group">
              <div className="text-right flex flex-col">
                <span className="text-[0.9rem] font-bold text-slate-900 group-hover:text-primary transition-colors">
                  Dr. Alexander Pierce
                </span>
                <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-tighter">
                  Chief Medical Officer
                </span>
              </div>
              <div className="w-[48px] h-[48px] rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-[2px] shadow-lg shadow-primary-glow group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-outfit font-black text-primary text-xl">
                  AP
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard View */}
        <div className="p-10 max-w-[1600px] mx-auto w-full">
          {activeTab === "overview" && (
            <div className="space-y-10 animate-fade">
              {/* Welcome Section */}
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-4xl font-outfit font-extrabold tracking-tight text-slate-900">
                    Institutional{" "}
                    <span className="text-primary italic">Live Feed.</span>
                  </h2>
                  <p className="text-slate-500 font-medium">
                    Real-time clinical throughput and operational health
                    metrics.
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
                    Print Daily Audit
                  </button>
                  <button className="bg-primary text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-primary-glow hover:-translate-y-1 transition-all">
                    Register New Patient
                  </button>
                </div>
              </div>

              {/* Top Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Active Admissions",
                    value: "248",
                    change: "+12.5%",
                    color: "blue",
                    icon: <UserIcon />,
                  },
                  {
                    label: "Total Revenue",
                    value: "₹428.5k",
                    change: "+8.2%",
                    color: "emerald",
                    icon: <BillingIcon />,
                  },
                  {
                    label: "Pending Reports",
                    value: "42",
                    change: "-4.1%",
                    color: "amber",
                    icon: <ActivityIcon />,
                  },
                  {
                    label: "Critical Cases",
                    value: "18",
                    change: "Stable",
                    color: "rose",
                    icon: <StaffIcon />,
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow group cursor-default"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${
                          stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                          stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                          stat.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                          stat.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
                        }`}
                      >
                        {stat.icon}
                      </div>
                      <span
                        className={`text-[0.7rem] font-black px-2.5 py-1 rounded-full ${
                          stat.change.startsWith("+")
                            ? "bg-emerald-50 text-emerald-600"
                            : stat.change.startsWith("-")
                              ? "bg-rose-50 text-rose-600"
                              : "bg-slate-50 text-slate-500"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-slate-500 text-[0.75rem] font-bold uppercase tracking-wider mb-1">
                        {stat.label}
                      </h3>
                      <p className="text-[2rem] font-outfit font-black text-slate-900 leading-none">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts & Pulse Grid */}
              <div className="grid grid-cols-12 gap-8">
                {/* Main Interactive Chart */}
                <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h3 className="text-lg font-outfit font-extrabold text-slate-900">
                        Clinical Performance
                      </h3>
                      <p className="text-sm text-slate-400 font-medium">
                        Weekly patient inflow vs. Diagnostic revenue
                      </p>
                    </div>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2">
                      <button className="px-5 py-2 bg-white rounded-xl shadow-sm font-bold text-[0.75rem] text-slate-800">
                        Revenue
                      </button>
                      <button className="px-5 py-2 hover:bg-white/50 rounded-xl font-bold text-[0.75rem] text-slate-400">
                        Patients
                      </button>
                    </div>
                  </div>

                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={PERFORMANCE_DATA}>
                        <defs>
                          <linearGradient
                            id="colorRevenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#2563eb"
                              stopOpacity={0.15}
                            />
                            <stop
                              offset="95%"
                              stopColor="#2563eb"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#E2E8F0"
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "#94a3b8",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                          dy={15}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{
                            fill: "#94a3b8",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "16px",
                            border: "none",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                            padding: "12px",
                          }}
                          itemStyle={{ fontWeight: 700, fontSize: "0.85rem" }}
                          labelStyle={{
                            fontWeight: 800,
                            marginBottom: "4px",
                            color: "#0f172a",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#2563eb"
                          strokeWidth={4}
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* System Pulse Log */}
                <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[32px] border border-slate-200/60 shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-outfit font-extrabold text-slate-900">
                      System Pulse
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">
                        Live Logs
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar max-h-[420px] pr-2">
                    {NOTIFICATIONS.map((item) => (
                      <div
                        key={item.id}
                        className="group relative flex gap-5 hover:translate-x-1 transition-transform"
                      >
                        <div
                          className={`w-1 shadow-sm rounded-full shrink-0 ${
                            item.color === 'red' ? 'bg-red-500' :
                            item.color === 'amber' ? 'bg-amber-500' :
                            item.color === 'blue' ? 'bg-blue-500' :
                            item.color === 'emerald' ? 'bg-emerald-500' : 'bg-slate-500'
                          }`}
                        ></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-[0.85rem] font-bold text-slate-900 line-clamp-1">
                              {item.title}
                            </h4>
                            <span className="text-[0.6rem] font-bold text-slate-400 whitespace-nowrap">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-[0.8rem] text-slate-500 leading-relaxed line-clamp-2">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-8 py-4 bg-slate-50 rounded-2xl text-slate-400 font-bold text-[0.75rem] uppercase tracking-widest hover:bg-slate-100 hover:text-slate-600 transition-all border border-dashed border-slate-200">
                    View Comprehensive Logs
                  </button>
                </div>
              </div>

              {/* Bottom Quick Access */}
              <div className="bg-gradient-to-r from-primary to-blue-700 p-8 rounded-[32px] shadow-2xl shadow-primary/30 flex items-center justify-between text-white overflow-hidden relative border border-white/10">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl text-white"></div>
                <div className="relative z-10 max-w-2xl">
                  <h3 className="text-2xl font-outfit font-black mb-3 leading-tight">
                    Emergency Protocol Initialized?
                  </h3>
                  <p className="text-white/80 font-medium">
                    Activate full hospital lockdown or emergency alert systems
                    with a single command. Only available for level 1 personnel.
                  </p>
                </div>
                <button className="relative z-10 px-10 py-5 bg-white text-primary font-black rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all">
                  ACTIVATE ALERT
                </button>
              </div>
            </div>
          )}

          {(activeTab === "staff" || activeTab === "patients") && (
            <HumanCapital />
          )}
          {activeTab === "infrastructure" && <ClinicalInfrastructure />}
          {activeTab === "pharmacy" && <SupplyChain />}
          {activeTab === "operations" && <Operations />}
          {activeTab === "activity" && <ClinicalSchedule />}
          {activeTab === "reception" && <FrontEndOps />}
          {activeTab === "administration" && <Administration />}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
