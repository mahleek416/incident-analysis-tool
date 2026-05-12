import {
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
  FileText,
  FileText as ReportIcon,
  RefreshCcw,
  Lock,
  CheckCircle,
  Tags,
  Download,
  ShieldCheck,
} from "lucide-react";

import { previewRows, exportStats, exportOptions } from "../data/export";

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
  return (
    <section className="p-8">
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-3xl font-bold">Export Incident Data</h1>

          <p className="text-slate-500 mt-2">
            Select incident records, categories, and date ranges to export data
            for further analysis.
          </p>
        </div>

        <button className="bg-blue-600 text-white rounded-xl px-6 py-4 flex items-center gap-2 font-semibold shadow-sm hover:bg-blue-700 transition">
          <Download size={20} />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
        {exportStats.map((card) => {
          const Icon = {
            Database,
            ClipboardCheck,
            Tags,
            CalendarDays,
          }[card.icon];

          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-6"
            >
              <div
                className={`h-16 w-16 rounded-2xl ${card.bg} flex items-center justify-center`}
              >
                <Icon className={card.color} size={32} />
              </div>

              <div>
                <h3 className={`text-3xl font-extrabold ${card.color}`}>
                  {card.value}
                </h3>

                <p className="text-slate-500 mt-1">{card.label}</p>
              </div>
            </div>
          );
        })}
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
              {exportOptions.map((item) => (
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

                      <td className="px-5 py-4 text-slate-600">{row.date}</td>
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
                Your data is secure and will only be exported in the selected
                format.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
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
