import { useState } from "react";
import { Menu, Search, Bell, ChevronRight } from "lucide-react";

import NotificationsDropdown from "./NotificationsDropdown";
import ProfileDropdown from "./ProfileDropdown";

const defaultSearchItems = [
  "London Fire Incident",
  "River Thames Flood",
  "Heatwave 2024",
  "Awareness Category",
  "Response Category",
  "Damage Category",
  "Heavy smoke seen near Woolwich station",
  "Police evacuation announced",
];

function Header({ title, sidebarOpen, setSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = defaultSearchItems.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <div className="flex items-center gap-8">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="h-11 w-11 rounded-xl flex items-center justify-center hover:bg-slate-100 transition"
        >
          <Menu size={30} className="text-slate-700" />
        </button>

        <h2 className="text-3xl font-bold">{title}</h2>
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
            {searchResults.length > 0 ? (
              <>
                <p className="text-sm font-semibold text-slate-600 mb-3">
                  Search Results
                </p>

                {searchResults.map((item) => (
                  <div
                    key={item}
                    className="px-3 py-3 rounded-xl hover:bg-blue-50 cursor-pointer text-sm"
                  >
                    {item}
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm text-slate-500 px-3 py-3">
                No results found.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-5 relative">
        <div className="relative">
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

          {showNotifications && <NotificationsDropdown />}
        </div>

        <div className="relative">
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
                Onifade Abdulmaliq
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

          {showProfile && <ProfileDropdown />}
        </div>
      </div>
    </header>
  );
}

export default Header;
