
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  ArrowLeft,
  Utensils,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("shashank@crave.com");
  const [password, setPassword] = useState("CraveAdmin123!");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (login(email.trim(), password)) {
      navigate(location.state?.from || "/admin", {
        replace: true,
      });
    } else {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <main className="page-wrap flex min-h-[75vh] items-center justify-center py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-soft md:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-[#25231f] p-9 text-white md:flex md:flex-col md:justify-between">
          <div className="absolute -right-16 -top-12 h-64 w-64 rounded-full bg-orange/20 blur-3xl" />

          <div className="relative">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xl font-black"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange">
                <Utensils size={18} />
              </span>
              crave<span className="text-orange">.</span>
            </Link>

            <div className="mt-16 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-orange-100">
              <ShieldCheck size={14} />
              ADMIN WORKSPACE
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight">
              Good food needs
              <br />
              <span className="text-[#ff9b73]">
                great operations.
              </span>
            </h1>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">
              Manage orders and restaurants from one simple workspace.
            </p>
          </div>

          <p className="relative text-xs text-white/45">
            Crave · Admin workspace
          </p>
        </section>

        <section className="p-6 sm:p-9">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-orange"
          >
            <ArrowLeft size={16} />
            Back to customer site
          </Link>

          <div className="mt-8">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-peach text-orange">
              <LockKeyhole size={22} />
            </div>

            <p className="eyebrow mt-5">WELCOME BACK</p>

            <h2 className="mt-1 text-3xl font-black tracking-tight">
              Admin login<span className="text-orange">.</span>
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              Sign in to open the Crave management dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <label className="field-label">
              Email address

              <span className="mt-2 flex items-center gap-2 rounded-xl border border-orange-100 px-3 focus-within:border-orange">
                <Mail size={17} className="shrink-0 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="username"
                  required
                  className="w-full py-3 text-sm outline-none"
                  placeholder="shashank@crave.com"
                />
              </span>
            </label>

            <label className="field-label">
              Password

              <span className="mt-2 flex items-center gap-2 rounded-xl border border-orange-100 px-3 focus-within:border-orange">
                <LockKeyhole size={17} className="shrink-0 text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full py-3 text-sm outline-none"
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted hover:text-ink"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </span>
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-orange px-4 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#db5931]"
            >
              Sign in to dashboard →
            </button>
          </form>

          <p className="mt-5 text-center text-[11px] leading-5 text-muted">
            Authorized administrators only.
          </p>
        </section>
      </div>
    </main>
  );
}
