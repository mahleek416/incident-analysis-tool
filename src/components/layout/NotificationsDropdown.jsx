import { ChevronRight, Flame, FileText, Tags } from "lucide-react";

function NotificationsDropdown() {
  const notifications = [
    {
      icon: Flame,
      title: "London Fire Incident updated",
      time: "10 min ago",
    },
    {
      icon: FileText,
      title: "New data entry added",
      time: "25 min ago",
    },
    {
      icon: Tags,
      title: "Category updated",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="absolute right-0 top-16 w-96 bg-white border border-slate-100 rounded-2xl shadow-xl p-5 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Notifications</h3>

        <button className="text-blue-600 text-sm font-semibold">
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition cursor-pointer"
          >
            <div className="h-11 w-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <item.icon size={22} className="text-blue-600" />
            </div>

            <div className="flex-1">
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-slate-500 mt-1">{item.time}</p>
            </div>

            <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50 transition flex items-center justify-center gap-2">
        View all notifications
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default NotificationsDropdown;
