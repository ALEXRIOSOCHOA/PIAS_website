export function StatusBadge({ status }) {
  const hue =
    status === "Active"
      ? "bg-green-500"
      : status === "Pending"
      ? "bg-yellow-400"
      : "bg-gray-300";
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium text-black ${hue}`}
    >
      {status}
    </span>
  );
}
