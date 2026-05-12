import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const pageTitles = {
    "/": "Dashboard",
    "/incidents": "Incidents",
    "/categories": "Categories",
    "/export": "Export",
  };

  const title = location.pathname.startsWith("/incidents/")
    ? "Incident Details"
    : pageTitles[location.pathname] || "Dashboard";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <Sidebar sidebarOpen={sidebarOpen} />

      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header
          title={title}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
