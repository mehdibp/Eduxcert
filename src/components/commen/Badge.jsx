
// A small colored label (status, type, label, etc.)
export function Badge({ children, backgroundColor, color, border="none", 
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full" }) {
  return (
    <span className={className} style={{ backgroundColor, color, border }}> 
        {children} 
    </span>
  );
}


export function StatusBadge({config, status, fallbackKey='new'}) {
  const badgeConfig = config[status] || config[fallbackKey];
  return <Badge backgroundColor={badgeConfig.bg} color={badgeConfig.color}> {badgeConfig.label} </Badge>
}
