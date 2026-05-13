import { Bell, AlertTriangle, CheckCircle, Info, Clock } from "lucide-react";

const notifications = [
  {
    icon: AlertTriangle,
    color: "text-orange-600",
    bg: "bg-orange-50",
    title: "New Incident Reported",
    message: "A new fire incident was reported in Central London.",
    time: "5 minutes ago",
  },
  {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Export Completed",
    message: "Your incident export file is ready for download.",
    time: "20 minutes ago",
  },
  {
    icon: Info,
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "System Update",
    message: "New analytics features have been added to the platform.",
    time: "1 hour ago",
  },
];

function Notifications() {
  return (
    <section className="p-8">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-2">
          <Bell size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold">Notifications</h1>
        </div>

        <p className="text-slate-500">
          View recent alerts, updates, and system activity.
        </p>

        <div className="space-y-5 mt-8">
          {notifications.map((notification) => (
            <div
              key={notification.title}
              className="border border-slate-100 rounded-2xl p-5 flex gap-5 items-start"
            >
              <div
                className={`h-14 w-14 rounded-2xl ${notification.bg} ${notification.color} flex items-center justify-center shrink-0`}
              >
                <notification.icon size={26} />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold text-lg">{notification.title}</h3>

                  <span className="text-sm text-slate-400 flex items-center gap-1">
                    <Clock size={15} />
                    {notification.time}
                  </span>
                </div>

                <p className="text-slate-600 mt-2">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Notifications;
