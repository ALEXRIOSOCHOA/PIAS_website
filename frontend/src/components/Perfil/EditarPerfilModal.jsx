import React, { useState } from "react";

const EditarPerfilModal = ({ onClose, userData, onSave }) => {
  // Estado interno editable
  const [form, setForm] = useState({ ...userData });

  // Manejar cambios
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  // Guardar cambios (se envían al componente Perfil)
  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[520px] max-h-[90vh] overflow-y-auto rounded-xl p-8 relative shadow-xl">

        {/* Título */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Editar configuración
        </h2>

        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* FORMULARIO */}
        <div className="space-y-6">

          {/* Campo Nombre */}
          <Field
            label="Nombre"
            value={form.nombre}
            onChange={(v) => handleChange("nombre", v)}
          />

          {/* Correo */}
          <Field
            label="Correo electrónico"
            value={form.correo}
            onChange={(v) => handleChange("correo", v)}
          />

          {/* Usuario */}
          <Field
            label="Nombre de usuario"
            value={form.usuario}
            onChange={(v) => handleChange("usuario", v)}
          />

          {/* Teléfono */}
          <Field
            label="Número de teléfono"
            value={form.telefono}
            onChange={(v) => handleChange("telefono", v)}
          />

          {/* Estado */}
          <Field
            label="Seleccione su estado"
            value={form.estado}
            onChange={(v) => handleChange("estado", v)}
          />

          {/* Municipio */}
          <Field
            label="Selecciona tu municipio"
            value={form.municipio}
            onChange={(v) => handleChange("municipio", v)}
          />

          {/* Org SaBERES */}
          <Field
            label="Organización SaBERES"
            value={form.orgSaberes}
            onChange={(v) => handleChange("orgSaberes", v)}
          />

          {/* Organización */}
          <Field
            label="Organización"
            value={form.organizacion}
            onChange={(v) => handleChange("organizacion", v)}
          />
        </div>

        {/* Botón Guardar */}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-black text-white rounded-lg py-3 text-lg hover:bg-gray-800"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default EditarPerfilModal;

// 🧩 Componente Field reutilizable
const Field = ({ label, value, onChange }) => (
  <div className="border-b pb-3">
    <label className="text-xs text-gray-500">{label}</label>
    <input
      type="text"
      className="w-full mt-1 text-gray-900 text-lg bg-transparent outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
