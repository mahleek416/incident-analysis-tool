import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { incidents as initialIncidents } from "../data/incidents";
import { dataEntries } from "../data/dataEntries";

import {
  ClipboardList,
  Database,
  AlertTriangle,
  Plus,
  List,
  ChevronRight,
  X,
  Save,
  Tags,
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

function Dashboard() {
  const navigate = useNavigate();

  const [incidentList, setIncidentList] = useState(() => {
    const savedIncidents = localStorage.getItem("incidents");
    return savedIncidents ? JSON.parse(savedIncidents) : initialIncidents;
  });

  const [selectedIncident, setSelectedIncident] = useState("All Incidents");
  const [selectedRange, setSelectedRange] = useState("Last 6 Months");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showCreateIncidentModal, setShowCreateIncidentModal] = useState(false);
  const [showAddDataModal, setShowAddDataModal] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState("1");

  const [newIncident, setNewIncident] = useState({
    name: "",
    location: "",
    category: "",
    date: "",
    status: "Active",
    entries: "",
    color: "blue",
  });

  useEffect(() => {
    const plainIncidents = incidentList.map(
      ({ icon, ...incident }) => incident,
    );
    localStorage.setItem("incidents", JSON.stringify(plainIncidents));
  }, [incidentList]);

  const totalIncidents = incidentList.length;
  const totalEntries = incidentList.reduce(
    (sum, incident) => sum + Number(incident.entries || 0),
    0,
  );
  const activeIncidents = incidentList.filter(
    (incident) => incident.status === "Active",
  ).length;
  const totalCategories = new Set(
    incidentList.map((incident) => incident.category),
  ).size;

  const stats = [
    {
      label: "Total Incidents",
      value: totalIncidents,
      icon: ClipboardList,
      bg: "bg-blue-100",
      color: "text-blue-600",
      change: "Live",
    },
    {
      label: "Total Data Entries",
      value: totalEntries,
      icon: Database,
      bg: "bg-green-100",
      color: "text-green-600",
      change: "Live",
    },
    {
      label: "Total Categories",
      value: totalCategories,
      icon: Tags,
      bg: "bg-purple-100",
      color: "text-purple-600",
      change: "Live",
    },
    {
      label: "Active Incidents",
      value: activeIncidents,
      icon: AlertTriangle,
      bg: "bg-orange-100",
      color: "text-orange-600",
      change: "Live",
    },
  ];

  const lineData = useMemo(() => {
    const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];

    if (selectedIncident === "All Incidents") {
      return months.map((month, index) => ({
        month,
        entries: Math.round(totalEntries * (0.45 + index * 0.1)),
      }));
    }

    const incident = incidentList.find(
      (item) => item.name === selectedIncident,
    );
    const entries = Number(incident?.entries || 0);

    return months.map((month, index) => ({
      month,
      entries: Math.round(entries * (0.35 + index * 0.12)),
    }));
  }, [selectedIncident, incidentList, totalEntries]);

  const barData = useMemo(() => {
    const categoryCounts = {};

    dataEntries.forEach((entry) => {
      categoryCounts[entry.category] =
        (categoryCounts[entry.category] || 0) + 1;
    });

    if (selectedCategory !== "All Categories") {
      return [
        {
          name: selectedCategory,
          value: categoryCounts[selectedCategory] || 0,
        },
      ];
    }

    return Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [selectedCategory]);

  function handleCreateIncident(event) {
    event.preventDefault();

    const incidentToAdd = {
      id: Date.now(),
      ...newIncident,
      entries: Number(newIncident.entries || 0),
    };

    setIncidentList((current) => [...current, incidentToAdd]);
    setShowCreateIncidentModal(false);

    setNewIncident({
      name: "",
      location: "",
      category: "",
      date: "",
      status: "Active",
      entries: "",
      color: "blue",
    });
  }

  return (
    <>
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
                <span className="text-slate-500">from current data</span>
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
            {incidentList.map((incident) => (
              <option key={incident.id}>{incident.name}</option>
            ))}
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
                <LineChart data={lineData}>
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
                <option>Other</option>
              </select>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
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
          <form onSubmit={handleCreateIncident} className="space-y-5">
            <FormInput
              label="Incident Name"
              value={newIncident.name}
              onChange={(e) =>
                setNewIncident({ ...newIncident, name: e.target.value })
              }
              required
            />

            <FormInput
              label="Location"
              value={newIncident.location}
              onChange={(e) =>
                setNewIncident({ ...newIncident, location: e.target.value })
              }
              required
            />

            <FormInput
              label="Category"
              value={newIncident.category}
              onChange={(e) =>
                setNewIncident({ ...newIncident, category: e.target.value })
              }
              required
            />

            <FormInput
              label="Date Reported"
              placeholder="e.g. 08 Jan 2026"
              value={newIncident.date}
              onChange={(e) =>
                setNewIncident({ ...newIncident, date: e.target.value })
              }
              required
            />

            <FormInput
              label="Data Entries"
              type="number"
              value={newIncident.entries}
              onChange={(e) =>
                setNewIncident({ ...newIncident, entries: e.target.value })
              }
              required
            />

            <button className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2">
              <Save size={18} />
              Save Incident
            </button>
          </form>
        </Modal>
      )}

      {showAddDataModal && (
        <Modal
          title="Add Data Entry"
          onClose={() => setShowAddDataModal(false)}
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Incident
            </label>

            <select
              value={selectedIncidentId}
              onChange={(e) => setSelectedIncidentId(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            >
              {incidentList.map((incident) => (
                <option key={incident.id} value={incident.id}>
                  {incident.name}
                </option>
              ))}
            </select>
          </div>

          <FormTextarea
            label="Description"
            placeholder="Enter incident-related post, report, or observation..."
          />

          <FormInput label="Source" placeholder="e.g. Twitter, News Outlet" />

          <FormInput label="Location" placeholder="e.g. Woolwich Station" />

          <button
            onClick={() => {
              setShowAddDataModal(false);
              navigate(`/incidents/${selectedIncidentId}`);
            }}
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <Save size={18} />
            Save Data Entry
          </button>
        </Modal>
      )}
    </>
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

        <div>{children}</div>
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
