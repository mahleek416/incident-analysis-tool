import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Tags,
  Download,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

function Sidebar({ sidebarOpen }) {
  const navItems = [
    [LayoutDashboard, "Dashboard", "/"],
    [FileText, "Incidents", "/incidents"],
    [Tags, "Categories", "/categories"],
    [Download, "Export", "/export"],
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col justify-between z-40 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        <div className="flex items-center gap-3 px-6 py-7">
          <div className="h-12 w-12 rounded-2xl border-2 border-blue-600 flex items-center justify-center">
            <ShieldCheck className="text-blue-600" size={28} />
          </div>

          <div>
            <h1 className="font-extrabold text-xl tracking-wide leading-5">
              INCIDENT
            </h1>
            <p className="text-blue-600 font-bold text-sm tracking-widest">
              ANALYSIS TOOL
            </p>
          </div>
        </div>

        <nav className="px-4 mt-4 space-y-2">
          {navItems.map(([Icon, label, path]) => (
            <NavLink
              to={path}
              key={label}
              end={path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-4 rounded-xl transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              <Icon size={23} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-6 py-8 border-t border-slate-200">
        <div className="flex items-center gap-4 text-slate-600">
          <HelpCircle size={23} />
          <span>Help & Support</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
