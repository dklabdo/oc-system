// src/pages/EmployeesPage.jsx
import React, { useEffect, useState } from "react";
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllRoles,
} from "../firebase/employees";
import toast from "react-hot-toast";

const DEFAULT_AVATAR = "https://api.dicebear.com/9.x/bottts-neutral/svg?seed=";

const EMPTY_FORM = {
  name: "",
  personalEmail: "",
  proEmail: "",
  phone: "",
  department: "",
  bio: "",
  profilePicture: "",
  roleId: "",
};

function EmployeeModal({ employee, roles, onClose, onSaved }) {
  const [form, setForm] = useState(employee ? { ...employee } : { ...EMPTY_FORM });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return toast.error("Name is required");
    setLoading(true);
    try {
      if (employee) {
        await updateEmployee(employee.id, form);
        toast.success("Employee updated");
      } else {
        await addEmployee(form);
        toast.success("Employee added — ID auto-generated");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name", label: "Full Name *", placeholder: "Jane Doe", type: "text" },
    { key: "department", label: "Department", placeholder: "Engineering", type: "text" },
    { key: "personalEmail", label: "Personal Email", placeholder: "jane@gmail.com", type: "email" },
    { key: "proEmail", label: "Pro Email", placeholder: "jane@company.com", type: "email" },
    { key: "phone", label: "Phone", placeholder: "+1 555 000 0000", type: "tel" },
    { key: "profilePicture", label: "Profile Picture URL", placeholder: "https://...", type: "url" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop bg-black/60 p-4">
      <div className="glass-strong rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-display font-bold text-white">
              {employee ? "Edit Employee" : "Add Employee"}
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

          {employee?.employeeId && (
            <div className="mb-5 px-3 py-2 bg-accent/5 border border-accent/20 rounded-lg flex items-center gap-2">
              <span className="text-xs text-ink-400">Employee ID:</span>
              <span className="font-mono text-sm text-accent font-bold">#{employee.employeeId}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map(({ key, label, placeholder, type }) => (
                <div key={key} className={key === "name" ? "sm:col-span-2" : ""}>
                  <label className="text-xs text-ink-400 font-medium block mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[key] || ""}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder={placeholder}
                    className="
                      w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border
                      text-white text-sm placeholder:text-ink-600
                      input-focus transition-all duration-200
                    "
                  />
                </div>
              ))}
            </div>

            {/* Bio */}
            <div>
              <label className="text-xs text-ink-400 font-medium block mb-1.5">Bio</label>
              <textarea
                value={form.bio || ""}
                onChange={(e) => set("bio", e.target.value)}
                placeholder="Short professional bio..."
                rows={3}
                className="
                  w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border
                  text-white text-sm placeholder:text-ink-600 resize-none
                  input-focus transition-all duration-200
                "
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-xs text-ink-400 font-medium block mb-1.5">Role</label>
              <select
                value={form.roleId || ""}
                onChange={(e) => set("roleId", e.target.value)}
                className="
                  w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border
                  text-white text-sm input-focus transition-all duration-200 appearance-none
                "
              >
                <option value="">— No role assigned —</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
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
                className="flex-1 py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark disabled:opacity-40 transition-all btn-shimmer"
              >
                {loading ? "Saving..." : employee ? "Save Changes" : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function EmployeeRow({ emp, roles, onEdit, onDelete }) {
  const avatar = emp.profilePicture || `${DEFAULT_AVATAR}${emp.employeeId}`;
  const role = roles.find((r) => r.id === emp.roleId);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${emp.name}? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await onDelete(emp.id);
      toast.success("Employee removed");
    } catch {
      toast.error("Failed to delete");
      setDeleting(false);
    }
  };

  return (
    <tr className="border-b border-surface-border hover:bg-surface-float/50 transition-colors group">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={emp.name}
            className="w-9 h-9 rounded-xl object-cover border border-surface-border flex-shrink-0"
            onError={(e) => { e.target.src = `${DEFAULT_AVATAR}${emp.employeeId}`; }}
          />
          <div>
            <div className="text-sm font-medium text-white">{emp.name}</div>
            <div className="text-xs text-ink-500">{emp.department || "—"}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="font-mono text-sm text-accent bg-accent/10 px-2 py-0.5 rounded-md border border-accent/20">
          #{emp.employeeId}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-ink-400 font-mono text-xs hidden md:table-cell">
        {emp.proEmail || "—"}
      </td>
      <td className="px-4 py-3 text-xs text-ink-400 hidden lg:table-cell">
        {emp.phone || "—"}
      </td>
      <td className="px-4 py-3 hidden sm:table-cell">
        {role ? (
          <span className="text-xs px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300">
            {role.name}
          </span>
        ) : (
          <span className="text-xs text-ink-600">No role</span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(emp)}
            className="p-1.5 rounded-lg hover:bg-surface-float transition-colors text-ink-400 hover:text-white"
            title="Edit"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 2l2 2-7 7H3V9l7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-ink-400 hover:text-red-400"
            title="Delete"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 3.5h10M5 3.5V2.5h4v1M5.5 6.5v4M8.5 6.5v4M3 3.5l.75 8.5h6.5L11 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | "add" | employee object

  const load = async () => {
    setLoading(true);
    try {
      const [emps, rols] = await Promise.all([getAllEmployees(), getAllRoles()]);
      setEmployees(emps);
      setRoles(rols);
    } catch {
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = employees.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.name?.toLowerCase().includes(q) ||
      e.employeeId?.includes(q) ||
      e.proEmail?.toLowerCase().includes(q) ||
      e.department?.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Employees</h1>
          <p className="text-sm text-ink-400 mt-0.5">
            {employees.length} team member{employees.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setModal("add")}
          className="btn-shimmer flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark transition-all glow-accent-sm whitespace-nowrap"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          ["Total", employees.length, "text-white"],
          ["With Role", employees.filter((e) => e.roleId).length, "text-purple-300"],
          ["With Email", employees.filter((e) => e.proEmail).length, "text-blue-300"],
          ["Roles", roles.length, "text-accent"],
        ].map(([label, count, color]) => (
          <div key={label} className="glass rounded-xl p-4 border-surface-border">
            <div className={`text-2xl font-display font-bold ${color}`}>{count}</div>
            <div className="text-xs text-ink-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M9.5 9.5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, ID, email..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-raised border border-surface-border text-white text-sm placeholder:text-ink-600 input-focus transition-all max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden border border-surface-border">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-ink-500">Loading employees...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-surface-float border border-surface-border flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <p className="text-ink-400 text-sm">{search ? "No results found" : "No employees yet"}</p>
            {!search && (
              <button
                onClick={() => setModal("add")}
                className="mt-3 text-sm text-accent hover:text-accent-muted transition-colors"
              >
                Add your first employee →
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-border">
                  {["Employee", "ID", "Pro Email", "Phone", "Role", ""].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-ink-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp) => (
                  <EmployeeRow
                    key={emp.id}
                    emp={emp}
                    roles={roles}
                    onEdit={(e) => setModal(e)}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal !== null && (
        <EmployeeModal
          employee={modal === "add" ? null : modal}
          roles={roles}
          onClose={() => setModal(null)}
          onSaved={load}
        />
      )}
    </div>
  );
}
