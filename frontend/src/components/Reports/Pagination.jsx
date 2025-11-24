import React, { useMemo } from 'react';

export function Pagination({ page, totalPages, setPage }) {
  // Número máximo de botones de página visibles a la vez (excluyendo flechas)
  const maxVisiblePages = 5;

  // Usa useMemo para calcular las páginas visibles de manera eficiente
  const pagesToShow = useMemo(() => {
    const pages = [];
    
    // Si hay 5 o menos páginas en total, muestra todas.
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Lógica para mostrar un rango dinámico (ej: 1 2 3 ... 10)
    
    // Calcular el punto de inicio para centrar el rango alrededor de la página actual
    // Aseguramos que 'startPage' no baje de 1 y que el rango completo (start + 5) no exceda totalPages.
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Ajustar si llegamos al final, para mantener siempre 5 números visibles si es posible
    if (endPage === totalPages && (endPage - startPage + 1) < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [page, totalPages, maxVisiblePages]); // Recalcula si estos valores cambian

  return (
    <div className="flex items-center gap-3">
      {/* Botón Anterior */}
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="p-2 rounded border border-gray-200 disabled:opacity-50"
      >
        ‹
      </button>

      {/* Renderiza los números de página dinámicos */}
      {pagesToShow.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 rounded transition duration-150 ${
            p === page 
            ? "bg-[#54B046] text-white font-semibold" // Color de fondo verde para la página activa
            : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Botón Siguiente */}
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="p-2 rounded border border-gray-200 disabled:opacity-50"
      >
        ›
      </button>
    </div>
  );
}
