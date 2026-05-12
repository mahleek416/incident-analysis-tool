import {
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
  Tags,
  Search,
} from "lucide-react";

import { categories } from "../data/categories";

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
  return (
    <section className="p-8">
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-slate-500 mt-2">
            Create, organise, and manage categories used to classify incident
            data entries.
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

                        <span className="font-semibold">{category.name}</span>
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
