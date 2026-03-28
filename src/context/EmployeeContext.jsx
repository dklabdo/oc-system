// src/context/EmployeeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getEmployeeByCode, getAppsForEmployee } from "../firebase/employees";
import { startSession, endSession } from "../firebase/sessions";

const LS_KEY = "nexawork_employee";
const SESSION_KEY = "nexawork_session_id";

const EmployeeContext = createContext(null);

export function EmployeeProvider({ children }) {
  const [employee, setEmployee] = useState(null);
  const [apps, setApps] = useState([]);
  const [loadingEmployee, setLoadingEmployee] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [showCreateMeetingModal, setShowCreateMeetingModal] = useState(false);

  // On mount, try to restore from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY);
    const storedSession = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setEmployee(parsed);
        if (storedSession) setSessionId(storedSession);
        // Refresh apps
        getAppsForEmployee(parsed)
          .then(setApps)
          .catch(() => {});
      } catch {}
    }
    setLoadingEmployee(false);
  }, []);

  const loginEmployee = async (code) => {
    const emp = await getEmployeeByCode(code);
    if (!emp) throw new Error("Employee ID not found");
    localStorage.setItem(LS_KEY, JSON.stringify(emp));
    setEmployee(emp);
    const empApps = await getAppsForEmployee(emp);
    setApps(empApps);

    // Start a new session
    try {
      const sid = await startSession(emp);
      setSessionId(sid);
      localStorage.setItem(SESSION_KEY, sid);
    } catch (err) {
      console.error("Failed to start session:", err);
    }

    return emp;
  };

  const logoutEmployee = async () => {
    // End the active session
    try {
      const sid = sessionId || localStorage.getItem(SESSION_KEY);
      if (sid) await endSession(sid);
    } catch (err) {
      console.error("Failed to end session:", err);
    }

    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(SESSION_KEY);
    setEmployee(null);
    setApps([]);
    setSessionId(null);
  };

  return (
    <EmployeeContext.Provider
      value={{showCreateMeetingModal, setShowCreateMeetingModal , employee, apps, loadingEmployee, loginEmployee, logoutEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  return useContext(EmployeeContext);
}
