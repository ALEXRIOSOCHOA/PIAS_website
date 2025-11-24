import iconReportes from "../../assets/icons/file-download.svg";

// Agrega 'onExport' a las props que recibe el componente
export function Filters({
  activityTypeFilter,
  setactivityTypeFilter,
  orgFilter,
  setOrgFilter,
  onExport, // Prop para manejar la acción de exportar
}) {
  return (
    <div className="flex items-center gap-3 w-auto">
      <button
        onClick={onExport} // Asigna la función de exportación al evento onClick
        className="bg-[#0F0F0F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition duration-150"
        title="Exportar datos a CSV"
      >
        Exportar <img src={iconReportes} alt="icon" className="w-5 h-5" />
      </button>
    </div>
  );
}
