// src/components/ProtectedRoute.js
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Auto-redirect on token removal
    if (!isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null; // avoid rendering protected pages

  return children;
}
