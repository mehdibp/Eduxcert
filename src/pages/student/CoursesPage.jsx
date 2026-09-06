import { useState, useMemo } from "react";

import { ink, gold, goldBg, goldBdr, pageColor, white, muted, border, green, greenBg, amber, amberBg, violet, violetBg } from "../../styles/colors";
import { CheckIcon, ChevronIcon, FilterIcon, SearchIcon, XIcon } from "../../components/icons/icons";
import { ALL_COURSES } from "../../data/student"

import PageHeader from "../../components/commen/PageHeader"
import Toast      from "../../components/commen/Toast"
import { Badge }  from "../../components/commen/Badge"
import { Button } from "../../components/commen/Button"


// --------------------------------------------------------------------------------------
const INIT_ENROLLED = new Set(["c01","c02","c10","c11"]);

// --------------------------------------------------------------------------------------
export default function CoursesPage() {
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
    programme !=="All"&&{k:"programme", l:programme,  c:()=>setProgramme("All")},
    language  !=="All"&&{k:"language",  l:language,   c:()=>setLanguage("All")},
    level     !=="All"&&{k:"level",     l:level,      c:()=>setLevel("All")},
    ectsF     !=="Any"&&{k:"ects",      l:ectsF,      c:()=>setEctsF("Any")},
    statusF   !=="All"&&{k:"status",    l:statusF,    c:()=>setStatusF("All")},
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
  },[tab, search, programme, language, level, ectsF, statusF, enrolled]);

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
          <PillGroup label="ECTS"      opts={["Any","4 ECTS","6 ECTS"]}     val={ectsF}     set={setEctsF}/>
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
