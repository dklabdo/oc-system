// src/pages/SessionsPage.jsx
import React, { useEffect, useState } from "react";
import { getAllSessions } from "../firebase/sessions";
import { getAllEmployees } from "../firebase/employees";
import toast from "react-hot-toast";

function formatDuration(startTime, endTime) {
  if (!startTime || !endTime) return "—";
  try {
    const [sh, sm, ss] = startTime.split(":").map(Number);
    const [eh, em, es] = endTime.split(":").map(Number);
    let diff = (eh * 3600 + em * 60 + es) - (sh * 3600 + sm * 60 + ss);
    if (diff < 0) diff += 86400; // handle midnight crossing
    const hours = Math.floor(diff / 3600);
    const mins = Math.floor((diff % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  } catch {
    return "—";
  }
}

function formatTime12h(time24) {
  if (!time24) return "—";
  try {
    const [h, m] = time24.split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  } catch {
    return time24;
  }
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterEmployee, setFilterEmployee] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [sess, emps] = await Promise.all([
        getAllSessions(),
        getAllEmployees(),
      ]);
      setSessions(sess);
      setEmployees(emps);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = filterEmployee
    ? sessions.filter((s) => s.employeeId === filterEmployee)
    : sessions;

  const onlineCount = sessions.filter((s) => s.status === "online").length;

  // Build unique employees from sessions for the filter
  const sessionEmployees = [
    ...new Map(
      sessions.map((s) => [s.employeeId, { id: s.employeeId, name: s.employeeName }])
    ).values(),
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink-50">Sessions</h1>
          <p className="text-sm text-ink-400 mt-0.5">
            Track employee workspace activity
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-raised border border-surface-border text-ink-400 hover:text-ink-50 text-sm transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7a6 6 0 0111.2-3M13 7a6 6 0 01-11.2 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M12 1v3h-3M2 13v-3h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[
          ["Total Sessions", sessions.length, "text-ink-50"],
          ["Currently Online", onlineCount, "text-green-400"],
          ["Employees Tracked", sessionEmployees.length, "text-accent"],
        ].map(([label, count, color]) => (
          <div key={label} className="glass rounded-xl p-4 border-surface-border">
            <div className={`text-2xl font-display font-bold ${color}`}>{count}</div>
            <div className="text-xs text-ink-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500"
            width="14" height="14" viewBox="0 0 14 14" fill="none"
          >
            <path d="M1 2h12M3 7h8M5 12h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <select
            value={filterEmployee}
            onChange={(e) => setFilterEmployee(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-raised border border-surface-border text-ink-50 text-sm input-focus transition-all appearance-none cursor-pointer"
          >
            <option value="">All Employees</option>
            {sessionEmployees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name} (#{emp.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden border border-surface-border">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-ink-500">Loading sessions...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-surface-float border border-surface-border flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-ink-400 text-sm">
              {filterEmployee ? "No sessions found for this employee" : "No sessions recorded yet"}
            </p>
            <p className="text-ink-500 text-xs mt-1">
              Sessions are created when employees connect to their workspace.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-border">
                  {["Employee", "Date", "Start", "End", "Duration", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-medium text-ink-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((session) => (
                  <tr
                    key={session.id}
                    className="border-b border-surface-border hover:bg-surface-float/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-float border border-surface-border flex items-center justify-center flex-shrink-0">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
                            <path d="M2 12c0-2 2.2-3.5 5-3.5s5 1.5 5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-ink-50">
                            {session.employeeName}
                          </div>
                          <div className="text-xs text-ink-500 font-mono">
                            #{session.employeeId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-ink-300 font-mono">
                      {session.date || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-ink-300 font-mono">
                      {formatTime12h(session.startTime)}
                    </td>
                    <td className="px-4 py-3 text-sm text-ink-300 font-mono">
                      {session.endTime ? formatTime12h(session.endTime) : "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-ink-400 font-mono">
                      {formatDuration(session.startTime, session.endTime)}
                    </td>
                    <td className="px-4 py-3">
                      {session.status === "online" ? (
                        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Online
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-surface-float border border-surface-border text-ink-500 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-ink-500" />
                          Offline
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
