import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Tags,
  Download,
  HelpCircle,
  Menu,
  Search,
  Bell,
  ClipboardList,
  Database,
  AlertTriangle,
  Plus,
  List,
  ChevronRight,
  ShieldCheck,
  User,
  Settings,
  LogOut,
  Flame,
  X,
  Save,
} from "lucide-react";

import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const allLineData = {
  "All Incidents": [
    { month: "Dec", entries: 620 },
    { month: "Jan", entries: 810 },
    { month: "Feb", entries: 680 },
    { month: "Mar", entries: 910 },
    { month: "Apr", entries: 1100 },
    { month: "May", entries: 950 },
  ],
  "London Fire": [
    { month: "Dec", entries: 120 },
    { month: "Jan", entries: 342 },
    { month: "Feb", entries: 210 },
    { month: "Mar", entries: 300 },
    { month: "Apr", entries: 410 },
    { month: "May", entries: 380 },
  ],
  "Flood Event": [
    { month: "Dec", entries: 80 },
    { month: "Jan", entries: 218 },
    { month: "Feb", entries: 260 },
    { month: "Mar", entries: 190 },
    { month: "Apr", entries: 240 },
    { month: "May", entries: 310 },
  ],
  "Heatwave 2024": [
    { month: "Dec", entries: 240 },
    { month: "Jan", entries: 300 },
    { month: "Feb", entries: 420 },
    { month: "Mar", entries: 600 },
    { month: "Apr", entries: 780 },
    { month: "May", entries: 905 },
  ],
};

const barDataByCategory = {
  "All Categories": [
    { name: "Awareness", value: 2450 },
    { name: "Response", value: 1980 },
    { name: "Damage", value: 1320 },
    { name: "Recovery", value: 980 },
    { name: "Other", value: 420 },
  ],
  Awareness: [{ name: "Awareness", value: 2450 }],
  Response: [{ name: "Response", value: 1980 }],
  Damage: [{ name: "Damage", value: 1320 }],
  Recovery: [{ name: "Recovery", value: 980 }],
};

const stats = [
  {
    label: "Total Incidents",
    value: "1,248",
    icon: ClipboardList,
    bg: "bg-blue-100",
    color: "text-blue-600",
    change: "↗ 12.5%",
  },
  {
    label: "Total Data Entries",
    value: "8,532",
    icon: Database,
    bg: "bg-green-100",
    color: "text-green-600",
    change: "↗ 18.3%",
  },
  {
    label: "Total Categories",
    value: "24",
    icon: Tags,
    bg: "bg-purple-100",
    color: "text-purple-600",
    change: "↗ 9.1%",
  },
  {
    label: "Active Incidents",
    value: "156",
    icon: AlertTriangle,
    bg: "bg-orange-100",
    color: "text-orange-600",
    change: "↘ 4.7%",
  },
];

const activities = [
  {
    title: "London Fire Incident updated",
    text: "Incident status changed to “Under Investigation”.",
    tag: "Response",
    time: "10 min ago",
  },
  {
    title: "Flood Event — Data added",
    text: "15 new data entries were added to the dataset.",
    tag: "Awareness",
    time: "25 min ago",
  },
  {
    title: "Cyclone Remal — Damage reported",
    text: "Structural damage data has been recorded.",
    tag: "Damage",
    time: "1 hour ago",
  },
  {
    title: "Heatwave 2024 — Category updated",
    text: "Category changed to “Climate-Related”.",
    tag: "Awareness",
    time: "2 hours ago",
  },
];

const searchItems = [
  "London Fire Incident",
  "River Thames Flood",
  "Heatwave 2024",
  "Awareness Category",
  "Response Category",
  "Damage Category",
  "Heavy smoke seen near Woolwich station",
  "Police evacuation announced",
];

