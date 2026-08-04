import { useState } from "react";

// ════════════════════════════════════════════════
// TOKENS
// ════════════════════════════════════════════════
const ink      = "#0F1729";
const inkSoft  = "#1B2A4A";
const gold     = "#B08D57";
const goldBg   = "#FBF7F0";
const goldBdr  = "#EFD8B0";
const page     = "#F3F5F8";
const white    = "#FFFFFF";
const muted    = "#64748B";
const border   = "#E2E8F0";
const green    = "#16A34A";
const greenBg  = "#DCFCE7";
const amber    = "#D97706";
const amberBg  = "#FEF3C7";
const violet   = "#7C3AED";
const violetBg = "#EDE9FE";
const blue     = "#2563EB";
const blueBg   = "#DBEAFE";
const red      = "#DC2626";
const redBg    = "#FEE2E2";
const teal     = "#0D9488";
const tealBg   = "#CCFBF1";

// ════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════
const USER = {
  name: "Andreja Novak",
  initials: "AN",
  email: "a.novak@student.uni-lj.si",
  institution: "University of Ljubljana",
  programme: "MSc Computer Science",
  role: "student",
  did: "did:ebsi:andreja-novak-2024",
  locale: "en-GB",
  mfa: true,
  joinedOn: "September 2023",
  walletConnected: true,
};

const CONSENTS = [
  { id:"qi",    label:"Quality Intelligence (QI)",     desc:"Allow QI to analyse your learning patterns and generate personalised roadmaps.",      granted:true,  required:false },
  { id:"share", label:"Share anonymised data with EQAR",desc:"Contribute anonymised academic data to the European Quality Assurance Register.",     granted:true,  required:false },
  { id:"push",  label:"Push notifications",             desc:"Receive grade alerts, exam reminders, and credential issuance notices.",              granted:true,  required:false },
  { id:"bench", label:"Benchmarking pool",              desc:"Allow your ECTS progress to be included in peer-institution benchmarks (anonymised).", granted:false, required:false },
  { id:"core",  label:"Essential platform cookies",    desc:"Required for authentication and session security. Cannot be disabled.",               granted:true,  required:true  },
];

const NOTIFICATIONS = [
  { id:"n1",  ts:"Today, 14:23",     type:"appeal",     read:false, title:"Grade appeal resolved",         body:"Your appeal for CS-711 Distributed Systems has been reviewed. Final grade: 9/10." },
  { id:"n2",  ts:"Today, 09:05",     type:"grade",      read:false, title:"Grade published",               body:"Prof. Kovač published your grade for Distributed Systems — 9/10." },
  { id:"n3",  ts:"Yesterday, 16:40", type:"credential", read:false, title:"Credential ready",              body:"Your certificate for Database Architecture (EDX-4401-DB03) is ready to share." },
  { id:"n4",  ts:"Yesterday, 08:00", type:"exam",       read:true,  title:"Exam reminder",                 body:"ML Fundamentals exam tomorrow at 13:00 in P-22. Don't forget your student ID." },
  { id:"n5",  ts:"Jun 7, 11:15",     type:"ects",       read:true,  title:"ECTS awarded",                  body:"4 ECTS awarded for completing Database Architecture. Your total: 68 / 120 ECTS." },
  { id:"n6",  ts:"Jun 5, 09:30",     type:"roadmap",    read:true,  title:"Roadmap updated",               body:"QI refreshed your career roadmap. New recommendation: Formal Methods (CS-720)." },
  { id:"n7",  ts:"Jun 3, 14:00",     type:"enrol",      read:true,  title:"Enrolment confirmed",           body:"You're enrolled in Cloud Architecture (CS-512). Check your timetable for session times." },
  { id:"n8",  ts:"May 28, 10:00",    type:"benefit",    read:true,  title:"Student benefit redeemed",      body:"Meal discount used at UL Cafeteria — 30% off. Monthly usage: 3/10." },
];

const NOTIF_PREFS = [
  { id:"grades",      label:"Grade & exam results",  email:true,  push:true,  sms:false },
  { id:"credentials", label:"Credential issuance",   email:true,  push:true,  sms:false },
  { id:"exams",       label:"Exam reminders",        email:true,  push:true,  sms:true  },
  { id:"enrol",       label:"Enrolment changes",     email:true,  push:false, sms:false },
  { id:"roadmap",     label:"Roadmap & QI updates",  email:false, push:true,  sms:false },
  { id:"benefits",    label:"Benefit redemptions",   email:false, push:true,  sms:false },
];

