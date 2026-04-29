import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Tags,
  Download,
  HelpCircle,
  Menu,
  Search,
  Bell,
  ShieldCheck,
  Database,
  ClipboardCheck,
  CalendarDays,
  Settings,
  FileJson,
  FileSpreadsheet,
  CheckSquare,
  Eye,
  MessageCircle,
  Newspaper,
  FileText as ReportIcon,
  RefreshCcw,
  Lock,
  CheckCircle,
  User,
  LogOut,
  Flame,
  ChevronRight,
} from "lucide-react";

const previewRows = [
  {
    description: "Heavy smoke seen near Woolwich station",
    category: "Awareness",
    source: "Twitter",
    location: "Woolwich Station",
    date: "08 Jan 2026, 14:10",
  },
  {
    description: "Police evacuation announced",
    category: "Response",
    source: "Official Report",
    location: "Woolwich High St",
    date: "08 Jan 2026, 14:25",
  },
  {
    description: "Fire spreading to nearby buildings",
    category: "Damage",
    source: "News Outlet",
    location: "Woolwich Market",
    date: "08 Jan 2026, 15:00",
  },
  {
    description: "Fire under control",
    category: "Response",
    source: "News Outlet",
    location: "Woolwich Market",
    date: "08 Jan 2026, 16:45",
  },
];

function badgeStyle(category) {
  if (category === "Awareness") return "bg-blue-50 text-blue-600";
  if (category === "Response") return "bg-green-50 text-green-600";
  if (category === "Damage") return "bg-orange-50 text-orange-600";
  return "bg-slate-100 text-slate-600";
}

function sourceIcon(source) {
  if (source === "Twitter") {
    return <MessageCircle size={18} className="text-blue-500" />;
  }

  if (source === "Official Report") {
    return <ReportIcon size={18} className="text-slate-500" />;
  }

  return <Newspaper size={18} className="text-slate-500" />;
}

