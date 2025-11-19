import { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";


export default function Step3({ onNext, onBack, selectedState }) {
  const [municipalities, setMunicipalities] = useState([]);
  const [municipalityId, setMunicipalityId] = useState("");

  // 🔹 Cargar municipios desde el backend usando el state_id
  useEffect(() => {
    if (!selectedState) return;

    fetch(`${process.env.REACT_APP_API_URL}/api/locations/municipalities/${selectedState}`)
      .then((res) => res.json())
      .then(setMunicipalities)
      .catch((err) => console.error("Error loading municipalities:", err));
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!municipalityId) {
      alert("Por favor selecciona un municipio.");
      return;
    }

    onNext({ municipality_id: Number(municipalityId) });
  };

  return (
    <div className="w-full min-h-screen bg-[#EDF0F2] flex justify-center p-8">
      <div className="bg-white rounded-2xl shadow-md w-full p-10 flex flex-col">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            <AiOutlineArrowLeft className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-600">Paso 3 de 7</p>
        </div>

        {/* Contenedor que centra el título y el formulario */}
        <div className="flex-1 flex flex-col justify-center items-start w-1/3 mx-auto gap-4">
          <h2 className="text-3xl font-semibold mb-6 text-start">
            Selecciona tu Municipio
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-start w-full"
          >
            <div className="relative w-full mt-6">
              <select
                value={municipalityId}
                onChange={(e) => setMunicipalityId(e.target.value)}
                required
                className="peer block w-full border-b border-gray-300 text-gray-900 bg-transparent focus:outline-none py-2"
              >
                <option value="" disabled hidden></option>{" "}
                {/* Placeholder oculto */}
                {municipalities.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>

              <label
                className="absolute left-0 text-gray-400 text-base top-2 transition-all duration-200
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
               peer-focus:-top-4 peer-focus:text-sm peer-focus:text-green-600
               peer-valid:-top-4 peer-valid:text-sm peer-valid:text-green-600
               pointer-events-none"
              >
                Selecciona tu Municipio
              </label>
            </div>

            <button
              type="submit"
              className="w-52 bg-black text-white py-3 rounded-xl mt-4 hover:bg-gray-800 transition"
            >
              Continuar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
