import {
  MapPin,
  Calendar,
  Database,
  Pencil,
  Trash2,
  Table2,
  Map,
  Clock,
  BarChart3,
  MessageCircle,
  FileText as ReportIcon,
  Newspaper,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Link as LinkIcon,
  AlertTriangle,
  Save,
  Play,
  Pause,
  RotateCcw,
  Search,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { incidents } from "../data/incidents";
import { dataEntries } from "../data/dataEntries";

function badgeStyle(category) {
  if (category === "Awareness") return "bg-blue-50 text-blue-600";
  if (category === "Response") return "bg-green-50 text-green-600";
  if (category === "Damage") return "bg-orange-50 text-orange-600";
  return "bg-slate-100 text-slate-600";
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

function getStatusStyle(status) {
  if (status === "Active") return "bg-blue-50 text-blue-600";
  if (status === "Under Investigation") return "bg-orange-50 text-orange-600";
  return "bg-green-50 text-green-600";
}

function markerColor(category) {
  if (category === "Awareness") return "#2563eb";
  if (category === "Response") return "#16a34a";
  if (category === "Damage") return "#f97316";
  return "#64748b";
}

function createMarkerIcon(category, isCurrentEvent) {
  const size = isCurrentEvent ? 28 : 22;
  const color = markerColor(category);

  return L.divIcon({
    className: "custom-incident-marker",
    html: `<div style="
      width:${size}px;
      height:${size}px;
      background:${color};
      border:4px solid white;
      border-radius:9999px;
      box-shadow:0 10px 25px rgba(15,23,42,0.25);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function sourceIcon(source) {
  if (source === "Twitter") {
    return <MessageCircle size={18} className="text-blue-500" />;
  }

  if (source === "Official Report") {
    return <ReportIcon size={18} className="text-slate-500" />;
  }

  if (source === "News Outlet") {
    return <Newspaper size={18} className="text-slate-500" />;
  }

  return <Megaphone size={18} className="text-slate-500" />;
}

function IncidentDetails() {
  const { id } = useParams();

  const incident = incidents.find((item) => item.id === Number(id));

  const [activeTab, setActiveTab] = useState("Data");
  const [showAddDataModal, setShowAddDataModal] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const sortedEvents = useMemo(() => {
    return [...dataEntries].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, []);

  const playbackEvents = useMemo(() => {
    if (selectedCategory === "All Categories") return sortedEvents;
    return sortedEvents.filter((event) => event.category === selectedCategory);
  }, [selectedCategory, sortedEvents]);

  const visibleEvents = playbackEvents.slice(0, currentIndex + 1);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const timer = setInterval(() => {
      setCurrentIndex((previousIndex) => {
        const lastIndex = playbackEvents.length - 1;

        if (previousIndex >= lastIndex) {
          setIsPlaying(false);
          return previousIndex;
        }

        return previousIndex + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, playbackEvents.length]);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
  }, [selectedCategory]);

  function handlePlay() {
    if (playbackEvents.length === 0) return;
    setIsPlaying(true);
  }

  function handlePause() {
    setIsPlaying(false);
  }

  function handleReset() {
    setIsPlaying(false);
    setCurrentIndex(0);
  }

  if (!incident) {
    return (
      <section className="p-8">
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-8">
          <h1 className="text-3xl font-bold">Incident Not Found</h1>
          <p className="text-slate-500 mt-2">
            The incident you are looking for does not exist.
          </p>
        </div>
      </section>
    );
  }

  const IncidentIcon = incident.icon;

  return (
    <section className="p-8 space-y-6">
      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        <div className="flex gap-6">
          <div
            className={`h-20 w-20 rounded-2xl ${getCategoryStyle(
              incident.color,
            )} flex items-center justify-center`}
          >
            <IncidentIcon size={42} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{incident.name}</h1>

            <div className="flex items-center gap-2 text-slate-500 mt-2">
              <MapPin size={19} />
              <span>{incident.location}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-5">
              <InfoBlock label="Category">
                <span
                  className={`${getCategoryStyle(
                    incident.color,
                  )} px-3 py-1 rounded-lg text-sm font-semibold`}
                >
                  {incident.category}
                </span>
              </InfoBlock>

              <InfoBlock label="Status">
                <span
                  className={`${getStatusStyle(
                    incident.status,
                  )} px-3 py-1 rounded-lg text-sm font-semibold`}
                >
                  {incident.status}
                </span>
              </InfoBlock>

              <InfoBlock label="Date Reported">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar size={18} /> {incident.date}
                </div>
              </InfoBlock>

              <InfoBlock label="Total Data Entries">
                <div className="flex items-center gap-2 text-slate-600">
                  <Database size={18} /> {incident.entries}
                </div>
              </InfoBlock>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddDataModal(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Data
          </button>

          <button className="border border-blue-200 text-blue-600 px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-50">
            <Pencil size={18} />
            Edit Incident
          </button>

          <button className="border border-red-200 text-red-600 px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-red-50">
            <Trash2 size={18} />
            Delete Incident
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl overflow-hidden">
          <div className="flex border-b border-slate-200">
            {[
              [Table2, "Data"],
              [Map, "Map"],
              [Clock, "Timeline"],
            ].map(([Icon, tab]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-7 py-5 flex items-center gap-3 font-semibold border-b-2 ${
                  activeTab === tab
                    ? "text-blue-600 border-blue-600"
                    : "text-slate-600 border-transparent hover:bg-slate-50"
                }`}
              >
                <Icon size={20} />
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "Data" && <DataTab />}

          {activeTab === "Map" && (
            <MapTab
              visibleEvents={visibleEvents}
              currentEvent={playbackEvents[currentIndex]}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}

          {activeTab === "Timeline" && (
            <TimelineTab
              visibleEvents={visibleEvents}
              currentIndex={currentIndex}
              isPlaying={isPlaying}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onPlay={handlePlay}
              onPause={handlePause}
              onReset={handleReset}
            />
          )}
        </div>

        <aside className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
            <BarChart3 size={22} />
            Insights
          </h3>

          <InsightCard
            icon={BarChart3}
            bg="bg-purple-100"
            color="text-purple-600"
            title="Most Frequent Category"
            main="Response"
            sub="42%"
          />

          <InsightCard
            icon={Clock}
            bg="bg-green-100"
            color="text-green-600"
            title="First Reported"
            main="14:10"
            sub={incident.date}
          />

          <InsightCard
            icon={Clock}
            bg="bg-blue-100"
            color="text-blue-600"
            title="Latest Update"
            main="16:45"
            sub={incident.date}
          />

          <InsightCard
            icon={Database}
            bg="bg-orange-100"
            color="text-orange-600"
            title="Total Data Entries"
            main={incident.entries}
            sub="Across 5 Categories"
          />
        </aside>
      </div>

      <AddDataEntryModal
        isOpen={showAddDataModal}
        onClose={() => setShowAddDataModal(false)}
        incident={incident}
      />
    </section>
  );
}

function InfoBlock({ label, children }) {
  return (
    <div className="border-r border-slate-200 pr-6 last:border-r-0">
      <p className="text-sm text-slate-500 mb-2">{label}</p>
      {children}
    </div>
  );
}

function DataTab() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <Search size={20} className="text-slate-400" />
          <input
            className="outline-none w-full text-sm"
            placeholder="Search data entries..."
          />
        </div>

        <select className="border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none">
          <option>All Categories</option>
        </select>

        <select className="border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none">
          <option>All Sources</option>
        </select>

        <select className="border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none md:col-start-4">
          <option>All Dates</option>
        </select>
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
            {dataEntries.map((entry) => (
              <tr key={entry.description} className="border-t border-slate-100">
                <td className="px-5 py-4 font-medium">{entry.description}</td>

                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${badgeStyle(
                      entry.category,
                    )}`}
                  >
                    {entry.category}
                  </span>
                </td>

                <td className="px-5 py-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    {sourceIcon(entry.source)}
                    {entry.source}
                  </div>
                </td>

                <td className="px-5 py-4 text-slate-600">{entry.location}</td>
                <td className="px-5 py-4 text-slate-600">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="text-sm text-slate-500">Showing 1 to 7 of 7 entries</p>

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
  );
}

function ResetMapButton() {
  const map = useMap();

  function handleResetView() {
    map.setView([51.4899, 0.0698], 14);
  }

  return (
    <button
      type="button"
      onClick={handleResetView}
      className="absolute top-4 right-4 z-[500] bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm font-semibold shadow-sm hover:bg-slate-50 transition"
    >
      Reset View
    </button>
  );
}

function FollowCurrentEvent({ currentEvent }) {
  const map = useMap();

  useEffect(() => {
    if (!currentEvent) return;

    map.flyTo([currentEvent.latitude, currentEvent.longitude], 15, {
      animate: true,
      duration: 1.2,
    });
  }, [currentEvent, map]);

  return null;
}

function MapTab({
  visibleEvents,
  currentEvent,
  selectedCategory,
  setSelectedCategory,
}) {
  const woolwichCenter = [51.4899, 0.0698];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4 gap-4">
        <p className="text-sm text-slate-500">
          Showing {visibleEvents.length} event marker
          {visibleEvents.length === 1 ? "" : "s"} from timeline playback
        </p>

        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none bg-white"
        >
          <option>All Categories</option>
          <option>Awareness</option>
          <option>Response</option>
          <option>Damage</option>
        </select>
      </div>

      <div className="relative h-[520px] rounded-2xl border border-slate-200 overflow-hidden">
        <MapContainer
          center={woolwichCenter}
          zoom={14}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ResetMapButton />
          <FollowCurrentEvent currentEvent={currentEvent} />

          {visibleEvents.map((event, index) => {
            const isCurrentEvent =
              currentEvent?.description === event.description;

            return (
              <Marker
                key={`${event.description}-${index}`}
                position={[event.latitude, event.longitude]}
                icon={createMarkerIcon(event.category, isCurrentEvent)}
              >
                <Popup>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900">
                      {event.description}
                    </h4>

                    <p>
                      <strong>Category:</strong> {event.category}
                    </p>

                    <p>
                      <strong>Location:</strong> {event.location}
                    </p>

                    <p>
                      <strong>Time:</strong> {event.date.split(", ")[1]}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {visibleEvents.length === 0 && (
          <div className="absolute inset-0 z-[500] flex items-center justify-center pointer-events-none">
            <p className="bg-white border border-slate-100 shadow-sm rounded-xl px-5 py-3 text-slate-500">
              Press Play in the Timeline tab to reveal event markers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineTab({
  visibleEvents,
  currentIndex,
  isPlaying,
  selectedCategory,
  setSelectedCategory,
  onPlay,
  onPause,
  onReset,
}) {
  const currentEvent = visibleEvents[currentIndex];

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold">Timeline Playback</h3>

          <p className="text-sm text-slate-500 mt-1">
            Play the incident timeline to reveal events and map markers over
            time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none bg-white"
          >
            <option>All Categories</option>
            <option>Awareness</option>
            <option>Response</option>
            <option>Damage</option>
          </select>

          <button
            onClick={onPlay}
            disabled={isPlaying}
            className="bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={18} />
            Play
          </button>

          <button
            onClick={onPause}
            disabled={!isPlaying}
            className="border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pause size={18} />
            Pause
          </button>

          <button
            onClick={onReset}
            className="border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-50"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>
      </div>

      <div className="relative border-l-2 border-blue-100 ml-6 space-y-8">
        {visibleEvents.map((event) => {
          const isCurrentEvent =
            currentEvent?.description === event.description;

          return (
            <div key={event.description} className="relative pl-8">
              <div
                className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full ring-4 ${
                  isCurrentEvent
                    ? "bg-blue-600 ring-blue-100 animate-pulse"
                    : "bg-slate-300 ring-slate-50"
                }`}
              />

              <div
                className={`bg-white border shadow-sm rounded-2xl p-5 transition ${
                  isCurrentEvent
                    ? "border-blue-200 ring-2 ring-blue-50"
                    : "border-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-blue-600">
                    {event.date.split(", ")[1]}
                  </h4>

                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${badgeStyle(
                      event.category,
                    )}`}
                  >
                    {event.category}
                  </span>
                </div>

                <p className="text-slate-700 mt-2">{event.description}</p>

                <p className="text-sm text-slate-500 mt-2 flex items-center gap-2">
                  <MapPin size={16} />
                  {event.location}
                </p>
              </div>
            </div>
          );
        })}

        {visibleEvents.length === 0 && (
          <div className="relative pl-8">
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 text-slate-500">
              No events to display for this category.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AddDataEntryModal({ isOpen, onClose, incident }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-7">
        <div className="flex items-start justify-between mb-7">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Add Data Entry
            </h2>

            <p className="text-slate-500 mt-2">
              Add a new incident-related record for analysis.
            </p>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mb-5">
          <span className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-sm font-medium">
            <AlertTriangle size={17} />
            Manual Review Required
          </span>
        </div>

        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Incident">
              <input
                readOnly
                value={incident.name}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none text-slate-700"
              />
            </Field>

            <Field label="Source / Platform">
              <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500">
                <option>Twitter</option>
                <option>Official Report</option>
                <option>News Outlet</option>
                <option>Manual Entry</option>
                <option>Interview Note</option>
                <option>Other</option>
              </select>
            </Field>

            <div className="md:col-span-2">
              <Field label="Description / Post Text">
                <textarea
                  rows="5"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:border-blue-500"
                  placeholder="Enter the incident-related post, report, or observation..."
                />
              </Field>
            </div>

            <Field label="Date & Time">
              <input
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
                defaultValue={incident.date}
              />
            </Field>

            <Field label="Location">
              <input
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
                defaultValue={incident.location}
              />
            </Field>

            <Field label="Category">
              <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500">
                <option>Awareness</option>
                <option>Response</option>
                <option>Damage</option>
                <option>Recovery</option>
                <option>Other</option>
              </select>
            </Field>

            <Field label="Source URL (Optional)">
              <div className="relative">
                <LinkIcon
                  size={18}
                  className="absolute left-4 top-3.5 text-slate-400"
                />

                <input
                  className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-blue-500"
                  placeholder="Paste original source link if available"
                />
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Optional: helps researchers trace data back to its original
                source.
              </p>
            </Field>

            <div className="md:col-span-2">
              <Field label="Notes (Optional)">
                <textarea
                  rows="3"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:border-blue-500"
                  placeholder="Add any additional research notes..."
                />
              </Field>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-2 hover:bg-blue-700 shadow-sm"
            >
              <Save size={18} />
              Save Data Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      {children}
    </div>
  );
}

function InsightCard({ icon: Icon, bg, color, title, main, sub }) {
  return (
    <div className="border border-slate-100 rounded-2xl p-4 flex gap-4 items-center mb-4">
      <div
        className={`h-16 w-16 rounded-2xl ${bg} ${color} flex items-center justify-center`}
      >
        <Icon size={30} />
      </div>

      <div>
        <p className="text-sm text-slate-600">{title}</p>
        <h4 className={`text-xl font-bold mt-1 ${color}`}>{main}</h4>
        <p className="text-sm text-slate-500 mt-1">{sub}</p>
      </div>
    </div>
  );
}

export default IncidentDetails;
