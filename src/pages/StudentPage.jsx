import { useState, useMemo } from "react";
import {ink, inkSoft, gold, goldLight, goldBg, goldBdr, 
        pageColor, white, muted, mutedBg, border, 
        green, greenBg, greenBdr, amber, amberBg, violet, violetBg, blue, blueBg, red, redBg, rose, roseBg} from "../styles/colors";

import {GridIcon, BookIcon, SealNavIcon, CalendarIcon, MapIcon, CheckIcon, XIcon, ChevronIcon, SearchIcon,
        FilterIcon, ShareIcon, DownloadIcon, WalletIcon, SpinIcon, SealCredIcon, DiplomaIcon, RoomIcon, 
        ClockIcon, PeopleIcon, LogoutIcon, LightningIcon, SealMark } from "../components/icons/icons"

import {STUDENT, DASH_COURSES, DASH_CREDS, TIMELINE, ALL_COURSES, CRED_DATA, LECTURES, EXAMS,
        CAREER_TARGETS, SKILLS, RECS, MILESTONES } from "../data/student"

import Sidebar from "../components/layout/Sidebar"
import Logo from '../assets/react.svg'

import {Badge, StatusBadge} from "../components/commen/Badge"
import {Button} from "../components/commen/Button"
import ProgressRing from "../components/commen/ProgressRing"
import PageHeader from "../components/commen/PageHeader"
import QualityBadge from "../components/commen/QualityBadge"
import StatCard from "../components/commen/StatCard"
import Toast from "../components/commen/Toast"



// ════════════════════════════════════════════════
// SIDEBAR
// ════════════════════════════════════════════════
const NAV_ITEMS = [
  {id:"dashboard",  label:"Dashboard",   Icon:GridIcon},
  {id:"courses",    label:"My Courses",  Icon:BookIcon},
  {id:"credentials",label:"Credentials", Icon:SealNavIcon},
  {id:"timetable",  label:"Timetable",   Icon:CalendarIcon},
  {id:"roadmap",    label:"Roadmap",     Icon:MapIcon},
];
const STATUS_CFG = {
  written: {label:"Written", color:muted,  bg:mutedBg},
  oral:    {label:"Oral"   , color:violet, bg:violetBg},
  project: {label:"Project", color:blue,   bg:blueBg},
};


