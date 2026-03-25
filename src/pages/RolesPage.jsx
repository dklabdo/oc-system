// src/pages/RolesPage.jsx
import React, { useEffect, useState } from "react";
import {
  getAllRoles,
  addRole,
  updateRole,
  deleteRole,
  getAllEmployees,
} from "../firebase/employees";
import toast from "react-hot-toast";

const EMPTY_ROLE = { name: "", apps: [] };
const EMPTY_APP = { appName: "", appLink: "" };

function RoleModal({ role, onClose, onSaved }) {
  const [form, setForm] = useState(role ? { ...role, apps: [...(role.apps || [])] } : { ...EMPTY_ROLE });
  const [loading, setLoading] = useState(false);
  const [newApp, setNewApp] = useState({ ...EMPTY_APP });

  const addApp = () => {
    if (!newApp.appName) return toast.error("App name is required");
    setForm((f) => ({ ...f, apps: [...f.apps, { ...newApp }] }));
    setNewApp({ ...EMPTY_APP });
  };

  const removeApp = (i) => {
    setForm((f) => ({ ...f, apps: f.apps.filter((_, idx) => idx !== i) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return toast.error("Role name is required");
    setLoading(true);
    try {
      if (role) {
        await updateRole(role.id, form);
        toast.success("Role updated");
      } else {
        await addRole(form);
        toast.success("Role created");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to save role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop bg-black/60 p-4">
      <div className="glass-strong rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-bold text-white">
              {role ? "Edit Role" : "Create Role"}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-surface-float transition-colors flex items-center justify-center text-ink-400"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs text-ink-400 font-medium block mb-1.5">Role Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. E-Commerce Operator"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-white text-sm placeholder:text-ink-600 input-focus"
              />
            </div>

            {/* Apps list */}
            <div>
              <label className="text-xs text-ink-400 font-medium block mb-2">
                Applications ({form.apps.length})
              </label>

              {form.apps.length > 0 && (
                <div className="space-y-2 mb-3">
                  {form.apps.map((app, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-surface rounded-xl border border-surface-border group">
                      <div className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <rect x="1" y="1" width="4" height="4" rx="0.5" stroke="#295EFF" strokeWidth="1"/>
                          <rect x="7" y="1" width="4" height="4" rx="0.5" stroke="#295EFF" strokeWidth="1"/>
                          <rect x="1" y="7" width="4" height="4" rx="0.5" stroke="#295EFF" strokeWidth="1"/>
                          <rect x="7" y="7" width="4" height="4" rx="0.5" stroke="#295EFF" strokeWidth="1"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-medium truncate">{app.appName}</div>
                        {app.appLink && (
                          <div className="text-xs text-ink-500 font-mono truncate">{app.appLink}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeApp(i)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-500/10 text-ink-500 hover:text-red-400 flex-shrink-0"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add app inline */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <input
                    value={newApp.appName}
                    onChange={(e) => setNewApp((a) => ({ ...a, appName: e.target.value }))}
                    placeholder="App name"
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-border text-white text-sm placeholder:text-ink-600 input-focus mb-2"
                  />
                  <input
                    value={newApp.appLink}
                    onChange={(e) => setNewApp((a) => ({ ...a, appLink: e.target.value }))}
                    placeholder="https://app.link"
                    className="w-full px-3 py-2 rounded-xl bg-surface border border-surface-border text-white text-sm placeholder:text-ink-600 input-focus"
                  />
                </div>
                <button
                  type="button"
                  onClick={addApp}
                  className="mb-0 px-3 py-2 rounded-xl bg-surface-float border border-surface-border text-accent text-sm hover:border-accent/40 transition-all flex-shrink-0 h-[42px]"
                >
                  + Add
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-surface-border text-ink-400 text-sm hover:border-ink-500 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark disabled:opacity-40 transition-all"
              >
                {loading ? "Saving..." : role ? "Save Changes" : "Create Role"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function RoleCard({ role, employees, onEdit, onDelete }) {
  const count = employees.filter((e) => e.roleId === role.id).length;
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete role "${role.name}"?`)) return;
    setDeleting(true);
    try {
      await onDelete(role.id);
      toast.success("Role deleted");
    } catch {
      toast.error("Failed to delete");
      setDeleting(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-5 border-surface-border hover:border-surface-float transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="2" width="6" height="6" rx="1" stroke="#a855f7" strokeWidth="1.25"/>
            <rect x="10" y="2" width="6" height="6" rx="1" stroke="#a855f7" strokeWidth="1.25"/>
            <rect x="2" y="10" width="6" height="6" rx="1" stroke="#a855f7" strokeWidth="1.25"/>
            <rect x="10" y="10" width="6" height="6" rx="1" stroke="#a855f7" strokeWidth="1.25"/>
          </svg>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(role)}
            className="p-1.5 rounded-lg hover:bg-surface-float text-ink-400 hover:text-white transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 2l2 2-7 7H3V9l7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-ink-400 hover:text-red-400 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 3.5h10M5 3.5V2.5h4v1M5.5 6.5v4M8.5 6.5v4M3 3.5l.75 8.5h6.5L11 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <h3 className="text-base font-display font-semibold text-white mb-1">{role.name}</h3>
      <p className="text-xs text-ink-500 mb-4">
        {count} employee{count !== 1 ? "s" : ""} · {(role.apps || []).length} app{(role.apps || []).length !== 1 ? "s" : ""}
      </p>

      {/* Apps */}
      {role.apps && role.apps.length > 0 && (
        <div className="space-y-1.5">
          {role.apps.map((app, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
              <span className="text-xs text-ink-400 truncate">{app.appName}</span>
              {app.appLink && (
                <a
                  href={app.appLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-ink-600 hover:text-accent transition-colors flex-shrink-0"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [r, e] = await Promise.all([getAllRoles(), getAllEmployees()]);
      setRoles(r);
      setEmployees(e);
    } catch {
      toast.error("Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    await deleteRole(id);
    setRoles((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Roles & Apps</h1>
          <p className="text-sm text-ink-400 mt-0.5">
            Define roles and their accessible applications
          </p>
        </div>
        <button
          onClick={() => setModal("add")}
          className="btn-shimmer flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark transition-all glow-accent-sm whitespace-nowrap"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Create Role
        </button>
      </div>

      {/* How it works */}
      <div className="glass rounded-xl px-5 py-4 border-surface-border mb-8 flex items-start gap-3">
        <div className="w-6 h-6 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#295EFF" strokeWidth="1"/>
            <path d="M6 4v3M6 8.5v.5" stroke="#295EFF" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <p className="text-sm text-white font-medium">How roles work</p>
          <p className="text-xs text-ink-400 mt-0.5 leading-relaxed">
            Create a role (e.g. "E-Commerce Operator"), add apps to it (name + URL), then assign the role to employees.
            Employees will see only the apps tied to their role on the workspace.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-ink-500">Loading roles...</p>
        </div>
      ) : roles.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-2xl bg-surface-float border border-surface-border flex items-center justify-center mx-auto mb-4">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <rect x="2" y="2" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="15" y="2" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="2" y="15" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="15" y="15" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
          <p className="text-ink-400 text-sm mb-2">No roles yet</p>
          <button
            onClick={() => setModal("add")}
            className="text-sm text-accent hover:text-accent-muted transition-colors"
          >
            Create your first role →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              employees={employees}
              onEdit={(r) => setModal(r)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {modal !== null && (
        <RoleModal
          role={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={load}
        />
      )}
    </div>
  );
}
