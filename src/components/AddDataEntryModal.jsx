import {
  X,
  Calendar,
  Link as LinkIcon,
  AlertTriangle,
  Save,
} from "lucide-react";

function AddDataEntryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-7">
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

        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="1. Incident" required>
              <select className="input-style">
                <option>London Fire Incident</option>
              </select>
            </Field>

            <Field label="2. Description / Post Text" required>
              <textarea
                rows="5"
                className="input-style resize-none"
                placeholder="Enter the incident-related post, report, or observation..."
              />
              <p className="text-xs text-slate-400 text-right mt-1">0 / 2000</p>
            </Field>

            <Field label="3. Source / Platform" required>
              <select className="input-style">
                <option>Twitter</option>
                <option>Official Report</option>
                <option>News Outlet</option>
                <option>Manual Entry</option>
                <option>Interview Note</option>
                <option>Other</option>
              </select>
            </Field>

            <Field label="4. Date & Time" required>
              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-4 top-3.5 text-slate-400"
                />
                <input
                  className="input-style pl-11"
                  defaultValue="08 Jan 2026, 14:25"
                />
              </div>
            </Field>

            <Field label="5. Location" required>
              <input
                className="input-style"
                placeholder="e.g. Woolwich Station, London"
              />
            </Field>

            <Field label="6. Category" required>
              <select className="input-style">
                <option>Awareness</option>
                <option>Response</option>
                <option>Damage</option>
                <option>Recovery</option>
                <option>Other</option>
              </select>
            </Field>
          </div>

          <Field label="7. Source URL" optional>
            <div className="relative">
              <LinkIcon
                size={18}
                className="absolute left-4 top-3.5 text-slate-400"
              />
              <input
                className="input-style pl-11"
                placeholder="Paste original source link if available"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Optional: helps researchers trace data back to its original
              source.
            </p>
          </Field>

          <Field label="8. Notes" optional>
            <textarea
              rows="3"
              className="input-style resize-none"
              placeholder="Add any additional research notes..."
            />
            <p className="text-xs text-slate-400 text-right mt-1">0 / 500</p>
          </Field>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3">
            <span className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-3 rounded-xl text-sm font-medium">
              <AlertTriangle size={17} />
              Manual Review Required
            </span>

            <div className="flex items-center gap-3 justify-end">
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
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, required, optional, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
        {optional && <span className="text-slate-400"> (Optional)</span>}
      </label>
      {children}
    </div>
  );
}

export default AddDataEntryModal;
