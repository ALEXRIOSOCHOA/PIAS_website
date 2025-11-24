import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Reportes from "./pages/Reportes";
import Perfil from "./pages/Perfil";
import Practicas from "./pages/Practicas";
import Predashboard from "./components/verificacionExitosa";
import MainLayout from "./Main/MainLayoud";
import "./App.css";

// Wrapper para pasar headerText al layout
function LayoutWrapper({ headerText }) {
  return <MainLayout headerText={headerText} />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas SIN sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/predashboard" element={<Predashboard />} />

        {/* Rutas CON sidebar */}
        <Route element={<LayoutWrapper headerText="Reportes" />}>
          <Route path="/reportes" element={<Reportes />} />
          {/* Aquí puedes agregar más rutas internas con distintos headerText */}
        </Route>
        <Route element={<LayoutWrapper headerText="Perfil" />}>
          <Route path="/perfil" element={<Perfil />} />
          {/* Aquí puedes agregar más rutas internas con distintos headerText */}
        </Route>
        <Route element={<LayoutWrapper headerText="Practicas" />}>
          <Route path="/practicas" element={<Practicas />} />
          {/* Aquí puedes agregar más rutas internas con distintos headerText */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
