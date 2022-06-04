import React from "react";
import {  Routes,  Route,} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
      <Route path="logged" element={<Home />} />
    </Routes>
  );
}

export default App;