function Export() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
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
            {[
              [LayoutDashboard, "Dashboard", "/"],
              [FileText, "Incidents", "/incidents"],
              [Tags, "Categories", "/categories"],
              [Download, "Export", "/export"],
            ].map(([Icon, label, path]) => (
              <Link
                to={path}
                key={label}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition ${
                  location.pathname === path
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon size={23} />
                <span>{label}</span>
              </Link>
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

      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-11 w-11 rounded-xl flex items-center justify-center hover:bg-slate-100 transition"
            >
              <Menu size={30} className="text-slate-700" />
            </button>

            <h2 className="text-3xl font-bold">Export</h2>
          </div>

          <div className="hidden lg:flex items-center gap-3 w-[520px] border border-slate-200 rounded-xl px-4 py-3 bg-white">
            <Search size={22} className="text-slate-400" />
            <input
              className="outline-none w-full text-sm"
              placeholder="Search incidents, categories, or data records..."
            />
          </div>

          <div className="flex items-center gap-5 relative">
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className="relative h-12 w-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
              >
                <Bell size={24} className="text-slate-700" />
                <span className="absolute top-3 right-3 h-3 w-3 bg-blue-600 rounded-full border-2 border-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-16 w-96 bg-white border border-slate-100 rounded-2xl shadow-xl p-5 z-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Notifications</h3>
                    <button className="text-blue-600 text-sm font-semibold">
                      Mark all as read
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        icon: Flame,
                        title: "London Fire Incident updated",
                        time: "10 min ago",
                      },
                      {
                        icon: FileText,
                        title: "New data entry added",
                        time: "25 min ago",
                      },
                      {
                        icon: Tags,
                        title: "Category updated",
                        time: "1 hour ago",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                      >
                        <div className="h-11 w-11 rounded-xl bg-blue-50 flex items-center justify-center">
                          <item.icon size={22} className="text-blue-600" />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.title}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {item.time}
                          </p>
                        </div>

                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50 transition flex items-center justify-center gap-2">
                    View all notifications
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-3 border border-slate-200 rounded-xl px-3 py-2 hover:bg-slate-50 transition min-w-[250px]"
              >
                <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  AR
                </div>

                <div className="hidden md:block text-left">
                  <p className="font-semibold whitespace-nowrap">
                    Alex Researcher
                  </p>
                  <p className="text-sm text-slate-500">Researcher</p>
                </div>

                <ChevronRight
                  size={18}
                  className={`text-slate-500 transition ml-auto ${
                    showProfile ? "rotate-90" : ""
                  }`}
                />
              </button>

              {showProfile && (
                <div className="absolute right-0 top-16 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl p-5 z-50">
                  <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                    <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                      AR
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">Alex Researcher</h3>
                      <p className="text-slate-500 text-sm">Researcher</p>
                    </div>
                  </div>

                  <div className="py-3 space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-50 transition">
                      <User size={20} />
                      My Profile
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-50 transition">
                      <Settings size={20} />
                      Account Settings
                    </button>

                    <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-50 transition">
                      <Bell size={20} />
                      Notifications
                    </button>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition font-semibold">
                      <LogOut size={20} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <section className="p-8">
          <div className="flex items-start justify-between mb-7">
            <div>
              <h1 className="text-3xl font-bold">Export Incident Data</h1>
              <p className="text-slate-500 mt-2">
                Select incident records, categories, and date ranges to export
                data for further analysis.
              </p>
            </div>

            <button className="bg-blue-600 text-white rounded-xl px-6 py-4 flex items-center gap-2 font-semibold shadow-sm hover:bg-blue-700 transition">
              <Download size={20} />
              Export CSV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
            {[
              {
                icon: Database,
                value: "8,532",
                label: "Total Exportable Records",
                bg: "bg-blue-100",
                color: "text-blue-600",
              },
              {
                icon: ClipboardCheck,
                value: "342",
                label: "Selected Records",
                bg: "bg-green-100",
                color: "text-green-600",
              },
              {
                icon: Tags,
                value: "24",
                label: "Available Categories",
                bg: "bg-purple-100",
                color: "text-purple-600",
              },
              {
                icon: CalendarDays,
                value: "08 Jan 2026",
                label: "Last Export",
                bg: "bg-orange-100",
                color: "text-orange-600",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-6"
              >
                <div
                  className={`h-16 w-16 rounded-2xl ${card.bg} flex items-center justify-center`}
                >
                  <card.icon className={card.color} size={32} />
                </div>

                <div>
                  <h3 className={`text-3xl font-extrabold ${card.color}`}>
                    {card.value}
                  </h3>
                  <p className="text-slate-500 mt-1">{card.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <Settings size={22} />
                  Export Configuration
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <Field label="Select Incident">
                    <select className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none">
                      <option>London Fire Incident</option>
                    </select>
                  </Field>

                  <Field label="Select Category">
                    <select className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none">
                      <option>All Categories</option>
                    </select>
                  </Field>

                  <Field label="Source">
                    <select className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none">
                      <option>All Sources</option>
                    </select>
                  </Field>

                  <Field label="Date Range">
                    <select className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none">
                      <option>Last 30 Days</option>
                    </select>
                  </Field>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium text-slate-700 mb-3">
                    File Format
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormatOption active icon={FileText} label="CSV" />
                    <FormatOption icon={FileJson} label="JSON" />
                    <FormatOption icon={FileSpreadsheet} label="Excel" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {[
                    "Include incident metadata",
                    "Include category labels",
                    "Include source information",
                    "Include timestamps",
                    "Include location data",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-700"
                    >
                      <span className="h-5 w-5 rounded bg-blue-600 text-white flex items-center justify-center">
                        <CheckSquare size={15} />
                      </span>
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Eye size={22} className="text-blue-600" />
                      Export Preview
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Preview of the first 4 records from your export
                    </p>
                  </div>

                  <span className="bg-blue-50 text-slate-600 px-4 py-2 rounded-full text-sm">
                    Showing 4 of 342 records
                  </span>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
                  <table className="w-full min-w-[850px] text-sm">
                    <thead className="bg-slate-50 text-slate-700">
                      <tr>
                        <th className="text-left px-5 py-4">Description</th>
                        <th className="text-left px-5 py-4">Category</th>
                        <th className="text-left px-5 py-4">Source</th>
                        <th className="text-left px-5 py-4">Location</th>
                        <th className="text-left px-5 py-4">Date & Time</th>
                      </tr>
                    </thead>

                    <tbody>
                      {previewRows.map((row) => (
                        <tr
                          key={row.description}
                          className="border-t border-slate-100 hover:bg-slate-50"
                        >
                          <td className="px-5 py-4 font-medium">
                            {row.description}
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`px-3 py-1 rounded-lg text-xs font-semibold ${badgeStyle(
                                row.category,
                              )}`}
                            >
                              {row.category}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            <div className="flex items-center gap-2">
                              {sourceIcon(row.source)}
                              {row.source}
                            </div>
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {row.location}
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {row.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <aside className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <ClipboardCheck size={22} />
                Export Summary
              </h3>

              <div className="space-y-4">
                <SummaryCard
                  icon={ShieldCheck}
                  bg="bg-blue-100"
                  color="text-blue-600"
                  title="Selected Incident"
                  main="London Fire Incident"
                />

                <SummaryCard
                  icon={Database}
                  bg="bg-green-100"
                  color="text-green-600"
                  title="Selected Records"
                  main="342"
                  sub="out of 8,532 total"
                />

                <SummaryCard
                  icon={FileText}
                  bg="bg-purple-100"
                  color="text-purple-600"
                  title="File Format"
                  main="CSV"
                  sub="Comma Separated Values"
                />

                <SummaryCard
                  icon={FileSpreadsheet}
                  bg="bg-red-100"
                  color="text-red-600"
                  title="Estimated File Size"
                  main="128 KB"
                  sub="Approximate size"
                />

                <SummaryCard
                  icon={CheckCircle}
                  bg="bg-green-100"
                  color="text-green-600"
                  title="Ready to Export"
                  main="Yes"
                  sub="All systems ready"
                />

                <button className="w-full bg-blue-600 text-white rounded-xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                  <Download size={18} />
                  Export CSV
                </button>

                <button className="w-full border border-slate-200 text-slate-700 rounded-xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 transition">
                  <RefreshCcw size={18} />
                  Reset Filters
                </button>

                <div className="bg-blue-50 text-blue-700 rounded-xl p-4 text-sm flex gap-3">
                  <Lock size={18} />
                  <p>
                    Your data is secure and will only be exported in the
                    selected format.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label>
      <p className="text-sm font-medium text-slate-700 mb-2">{label}</p>
      {children}
    </label>
  );
}

function FormatOption({ icon: Icon, label, active }) {
  return (
    <button
      className={`rounded-xl border px-4 py-4 flex items-center gap-3 text-left ${
        active
          ? "border-blue-600 bg-blue-50 text-blue-600"
          : "border-slate-200 text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full border flex items-center justify-center ${
          active ? "border-blue-600" : "border-slate-300"
        }`}
      >
        {active && <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
      </span>
      <Icon size={21} />
      <span className="font-medium">{label}</span>
    </button>
  );
}

function SummaryCard({ icon: Icon, bg, color, title, main, sub }) {
  return (
    <div className="flex gap-4 items-center">
      <div
        className={`h-14 w-14 rounded-2xl ${bg} ${color} flex items-center justify-center shrink-0`}
      >
        <Icon size={26} />
      </div>

      <div>
        <p className="text-sm text-slate-600">{title}</p>
        <h4 className={`font-bold text-lg ${color}`}>{main}</h4>
        {sub && <p className="text-sm text-slate-500">{sub}</p>}
      </div>
    </div>
  );
}

export default Export;
