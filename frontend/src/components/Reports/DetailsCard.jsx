import React from "react";

// Subcomponente estilizado
const DetailsRow = ({ label, value, isEven }) => {
  return (
    // Utilizamos 'flex justify-between' para alinear a ambos lados
    <div
      className={`flex items-center justify-between h-[37px] ${
        isEven ? "bg-[#F7F9FA]" : "bg-white"
      }`}
    >
      <div className="text-base text-[#323334] font-medium leading-[20.8px] font-sans pl-4">
        {label}
      </div>

      <div className="text-base text-[#58595A] font-normal font-sans pr-4">
        {value}
      </div>
    </div>
  );
};

// Componente principal
export function DetailsCard({ data }) {
  return (
    // Contenedor principal: w-full y h-full asumirán el tamaño del Modal padre.
    // Usamos shadow-sm para reemplazar shadow-2xl del Modal para un mejor aspecto.
    <div className="w-full h-full bg-white overflow-hidden rounded-lg relative">
      
      {/* Contenedor interno: Usamos padding para el espaciado interno */}
      {/* Eliminamos el ancho fijo 'w-[572px]' y 'absolute left-6 top-6' */}
      <div className="p-6 flex flex-col">
        {data.map((item, index) => (
          // Usamos item.label como key si es único, si no, index funciona para esta lista de detalles
          <DetailsRow
            key={item.label+index} 
            label={item.label}
            value={item.value}
            isEven={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
