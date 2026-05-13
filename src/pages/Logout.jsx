import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isLoggedIn");

    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="p-8 flex items-center justify-center min-h-[80vh]">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 max-w-lg w-full text-center">
        <div className="h-24 w-24 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center">
          <LogOut size={42} />
        </div>

        <h1 className="text-3xl font-bold mt-6">Logout Successful</h1>

        <p className="text-slate-500 mt-3">
          You have been securely logged out of the Incident Analysis Platform.
        </p>

        <div className="bg-blue-50 text-blue-700 rounded-2xl p-4 flex items-center gap-3 mt-6 text-left">
          <ShieldCheck size={22} />

          <p className="text-sm">Redirecting to login page...</p>
        </div>

        <Link
          to="/login"
          className="mt-8 inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Go to Login
        </Link>
      </div>
    </section>
  );
}

export default Logout;
