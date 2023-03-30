import React from "react";
import "./App.css";
import { useState } from "react";
import { API } from "./config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./paginas/Login";
import Home from "./paginas/Home";
import Contrasena from "./paginas/Contrasena";
import CambiarPassword from "./paginas/CambiarPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cambiar-contrasena" element={<Contrasena/>}/>
      <Route path="/actualizar-password" element={<CambiarPassword/>}/>
      <Route path="*" element={<h1>404: Not Found</h1>} />
    </Routes>
  );
}

export default App;