function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIncident, setSelectedIncident] = useState("All Incidents");
  const [selectedRange, setSelectedRange] = useState("Last 6 Months");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showCreateIncidentModal, setShowCreateIncidentModal] = useState(false);
  const [showAddDataModal, setShowAddDataModal] = useState(false);

  const filteredSearchResults = searchItems.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const currentLineData = allLineData[selectedIncident];
  const currentBarData = barDataByCategory[selectedCategory];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
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
              <NavLink
                to={path}
                key={label}
                end={path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-4 rounded-xl cursor-pointer transition ${
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

            <h2 className="text-3xl font-bold">Dashboard</h2>
          </div>

          <div className="relative hidden md:flex items-center gap-3 w-[460px] border border-slate-200 rounded-xl px-4 py-3 bg-white">
            <Search size={22} className="text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none w-full text-sm"
              placeholder="Search incidents, categories, data entries..."
            />

            {searchQuery && (
              <div className="absolute top-14 left-0 w-full bg-white border border-slate-100 rounded-2xl shadow-xl p-4 z-50">
                <p className="text-sm font-semibold text-slate-600 mb-3">
                  Search Results
                </p>

                {filteredSearchResults.length > 0 ? (
                  filteredSearchResults.map((item) => (
                    <div
                      key={item}
                      className="px-3 py-3 rounded-xl hover:bg-blue-50 cursor-pointer text-sm"
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 px-3 py-3">
                    No results found.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-5 relative">
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
              <div className="absolute right-[270px] top-16 w-96 bg-white border border-slate-100 rounded-2xl shadow-xl p-5 z-50">
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
                  <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-50">
                    <User size={20} />
                    My Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-50">
                    <Settings size={20} />
                    Account Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-50">
                    <Bell size={20} />
                    Notifications
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 font-semibold">
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        <section className="p-8 space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`h-16 w-16 rounded-2xl ${item.bg} flex items-center justify-center`}
                  >
                    <item.icon className={item.color} size={32} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-extrabold">{item.value}</h3>
                    <p className="text-slate-600 mt-1">{item.label}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-7 text-sm">
                  <span className={`${item.color} font-semibold`}>
                    {item.change}
                  </span>
                  <span className="text-slate-500">vs last month</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center gap-4">
            <label className="text-sm font-medium text-slate-700">
              Filter by Incident:
            </label>
            <select
              value={selectedIncident}
              onChange={(e) => setSelectedIncident(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm min-w-[230px] outline-none"
            >
              <option>All Incidents</option>
              <option>London Fire</option>
              <option>Flood Event</option>
              <option>Heatwave 2024</option>
            </select>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">
                  Incident Data Entries Over Time
                </h3>
                <select
                  value={selectedRange}
                  onChange={(e) => setSelectedRange(e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none"
                >
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                  <option>This Month</option>
                </select>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentLineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="entries"
                      stroke="none"
                      fill="#dbeafe"
                    />
                    <Line
                      type="monotone"
                      dataKey="entries"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">
                  Incident Data Distribution by Category
                </h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none"
                >
                  <option>All Categories</option>
                  <option>Awareness</option>
                  <option>Response</option>
                  <option>Damage</option>
                  <option>Recovery</option>
                </select>
              </div>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentBarData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Recent Incident Activity</h3>
                <button
                  onClick={() => setShowActivityModal(true)}
                  className="text-blue-600 text-sm font-semibold border border-blue-100 rounded-lg px-4 py-2"
                >
                  View All
                </button>
              </div>

              <ActivityList items={activities.slice(0, 4)} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="font-bold text-lg mb-5">Quick Actions</h3>

              <div className="space-y-4">
                <QuickAction
                  title="Create Incident"
                  desc="Add a new incident to the system."
                  icon={Plus}
                  bg="bg-blue-50"
                  circle="bg-blue-600"
                  onClick={() => setShowCreateIncidentModal(true)}
                />

                <QuickAction
                  title="Add Data"
                  desc="Add new data entry for analysis."
                  icon={Database}
                  bg="bg-green-50"
                  circle="bg-green-600"
                  onClick={() => setShowAddDataModal(true)}
                />

                <QuickAction
                  title="View All Incidents"
                  desc="Browse and manage all recorded incidents."
                  icon={List}
                  bg="bg-purple-50"
                  circle="bg-purple-600"
                  onClick={() => navigate("/incidents")}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {showActivityModal && (
        <Modal
          title="All Recent Activity"
          onClose={() => setShowActivityModal(false)}
        >
          <ActivityList items={activities} />
        </Modal>
      )}

      {showCreateIncidentModal && (
        <Modal
          title="Create Incident"
          onClose={() => setShowCreateIncidentModal(false)}
        >
          <FormInput
            label="Incident Name"
            placeholder="e.g. London Fire Incident"
          />
          <FormInput label="Location" placeholder="e.g. Woolwich, London" />
          <FormInput label="Category" placeholder="e.g. Fire Emergency" />
          <button className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2">
            <Save size={18} />
            Save Incident
          </button>
        </Modal>
      )}

      {showAddDataModal && (
        <Modal
          title="Add Data Entry"
          onClose={() => setShowAddDataModal(false)}
        >
          <FormInput label="Incident" value="London Fire Incident" readOnly />
          <FormTextarea
            label="Description"
            placeholder="Enter incident-related post, report, or observation..."
          />
          <FormInput label="Source" placeholder="e.g. Twitter, News Outlet" />
          <FormInput label="Location" placeholder="e.g. Woolwich Station" />
          <button className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2">
            <Save size={18} />
            Save Data Entry
          </button>
        </Modal>
      )}
    </div>
  );
}

function ActivityList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-start justify-between border-b border-dashed border-slate-200 pb-4"
        >
          <div className="flex gap-4">
            <div className="h-11 w-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <ClipboardList className="text-blue-600" size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold">
                  {item.tag}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">{item.text}</p>
            </div>
          </div>
          <span className="text-sm text-slate-500 whitespace-nowrap">
            {item.time}
          </span>
        </div>
      ))}
    </div>
  );
}

function QuickAction({ title, desc, icon: Icon, bg, circle, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full ${bg} border border-slate-100 rounded-2xl p-5 flex items-center justify-between hover:scale-[1.01] transition`}
    >
      <div className="flex items-center gap-5">
        <div
          className={`h-16 w-16 rounded-full ${circle} text-white flex items-center justify-center`}
        >
          <Icon size={30} />
        </div>
        <div className="text-left">
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="text-sm text-slate-500 mt-1">{desc}</p>
        </div>
      </div>
      <ChevronRight className="text-slate-600" />
    </button>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-5">{children}</div>
      </div>
    </div>
  );
}

function FormInput({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
      />
    </div>
  );
}

function FormTextarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <textarea
        {...props}
        rows="4"
        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-blue-500"
      />
    </div>
  );
}

export default Dashboard;
