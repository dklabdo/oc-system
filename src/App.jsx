// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

// Pages
import EntryPage from "./pages/EntryPage";
import DashboardLogin from "./pages/DashboardLogin";
import EmployeesPage from "./pages/EmployeesPage";
import RolesPage from "./pages/RolesPage";
import SessionsPage from "./pages/SessionsPage";
import InvoicesPage from "./pages/InvoicesPage";
import ThemeProvider from "./context/ThemeProvider";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
      <AuthProvider>
        <EmployeeProvider>
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: "var(--surface-raised)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                fontSize: "13px",
                fontFamily: "'Cabinet Grotesk', sans-serif",
                padding: "10px 14px",
              },
              success: {
                iconTheme: { primary: "#295EFF", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#f87171", secondary: "#111" },
              },
            }}
          />

          <Routes>
            {/* ── Employee portal ── */}
            <Route path="/" element={<EntryPage />} />

            {/* ── Admin dashboard ── */}
            <Route path="/dashboardauth" element={<DashboardLogin />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="roles" element={<RolesPage />} />
              <Route path="sessions" element={<SessionsPage />} />
              <Route path="invoices" element={<InvoicesPage />} />
              {/* Default redirect inside dashboard */}
              <Route index element={<Navigate to="employees" replace />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </EmployeeProvider>
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
