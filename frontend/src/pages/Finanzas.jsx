// src/pages/Practicas.jsx
import React, { useState } from "react";
import TendenciasDelMercado from "../components/Finanzas/Informacion/TendenciasDelMercado";
import AnalisisDeLaDemanda from "../components/Finanzas/Informacion/AnalisisDeLaDemanda";
import IngresosPorPractica from "../components/Finanzas/Informacion/IngresosPorPractica";

// Componente reutilizable para las pestañas
const TabItem = ({ title, isActive, onClick }) => (
  <div
    className={`h-full px-2 flex items-center cursor-pointer transition-colors duration-200 ${
      isActive
        ? "border-b-[1.5px] border-[#54B046]"
        : "border-b-[1.5px] border-transparent hover:border-[#98999A]"
    }`}
    onClick={onClick}
  >
    <span
      className={`text-[16px] font-medium ${
        isActive ? "text-[#54B046]" : "text-[#98999A]"
      }`}
    >
      {title}
    </span>
  </div>
);

export default function Practicas() {
  const [activeTab, setActiveTab] = useState("Tendencias del mercado");

  const tabs = [
    "Tendencias del mercado",
    "Análisis de la demanda",
    "Ingresos por práctica AbE",
  ];

  return (
    <div className="w-full relative p-4 md:p-6 font-montserrat min-h-screen">
      {/* Tabs */}
      <div className="w-full h-[54px] min-h-[54px] bg-white rounded-lg px-4 md:px-6 flex flex-nowrap overflow-x-auto items-center gap-6 shadow-sm mb-6">
        {tabs.map((tabTitle) => (
          <TabItem
            key={tabTitle}
            title={tabTitle}
            isActive={activeTab === tabTitle}
            onClick={() => setActiveTab(tabTitle)}
          />
        ))}
      </div>

      {/* Contenido por pestaña */}
      {activeTab === "Tendencias del mercado" && <TendenciasDelMercado />}
      {activeTab === "Análisis de la demanda" && <AnalisisDeLaDemanda />}
      {activeTab === "Ingresos por práctica AbE" && <IngresosPorPractica />}
    </div>
  );
}
