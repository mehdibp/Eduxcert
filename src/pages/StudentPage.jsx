import { useState, useMemo } from "react";
import {ink, inkSoft, gold, goldLight, goldBg, goldBdr, 
        page, white, muted, border, 
        green, greenBg, amber, amberBg, violet, violetBg, blue, blueBg, red, redBg, rose, roseBg} from "../styles/tokens";

// ════════════════════════════════════════════════
// SHARED DATA
// ════════════════════════════════════════════════
const STUDENT = {
  name:"Andreja Novak", initials:"AN",
  institution:"University of Ljubljana",
  programme:"MSc Computer Science",
  ectsEarned:68, ectsRequired:120, graduationTerm:"Spring 2026",
};

// ════════════════════════════════════════════════
// SHARED ICONS
// ════════════════════════════════════════════════
const ic = (d, vb="0 0 16 16") => ({ size=16, color="currentColor", strokeWidth="1.3" }) => (
  <svg width={size} height={size} viewBox={vb} fill="none">
    {d.map((p,i)=>p.t==="path"
      ? <path key={i} d={p.d} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      : p.t==="circle"
      ? <circle key={i} cx={p.cx} cy={p.cy} r={p.r} stroke={color} strokeWidth={strokeWidth}/>
      : <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} rx={p.rx||0} stroke={color} strokeWidth={strokeWidth}/>
    )}
  </svg>
);

function GridIcon({size=16,color="currentColor"}) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1.5" fill={color} opacity="0.8"/>
    <rect x="9" y="1" width="6" height="6" rx="1.5" fill={color} opacity="0.8"/>
    <rect x="1" y="9" width="6" height="6" rx="1.5" fill={color} opacity="0.8"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5" fill={color} opacity="0.8"/>
  </svg>;
}
function BookIcon({size=16,color="currentColor"}) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 2h7a2 2 0 0 1 2 2v9H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke={color} strokeWidth="1.3"/>
    <path d="M12 13a1 1 0 0 0 1-1V5h-1" stroke={color} strokeWidth="1.3"/>
    <path d="M5 5h5M5 7.5h5M5 10h3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>;
}
function SealNavIcon({size=16,color="currentColor"}) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.3"/>
    <path d="M5 8.5l2 2 4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function CalIcon({size=16,color="currentColor"}) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3" width="13" height="11" rx="1.5" stroke={color} strokeWidth="1.3"/>
    <path d="M5 1.5V4M11 1.5V4M1.5 7h13" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>;
}
function MapIcon({size=16,color="currentColor"}) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M6 2L2 4v10l4-2 4 2 4-2V2l-4 2-4-2z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M6 2v10M10 4v10" stroke={color} strokeWidth="1.3"/>
  </svg>;
}
function CheckIcon({size=14,color=green}) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2 7l3.5 3.5L12 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function XIcon({size=14}) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2 2l10 10M12 2L2 12" stroke={muted} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>;
}
function ChevronIcon({open}) {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
    style={{transform:open?"rotate(180deg)":"rotate(0)",transition:"transform .15s"}}>
    <path d="M3 5l4 4 4-4" stroke={muted} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function SearchIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke={muted} strokeWidth="1.4"/>
    <path d="M11 11l3 3" stroke={muted} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>;
}
function FilterIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12M4 8h8M6 12h4" stroke={muted} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>;
}
function ShareIcon({size=16}) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="12" cy="4" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="4" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="12" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5.7 9l4.6 2.2M10.3 4.8L5.7 7" stroke="currentColor" strokeWidth="1.3"/>
  </svg>;
}
function DownloadIcon({size=16}) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M8 3v7M5 8l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>;
}
function WalletIcon({size=16}) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="4" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M1.5 7h13" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="11.5" cy="10" r="1" fill="currentColor"/>
  </svg>;
}
function SpinIcon({size=18}) {
  return <svg width={size} height={size} viewBox="0 0 18 18" fill="none"
    className="animate-spin" style={{animationDuration:"0.8s"}}>
    <circle cx="9" cy="9" r="7" stroke={border} strokeWidth="2.5"/>
    <path d="M9 2a7 7 0 0 1 7 7" stroke={gold} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>;
}
function SealCredIcon({size=20,color=gold}) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8.5" stroke={color} strokeWidth="1.4"/>
    {Array.from({length:20}).map((_,i)=>{
      const a=(i/20)*Math.PI*2,x1=10+Math.cos(a)*9.2,y1=10+Math.sin(a)*9.2;
      const x2=10+Math.cos(a)*10,y2=10+Math.sin(a)*10;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" opacity="0.6"/>;
    })}
    <path d="M6.5 10.5l2.5 2.5 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function DiplomaIcon({size=20,color=gold}) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="2" y="3" width="16" height="14" rx="2" stroke={color} strokeWidth="1.4"/>
    <path d="M6 7h8M6 10h5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="14" cy="13" r="2.5" stroke={color} strokeWidth="1.2"/>
    <path d="M14 15.5v2.5l-1-.8-1 .8v-2.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function RoomIcon({size=12}) {
  return <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M6 1.5C4.3 1.5 3 2.8 3 4.5c0 2.6 3 6 3 6s3-3.4 3-6c0-1.7-1.3-3-3-3z" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="6" cy="4.5" r="1" fill="currentColor"/>
  </svg>;
}
function ClockIcon({size=12}) {
  return <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M6 3.5V6l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function PeopleIcon({size=12}) {
  return <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <circle cx="4.5" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.1"/>
    <circle cx="8"   cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.1"/>
    <path d="M1 10c0-2 1.6-3 3.5-3s3.5 1 3.5 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    <path d="M8 7c1.5.2 2.5 1 2.5 3"            stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
  </svg>;
}
function LogoutIcon({size=16}) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function LightningIcon({size=16}) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M9.5 2L4 9h5l-2.5 5L14 7H9L9.5 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
  </svg>;
}

// ════════════════════════════════════════════════
// SHARED UI COMPONENTS
// ════════════════════════════════════════════════
function ProgressRing({pct,size=48,stroke=4}) {
  const r=( size-stroke)/2, circ=2*Math.PI*r, offset=circ*(1-pct/100);
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={border} strokeWidth={stroke}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={pct===100?green:gold}
      strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset}
      strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}/>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontWeight="600" fill={ink}>{pct}%</text>
  </svg>;
}

function EctsArc({earned,required}) {
  const pct=earned/required,w=180,h=100,cx=w/2,cy=h-10,r=82;
  const sa=Math.PI, ea=Math.PI+pct*Math.PI;
  const x1=cx+r*Math.cos(sa),y1=cy+r*Math.sin(sa);
  const x2=cx+r*Math.cos(ea),y2=cy+r*Math.sin(ea);
  return <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[180px]">
    <path d={`M ${cx-r} ${cy} A ${r} ${r} 0 1 1 ${cx+r} ${cy}`} fill="none" stroke={border} strokeWidth="10" strokeLinecap="round"/>
    <path d={`M ${x1} ${y1} A ${r} ${r} 0 ${pct>.5?1:0} 1 ${x2} ${y2}`} fill="none" stroke={gold} strokeWidth="10" strokeLinecap="round"/>
    <text x={cx} y={cy-10} textAnchor="middle" fontWeight="700" fontSize="22" fill={ink}>{earned}</text>
    <text x={cx} y={cy+8}  textAnchor="middle" fontSize="11" fill={muted}>of {required} ECTS</text>
  </svg>;
}

