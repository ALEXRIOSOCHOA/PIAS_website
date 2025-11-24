import React from 'react';

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    // Overlay oscuro de fondo: Mantenemos 'flex items-center justify-center'
    // El fondo ya no necesita overflow-y-auto
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      
      {/* Contenedor principal del modal */}
      {/* Añadimos 'overflow-hidden' para contener el scroll interno, y 'max-h-[90vh]' para limitar su altura total al 90% del viewport */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl m-4 max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Encabezado del modal (siempre visible) */}
        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-semibold text-[#323334]">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            &times; {/* Símbolo de X */}
          </button>
        </div>
        
        {/* Contenido del modal: Aquí es donde aplicamos el scroll */}
        {/* 'overflow-y-auto' permite el scroll solo aquí. 'flex-grow' asegura que ocupe el espacio restante. */}
        <div className="p-6 overflow-y-auto flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
}
