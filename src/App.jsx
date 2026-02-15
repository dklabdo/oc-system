import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";


function App() {
  const role = localStorage.getItem("role");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