function QIBadge() {
  return <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
    style={{backgroundColor:goldBg,color:gold,border:`1px solid ${goldBdr}`}}>
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="4" stroke={gold} strokeWidth="1.2"/>
      <path d="M3 5l1.5 1.5L7 3.5" stroke={gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    QI · Quality Intelligence
  </span>;
}

// ════════════════════════════════════════════════
// SIDEBAR
// ════════════════════════════════════════════════
const NAV_ITEMS = [
  {id:"dashboard",  label:"Dashboard",   Icon:GridIcon},
  {id:"courses",    label:"My Courses",  Icon:BookIcon},
  {id:"credentials",label:"Credentials", Icon:SealNavIcon},
  {id:"timetable",  label:"Timetable",   Icon:CalIcon},
  {id:"roadmap",    label:"Roadmap",     Icon:MapIcon},
];

function Sidebar({active,onNav,collapsed,onToggle,onLogout}) {
  return (
    <aside className="flex flex-col h-full transition-all duration-200 select-none"
      style={{width:collapsed?56:220,backgroundColor:ink,borderRight:`1px solid ${inkSoft}`,minHeight:"100vh"}}>
      <div className="flex items-center gap-2.5 px-4 py-5 cursor-pointer shrink-0" onClick={onToggle}
        title={collapsed?"Expand":"Collapse"}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{border:`1.5px solid ${gold}`}}>
          <div className="w-2 h-2 rounded-full" style={{backgroundColor:gold}}/>
        </div>
        {!collapsed && <span className="text-white font-serif text-base tracking-wide truncate">Eduxcert</span>}
      </div>

      <nav className="flex-1 px-2 pt-2 space-y-0.5">
        {NAV_ITEMS.map(({id,label,Icon})=>{
          const on=active===id;
          return <button key={id} onClick={()=>onNav(id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
            style={{backgroundColor:on?"rgba(176,141,87,0.18)":"transparent",color:on?goldBg:"#94A3B8"}}>
            <span className="shrink-0"><Icon size={16} color={on?gold:"#64748B"}/></span>
            {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
          </button>;
        })}
      </nav>

      <div className="px-2 mb-2">
        <button onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-white/5"
          style={{color:"#64748B"}}>
          <span className="shrink-0"><LogoutIcon size={16}/></span>
          {!collapsed && <span className="text-xs font-medium">Sign out</span>}
        </button>
      </div>

      <div className="flex items-center gap-2.5 px-3 py-4 mx-2 mb-3 rounded-lg"
        style={{backgroundColor:"rgba(255,255,255,0.05)"}}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{backgroundColor:gold}}>
          {STUDENT.initials}
        </div>
        {!collapsed && <div className="overflow-hidden">
          <p className="text-white text-xs font-semibold truncate">{STUDENT.name.split(" ")[0]}</p>
          <p className="text-xs truncate" style={{color:"#64748B"}}>{STUDENT.institution.split(" ").slice(-1)[0]}</p>
        </div>}
      </div>
    </aside>
  );
}

// ════════════════════════════════════════════════
// LOGIN PAGE
// ════════════════════════════════════════════════
function SealMark({size=88}) {
  return <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="46" stroke={goldLight} strokeWidth="1.5" opacity="0.55"/>
    <circle cx="50" cy="50" r="38" stroke={gold} strokeWidth="1.5"/>
    {Array.from({length:24}).map((_,i)=>{
      const a=(i/24)*Math.PI*2,x1=50+Math.cos(a)*41,y1=50+Math.sin(a)*41;
      const x2=50+Math.cos(a)*44.5,y2=50+Math.sin(a)*44.5;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={goldLight} strokeWidth="1.2"/>;
    })}
    <path d="M35 51 L45 61 L66 38" stroke={gold} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>;
}

function LoginPage({onLogin}) {
  const [email,setEmail]=useState(""),  [pw,setPw]=useState(""), [show,setShow]=useState(false);
  return (
    <div className="min-h-screen w-full flex items-stretch" style={{backgroundColor:page}}>
      <div className="w-full grid lg:grid-cols-2">
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden px-14 py-12"
          style={{background:`linear-gradient(160deg,${ink} 0%,${inkSoft} 100%)`}}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{border:`1.5px solid ${gold}`}}>
              <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor:gold}}/>
            </div>
            <span className="text-white font-serif text-lg tracking-wide">Eduxcert</span>
          </div>
          <div className="relative flex-1 flex items-center">
            <div className="relative w-full" style={{height:280}}>
              {[{r:-9,y:18,t:"Bachelor of Science, Computer Engineering",id:"EDX-7741-KX02",l:2,top:6},
                {r:6, y:0, t:"Professional Certificate, Data Analysis",   id:"EDX-3120-QW88",l:24,top:0}].map((c,i)=>(
                <div key={i} className="absolute w-56 rounded-lg p-4 shadow-2xl"
                  style={{backgroundColor:white,left:`${c.l*4}px`,top:`${c.top*4}px`,
                    transform:`rotate(${c.r}deg) translateY(${c.y}px)`,
                    boxShadow:"0 20px 40px -10px rgba(0,0,0,0.45)"}}>
                  <div className="absolute top-0 right-0 w-8 h-8"
                    style={{background:`linear-gradient(135deg,transparent 50%,${gold} 50%)`,borderRadius:"0 6px 0 0"}}/>
                  <p className="text-[9px] font-semibold tracking-[0.18em] uppercase" style={{color:gold}}>Verified Credential</p>
                  <p className="mt-2 font-serif text-sm" style={{color:ink}}>{c.t}</p>
                  <p className="mt-3 text-[11px]" style={{color:"#475569"}}>A. Novak</p>
                  <p className="mt-2 font-mono text-[10px] tracking-wide" style={{color:"#94A3B8"}}>{c.id}</p>
                </div>
              ))}
              <div className="absolute" style={{left:8,top:150,filter:"drop-shadow(0 10px 24px rgba(0,0,0,0.5))"}}>
                <SealMark size={72}/>
              </div>
            </div>
          </div>
          <div>
            <div className="h-px w-full mb-5" style={{backgroundImage:`radial-gradient(${goldLight} 1px,transparent 1.5px)`,backgroundSize:"10px 1px",opacity:0.6}}/>
            <h1 className="font-serif text-3xl text-white leading-snug max-w-sm">Every credential, traceable to its source.</h1>
            <p className="mt-3 text-sm max-w-sm" style={{color:"#A9B4CC"}}>Your transcripts, certificates and degrees — issued by your institution, held by you, verifiable by anyone.</p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 sm:px-16 py-12" style={{backgroundColor:white}}>
          <div className="w-full max-w-sm mx-auto">
            <div className="lg:hidden flex items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{border:`1.5px solid ${gold}`}}>
                <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor:gold}}/>
              </div>
              <span className="font-serif text-lg tracking-wide" style={{color:ink}}>Eduxcert</span>
            </div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase mb-2" style={{color:gold}}>
              Student Portal · University of Ljubljana
            </p>
            <h2 className="font-serif text-2xl mb-1" style={{color:ink}}>Sign in to your record</h2>
            <p className="text-sm mb-8" style={{color:muted}}>Use your institutional account to continue.</p>

            <div className="space-y-5">
              {[{label:"Institutional email",type:show?"text":"email",val:email,set:setEmail,ph:"name@university.edu"},
                {label:"Password",type:show?"text":"password",val:pw,set:setPw,ph:"••••••••"}].map((f,i)=>(
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs font-medium" style={{color:"#334155"}}>{f.label}</label>
                    {i===1 && <button className="text-xs font-medium" style={{color:gold}}>Forgot password?</button>}
                  </div>
                  <div className="relative">
                    <input type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                      className="w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors"
                      style={{borderColor:"#CBD5E1",color:ink,paddingRight:i===1?64:14}}
                      onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#CBD5E1"}/>
                    {i===1 && <button onClick={()=>setShow(s=>!s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium" style={{color:muted}}>
                      {show?"Hide":"Show"}
                    </button>}
                  </div>
                </div>
              ))}
              <button onClick={onLogin}
                className="w-full rounded-md py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{backgroundColor:ink}}>
                Sign in
              </button>
            </div>

            <div className="flex items-center gap-3 my-7">
              <div className="h-px flex-1" style={{backgroundColor:"#E2E8F0"}}/>
              <span className="text-xs" style={{color:"#94A3B8"}}>or</span>
              <div className="h-px flex-1" style={{backgroundColor:"#E2E8F0"}}/>
            </div>
            <button onClick={onLogin}
              className="w-full rounded-md py-2.5 text-sm font-medium border flex items-center justify-center gap-2"
              style={{borderColor:"#CBD5E1",color:ink}}>
              <SealMark size={16}/> Continue with EUDI Wallet
            </button>
            <p className="mt-9 text-xs text-center" style={{color:"#94A3B8"}}>
              Protected by your institution's identity provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════
const DASH_COURSES = [
  {id:"1",code:"CS-711",title:"Distributed Systems",ects:6,language:"English",status:"active",progress:72,exam:"12 Jun 2025",grade:null},
  {id:"2",code:"CS-604",title:"ML Fundamentals",ects:6,language:"English",status:"active",progress:45,exam:"19 Jun 2025",grade:null},
  {id:"3",code:"CS-522",title:"Database Architecture",ects:4,language:"Slovenian",status:"completed",progress:100,exam:null,grade:"9 / 10"},
  {id:"4",code:"CS-480",title:"Software Engineering",ects:4,language:"English",status:"completed",progress:100,exam:null,grade:"8 / 10"},
];
const DASH_CREDS = [
  {id:"c1",title:"Database Architecture",type:"Certificate",code:"EDX-4401-DB03"},
  {id:"c2",title:"Software Engineering", type:"Certificate",code:"EDX-3120-QW88"},
];
const TIMELINE = [
  {id:"t1",ts:"Apr 22, 2025",type:"grade",text:"Grade published for Database Architecture — 9 / 10"},
  {id:"t2",ts:"Apr 10, 2025",type:"ects",text:"4 ECTS awarded — Database Architecture"},
  {id:"t3",ts:"Mar 3, 2025", type:"enrol",text:"Enrolled in Distributed Systems (CS-711)"},
  {id:"t4",ts:"Feb 28, 2025",type:"enrol",text:"Enrolled in Machine Learning Fundamentals (CS-604)"},
  {id:"t5",ts:"Jan 15, 2025",type:"credential",text:"Credential issued — Software Engineering Certificate"},
];

function DashboardView({onNav}) {
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl" style={{color:ink}}>Good morning, Andreja</h1>
          <p className="text-sm mt-0.5" style={{color:muted}}>{STUDENT.programme} · {STUDENT.institution}</p>
        </div>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full"
          style={{backgroundColor:goldBg,color:amber,border:`1px solid ${goldBdr}`}}>
          Expected graduation: {STUDENT.graduationTerm}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {label:"Active Courses",value:"2",nav:"courses"},
          {label:"Upcoming Exams",value:"2",nav:"timetable"},
          {label:"Credentials",value:"2",nav:"credentials"},
          {label:"ECTS Completion",value:`${Math.round(68/120*100)}%`,nav:null},
        ].map(({label,value,nav})=>(
          <div key={label} onClick={nav?()=>onNav(nav):undefined}
            className={`rounded-xl p-4 ${nav?"cursor-pointer hover:shadow-md transition-shadow":""}`}
            style={{backgroundColor:white,border:`1px solid ${border}`}}>
            <p className="text-xs" style={{color:muted}}>{label}</p>
            <p className="text-2xl font-serif mt-1" style={{color:ink}}>{value}</p>
            {nav && <p className="text-[10px] mt-2" style={{color:gold}}>View →</p>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="rounded-xl p-5 flex flex-col items-center"
          style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <p className="text-xs font-semibold tracking-wide uppercase self-start mb-4" style={{color:muted}}>ECTS Progress</p>
          <EctsArc earned={68} required={120}/>
          <div className="mt-4 w-full">
            <div className="flex justify-between text-xs mb-1">
              <span style={{color:muted}}>Earned</span>
              <span style={{color:gold,fontWeight:600}}>68 ECTS</span>
            </div>
            <div className="flex justify-between text-xs">
              <span style={{color:muted}}>Remaining</span>
              <span style={{color:ink,fontWeight:600}}>52 ECTS</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <p className="text-xs font-semibold tracking-wide uppercase mb-4" style={{color:muted}}>Recent Activity</p>
          <ol className="relative space-y-4" style={{borderLeft:`1.5px solid ${border}`,paddingLeft:20}}>
            {TIMELINE.map(ev=>{
              const dot=ev.type==="credential"?gold:ev.type==="grade"?green:ev.type==="ects"?"#8B5CF6":"#94A3B8";
              return <li key={ev.id} className="relative">
                <span className="absolute w-2.5 h-2.5 rounded-full" style={{backgroundColor:dot,left:-26,top:3}}/>
                <p className="text-[11px]" style={{color:muted}}>{ev.ts}</p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{color:ink}}>{ev.text}</p>
              </li>;
            })}
          </ol>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-wide uppercase" style={{color:muted}}>My Courses</p>
          <button onClick={()=>onNav("courses")} className="text-xs font-medium" style={{color:gold}}>View all →</button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DASH_COURSES.map(c=>{
            const done=c.status==="completed";
            return <div key={c.id} onClick={()=>onNav("courses")}
              className="rounded-xl p-5 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow"
              style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-mono tracking-wider" style={{color:muted}}>{c.code}</p>
                  <h3 className="text-sm font-semibold mt-0.5 leading-snug" style={{color:ink}}>{c.title}</h3>
                </div>
                <ProgressRing pct={c.progress} size={44}/>
              </div>
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full self-start"
                style={{backgroundColor:done?greenBg:goldBg,color:done?green:amber}}>
                {done?"Completed":"In progress"}
              </span>
              {done&&c.grade&&<p className="text-xs font-semibold" style={{color:green}}>Grade: {c.grade}</p>}
              {!done&&c.exam&&<p className="text-xs" style={{color:muted}}>Exam: <span style={{color:ink,fontWeight:600}}>{c.exam}</span></p>}
            </div>;
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold tracking-wide uppercase" style={{color:muted}}>My Credentials</p>
          <button onClick={()=>onNav("credentials")} className="text-xs font-medium" style={{color:gold}}>View all →</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {DASH_CREDS.map(cr=>(
            <div key={cr.id} onClick={()=>onNav("credentials")}
              className="rounded-xl p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
              style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{backgroundColor:white,border:`1.5px solid ${gold}`}}>
                <SealCredIcon size={18}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold" style={{color:amber}}>{cr.type}</p>
                <p className="text-sm font-medium mt-0.5 truncate" style={{color:ink}}>{cr.title}</p>
                <p className="font-mono text-[10px] mt-0.5" style={{color:muted}}>{cr.code}</p>
              </div>
              <button className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{backgroundColor:gold,color:white}}>Share</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// COURSES PAGE
// ════════════════════════════════════════════════
const ALL_COURSES=[
  {id:"c01",code:"CS-711",title:"Distributed Systems",ects:6,language:"English",level:"MA",programme:"Computer Science",term:"Spring 2025",capacity:40,enrolled:34,status:"open",educator:"Prof. Kovač",tags:["Systems","Networking"],description:"Fundamentals of distributed computing, consensus protocols, fault tolerance, and scalable architectures."},
  {id:"c02",code:"CS-604",title:"Machine Learning Fundamentals",ects:6,language:"English",level:"MA",programme:"Computer Science",term:"Spring 2025",capacity:60,enrolled:58,status:"full",educator:"Assoc. Prof. Leban",tags:["AI","Statistics"],description:"Supervised & unsupervised learning, neural networks, model evaluation, and practical implementation."},
  {id:"c03",code:"CS-512",title:"Cloud Architecture",ects:4,language:"English",level:"MA",programme:"Computer Science",term:"Spring 2025",capacity:30,enrolled:21,status:"open",educator:"Prof. Merhar",tags:["Cloud","DevOps"],description:"Design patterns for cloud-native systems, IaC, Kubernetes, and multi-region deployments."},
  {id:"c04",code:"CS-480",title:"Software Engineering",ects:4,language:"English",level:"BA",programme:"Computer Science",term:"Spring 2025",capacity:80,enrolled:77,status:"open",educator:"Dr. Zupan",tags:["Engineering","Agile"],description:"Software lifecycle, architecture patterns, testing strategies, and team collaboration."},
  {id:"c05",code:"MATH-310",title:"Probability & Statistics",ects:6,language:"Slovenian",level:"BA",programme:"Mathematics",term:"Spring 2025",capacity:50,enrolled:50,status:"full",educator:"Prof. Bergant",tags:["Math","Statistics"],description:"Probability theory, random variables, hypothesis testing, and regression analysis."},
  {id:"c06",code:"CS-390",title:"Operating Systems",ects:6,language:"Slovenian",level:"BA",programme:"Computer Science",term:"Spring 2025",capacity:45,enrolled:29,status:"open",educator:"Dr. Ferko",tags:["Systems","C"],description:"Process scheduling, memory management, file systems, and concurrency primitives."},
  {id:"c07",code:"CS-801",title:"Advanced Cryptography",ects:6,language:"English",level:"PhD",programme:"Computer Science",term:"Spring 2025",capacity:15,enrolled:8,status:"open",educator:"Prof. Štefanič",tags:["Security","Math"],description:"Public-key infrastructure, zero-knowledge proofs, lattice-based cryptography."},
  {id:"c08",code:"DATA-201",title:"Data Engineering",ects:4,language:"English",level:"MA",programme:"Data Science",term:"Spring 2025",capacity:35,enrolled:35,status:"full",educator:"Dr. Hribar",tags:["Data","Pipelines"],description:"ETL pipelines, data lakes, streaming with Kafka, and warehouse design."},
  {id:"c09",code:"CS-670",title:"Human-Computer Interaction",ects:4,language:"English",level:"MA",programme:"Computer Science",term:"Spring 2025",capacity:40,enrolled:18,status:"open",educator:"Assoc. Prof. Rus",tags:["UX","Research"],description:"User research, prototyping, usability testing, and accessibility standards."},
  {id:"c10",code:"CS-522",title:"Database Architecture",ects:4,language:"Slovenian",level:"MA",programme:"Computer Science",term:"Autumn 2024",capacity:40,enrolled:40,status:"completed",educator:"Prof. Kovač",tags:["Databases","SQL"],description:"Relational theory, query optimisation, indexing strategies, and NoSQL alternatives."},
  {id:"c11",code:"CS-340",title:"Computer Networks",ects:6,language:"Slovenian",level:"BA",programme:"Computer Science",term:"Autumn 2024",capacity:55,enrolled:55,status:"completed",educator:"Dr. Vidmar",tags:["Networking","Protocols"],description:"TCP/IP stack, routing protocols, network security, and hands-on packet analysis."},
  {id:"c12",code:"CS-720",title:"Formal Methods",ects:6,language:"English",level:"MA",programme:"Computer Science",term:"Spring 2025",capacity:20,enrolled:6,status:"open",educator:"Prof. Jakopin",tags:["Theory","Logic"],description:"Model checking, temporal logic, theorem proving, and program verification."},
];
const INIT_ENROLLED=new Set(["c01","c02","c10","c11"]);

function CoursesPage() {
  const [tab,setTab]=useState("Catalogue");
  const [search,setSearch]=useState("");
  const [programme,setProgramme]=useState("All");
  const [language,setLanguage]=useState("All");
  const [level,setLevel]=useState("All");
  const [ectsF,setEctsF]=useState("Any");
  const [statusF,setStatusF]=useState("All");
  const [expanded,setExpanded]=useState(null);
  const [enrolled,setEnrolled]=useState(INIT_ENROLLED);
  const [pending,setPending]=useState(null);
  const [toast,setToast]=useState(null);
  const [showF,setShowF]=useState(false);

  const toast_=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};
  const filters=[
    programme!=="All"&&{k:"programme",l:programme,c:()=>setProgramme("All")},
    language!=="All"&&{k:"language",l:language,c:()=>setLanguage("All")},
    level!=="All"&&{k:"level",l:level,c:()=>setLevel("All")},
    ectsF!=="Any"&&{k:"ects",l:ectsF,c:()=>setEctsF("Any")},
    statusF!=="All"&&{k:"status",l:statusF,c:()=>setStatusF("All")},
  ].filter(Boolean);

  const filtered=useMemo(()=>{
    let l=ALL_COURSES;
    if(tab==="My Courses")l=l.filter(c=>enrolled.has(c.id));
    if(search)l=l.filter(c=>c.title.toLowerCase().includes(search.toLowerCase())||c.code.toLowerCase().includes(search.toLowerCase())||c.educator.toLowerCase().includes(search.toLowerCase()));
    if(programme!=="All")l=l.filter(c=>c.programme===programme);
    if(language!=="All")l=l.filter(c=>c.language===language);
    if(level!=="All")l=l.filter(c=>c.level===level);
    if(ectsF!=="Any")l=l.filter(c=>c.ects===parseInt(ectsF));
    if(statusF!=="All")l=l.filter(c=>c.status===statusF);
    return l;
  },[tab,search,programme,language,level,ectsF,statusF,enrolled]);

  const PillGroup=({label,opts,val,set})=>(
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{color:muted}}>{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {opts.map(o=>{const a=val===o;return(
          <button key={o} onClick={()=>set(a?opts[0]:o)}
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{backgroundColor:a?ink:white,color:a?white:muted,border:`1px solid ${a?ink:border}`}}>{o}</button>
        );})}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{backgroundColor:page}}>
      <div className="pt-8 pb-6 px-1" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
        <p className="text-xs mb-3" style={{color:muted}}><span style={{color:ink}}>Andreja Novak</span> / Courses</p>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-2xl" style={{color:ink}}>Course Catalogue</h1>
            <p className="text-sm mt-0.5" style={{color:muted}}>Spring 2025 · University of Ljubljana</p>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{color:muted}}>
            <span className="font-semibold" style={{color:green}}>{enrolled.size}</span> enrolled ·{" "}
            <span className="font-semibold" style={{color:ink}}>{ALL_COURSES.filter(c=>c.status==="open").length}</span> open
          </div>
        </div>
        <div className="flex gap-1 mt-6">
          {["Catalogue","My Courses"].map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              className="px-4 py-2 text-sm font-medium rounded-t-lg"
              style={{backgroundColor:tab===t?page:"transparent",color:tab===t?ink:muted,
                borderBottom:tab===t?`2px solid ${gold}`:"2px solid transparent"}}>
              {t}{t==="My Courses"&&<span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{backgroundColor:goldBg,color:amber}}>{enrolled.size}</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="px-1 py-6">
        <div className="flex gap-3 mb-4 flex-wrap">
          <div className="flex-1 min-w-48 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon/></span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by title, code, or instructor…"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm border outline-none"
              style={{backgroundColor:white,borderColor:border,color:ink}}
              onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
          </div>
          <button onClick={()=>setShowF(v=>!v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium"
            style={{backgroundColor:showF?ink:white,borderColor:showF?ink:border,color:showF?white:muted}}>
            <FilterIcon/> Filters
            {filters.length>0&&<span className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center" style={{backgroundColor:gold,color:white}}>{filters.length}</span>}
          </button>
        </div>

        {showF&&<div className="rounded-xl p-5 mb-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <PillGroup label="Programme" opts={["All","Computer Science","Mathematics","Data Science"]} val={programme} set={setProgramme}/>
          <PillGroup label="Language"  opts={["All","English","Slovenian"]} val={language}  set={setLanguage}/>
          <PillGroup label="Level"     opts={["All","BA","MA","PhD"]}       val={level}     set={setLevel}/>
          <PillGroup label="ECTS"      opts={["Any","4 ECTS","6 ECTS"]}    val={ectsF}     set={setEctsF}/>
          <PillGroup label="Status"    opts={["All","open","full","completed"]} val={statusF} set={setStatusF}/>
          {filters.length>0&&<div className="flex items-end">
            <button onClick={()=>{setProgramme("All");setLanguage("All");setLevel("All");setEctsF("Any");setStatusF("All");}}
              className="text-xs font-medium underline" style={{color:muted}}>Clear all</button>
          </div>}
        </div>}

        {filters.length>0&&<div className="flex flex-wrap gap-2 mb-4">
          {filters.map(f=><button key={f.k} onClick={f.c}
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border"
            style={{backgroundColor:goldBg,borderColor:goldBdr,color:amber}}>
            {f.l} <XIcon size={12}/>
          </button>)}
        </div>}

        <p className="text-xs mb-4" style={{color:muted}}>{filtered.length} course{filtered.length!==1?"s":""} found</p>

        {filtered.length===0
          ? <div className="rounded-xl py-16 flex flex-col items-center gap-3" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <p className="text-3xl">🔍</p>
              <p className="text-sm font-medium" style={{color:ink}}>No courses match your filters</p>
            </div>
          : <div className="space-y-3">
              {filtered.map(c=>{
                const isExp=expanded===c.id;
                const isEnrolled=enrolled.has(c.id);
                const spots=c.capacity-c.enrolled;
                return <div key={c.id} className="rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                  style={{backgroundColor:white,border:`1px solid ${border}`}}>
                  <div className="flex items-start gap-4 p-5">
                    <div className="shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center"
                      style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
                      <span className="font-serif text-lg leading-none" style={{color:gold}}>{c.ects}</span>
                      <span className="text-[9px] font-semibold tracking-wide" style={{color:amber}}>ECTS</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-[10px] font-mono" style={{color:muted}}>{c.code}</p>
                        {[{st:"open",bg:greenBg,col:green,lb:"Open"},{st:"full",bg:amberBg,col:amber,lb:"Full"},{st:"completed",bg:violetBg,col:violet,lb:"Completed"}].find(s=>s.st===c.status)&&
                          (()=>{const s=[{st:"open",bg:greenBg,col:green,lb:"Open"},{st:"full",bg:amberBg,col:amber,lb:"Full"},{st:"completed",bg:violetBg,col:violet,lb:"Completed"}].find(x=>x.st===c.status);
                          return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{backgroundColor:s.bg,color:s.col}}>{s.lb}</span>;})()}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{backgroundColor:{BA:goldBg,MA:violetBg,PhD:greenBg}[c.level],color:{BA:amber,MA:violet,PhD:green}[c.level]}}>{c.level}</span>
                      </div>
                      <h3 className="text-sm font-semibold" style={{color:ink}}>{c.title}</h3>
                      <p className="text-[11px] mt-1" style={{color:muted}}>{c.educator} · {c.language} · {c.programme}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                      {c.status==="completed"
                        ? <span className="text-xs" style={{color:muted}}>Past term</span>
                        : isEnrolled
                        ? <button onClick={()=>{setEnrolled(p=>{const s=new Set(p);s.delete(c.id);return s;});toast_(`Withdrawn from ${c.title}.`,false);}}
                            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                            style={{backgroundColor:greenBg,color:green}}>
                            <CheckIcon size={12}/> Enrolled
                          </button>
                        : c.status==="full"
                        ? <button disabled className="text-xs px-3 py-1.5 rounded-lg border" style={{borderColor:border,color:muted,cursor:"not-allowed"}}>Waitlist</button>
                        : <button onClick={()=>setPending(c)} className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white hover:opacity-80" style={{backgroundColor:ink}}>Enrol</button>
                      }
                      <button onClick={()=>setExpanded(p=>p===c.id?null:c.id)} className="p-1.5 rounded-lg hover:bg-gray-100">
                        <ChevronIcon open={isExp}/>
                      </button>
                    </div>
                  </div>
                  {isExp&&<div className="px-5 pb-5 border-t" style={{borderColor:border}}>
                    <p className="text-xs mt-4 leading-relaxed" style={{color:muted}}>{c.description}</p>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {[["Term",c.term],["Capacity",`${c.enrolled}/${c.capacity}`],["Spots",c.status==="open"?String(spots):"—"]].map(([k,v])=>(
                        <div key={k}><p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{color:muted}}>{k}</p>
                        <p className="text-sm font-medium" style={{color:ink}}>{v}</p></div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {c.tags.map(t=><span key={t} className="text-[10px] px-2 py-0.5 rounded-md" style={{backgroundColor:page,color:muted,border:`1px solid ${border}`}}>{t}</span>)}
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] mb-1" style={{color:muted}}>
                        <span>Enrolment</span><span>{Math.round(c.enrolled/c.capacity*100)}% full</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                        <div className="h-full rounded-full" style={{width:`${c.enrolled/c.capacity*100}%`,backgroundColor:c.enrolled===c.capacity?amber:green}}/>
                      </div>
                    </div>
                  </div>}
                </div>;
              })}
            </div>
        }
      </div>

      {pending&&<div className="fixed inset-0 flex items-center justify-center z-50" style={{backgroundColor:"rgba(15,23,41,0.55)",backdropFilter:"blur(2px)"}}>
        <div className="rounded-2xl p-7 w-full max-w-sm shadow-2xl relative" style={{backgroundColor:white}}>
          <button onClick={()=>setPending(null)} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100"><XIcon/></button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{backgroundColor:goldBg,border:`1.5px solid ${goldBdr}`}}>
            <CheckIcon size={18} color={gold}/>
          </div>
          <h3 className="font-serif text-lg mb-1" style={{color:ink}}>Confirm enrolment</h3>
          <div className="rounded-xl p-4 my-5" style={{backgroundColor:page,border:`1px solid ${border}`}}>
            <p className="text-[10px] font-mono" style={{color:muted}}>{pending.code}</p>
            <p className="text-sm font-semibold mt-0.5" style={{color:ink}}>{pending.title}</p>
            <p className="text-xs mt-2" style={{color:muted}}>{pending.ects} ECTS · {pending.language} · {pending.term}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>setPending(null)} className="flex-1 py-2 rounded-lg border text-sm font-medium" style={{borderColor:border,color:muted}}>Cancel</button>
            <button onClick={()=>{setEnrolled(p=>new Set([...p,pending.id]));setPending(null);toast_("You're enrolled! Check your email for a calendar invite.");}}
              className="flex-1 py-2 rounded-lg text-sm font-semibold text-white" style={{backgroundColor:ink}}>Confirm</button>
          </div>
        </div>
      </div>}

      {toast&&<div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl shadow-xl text-sm font-medium text-white flex items-center gap-2 z-50"
        style={{backgroundColor:toast.ok?ink:"#475569"}}>
        {toast.ok?<CheckIcon color={gold}/>:<XIcon/>} {toast.msg}
      </div>}
    </div>
  );
}

// ════════════════════════════════════════════════
// CREDENTIALS PAGE
// ════════════════════════════════════════════════
const CRED_DATA=[
  {id:"cred-4401",code:"EDX-4401-DB03",type:"certificate",title:"Database Architecture",issuer:"University of Ljubljana",programme:"MSc Computer Science",issuedOn:"2025-01-22",ects:4,grade:"9 / 10",status:"active",algorithm:"Ed25519",keyId:"did:ebsi:uni-lj-2024-01#key-1",ebsiTxHash:"0x3fa9...c812",verifyUrl:"https://verify.eduxcert.eu/c/EDX-4401-DB03",
    fields:[{id:"name",label:"Full name",value:"Andreja Novak",shown:true},{id:"dob",label:"Date of birth",value:"1999-04-11",shown:false},{id:"grade",label:"Grade",value:"9 / 10",shown:true},{id:"ects",label:"ECTS credits",value:"4",shown:true},{id:"issuer",label:"Issuer",value:"University of Ljubljana",shown:true},{id:"nat",label:"Nationality",value:"Slovenian",shown:false}]},
  {id:"cred-3120",code:"EDX-3120-QW88",type:"certificate",title:"Software Engineering",issuer:"University of Ljubljana",programme:"MSc Computer Science",issuedOn:"2025-01-15",ects:4,grade:"8 / 10",status:"active",algorithm:"Ed25519",keyId:"did:ebsi:uni-lj-2024-01#key-1",ebsiTxHash:"0x7bc1...a034",verifyUrl:"https://verify.eduxcert.eu/c/EDX-3120-QW88",
    fields:[{id:"name",label:"Full name",value:"Andreja Novak",shown:true},{id:"dob",label:"Date of birth",value:"1999-04-11",shown:false},{id:"grade",label:"Grade",value:"8 / 10",shown:true},{id:"ects",label:"ECTS credits",value:"4",shown:true},{id:"issuer",label:"Issuer",value:"University of Ljubljana",shown:true},{id:"nat",label:"Nationality",value:"Slovenian",shown:false}]},
  {id:"cred-9900",code:"EDX-9900-MSC1",type:"degree",title:"MSc Computer Science",issuer:"University of Ljubljana",programme:"MSc Computer Science",issuedOn:null,ects:120,grade:null,status:"pending",algorithm:null,keyId:null,ebsiTxHash:null,verifyUrl:null,fields:[]},
];

function QRCode({value,size=140}) {
  const cells=21,cell=size/cells;
  function hash(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=(h*0x01000193)>>>0;}return h;}
  const seed=hash(value),bits=[];
  for(let i=0;i<cells*cells;i++)bits.push(((seed>>(i%32))&1)===1);
  const isCorner=(r,c)=>(r<7&&c<7)||(r<7&&c>=cells-7)||(r>=cells-7&&c<7);
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    <rect width={size} height={size} fill={white} rx="4"/>
    {Array.from({length:cells}).map((_,r)=>Array.from({length:cells}).map((_,c)=>{
      const on=isCorner(r,c)?true:bits[r*cells+c];
      return on?<rect key={`${r}-${c}`} x={c*cell+0.5} y={r*cell+0.5} width={cell-1} height={cell-1} rx="0.5" fill={ink}/>:null;
    }))}
    {[[0,0],[0,cells-7],[cells-7,0]].map(([tr,tc],i)=><g key={i}>
      <rect x={tc*cell} y={tr*cell} width={7*cell} height={7*cell} fill="none" stroke={ink} strokeWidth={cell*0.8}/>
      <rect x={(tc+2)*cell} y={(tr+2)*cell} width={3*cell} height={3*cell} fill={ink}/>
    </g>)}
  </svg>;
}

function CredTypeStyle(type){
  if(type==="degree") return{Icon:DiplomaIcon,bg:violetBg,color:violet};
  return{Icon:SealCredIcon,bg:goldBg,color:gold};
}

function CredentialModal({cred,onClose}){
  const [tab,setTab]=useState("overview");
  const [fields,setFields]=useState(cred.fields);
  const [showV,setShowV]=useState(false);
  const [copied,setCopied]=useState(false);
  const [vstep,setVstep]=useState(0);
  const {Icon,bg,color}=CredTypeStyle(cred.type);
  const toggle=id=>setFields(p=>p.map(f=>f.id===id?{...f,shown:!f.shown}:f));

  return <>
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{backgroundColor:"rgba(15,23,41,0.55)",backdropFilter:"blur(3px)"}}>
      <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{backgroundColor:white,maxHeight:"92vh"}}>
        <div className="px-6 py-5 flex items-start gap-4 shrink-0" style={{backgroundColor:inkSoft}}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor:bg}}>
            <Icon size={24} color={color}/>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{color:goldBg}}>{cred.type}</p>
            <h2 className="font-serif text-lg text-white leading-snug">{cred.title}</h2>
            <p className="text-xs mt-0.5" style={{color:"#94A3B8"}}>{cred.issuer}</p>
          </div>
          <button onClick={onClose} className="mt-1 p-1.5 rounded-lg hover:bg-white/10 shrink-0"><XIcon/></button>
        </div>

        <div className="flex border-b shrink-0" style={{borderColor:border}}>
          {["overview","share","verify"].map(t=><button key={t} onClick={()=>setTab(t)}
            className="flex-1 py-3 text-xs font-semibold capitalize"
            style={{color:tab===t?gold:muted,borderBottom:tab===t?`2px solid ${gold}`:"2px solid transparent"}}>
            {t==="overview"?"Overview":t==="share"?"Share":"Verify"}
          </button>)}
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {tab==="overview"&&<div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[["Issued on",new Date(cred.issuedOn).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})],
                ["ECTS",`${cred.ects} credits`],["Grade",cred.grade||"—"],["Programme",cred.programme]].map(([k,v])=>(
                <div key={k} className="rounded-xl p-3.5" style={{backgroundColor:page}}>
                  <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>{k}</p>
                  <p className="text-sm font-medium" style={{color:ink}}>{v}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4" style={{border:`1px solid ${border}`}}>
              <p className="text-[10px] uppercase tracking-wider font-semibold mb-3" style={{color:muted}}>Cryptographic proof</p>
              {[["Algorithm",cred.algorithm],["Key ID",cred.keyId],["EBSI tx",cred.ebsiTxHash]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b last:border-0 text-xs" style={{borderColor:border}}>
                  <span style={{color:muted}}>{k}</span><span className="font-mono text-[10px]" style={{color:ink}}>{v}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{backgroundColor:greenBg}}>
              <CheckIcon color={green}/><p className="text-xs font-medium" style={{color:green}}>Signature valid · Not revoked · Issuer in EBSI TIR</p>
            </div>
          </div>}

          {tab==="share"&&<div className="space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-2xl" style={{backgroundColor:page,border:`1px solid ${border}`}}>
                <QRCode value={cred.verifyUrl} size={148}/>
              </div>
              <p className="text-xs text-center" style={{color:muted}}>Anyone can scan this QR to verify without an account.</p>
              <button onClick={()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}}
                className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg"
                style={{backgroundColor:copied?greenBg:goldBg,color:copied?green:amber,border:`1px solid ${copied?"#BBF7D0":goldBdr}`}}>
                {copied?<><CheckIcon size={12} color={green}/> Link copied!</>:<><ShareIcon size={12}/> Copy verify link</>}
              </button>
            </div>
            <div>
              <p className="text-xs font-semibold mb-1" style={{color:ink}}>Selective disclosure <span style={{color:muted,fontWeight:400}}>(SD-JWT)</span></p>
              <p className="text-[11px] mb-3" style={{color:muted}}>Choose which attributes to reveal when presenting this credential.</p>
              {fields.map(f=>(
                <div key={f.id} className="flex items-center justify-between py-2.5 border-b" style={{borderColor:border}}>
                  <div>
                    <p className="text-xs font-medium" style={{color:ink}}>{f.label}</p>
                    <p className="text-[11px] mt-0.5" style={{color:f.shown?muted:"transparent",userSelect:"none"}}>{f.shown?f.value:"•••••••"}</p>
                  </div>
                  <button onClick={()=>toggle(f.id)} className="relative w-9 h-5 rounded-full shrink-0" style={{backgroundColor:f.shown?green:border}}>
                    <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                      style={{transform:f.shown?"translateX(17px)":"translateX(2px)"}}/>
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border" style={{borderColor:border,color:ink}}><DownloadIcon size={14}/> Download PDF</button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold" style={{backgroundColor:inkSoft,color:white}}><WalletIcon size={14}/> Add to EUDI Wallet</button>
            </div>
          </div>}

          {tab==="verify"&&<div className="space-y-4">
            {!showV
              ? <>
                  <div className="rounded-xl p-4" style={{backgroundColor:page}}>
                    <p className="text-xs font-semibold mb-2" style={{color:ink}}>Public verify link</p>
                    <p className="text-[11px] font-mono break-all" style={{color:muted}}>{cred.verifyUrl}</p>
                  </div>
                  <button onClick={()=>{setShowV(true);setVstep(0);}}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white" style={{backgroundColor:ink}}>
                    Run verification demo
                  </button>
                </>
              : vstep<4
              ? <>
                  <p className="text-xs" style={{color:muted}}>Simulating verification for <span className="font-mono font-semibold" style={{color:ink}}>{cred.code}</span></p>
                  <ol className="space-y-3">
                    {[["Reading credential JSON…","Parsing W3C VC structure"],["Verifying Ed25519 signature…","Checking JWS against issuer key"],["Checking revocation status…","CDN-cached status-list 2021"],["Verifying trust anchor…","DID found in EBSI TIR"]].map(([l,d],i)=>(
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0">
                          {i<vstep?<CheckIcon/>:i===vstep?<SpinIcon/>:<span className="w-3.5 h-3.5 rounded-full block" style={{border:`1.5px solid ${border}`}}/>}
                        </span>
                        <div>
                          <p className="text-xs font-medium" style={{color:i<=vstep?ink:muted}}>{l}</p>
                          {i<vstep&&<p className="text-[10px] mt-0.5" style={{color:muted}}>{d}</p>}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <button onClick={()=>setVstep(s=>s+1)} className="w-full py-2.5 rounded-lg text-xs font-semibold text-white" style={{backgroundColor:ink}}>
                    {vstep===0?"Start verification":vstep<3?"Next step":"Complete"}
                  </button>
                </>
              : <div className="flex flex-col items-center text-center gap-3 py-2">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{backgroundColor:greenBg}}>
                    <CheckIcon size={24} color={green}/>
                  </div>
                  <p className="font-serif text-xl" style={{color:green}}>Valid</p>
                  <p className="text-xs" style={{color:muted}}>Authentic, unrevoked, and issued by a trusted institution in EBSI.</p>
                  <button onClick={()=>{setShowV(false);setVstep(0);}} className="w-full py-2.5 rounded-lg text-xs font-semibold text-white" style={{backgroundColor:ink}}>Done</button>
                </div>
            }
          </div>}
        </div>
      </div>
    </div>
  </>;
}

function CredentialsPage(){
  const [sel,setSel]=useState(null);
  const active=CRED_DATA.filter(c=>c.status==="active");
  const pending=CRED_DATA.filter(c=>c.status==="pending");
  return (
    <div className="min-h-screen" style={{backgroundColor:page}}>
      <div className="pt-8 pb-6 px-1" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
        <p className="text-xs mb-3" style={{color:muted}}><span style={{color:ink}}>Andreja Novak</span> / Credentials</p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-2xl" style={{color:ink}}>My Credentials</h1>
            <p className="text-sm mt-0.5" style={{color:muted}}>Digitally signed · verifiable by anyone</p>
          </div>
          <div className="flex gap-4 text-xs" style={{color:muted}}>
            <span><span className="font-bold" style={{color:ink}}>{active.length}</span> active</span>
            <span><span className="font-bold" style={{color:amber}}>{pending.length}</span> pending</span>
          </div>
        </div>
      </div>
      <div className="px-1 py-7 space-y-8">
        <section>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{color:muted}}>Issued credentials</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {active.map(c=>{
              const {Icon,bg,color}=CredTypeStyle(c.type);
              return <button key={c.id} onClick={()=>setSel(c)}
                className="text-left rounded-2xl p-5 flex flex-col gap-4 hover:shadow-lg transition-shadow"
                style={{backgroundColor:white,border:`1px solid ${border}`}}>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor:bg,border:`1px solid ${goldBdr}`}}>
                    <Icon size={22} color={color}/>
                  </div>
                  <span className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase" style={{backgroundColor:greenBg,color:green}}>Active</span>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{color}}>{c.type}</p>
                  <h3 className="text-base font-serif" style={{color:ink}}>{c.title}</h3>
                  <p className="text-xs mt-1" style={{color:muted}}>{c.issuer}</p>
                </div>
                <div className="border-t pt-3 flex justify-between" style={{borderColor:border}}>
                  <span className="font-mono text-[10px]" style={{color:muted}}>{c.code}</span>
                  <span className="text-xs" style={{color:muted}}>{new Date(c.issuedOn).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
                </div>
              </button>;
            })}
          </div>
        </section>
        {pending.length>0&&<section>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{color:muted}}>Pending</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {pending.map(c=>{
              const {Icon,bg,color}=CredTypeStyle(c.type);
              return <div key={c.id} className="rounded-2xl p-5 flex flex-col gap-4 opacity-75"
                style={{backgroundColor:white,border:`1px solid ${border}`}}>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor:bg}}><Icon size={22} color={color}/></div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={{backgroundColor:amberBg,color:amber}}>Pending</span>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{color}}>{c.type}</p>
                  <h3 className="text-base font-serif" style={{color:ink}}>{c.title}</h3>
                  <p className="text-xs mt-1" style={{color:muted}}>{c.issuer}</p>
                </div>
                <p className="text-xs italic" style={{color:muted}}>Awaiting award</p>
              </div>;
            })}
          </div>
        </section>}
        <div className="rounded-2xl p-5 flex gap-4 items-start" style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
          <SealCredIcon size={22}/>
          <div>
            <p className="text-sm font-semibold mb-1" style={{color:ink}}>Your credentials are portable</p>
            <p className="text-xs leading-relaxed" style={{color:muted}}>Each credential is a W3C Verifiable Credential signed by your institution's DID. Share via QR, download as PDF, or add to your EUDI Wallet — with SD-JWT selective disclosure.</p>
          </div>
        </div>
      </div>
      {sel&&<CredentialModal cred={sel} onClose={()=>setSel(null)}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// TIMETABLE PAGE
// ════════════════════════════════════════════════
const WEEK_START=new Date(2025,5,9);
const LECTURES=[
  {id:"l1",day:0,start:8,dur:2,course:"CS-711",title:"Distributed Systems",room:"P-22",type:"lecture",color:violet,bg:violetBg},
  {id:"l2",day:0,start:10,dur:1,course:"CS-604",title:"ML Fundamentals",room:"P-14",type:"lab",color:green,bg:greenBg},
  {id:"l3",day:1,start:9,dur:2,course:"CS-512",title:"Cloud Architecture",room:"A-8",type:"lecture",color:blue,bg:blueBg},
  {id:"l4",day:1,start:14,dur:1,course:"CS-711",title:"Distributed Systems (Lab)",room:"Lab-3",type:"lab",color:violet,bg:violetBg},
  {id:"l5",day:2,start:8,dur:2,course:"CS-604",title:"ML Fundamentals",room:"P-22",type:"lecture",color:green,bg:greenBg},
  {id:"l6",day:2,start:11,dur:1,course:"CS-480",title:"Software Engineering",room:"P-11",type:"seminar",color:amber,bg:amberBg},
  {id:"l7",day:3,start:10,dur:2,course:"CS-512",title:"Cloud Architecture (Lab)",room:"Lab-1",type:"lab",color:blue,bg:blueBg},
  {id:"l8",day:3,start:13,dur:1,course:"CS-711",title:"Distributed Systems (Seminar)",room:"A-5",type:"seminar",color:violet,bg:violetBg},
  {id:"l9",day:4,start:9,dur:2,course:"CS-480",title:"Software Engineering",room:"P-22",type:"lecture",color:amber,bg:amberBg},
];
const EXAMS=[
  {id:"e1",course:"CS-711",title:"Distributed Systems",date:new Date(2025,5,12),startTime:"09:00",room:"Main Hall A",capacity:120,registered:87,type:"written",color:violet,bg:violetBg},
  {id:"e2",course:"CS-604",title:"Machine Learning Fundamentals",date:new Date(2025,5,19),startTime:"13:00",room:"P-22",capacity:60,registered:58,type:"written",color:green,bg:greenBg},
  {id:"e3",course:"CS-512",title:"Cloud Architecture",date:new Date(2025,5,26),startTime:"10:00",room:"Lab-1",capacity:30,registered:21,type:"project",color:blue,bg:blueBg},
  {id:"e4",course:"CS-480",title:"Software Engineering",date:new Date(2025,6,3),startTime:"09:00",room:"Main Hall B",capacity:80,registered:65,type:"oral",color:amber,bg:amberBg},
];
const TODAY_D=9,DAYS_W=["Mon","Tue","Wed","Thu","Fri"],HOURS=[8,9,10,11,12,13,14,15,16];

function TimetablePage(){
  const [view,setView]=useState("week");
  const [hov,setHov]=useState(null);
  const ROW=52,COL=140,LAB=44,gridH=HOURS.length*ROW;
  const daysUntil=d=>Math.round((d-new Date(2025,5,9))/(1000*60*60*24));
  const TypeBadge=({type})=>{const m={written:{l:"Written",bg:"#F1F5F9",c:muted},oral:{l:"Oral",bg:violetBg,c:violet},project:{l:"Project",bg:blueBg,c:blue}};const s=m[type]||m.written;return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide" style={{backgroundColor:s.bg,color:s.c}}>{s.l}</span>;};

  return (
    <div className="min-h-screen" style={{backgroundColor:page}}>
      <div className="pt-8 pb-6 px-1" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
        <p className="text-xs mb-3" style={{color:muted}}><span style={{color:ink}}>Andreja Novak</span> / Timetable</p>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-2xl" style={{color:ink}}>Timetable</h1>
            <p className="text-sm mt-0.5" style={{color:muted}}>Week of 9 Jun 2025 · Spring Term</p>
          </div>
          <div className="flex rounded-xl overflow-hidden border" style={{borderColor:border}}>
            {[["week","Weekly"],["exams","Exams"]].map(([v,l])=>(
              <button key={v} onClick={()=>setView(v)} className="px-4 py-2 text-xs font-semibold transition-colors"
                style={{backgroundColor:view===v?ink:white,color:view===v?white:muted}}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-1 py-6 space-y-5">
        {view==="week"&&<>
          {EXAMS.filter(e=>daysUntil(e.date)<=7).map(e=>(
            <div key={e.id} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{backgroundColor:redBg,border:"1px solid #FECACA"}}>
              <CalIcon size={14} color={red}/>
              <p className="text-xs font-medium" style={{color:red}}>
                Exam in <strong>{daysUntil(e.date)} day{daysUntil(e.date)!==1?"s":""}</strong> — {e.title} · {e.startTime} · {e.room}
              </p>
            </div>
          ))}
          <div className="flex flex-wrap gap-3">
            {[{t:"lecture",l:"Lecture",c:muted,bg:"#F1F5F9"},{t:"lab",l:"Lab",c:green,bg:greenBg},{t:"seminar",l:"Seminar",c:amber,bg:amberBg}].map(({t,l,c,bg})=>(
              <span key={t} className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full" style={{backgroundColor:bg,color:c}}>
                <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:c}}/>{l}
              </span>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl" style={{backgroundColor:white,border:`1px solid ${border}`}}>
            <div className="flex border-b sticky top-0 z-10" style={{borderColor:border,backgroundColor:white}}>
              <div style={{width:LAB,minWidth:LAB}}/>
              {DAYS_W.map((d,i)=>{
                const dt=new Date(WEEK_START);dt.setDate(dt.getDate()+i);const isT=i===0;
                return <div key={d} className="flex-1 py-3 text-center border-l" style={{minWidth:COL,borderColor:border}}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest" style={{color:muted}}>{d}</p>
                  <p className={`text-base font-serif mt-0.5 ${isT?"w-8 h-8 rounded-full flex items-center justify-center mx-auto":""}`}
                    style={{color:isT?white:ink,backgroundColor:isT?ink:"transparent"}}>{dt.getDate()}</p>
                </div>;
              })}
            </div>
            <div className="relative flex" style={{height:gridH}}>
              <div style={{width:LAB,minWidth:LAB}} className="relative">
                {HOURS.map((h,i)=><div key={h} className="absolute flex items-start justify-center w-full" style={{top:i*ROW,height:ROW}}>
                  <span className="text-[10px] mt-1" style={{color:muted}}>{h}:00</span>
                </div>)}
              </div>
              {DAYS_W.map((d,di)=>(
                <div key={d} className="flex-1 relative border-l" style={{minWidth:COL,borderColor:border}}>
                  {HOURS.map((_,i)=><div key={i} className="absolute w-full border-t" style={{top:i*ROW,borderColor:border,opacity:0.6}}/>)}
                  {LECTURES.filter(l=>l.day===di).map(ev=>{
                    const top=(ev.start-HOURS[0])*ROW+2,h=ev.dur*ROW-4,isH=hov===ev.id;
                    return <div key={ev.id} onMouseEnter={()=>setHov(ev.id)} onMouseLeave={()=>setHov(null)}
                      className="absolute left-1 right-1 rounded-lg px-2 py-1.5 cursor-default transition-shadow"
                      style={{top,height:h,backgroundColor:ev.bg,border:`1.5px solid ${ev.color}20`,
                        boxShadow:isH?`0 4px 12px ${ev.color}30`:"none",overflow:"hidden"}}>
                      <p className="text-[10px] font-semibold truncate" style={{color:ev.color}}>{ev.course}</p>
                      <p className="text-[11px] font-medium leading-tight truncate" style={{color:ink}}>{ev.title}</p>
                      {h>42&&<div className="flex items-center gap-1 mt-1" style={{color:muted}}>
                        <RoomIcon/><span className="text-[10px]">{ev.room}</span>
                      </div>}
                    </div>;
                  })}
                </div>
              ))}
            </div>
          </div>
        </>}

        {view==="exams"&&<div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-5">
            <div className="rounded-2xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <p className="text-xs font-semibold mb-4" style={{color:ink}}>June 2025</p>
              <div className="grid grid-cols-7 mb-1">
                {["M","T","W","T","F","S","S"].map((d,i)=><div key={i} className="text-center text-[10px] font-semibold py-1" style={{color:muted}}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-y-0.5">
                {Array.from({length:1}).map((_,i)=><div key={`e${i}`}/>)}
                {Array.from({length:30}).map((_,i)=>{
                  const d=i+1,isT=d===TODAY_D,isE=[12,19,26].includes(d);
                  return <div key={d} className="flex items-center justify-center">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full relative"
                      style={{backgroundColor:isT?ink:"transparent",color:isT?white:d<TODAY_D?"#CBD5E1":ink,
                        fontSize:11,fontWeight:(isE||isT)?700:400}}>
                      {d}{isE&&<span className="absolute bottom-0.5 w-1 h-1 rounded-full" style={{backgroundColor:isT?gold:red}}/>}
                    </div>
                  </div>;
                })}
              </div>
            </div>
            <div className="rounded-2xl p-5 space-y-3" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{color:muted}}>Summary</p>
              {[["Total exams",String(EXAMS.length)],["Written","2"],["Oral","1"],["Project","1"],["First exam in",`${daysUntil(EXAMS[0].date)} days`]].map(([k,v])=>(
                <div key={k} className="flex justify-between text-xs"><span style={{color:muted}}>{k}</span><span className="font-semibold" style={{color:ink}}>{v}</span></div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{color:muted}}>Upcoming exams — Summer 2025</p>
            {EXAMS.map(e=>{
              const days=daysUntil(e.date),pct=Math.round(e.registered/e.capacity*100);
              const Cd=()=>{let bg=page,c=muted;if(days<=3){bg=redBg;c=red;}else if(days<=7){bg=amberBg;c=amber;}return <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{backgroundColor:bg,color:c}}>{days}d</span>;};
              return <div key={e.id} className="rounded-2xl p-5 flex gap-4" style={{backgroundColor:white,border:`1px solid ${border}`}}>
                <div className="shrink-0 w-14 flex flex-col items-center justify-center rounded-xl py-2" style={{backgroundColor:e.bg,border:`1px solid ${e.color}20`}}>
                  <p className="text-[10px] font-semibold uppercase tracking-wide" style={{color:e.color}}>{e.date.toLocaleDateString("en-GB",{month:"short"})}</p>
                  <p className="font-serif text-2xl leading-none mt-0.5" style={{color:ink}}>{e.date.getDate()}</p>
                  <p className="text-[10px] mt-0.5" style={{color:muted}}>{e.date.toLocaleDateString("en-GB",{weekday:"short"})}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-[10px] font-mono" style={{color:muted}}>{e.course}</p>
                    <TypeBadge type={e.type}/><Cd/>
                  </div>
                  <h3 className="text-sm font-semibold" style={{color:ink}}>{e.title}</h3>
                  <div className="flex flex-wrap gap-x-4 mt-2">
                    {[[ClockIcon,e.startTime],[RoomIcon,e.room],[PeopleIcon,`${e.registered}/${e.capacity}`]].map(([I,v],i)=>(
                      <span key={i} className="flex items-center gap-1 text-[11px]" style={{color:muted}}><I/>{v}</span>
                    ))}
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden mt-3" style={{backgroundColor:border}}>
                    <div className="h-full rounded-full" style={{width:`${pct}%`,backgroundColor:pct>90?amber:green}}/>
                  </div>
                </div>
              </div>;
            })}
          </div>
        </div>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// ROADMAP PAGE
// ════════════════════════════════════════════════
const CAREER_TARGETS=[
  {id:"t1",title:"Backend Engineer",match:78,icon:"⚙️"},
  {id:"t2",title:"ML Engineer",match:62,icon:"🤖"},
  {id:"t3",title:"Cloud Architect",match:55,icon:"☁️"},
  {id:"t4",title:"Research Scientist",match:44,icon:"🔬"},
];
const SKILLS=[
  {id:"s1",label:"Distributed Systems",category:"Systems",have:72,need:85},
  {id:"s2",label:"Machine Learning",category:"AI/ML",have:45,need:80},
  {id:"s3",label:"Cloud Infrastructure",category:"DevOps",have:38,need:75},
  {id:"s4",label:"SQL / NoSQL Databases",category:"Data",have:88,need:90},
  {id:"s5",label:"Software Architecture",category:"Engineering",have:61,need:80},
  {id:"s6",label:"Python / Data Science",category:"AI/ML",have:52,need:85},
  {id:"s7",label:"Security & Auth",category:"Systems",have:35,need:60},
  {id:"s8",label:"Technical Writing",category:"Soft",have:70,need:70},
];
const RECS=[
  {id:"r1",code:"CS-720",title:"Formal Methods",ects:6,reason:"Closes logic-proof gap for ML roles",priority:"high",status:"open",color:violet,bg:violetBg},
  {id:"r2",code:"CS-801",title:"Advanced Cryptography",ects:6,reason:"Security gap identified by ESCO match",priority:"medium",status:"open",color:blue,bg:blueBg},
  {id:"r3",code:"DATA-201",title:"Data Engineering",ects:4,reason:"Required for ML Engineer track",priority:"high",status:"full",color:amber,bg:amberBg},
  {id:"r4",code:"CS-670",title:"Human-Computer Interaction",ects:4,reason:"Rounds out software engineering profile",priority:"low",status:"open",color:green,bg:greenBg},
];
const MILESTONES=[
  {id:"m1",label:"Enrolled in programme",done:true,date:"Sep 2023",ects:null},
  {id:"m2",label:"Completed 30 ECTS",done:true,date:"Jan 2024",ects:30},
  {id:"m3",label:"Completed 60 ECTS",done:true,date:"Jun 2024",ects:60},
  {id:"m4",label:"First credential issued",done:true,date:"Jan 2025",ects:null},
  {id:"m5",label:"Complete 90 ECTS",done:false,date:"Jun 2025",ects:90},
  {id:"m6",label:"Thesis proposal approved",done:false,date:"Oct 2025",ects:null},
  {id:"m7",label:"Complete 120 ECTS (degree)",done:false,date:"Jun 2026",ects:120},
  {id:"m8",label:"Degree credential issued",done:false,date:"Jul 2026",ects:null},
];
const catColor={Systems:violet,"AI/ML":blue,DevOps:amber,Data:green,Engineering:rose,Soft:muted};

function RoadmapPage({onNav}){
  const [target,setTarget]=useState("t1");
  const [showT,setShowT]=useState(true);
  const [enrolled2,setEnrolled2]=useState(new Set());
  const [tab,setTab]=useState("skills");
  const t=CAREER_TARGETS.find(x=>x.id===target);

  const Ring=({pct,size=56,sel})=>{
    const r=(size-5)/2,circ=2*Math.PI*r,off=circ*(1-pct/100);
    const col=pct>=70?green:pct>=50?gold:muted;
    return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={sel?inkSoft:border} strokeWidth="4.5"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth="4.5"
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}/>
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="700" fill={sel?white:ink}>{pct}%</text>
    </svg>;
  };

  return (
    <div className="min-h-screen" style={{backgroundColor:page}}>
      <div className="pt-8 pb-6 px-1" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
        <p className="text-xs mb-3" style={{color:muted}}><span style={{color:ink}}>Andreja Novak</span> / Roadmap</p>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="font-serif text-2xl" style={{color:ink}}>Personal Roadmap</h1>
              <QIBadge/>
            </div>
            <p className="text-sm" style={{color:muted}}>AI-generated from your ESCO skill profile · Updated 9 Jun 2025</p>
          </div>
        </div>
      </div>

      <div className="px-1 py-7 space-y-7">
        <section>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{color:muted}}>Career target</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {CAREER_TARGETS.map(ct=>{
              const on=target===ct.id;
              return <button key={ct.id} onClick={()=>setTarget(ct.id)}
                className="rounded-2xl p-4 flex flex-col items-center gap-3 transition-all"
                style={{backgroundColor:on?inkSoft:white,border:`2px solid ${on?ink:border}`,
                  boxShadow:on?"0 8px 24px -6px rgba(15,23,41,0.35)":"none"}}>
                <span className="text-2xl">{ct.icon}</span>
                <Ring pct={ct.match} sel={on}/>
                <p className="text-xs font-semibold text-center leading-tight" style={{color:on?white:ink}}>{ct.title}</p>
              </button>;
            })}
          </div>
        </section>

        <div className="flex border-b" style={{borderColor:border}}>
          {[["skills","Skills gap"],["recs","Recommended"],["milestones","Milestones"]].map(([id,l])=>(
            <button key={id} onClick={()=>setTab(id)} className="px-5 py-2.5 text-xs font-semibold"
              style={{color:tab===id?gold:muted,borderBottom:tab===id?`2px solid ${gold}`:"2px solid transparent"}}>{l}</button>
          ))}
        </div>

        {tab==="skills"&&<div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl p-6" style={{backgroundColor:white,border:`1px solid ${border}`}}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm font-semibold" style={{color:ink}}>ESCO profile vs. {t?.title}</p>
                <p className="text-[11px] mt-0.5" style={{color:muted}}>{SKILLS.filter(s=>s.have>=s.need).length}/{SKILLS.length} skills met</p>
              </div>
              <label className="flex items-center gap-2 text-xs cursor-pointer" style={{color:muted}}>
                <div onClick={()=>setShowT(v=>!v)} className="relative w-8 h-4 rounded-full" style={{backgroundColor:showT?green:border}}>
                  <span className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform"
                    style={{transform:showT?"translateX(17px)":"translateX(2px)"}}/>
                </div>
                Show target
              </label>
            </div>
            {SKILLS.map(s=>{
              const met=s.have>=s.need,gap=Math.max(0,s.need-s.have);
              const cc=catColor[s.category]||muted;
              return <div key={s.id} className="py-3 border-b last:border-0" style={{borderColor:border}}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{backgroundColor:cc+"18",color:cc}}>{s.category}</span>
                    <span className="text-xs font-medium" style={{color:ink}}>{s.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px]" style={{color:muted}}>
                    <span className="font-semibold" style={{color:met?green:ink}}>{s.have}%</span>
                    {showT&&!met&&<span>→ <span style={{color:amber}}>{s.need}%</span></span>}
                    {met&&<span style={{color:green}}>✓</span>}
                  </div>
                </div>
                <div className="relative h-2 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                  {showT&&!met&&<div className="absolute top-0 bottom-0 w-0.5 z-10" style={{left:`${s.need}%`,backgroundColor:amber+"80"}}/>}
                  <div className="absolute top-0 left-0 h-full rounded-full" style={{width:`${Math.min(100,s.have)}%`,backgroundColor:met?green:cc}}/>
                </div>
                {showT&&!met&&<p className="text-[10px] mt-1" style={{color:muted}}>Gap: <span style={{color:amber,fontWeight:600}}>{gap} pts</span></p>}
              </div>;
            })}
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={{backgroundColor:inkSoft}}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{color:"#94A3B8"}}>Overall match</p>
              <p className="font-serif text-5xl" style={{color:white}}>{t?.match}<span className="text-2xl">%</span></p>
              <p className="text-xs mt-2" style={{color:"#94A3B8"}}>for {t?.title}</p>
              <div className="mt-4 h-1.5 rounded-full overflow-hidden" style={{backgroundColor:"rgba(255,255,255,0.1)"}}>
                <div className="h-full rounded-full" style={{width:`${t?.match}%`,backgroundColor:gold}}/>
              </div>
            </div>
            <div className="rounded-2xl p-5 space-y-3" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{color:muted}}>Top gaps</p>
              {SKILLS.filter(s=>s.have<s.need).sort((a,b)=>(b.need-b.have)-(a.need-a.have)).slice(0,4).map(s=>(
                <div key={s.id} className="flex justify-between items-center text-xs">
                  <span className="truncate mr-2" style={{color:ink}}>{s.label}</span>
                  <span className="font-semibold shrink-0" style={{color:rose}}>−{s.need-s.have} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>}

        {tab==="recs"&&<div className="space-y-4">
          <p className="text-[11px]" style={{color:muted}}>
            {RECS.length} recommendations to close your gap for <span style={{color:ink,fontWeight:600}}>{t?.title}</span>. Completing all would raise your match to an estimated <span style={{color:green,fontWeight:600}}>91%</span>.
          </p>
          {RECS.map(r=>{
            const pri={high:{l:"High priority",bg:roseBg,c:rose},medium:{l:"Recommended",bg:amberBg,c:amber},low:{l:"Optional",bg:page,c:muted}}[r.priority];
            return <div key={r.id} className="rounded-xl p-4 flex gap-4" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{backgroundColor:r.bg}}>
                <span className="text-[10px] font-bold font-mono" style={{color:r.color}}>{r.ects}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-[10px] font-mono" style={{color:muted}}>{r.code}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{backgroundColor:pri.bg,color:pri.c}}>{pri.l}</span>
                </div>
                <p className="text-sm font-semibold" style={{color:ink}}>{r.title}</p>
                <p className="text-[11px] mt-0.5" style={{color:muted}}>{r.reason}</p>
              </div>
              <div className="shrink-0 self-center">
                {enrolled2.has(r.id)
                  ? <span className="text-[11px] font-semibold" style={{color:green}}>✓ Enrolled</span>
                  : r.status==="full"
                  ? <span className="text-[11px]" style={{color:muted}}>Full</span>
                  : <button onClick={()=>{setEnrolled2(p=>new Set([...p,r.id]));onNav("courses");}}
                      className="text-[11px] font-semibold px-3 py-1.5 rounded-lg text-white" style={{backgroundColor:ink}}>
                      Enrol
                    </button>
                }
              </div>
            </div>;
          })}
          <div className="rounded-xl p-4 flex items-start gap-3" style={{backgroundColor:blueBg,border:"1px solid #BFDBFE"}}>
            <LightningIcon size={16} color={blue}/>
            <p className="text-xs" style={{color:blue}}>Tip: completing <strong>Formal Methods</strong> and <strong>Data Engineering</strong> first covers 60% of your gap for the {t?.title} track.</p>
          </div>
        </div>}

        {tab==="milestones"&&<div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl p-6" style={{backgroundColor:white,border:`1px solid ${border}`}}>
            <p className="text-sm font-semibold mb-6" style={{color:ink}}>MSc Computer Science · degree journey</p>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                <div className="h-full rounded-full" style={{width:`${Math.round(MILESTONES.filter(m=>m.done).length/MILESTONES.length*100)}%`,backgroundColor:gold}}/>
              </div>
              <span className="text-xs font-semibold shrink-0" style={{color:gold}}>{Math.round(MILESTONES.filter(m=>m.done).length/MILESTONES.length*100)}% complete</span>
            </div>
            <ol className="relative" style={{paddingLeft:28}}>
              <div className="absolute top-0 bottom-0 w-0.5 left-3" style={{backgroundColor:border}}/>
              {MILESTONES.map((m,i)=>{
                const isCur=!m.done&&MILESTONES[i-1]?.done;
                return <li key={m.id} className={`relative flex items-start gap-4 ${i<MILESTONES.length-1?"pb-6":""}`}>
                  <div className="absolute -left-0.5 w-7 flex justify-center" style={{top:2}}>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center z-10"
                      style={{backgroundColor:m.done?green:isCur?gold:white,border:`2px solid ${m.done?green:isCur?gold:border}`}}>
                      {m.done&&<svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3 5.5 6.5 2" stroke={white} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      {isCur&&<div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:white}}/>}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className="text-sm font-medium" style={{color:m.done?ink:isCur?ink:muted}}>{m.label}</p>
                      <span className="text-[11px]" style={{color:isCur?gold:muted}}>{isCur?"⬡ In progress · ":""}{m.date}</span>
                    </div>
                  </div>
                </li>;
              })}
            </ol>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{color:muted}}>Snapshot</p>
              {[["ECTS earned","68 / 120",gold],["Courses done","4",green],["Credentials","2 active",violet],["Expected award","Jul 2026",muted]].map(([k,v,c])=>(
                <div key={k} className="flex justify-between py-2.5 border-b last:border-0 text-xs" style={{borderColor:border}}>
                  <span style={{color:muted}}>{k}</span><span className="font-semibold" style={{color:c}}>{v}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-5" style={{backgroundColor:inkSoft}}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{color:"#94A3B8"}}>Next milestone</p>
              <p className="font-serif text-base text-white">Complete 90 ECTS</p>
              <p className="text-xs mt-1" style={{color:"#94A3B8"}}>22 ECTS remaining · Jun 2025</p>
              <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{backgroundColor:"rgba(255,255,255,0.1)"}}>
                <div className="h-full rounded-full" style={{width:`${68/90*100}%`,backgroundColor:gold}}/>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════
export default function EduxcertApp() {
  const [loggedIn,setLoggedIn]=useState(false);
  const [nav,setNav]=useState("dashboard");
  const [collapsed,setCollapsed]=useState(false);

  if(!loggedIn) return <LoginPage onLogin={()=>{setLoggedIn(true);setNav("dashboard");}}/>;

  const views={
    dashboard: <DashboardView onNav={setNav}/>,
    courses:   <CoursesPage/>,
    credentials:<CredentialsPage/>,
    timetable: <TimetablePage/>,
    roadmap:   <RoadmapPage onNav={setNav}/>,
  };

  return (
    <div className="flex h-screen" style={{backgroundColor:page}}>
      <Sidebar active={nav} onNav={setNav} collapsed={collapsed}
        onToggle={()=>setCollapsed(v=>!v)}
        onLogout={()=>{setLoggedIn(false);setNav("dashboard");}}/>
      <main className="flex-1 overflow-auto p-6 lg:p-8" style={{minWidth:0}}>
        {views[nav]}
      </main>
    </div>
  );
}
