import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout({headerText}) {
  return (
    <div className="min-h-screen bg-[#EDF0F2] font-sans text-[#323334] flex">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 ml-[302px] p-6">
        {/* Header global */}

        <div className="flex items-center px-6 justify-between">
          <h2 className="text-2xl font-semibold">{headerText}</h2>
          <Header />
        </div>

        {/* Aquí carga cada página (Dashboard, Prácticas, etc.) */}
        <Outlet />
      </div>
    </div>
  );
}
