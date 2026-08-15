
// A small colored label (status, type, label, etc.)
export function Badge({ label, bg, color }) {
  return (
    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: bg, color }}> 
        {label} 
    </span>
  );
}


export function StatusBadge({config, status, fallbackKey='new'}) {
  const c = config[status] || config[fallbackKey];
  return <Badge label={c.label} bg={c.bg} color={c.color}/>;
}
