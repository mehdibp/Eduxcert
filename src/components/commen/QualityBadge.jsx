import { gold } from "../../styles/colors";
import { SealNavIcon } from "../icons/icons"


// Small label for example for "QI · Quality Intelligence"
export default function QualityBadge({color=gold, children}) {
  const bg = `${color}15`;        // 8-digit hex: about 8% opacity
  const border = `${color}66`;    // about 40% opacity

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
      style={{ backgroundColor:bg, color:color, border:`1px solid ${border}` }}
    >
      <SealNavIcon size={14}/>
      {children && ( <span> {children} </span> )}

    </span>
  );
}