const BENEFITS = [
  { id:"b1",  category:"Meals",       partner:"UL Cafeteria",            discount:"30%",  used:3,  limit:10, status:"active",
    desc:"Show QR at any University of Ljubljana cafeteria for 30% off meals.",
    icon:"🍽️", color:teal,   bg:tealBg   },
  { id:"b2",  category:"Transport",   partner:"Ljubljanski Potniški Promet",discount:"50%",used:8,  limit:30, status:"active",
    desc:"50% discount on monthly bus/tram passes in Ljubljana.",
    icon:"🚌", color:blue,   bg:blueBg   },
  { id:"b3",  category:"Discounts",   partner:"Celtra Technologies",     discount:"20%",  used:0,  limit:5,  status:"active",
    desc:"20% off Celtra SaaS products for students. Verify once, use for full term.",
    icon:"💻", color:violet, bg:violetBg },
  { id:"b4",  category:"Sports",      partner:"UL Sports Centre",        discount:"Free", used:12, limit:null,status:"active",
    desc:"Free access to university sports facilities with valid student-status credential.",
    icon:"🏋️", color:green,  bg:greenBg  },
  { id:"b5",  category:"Library",     partner:"NUK — National Library",  discount:"Free", used:0,  limit:null,status:"active",
    desc:"Free access to NUK digital archives and reading rooms.",
    icon:"📚", color:amber,  bg:amberBg  },
];

