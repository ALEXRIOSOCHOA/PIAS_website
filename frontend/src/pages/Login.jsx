import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Hook de React Router
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Guardar token en localStorage
      localStorage.setItem("token", data.token);
      setLoading(false);

      // Redirigir a dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Server error, please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
      <div className="w-[90%] sm:w-[400px] md:w-[450px] lg:w-[550px] xl:w-[580px] bg-white rounded-2xl shadow-lg p-20 relative">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
          Iniciar Sesion
        </h2>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        {/* Username */}
        <div className="relative w-full mt-4">
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Email"
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

        {/* Password */}
        <div className="relative w-full mt-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Contraseña"
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

        {/* Remember me & Forgot password */}
        <div className="flex justify-between items-center mt-6 mb-6 text-sm text-gray-900">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 text-green-500 border-gray-300 rounded"
            />
            <span>Remember me</span>
          </label>
          <button className="text-green-500 font-medium">
            Forgot password
          </button>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          className={`w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg mb-6 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup text */}
        <div className="text-center text-sm text-gray-900">
          <span>Don’t have an account?</span>
          <button
            onClick={() => navigate("/registration")}
            className="text-green-500 font-semibold ml-1"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
