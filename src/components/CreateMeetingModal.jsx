// src/components/CreateMeetingModal.jsx
import React, { useState, useEffect } from "react";
import { getAllEmployees } from "../firebase/employees";
import { sendMeetingNotification } from "../firebase/notifications";
import { useGoogleMeetLink } from "./useGoogleMeetLink";
import { useEmployee } from "../context/EmployeeContext";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=";

function getEmail(emp) {
  return emp.proEmail || emp.personalEmail || "";
}

export default function CreateMeetingModal({ onClose }) {
  const { employee: currentEmployee , setShowCreateMeetingModal } = useEmployee();
  const { ready, createMeetLink } = useGoogleMeetLink();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [creating, setCreating] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState(null);

  // Load all team members
  useEffect(() => {
    (async () => {
      try {
        const all = await getAllEmployees();
        // Exclude the current logged-in employee from the selection list
        const others = all.filter((e) => e.employeeId !== currentEmployee?.employeeId);
        setEmployees(others);
      } catch {
        toast.error("Failed to load team members");
      } finally {
        setLoading(false);
      }
    })();
  }, [currentEmployee]);

  const filtered = employees.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.name?.toLowerCase().includes(q) ||
      getEmail(e).toLowerCase().includes(q) ||
      e.department?.toLowerCase().includes(q)
    );
  });

  const toggleSelect = (empId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(empId)) next.delete(empId);
      else next.add(empId);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((e) => e.id)));
    }
  };

  const handleCreateMeeting = async () => {
    if (selected.size === 0) {
      toast.error("Select at least one team member");
      return;
    }
    if (!ready) {
      toast.error("Google Meet is still loading, please wait...");
      return;
    }

    setCreating(true);
    try {
      // 1. Generate a Google Meet link
      const url = await createMeetLink();

      // 2. Gather the selected participants
      const participants = employees
        .filter((e) => selected.has(e.id))
        .map((e) => ({
          name: e.name,
          email: getEmail(e),
          employeeId: e.employeeId,
        }));
        console.log(currentEmployee);
      // Include the creator in the notified persons list
      const creator = {
        name: currentEmployee?.name,
        email: getEmail(currentEmployee),
        employeeId: currentEmployee?.employeeId,
      };

      const allNotified = [creator, ...participants];

      // 3. Write notification to Firebase Realtime DB
      await sendMeetingNotification({
        creator,
        participants: allNotified,
        meetingUrl: url,
      });

      setMeetingUrl(url);
      toast.success("Meeting created successfully!");
    } catch (err) {
      console.error("Failed to create meeting:", err);
      toast.error(err.message || "Failed to create meeting");
    } finally {
      setCreating(false);
    }
  };

  const copyLink = () => {
    if (meetingUrl) {
      navigator.clipboard.writeText(meetingUrl);
      toast.success("Meeting link copied!");
    }
  };

  // ── Success State ──
  if (meetingUrl) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop bg-black/60 p-4">
        <div className="glass-strong rounded-2xl w-full max-w-md animate-slide-up">
          <div className="p-8 text-center">
            {/* Success icon */}
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M6 14.5l5.5 5.5L22 8"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="text-lg font-display font-bold text-ink-50 mb-2">
              Meeting Created
            </h3>
            <p className="text-sm text-ink-400 mb-6">
              {selected.size} team member{selected.size !== 1 ? "s" : ""} have been notified.
            </p>

            {/* Meeting link display */}
            <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-surface border border-surface-border">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent flex-shrink-0">
                <path
                  d="M10.5 5.5L14 3v10l-3.5-2.5M2 4.5h7.5a1 1 0 011 1v5a1 1 0 01-1 1H2a1 1 0 01-1-1v-5a1 1 0 011-1z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs font-mono text-accent truncate flex-1 text-left">
                {meetingUrl}
              </span>
              <button
                onClick={copyLink}
                className="flex-shrink-0 p-1.5 rounded-lg hover:bg-surface-float transition-colors text-ink-400 hover:text-ink-50"
                title="Copy link"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M9.5 4.5V2.5a1 1 0 00-1-1h-6a1 1 0 00-1 1v6a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateMeetingModal(false)}
                className="flex-1 py-3 rounded-xl border border-surface-border text-ink-400 text-sm hover:border-ink-500 hover:text-ink-50 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => window.open(meetingUrl, "_blank")}
                className="flex-1 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark transition-all btn-shimmer"
              >
                Join Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Modal ──
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop bg-black/60 p-4">
      <div className="glass-strong rounded-2xl w-full max-w-lg max-h-[85vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-surface-border flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M13 6.5L17 4v12l-4-2.5M2.5 5h9a1.5 1.5 0 011.5 1.5v7a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 011 13.5v-7A1.5 1.5 0 012.5 5z"
                    stroke="#295EFF"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-ink-50">
                  Create a Meeting
                </h2>
                <p className="text-xs text-ink-500">
                  Select team members to invite
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-surface-float transition-colors flex items-center justify-center text-ink-400 hover:text-ink-50"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search team members..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface border border-surface-border text-ink-50 text-sm placeholder:text-ink-600 input-focus transition-all"
            />
          </div>
        </div>

        {/* Team member list */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {loading ? (
            <div className="py-12 text-center">
              <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-ink-500">Loading team members...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-ink-400">
                {search ? "No members match your search" : "No team members found"}
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {/* Select all toggle */}
              <button
                onClick={toggleAll}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-ink-500 hover:text-ink-300 hover:bg-surface-float/50 transition-all"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    selected.size === filtered.length && filtered.length > 0
                      ? "bg-accent border-accent"
                      : "border-surface-border"
                  }`}
                >
                  {selected.size === filtered.length && filtered.length > 0 && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                {selected.size === filtered.length && filtered.length > 0
                  ? "Deselect all"
                  : `Select all (${filtered.length})`}
              </button>

              {/* Member rows */}
              {filtered.map((emp) => {
                const isSelected = selected.has(emp.id);
                const avatar = emp.profilePicture || `${DEFAULT_AVATAR}${emp.employeeId}`;
                const email = getEmail(emp);

                return (
                  <button
                    key={emp.id}
                    onClick={() => toggleSelect(emp.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left group ${
                      isSelected
                        ? "bg-accent/8 border border-accent/20"
                        : "hover:bg-surface-float/60 border border-transparent"
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? "bg-accent border-accent"
                          : "border-surface-border group-hover:border-ink-500"
                      }`}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2.5 6l2.5 2.5L9.5 4"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Avatar */}
                    <img
                      src={avatar}
                      alt={emp.name}
                      className="w-9 h-9 rounded-xl object-cover border border-surface-border flex-shrink-0"
                      onError={(e) => {
                        e.target.src = `${DEFAULT_AVATAR}${emp.employeeId}`;
                      }}
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-ink-50 truncate">
                        {emp.name}
                      </div>
                      <div className="text-xs text-ink-500 truncate">
                        {email || "No email"}
                        {emp.department && (
                          <span className="text-ink-600"> · {emp.department}</span>
                        )}
                      </div>
                    </div>

                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 pt-3 border-t border-surface-border flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-ink-500">
              {selected.size > 0 ? (
                <>
                  <span className="text-accent font-semibold">{selected.size}</span> member
                  {selected.size !== 1 ? "s" : ""} selected
                </>
              ) : (
                "No members selected"
              )}
            </span>
            {!ready && (
              <span className="text-xs text-yellow-400/80 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                Loading Google Meet...
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowCreateMeetingModal(false)}
              className="flex-1 py-3 rounded-xl border border-surface-border text-ink-400 text-sm hover:border-ink-500 hover:text-ink-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateMeeting}
              disabled={creating || selected.size === 0}
              className="flex-1 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all btn-shimmer flex items-center justify-center gap-2"
            >
              {creating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M9.5 4.5L12.5 3v8l-3-1.5M1.5 3.5h7a1 1 0 011 1v5a1 1 0 01-1 1h-7a1 1 0 01-1-1v-5a1 1 0 011-1z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Create Meeting
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
