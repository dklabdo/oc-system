// src/pages/DashboardLogin.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function DashboardLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Fill in all fields");
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Signed in successfully");
      navigate("/dashboard/employees");
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface grid-bg flex items-center justify-center px-4 noise">
      {/* Ambient */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md animate-slide-up">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-ink-400 hover:text-ink-300 transition-colors mb-8 font-mono"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to portal
        </Link>

        {/* Card */}
        <div className="glass-strong rounded-2xl p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L16 5.5V12.5L9 16L2 12.5V5.5L9 2Z" fill="#111111"/>
              </svg>
            </div>
            <div>
              <div className="font-display font-bold text-ink-50 text-base leading-none">
                {import.meta.env.VITE_COMPANY_NAME || "NexaWork"}
              </div>
              <div className="text-xs text-ink-400 mt-0.5">Admin Dashboard</div>
            </div>
          </div>

          <h1 className="text-2xl font-display font-bold text-ink-50 mb-1">
            Admin Sign In
          </h1>
          <p className="text-sm text-ink-300 mb-8">
            Access the team management dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-ink-300 font-medium block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                className="
                  w-full px-4 py-3 rounded-xl bg-surface-raised border border-surface-border
                  text-ink-50 text-sm placeholder:text-ink-500
                  input-focus transition-all duration-200
                "
              />
            </div>
            <div>
              <label className="text-xs text-ink-300 font-medium block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
                    w-full px-4 py-3 pr-12 rounded-xl bg-surface-raised border border-surface-border
                    text-ink-50 text-sm placeholder:text-ink-500
                    input-focus transition-all duration-200
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300 transition-colors"
                >
                  {showPwd ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.2"/>
                      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                      <path d="M3 3l10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.2"/>
                      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                btn-shimmer w-full py-3.5 rounded-xl font-display font-semibold text-sm
                bg-accent text-white
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200 hover:bg-accent-dark active:scale-[0.98]
                glow-accent-sm mt-2
              "
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                    <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In →"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-ink-500 mt-6">
          Employee portal? <Link to="/" className="text-accent hover:text-accent-dark transition-colors">Go here</Link>
        </p>
      </div>
    </div>
  );
}
