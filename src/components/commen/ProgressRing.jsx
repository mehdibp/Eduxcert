import { ink, muted, border, gold, green } from "../../styles/colors";


// Circle or semicircle indicating progress (in percentage or in number) --------------------
export default function ProgressRing({earned, required, isArc=false, size = isArc?180:50}) {
  const pct = earned/required * 100;
  
  // Canvas dimensions and circle center
  const w = size;
  const h = isArc ? Math.round(size*0.55) : size;
  const stroke = Math.sqrt(size)/1.4
  const cx = w/2, cy = w/2;
  const r = (size - stroke) / 2;

  // Circumference of a full circle and maximum length of visible arc
  const circ = 2 * Math.PI * r;
  const maxLen = isArc ? Math.PI*r : circ;
  const currentLen = (Math.min(100, Math.max(0, pct)) / 100) * maxLen;

  // Starting angle: semicircle from 9 o'clock (-180°) and ring from 12 o'clock (-90°)
  const startAngle = isArc ? -180 : -90;
  const strokeColor = pct === 100 ? green : gold;

  const fontSize_ = size>80 ? size/8 : size/5
  const text = !isArc 
               ? <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={fontSize_} fontWeight="600" fill={ink} > {Math.round(pct)}% </text>
               : <>
                   <text x="50%" y="70%" textAnchor="middle" fontWeight="700" fontSize={fontSize_} fill={ink}> {earned} </text>
                   <text x="50%" y="90%" textAnchor="middle" fontSize={fontSize_/2} fill={muted}> of {required} ECTS    </text>
                 </>

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxWidth: w }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={border} strokeWidth={stroke} strokeDasharray={isArc ? `${maxLen} ${circ}` : undefined} strokeLinecap="round" transform={`rotate(${startAngle} ${cx} ${cy})`} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={strokeColor} strokeWidth={stroke} strokeDasharray={`${currentLen} ${circ}`} strokeLinecap="round" transform={`rotate(${startAngle} ${cx} ${cy})`} />
      {text}
    </svg>
  );
}
