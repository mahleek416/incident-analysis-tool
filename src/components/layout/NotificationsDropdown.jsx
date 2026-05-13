import {
  ChevronRight,
  Flame,
  FileText,
  Tags,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const defaultNotifications = [
  {
    id: 1,
    icon: Flame,
    title: "London Fire Incident updated",
    message: "Incident status changed to Under Investigation.",
    time: "10 min ago",
    read: false,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },

  {
    id: 2,
    icon: FileText,
    title: "New data entry added",
    message: "15 new records added to Flood Event.",
    time: "25 min ago",
    read: false,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },

  {
    id: 3,
    icon: Tags,
    title: "Category updated",
    message: "Recovery category was modified.",
    time: "1 hour ago",
    read: true,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");

    if (savedNotifications) {
      return JSON.parse(savedNotifications).map((notification) => ({
        ...notification,
        icon:
          notification.iconName === "Flame"
            ? Flame
            : notification.iconName === "FileText"
              ? FileText
              : notification.iconName === "Tags"
                ? Tags
                : notification.iconName === "CheckCircle"
                  ? CheckCircle
                  : notification.iconName === "AlertTriangle"
                    ? AlertTriangle
                    : Info,
      }));
    }

    return defaultNotifications;
  });

  useEffect(() => {
    const notificationsToSave = notifications.map((notification) => ({
      ...notification,
      icon: undefined,
      iconName: notification.icon.name,
    }));

    localStorage.setItem("notifications", JSON.stringify(notificationsToSave));
  }, [notifications]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  function markAllAsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  }

  return (
    <div className="absolute right-0 top-16 w-96 bg-white border border-slate-100 rounded-2xl shadow-xl p-5 z-50">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">Notifications</h3>

          <p className="text-sm text-slate-500">
            {unreadCount} unread notification
            {unreadCount === 1 ? "" : "s"}
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="text-blue-600 text-sm font-semibold"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-4 p-3 rounded-xl transition cursor-pointer ${
              item.read ? "bg-white" : "bg-blue-50/40"
            }`}
          >
            <div
              className={`h-11 w-11 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}
            >
              <item.icon size={22} className={item.color} />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-sm">{item.title}</p>

                {!item.read && (
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600 mt-1 shrink-0"></span>
                )}
              </div>

              <p className="text-sm text-slate-500 mt-1">{item.message}</p>

              <p className="text-xs text-slate-400 mt-2">{item.time}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/notifications"
        className="w-full mt-4 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50 transition flex items-center justify-center gap-2"
      >
        View all notifications
        <ChevronRight size={18} />
      </Link>
    </div>
  );
}

export default NotificationsDropdown;
