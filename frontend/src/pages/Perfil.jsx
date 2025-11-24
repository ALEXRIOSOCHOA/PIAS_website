import React, { useState } from "react";
import EditarPerfilModal from "../components/Perfil/EditarPerfilModal";
import ReiniciarPasswordModal from "../components/Perfil/ReiniciarPasswordModal";

const Perfil = () => {
  const [userData, setUserData] = useState({
    nombre: "John Jakes",
    correo: "j.jackes@iaasa.ac.at",
    usuario: "JohnJakes",
    telefono: "+43 6769525758",
    estado: "Campeche",
    municipio: "Candelaria",
    orgSaberes: "Nombre de la organización",
    organizacion: "Nombre de la institución",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);

  const handleSave = (updatedData) => {
    setUserData(updatedData);
    setIsOpen(false);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-semibold text-[#0F0F0F] mb-6">Cuenta</h1>

      <div className="bg-white rounded-lg shadow-sm p-8 max-full">
        {/* TABLA COMPLETA — UNA COLUMNA LABEL, OTRA VALUE */}
        <div className="space-y-4">
          <Row label="Nombre" value={userData.nombre} />
          <Row label="Correo electrónico" value={userData.correo} />
          <Row label="Nombre de usuario" value={userData.usuario} />

          <Row
            label="Contraseña"
            value={
              <span
                className="text-[#54B046] font-semibold cursor-pointer"
                onClick={() => setIsResetOpen(true)}
              >
                Reiniciar
              </span>
            }
          />

          <Row label="Número de teléfono" value={userData.telefono} />
          <Row label="Estado" value={userData.estado} />
          <Row label="Municipio" value={userData.municipio} />
          <Row label="Organización SaBERES" value={userData.orgSaberes} />
          <Row label="Organización" value={userData.organizacion} />
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Editar
          </button>
        </div>
      </div>

      {isOpen && (
        <EditarPerfilModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          userData={userData}
          onSave={handleSave}
        />
      )}
      {isResetOpen && (
        <ReiniciarPasswordModal
          onClose={() => setIsResetOpen(false)}
          onSave={(data) => {
            console.log("Nueva contraseña:", data);
            setIsResetOpen(false);
          }}
        />
      )}
    </div>
  );
};

const Row = ({ label, value }) => (
  <div className="border-b border-gray-300 pb-3 grid grid-cols-[300px_1fr]">
    <span className="text-gray-900 font-medium text-[16px]">{label}</span>
    <span className="text-gray-500 text-[16px] text-left">{value}</span>
  </div>
);

export default Perfil;
