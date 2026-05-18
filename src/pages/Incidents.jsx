import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  CircleDot,
  Plus,
  Eye,
  Pencil,
  Trash2,
  BarChart3,
  Clock,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Save,
  Flame,
  Waves,
  Sun,
  Users,
  Zap,
} from "lucide-react";

import { incidents as initialIncidents } from "../data/incidents";
const iconMap = {
  1: Flame,
  2: Waves,
  3: Sun,
  4: Users,
  5: Zap,
};

function restoreIncidentIcons(list) {
  return list.map((incident) => ({
    ...incident,
    icon: iconMap[incident.id] || ClipboardList,
  }));
}

function getStatusStyle(status) {
  if (status === "Active") return "bg-blue-50 text-blue-600";
  if (status === "Under Investigation") return "bg-orange-50 text-orange-600";
  return "bg-green-50 text-green-600";
}

function getCategoryStyle(color) {
  const styles = {
    red: "bg-red-50 text-red-500",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return styles[color] || "bg-slate-100 text-slate-600";
}

function Incidents() {
  const [incidentList, setIncidentList] = useState(() => {
    const savedIncidents = localStorage.getItem("incidents");

    return savedIncidents
      ? restoreIncidentIcons(JSON.parse(savedIncidents))
      : initialIncidents;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "",
    date: "",
    status: "Active",
    entries: "",
    color: "blue",
  });
  useEffect(() => {
    const incidentsToSave = incidentList.map(
      ({ icon, ...incident }) => incident,
    );

    localStorage.setItem("incidents", JSON.stringify(incidentsToSave));
  }, [incidentList]);

  const filteredIncidents = incidentList.filter((incident) => {
    const matchesSearch =
      incident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All Statuses" || incident.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All Categories" ||
      incident.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalIncidents = incidentList.length;
  const activeIncidents = incidentList.filter(
    (incident) => incident.status === "Active",
  ).length;
  const underInvestigation = incidentList.filter(
    (incident) => incident.status === "Under Investigation",
  ).length;
  const resolvedIncidents = incidentList.filter(
    (incident) => incident.status === "Resolved",
  ).length;

  const categoryOptions = [
    "All Categories",
    ...new Set(incidentList.map((incident) => incident.category)),
  ];

  function resetForm() {
    setFormData({
      name: "",
      location: "",
      category: "",
      date: "",
      status: "Active",
      entries: "",
      color: "blue",
    });
  }

  function handleCreateClick() {
    resetForm();
    setEditingIncident(null);
    setShowCreateModal(true);
  }

  function handleEditClick(incident) {
    setFormData({
      name: incident.name,
      location: incident.location,
      category: incident.category,
      date: incident.date,
      status: incident.status,
      entries: incident.entries,
      color: incident.color,
    });
    setEditingIncident(incident);
    setShowCreateModal(true);
  }

  function handleDelete(name) {
    setIncidentList((currentIncidents) =>
      currentIncidents.filter((incident) => incident.name !== name),
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newIncident = {
      ...formData,
      entries: Number(formData.entries),
      icon: ClipboardList,
    };

    if (editingIncident) {
      setIncidentList((currentIncidents) =>
        currentIncidents.map((incident) =>
          incident.name === editingIncident.name
            ? { ...incident, ...newIncident, icon: incident.icon }
            : incident,
        ),
      );
    } else {
      setIncidentList((currentIncidents) => [...currentIncidents, newIncident]);
    }

    setShowCreateModal(false);
    setEditingIncident(null);
    resetForm();
  }

  return (
    <section className="p-8">
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-3xl font-bold">Incident Management</h1>
          <p className="text-slate-500 mt-2">
            Create, monitor, and manage all recorded incidents in one place.
          </p>
        </div>

        <button
          onClick={handleCreateClick}
          className="bg-blue-600 text-white rounded-xl px-6 py-4 flex items-center gap-2 font-semibold shadow-sm hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Create Incident
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
        {[
          {
            icon: ClipboardList,
            number: totalIncidents,
            label: "Total Incidents",
            bg: "bg-blue-100",
            color: "text-blue-600",
          },
          {
            icon: AlertTriangle,
            number: activeIncidents,
            label: "Active Incidents",
            bg: "bg-orange-100",
            color: "text-orange-500",
          },
          {
            icon: CircleDot,
            number: underInvestigation,
            label: "Under Investigation",
            bg: "bg-purple-100",
            color: "text-purple-600",
          },
          {
            icon: CheckCircle,
            number: resolvedIncidents,
            label: "Resolved Incidents",
            bg: "bg-green-100",
            color: "text-green-600",
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
              <h3 className="text-4xl font-extrabold">{card.number}</h3>
              <p className="text-slate-500 mt-1">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-5">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
            <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <Search size={20} className="text-slate-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="outline-none w-full text-sm"
                placeholder="Search by incident name or location..."
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Under Investigation</option>
              <option>Resolved</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
            >
              {categoryOptions.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center mb-5">
            <p className="text-sm text-slate-500">
              Showing {filteredIncidents.length} of {incidentList.length}{" "}
              incidents
            </p>

            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All Statuses");
                setCategoryFilter("All Categories");
              }}
              className="text-sm text-blue-600 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="text-left px-5 py-5">Incident Name</th>
                  <th className="text-left px-5 py-5">Location</th>
                  <th className="text-left px-5 py-5">Category</th>
                  <th className="text-left px-5 py-5">Date Reported</th>
                  <th className="text-left px-5 py-5">Status</th>
                  <th className="text-left px-5 py-5">Data Entries</th>
                  <th className="text-left px-5 py-5">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredIncidents.map((incident, index) => (
                  <tr
                    key={incident.name}
                    className="border-t border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-11 w-11 rounded-xl ${getCategoryStyle(
                            incident.color,
                          )} flex items-center justify-center`}
                        >
                          <incident.icon size={22} />
                        </div>
                        <span className="font-semibold">{incident.name}</span>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-slate-500">
                      {incident.location}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${getCategoryStyle(
                          incident.color,
                        )}`}
                      >
                        {incident.category}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-slate-500">
                      {incident.date}
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusStyle(
                          incident.status,
                        )}`}
                      >
                        {incident.status}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-slate-600">
                      {incident.entries}
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-4">
                        <Link to={`/incidents/${incident.id}`}>
                          <Eye
                            size={18}
                            className="text-blue-600 cursor-pointer"
                          />
                        </Link>

                        <button onClick={() => handleEditClick(incident)}>
                          <Pencil
                            size={18}
                            className="text-blue-600 cursor-pointer"
                          />
                        </button>

                        <button onClick={() => handleDelete(incident.name)}>
                          <Trash2
                            size={18}
                            className="text-red-500 cursor-pointer"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredIncidents.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-8 text-center text-slate-500"
                    >
                      No incidents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-5 py-5 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Showing {filteredIncidents.length} of {incidentList.length}{" "}
                results
              </p>

              <div className="flex items-center gap-2">
                <button className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                  <ChevronLeft size={18} />
                </button>

                <button className="h-9 w-9 rounded-lg bg-blue-600 text-white">
                  1
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
            Incident Insights
          </h3>

          <div className="space-y-4">
            <InsightCard
              icon={CircleDot}
              bg="bg-purple-100"
              color="text-purple-600"
              title="Most Common Category"
              main="Fire Emergency"
              sub="456 incidents"
            />

            <InsightCard
              icon={BarChart3}
              bg="bg-green-100"
              color="text-green-600"
              title="Highest Data Entries"
              main="Heatwave 2024"
              sub="905 data entries"
            />

            <InsightCard
              icon={Clock}
              bg="bg-blue-100"
              color="text-blue-600"
              title="Recently Updated"
              main="London Fire Incident"
              sub="10 minutes ago"
            />

            <button className="w-full mt-4 bg-blue-50 text-blue-600 rounded-xl py-4 font-semibold flex items-center justify-center gap-2">
              View All Insights
              <ChevronRight size={18} />
            </button>
          </div>
        </aside>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl p-7"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingIncident ? "Edit Incident" : "Create Incident"}
              </h2>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="h-10 w-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={22} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Incident Name"
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
                required
              />

              <FormInput
                label="Location"
                value={formData.location}
                onChange={(event) =>
                  setFormData({ ...formData, location: event.target.value })
                }
                required
              />

              <FormInput
                label="Category"
                value={formData.category}
                onChange={(event) =>
                  setFormData({ ...formData, category: event.target.value })
                }
                required
              />

              <FormInput
                label="Date Reported"
                value={formData.date}
                onChange={(event) =>
                  setFormData({ ...formData, date: event.target.value })
                }
                placeholder="e.g. 08 Jan 2026"
                required
              />

              <FormInput
                label="Data Entries"
                type="number"
                value={formData.entries}
                onChange={(event) =>
                  setFormData({ ...formData, entries: event.target.value })
                }
                required
              />

              <label>
                <p className="text-sm font-medium text-slate-700 mb-2">
                  Status
                </p>
                <select
                  value={formData.status}
                  onChange={(event) =>
                    setFormData({ ...formData, status: event.target.value })
                  }
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>Active</option>
                  <option>Under Investigation</option>
                  <option>Resolved</option>
                </select>
              </label>

              <label className="md:col-span-2">
                <p className="text-sm font-medium text-slate-700 mb-2">
                  Colour
                </p>
                <select
                  value={formData.color}
                  onChange={(event) =>
                    setFormData({ ...formData, color: event.target.value })
                  }
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="blue">Blue</option>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                </select>
              </label>
            </div>

            <button className="w-full mt-6 bg-blue-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-blue-700">
              <Save size={18} />
              {editingIncident ? "Save Changes" : "Save Incident"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

function FormInput({ label, ...props }) {
  return (
    <label>
      <p className="text-sm font-medium text-slate-700 mb-2">{label}</p>
      <input
        {...props}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
      />
    </label>
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
        <h4 className={`font-bold mt-1 ${color}`}>{main}</h4>
        <p className="text-sm text-slate-500 mt-1">{sub}</p>
      </div>
    </div>
  );
}

export default Incidents;
