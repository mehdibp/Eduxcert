import { white, border, muted, ink } from "../../styles/colors";


// Small statistical card (label + large number + optional small explanation)
export default function StatCard({ label, value, sub, color=ink, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-4 ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
      style={{ backgroundColor: white, border: `1px solid ${border}` }}
    >
      <p className="text-xs"                  style={{ color: muted }}>{label}</p>
      <p className="text-2xl font-serif mt-1" style={{ color }}>       {value}</p>
      {sub && <p className="text-[11px] mt-1" style={{ color: muted }}>{sub}</p>}
    </div>
  );
}
