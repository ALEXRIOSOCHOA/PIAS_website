import { TableRow } from "./TableRow";

export function Table({ data, onView, sortColumn, sortDirection, handleSort }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Contenedor del Encabezado */}
      <div className="bg-[#F7F9FA] px-6 py-3">
        <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr_96px] gap-2 text-sm font-medium text-[#58595A]">
          {/* Implementamos handleSort directamente en los encabezados */}
          <div
            className="cursor-pointer flex items-center gap-1 truncate"
            onClick={() => handleSort("userId")} // Correcto
          >
            UsuarioID{" "}
            {sortColumn === "userId" && (
              <span className={sortDirection === "desc" ? "rotate-180" : ""}>
                ▲
              </span>
            )}
          </div>
          <div
            className="cursor-pointer flex items-center gap-1 truncate"
            onClick={() => handleSort("organization")} // Correcto
          >
            Organization{" "}
            {sortColumn === "organization" && (
              <span className={sortDirection === "desc" ? "rotate-180" : ""}>
                ▲
              </span>
            )}
          </div>
          <div
            className="cursor-pointer flex items-center gap-1 truncate"
            onClick={() => handleSort("ModelName")} // CORREGIDO (usar "ModelName")
          >
            Nombre Modelo{" "}
            {sortColumn === "ModelName" && (
              <span className={sortDirection === "desc" ? "rotate-180" : ""}>
                ▲
              </span>
            )}
          </div>
          <div
            className="cursor-pointer flex items-center gap-1 truncate"
            onClick={() => handleSort("ModelTypeName")} // CORREGIDO (usar "ModelTypeName")
          >
            Modelo{" "}
            {/* Cambié "activity" por "ModelTypeName" para que coincida con tus datos */}
            {sortColumn === "ModelTypeName" && (
              <span className={sortDirection === "desc" ? "rotate-180" : ""}>
                ▲
              </span>
            )}
          </div>
          <div
            className="cursor-pointer flex items-center gap-1 truncate"
            onClick={() => handleSort("ActivityTypeName")} // CORREGIDO (usar "ActivityTypeName")
          >
            Actividad{" "}
            {sortColumn === "ActivityTypeName" && (
              <span className={sortDirection === "desc" ? "rotate-180" : ""}>
                ▲
              </span>
            )}
          </div>
          <div
            className="cursor-pointer flex items-center gap-1 truncate"
            onClick={() => handleSort("ActivityCreationTime")} // CORREGIDO (usar "ActivityCreationTime")
          >
            Fecha de creacion{" "}
            {sortColumn === "ActivityCreationTime" && (
              <span className={sortDirection === "desc" ? "rotate-180" : ""}>
                ▲
              </span>
            )}
          </div>
          <div
            className="cursor-pointer flex justify-center items-center gap-1 truncate"
            onClick={() => handleSort("ActivityCreationTime")} // CORREGIDO (usar "ActivityCreationTime")
          >
            Detalles
          </div>
          <div />
        </div>
      </div>

      {/* Contenedor de las Filas */}
      <div className="px-6 py-4 space-y-2">
        {data.map((row, index) => (
          <TableRow
            // Mantenemos esta clave temporal mientras activityId sea nulo
            key={row.userId + index}
            item={row}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
}
