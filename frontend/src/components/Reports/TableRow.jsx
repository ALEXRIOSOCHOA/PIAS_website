export function TableRow({ item, onView }) {
  return (
    // Añadimos 'truncate' a las celdas de texto para un mejor manejo visual
    <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr_96px] items-center gap-2 py-3 border-b last:border-b-0">
      <div className="text-sm text-[#323334] truncate">{item.userId}</div>
      <div className="text-sm text-[#323334] truncate">{item.organization}</div>
      <div className="text-sm text-[#323334] truncate">{item.ModelName}</div>
      <div className="text-sm text-[#323334] truncate">{item.ModelTypeName}</div>
      <div className="text-sm text-[#323334] truncate">{item.ActivityTypeName}</div>
      <div className="text-sm text-[#323334] truncate">{item.ActivityCreationTime.formatted}</div>
      <div className="flex justify-center">
        <button
          onClick={() => onView(item)}
          className="bg-[#EDF0F2] px-3 py-2 rounded-md text-sm font-medium"
        >
          Ver
        </button>
      </div>
    </div>
  );
}
