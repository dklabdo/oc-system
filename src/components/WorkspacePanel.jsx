// src/components/WorkspacePanel.jsx
import React, { useState } from "react";
import { useEmployee } from "../context/EmployeeContext";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { openUrl } from "@tauri-apps/plugin-opener";

// Icon map: tries to match app names to icons
const APP_ICON_MAP = {
  email: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  erp: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  crm: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  store: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 9l1-6h16l1 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 9a3 3 0 006 0M9 9a3 3 0 006 0M15 9a3 3 0 006 0" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 21V9M19 9v12M5 21h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  chat: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  overview: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  website: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  notifications: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  default: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 9h18M9 21V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

function getIcon(appName) {
  const lower = (appName || "").toLowerCase();
  if (lower.includes("mail") || lower.includes("email") || lower.includes("gmail") || lower.includes("outlook")) return APP_ICON_MAP.email;
  if (lower.includes("erp") || lower.includes("odoo") || lower.includes("sap")) return APP_ICON_MAP.erp;
  if (lower.includes("crm") || lower.includes("salesforce") || lower.includes("hubspot")) return APP_ICON_MAP.crm;
  if (lower.includes("store") || lower.includes("shop") || lower.includes("commerce") || lower.includes("ecom")) return APP_ICON_MAP.store;
  if (lower.includes("chat") || lower.includes("slack") || lower.includes("teams") || lower.includes("communicat")) return APP_ICON_MAP.chat;
  if (lower.includes("overview") || lower.includes("report") || lower.includes("analyt")) return APP_ICON_MAP.overview;
  if (lower.includes("web") || lower.includes("site") || lower.includes("portal")) return APP_ICON_MAP.website;
  if (lower.includes("notif") || lower.includes("alert")) return APP_ICON_MAP.notifications;
  return APP_ICON_MAP.default;
}

const ACCENT_COLORS = [
  "from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-600",
  "from-blue-400/20 to-cyan-500/5 border-blue-400/20 text-blue-600",
  "from-purple-400/20 to-violet-500/5 border-purple-400/20 text-purple-600",
  "from-green-400/20 to-emerald-500/5 border-green-400/20 text-green-600",
  "from-pink-400/20 to-rose-500/5 border-pink-400/20 text-pink-600",
  "from-orange-400/20 to-red-500/5 border-orange-400/20 text-orange-600",
  "from-teal-400/20 to-cyan-500/5 border-teal-400/20 text-teal-600",
  "from-indigo-400/20 to-blue-500/5 border-indigo-400/20 text-indigo-600",
];


const openERPWindow = async (link, name) => {
  try {
    // Sanitize the label to a valid Tauri window label (alphanumeric + underscores)
    const label = name.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 32) || "app";

    const erpWindow = new WebviewWindow(label, {
      url: link,
      title: name,
      width: 1400,
      height: 900,
      resizable: true,
      fullscreen: false,
    });

    erpWindow.once("tauri://created", () => {
      console.log("App window created successfully");
    });

    erpWindow.once("tauri://error", async (e) => {
      console.error("Failed to create app window, opening in browser:", e);
      // Fallback: open in the system's default browser
      try {
        await openUrl(link);
      } catch (err) {
        console.error("Failed to open URL:", err);
      }
    });
  } catch (err) {
    console.error("WebviewWindow error, falling back to browser:", err);
    try {
      await openUrl(link);
    } catch (e) {
      console.error("Failed to open URL:", e);
    }
  }
};

function AppCard({ app, index }) {
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const handleClick = () => {
    openERPWindow(app.appLink , app.appName);
  };

  return (
    <a
      href={app.appLink}
      target="_blank"
      
      className={` app-icon-card relative flex flex-col items-center gap-3 p-4 rounded-2xl
        bg-gradient-to-br ${color} border
        cursor-pointer group text-center`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="w-12 h-12 rounded-xl bg-surface-float border border-surface-border flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
        {getIcon(app.appName)}
      </div>
      <span className="text-xs font-medium leading-tight text-ink-50 line-clamp-2">
        {app.appName}
      </span>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
    </a>
  );
}

export default function WorkspacePanel() {
  const { employee, apps, logoutEmployee , setShowCreateMeetingModal  } = useEmployee();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="animate-fade-in h-full flex flex-col">
      {/* Welcome header */}
      <div className="mb-8">
        <p className="text-xs font-mono text-accent/60 tracking-widest uppercase mb-2">
          {greeting} 👋
        </p>
        <h2 className="text-3xl font-display font-bold text-ink-50 leading-tight mb-1">
          Welcome to your<br />
          <span className="text-accent text-glow">Workspace</span>
        </h2>
        {employee && (
          <p className="text-sm text-ink-400">
            {employee.name} · <span className="font-mono text-accent/50">#{employee.employeeId}</span>
          </p>
        )}
      </div>

      {/* Apps grid */}
      {apps.length > 0 ? (
        <div className="flex-1 overflow-y-auto pr-1 -mr-1">
          <p className="text-xs text-ink-500 mb-3 uppercase tracking-wider font-medium">
            Your Applications ({apps.length})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 stagger-children pb-4">
            {apps.map((app, i) => (
              <AppCard key={i} app={app} index={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-surface-float border border-surface-border flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="4" y="4" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="15" y="4" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="4" y="15" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="15" y="15" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <p className="text-ink-500 text-sm">No applications assigned yet.</p>
          <p className="text-ink-600 text-xs mt-1">Contact your admin to assign a role.</p>
        </div>
      )}

      {/* Footer */}
      <div className="pt-6 mt-auto border-t border-surface-border flex items-center justify-between">
        <button
          onClick={() => setShowCreateMeetingModal(true)}
          className="text-xs scale-95 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M5 2H2a1 1 0 00-1 1v6a1 1 0 001 1h3M8 8l3-3-3-3M11 5H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Create Meeting
        </button>

        
        <button
          onClick={logoutEmployee}
          className="text-xs bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5"
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M5 2H2a1 1 0 00-1 1v6a1 1 0 001 1h3M8 8l3-3-3-3M11 5H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          
        </button>
      </div>
    </div>
  );
}
