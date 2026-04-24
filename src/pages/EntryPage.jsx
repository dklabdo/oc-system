// src/pages/EntryPage.jsx
import React, { useState } from "react";
import HeroVisual from "../components/HeroVisual";
import EmployeeLoginModal from "../components/EmployeeLoginModal";
import EmployeeCard from "../components/EmployeeCard";
import WorkspacePanel from "../components/WorkspacePanel";
import { useEmployee } from "../context/EmployeeContext";
import { useTheme } from "../context/ThemeProvider";
import { Link } from "react-router-dom";
import CreateMeetingModal from "@/components/CreateMeetingModal";

const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || "OCESTRAL";
const COMPANY_TAGLINE =
  import.meta.env.VITE_COMPANY_TAGLINE || "Where great teams build the future";

export default function EntryPage() {
  const { employee, loadingEmployee , showCreateMeetingModal } = useEmployee();
  const { theme, toggleTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [workspaceActive, setWorkspaceActive] = useState(false);

  // If employee just logged in and opened workspace
  const handleEnterWorkspace = () => {
    setWorkspaceActive(true);
  };

  if (loadingEmployee) {
    return (
      <div className="min-h-screen  bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          <p className="text-xs font-mono text-ink-500 tracking-widest">
            LOADING...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col lg:flex-row noise">
                {showCreateMeetingModal && <CreateMeetingModal />}

      {/* ── LEFT PANEL ─────────────────────────────────── */}
      <div className="w-full lg:w-[60%] lg:min-w-[420px] flex flex-col min-h-screen lg:h-screen overflow-y-auto">
        <div className="flex flex-col flex-1 px-8 sm:px-12 py-10">
          {/* Top nav */}
          <div className="flex items-center justify-between mb-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-lg text-ink-50 tracking-tight">
                {COMPANY_NAME}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-lg bg-surface-float border border-surface-border flex items-center justify-center text-ink-400 hover:text-ink-300 transition-colors"
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
              </button>

              {/* Admin link */}
              <Link
                to="/dashboardauth"
                className="flex items-center gap-1.5 text-xs text-ink-500 hover:text-ink-300 transition-colors font-mono"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="4"
                    height="4"
                    rx="0.75"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <rect
                    x="7"
                    y="1"
                    width="4"
                    height="4"
                    rx="0.75"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <rect
                    x="1"
                    y="7"
                    width="4"
                    height="4"
                    rx="0.75"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <rect
                    x="7"
                    y="7"
                    width="4"
                    height="4"
                    rx="0.75"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
                Admin
              </Link>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center">
            {workspaceActive && employee ? (
              // ── WORKSPACE MODE ──
              <WorkspacePanel />
            ) : employee ? (
              // ── EMPLOYEE RECOGNIZED ──
              <EmployeeCard onEnterWorkspace={handleEnterWorkspace} />
            ) : (
              // ── GUEST MODE ──
              <div className="animate-slide-up">
                <div className="mb-3">
                  <span className="text-xs font-mono tracking-[0.25em] text-accent/60 uppercase">
                    Team Portal
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-display font-bold text-ink-50 leading-[1.1] tracking-tight mb-4">
                  Your team.
                  <br />
                  <span className="text-gradient">One place.</span>
                </h1>

                <p className="text-base text-ink-400 leading-relaxed max-w-[320px] mb-10">
                  {COMPANY_TAGLINE}
                </p>

                {/* Stats strip */}
                <div className="flex gap-6 mb-10">
                  {[
                    ["∞", "Apps"],
                    ["0ms", "Friction"],
                    ["1", "Login"],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <div className="text-xl font-display font-bold text-accent">
                        {n}
                      </div>
                      <div className="text-xs text-ink-500 mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="
                    btn-shimmer group flex items-center gap-3 px-7 py-4 rounded-xl
                    bg-accent text-white
                    font-display font-semibold text-sm
                    transition-all duration-200 hover:bg-accent-dark active:scale-[0.97]
                    glow-accent
                  "
                >
                  <span>Enter Workspace</span>
                  <svg
                    className="group-hover:translate-x-1 transition-transform"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <p className="text-xs text-ink-600 mt-4">
                  Use your 4-digit employee ID to sign in
                </p>
              </div>
            )}
          </div>

          {/* Bottom marquee */}
          <div className="mt-10 overflow-hidden border-t border-surface-border pt-3 -mx-8 sm:-mx-12">
            <div className="flex whitespace-nowrap marquee text-xs font-mono text-ink-700 py-3 ">
              {Array(4)
                .fill([
                  "DREAM BIG",
                  "•",
                  "WORK HARD",
                  "•",
                  "STAY FOCUSED",
                  "•",
                  "MAKE IT HAPPEN",
                  "•",
                  "BUILD GREATNESS",
                  "•",
                  "NEVER SETTLE",
                  "•",
                  "LEAD THE WAY",
                  "•",
                  "PUSH LIMITS",
                  "•",
                ])
                .flat()
                .map((t, i) => (
                  <span key={i} className="text-white px-4">
                    {t}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────── */}
      <div className="hidden lg:flex flex-1 relative">
        {workspaceActive && employee ? (
          // Replace visual with workspace welcome art
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-[#111111] flex flex-col items-center justify-center">
            {/* Dark grid overlay — immune to theme */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10 text-center px-12 animate-fade-in">
              {/* Hexagon logo big */}
              <div className="w-24 h-24 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-8 animate-float-slow">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <path
                    d="M22 4L40 13V31L22 40L4 31V13L22 4Z"
                    stroke="#295EFF"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M22 4v36M4 13l18 9 18-9M4 31l18-9 18 9"
                    stroke="#295EFF"
                    strokeWidth="0.75"
                    opacity="0.4"
                  />
                </svg>
              </div>
              <p className="text-xs font-mono tracking-[0.3em] text-accent/70 uppercase mb-3">
                All Systems Active
              </p>
              <h2 className="text-4xl font-display font-bold text-white leading-tight mb-3">
                Welcome to your
                <br />
                <span className="text-accent text-glow">Workspace</span>
              </h2>
              <p className="text-[#8c8c8c] text-sm max-w-xs mx-auto">
                Select an application from the left panel to get started.
              </p>
              {/* Floating badges */}
              <div className="mt-10 flex justify-center gap-3 flex-wrap">
                {["Secure", "Fast", "Unified", "Always On"].map((badge) => (
                  <span
                    key={badge}
                    className="text-xs font-mono px-3 py-1.5 rounded-full border border-[#2e2e2e] text-[#8c8c8c] bg-[#1e1e1e]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            {/* Ambient glow */}
            <div className="absolute w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
          </div>
        ) : (
          <HeroVisual />
        )}
      </div>

      {/* Employee login modal */}
      {showModal && <EmployeeLoginModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
