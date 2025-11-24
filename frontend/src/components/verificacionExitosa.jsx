import { useNavigate } from "react-router-dom";
import rocket from "../assets/rocket-launch.svg";

const AccessGranted = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200">
      <div className="w-[660px] h-[450px] shadow-md bg-white rounded-2xl relative overflow-hidden flex flex-col items-center justify-center">
        <div className="w-[120px] h-[120px] bg-green-600 rounded-full flex items-center justify-center mb-6">
            <img
              style={{
                objectFit: "contain", // mantiene proporciones
              }}
              src={rocket}
              alt="rocket"
            />
        </div>
        <div className="text-left text-black text-[28px] font-semibold leading-[33.6px] px-12 mb-6">
          ¡Acceso concedido, ya puedes empezar a explorar tu panel de control!
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white text-[18px] font-medium px-7 py-4 rounded-lg"
        >
          Ir a iniciar sesion
        </button>
      </div>
    </div>
  );
};

export default AccessGranted;
