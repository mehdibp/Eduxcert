import { useState, useMemo } from "react";
import {ink, inkSoft, gold, goldBg, goldBdr, 
        page, white, muted, border, 
        green, greenBg, amber, amberBg, violet, violetBg, blue, blueBg, red, redBg, rose} from "../styles/colors";

import {GridIcon, BookOpenIcon, DiplomaIcon, ShieldIcon, PeopleIcon, SettingsIcon, LogIcon, 
        LogoutIcon, CheckIcon, XIcon, PlusIcon, AlertIcon, UploadIcon, SealNavIcon} from "../components/icons/icons"

import Sidebar from "../components/layout/Sidebar"

import Badge from "../components/commen/Badge"

import { TENANT, PROGRAMMES, DEGREE_PIPELINE, USERS, ACCRED_STEPS, AUDIT_LOG, QI_BENCHMARKS } from "../data/admin"


function QIBadge() { 
  return <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{backgroundColor:goldBg,color:gold,border:`1px solid ${goldBdr}`}}>
    
    <SealNavIcon color={gold}/>
      QI · Quality Intelligence
    </span>;
}


// ════════════════════════════════════════════════
// SHARED
// ════════════════════════════════════════════════
const NAV_ITEMS = [
  { id:"dashboard",   label:"Dashboard",      Icon:GridIcon    },
  { id:"programmes",  label:"Programmes",     Icon:BookOpenIcon},
  { id:"degrees",     label:"Degree Award",   Icon:DiplomaIcon },
  { id:"accred",      label:"Accreditation",  Icon:ShieldIcon  },
  { id:"users",       label:"Users & Roles",  Icon:PeopleIcon   },
  { id:"config",      label:"Tenant Config",  Icon:SettingsIcon},
  { id:"audit",       label:"Audit Log",      Icon:LogIcon     },
];