// ════════════════════════════════════════════════
// ICONS
// ════════════════════════════════════════════════
function UserIcon({size=16,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="3" stroke={color} strokeWidth="1.3"/><path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>;}
function BellIcon({size=16,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M8 2a5 5 0 0 1 5 5v3l1.5 2h-13L3 10V7a5 5 0 0 1 5-5z" stroke={color} strokeWidth="1.3"/><path d="M6.5 13a1.5 1.5 0 0 0 3 0" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>;}
function GiftIcon({size=16,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><rect x="1.5" y="6" width="13" height="8" rx="1.5" stroke={color} strokeWidth="1.3"/><path d="M1.5 9h13M8 6v8" stroke={color} strokeWidth="1.3"/><path d="M8 6C8 4 6 2 4.5 3.5S5 6 8 6zM8 6c0-2 2-4 3.5-2.5S11 6 8 6z" stroke={color} strokeWidth="1.2"/></svg>;}
function ShieldIcon({size=16,color=green}){return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2 4v5c0 3.5 2.7 5.5 6 6 3.3-.5 6-2.5 6-6V4L8 1.5z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/><path d="M5.5 8l2 2L11 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;}
function WalletIcon({size=16,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><rect x="1.5" y="4" width="13" height="10" rx="1.5" stroke={color} strokeWidth="1.3"/><path d="M1.5 7h13" stroke={color} strokeWidth="1.3"/><circle cx="11.5" cy="10" r="1" fill={color}/></svg>;}
function DownloadIcon({size=14,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M8 3v7M5 8l3 3 3-3" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13h10" stroke={color} strokeWidth="1.4" strokeLinecap="round"/></svg>;}
function KeyIcon({size=14,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><circle cx="6" cy="8" r="3.5" stroke={color} strokeWidth="1.3"/><path d="M9 8.5l5-4.5M14 4l-1 1.5M12 5.5l-1 1" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>;}
function TrashIcon({size=14,color=red}){return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M3 4h10M6 4V2h4v2M5 4v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;}
function CheckIcon({size=14,color=green}){return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;}
function XIcon({size=14,color=muted}){return <svg width={size} height={size} viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;}
function ExternalIcon({size=12,color="currentColor"}){return <svg width={size} height={size} viewBox="0 0 12 12" fill="none"><path d="M7 2h3v3M10 2L5.5 6.5M6 3H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V7" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;}

// ════════════════════════════════════════════════
// SHARED UI
// ════════════════════════════════════════════════
function Toggle({on, onChange}){
  return(
    <button onClick={()=>onChange(!on)}
      className="relative w-10 h-5 rounded-full transition-colors shrink-0"
      style={{backgroundColor:on?green:border}}>
      <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
        style={{transform:on?"translateX(21px)":"translateX(2px)"}}/>
    </button>
  );
}
function SectionCard({title, children, action}){
  return(
    <div className="rounded-2xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
      <div className="px-6 py-4 flex items-center justify-between border-b" style={{borderColor:border}}>
        <p className="text-sm font-semibold" style={{color:ink}}>{title}</p>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
function Toast({msg,ok}){
  return(
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl shadow-xl text-sm font-medium text-white flex items-center gap-2 z-50"
      style={{backgroundColor:ok?ink:"#475569"}}>
      {ok?<CheckIcon size={14} color={gold}/>:<XIcon size={14} color={white}/>}{msg}
    </div>
  );
}

// notification type config
const N_TYPE = {
  grade:      {dot:amber,  label:"Grade"     },
  appeal:     {dot:red,    label:"Appeal"    },
  credential: {dot:gold,   label:"Credential"},
  exam:       {dot:violet, label:"Exam"      },
  ects:       {dot:green,  label:"ECTS"      },
  roadmap:    {dot:blue,   label:"Roadmap"   },
  enrol:      {dot:teal,   label:"Enrolment" },
  benefit:    {dot:teal,   label:"Benefit"   },
};

// ════════════════════════════════════════════════
// QR CODE (same seed-based as other portals)
// ════════════════════════════════════════════════
function QRCode({value,size=120}){
  const cells=21,cell=size/cells;
  const hash=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=(h*0x01000193)>>>0;}return h;};
  const seed=hash(value),bits=[];
  for(let i=0;i<cells*cells;i++)bits.push(((seed>>(i%32))&1)===1);
  const isCorner=(r,c)=>(r<7&&c<7)||(r<7&&c>=cells-7)||(r>=cells-7&&c<7);
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    <rect width={size} height={size} fill={white} rx="6"/>
    {Array.from({length:cells}).map((_,r)=>Array.from({length:cells}).map((_,c)=>{
      const on=isCorner(r,c)?true:bits[r*cells+c];
      return on?<rect key={`${r}-${c}`} x={c*cell+0.5} y={r*cell+0.5} width={cell-1} height={cell-1} rx="0.4" fill={ink}/>:null;
    }))}
    {[[0,0],[0,cells-7],[cells-7,0]].map(([tr,tc],i)=><g key={i}>
      <rect x={tc*cell} y={tr*cell} width={7*cell} height={7*cell} fill="none" stroke={ink} strokeWidth={cell*.8}/>
      <rect x={(tc+2)*cell} y={(tr+2)*cell} width={3*cell} height={3*cell} fill={ink}/>
    </g>)}
  </svg>;
}

// ════════════════════════════════════════════════
// PROFILE PAGE
// ════════════════════════════════════════════════
function ProfilePage(){
  const [user,setUser]       = useState(USER);
  const [consents,setConsents]= useState(CONSENTS);
  const [editMode,setEditMode]= useState(false);
  const [form,setForm]       = useState({name:USER.name,email:USER.email,locale:USER.locale});
  const [delModal,setDelModal]= useState(false);
  const [toast,setToast]     = useState(null);
  const [tab,setTab]         = useState("account");

  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  const saveProfile=()=>{
    setUser(u=>({...u,...form}));
    setEditMode(false);
    showToast("Profile saved.");
  };
  const toggleConsent=(id)=>{
    setConsents(cs=>cs.map(c=>c.id===id&&!c.required?{...c,granted:!c.granted}:c));
    showToast("Consent preference updated.");
  };

  const TABS=[
    {id:"account",  label:"Account"},
    {id:"privacy",  label:"Privacy & Consent"},
    {id:"security", label:"Security"},
    {id:"did",      label:"Digital Identity"},
  ];

  return(
    <div className="min-h-screen" style={{backgroundColor:page}}>
      {/* Header */}
      <div className="pt-8 pb-6 px-6 lg:px-10" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs mb-4" style={{color:muted}}>
            <span style={{color:ink}}>{user.name}</span> / Profile
          </p>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0"
              style={{backgroundColor:ink}}>
              {user.initials}
            </div>
            <div>
              <h1 className="font-serif text-2xl" style={{color:ink}}>{user.name}</h1>
              <p className="text-sm mt-0.5" style={{color:muted}}>
                {user.programme} · {user.institution}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{backgroundColor:greenBg,color:green}}>Active</span>
                {user.mfa&&<span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{backgroundColor:tealBg,color:teal}}>MFA enabled</span>}
                {user.walletConnected&&<span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{backgroundColor:violetBg,color:violet}}>EUDI Wallet linked</span>}
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 mt-6">
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                className="px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors"
                style={{backgroundColor:tab===t.id?page:"transparent",color:tab===t.id?ink:muted,
                  borderBottom:tab===t.id?`2px solid ${gold}`:"2px solid transparent"}}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-7 space-y-5">

        {/* ── ACCOUNT ── */}
        {tab==="account"&&(
          <div className="space-y-5">
            <SectionCard title="Personal information"
              action={
                editMode
                  ? <div className="flex gap-2">
                      <button onClick={()=>setEditMode(false)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                        style={{borderColor:border,color:muted}}>Cancel</button>
                      <button onClick={saveProfile}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                        style={{backgroundColor:ink}}>Save</button>
                    </div>
                  : <button onClick={()=>setEditMode(true)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                      style={{borderColor:border,color:muted}}>Edit</button>
              }>
              <div className="space-y-4">
                {[
                  {label:"Full name",     key:"name",   type:"text",   editable:true},
                  {label:"Email address", key:"email",  type:"email",  editable:true},
                  {label:"Institution",   value:user.institution,      editable:false},
                  {label:"Programme",     value:user.programme,        editable:false},
                  {label:"Role",          value:"Student",             editable:false},
                  {label:"Member since",  value:user.joinedOn,         editable:false},
                  {label:"Language",      key:"locale", type:"select", editable:true,
                    opts:["en-GB","sl-SI","de-DE","fr-FR"]},
                ].map(({label,key,type,editable,value,opts})=>(
                  <div key={label} className="flex items-center justify-between gap-4 py-2.5 border-b last:border-0"
                    style={{borderColor:border}}>
                    <p className="text-xs font-medium shrink-0 w-32" style={{color:muted}}>{label}</p>
                    {editMode&&editable&&key
                      ? type==="select"
                        ? <select value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                            className="flex-1 max-w-xs rounded-lg border px-3 py-1.5 text-sm outline-none"
                            style={{borderColor:border,color:ink}}>
                            {opts.map(o=><option key={o}>{o}</option>)}
                          </select>
                        : <input type={type} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                            className="flex-1 max-w-xs rounded-lg border px-3 py-1.5 text-sm outline-none"
                            style={{borderColor:border,color:ink}}
                            onFocus={e=>e.target.style.borderColor=gold}
                            onBlur={e=>e.target.style.borderColor=border}/>
                      : <p className="text-sm flex-1 text-right" style={{color:ink}}>{key?form[key]||user[key]:value}</p>
                    }
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Data export */}
            <SectionCard title="Data portability">
              <p className="text-xs mb-4" style={{color:muted}}>
                Under GDPR Art. 20 you can export all your personal data.
                The archive includes credentials, grades, consents, and audit trail as a signed JSON + PDF bundle.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={()=>showToast("Export started — you'll receive an email with the download link within 24h.")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border"
                  style={{borderColor:border,color:ink}}>
                  <DownloadIcon size={14}/> Export my data (JSON + PDF)
                </button>
              </div>
            </SectionCard>

            {/* Danger zone */}
            <div className="rounded-2xl p-5" style={{border:`1.5px solid #FECACA`,backgroundColor:"#FFFAFA"}}>
              <p className="text-xs font-semibold mb-1" style={{color:red}}>Danger zone</p>
              <p className="text-xs mb-4" style={{color:muted}}>
                Deleting your account is permanent. All personal data will be erased within 30 days
                per GDPR Art. 17. Issued credentials remain valid on the blockchain — only your
                Eduxcert account and PII are removed.
              </p>
              <button onClick={()=>setDelModal(true)}
                className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg"
                style={{backgroundColor:redBg,color:red,border:`1px solid #FECACA`}}>
                <TrashIcon size={13}/> Request account deletion
              </button>
            </div>
          </div>
        )}

        {/* ── PRIVACY & CONSENT ── */}
        {tab==="privacy"&&(
          <div className="space-y-5">
            <div className="rounded-xl p-4 flex items-start gap-3"
              style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
              <ShieldIcon size={16} color={gold}/>
              <p className="text-xs" style={{color:amber}}>
                Eduxcert processes data under GDPR Art. 6(1)(b) — performance of contract — and
                Art. 6(1)(a) — consent — where indicated. You can withdraw consent at any time.
                Purpose and retention are listed per consent below.
              </p>
            </div>

            <SectionCard title="Consent management">
              <div className="space-y-4">
                {consents.map(c=>(
                  <div key={c.id} className="flex items-start gap-4 py-3 border-b last:border-0"
                    style={{borderColor:border}}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-xs font-semibold" style={{color:ink}}>{c.label}</p>
                        {c.required&&(
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                            style={{backgroundColor:page,color:muted,border:`1px solid ${border}`}}>REQUIRED</span>
                        )}
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{color:muted}}>{c.desc}</p>
                    </div>
                    <Toggle on={c.granted} onChange={()=>!c.required&&toggleConsent(c.id)}/>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Consent history">
              <div className="space-y-3">
                {[
                  {event:"QI consent granted",           ts:"Sep 5, 2023",  by:"User"},
                  {event:"Push notifications enabled",    ts:"Sep 5, 2023",  by:"User"},
                  {event:"EQAR sharing enabled",          ts:"Oct 1, 2023",  by:"User"},
                  {event:"Benchmarking pool declined",    ts:"Feb 14, 2025", by:"User"},
                ].map((e,i)=>(
                  <div key={i} className="flex justify-between text-xs py-2 border-b last:border-0"
                    style={{borderColor:border}}>
                    <span style={{color:ink}}>{e.event}</span>
                    <div className="text-right">
                      <span style={{color:muted}}>{e.ts}</span>
                      <span className="ml-2 font-semibold" style={{color:muted}}>·{e.by}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* ── SECURITY ── */}
        {tab==="security"&&(
          <div className="space-y-5">
            <SectionCard title="Authentication">
              <div className="space-y-4">
                {/* Password */}
                <div className="flex items-center justify-between py-3 border-b" style={{borderColor:border}}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{backgroundColor:page}}>
                      <KeyIcon size={16} color={muted}/>
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{color:ink}}>Password</p>
                      <p className="text-[11px]" style={{color:muted}}>Managed by Keycloak SSO · last changed 90 days ago</p>
                    </div>
                  </div>
                  <button onClick={()=>showToast("Password reset email sent.")}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                    style={{borderColor:border,color:muted}}>
                    Change
                  </button>
                </div>

                {/* MFA */}
                <div className="flex items-center justify-between py-3 border-b" style={{borderColor:border}}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{backgroundColor:tealBg}}>
                      <ShieldIcon size={16} color={teal}/>
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{color:ink}}>Multi-factor authentication</p>
                      <p className="text-[11px]" style={{color:teal}}>✓ Enabled — TOTP authenticator app</p>
                    </div>
                  </div>
                  <button onClick={()=>showToast("MFA settings opened in Keycloak.")}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                    style={{borderColor:border,color:muted}}>
                    Manage
                  </button>
                </div>

                {/* WebAuthn */}
                <div className="flex items-center justify-between py-3" style={{borderColor:border}}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{backgroundColor:violetBg}}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="3" y="3" width="10" height="10" rx="3" stroke={violet} strokeWidth="1.3"/>
                        <circle cx="8" cy="8" r="2" fill={violet} opacity="0.6"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{color:ink}}>Passkey (WebAuthn)</p>
                      <p className="text-[11px]" style={{color:muted}}>No passkeys registered yet</p>
                    </div>
                  </div>
                  <button onClick={()=>showToast("Passkey registration initiated.")}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{backgroundColor:violetBg,color:violet,border:`1px solid #C4B5FD`}}>
                    Add passkey
                  </button>
                </div>
              </div>
            </SectionCard>

            {/* Active sessions */}
            <SectionCard title="Active sessions">
              <div className="space-y-3">
                {[
                  {device:"Chrome · macOS",     ip:"193.2.xx.xx",  location:"Ljubljana, SI", current:true},
                  {device:"Safari · iPhone 15", ip:"193.2.xx.xx",  location:"Ljubljana, SI", current:false},
                ].map((s,i)=>(
                  <div key={i} className="flex items-center justify-between py-2.5 border-b last:border-0"
                    style={{borderColor:border}}>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold" style={{color:ink}}>{s.device}</p>
                        {s.current&&<span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{backgroundColor:greenBg,color:green}}>This device</span>}
                      </div>
                      <p className="text-[11px]" style={{color:muted}}>{s.ip} · {s.location}</p>
                    </div>
                    {!s.current&&(
                      <button onClick={()=>showToast("Session revoked.",false)}
                        className="text-[11px] font-medium" style={{color:red}}>
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* ── DIGITAL IDENTITY ── */}
        {tab==="did"&&(
          <div className="space-y-5">
            <SectionCard title="Your decentralised identity (DID)">
              <div className="space-y-4">
                <div className="rounded-xl p-4" style={{backgroundColor:inkSoft}}>
                  <p className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{color:gold}}>Subject DID</p>
                  <p className="text-sm font-mono break-all text-white">{user.did}</p>
                  <p className="text-[11px] mt-2" style={{color:"#94A3B8"}}>
                    This DID is the cryptographic subject identifier embedded in all your credentials.
                    It is registered in EBSI.
                  </p>
                </div>
                {[
                  {label:"DID method",     value:"did:ebsi"},
                  {label:"Key algorithm",  value:"Ed25519"},
                  {label:"Status",         value:"Active · on-chain"},
                  {label:"Registered",     value:"September 2023"},
                ].map(({label,value})=>(
                  <div key={label} className="flex justify-between py-2 border-b last:border-0 text-xs"
                    style={{borderColor:border}}>
                    <span style={{color:muted}}>{label}</span>
                    <span className="font-semibold" style={{color:ink}}>{value}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="EUDI Wallet connection">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{backgroundColor:user.walletConnected?violetBg:page}}>
                  <WalletIcon size={22} color={user.walletConnected?violet:muted}/>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{color:ink}}>
                    {user.walletConnected?"Wallet connected":"No wallet connected"}
                  </p>
                  <p className="text-[11px]" style={{color:user.walletConnected?violet:muted}}>
                    {user.walletConnected?"All issued credentials are pushed to your EUDI Wallet automatically."
                      :"Connect your EUDI Wallet to receive credentials directly."}
                  </p>
                </div>
              </div>
              {user.walletConnected?(
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={()=>showToast("Wallet sync started.")}
                    className="py-2.5 rounded-xl text-xs font-semibold border text-center"
                    style={{borderColor:border,color:ink}}>
                    Sync credentials
                  </button>
                  <button onClick={()=>{setUser(u=>({...u,walletConnected:false}));showToast("Wallet disconnected.",false);}}
                    className="py-2.5 rounded-xl text-xs font-semibold text-center"
                    style={{backgroundColor:redBg,color:red}}>
                    Disconnect wallet
                  </button>
                </div>
              ):(
                <button onClick={()=>{setUser(u=>({...u,walletConnected:true}));showToast("EUDI Wallet connected via OID4VCI.");}}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{backgroundColor:violet}}>
                  Connect EUDI Wallet (OID4VCI) →
                </button>
              )}
            </SectionCard>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {delModal&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{backgroundColor:"rgba(15,23,41,0.6)",backdropFilter:"blur(3px)"}}>
          <div className="w-full max-w-sm rounded-2xl p-7 shadow-2xl" style={{backgroundColor:white}}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{backgroundColor:redBg}}>
              <TrashIcon size={20}/>
            </div>
            <h3 className="font-serif text-lg mb-2" style={{color:ink}}>Request account deletion</h3>
            <p className="text-xs mb-5 leading-relaxed" style={{color:muted}}>
              All personal data will be erased within 30 days (GDPR Art. 17). Your issued credentials
              remain cryptographically valid — only your Eduxcert account and linked PII are removed.
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={()=>setDelModal(false)}
                className="flex-1 py-2.5 rounded-xl border text-sm font-medium"
                style={{borderColor:border,color:muted}}>Cancel</button>
              <button onClick={()=>{setDelModal(false);showToast("Deletion request submitted. You will receive a confirmation email.",false);}}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{backgroundColor:red}}>
                Confirm deletion
              </button>
            </div>
          </div>
        </div>
      )}

      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// NOTIFICATIONS PAGE
// ════════════════════════════════════════════════
function NotificationsPage(){
  const [notifs,setNotifs]  = useState(NOTIFICATIONS);
  const [prefs,setPrefs]    = useState(NOTIF_PREFS);
  const [tab,setTab]        = useState("inbox");
  const [filter,setFilter]  = useState("all");
  const [toast,setToast]    = useState(null);

  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};
  const unread = notifs.filter(n=>!n.read).length;
  const markAll=()=>{setNotifs(ns=>ns.map(n=>({...n,read:true})));showToast("All notifications marked as read.");};
  const markOne=(id)=>setNotifs(ns=>ns.map(n=>n.id===id?{...n,read:true}:n));
  const del=(id)=>setNotifs(ns=>ns.filter(n=>n.id!==id));

  const filtered = filter==="all" ? notifs : notifs.filter(n=>n.type===filter);

  const togglePref=(id,ch)=>{
    setPrefs(ps=>ps.map(p=>p.id===id?{...p,[ch]:!p[ch]}:p));
    showToast("Notification preference saved.");
  };

  return(
    <div className="min-h-screen" style={{backgroundColor:page}}>
      {/* Header */}
      <div className="pt-8 pb-6 px-6 lg:px-10" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs mb-3" style={{color:muted}}>
            <span style={{color:ink}}>Andreja Novak</span> / Notifications
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-serif text-2xl" style={{color:ink}}>Notifications</h1>
              {unread>0&&<p className="text-sm mt-0.5" style={{color:muted}}>
                <span className="font-semibold" style={{color:amber}}>{unread} unread</span>
              </p>}
            </div>
            {tab==="inbox"&&unread>0&&(
              <button onClick={markAll} className="text-xs font-medium" style={{color:gold}}>
                Mark all as read
              </button>
            )}
          </div>
          <div className="flex gap-1 mt-6">
            {[["inbox","Inbox"],["preferences","Preferences"]].map(t=>(
              <button key={t[0]} onClick={()=>setTab(t[0])}
                className="px-4 py-2 text-xs font-semibold rounded-t-lg"
                style={{backgroundColor:tab===t[0]?page:"transparent",color:tab===t[0]?ink:muted,
                  borderBottom:tab===t[0]?`2px solid ${gold}`:"2px solid transparent"}}>
                {t[1]}
                {t[0]==="inbox"&&unread>0&&(
                  <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{backgroundColor:amber,color:white}}>{unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-6 space-y-5">

        {/* ── INBOX ── */}
        {tab==="inbox"&&(
          <>
            {/* Type filters */}
            <div className="flex flex-wrap gap-2">
              {[["all","All"],["grade","Grades"],["credential","Credentials"],["exam","Exams"],["ects","ECTS"],["roadmap","Roadmap"]].map(([v,l])=>(
                <button key={v} onClick={()=>setFilter(v)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                  style={{backgroundColor:filter===v?ink:white,color:filter===v?white:muted,
                    border:`1px solid ${filter===v?ink:border}`}}>
                  {l}
                </button>
              ))}
            </div>

            {filtered.length===0?(
              <div className="rounded-2xl py-16 flex flex-col items-center gap-3"
                style={{backgroundColor:white,border:`1px solid ${border}`}}>
                <p className="text-3xl">🔔</p>
                <p className="text-sm font-medium" style={{color:ink}}>No notifications</p>
                <p className="text-xs" style={{color:muted}}>You're all caught up.</p>
              </div>
            ):(
              <div className="rounded-2xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
                {filtered.map((n,i)=>{
                  const t=N_TYPE[n.type]||{dot:muted,label:""};
                  return(
                    <div key={n.id} onClick={()=>markOne(n.id)}
                      className="flex items-start gap-4 px-5 py-4 border-b last:border-0 cursor-pointer transition-colors hover:bg-gray-50"
                      style={{borderColor:border,backgroundColor:n.read?"transparent":`${amber}08`}}>
                      {/* Dot */}
                      <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full"
                          style={{backgroundColor:n.read?border:t.dot}}/>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <p className="text-xs font-semibold" style={{color:n.read?muted:ink}}>{n.title}</p>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                            style={{backgroundColor:page,color:muted}}>{t.label}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed" style={{color:muted}}>{n.body}</p>
                        <p className="text-[10px] mt-1.5" style={{color:border}}>{n.ts}</p>
                      </div>
                      {/* Actions */}
                      <button onClick={e=>{e.stopPropagation();del(n.id);}}
                        className="shrink-0 p-1.5 rounded-lg opacity-30 hover:opacity-100 transition-opacity">
                        <XIcon size={13}/>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── PREFERENCES ── */}
        {tab==="preferences"&&(
          <SectionCard title="Notification channels">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider pb-3"
                      style={{color:muted}}>Type</th>
                    {["Email","Push","SMS"].map(ch=>(
                      <th key={ch} className="text-center text-[10px] font-semibold uppercase tracking-wider pb-3 w-20"
                        style={{color:muted}}>{ch}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prefs.map(p=>(
                    <tr key={p.id} className="border-t" style={{borderColor:border}}>
                      <td className="py-3.5 pr-4">
                        <p className="text-xs font-medium" style={{color:ink}}>{p.label}</p>
                      </td>
                      {["email","push","sms"].map(ch=>(
                        <td key={ch} className="py-3.5 text-center">
                          <div className="flex justify-center">
                            <Toggle on={p[ch]} onChange={()=>togglePref(p.id,ch)}/>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] mt-4" style={{color:muted}}>
              SMS is charged per message to your institutional account. Push notifications require the Eduxcert mobile app.
            </p>
          </SectionCard>
        )}
      </div>

      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// BENEFITS PAGE
// ════════════════════════════════════════════════
function BenefitsPage(){
  const [selected,setSelected] = useState(null);
  const [redeemed,setRedeemed] = useState(new Set());
  const [toast,setToast]       = useState(null);
  const [filter,setFilter]     = useState("All");

  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};
  const cats=["All",...new Set(BENEFITS.map(b=>b.category))];
  const filtered=filter==="All"?BENEFITS:BENEFITS.filter(b=>b.category===filter);

  const redeem=(b)=>{
    setRedeemed(r=>new Set([...r,b.id]));
    showToast(`${b.partner} benefit activated! Show the QR code at the counter.`);
  };

  return(
    <div className="min-h-screen" style={{backgroundColor:page}}>
      {/* Header */}
      <div className="pt-8 pb-6 px-6 lg:px-10" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs mb-3" style={{color:muted}}>
            <span style={{color:ink}}>Andreja Novak</span> / Benefits
          </p>
          <h1 className="font-serif text-2xl mb-1" style={{color:ink}}>Student Benefits</h1>
          <p className="text-sm" style={{color:muted}}>
            Powered by your student-status credential · SD-JWT selective disclosure
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-7 space-y-6">

        {/* How it works */}
        <div className="rounded-xl p-4 flex items-start gap-3"
          style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
          <ShieldIcon size={16} color={gold}/>
          <p className="text-xs leading-relaxed" style={{color:amber}}>
            Each benefit redemption uses your <strong>student-status credential</strong>.
            Only the attributes required by each partner are disclosed (SD-JWT) —
            for example, "is a current student" without revealing your name or programme.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {label:"Active benefits", value:BENEFITS.filter(b=>b.status==="active").length, color:green},
            {label:"Used this month",  value:redeemed.size, color:gold},
            {label:"Saved (est.)",     value:"€48", color:teal},
          ].map(({label,value,color})=>(
            <div key={label} className="rounded-xl p-4" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <p className="text-xs" style={{color:muted}}>{label}</p>
              <p className="text-2xl font-serif mt-1" style={{color}}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          {cats.map(c=>(
            <button key={c} onClick={()=>setFilter(c)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={{backgroundColor:filter===c?ink:white,color:filter===c?white:muted,
                border:`1px solid ${filter===c?ink:border}`}}>
              {c}
            </button>
          ))}
        </div>

        {/* Benefit cards */}
        <div className="space-y-4">
          {filtered.map(b=>(
            <div key={b.id} className="rounded-2xl overflow-hidden"
              style={{backgroundColor:white,border:`2px solid ${selected===b.id?b.color:border}`}}>
              <div className="p-5 flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{backgroundColor:b.bg}}>
                  {b.icon}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{backgroundColor:b.bg,color:b.color}}>{b.category}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{backgroundColor:greenBg,color:green}}>Active</span>
                  </div>
                  <h3 className="text-sm font-semibold" style={{color:ink}}>{b.partner}</h3>
                  <p className="text-[11px] mt-0.5" style={{color:muted}}>{b.desc}</p>
                  {b.limit&&(
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] mb-1" style={{color:muted}}>
                        <span>Monthly usage</span>
                        <span>{b.used}/{b.limit}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                        <div className="h-full rounded-full"
                          style={{width:`${(b.used/b.limit)*100}%`,
                            backgroundColor:b.used/b.limit>.8?amber:b.color}}/>
                      </div>
                    </div>
                  )}
                </div>
                {/* Discount + action */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <span className="text-xl font-serif" style={{color:b.color}}>{b.discount}</span>
                  <button
                    onClick={()=>setSelected(selected===b.id?null:b.id)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    style={{backgroundColor:selected===b.id?ink:b.bg,
                      color:selected===b.id?white:b.color,
                      border:`1px solid ${b.color}30`}}>
                    {selected===b.id?"Hide QR":"Show QR"}
                  </button>
                </div>
              </div>

              {/* Expanded: QR + redeem */}
              {selected===b.id&&(
                <div className="border-t px-5 pb-6 pt-5" style={{borderColor:border}}>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* QR */}
                    <div className="p-4 rounded-2xl shrink-0" style={{backgroundColor:page,border:`1px solid ${border}`}}>
                      <QRCode value={`eduxcert://benefit/${b.id}/${USER.did}`} size={140}/>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{color:ink}}>How to use</p>
                        <p className="text-[11px] leading-relaxed" style={{color:muted}}>
                          Show this QR code to the partner's scanner. Only your student status
                          is disclosed — not your name, programme, or credential ID.
                        </p>
                      </div>

                      {/* Disclosed attributes */}
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{color:muted}}>
                          Disclosed to partner (SD-JWT)
                        </p>
                        <div className="space-y-1">
                          {[
                            {attr:"is_student", value:"true",             shown:true},
                            {attr:"institution",value:"University of Ljubljana", shown:true},
                            {attr:"valid_until",value:"30 Jun 2026",      shown:true},
                            {attr:"name",       value:"Andreja Novak",    shown:false},
                            {attr:"programme",  value:"MSc CS",           shown:false},
                          ].map(a=>(
                            <div key={a.attr} className="flex items-center gap-2 text-[11px]">
                              {a.shown
                                ? <CheckIcon size={11} color={green}/>
                                : <XIcon size={11} color={border}/>}
                              <span className="font-mono" style={{color:muted}}>{a.attr}</span>
                              {a.shown
                                ? <span style={{color:ink}}>{a.value}</span>
                                : <span style={{color:border}}>hidden</span>}
                            </div>
                          ))}
                        </div>
                      </div>

                      {redeemed.has(b.id)?(
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
                          style={{backgroundColor:greenBg}}>
                          <CheckIcon size={13} color={green}/>
                          <p className="text-xs font-medium" style={{color:green}}>
                            Benefit activated this session
                          </p>
                        </div>
                      ):(
                        <button onClick={()=>redeem(b)}
                          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                          style={{backgroundColor:b.color}}>
                          Redeem benefit →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Validity info */}
        <div className="rounded-xl p-5 flex items-start gap-3"
          style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <ShieldIcon size={16} color={muted}/>
          <div>
            <p className="text-xs font-semibold mb-1" style={{color:ink}}>Student-status credential validity</p>
            <p className="text-[11px] leading-relaxed" style={{color:muted}}>
              Your student-status credential is automatically renewed at the start of each academic term.
              Current credential valid until <strong style={{color:ink}}>30 Jun 2026</strong>.
              If you interrupt your studies, benefits are suspended within 24h.
            </p>
            <a href="#" className="flex items-center gap-1 text-[11px] font-medium mt-2" style={{color:gold}}>
              View student-status credential <ExternalIcon size={11} color={gold}/>
            </a>
          </div>
        </div>
      </div>

      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// ROOT — demo shell switching between all 3 pages
// ════════════════════════════════════════════════
const PAGES = [
  { id:"profile",       label:"Profile",       Icon:UserIcon },
  { id:"notifications", label:"Notifications", Icon:BellIcon },
  { id:"benefits",      label:"Benefits",      Icon:GiftIcon },
];

export default function SharedPages(){
  const [activePage, setActivePage] = useState("profile");
  const unread = NOTIFICATIONS.filter(n=>!n.read).length;

  const views = {
    profile:       <ProfilePage/>,
    notifications: <NotificationsPage/>,
    benefits:      <BenefitsPage/>,
  };

  return(
    <div className="min-h-screen" style={{backgroundColor:page}}>
      {/* Top nav for demo */}
      <div className="sticky top-0 z-20" style={{backgroundColor:ink,borderBottom:`1px solid ${inkSoft}`}}>
        <div className="flex items-center gap-2 px-6 py-3">
          <div className="flex items-center gap-2.5 mr-6">
            <div className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{border:`1.5px solid ${gold}`}}>
              <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:gold}}/>
            </div>
            <span className="text-white font-serif text-sm tracking-wide">Eduxcert</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{backgroundColor:"rgba(176,141,87,0.2)",color:gold}}>
              Shared Pages
            </span>
          </div>
          {PAGES.map(({id,label,Icon})=>{
            const on=activePage===id;
            return(
              <button key={id} onClick={()=>setActivePage(id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors relative"
                style={{backgroundColor:on?"rgba(176,141,87,0.18)":"transparent",
                  color:on?"#FBF7F0":"#94A3B8"}}>
                <Icon size={14} color={on?gold:"#64748B"}/>
                {label}
                {id==="notifications"&&unread>0&&(
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                    style={{backgroundColor:amber,color:white}}>{unread}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {views[activePage]}
    </div>
  );
}
