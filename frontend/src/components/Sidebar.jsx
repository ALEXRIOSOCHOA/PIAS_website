import React, { useState } from "react";
import logo from "../assets/Logo_saberes_xs.png";
import { Link } from "react-router-dom";

import iconPracticas from "../assets/icons/location-pin.svg";
import iconResultados from "../assets/icons/clipboard-text.svg";
import iconReportes from "../assets/icons/file-download.svg";
import iconFinanzas from "../assets/icons/Chart.svg";
import iconClima from "../assets/icons/sun.svg";
import iconComunidad from "../assets/icons/users-group.svg";
import iconUsuarios from "../assets/icons/user.svg";
import iconFlechaAbajo from "../assets/icons/angle-down.svg";

export default function Sidebar() {
  const [isComunidadOpen, setIsComunidadOpen] = useState(false);
  const [isFinanzasOpen, setIsFinanzasOpen] = useState(false);

  const toggleComunidad = () => {
    setIsComunidadOpen(!isComunidadOpen);
  };

  const toggleFinanzas = () => {
    setIsFinanzasOpen(!isFinanzasOpen);
  };

  return (
    <aside className="w-[302px] bg-white rounded-md p-6 shrink-0 h-screen overflow-y-auto fixed">
      <img src={logo} alt="logo" className="mb-8" />

      <nav className="flex flex-col gap-3">

        {/* Enlace Prácticas */}
        <button>
          <Link
            to="/practicas"
            className="flex items-center gap-3 text-left py-3 px-4 rounded-md font-medium hover:bg-gray-100 transition duration-150"
          >
            <img src={iconPracticas} alt="icon" className="w-5 h-5" />
            Prácticas
          </Link>
        </button>

        {/* Enlace Resultados */}
        <button className="flex items-center gap-3 text-left py-3 px-4 bg-[#F2F2F2] rounded-md font-medium hover:bg-gray-100 transition duration-150">
          <img src={iconResultados} alt="icon" className="w-5 h-5" />
          Resultados
        </button>

        {/* Finanzas con submenú */}
        <div className="flex flex-col">
          <button
            className="flex items-center justify-between text-left py-3 px-4 rounded-md font-medium hover:bg-gray-100 transition duration-150"
            onClick={toggleFinanzas}
          >
            <span className="flex items-center gap-3">
              <img src={iconFinanzas} alt="icon" className="w-5 h-5" />
              Finanzas
            </span>

            <span
              className={`transform transition-transform duration-300 ${
                isFinanzasOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <img src={iconFlechaAbajo} alt="icon" className="w-5 h-5" />
            </span>
          </button>

          {/* Submenú Finanzas */}
          <div
            className={`overflow-hidden ml-8 pl-4 border-l-2 border-[#54B046]
              transition-all duration-300 ease-in-out
              ${
                isFinanzasOpen
                  ? "max-h-40 opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-2"
              }
            `}
          >
            <div className="flex flex-col gap-2 mt-2">
              <button className="flex items-center gap-3 py-2 px-2 rounded-md text-sm hover:bg-gray-100 transition">
                Información
              </button>
            </div>
          </div>
        </div>

        {/* Clima */}
        <button className="flex items-center gap-3 text-left py-3 px-4 rounded-md font-medium hover:bg-gray-100 transition duration-150">
          <img src={iconClima} alt="icon" className="w-5 h-5" />
          Pronóstico del clima
        </button>

        {/* Comunidad con submenú */}
        <div className="flex flex-col">
          <button
            className="flex items-center justify-between text-left py-3 px-4 rounded-md font-medium hover:bg-gray-100 transition duration-150"
            onClick={toggleComunidad}
          >
            <span className="flex items-center gap-3">
              <img src={iconComunidad} alt="icon" className="w-5 h-5" />
              Comunidad
            </span>

            <span
              className={`transform transition-transform duration-300 ${
                isComunidadOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <img src={iconFlechaAbajo} alt="icon" className="w-5 h-5" />
            </span>
          </button>

          <div
            className={`overflow-hidden ml-8 pl-4 border-l-2 border-[#54B046]
              transition-all duration-300 ease-in-out
              ${
                isComunidadOpen
                  ? "max-h-96 opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-2"
              }
            `}
          >
            <div className="flex flex-col gap-2 mt-2">
              <button className="flex items-center gap-3 py-2 px-2 rounded-md text-sm hover:bg-gray-100 transition">
                Noticias
              </button>
              <button className="flex items-center gap-3 py-2 px-2 rounded-md text-sm hover:bg-gray-100 transition">
                Boletín
              </button>
              <button className="flex items-center gap-3 py-2 px-2 rounded-md text-sm hover:bg-gray-100 transition">
                Acción colectiva
              </button>
              <button className="flex items-center gap-3 py-2 px-2 rounded-md text-sm hover:bg-gray-100 transition">
                Gobierno
              </button>
            </div>
          </div>
        </div>

        {/* Reportes */}
        <button>
          <Link
            to="/reportes"
            className="flex items-center gap-3 text-left py-3 px-4 rounded-md font-medium hover:bg-gray-100 transition duration-150"
          >
            <img src={iconReportes} alt="icon" className="w-5 h-5" />
            Reportes
          </Link>
        </button>

        {/* Usuarios */}
        <button className="flex items-center gap-3 text-left py-3 px-4 rounded-md font-medium hover:bg-gray-100 transition duration-150">
          <img src={iconUsuarios} alt="icon" className="w-5 h-5" />
          Usuarios
        </button>
      </nav>
    </aside>
  );
}
