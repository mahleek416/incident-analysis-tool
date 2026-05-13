import { User, Mail, ShieldCheck, CalendarDays, Pencil } from "lucide-react";

function Profile() {
  return (
    <section className="p-8">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="h-28 w-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
              AR
            </div>

            <div>
              <h1 className="text-3xl font-bold">Onifade Abdulmaliq</h1>

              <p className="text-slate-500 mt-2">
                MSc Researcher • Incident Analysis Platform
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                  <ShieldCheck size={16} />
                  Administrator
                </span>

                <span className="bg-green-50 text-green-600 px-4 py-2 rounded-xl text-sm font-medium">
                  Active Account
                </span>
              </div>
            </div>
          </div>

          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700">
            <Pencil size={18} />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <ProfileCard
            icon={User}
            title="Full Name"
            value="Onifade Abdulmaliq"
          />

          <ProfileCard
            icon={Mail}
            title="Email Address"
            value="abdulmaliq@example.com"
          />

          <ProfileCard
            icon={ShieldCheck}
            title="Role"
            value="Research Administrator"
          />

          <ProfileCard
            icon={CalendarDays}
            title="Joined"
            value="January 2026"
          />
        </div>
      </div>
    </section>
  );
}

function ProfileCard({ icon: Icon, title, value }) {
  return (
    <div className="border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
      <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
        <Icon size={26} />
      </div>

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="font-bold text-lg mt-1">{value}</h3>
      </div>
    </div>
  );
}

export default Profile;
