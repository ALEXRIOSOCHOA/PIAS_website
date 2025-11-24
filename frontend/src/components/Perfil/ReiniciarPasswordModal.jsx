import React, { useState } from "react";

const ReiniciarPasswordModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (passwordInvalid || passwordsMismatch) return;
    onSave(formData);
  };

  const validatePassword = (password) => {
    if (!password) return false;
    const minLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasNumber && hasUppercase && hasSymbol;
  };

  const passwordInvalid = !validatePassword(formData.newPassword);
  const passwordsMismatch =
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword !== formData.confirmPassword;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      {" "}
      <div className="bg-white w-[520px] max-h-[90vh] overflow-y-auto rounded-xl p-8 relative shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Restablecer contraseña
        </h2>

        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <p className="text-gray-900 mb-4 text-sm">
          Después de cambiar su contraseña, se cerrará su sesión y deberá
          iniciar sesión nuevamente con su nueva contraseña.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Contraseña actual <span className="text-green-600">*</span>
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border-b border-gray-300 py-2 text-gray-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Nueva contraseña <span className="text-green-600">*</span>
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full border-b py-2 text-gray-900 focus:outline-none ${
                passwordInvalid ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          {/* Requisitos condicional */}
          {passwordInvalid && (
            <div className="bg-green-50 p-4 rounded-md mb-6 text-sm text-gray-800">
              La contraseña debe tener al menos{" "}
              <span className="font-semibold">6 caracteres</span>, contener{" "}
              <span className="font-semibold">1 número</span>,{" "}
              <span className="font-semibold">1 letra mayúscula</span> y{" "}
              <span className="font-semibold">1 símbolo</span>.
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Confirmar nueva contraseña{" "}
              <span className="text-green-600">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border-b border-gray-300 py-2 text-gray-900 focus:outline-none ${
                passwordsMismatch ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
        </div>
        {passwordsMismatch && (
          <div className="bg-red-100 p-4 rounded-md mt-4 mb-6 text-sm text-red-700">
            {" "}
            La contraseñas no coinciden. Revise los
            criterios e inténtelo de nuevo.{" "}
          </div>
        )}

        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 rounded-lg text-gray-900 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-lg text-white ${
              passwordInvalid || passwordsMismatch
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
            disabled={passwordInvalid || passwordsMismatch}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReiniciarPasswordModal;
