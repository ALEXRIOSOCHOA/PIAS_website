export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar por UsuarioID, Modelo, Actividad o Fecha",
}) {
  return (
    <div className="flex items-center gap-4 bg-[#F2F2F2] rounded-lg px-4 py-2 w-full">
      <svg
        className="w-5 h-5 text-[#0F0F0F]"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 21L15.8 15.8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent flex-1 outline-none text-sm text-[#98999A] font-normal w-full"
        placeholder={placeholder}
      />
    </div>
  );
}
