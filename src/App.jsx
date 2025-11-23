import React from "react";
import SideBar from "./Component/SideBar";
import Nav from "./Component/Nav";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import DashboardPage from "./Pages/DashboardPage";
import EnseignantPage from "./Pages/EnseignantPage";
import AnoncePage from "./Pages/AnoncePage";
import ModulePage from "./Pages/ModulePage";
import SectionPage from "./Pages/SectionPage";
import EtudiantPage from "./Pages/EtudiantPage";
import PlanPage from "./Pages/PlanPage";
import SettingPage from "./Pages/SettingPage";
import Departement from "./Component/Departement";
import DeptPage from "./Pages/DeptPage";
import EnProfile from "./Pages/EnProfile";
import ProtectedRoute from "./Logic/ProtectedRoute";

function App() {
  const role = localStorage.getItem("role");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          {role == "Admin" && (
            <>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/enseignant"
                element={
                  <ProtectedRoute>
                    <EnseignantPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/anonce"
                element={
                  <ProtectedRoute>
                    <AnoncePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/module"
                element={
                  <ProtectedRoute>
                    <ModulePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/section"
                element={
                  <ProtectedRoute>
                    <SectionPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/etudiant"
                element={
                  <ProtectedRoute>
                    <EtudiantPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/plan"
                element={
                  <ProtectedRoute>
                    <PlanPage />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          {role == "Teacher" && (
            <>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/anonce"
                element={
                  <ProtectedRoute>
                    <AnoncePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/enseignantSpace"
                element={
                  <ProtectedRoute>
                    <EnProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/etudiant"
                element={
                  <ProtectedRoute>
                    <EtudiantPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/plan"
                element={
                  <ProtectedRoute>
                    <PlanPage />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          {role == "SuperAdmin" && (
            <>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/departement"
                element={
                  <ProtectedRoute>
                    <DeptPage />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          <Route
                path="*"
                element={
                  <ProtectedRoute>
                    <p>erreur</p>
                  </ProtectedRoute>
                }
              />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
