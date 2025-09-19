import React from "react";
import SideBar from "./Component/SideBar";
import Nav from "./Component/Nav";
import { BrowserRouter } from "react-router-dom";
import { Routes , Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import DashboardPage from "./Pages/DashboardPage";
import EnseignantPage from "./Pages/EnseignantPage";
import AnoncePage from "./Pages/AnoncePage";
import ModulePage from "./Pages/ModulePage";
import SectionPage from "./Pages/SectionPage";
import EtudiantPage from "./Pages/EtudiantPage";
import PlanPage from "./Pages/PlanPage";
import SettingPage from "./Pages/SettingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/enseignant" element={<EnseignantPage />} />
          <Route path="/anonce" element={<AnoncePage />} />
          <Route path="/module" element={<ModulePage />} />
          <Route path="/section" element={<SectionPage />} />
          <Route path="/etudiant" element={<EtudiantPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
