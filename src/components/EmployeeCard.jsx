// src/components/EmployeeCard.jsx
import React from "react";
import { useEmployee } from "../context/EmployeeContext";

const DEFAULT_AVATAR = "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=";

export default function EmployeeCard({ onEnterWorkspace }) {
  const { employee, logoutEmployee } = useEmployee();
  if (!employee) return null;

  const avatar = employee.profilePicture || `${DEFAULT_AVATAR}${employee.employeeId}`;

  return (
    <div className="animate-fade-in">
      {/* Avatar */}
      <div className="relative w-28 h-28 mb-5">
        <img
          src={avatar}
          alt={employee.name}
          className="w-full h-full rounded-full object-cover border border-surface-border"
          onError={(e) => { e.target.src = `${DEFAULT_AVATAR}${employee.employeeId}`; }}
        />
        <div className="absolute bottom-2 scale-105 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-surface" />
      </div>

      {/* Name & ID */}
      <div className="mb-4">
        <h2 className="text-2xl font-display font-bold text-ink-50 leading-tight">
          {employee.name}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-mono text-xs text-accent/70 bg-accent/10 px-2 py-0.5 rounded-md border border-accent/20">
            #{employee.employeeId}
          </span>
          {employee.department && (
            <span className="text-xs text-ink-400">{employee.department}</span>
          )}
        </div>
      </div>

      {/* Bio */}
      {employee.bio && (
        <p className="text-sm text-ink-400 leading-relaxed mb-5 ">
          {employee.bio}
        </p>
      )}

      {/* Contact info */}
      <div className="space-y-2 mb-6">
        {employee.proEmail && (
          <div className="flex items-center gap-2.5 text-sm">
            <div className="w-7 h-7 rounded-lg bg-surface-float border border-surface-border flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1 5l6 3.5L13 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-ink-300 truncate font-mono text-xs">{employee.proEmail}</span>
          </div>
        )}
        {employee.phone && (
          <div className="flex items-center gap-2.5 text-sm">
            <div className="w-7 h-7 rounded-lg bg-surface-float border border-surface-border flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2.5C2 2 2.5 1.5 3 1.5l2 .5c.4.1.7.5.6 1L5 5.2c-.1.4.1.8.4 1l1.9 1.5c.3.2.7.3 1 .1l1.6-1c.4-.2.9-.1 1.2.2l1.4 1.4c.4.4.4 1 0 1.4C11.6 11 10.5 12 9.5 12 6 12 2 8 2 4.5c0-1 1-2 1.5-2z" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </div>
            <span className="text-ink-300 font-mono text-xs">{employee.phone}</span>
          </div>
        )}
        {employee.personalEmail && (
          <div className="flex items-center gap-2.5 text-sm">
            <div className="w-7 h-7 rounded-lg bg-surface-float border border-surface-border flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-ink-400 font-mono text-xs">{employee.personalEmail}</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={onEnterWorkspace}
        className="
          btn-shimmer w-full py-3.5 rounded-xl font-display font-semibold text-sm
          bg-accent text-white
          transition-all duration-200 hover:bg-accent-dark active:scale-[0.98]
          glow-accent-sm mb-3
        "
      >
        Connect to My Workspace →
      </button>

      <button
        onClick={logoutEmployee}
        className="w-full py-2.5 rounded-xl text-xs text-ink-500 hover:text-ink-300 transition-colors"
      >
        Not you? Switch account
      </button>
    </div>
  );
}
