import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Notificacion from "./Notificacion";

const Header = ({ userInitials }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const notificaciones = [
    {
      titulo: "Acción colectiva",
      mensaje: "j.jackes@iiasa.ac.at les ha invitado a una acción colectiva",
      tiempo: "hace 5 horas",
      tipoAccion: true,
    },
    {
      titulo: "Otro aviso",
      mensaje: "Mensaje de prueba",
      tiempo: "hace 1 hora",
      tipoAccion: false,
    },
  ];

  return (
    <header className="flex items-center justify-end px-4 py-1">
      <div className="flex items-center space-x-4">
        {/* Botón de Notificaciones */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition"
        >
          <IoNotificationsOutline className="w-6 h-6" />
        </button>

        {isOpen && (
          <div
            style={{
              width: 342,
              height: 629,
              position: "absolute",
              right: 120,
              top: 80,
              background: "white",
              borderRadius: 8,
              border: "1px solid #E3E5E6",
              overflowY: "auto",
              padding: 16,
              zIndex: 1000
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 16 }}>
              Notificaciones
            </div>
            <div
              style={{
                color: "#54B046",
                cursor: "pointer",
                position: "absolute",
                right: 16,
                top: 16,
              }}
            >
              Ver todo
            </div>

            {notificaciones.map((notif, index) => (
              <Notificacion
                key={index}
                titulo={notif.titulo}
                mensaje={notif.mensaje}
                tiempo={notif.tiempo}
                tipoAccion={notif.tipoAccion}
              />
            ))}
          </div>
        )}

        {/* Avatar */}
        <button
          onClick={() => navigate("/perfil")}
          className="w-12 h-12 rounded-full bg-[#54B046] flex items-center justify-center text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          {userInitials}JJ
        </button>
      </div>
    </header>
  );
};

export default Header;
