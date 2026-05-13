import { useEffect, useMemo, useState } from "react";
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
  X,
  Save,
  Info,
  CheckCircle,
  TriangleAlert,
  RotateCcw,
  MoreHorizontal,
} from "lucide-react";

import { categories as initialCategories } from "../data/categories";

const iconMap = {
  Awareness: Info,
  Response: CheckCircle,
  Damage: TriangleAlert,
  Recovery: RotateCcw,
  Other: MoreHorizontal,
};

function restoreCategoryIcons(list) {
  return list.map((category) => ({
    ...category,
    icon: iconMap[category.name] || Tags,
  }));
}

function colorStyle(color) {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };

  return styles[color] || "bg-slate-100 text-slate-600";
}

function dotStyle(color) {
  const styles = {
    Blue: "bg-blue-600",
    Green: "bg-green-600",
    Orange: "bg-orange-500",
    Purple: "bg-purple-600",
    Red: "bg-red-500",
  };

  return styles[color] || "bg-slate-400";
}

function Categories() {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");

    return savedCategories
      ? restoreCategoryIcons(JSON.parse(savedCategories))
      : initialCategories;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Category Types");
  const [selectedUsage, setSelectedUsage] = useState("All Usage Levels");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    colour: "Blue",
    type: "Informational",
    entries: "0",
    date: "13 May 2026",
    color: "blue",
    icon: Tags,
  });

  const rowsPerPage = 5;

  useEffect(() => {
    const categoriesToSave = categories.map(
      ({ icon, ...category }) => category,
    );

    localStorage.setItem("categories", JSON.stringify(categoriesToSave));
  }, [categories]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchMatch =
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        category.type.toLowerCase().includes(searchQuery.toLowerCase());

      const typeMatch =
        selectedType === "All Category Types" || category.type === selectedType;

      const entriesNumber = Number(String(category.entries).replace(/,/g, ""));

      const usageMatch =
        selectedUsage === "All Usage Levels" ||
        (selectedUsage === "High Usage" && entriesNumber >= 1500) ||
        (selectedUsage === "Medium Usage" &&
          entriesNumber >= 800 &&
          entriesNumber < 1500) ||
        (selectedUsage === "Low Usage" && entriesNumber < 800);

      return searchMatch && typeMatch && usageMatch;
    });
  }, [categories, searchQuery, selectedType, selectedUsage]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / rowsPerPage),
  );

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const totalEntries = categories.reduce(
    (sum, category) => sum + Number(String(category.entries).replace(/,/g, "")),
    0,
  );

  const mostUsedCategory = [...categories].sort(
    (a, b) =>
      Number(String(b.entries).replace(/,/g, "")) -
      Number(String(a.entries).replace(/,/g, "")),
  )[0];

  function openCreateModal() {
    setEditingCategory(null);

    setFormData({
      name: "",
      description: "",
      colour: "Blue",
      type: "Informational",
      entries: "0",
      date: "13 May 2026",
      color: "blue",
      icon: Tags,
    });

    setShowModal(true);
  }

  function openEditModal(category) {
    setEditingCategory(category.name);
    setFormData(category);
    setShowModal(true);
  }

  function handleColourChange(colour) {
    const colourMap = {
      Blue: "blue",
      Green: "green",
      Orange: "orange",
      Purple: "purple",
      Red: "red",
    };

    setFormData({
      ...formData,
      colour,
      color: colourMap[colour],
    });
  }

  function saveCategory() {
    if (!formData.name.trim()) return;

    const categoryToSave = {
      ...formData,
      icon: iconMap[formData.name] || Tags,
    };

    if (editingCategory) {
      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category.name === editingCategory ? categoryToSave : category,
        ),
      );
    } else {
      setCategories((currentCategories) => [
        ...currentCategories,
        categoryToSave,
      ]);
    }

    setShowModal(false);
  }

  function deleteCategory(categoryName) {
    setCategories((currentCategories) =>
      currentCategories.filter((category) => category.name !== categoryName),
    );
  }

  function resetFilters() {
    setSearchQuery("");
    setSelectedType("All Category Types");
    setSelectedUsage("All Usage Levels");
    setCurrentPage(1);
  }

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

        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white rounded-xl px-6 py-4 flex items-center gap-2 font-semibold shadow-sm hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Create Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
        {[
          {
            icon: Tags,
            value: categories.length,
            label: "Total Categories",
            bg: "bg-blue-100",
            color: "text-blue-600",
          },
          {
            icon: Database,
            value: totalEntries.toLocaleString(),
            label: "Total Categorised Entries",
            bg: "bg-green-100",
            color: "text-green-600",
          },
          {
            icon: TrendingUp,
            value: mostUsedCategory?.name || "None",
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
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                className="outline-none w-full text-sm"
                placeholder="Search categories..."
              />
            </div>

            <select
              value={selectedType}
              onChange={(event) => {
                setSelectedType(event.target.value);
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
            >
              <option>All Category Types</option>
              <option>Informational</option>
              <option>Operational</option>
              <option>Impact</option>
              <option>Recovery</option>
              <option>General</option>
            </select>

            <select
              value={selectedUsage}
              onChange={(event) => {
                setSelectedUsage(event.target.value);
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none"
            >
              <option>All Usage Levels</option>
              <option>High Usage</option>
              <option>Medium Usage</option>
              <option>Low Usage</option>
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
                {paginatedCategories.length > 0 ? (
                  paginatedCategories.map((category) => (
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
                          <button
                            onClick={() => openEditModal(category)}
                            className="h-9 w-9 rounded-lg border border-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-50"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            onClick={() => deleteCategory(category.name)}
                            className="h-9 w-9 rounded-lg border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-8 text-center text-slate-500"
                    >
                      No categories match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-5 py-5 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <p className="text-sm text-slate-500">
                  Showing {paginatedCategories.length} of{" "}
                  {filteredCategories.length} categories
                </p>

                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 font-semibold hover:underline"
                >
                  Reset Filters
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={currentPage === 1}
                  className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`h-9 w-9 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-slate-50 text-slate-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="h-9 w-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 disabled:opacity-40"
                >
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
              main={mostUsedCategory?.name || "None"}
              sub={`${mostUsedCategory?.entries || 0} entries`}
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
              main={Math.min(categories.length, 12)}
              sub={`Out of ${categories.length} total`}
            />

            <button className="w-full mt-4 bg-blue-50 text-blue-600 rounded-xl py-4 font-semibold flex items-center justify-center gap-2 hover:bg-blue-100 transition">
              View Detailed Analytics
              <ChevronRight size={18} />
            </button>
          </div>
        </aside>
      </div>

      {showModal && (
        <CategoryModal
          formData={formData}
          setFormData={setFormData}
          onClose={() => setShowModal(false)}
          onSave={saveCategory}
          onColourChange={handleColourChange}
          editingCategory={editingCategory}
        />
      )}
    </section>
  );
}

function CategoryModal({
  formData,
  setFormData,
  onClose,
  onSave,
  onColourChange,
  editingCategory,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-2xl p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {editingCategory ? "Edit Category" : "Create Category"}
          </h2>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-5">
          <FormInput
            label="Category Name"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            placeholder="e.g. Awareness"
          />

          <FormInput
            label="Description"
            value={formData.description}
            onChange={(event) =>
              setFormData({ ...formData, description: event.target.value })
            }
            placeholder="Brief category description"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormSelect
              label="Colour"
              value={formData.colour}
              onChange={(event) => onColourChange(event.target.value)}
              options={["Blue", "Green", "Orange", "Purple", "Red"]}
            />

            <FormSelect
              label="Type"
              value={formData.type}
              onChange={(event) =>
                setFormData({ ...formData, type: event.target.value })
              }
              options={[
                "Informational",
                "Operational",
                "Impact",
                "Recovery",
                "General",
              ]}
            />

            <FormInput
              label="Entries"
              value={formData.entries}
              onChange={(event) =>
                setFormData({ ...formData, entries: event.target.value })
              }
              placeholder="0"
            />
          </div>

          <button
            onClick={onSave}
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <Save size={18} />
            Save Category
          </button>
        </div>
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

function FormSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
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