function PageHeader({crumb,title,subtitle,action}){
  return (
    <div className="pt-8 pb-6" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
      <p className="text-xs mb-3" style={{color:muted}}>
        <span style={{color:ink}}>Admin Zupan</span> / {crumb}
      </p>
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl" style={{color:ink}}>{title}</h1>
          {subtitle&&<p className="text-sm mt-0.5" style={{color:muted}}>{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}

function Stat({label,value,sub,color=ink,onClick}){
  return (
    <div onClick={onClick}
      className={`rounded-xl p-4 ${onClick?"cursor-pointer hover:shadow-md transition-shadow":""}`}
      style={{backgroundColor:white,border:`1px solid ${border}`}}>
      <p className="text-xs" style={{color:muted}}>{label}</p>
      <p className="text-2xl font-serif mt-1" style={{color}}>{value}</p>
      {sub&&<p className="text-[11px] mt-1" style={{color:muted}}>{sub}</p>}
    </div>
  );
}

function Toast({msg,ok}){
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl shadow-xl text-sm font-medium text-white flex items-center gap-2 z-50"
      style={{backgroundColor:ok?ink:"#475569"}}>
      {ok?<CheckIcon size={14} color={gold}/>:<XIcon size={14} color={white}/>} {msg}
    </div>
  );
}

// ════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════
function DashboardView({onNav}){
  const pendingDeg = DEGREE_PIPELINE.filter(d=>d.status==="pending").length;
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl" style={{color:ink}}>Good morning, Admin</h1>
          <p className="text-sm mt-0.5" style={{color:muted}}>{TENANT.name} · Academic Year 2024/25</p>
        </div>
        <div className="flex items-center gap-2">
          <QIBadge/>
          <span className="text-xs font-medium px-3 py-1.5 rounded-full"
            style={{backgroundColor:violetBg,color:violet,border:`1px solid #C4B5FD`}}>
            {TENANT.tier} plan
          </span>
        </div>
      </div>

      {pendingDeg>0 && (
        <div onClick={()=>onNav("degrees")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer"
          style={{backgroundColor:amberBg,border:`1px solid #FDE68A`}}>
          <AlertIcon size={16} color={amber}/>
          <p className="text-sm font-medium" style={{color:amber}}>
            <strong>{pendingDeg} degree award{pendingDeg>1?"s":""}</strong> pending final sign-off.
          </p>
          <span className="ml-auto text-xs font-semibold" style={{color:amber}}>Review →</span>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Students"         value={TENANT.students.toLocaleString()} sub="enrolled" onClick={()=>onNav("users")}/>
        <Stat label="Educators"        value={TENANT.educators}  sub="active staff" onClick={()=>onNav("users")}/>
        <Stat label="Credentials issued" value={TENANT.credentials.toLocaleString()} sub="all-time" color={green}/>
        <Stat label="Institution pass rate" value={`${TENANT.passRate}%`} sub="Spring 2025" color={green}/>
      </div>

      {/* QI benchmarks */}
      <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-semibold" style={{color:ink}}>QI Benchmarks — vs. peer institutions</p>
          <QIBadge/>
        </div>
        <div className="space-y-4">
          {QI_BENCHMARKS.map(b=>{
            const better = b.metric==="Time-to-degree" ? b.value<b.peer : b.value>b.peer;
            const pctYou  = Math.min(100, b.metric==="Time-to-degree"?100-(b.value/48*100):(b.value/10)*10||b.value);
            const pctPeer = Math.min(100, b.metric==="Time-to-degree"?100-(b.peer/48*100):(b.peer/10)*10||b.peer);
            return (
              <div key={b.metric}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs" style={{color:muted}}>{b.metric}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-semibold" style={{color:better?green:amber}}>
                      You: {b.value}{b.unit}
                    </span>
                    <span style={{color:muted}}>Peers: {b.peer}{b.unit}</span>
                  </div>
                </div>
                <div className="relative h-2 rounded-full" style={{backgroundColor:border}}>
                  <div className="absolute h-full rounded-full opacity-30"
                    style={{width:`${pctPeer}%`,backgroundColor:blue}}/>
                  <div className="absolute h-full rounded-full"
                    style={{width:`${pctYou}%`,backgroundColor:better?green:amber}}/>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] mt-4" style={{color:muted}}>
          Peer group: 47 European HEIs of comparable size · Data: EURES/QI service · Updated daily.
        </p>
      </div>

      {/* Programmes + Accreditation status */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold" style={{color:ink}}>Active programmes</p>
            <button onClick={()=>onNav("programmes")} className="text-xs font-medium" style={{color:gold}}>Manage →</button>
          </div>
          <div className="space-y-3">
            {PROGRAMMES.filter(p=>p.status==="active").slice(0,3).map(p=>(
              <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0"
                style={{borderColor:border}}>
                <div>
                  <p className="text-xs font-semibold" style={{color:ink}}>{p.title}</p>
                  <p className="text-[11px]" style={{color:muted}}>{p.students} students · {p.ects} ECTS</p>
                </div>
                <Badge label={p.accred}
                  bg={p.accred==="Pending"?amberBg:greenBg}
                  color={p.accred==="Pending"?amber:green}/>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold" style={{color:ink}}>Accreditation dossier</p>
            <button onClick={()=>onNav("accred")} className="text-xs font-medium" style={{color:gold}}>Open →</button>
          </div>
          <div className="space-y-2.5">
            {ACCRED_STEPS.map(s=>(
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{backgroundColor:s.status==="done"?greenBg:s.status==="active"?goldBg:page,
                    border:`1.5px solid ${s.status==="done"?green:s.status==="active"?gold:border}`}}>
                  {s.status==="done"
                    ? <CheckIcon size={10} color={green}/>
                    : s.status==="active"
                    ? <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:gold}}/>
                    : null}
                </div>
                <p className="text-xs flex-1" style={{color:s.status==="pending"?muted:ink}}>{s.label}</p>
                {s.status==="active" && <span className="text-[10px] font-semibold" style={{color:gold}}>{s.pct}%</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// PROGRAMMES VIEW
// ════════════════════════════════════════════════
function ProgrammesView(){
  const [programmes,setProgs]=useState(PROGRAMMES);
  const [editing,setEditing]=useState(null);
  const [toast,setToast]=useState(null);
  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  return (
    <div className="space-y-5">
      <PageHeader crumb="Programmes" title="Programmes & Curricula"
        subtitle={`${TENANT.name} · ${programmes.filter(p=>p.status==="active").length} active`}
        action={
          <button onClick={()=>showToast("New programme form coming soon.")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{backgroundColor:ink}}>
            <PlusIcon size={13}/> New Programme
          </button>
        }/>

      <div className="space-y-3">
        {programmes.map(p=>(
          <div key={p.id} className="rounded-xl overflow-hidden"
            style={{backgroundColor:white,border:`1px solid ${border}`}}>
            <div className="p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0"
                style={{backgroundColor:{BA:goldBg,MA:violetBg,PhD:greenBg}[p.level]||goldBg}}>
                <span className="text-sm font-bold" style={{color:{BA:amber,MA:violet,PhD:green}[p.level]||amber}}>{p.level}</span>
                <span className="text-[9px] font-semibold" style={{color:muted}}>{p.ects}cr</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-[10px] font-mono" style={{color:muted}}>{p.code}</p>
                  <Badge label={p.status==="active"?"Active":"Draft"}
                    bg={p.status==="active"?greenBg:amberBg} color={p.status==="active"?green:amber}/>
                  <Badge label={p.accred}
                    bg={p.accred==="Pending"?amberBg:greenBg} color={p.accred==="Pending"?amber:green}/>
                </div>
                <h3 className="text-sm font-semibold" style={{color:ink}}>{p.title}</h3>
                <p className="text-[11px] mt-0.5" style={{color:muted}}>
                  {p.students} students enrolled · {p.ects} ECTS · {p.curricula.length} tracks
                </p>
              </div>
              <div className="shrink-0 flex gap-2">
                <button onClick={()=>setEditing(p.id===editing?null:p.id)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                  style={{borderColor:border,color:muted}}>
                  {p.id===editing?"Collapse":"Manage"}
                </button>
              </div>
            </div>

            {editing===p.id && (
              <div className="border-t px-5 pb-5 pt-4" style={{borderColor:border}}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{color:muted}}>
                  Curriculum tracks
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.curricula.map(c=>(
                    <div key={c} className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                      style={{backgroundColor:page,border:`1px solid ${border}`,color:ink}}>
                      {c}
                      <button className="opacity-40 hover:opacity-100"><XIcon size={11}/></button>
                    </div>
                  ))}
                  <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg"
                    style={{backgroundColor:goldBg,color:amber,border:`1px solid ${goldBdr}`}}
                    onClick={()=>showToast("Track added.")}>
                    <PlusIcon size={11}/> Add track
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {label:"Enrolment window", value:"1 Sep – 30 Sep"},
                    {label:"Term calendar",    value:"2 terms / year"},
                    {label:"Credit system",    value:"ECTS"},
                  ].map(({label,value})=>(
                    <div key={label} className="rounded-lg p-3" style={{backgroundColor:page}}>
                      <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{color:muted}}>{label}</p>
                      <p className="text-xs font-medium" style={{color:ink}}>{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={()=>{setProgs(ps=>ps.map(x=>x.id===p.id?{...x,status:x.status==="active"?"draft":"active"}:x));showToast(`Programme ${p.status==="active"?"archived":"activated"}.`);}}
                    className="text-xs font-medium px-3 py-2 rounded-lg border"
                    style={{borderColor:border,color:muted}}>
                    {p.status==="active"?"Archive programme":"Activate programme"}
                  </button>
                  <button onClick={()=>showToast("Accreditation dossier opened.")}
                    className="text-xs font-semibold px-3 py-2 rounded-lg text-white"
                    style={{backgroundColor:ink}}>
                    Open accreditation dossier
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// DEGREE AWARD
// ════════════════════════════════════════════════
function DegreesView(){
  const [pipeline,setPipeline]=useState(DEGREE_PIPELINE);
  const [toast,setToast]=useState(null);
  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  const award = (id) => {
    setPipeline(p=>p.map(d=>d.id===id?{...d,status:"issued"}:d));
    showToast("Degree awarded! Credential pipeline triggered — VC will be issued within 5 minutes.");
  };

  const counts = {
    pending: pipeline.filter(d=>d.status==="pending").length,
    approved:pipeline.filter(d=>d.status==="approved").length,
    issued:  pipeline.filter(d=>d.status==="issued").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader crumb="Degree Award" title="Degree Award Pipeline"
        subtitle="approved → award → credential issued automatically"/>

      {/* Pipeline stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {label:"Pending review", value:counts.pending,  color:amber, bg:amberBg},
          {label:"Approved",       value:counts.approved, color:blue,  bg:blueBg},
          {label:"Issued",         value:counts.issued,   color:green, bg:greenBg},
        ].map(({label,value,color,bg})=>(
          <div key={label} className="rounded-xl p-4 text-center" style={{backgroundColor:bg}}>
            <p className="text-2xl font-serif" style={{color}}>{value}</p>
            <p className="text-[11px] font-semibold mt-1" style={{color}}>{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{borderColor:border}}>
          <p className="text-xs font-semibold" style={{color:ink}}>Summer 2025 cohort</p>
          <div className="flex items-center gap-2 text-[11px]" style={{color:muted}}>
            <span className="w-2 h-2 rounded-full" style={{backgroundColor:amber}}/>Pending review requires 2-admin sign-off
          </div>
        </div>
        <table className="w-full">
          <thead style={{backgroundColor:page}}>
            <tr>{["Student","Programme","ECTS","GPA","Status","Action"].map(h=>(
              <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5"
                style={{color:muted}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {pipeline.map(d=>(
              <tr key={d.id} className="border-t" style={{borderColor:border}}>
                <td className="px-4 py-3 text-xs font-semibold" style={{color:ink}}>{d.student}</td>
                <td className="px-4 py-3 text-xs" style={{color:muted}}>{d.programme}</td>
                <td className="px-4 py-3 text-xs font-semibold" style={{color:ink}}>{d.ects}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-bold" style={{color:d.gpa>=8?green:d.gpa>=6?ink:amber}}>{d.gpa}</span>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    label={d.status==="pending"?"Pending review":d.status==="approved"?"Approved":"Issued"}
                    bg={d.status==="pending"?amberBg:d.status==="approved"?blueBg:greenBg}
                    color={d.status==="pending"?amber:d.status==="approved"?blue:green}/>
                </td>
                <td className="px-4 py-3">
                  {d.status==="approved"
                    ? <button onClick={()=>award(d.id)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                        style={{backgroundColor:green}}>
                        Award degree
                      </button>
                    : d.status==="pending"
                    ? <button onClick={()=>{setPipeline(p=>p.map(x=>x.id===d.id?{...x,status:"approved"}:x));showToast("Degree approved — awaiting co-sign.");}}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                        style={{backgroundColor:blueBg,color:blue,border:`1px solid #BFDBFE`}}>
                        Approve
                      </button>
                    : <span className="flex items-center gap-1 text-xs font-medium" style={{color:green}}>
                        <CheckIcon size={12}/> VC issued
                      </span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// ACCREDITATION DOSSIER
// ════════════════════════════════════════════════
function AccreditationView(){
  const [steps,setSteps]=useState(ACCRED_STEPS);
  const [activeStep,setActiveStep]=useState("s3");
  const [toast,setToast]=useState(null);
  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  const doneCount=steps.filter(s=>s.status==="done").length;
  const pct=Math.round(doneCount/steps.length*100);

  const uploadDoc=()=>{
    setSteps(ss=>ss.map(s=>s.id==="s3"?{...s,pct:Math.min(100,s.pct+18)}:s));
    showToast("Document uploaded and mapped to dossier.");
  };
  const completeStep=(id)=>{
    const idx=steps.findIndex(s=>s.id===id);
    setSteps(ss=>ss.map((s,i)=>
      s.id===id?{...s,status:"done",pct:100}:
      i===idx+1?{...s,status:"active"}:s
    ));
    showToast("Step completed — next step unlocked.");
  };

  const GAP_DOCS=[
    {name:"External examiner report 2024", uploaded:true},
    {name:"Student satisfaction survey",   uploaded:true},
    {name:"Research output register",       uploaded:true},
    {name:"Internationalisation strategy",  uploaded:false},
    {name:"Staff development plan",         uploaded:false},
    {name:"Industry advisory board minutes",uploaded:false},
    {name:"Financial sustainability report",uploaded:false},
  ];

  return (
    <div className="space-y-6">
      <PageHeader crumb="Accreditation" title="Accreditation Dossier"
        subtitle="MSc Computer Science · ABET 2027 cycle"
        action={<QIBadge/>}/>

      {/* Overall */}
      <div className="rounded-xl p-5 flex items-center gap-6"
        style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <div className="relative w-20 h-20 shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full">
            <circle cx="40" cy="40" r="32" fill="none" stroke={border} strokeWidth="8"/>
            <circle cx="40" cy="40" r="32" fill="none" stroke={gold} strokeWidth="8"
              strokeDasharray={`${2*Math.PI*32}`}
              strokeDashoffset={`${2*Math.PI*32*(1-pct/100)}`}
              strokeLinecap="round" transform="rotate(-90 40 40)"/>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-bold" style={{color:ink}}>{pct}%</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{color:ink}}>Dossier completion</p>
          <p className="text-[11px] mt-0.5" style={{color:muted}}>{doneCount} of {steps.length} phases complete</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              {l:"Institution score", v:"87/100", c:green},
              {l:"Evidence mapped",   v:"82%",    c:gold},
              {l:"Gaps remaining",    v:"4 docs",  c:amber},
            ].map(({l,v,c})=>(
              <div key={l} className="text-xs">
                <span style={{color:muted}}>{l}: </span>
                <span className="font-semibold" style={{color:c}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={()=>showToast("Dossier preview generated.")}
          className="shrink-0 text-xs font-semibold px-4 py-2.5 rounded-lg border"
          style={{borderColor:border,color:ink}}>
          Preview PDF
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Step pipeline */}
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{color:muted}}>Phases</p>
          {steps.map(s=>(
            <button key={s.id} onClick={()=>setActiveStep(s.id)}
              className="w-full text-left rounded-xl p-4 transition-all"
              style={{backgroundColor:activeStep===s.id?inkSoft:white,
                border:`2px solid ${activeStep===s.id?ink:border}`,
                boxShadow:activeStep===s.id?"0 4px 16px -4px rgba(15,23,41,0.3)":"none"}}>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{backgroundColor:s.status==="done"?greenBg:s.status==="active"?goldBg:page,
                    border:`1.5px solid ${s.status==="done"?green:s.status==="active"?gold:border}`}}>
                  {s.status==="done"&&<CheckIcon size={10} color={green}/>}
                  {s.status==="active"&&<div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:gold}}/>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate"
                    style={{color:activeStep===s.id?white:s.status==="pending"?muted:ink}}>
                    {s.label}
                  </p>
                  {s.status==="active"&&(
                    <div className="h-1 rounded-full mt-1.5 overflow-hidden" style={{backgroundColor:"rgba(255,255,255,0.15)"}}>
                      <div className="h-full rounded-full" style={{width:`${s.pct}%`,backgroundColor:gold}}/>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active step detail */}
        <div className="lg:col-span-2 space-y-5">
          {(()=>{
            const s=steps.find(x=>x.id===activeStep);
            if(!s) return null;
            return (
              <div className="rounded-xl p-6" style={{backgroundColor:white,border:`1px solid ${border}`}}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                      style={{color:s.status==="done"?green:s.status==="active"?amber:muted}}>
                      {s.status==="done"?"Completed":s.status==="active"?"In progress":"Locked"}
                    </p>
                    <h3 className="font-serif text-lg" style={{color:ink}}>{s.label}</h3>
                    <p className="text-xs mt-1" style={{color:muted}}>{s.detail}</p>
                  </div>
                  {s.status==="done"&&(
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{backgroundColor:greenBg}}>
                      <CheckIcon size={18} color={green}/>
                    </div>
                  )}
                </div>

                {/* Gap docs upload (step s3) */}
                {s.id==="s3"&&s.status==="active"&&(
                  <>
                    <div className="space-y-2 mb-5">
                      {GAP_DOCS.map(d=>(
                        <div key={d.name}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                          style={{backgroundColor:d.uploaded?greenBg:page,border:`1px solid ${d.uploaded?"#BBF7D0":border}`}}>
                          {d.uploaded
                            ? <CheckIcon size={13} color={green}/>
                            : <div className="w-3 h-3 rounded-sm" style={{border:`1.5px solid ${border}`}}/>}
                          <span className="text-xs flex-1" style={{color:d.uploaded?green:ink}}>{d.name}</span>
                          {!d.uploaded&&(
                            <button onClick={uploadDoc}
                              className="flex items-center gap-1 text-[11px] font-semibold"
                              style={{color:gold}}>
                              <UploadIcon size={12}/> Upload
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button onClick={()=>completeStep("s3")}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                      style={{backgroundColor:ink}}>
                      Mark step complete → Preview dossier
                    </button>
                  </>
                )}

                {/* Other active step actions */}
                {s.id!=="s3"&&s.status==="active"&&(
                  <button onClick={()=>completeStep(s.id)}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{backgroundColor:ink}}>
                    Complete this step →
                  </button>
                )}

                {/* Submit step */}
                {s.id==="s6"&&s.status==="done"&&(
                  <div className="mt-4 p-4 rounded-xl" style={{backgroundColor:greenBg}}>
                    <p className="text-xs font-semibold" style={{color:green}}>✅ Submitted to DEQAR</p>
                    <p className="text-[11px] mt-1" style={{color:green}}>Signed PDF + JSON QR + full audit trail sent on 2025-06-01.</p>
                  </div>
                )}

                {s.status==="pending"&&(
                  <div className="mt-4 p-4 rounded-xl" style={{backgroundColor:page}}>
                    <p className="text-xs" style={{color:muted}}>Complete previous steps to unlock this phase.</p>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Explainability per claim */}
          <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
            <p className="text-xs font-semibold mb-3" style={{color:ink}}>Evidence mapping — QI auto-map</p>
            {[
              {claim:"Pass rate ≥ 80%",             evidence:"cohort_stats table · Spring 2025",           ok:true},
              {claim:"External examiner report",     evidence:"Uploaded 2024-11-10",                        ok:true},
              {claim:"Student satisfaction ≥ 75%",  evidence:"Survey 2024 · Score: 81%",                   ok:true},
              {claim:"Internationalisation strategy",evidence:"Document missing — upload required",          ok:false},
              {claim:"Staff development plan",       evidence:"Document missing — upload required",          ok:false},
            ].map(c=>(
              <div key={c.claim} className="flex items-start gap-3 py-2 border-b last:border-0"
                style={{borderColor:border}}>
                {c.ok?<CheckIcon size={13}/>:<XIcon size={13} color={red}/>}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium" style={{color:ink}}>{c.claim}</p>
                  <p className="text-[11px] mt-0.5" style={{color:c.ok?muted:red}}>{c.evidence}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// USERS & ROLES
// ════════════════════════════════════════════════
function UsersView(){
  const [users,setUsers]=useState(USERS);
  const [filter,setFilter]=useState("all");
  const [search,setSearch]=useState("");
  const [toast,setToast]=useState(null);
  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  const filtered=useMemo(()=>{
    let l=users;
    if(filter!=="all") l=l.filter(u=>u.role===filter);
    if(search) l=l.filter(u=>u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase()));
    return l;
  },[users,filter,search]);

  const roleColor={educator:violet,student:blue,admin:rose};
  const roleBg={educator:violetBg,student:blueBg,admin:"#FFE4E6"};

  return (
    <div className="space-y-5">
      <PageHeader crumb="Users & Roles" title="Users & Roles"
        subtitle={`${users.filter(u=>u.status==="active").length} active · ${users.length} total`}
        action={
          <button onClick={()=>showToast("User invite sent.")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{backgroundColor:ink}}>
            <PlusIcon size={13}/> Invite user
          </button>
        }/>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-44">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke={muted} strokeWidth="1.4"/>
            <path d="M11 11l3 3" stroke={muted} strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm outline-none"
            style={{backgroundColor:white,borderColor:border,color:ink}}
            onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
        </div>
        <div className="flex rounded-xl overflow-hidden border" style={{borderColor:border}}>
          {[["all","All"],["educator","Educators"],["student","Students"],["admin","Admins"]].map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)}
              className="px-3 py-2.5 text-xs font-semibold transition-colors"
              style={{backgroundColor:filter===v?ink:white,color:filter===v?white:muted}}>{l}</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <table className="w-full">
          <thead style={{backgroundColor:page}}>
            <tr>{["Name","Role","Department","Status","MFA","Actions"].map(h=>(
              <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider px-4 py-3"
                style={{color:muted}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map(u=>(
              <tr key={u.id} className="border-t hover:bg-gray-50 transition-colors"
                style={{borderColor:border}}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{backgroundColor:roleColor[u.role]||muted}}>
                      {u.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{color:ink}}>{u.name}</p>
                      <p className="text-[10px]" style={{color:muted}}>{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge label={u.role.charAt(0).toUpperCase()+u.role.slice(1)}
                    bg={roleBg[u.role]||page} color={roleColor[u.role]||muted}/>
                </td>
                <td className="px-4 py-3 text-xs" style={{color:muted}}>{u.dept}</td>
                <td className="px-4 py-3">
                  <Badge label={u.status==="active"?"Active":"Inactive"}
                    bg={u.status==="active"?greenBg:"#F1F5F9"} color={u.status==="active"?green:muted}/>
                </td>
                <td className="px-4 py-3">
                  {u.mfa
                    ? <span className="text-[11px] font-semibold" style={{color:green}}>✓ Enabled</span>
                    : <span className="text-[11px]" style={{color:amber}}>Not set</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={()=>{
                      setUsers(us=>us.map(x=>x.id===u.id?{...x,status:x.status==="active"?"inactive":"active"}:x));
                      showToast(`${u.name} ${u.status==="active"?"deactivated":"reactivated"}.`);
                    }} className="text-[11px] font-medium px-2.5 py-1 rounded-lg border"
                      style={{borderColor:border,color:muted}}>
                      {u.status==="active"?"Deactivate":"Activate"}
                    </button>
                    <button onClick={()=>{
                      const roles=["educator","student","admin"];
                      const next=roles[(roles.indexOf(u.role)+1)%roles.length];
                      setUsers(us=>us.map(x=>x.id===u.id?{...x,role:next}:x));
                      showToast(`Role changed to ${next}.`);
                    }} className="text-[11px] font-medium px-2.5 py-1 rounded-lg border"
                      style={{borderColor:border,color:muted}}>
                      Change role
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// TENANT CONFIG
// ════════════════════════════════════════════════
function ConfigView(){
  const [brand,setBrand]=useState({primary:"#0F1729",accent:"#B08D57",logo:"UL",name:"University of Ljubljana"});
  const [integrations,setIntegrations]=useState([
    {id:"moodle",name:"Moodle LTI",  desc:"Course sync + grade push",   enabled:true,  status:"connected"},
    {id:"sis",   name:"SIS",         desc:"Student information system",  enabled:true,  status:"connected"},
    {id:"hr",    name:"HR System",   desc:"Staff provisioning via SCIM", enabled:false, status:"not connected"},
    {id:"boni",  name:"Boni",        desc:"Student benefits connector",  enabled:false, status:"not connected"},
  ]);
  const [toast,setToast]=useState(null);
  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  return (
    <div className="space-y-6">
      <PageHeader crumb="Tenant Config" title="Tenant Configuration"
        subtitle="Branding · integrations · credential templates"/>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Branding */}
        <div className="rounded-xl p-6 space-y-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{color:ink}}>Branding</p>
            <p className="text-[11px]" style={{color:muted}}>Applied to student portal login page and credential PDF headers.</p>
          </div>

          {/* Preview */}
          <div className="rounded-xl overflow-hidden" style={{border:`1px solid ${border}`}}>
            <div className="px-4 py-3 flex items-center gap-3"
              style={{backgroundColor:brand.primary}}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{backgroundColor:brand.accent,color:white}}>
                {brand.logo}
              </div>
              <span className="text-white font-serif text-sm">{brand.name}</span>
            </div>
            <div className="px-4 py-3" style={{backgroundColor:page}}>
              <p className="text-[11px]" style={{color:muted}}>Student portal preview</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {label:"Institution name",key:"name",  type:"text"},
              {label:"Logo abbreviation",key:"logo", type:"text"},
              {label:"Primary colour",  key:"primary",type:"color"},
              {label:"Accent colour",   key:"accent", type:"color"},
            ].map(({label,key,type})=>(
              <div key={key} className="flex items-center justify-between gap-4">
                <label className="text-xs font-medium shrink-0" style={{color:"#334155"}}>{label}</label>
                {type==="color"
                  ? <div className="flex items-center gap-2">
                      <input type="color" value={brand[key]}
                        onChange={e=>setBrand(b=>({...b,[key]:e.target.value}))}
                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"/>
                      <span className="text-xs font-mono" style={{color:muted}}>{brand[key]}</span>
                    </div>
                  : <input type="text" value={brand[key]}
                      onChange={e=>setBrand(b=>({...b,[key]:e.target.value}))}
                      className="flex-1 max-w-xs rounded-lg border px-3 py-1.5 text-sm outline-none"
                      style={{borderColor:border,color:ink}}
                      onFocus={e=>e.target.style.borderColor=gold}
                      onBlur={e=>e.target.style.borderColor=border}/>
                }
              </div>
            ))}
            <button onClick={()=>showToast("Branding saved and propagated.")}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{backgroundColor:ink}}>
              Save branding
            </button>
          </div>
        </div>

        {/* Integrations */}
        <div className="rounded-xl p-6 space-y-4" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{color:ink}}>Integrations</p>
            <p className="text-[11px]" style={{color:muted}}>Connect your existing systems via webhooks and LTI.</p>
          </div>
          {integrations.map(ig=>(
            <div key={ig.id} className="flex items-center gap-4 p-4 rounded-xl"
              style={{backgroundColor:page,border:`1px solid ${border}`}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                style={{backgroundColor:ig.enabled?violetBg:"#F1F5F9",color:ig.enabled?violet:muted}}>
                {ig.name.slice(0,2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold" style={{color:ink}}>{ig.name}</p>
                <p className="text-[11px]" style={{color:muted}}>{ig.desc}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-semibold" style={{color:ig.enabled?green:muted}}>
                  {ig.status}
                </span>
                <button
                  onClick={()=>{
                    setIntegrations(is=>is.map(x=>x.id===ig.id?{...x,enabled:!x.enabled,status:!x.enabled?"connected":"not connected"}:x));
                    showToast(`${ig.name} ${ig.enabled?"disconnected":"connected"}.`);
                  }}
                  className="relative w-10 h-5 rounded-full transition-colors"
                  style={{backgroundColor:ig.enabled?green:border}}>
                  <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                    style={{transform:ig.enabled?"translateX(21px)":"translateX(2px)"}}/>
                </button>
              </div>
            </div>
          ))}

          {/* DID info */}
          <div className="rounded-xl p-4 mt-2" style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{color:amber}}>Tenant DID</p>
            <p className="text-[11px] font-mono break-all" style={{color:ink}}>{TENANT.did}</p>
            <p className="text-[10px] mt-2" style={{color:muted}}>Registered in EBSI Trusted Issuers Registry. Rotate keys via Vault.</p>
          </div>
        </div>
      </div>
      {toast&&<Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// AUDIT LOG
// ════════════════════════════════════════════════
function AuditView(){
  const [filter,setFilter]=useState("all");
  const filtered=useMemo(()=>filter==="all"?AUDIT_LOG:AUDIT_LOG.filter(a=>a.risk===filter),[filter]);
  const riskColor={low:green,medium:amber,high:red};
  const riskBg={low:greenBg,medium:amberBg,high:redBg};

  return (
    <div className="space-y-5">
      <PageHeader crumb="Audit Log" title="Audit Log"
        subtitle="Immutable log · Merkle root anchored externally · 7-year retention"/>

      {AUDIT_LOG.filter(a=>a.risk==="high").length>0&&(
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{backgroundColor:redBg,border:`1px solid #FECACA`}}>
          <AlertIcon size={16} color={red}/>
          <p className="text-sm font-medium" style={{color:red}}>
            <strong>High-risk event detected:</strong> Multiple failed login attempts on admin account — {new Date().toLocaleDateString("en-GB")}.
          </p>
        </div>
      )}

      <div className="flex gap-2">
        {[["all","All"],["low","Low"],["medium","Medium"],["high","High risk"]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)}
            className="px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{backgroundColor:filter===v?(v==="high"?red:v==="medium"?amber:ink):white,
              color:filter===v?white:muted,
              border:`1px solid ${filter===v?"transparent":border}`}}>
            {l}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border"
          style={{borderColor:border,color:muted}}>
          <UploadIcon size={12}/> Export CSV
        </button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <table className="w-full">
          <thead style={{backgroundColor:page}}>
            <tr>{["Timestamp","Actor","Action","Resource","Risk"].map(h=>(
              <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider px-4 py-3"
                style={{color:muted}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map(a=>(
              <tr key={a.id} className="border-t hover:bg-gray-50"
                style={{borderColor:border,backgroundColor:a.risk==="high"?`${redBg}44`:""}}>
                <td className="px-4 py-3 text-[11px] font-mono" style={{color:muted}}>{a.ts}</td>
                <td className="px-4 py-3 text-xs font-medium" style={{color:ink}}>{a.actor}</td>
                <td className="px-4 py-3 text-xs" style={{color:ink}}>{a.action}</td>
                <td className="px-4 py-3 text-xs" style={{color:muted}}>{a.resource}</td>
                <td className="px-4 py-3">
                  <Badge label={a.risk.charAt(0).toUpperCase()+a.risk.slice(1)}
                    bg={riskBg[a.risk]} color={riskColor[a.risk]}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl p-4 flex items-start gap-3"
        style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
        <span className="text-base">⚓</span>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{color:ink}}>Merkle root anchoring</p>
          <p className="text-[11px]" style={{color:muted}}>
            Audit log hash anchored externally every 24h. Last anchor: <span className="font-mono">2025-06-08 00:00 UTC</span>.
            7-year retention per GDPR Art. 30 + eIDAS 2.0 audit requirements.
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// ROOT
// ════════════════════════════════════════════════
export default function AdminConsole() {
  const [nav,setNav]           = useState("dashboard");
  const [collapsed,setCollapsed] = useState(false);
  const [loggedIn,setLoggedIn]   = useState(true);

  if(!loggedIn){
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor:page}}>
        <div className="rounded-2xl p-10 text-center" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{border:`1.5px solid ${gold}`}}>
            <div className="w-3 h-3 rounded-full" style={{backgroundColor:gold}}/>
          </div>
          <h1 className="font-serif text-xl mb-1" style={{color:ink}}>Eduxcert</h1>
          <p className="text-sm mb-6" style={{color:muted}}>Admin Console · {TENANT.name}</p>
          <button onClick={()=>setLoggedIn(true)}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{backgroundColor:ink}}>
            Sign in with Keycloak SSO
          </button>
        </div>
      </div>
    );
  }

  const views = {
    dashboard:  <DashboardView onNav={setNav}/>,
    programmes: <ProgrammesView/>,
    degrees:    <DegreesView/>,
    accred:     <AccreditationView/>,
    users:      <UsersView/>,
    config:     <ConfigView/>,
    audit:      <AuditView/>,
  };

  return (
    <div className="flex h-screen" style={{backgroundColor:page}}>
      
      <Sidebar
        subtitle="Admin Console"
        navItems={NAV_ITEMS}
        active={nav}
        onNav={setNav}
        collapsed={collapsed}
        onToggle={() => setCollapsed((b) => !b)}
        onLogout={() => setLoggedIn(false)}
        user={{ initials: "AZ", name: "Admin Zupan", sub: "University Admin", color: "#E11D48" }}
      />
      
      <main className="flex-1 overflow-auto p-6 lg:p-8" style={{minWidth:0}}>
        {views[nav]}
      </main>
    </div>
  );
}