function LoginPage({onLogin}) {
  const [email,setEmail]=useState(""),  [pw,setPw]=useState(""), [show,setShow]=useState(false);
  return (
    <div className="min-h-screen w-full flex items-stretch" style={{backgroundColor:pageColor}}>
      <div className="w-full grid lg:grid-cols-2">
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden px-14 py-12"
          style={{background:`linear-gradient(160deg,${ink} 0%,${inkSoft} 100%)`}}>
          <div className="flex items-center gap-3">
            <img className="w-7 h-7 shrink-0" src={Logo}/>
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
              <img className="w-7 h-7 shrink-0" src={Logo}/>
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
        <StatCard label="Active Courses"  value={2} sub="View →" onClick={()=>onNav("courses")}     />
        <StatCard label="Credentials"     value={2} sub="View →" onClick={()=>onNav("credentials")} />
        <StatCard label="Upcoming Exams"  value={2} sub="View →" onClick={()=>onNav("timetable")}   />
        <StatCard label="ECTS Completion" value={`${Math.round(68/120*100)}%`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="rounded-xl p-5 flex flex-col items-center"
          style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <p className="text-xs font-semibold tracking-wide uppercase self-start mb-4" style={{color:muted}}>ECTS Progress</p>
          <ProgressRing earned={68} required={120} isArc/>
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
                <ProgressRing earned={c.progress} required={100} size={44}/>
              </div>
              <Badge color={done?green:amber} backgroundColor={done?greenBg:goldBg}
                     className="text-[11px] font-medium px-2.5 py-0.5 rounded-full self-start"> {done?"Completed":"In progress"} 
              </Badge>
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
              <Button backgroundColor={gold} color={white} className="text-xs font-semibold px-3 py-1.5"> Share </Button>
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
        {opts.map(o=>{const a=val===o;
          return(            
          <Button key={o} onClick={()=>set(a?opts[0]:o)}
                  backgroundColor={a?ink:white} color={a?white:muted} border={`1px solid ${a?ink:border}`}
                  className="text-xs font-medium px-2.5 py-1 rounded-full!"> 
            {o}
          </Button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{backgroundColor:pageColor}}>
      <PageHeader rootLabel={"Andreja Novak"} crumb="Courses" title="Course Catalogue"
        subtitle="Spring 2025 · University of Ljubljana" 
        action={<div className="flex items-center gap-2 text-xs" style={{color:muted}}>
                  <span className="font-semibold" style={{color:green}}>{enrolled.size}</span> enrolled ·{" "}
                  <span className="font-semibold" style={{color:ink}}>{ALL_COURSES.filter(c=>c.status==="open").length}</span> open
                </div>}>
                
          {["Catalogue","My Courses"].map(t=>(
            <button key={t} onClick={()=>setTab(t)}
              className="px-4 py-2 text-sm font-medium rounded-t-lg"
              style={{backgroundColor:tab===t?pageColor:"transparent",color:tab===t?ink:muted,
                borderBottom:tab===t?`2px solid ${gold}`:"2px solid transparent"}}>
              {t}{t==="My Courses"&&<span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{backgroundColor:goldBg,color:amber}}>{enrolled.size}</span>}
            </button>
          ))}
      </PageHeader>

      <div className="px-1 py-6">
        <div className="flex gap-3 mb-4 flex-wrap">
          <div className="flex-1 min-w-48 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon/></span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by title, code, or instructor…"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm border outline-none"
              style={{backgroundColor:white,borderColor:border,color:ink}}
              onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
          </div>
          <Button onClick={() => setShowF(v => !v)}
                  backgroundColor={showF?ink:white} color={showF?white:muted} border={`1px solid ${showF?ink:border}`}
                  className="text-sm font-medium px-4 py-2.5 gap-2 hover:shadow-md"> 
            <FilterIcon/> Filters
            {filters.length>0&&
              <span className="w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center" 
                    style={{backgroundColor:gold,color:white}}> {filters.length} </span>}
          </Button>
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
          {filters.map(f=>
            <Button key={f.k} onClick={f.c} color={amber} backgroundColor={goldBg} border={`1px solid ${goldBdr}`}
                    className="text-xs px-2.5 py-1 gap-1.5 rounded-full!">
              {f.l} <XIcon size={12}/>
            </Button>
          )}
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
                          return  <Badge color={s.col} backgroundColor={s.bg}> {s.lb} </Badge>; })()}
                          <Badge color={{ BA: amber, MA: violet, PhD: green }[c.level]} 
                                 backgroundColor={{ BA: goldBg, MA: violetBg, PhD: greenBg }[c.level]}> {c.level} 
                          </Badge>
                        </div>
                      <h3 className="text-sm font-semibold" style={{color:ink}}>{c.title}</h3>
                      <p className="text-[11px] mt-1" style={{color:muted}}>{c.educator} · {c.language} · {c.programme}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                      {c.status==="completed"
                        ? <span className="text-xs" style={{color:muted}}>Past term</span>
                        : isEnrolled
                        ? <Button onClick={()=>{setEnrolled(p=>{const s=new Set(p);s.delete(c.id);return s;}); toast_(`Withdrawn from ${c.title}.`,false);}}
                                  color={green} backgroundColor={greenBg}
                                  className="text-xs font-medium px-3 py-1.5 gap-1.5">
                            <CheckIcon size={12}/> Enrolled
                          </Button>
                        : c.status==="full"
                        ? <Button disabled className="text-xs px-3 py-1.5 border"> Waitlist </Button>
                        : <Button onClick={()=>setPending(c)} color={white} backgroundColor={ink}
                                  className="text-xs font-semibold px-3 py-1.5 hover:opacity-80"> 
                            Enrol 
                          </Button>
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
                      {c.tags.map(t=>
                        <Badge key={t} color={muted} backgroundColor={pageColor} border={`1px solid ${border}`}
                              className="text-[10px] px-2 py-0.5 rounded-md"> {t} 
                        </Badge>
                      )}
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
          <div className="rounded-xl p-4 my-5" style={{backgroundColor:pageColor,border:`1px solid ${border}`}}>
            <p className="text-[10px] font-mono" style={{color:muted}}>{pending.code}</p>
            <p className="text-sm font-semibold mt-0.5" style={{color:ink}}>{pending.title}</p>
            <p className="text-xs mt-2" style={{color:muted}}>{pending.ects} ECTS · {pending.language} · {pending.term}</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={()=>setPending(null)} color={muted} backgroundColor={white} border={`1px solid ${border}`}
                    className="text-sm font-medium py-2 flex-1">
              Cancel
            </Button>

            <Button onClick={()=>{setEnrolled(p=>new Set([...p,pending.id])); setPending(null); toast_("You're enrolled! Check your email for a calendar invite.");}}
                    color={white} backgroundColor={ink}
                    className="text-sm font-semibold py-2 flex-1">
              Confirm
            </Button>
          </div>
        </div>
      </div>}
      
      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// CREDENTIAL PAGE
// ════════════════════════════════════════════════
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
                <div key={k} className="rounded-xl p-3.5" style={{backgroundColor:pageColor}}>
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
              <div className="p-4 rounded-2xl" style={{backgroundColor:pageColor,border:`1px solid ${border}`}}>
                <img src="src/assets/QR code.webp"/>
              </div>
              <p className="text-xs text-center" style={{color:muted}}>Anyone can scan this QR to verify without an account.</p>
              <Button onClick={()=>{setCopied(true); setTimeout(()=>setCopied(false),2000);}}
                      color={copied?green:amber} backgroundColor={copied?greenBg:goldBg} border={`1px solid ${copied?greenBdr:goldBdr}`}
                      className="text-xs font-semibold px-4 py-2 gap-2">
                {copied?<><CheckIcon size={12} color={green}/> Link copied!</>:<><ShareIcon size={12}/> Copy verify link</>}
              </Button>
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
                      style={{transform:f.shown?"translateX(0px)":"translateX(-17px)"}}/>
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button color={ink} backgroundColor={white} border={`1px solid ${border}`}
                      className="text-xs font-semibold py-2.5 gap-2 rounded-xl!">
                <DownloadIcon size={14}/> Download PDF
              </Button>
      
              <Button color={white} backgroundColor={inkSoft}
                      className="text-xs font-semibold py-2.5 gap-2 rounded-xl!">
                <WalletIcon size={14}/> Add to EUDI Wallet
              </Button>
            </div>
          </div>}

          {tab==="verify"&&<div className="space-y-4">
            {!showV
              ? <>
                  <div className="rounded-xl p-4" style={{backgroundColor:pageColor}}>
                    <p className="text-xs font-semibold mb-2" style={{color:ink}}>Public verify link</p>
                    <p className="text-[11px] font-mono break-all" style={{color:muted}}>{cred.verifyUrl}</p>
                  </div>
                  <Button onClick={()=>{setShowV(true);setVstep(0);}} color={white} backgroundColor={ink}
                          className="text-sm font-semibold w-full py-2.5 rounded-xl">
                    Run verification demo
                  </Button>
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
                  <Button onClick={()=>setVstep(s=>s+1)} color={white} backgroundColor={ink}
                          className="text-xs font-semibold w-full py-2.5">
                    {vstep===0?"Start verification":vstep<3?"Next step":"Complete"}
                  </Button>
                </>
              : <div className="flex flex-col items-center text-center gap-3 py-2">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{backgroundColor:greenBg}}>
                    <CheckIcon size={24} color={green}/>
                  </div>
                  <p className="font-serif text-xl" style={{color:green}}>Valid</p>
                  <p className="text-xs" style={{color:muted}}>Authentic, unrevoked, and issued by a trusted institution in EBSI.</p>
                  <Button onClick={()=>{setShowV(false); setVstep(0);}} color={white} backgroundColor={ink}
                          className="text-xs font-semibold w-full py-2.5">
                    Done
                  </Button>
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
    <div className="min-h-screen" style={{backgroundColor:pageColor}}>
      <PageHeader rootLabel={"Andreja Novak"} crumb="Credentials" title="My Credentials"
        subtitle="Digitally signed · verifiable by anyone" 
        action={<div className="flex gap-4 text-xs" style={{color:muted}}>
                  <span><span className="font-bold" style={{color:ink}}>{active.length}</span> active </span>
                  <span><span className="font-bold" style={{color:amber}}>{pending.length}</span> pending </span>
                </div>}/>

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
                  <Badge color={green} backgroundColor={greenBg}
                         className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase"> Active </Badge>
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
                  <Badge color={amber} backgroundColor={amberBg}
                         className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase"> Pending </Badge>
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
const TODAY_D=9,DAYS_W=["Mon","Tue","Wed","Thu","Fri"],HOURS=[8,9,10,11,12,13,14,15,16];

function TimetablePage(){
  const [view,setView]=useState("week");
  const [hov,setHov]=useState(null);
  const ROW=52,COL=140,LAB=44,gridH=HOURS.length*ROW;
  const daysUntil=d=>Math.round((d-new Date(2025,5,9))/(1000*60*60*24));
  const TypeBadge=({type})=>{const m={written:{l:"Written",bg:"#F1F5F9",c:muted},oral:{l:"Oral",bg:violetBg,c:violet},project:{l:"Project",bg:blueBg,c:blue}};const s=m[type]||m.written;return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide" style={{backgroundColor:s.bg,color:s.c}}>{s.l}</span>;};

  return (
    <div className="min-h-screen" style={{backgroundColor:pageColor}}>
      <PageHeader rootLabel={"Andreja Novak"} crumb="Timetable" title="Timetable"
        subtitle="Week of 9 Jun 2025 · Spring Term" 
        action={<div className="flex rounded-xl overflow-hidden border" style={{borderColor:border}}>
                  {[["week","Weekly"],["exams","Exams"]].map(([v,l])=>(
                    <button key={v} onClick={()=>setView(v)} className="px-4 py-2 text-xs font-semibold transition-colors"
                      style={{backgroundColor:view===v?ink:white,color:view===v?white:muted}}>{l}</button>
                  ))}
                </div>}/>

      <div className="px-1 py-6 space-y-5">
        {view==="week"&&<>
          {EXAMS.filter(e=>daysUntil(e.date)<=7).map(e=>(
            <div key={e.id} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{backgroundColor:redBg,border:"1px solid #FECACA"}}>
              <CalendarIcon size={14} color={red}/>
              <p className="text-xs font-medium" style={{color:red}}>
                Exam in <strong>{daysUntil(e.date)} day{daysUntil(e.date)!==1?"s":""}</strong> — {e.title} · {e.startTime} · {e.room}
              </p>
            </div>
          ))}
          <div className="flex flex-wrap gap-3">
            {[{t:"lecture",l:"Lecture",c:muted,bg:"#F1F5F9"},{t:"lab",l:"Lab",c:green,bg:greenBg},{t:"seminar",l:"Seminar",c:amber,bg:amberBg}].map(({t,l,c,bg})=>(
              <Badge key={t} color={c} backgroundColor={bg}
                      className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full"> 
                      <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:c}}/>{l} </Badge>
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
              const days=daysUntil(e.date), pct=Math.round(e.registered/e.capacity*100);
              const Cd=()=>{
                let bg=pageColor, c=muted;
                if(days<=3){bg=redBg; c=red;}
                else if(days<=7){bg=amberBg; c=amber;}
                return <Badge color={c} backgroundColor={bg} className="text-[11px] font-bold px-2.5 py-1 rounded-full"> {days}d </Badge>;
              };
              return <div key={e.id} className="rounded-2xl p-5 flex gap-4" style={{backgroundColor:white,border:`1px solid ${border}`}}>
                <div className="shrink-0 w-14 flex flex-col items-center justify-center rounded-xl py-2" style={{backgroundColor:e.bg,border:`1px solid ${e.color}20`}}>
                  <p className="text-[10px] font-semibold uppercase tracking-wide" style={{color:e.color}}>{e.date.toLocaleDateString("en-GB",{month:"short"})}</p>
                  <p className="font-serif text-2xl leading-none mt-0.5" style={{color:ink}}>{e.date.getDate()}</p>
                  <p className="text-[10px] mt-0.5" style={{color:muted}}>{e.date.toLocaleDateString("en-GB",{weekday:"short"})}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-[10px] font-mono" style={{color:muted}}>{e.course}</p>
                    <StatusBadge config={STATUS_CFG} status={e.type} fallbackKey="written"/> <Cd/>
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
const catColor={Systems:violet,"AI/ML":blue,DevOps:amber,Data:green,Engineering:rose,Soft:muted};

function RoadmapPage({onNav}){
  const [target,setTarget]=useState("t1");
  const [showT,setShowT]=useState(true);
  const [enrolled2,setEnrolled2]=useState(new Set());
  const [tab,setTab]=useState("skills");
  const t=CAREER_TARGETS.find(x=>x.id===target);

  return (
    <div className="min-h-screen" style={{backgroundColor:pageColor}}>
      <PageHeader rootLabel={"Andreja Novak"} crumb="Roadmap" title="Personal Roadmap"
        subtitle="AI-generated from your ESCO skill profile · Updated 9 Jun 2025" 
        action={ <QualityBadge> QI · Quality Intelligence  </QualityBadge> }/>

      <div className="px-1 py-7 space-y-7">
        <section>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{color:muted}}>Career target</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {CAREER_TARGETS.map(ct=>{
              const on=target===ct.id;
              return  <Button key={ct.id} onClick={()=>setTarget(ct.id)} 
                              color={on?white:ink} backgroundColor={on?inkSoft:white} border={`2px solid ${on?ink:border}`}
                              className="p-4 gap-3 rounded-2xl flex-col">
                        <span className="text-2xl">{ct.icon}</span>
                        <ProgressRing earned={ct.match} required={100} size={56} dark={on}/>
                        <p className="text-xs font-semibold text-center leading-tight" style={{color:on?white:ink}}>{ct.title}</p>
                      </Button>;
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
            const pri={high:{l:"High priority",bg:roseBg,c:rose},medium:{l:"Recommended",bg:amberBg,c:amber},low:{l:"Optional",bg:pageColor,c:muted}}[r.priority];
            return <div key={r.id} className="rounded-xl p-4 flex gap-4" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center" style={{backgroundColor:r.bg}}>
                <span className="text-[10px] font-bold font-mono" style={{color:r.color}}>{r.ects}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-[10px] font-mono" style={{color:muted}}>{r.code}</span>
                  <Badge color={pri.c} backgroundColor={pri.bg}> {pri.l} </Badge>
                </div>
                <p className="text-sm font-semibold" style={{color:ink}}>{r.title}</p>
                <p className="text-[11px] mt-0.5" style={{color:muted}}>{r.reason}</p>
              </div>
              <div className="shrink-0 self-center">
                {enrolled2.has(r.id)
                  ? <span className="text-[11px] font-semibold" style={{color:green}}>✓ Enrolled</span>
                  : r.status==="full"
                  ? <span className="text-[11px]" style={{color:muted}}>Full</span>
                  : <Button onClick={()=>{setEnrolled2(p=>new Set([...p,r.id])); onNav("courses");}} 
                            color={white} backgroundColor={ink}
                            className="text-[11px] font-semibold px-3 py-1.5">
                      Enrol
                    </Button>
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
                  <div className="absolute top-0.5 -left-[28.5px] w-7 flex justify-center">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center z-10"
                      style={{backgroundColor:m.done?green:isCur?gold:white,border:`2px solid ${m.done?green:isCur?gold:border}`}}>
                      {m.done&&<CheckIcon size={8} color={white}/>}
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
    <div className="flex h-screen" style={{backgroundColor:pageColor}}>
      <Sidebar
        subtitle="Student Portal"
        navItems={NAV_ITEMS}
        active={nav}
        onNav={setNav}
        collapsed={collapsed}
        onToggle={() => setCollapsed((b) => !b)}
        onLogout={() => { setLoggedIn(false); setNav("dashboard"); }}
        user={{
          initials: STUDENT.initials,
          name: STUDENT.name.split(" ")[0],
          sub: STUDENT.institution.split(" ").slice(-1)[0],
          color: undefined,
        }}
      />
      <main className="flex-1 overflow-auto p-6 lg:p-8" style={{minWidth:0}}>
        {views[nav]}
      </main>
    </div>
  );
}
