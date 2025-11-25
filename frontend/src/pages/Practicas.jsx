// src/pages/Practicas.jsx
import React, { useState } from "react";
import PracticasAbE from "../components/Practicas/PracticasAbE";
import UsoDeSuelo from "../components/Practicas/UsoDeSuelo";
import AnalisisDeVulnerabilidad from "../components/Practicas/AnalisisDeVulnerabilidad";

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
  const [activeTab, setActiveTab] = useState("Prácticas AbE");

  const tabs = [
    "Prácticas AbE",
    "Cambio de uso de suelo",
    "Análisis de vulnerabilidad",
  ];

  return (
    <div className="w-full relative p-4 md:p-6 font-montserrat min-h-screen">
      {/* Tabs */}
      <div className="w-full h-auto min-h-[54px] bg-white rounded-lg px-4 md:px-6 flex flex-nowrap overflow-x-auto items-center gap-6 shadow-sm mb-6">
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
      {activeTab === "Prácticas AbE" && <PracticasAbE />}
      {activeTab === "Cambio de uso de suelo" && <UsoDeSuelo />}
      {activeTab === "Análisis de vulnerabilidad" && (
        <AnalisisDeVulnerabilidad />
      )}
    </div>
  );
}
