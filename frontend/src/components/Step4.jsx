import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Step4({ onNext, onBack }) {
  const [belongsSabOrg, setBelongsSabOrg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (belongsSabOrg === null) {
      alert("Por favor selecciona una opción.");
      return;
    }

    onNext({ belongsSabOrg: belongsSabOrg });
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
          <p className="text-sm text-gray-600">Paso 4 de 7</p>
        </div>

        {/* Contenedor que centra el título y el formulario */}
        <div className="flex-1 flex flex-col justify-center items-start w-1/3 mx-auto gap-4">
          <h2 className="text-3xl font-semibold mb-6 text-start">
            ¿Eres parte del consorcio SAbERES?
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            <div className="flex gap-4">
              <label
                className={`flex items-center w-72 p-4 border rounded-xl cursor-pointer
                ${
                  belongsSabOrg === true
                    ? "border-green-600 bg-green-100"
                    : "border-gray-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="consortium"
                  value="yes"
                  checked={belongsSabOrg === true}
                  onChange={() => setBelongsSabOrg(true)}
                  className="hidden"
                />
                <span className="ml-4 text-lg font-medium">Yes</span>
              </label>

              <label
                className={`flex items-center w-72 p-4 border rounded-xl cursor-pointer
                ${
                  belongsSabOrg === false
                    ? "border-green-600 bg-green-100"
                    : "border-gray-300 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="consortium"
                  value="no"
                  checked={belongsSabOrg === false}
                  onChange={() => setBelongsSabOrg(false)}
                  className="hidden"
                />
                <span className="ml-4 text-lg font-medium">No</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-52 bg-black text-white py-3 rounded-xl mt-4 hover:bg-gray-800 transition"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
