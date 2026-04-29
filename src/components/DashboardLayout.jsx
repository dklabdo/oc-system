// src/components/DashboardLayout.jsx
import React, { useState } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";
import toast from "react-hot-toast";
import { ReceiptText } from "lucide-react";

const NAV = [
  {
    to: "/dashboard/employees",
    label: "Employees",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M10.667 14v-1.333A2.667 2.667 0 008 10H3.333A2.667 2.667 0 00.667 12.667V14"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle
          cx="5.667"
          cy="5.333"
          r="2.667"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M15.333 14v-1.333a2.667 2.667 0 00-2-2.58M10.667 2.087a2.667 2.667 0 010 5.16"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    to: "/dashboard/roles",
    label: "Roles & Apps",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect
          x="1"
          y="1"
          width="6"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <rect
          x="9"
          y="1"
          width="6"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <rect
          x="1"
          y="9"
          width="6"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <rect
          x="9"
          y="9"
          width="6"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </svg>
    ),
  },
  {
    to: "/dashboard/sessions",
    label: "Sessions",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle
          cx="8"
          cy="8"
          r="6.5"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M8 4.5v3.5l2.5 1.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    to: "/dashboard/invoices",
    label: "Factures",
    icon: <ReceiptText size={16} strokeWidth={1.7} />,
  },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || "NexaWork";

  const handleLogout = async () => {
    await logout();
    toast.success("Signed out");
    navigate("/dashboardauth");
  };

  const Sidebar = () => (
    <aside className="h-full flex flex-col bg-surface-raised border-r border-surface-border w-64 flex-shrink-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-surface-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L16 5.5V12.5L9 16L2 12.5V5.5L9 2Z" fill="#111111" />
          </svg>
        </div>
        <div>
          <div className="font-display font-bold text-sm text-ink-50">
            {COMPANY_NAME}
          </div>
          <div className="text-xs text-ink-600">Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
              ${
                isActive
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-ink-400 hover:text-ink-50 hover:bg-surface-float"
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-surface-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-surface-float border border-surface-border flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle
                cx="8"
                cy="6"
                r="3"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M2 13c0-2.5 2.7-4 6-4s6 1.5 6 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-ink-50 truncate">
              {user?.email?.split("@")[0]}
            </div>
            <div className="text-xs text-ink-500 truncate">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-ink-500 hover:text-ink-50 hover:bg-surface-float transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3M9 10l4-3-4-3M13 7H5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Sign out
        </button>
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-ink-500 hover:text-ink-50 hover:bg-surface-float transition-all"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle
                cx="7"
                cy="7"
                r="3"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.75 2.75l1.06 1.06M10.19 10.19l1.06 1.06M11.25 2.75l-1.06 1.06M3.81 10.19l-1.06 1.06"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M12.5 7.5a5.5 5.5 0 01-6-6 5.5 5.5 0 106 6z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-surface flex noise">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 modal-backdrop"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 flex-shrink-0 animate-slide-up">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-surface-border bg-surface-raised">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-surface-float transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 5h12M3 9h12M3 13h12"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span className="font-display font-bold text-sm text-ink-50">
            {COMPANY_NAME}
          </span>
          <div className="w-8" />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
