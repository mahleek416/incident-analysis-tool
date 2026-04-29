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
  Plus,
  Database,
  TrendingUp,
  AlertCircle,
  Star,
  CalendarDays,
  BarChart3,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle,
  TriangleAlert,
  RotateCcw,
  MoreHorizontal,
  User,
  Settings,
  LogOut,
  Flame,
} from "lucide-react";

const categories = [
  {
    icon: Info,
    name: "Awareness",
    description: "Early public reports and observations",
    colour: "Blue",
    type: "Informational",
    entries: "2,450",
    date: "08 Jan 2026",
    color: "blue",
  },
  {
    icon: CheckCircle,
    name: "Response",
    description: "Emergency response actions and official updates",
    colour: "Green",
    type: "Operational",
    entries: "1,980",
    date: "08 Jan 2026",
    color: "green",
  },
  {
    icon: TriangleAlert,
    name: "Damage",
    description: "Reports describing physical or environmental damage",
    colour: "Orange",
    type: "Impact",
    entries: "1,320",
    date: "08 Jan 2026",
    color: "orange",
  },
  {
    icon: RotateCcw,
    name: "Recovery",
    description: "Updates related to repairs, reopening, and recovery actions",
    colour: "Purple",
    type: "Recovery",
    entries: "980",
    date: "09 Jan 2026",
    color: "purple",
  },
  {
    icon: MoreHorizontal,
    name: "Other",
    description: "Entries that do not fit existing categories",
    colour: "Red",
    type: "General",
    entries: "420",
    date: "09 Jan 2026",
    color: "red",
  },
];

function colorStyle(color) {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };

  return styles[color];
}

function dotStyle(color) {
  const styles = {
    Blue: "bg-blue-600",
    Green: "bg-green-600",
    Orange: "bg-orange-500",
    Purple: "bg-purple-600",
    Red: "bg-red-500",
  };

  return styles[color];
}

function Categories() {
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

            <h2 className="text-3xl font-bold">Categories</h2>
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
              <h1 className="text-3xl font-bold">Category Management</h1>
              <p className="text-slate-500 mt-2">
                Create, organise, and manage categories used to classify
                incident data entries.
              </p>
            </div>

            <button className="bg-blue-600 text-white rounded-xl px-6 py-4 flex items-center gap-2 font-semibold shadow-sm hover:bg-blue-700 transition">
              <Plus size={20} />
              Create Category
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
            {[
              {
                icon: Tags,
                value: "24",
                label: "Total Categories",
                bg: "bg-blue-100",
                color: "text-blue-600",
              },
              {
                icon: Database,
                value: "8,532",
                label: "Total Categorised Entries",
                bg: "bg-green-100",
                color: "text-green-600",
              },
              {
                icon: TrendingUp,
                value: "Response",
                label: "Most Used Category",
                bg: "bg-purple-100",
                color: "text-purple-600",
              },
              {
                icon: AlertCircle,
                value: "186",
                label: "Uncategorized Entries",
                bg: "bg-red-100",
                color: "text-red-600",
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
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
                <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3">
                  <Search size={20} className="text-slate-400" />
                  <input
                    className="outline-none w-full text-sm"
                    placeholder="Search categories..."
                  />
                </div>

                <select className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none">
                  <option>All Category Types</option>
                </select>

                <select className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none">
                  <option>All Usage Levels</option>
                </select>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[980px] text-sm">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="text-left px-5 py-5">Category Name</th>
                      <th className="text-left px-5 py-5">Description</th>
                      <th className="text-left px-5 py-5">Colour</th>
                      <th className="text-left px-5 py-5">Type</th>
                      <th className="text-left px-5 py-5">Data Entries</th>
                      <th className="text-left px-5 py-5">Created Date</th>
                      <th className="text-left px-5 py-5">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories.map((category) => (
                      <tr
                        key={category.name}
                        className="border-t border-slate-100 hover:bg-slate-50 transition"
                      >
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-11 w-11 rounded-xl ${colorStyle(
                                category.color,
                              )} flex items-center justify-center`}
                            >
                              <category.icon size={22} />
                            </div>

                            <span className="font-semibold">
                              {category.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-5 text-slate-600 max-w-[260px]">
                          {category.description}
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2 text-slate-600">
                            <span
                              className={`h-3 w-3 rounded-full ${dotStyle(
                                category.colour,
                              )}`}
                            />
                            {category.colour}
                          </div>
                        </td>

                        <td className="px-5 py-5">
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-semibold ${colorStyle(
                              category.color,
                            )}`}
                          >
                            {category.type}
                          </span>
                        </td>

                        <td className="px-5 py-5 text-slate-700 font-medium">
                          {category.entries}
                        </td>

                        <td className="px-5 py-5 text-slate-500">
                          {category.date}
                        </td>

                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <button className="h-9 w-9 rounded-lg border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-50">
                              <Pencil size={17} />
                            </button>

                            <button className="h-9 w-9 rounded-lg border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-50">
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-between px-5 py-5 border-t border-slate-100">
                  <p className="text-sm text-slate-500">
                    Showing 1 to 5 of 24 categories
                  </p>

                  <div className="flex items-center gap-2">
                    <button className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                      <ChevronLeft size={18} />
                    </button>
                    <button className="h-9 w-9 rounded-lg bg-blue-600 text-white">
                      1
                    </button>
                    <button className="h-9 w-9 rounded-lg bg-slate-50 text-slate-600">
                      2
                    </button>
                    <button className="h-9 w-9 rounded-lg bg-slate-50 text-slate-600">
                      3
                    </button>
                    <button className="h-9 w-9 rounded-lg bg-slate-50 text-slate-600">
                      4
                    </button>
                    <button className="h-9 w-9 rounded-lg bg-slate-50 text-slate-600">
                      5
                    </button>
                    <button className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <BarChart3 size={22} />
                Category Insights
              </h3>

              <div className="space-y-4">
                <InsightCard
                  icon={Star}
                  bg="bg-blue-100"
                  color="text-blue-600"
                  title="Most Used Category"
                  main="Awareness"
                  sub="2,450 entries (28.7%)"
                />

                <InsightCard
                  icon={TrendingUp}
                  bg="bg-green-100"
                  color="text-green-600"
                  title="Fastest Growing Category"
                  main="Response"
                  sub="+18.3% this month"
                />

                <InsightCard
                  icon={AlertCircle}
                  bg="bg-red-100"
                  color="text-red-600"
                  title="Uncategorized Entries"
                  main="186"
                  sub="Needs review"
                />

                <InsightCard
                  icon={CalendarDays}
                  bg="bg-purple-100"
                  color="text-purple-600"
                  title="Categories Used This Month"
                  main="12"
                  sub="Out of 24 total"
                />

                <button className="w-full mt-4 bg-blue-50 text-blue-600 rounded-xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-blue-100 transition">
                  View Detailed Analytics
                  <ChevronRight size={18} />
                </button>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

function InsightCard({ icon: Icon, bg, color, title, main, sub }) {
  return (
    <div className="border border-slate-100 rounded-2xl p-4 flex gap-4 items-center">
      <div
        className={`h-16 w-16 rounded-2xl ${bg} ${color} flex items-center justify-center`}
      >
        <Icon size={30} />
      </div>

      <div>
        <p className="text-sm text-slate-600">{title}</p>
        <h4 className={`font-bold text-lg mt-1 ${color}`}>{main}</h4>
        <p className="text-sm text-slate-500 mt-1">{sub}</p>
      </div>
    </div>
  );
}

export default Categories;
