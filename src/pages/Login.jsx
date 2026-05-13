import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, LogIn } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleLogin(event) {
    event.preventDefault();

    localStorage.setItem("isLoggedIn", "true");

    navigate("/");
  }

  return (
    <section className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="h-20 w-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <ShieldCheck size={40} />
          </div>

          <h1 className="text-3xl font-bold mt-5">Incident Analysis Tool</h1>

          <p className="text-slate-500 mt-2">Login to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>

            <input
              type="email"
              required
              value={formData.email}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  email: event.target.value,
                })
              }
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>

            <input
              type="password"
              required
              value={formData.password}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  password: event.target.value,
                })
              }
              className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <LogIn size={18} />
            Login
          </button>
        </form>

        <p className="text-sm text-slate-500 text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
