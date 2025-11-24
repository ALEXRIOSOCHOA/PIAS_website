import { useState } from "react";
import LoadingSvg from "./Loading";

export default function EmailVerification({ email, onVerify }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setError("");

    if (code.length !== 6) {
      setError("El código debe tener 6 dígitos.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      console.log("esto es data: ", data);
      if (res.ok && data.verified) {
        localStorage.setItem("token", data.token);
        onVerify(data.token);
      } else {
        setError("El código es incorrecto.");
      }
    } catch (err) {
      setError("Error al verificar. Inténtalo más tarde.");
    }

    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <LoadingSvg size={400} pulse />
        </div>
      )}

      <div className="w-full min-h-screen bg-[#EDF0F2] flex justify-center items-center p-8">
        <div className="bg-white rounded-2xl shadow-md w-full max-w-xl p-10 flex flex-col gap-6 text-center">
          <h2 className="text-3xl font-semibold">Verify your email</h2>

          <p className="text-gray-600">
            Enter the 6-digit code sent to
            <span className="font-semibold text-green-600"> {email}</span>
          </p>

          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, ""); // filtra todo lo que no sea número
              setCode(onlyNumbers);
            }}
            className="w-full text-center text-2xl tracking-[0.5em] py-3 border-b-2 border-gray-400 focus:border-green-600 outline-none"
          />

          <button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full bg-black text-white py-3 rounded-xl transition 
            ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"}`}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </div>
    </>
  );
}
