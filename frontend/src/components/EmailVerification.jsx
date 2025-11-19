import { useState } from "react";

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
      const res = await fetch("http://localhost:5000/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

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
          onChange={(e) => setCode(e.target.value)}
          className="border border-gray-300 text-center text-2xl tracking-[0.4em] w-full py-3 rounded-lg"
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
  );
}
