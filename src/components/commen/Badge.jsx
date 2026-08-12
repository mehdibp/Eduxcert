
// A small colored label (status, type, label, etc.)
export default function Badge({ label, bg, color }) {
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: bg, color }}> 
        {label} 
    </span>
  );
}
