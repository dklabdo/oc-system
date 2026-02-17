import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import ERP from "./Pages/ERP";


function App() {
  const role = localStorage.getItem("role");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/app" element={<ERP />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
