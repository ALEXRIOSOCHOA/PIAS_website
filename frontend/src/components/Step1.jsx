import { useState } from "react";
import logo from "../assets/logo_saberes.png";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Step1({ onNext }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.accepted) {
      alert("Debes aceptar los Términos y Condiciones.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }


    const step1Data = {
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    onNext(step1Data);
  };

  return (
    <div className="w-full min-h-screen bg-[#EDF0F2] flex justify-center items-center p-8">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-5xl flex overflow-hidden">
        {/* Left form section */}
        <div className="w-1/2 p-10 flex flex-col justify-start items-start">
          <div className="flex items-center gap-4 mb-16">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              <AiOutlineClose className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-600">Paso 1 de 7</p>
          </div>
          <h2 className="text-3xl font-medium mb-8">Crear cuenta</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative w-full mt-6">
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="Nombre Completo"
                className="peer block w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none py-2"
              />
              <label
                className="absolute left-0 text-gray-400 text-base 
               top-2 transition-all duration-200
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
               peer-focus:-top-4 peer-focus:text-sm peer-focus:text-green-600
               peer-valid:-top-4 peer-valid:text-sm peer-valid:text-green-600
               pointer-events-none"
              >
                Nombre Completo
              </label>
            </div>

            <div className="relative w-full mt-6">
              <input
                type="email"
                name="email"
                placeholder="Correo electronico"
                value={formData.email}
                onChange={handleChange}
                required
                className="peer block w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none py-2"
              />
              <label
                className="absolute left-0 text-gray-400 text-base 
               top-2 transition-all duration-200
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
               peer-focus:-top-4 peer-focus:text-sm peer-focus:text-green-600
               peer-valid:-top-4 peer-valid:text-sm peer-valid:text-green-600
               pointer-events-none"
              >
                Correo electronico
              </label>
            </div>

            <div className="relative w-full mt-6">
              <input
                type="tel"
                name="phone"
                placeholder="Numero telefonico"
                value={formData.phone}
                onChange={handleChange}
                required
                className="peer block w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none py-2"
              />
              <label
                className="absolute left-0 text-gray-400 text-base 
               top-2 transition-all duration-200
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
               peer-focus:-top-4 peer-focus:text-sm peer-focus:text-green-600
               peer-valid:-top-4 peer-valid:text-sm peer-valid:text-green-600
               pointer-events-none"
              >
                Numero telefonico
              </label>
            </div>

            <div className="relative w-full mt-6">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                className="peer block w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none py-2"
              />
              <label
                className="absolute left-0 text-gray-400 text-base 
               top-2 transition-all duration-200
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
               peer-focus:-top-4 peer-focus:text-sm peer-focus:text-green-600
               peer-valid:-top-4 peer-valid:text-sm peer-valid:text-green-600
               pointer-events-none"
              >
                Contraseña
              </label>
            </div>
            <div className="relative w-full mt-6">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="peer block w-full border-b border-gray-300 text-gray-900 placeholder-transparent focus:outline-none py-2"
            />
            <label
                className="absolute left-0 text-gray-400 text-base 
               top-2 transition-all duration-200
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
               peer-focus:-top-4 peer-focus:text-sm peer-focus:text-green-600
               peer-valid:-top-4 peer-valid:text-sm peer-valid:text-green-600
               pointer-events-none"
              >
                Confirmar Contraseña
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="accepted"
                checked={formData.accepted}
                onChange={handleChange}
              />
              <label>
                I’m accepting{" "}
                <span className="text-green-600 font-semibold">
                  SaBERES’s Terms & Conditions
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              Continuar
            </button>
          </form>
        </div>

        {/* Right image section */}
        <div className="w-1/2 bg-[#FFFFF] relative rounded-r-2xl flex items-center justify-center">
          <div
            style={{
              width: "91%",
              height: "93%",
              background: "#EEF7EC",
              borderRadius: 12,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <img
              style={{
                width: 182,
                height: 178,
                objectFit: "contain", // mantiene proporciones
              }}
              src={logo}
              alt="Logo SAbERES"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
