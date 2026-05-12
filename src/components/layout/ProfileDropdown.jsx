import { User, Settings, Bell, LogOut } from "lucide-react";

function ProfileDropdown() {
  return (
    <div className="absolute right-0 top-16 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl p-5 z-50">
      <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
        <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
          AR
        </div>

        <div>
          <h3 className="font-bold text-lg">Onifade Abdulmaliq</h3>
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
  );
}

export default ProfileDropdown;
