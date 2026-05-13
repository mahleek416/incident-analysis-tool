import { Bell, Lock, Palette, Save, ShieldCheck, User } from "lucide-react";

function Settings() {
  return (
    <section className="p-8">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-slate-500 mt-2">
          Configure your account preferences and system settings.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <SettingsCard icon={User} title="Profile Preferences" />
          <SettingsCard icon={Bell} title="Notification Preferences" />
          <SettingsCard icon={Lock} title="Password & Security" />
          <SettingsCard icon={Palette} title="Appearance" />
          <SettingsCard icon={ShieldCheck} title="Privacy & Access" />
        </div>

        <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700">
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </section>
  );
}

function SettingsCard({ icon: Icon, title }) {
  return (
    <div className="border border-slate-100 rounded-2xl p-5">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Icon size={26} />
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>

      <select className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none">
        <option>Enabled</option>
        <option>Disabled</option>
      </select>
    </div>
  );
}

export default Settings;
