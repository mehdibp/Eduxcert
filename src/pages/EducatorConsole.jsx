import { useState, useMemo } from "react";
import {ink, inkSoft, gold, goldBg, goldBdr, 
        page, white, muted, border, 
        green, greenBg, amber, amberBg, violet, violetBg, blue, blueBg, red, redBg, rose} from "../styles/colors";

import {GridIcon, BookIcon, GradeIcon, ChartIcon, PeopleIcon, LogoutIcon, CheckIcon, XIcon, 
        PlusIcon, AlertIcon, EditIcon, CalendarIcon, UploadIcon } from "../components/icons/icons"

import Sidebar from "../components/layout/Sidebar"

import Badge from "../components/commen/Badge"

// ════════════════════════════════════════════════
// EDUCATOR DATA (mock — طبق data model سند ۰۶)
// ════════════════════════════════════════════════
const EDUCATOR = {
  name: "Prof. Ana Kovač", initials: "AK",
  title: "Associate Professor",
  department: "Computer Science",
  institution: "University of Ljubljana",
};

const MY_COURSES = [
  { id:"mc1", code:"CS-711", title:"Distributed Systems", ects:6, level:"MA",
    language:"English", term:"Spring 2025", status:"active",
    enrolled:34, capacity:40, programme:"Computer Science",
    tags:["Systems","Networking","Consensus"],
    examDate:"2025-06-12", examRoom:"Main Hall A",
    gradingStatus:"published", passRate:82, avgGrade:7.4 },
  { id:"mc2", code:"CS-522", title:"Database Architecture", ects:4, level:"MA",
    language:"Slovenian", term:"Autumn 2024", status:"archived",
    enrolled:40, capacity:40, programme:"Computer Science",
    tags:["Databases","SQL","NoSQL"],
    examDate:"2024-12-15", examRoom:"P-22",
    gradingStatus:"published", passRate:90, avgGrade:8.1 },
  { id:"mc3", code:"CS-390", title:"Operating Systems", ects:6, level:"BA",
    language:"Slovenian", term:"Spring 2025", status:"active",
    enrolled:29, capacity:45, programme:"Computer Science",
    tags:["Systems","C","Concurrency"],
    examDate:"2025-06-20", examRoom:"P-14",
    gradingStatus:"draft", passRate:null, avgGrade:null },
];

// grade.status: draft | reviewed | published | appealed | final
const GRADES = [
  { id:"g01", student:"Andreja Novak",   sid:"S-2211", score:9, max:10, status:"published", appeal:null },
  { id:"g02", student:"Luka Petrov",     sid:"S-2212", score:7, max:10, status:"published", appeal:null },
  { id:"g03", student:"Maja Horvat",     sid:"S-2213", score:8, max:10, status:"published", appeal:null },
  { id:"g04", student:"Nik Zupan",       sid:"S-2214", score:5, max:10, status:"appealed",  appeal:"Score seems inconsistent with my written answers on Q3 and Q5." },
  { id:"g05", student:"Sara Leban",      sid:"S-2215", score:6, max:10, status:"published", appeal:null },
  { id:"g06", student:"Tine Merhar",     sid:"S-2216", score:4, max:10, status:"appealed",  appeal:"I believe the partial credit policy was not applied to my Q2." },
  { id:"g07", student:"Vita Štefanič",   sid:"S-2217", score:10,max:10, status:"published", appeal:null },
  { id:"g08", student:"Rok Vidmar",      sid:"S-2218", score:7, max:10, status:"reviewed",  appeal:null },
  { id:"g09", student:"Katja Ferko",     sid:"S-2219", score:6, max:10, status:"reviewed",  appeal:null },
  { id:"g10", student:"Blaž Jakopin",    sid:"S-2220", score:8, max:10, status:"draft",     appeal:null },
  { id:"g11", student:"Eva Bergant",     sid:"S-2221", score:3, max:10, status:"draft",     appeal:null },
  { id:"g12", student:"Miha Rus",        sid:"S-2222", score:9, max:10, status:"draft",     appeal:null },
];

const ADVISEES = [
  { id:"a1", name:"Andreja Novak", programme:"MSc CS", ects:68, ectsReq:120, match:78, target:"Backend Engineer",
    gap:["Machine Learning","Cloud Infrastructure","Security"],
    lastMeeting:"2025-04-10" },
  { id:"a2", name:"Luka Petrov",   programme:"MSc CS", ects:44, ectsReq:120, match:55, target:"ML Engineer",
    gap:["Distributed Systems","Python / Data Science"],
    lastMeeting:"2025-03-22" },
  { id:"a3", name:"Maja Horvat",   programme:"MSc CS", ects:92, ectsReq:120, match:88, target:"Cloud Architect",
    gap:["Advanced Cryptography"],
    lastMeeting:"2025-05-01" },
];

const TIMELINE_EVENTS = [
  { id:"e1", ts:"Jun 9, 2025",  type:"appeal",  text:"Grade appeal submitted — Nik Zupan (CS-711)" },
  { id:"e2", ts:"Jun 5, 2025",  type:"grade",   text:"Grades reviewed for CS-711 — awaiting publish" },
  { id:"e3", ts:"Jun 2, 2025",  type:"exam",    text:"Exam held — Distributed Systems · 34 attended" },
  { id:"e4", ts:"May 20, 2025", type:"enrol",   text:"Enrolment closed — CS-390 · 29 / 45 students" },
  { id:"e5", ts:"May 5, 2025",  type:"publish", text:"Grades published — Database Architecture (Autumn 2024)" },
];


// ════════════════════════════════════════════════
// SIDEBAR
// ════════════════════════════════════════════════
const NAV_ITEMS = [
  { id:"dashboard", label:"Dashboard",   Icon:GridIcon  },
  { id:"courses",   label:"My Courses",  Icon:BookIcon  },
  { id:"grading",   label:"Grading",     Icon:GradeIcon },
  { id:"analytics", label:"Analytics",   Icon:ChartIcon },
  { id:"advisees",  label:"Advisees",    Icon:PeopleIcon },
];


// ════════════════════════════════════════════════
// SHARED UI
// ════════════════════════════════════════════════
function PageHeader({breadcrumb, title, subtitle, action}) {
  return (
    <div className="pt-8 pb-6" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
      <p className="text-xs mb-3" style={{color:muted}}>
        <span style={{color:ink}}>{EDUCATOR.name}</span> / {breadcrumb}
      </p>
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl" style={{color:ink}}>{title}</h1>
          {subtitle && <p className="text-sm mt-0.5" style={{color:muted}}>{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}

function StatCard({label, value, sub, color=ink}) {
  return (
    <div className="rounded-xl p-4" style={{backgroundColor:white,border:`1px solid ${border}`}}>
      <p className="text-xs" style={{color:muted}}>{label}</p>
      <p className="text-2xl font-serif mt-1" style={{color}}>{value}</p>
      {sub && <p className="text-[11px] mt-1" style={{color:muted}}>{sub}</p>}
    </div>
  );
}

function GradeStatusBadge({status}) {
  const m = {
    draft:     {bg:"#F1F5F9", color:muted,   label:"Draft"},
    reviewed:  {bg:amberBg,   color:amber,   label:"Reviewed"},
    published: {bg:greenBg,   color:green,   label:"Published"},
    appealed:  {bg:redBg,     color:red,     label:"Appeal"},
    final:     {bg:violetBg,  color:violet,  label:"Final"},
  };
  const s = m[status] || m.draft;
  return <Badge label={s.label} bg={s.bg} color={s.color}/>;
}

function Toast({msg, ok, onDone}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl shadow-xl text-sm font-medium text-white flex items-center gap-2 z-50"
      style={{backgroundColor:ok?ink:"#475569"}}>
      {ok ? <CheckIcon size={14} color={gold}/> : <XIcon size={14} color={white}/>}
      {msg}
    </div>
  );
}

// ════════════════════════════════════════════════
// DASHBOARD VIEW
// ════════════════════════════════════════════════
function DashboardView({onNav}) {
  const activeCourses = MY_COURSES.filter(c=>c.status==="active");
  const appeals = GRADES.filter(g=>g.status==="appealed").length;
  const pendingGrades = GRADES.filter(g=>g.status==="draft"||g.status==="reviewed").length;

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl" style={{color:ink}}>Good morning, Ana</h1>
          <p className="text-sm mt-0.5" style={{color:muted}}>
            {EDUCATOR.title} · {EDUCATOR.department} · {EDUCATOR.institution}
          </p>
        </div>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full"
          style={{backgroundColor:violetBg,color:violet,border:`1px solid #C4B5FD`}}>
          Spring 2025 Term
        </span>
      </div>

      {/* Alert banner for appeals */}
      {appeals > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer"
          onClick={()=>onNav("grading")}
          style={{backgroundColor:redBg,border:`1px solid #FECACA`}}>
          <AlertIcon size={16} color={red}/>
          <p className="text-sm font-medium" style={{color:red}}>
            <strong>{appeals} grade appeal{appeals>1?"s":""}</strong> pending your review — action required within 14 days.
          </p>
          <span className="ml-auto text-xs font-semibold" style={{color:red}}>Review →</span>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Courses"    value={activeCourses.length} sub="Spring 2025" />
        <StatCard label="Students enrolled" value={activeCourses.reduce((s,c)=>s+c.enrolled,0)} />
        <StatCard label="Pending grades"    value={pendingGrades} color={pendingGrades>0?amber:green}
          sub={pendingGrades>0?"Needs action":""} />
        <StatCard label="Open appeals"      value={appeals} color={appeals>0?red:green}
          sub={appeals>0?"Respond within 14 days":""} />
      </div>

      {/* Active courses quick view */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{color:muted}}>My Active Courses</p>
          <button onClick={()=>onNav("courses")} className="text-xs font-medium" style={{color:gold}}>Manage →</button>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {activeCourses.map(c=>(
            <div key={c.id} className="rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow"
              onClick={()=>onNav("courses")}
              style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-[10px] font-mono" style={{color:muted}}>{c.code}</p>
                  <h3 className="text-sm font-semibold mt-0.5" style={{color:ink}}>{c.title}</h3>
                  <p className="text-[11px] mt-0.5" style={{color:muted}}>{c.ects} ECTS · {c.language}</p>
                </div>
                <GradeStatusBadge status={c.gradingStatus}/>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] mb-1" style={{color:muted}}>
                    <span>Enrolment</span><span>{c.enrolled}/{c.capacity}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                    <div className="h-full rounded-full" style={{width:`${c.enrolled/c.capacity*100}%`,backgroundColor:violet}}/>
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <span className="text-[11px]" style={{color:muted}}>
                    📅 Exam: <span style={{color:ink,fontWeight:600}}>{new Date(c.examDate).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</span>
                  </span>
                  <span className="text-[11px]" style={{color:muted}}>
                    📍 {c.examRoom}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{color:muted}}>Recent Activity</p>
        <ol className="relative space-y-4" style={{borderLeft:`1.5px solid ${border}`,paddingLeft:20}}>
          {TIMELINE_EVENTS.map(ev=>{
            const dot = ev.type==="appeal"?red:ev.type==="grade"?amber:ev.type==="publish"?green:violet;
            return <li key={ev.id} className="relative">
              <span className="absolute w-2.5 h-2.5 rounded-full" style={{backgroundColor:dot,left:-26,top:3}}/>
              <p className="text-[11px]" style={{color:muted}}>{ev.ts}</p>
              <p className="text-xs mt-0.5" style={{color:ink}}>{ev.text}</p>
            </li>;
          })}
        </ol>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// COURSES VIEW
// ════════════════════════════════════════════════
function CourseModal({course, onClose, onSave}) {
  const [form, setForm] = useState(course || {
    code:"", title:"", ects:6, language:"English", level:"MA",
    programme:"Computer Science", examDate:"", examRoom:"", capacity:40,
    tags:[], status:"draft",
  });
  const [tag, setTag] = useState("");

  const addTag = () => {
    if(tag.trim() && !form.tags.includes(tag.trim())) {
      setForm(f=>({...f, tags:[...f.tags, tag.trim()]}));
      setTag("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{backgroundColor:"rgba(15,23,41,0.6)",backdropFilter:"blur(3px)"}}>
      <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{backgroundColor:white,maxHeight:"92vh"}}>
        <div className="px-6 py-5 flex items-center justify-between shrink-0"
          style={{backgroundColor:inkSoft}}>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-semibold" style={{color:goldBg}}>
              {course?"Edit Course":"New Course"}
            </p>
            <h2 className="font-serif text-lg text-white">{form.title||"Untitled"}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10"><XIcon color={white}/></button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {[
              {label:"Course code", key:"code", ph:"CS-XXX"},
              {label:"Title",       key:"title", ph:"e.g. Advanced Algorithms"},
            ].map(({label,key,ph})=>(
              <div key={key} className={key==="title"?"col-span-2":""}>
                <label className="block text-xs font-medium mb-1.5" style={{color:"#334155"}}>{label}</label>
                <input value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                  placeholder={ph} className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{borderColor:border,color:ink}}
                  onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              {label:"ECTS",    key:"ects",  type:"number", opts:null},
              {label:"Level",   key:"level", type:"select", opts:["BA","MA","PhD"]},
              {label:"Language",key:"language",type:"select",opts:["English","Slovenian","German"]},
            ].map(({label,key,type,opts})=>(
              <div key={key}>
                <label className="block text-xs font-medium mb-1.5" style={{color:"#334155"}}>{label}</label>
                {type==="select"
                  ? <select value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                      style={{borderColor:border,color:ink}}>
                      {opts.map(o=><option key={o}>{o}</option>)}
                    </select>
                  : <input type="number" value={form[key]} onChange={e=>setForm(f=>({...f,[key]:+e.target.value}))}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                      style={{borderColor:border,color:ink}}/>
                }
              </div>
            ))}
          </div>

          <div className="rounded-xl p-4 space-y-3" style={{backgroundColor:page}}>
            <p className="text-xs font-semibold" style={{color:ink}}>Exam details</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                {label:"Date",     key:"examDate",  type:"date"},
                {label:"Room",     key:"examRoom",  type:"text", ph:"e.g. Main Hall A"},
                {label:"Capacity", key:"capacity",  type:"number"},
              ].map(({label,key,type,ph})=>(
                <div key={key}>
                  <label className="block text-[10px] font-medium mb-1" style={{color:muted}}>{label}</label>
                  <input type={type} value={form[key]} placeholder={ph}
                    onChange={e=>setForm(f=>({...f,[key]:type==="number"?+e.target.value:e.target.value}))}
                    className="w-full rounded-lg border px-2.5 py-1.5 text-xs outline-none"
                    style={{borderColor:border,color:ink}}
                    onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
                </div>
              ))}
            </div>
          </div>

          {/* ESCO competency tags */}
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{color:"#334155"}}>
              ESCO competency tags
            </label>
            <div className="flex gap-2 mb-2">
              <input value={tag} onChange={e=>setTag(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&addTag()}
                placeholder="e.g. Distributed Computing" className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
                style={{borderColor:border,color:ink}}
                onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
              <button onClick={addTag} className="px-3 py-2 rounded-lg text-sm font-medium" style={{backgroundColor:goldBg,color:amber,border:`1px solid ${goldBdr}`}}>Add</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.tags.map(t=>(
                <span key={t} className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full"
                  style={{backgroundColor:violetBg,color:violet}}>
                  {t}
                  <button onClick={()=>setForm(f=>({...f,tags:f.tags.filter(x=>x!==t)}))}><XIcon size={10} color={violet}/></button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 flex gap-3 border-t shrink-0" style={{borderColor:border}}>
          <button onClick={onClose} className="flex-1 py-2 rounded-lg border text-sm font-medium"
            style={{borderColor:border,color:muted}}>Cancel</button>
          <button onClick={()=>onSave(form)} className="flex-1 py-2 rounded-lg text-sm font-semibold text-white"
            style={{backgroundColor:ink}}>
            {course?"Save changes":"Create course"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CoursesView({onNav}) {
  const [editing, setEditing] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [courses, setCourses] = useState(MY_COURSES);
  const [toast, setToast] = useState(null);

  const showToast = (msg,ok=true) => { setToast({msg,ok}); setTimeout(()=>setToast(null),3000); };

  const handleSave = (form) => {
    if(editing) {
      setCourses(cs=>cs.map(c=>c.id===editing.id?{...c,...form}:c));
      showToast("Course updated successfully.");
    } else {
      setCourses(cs=>[...cs,{...form,id:`mc${Date.now()}`,enrolled:0,gradingStatus:"draft",passRate:null,avgGrade:null,status:"draft"}]);
      showToast("Course created! Students can enrol once you publish it.");
    }
    setEditing(null); setShowNew(false);
  };

  return (
    <div className="space-y-5">
      <PageHeader breadcrumb="My Courses" title="My Courses"
        subtitle={`${EDUCATOR.institution} · ${courses.filter(c=>c.status==="active").length} active`}
        action={
          <button onClick={()=>setShowNew(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{backgroundColor:ink}}>
            <PlusIcon size={14} color={white}/> New Course
          </button>
        }/>

      <div className="space-y-4">
        {courses.map(c=>(
          <div key={c.id} className="rounded-xl overflow-hidden"
            style={{backgroundColor:white,border:`1px solid ${border}`}}>
            <div className="p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0"
                style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
                <span className="font-serif text-lg leading-none" style={{color:gold}}>{c.ects}</span>
                <span className="text-[9px] font-semibold" style={{color:amber}}>ECTS</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-[10px] font-mono" style={{color:muted}}>{c.code}</p>
                  <Badge label={c.level} bg={c.level==="MA"?violetBg:c.level==="PhD"?greenBg:goldBg}
                    color={c.level==="MA"?violet:c.level==="PhD"?green:amber}/>
                  <Badge label={c.status==="active"?"Active":"Archived"}
                    bg={c.status==="active"?greenBg:"#F1F5F9"} color={c.status==="active"?green:muted}/>
                  <GradeStatusBadge status={c.gradingStatus}/>
                </div>
                <h3 className="text-sm font-semibold" style={{color:ink}}>{c.title}</h3>
                <p className="text-[11px] mt-0.5" style={{color:muted}}>
                  {c.educator||EDUCATOR.name} · {c.language} · {c.term}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                {c.gradingStatus!=="published" &&
                  <button onClick={()=>onNav("grading")}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{backgroundColor:amberBg,color:amber,border:`1px solid #FDE68A`}}>
                    Grade
                  </button>
                }
                <button onClick={()=>setEditing(c)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <EditIcon size={14}/>
                </button>
              </div>
            </div>
            <div className="px-5 pb-4 flex flex-wrap gap-x-6 gap-y-2 border-t pt-3"
              style={{borderColor:border}}>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>Enrolment</p>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                    <div className="h-full rounded-full" style={{width:`${c.enrolled/c.capacity*100}%`,backgroundColor:violet}}/>
                  </div>
                  <span className="text-xs font-medium" style={{color:ink}}>{c.enrolled}/{c.capacity}</span>
                </div>
              </div>
              {c.passRate!==null && <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>Pass rate</p>
                <span className="text-xs font-semibold" style={{color:c.passRate>=80?green:c.passRate>=60?amber:red}}>{c.passRate}%</span>
              </div>}
              {c.avgGrade!==null && <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>Avg grade</p>
                <span className="text-xs font-semibold" style={{color:ink}}>{c.avgGrade.toFixed(1)}/10</span>
              </div>}
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>Exam</p>
                <span className="text-xs" style={{color:ink}}>
                  {new Date(c.examDate).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})} · {c.examRoom}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {c.tags.map(t=><span key={t} className="text-[10px] px-2 py-0.5 rounded-md"
                  style={{backgroundColor:page,color:muted,border:`1px solid ${border}`}}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {(editing||showNew) &&
        <CourseModal course={editing} onClose={()=>{setEditing(null);setShowNew(false);}} onSave={handleSave}/>}
      {toast && <Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// GRADING VIEW
// ════════════════════════════════════════════════
function GradingView() {
  const [grades, setGrades] = useState(GRADES);
  const [selectedCourse, setSelectedCourse] = useState("mc1");
  const [editingGrade, setEditingGrade] = useState(null);
  const [appealModal, setAppealModal] = useState(null);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  const course = MY_COURSES.find(c=>c.id===selectedCourse);
  const filtered = useMemo(()=>
    filter==="all" ? grades : grades.filter(g=>g.status===filter),
    [grades, filter]
  );

  const counts = {
    draft:     grades.filter(g=>g.status==="draft").length,
    reviewed:  grades.filter(g=>g.status==="reviewed").length,
    published: grades.filter(g=>g.status==="published").length,
    appealed:  grades.filter(g=>g.status==="appealed").length,
    final:     grades.filter(g=>g.status==="final").length,
  };

  const promoteAll = (from, to) => {
    setGrades(gs=>gs.map(g=>g.status===from?{...g,status:to}:g));
    showToast(`All ${from} grades moved to ${to}.`);
  };
  const publishAll = () => {
    setGrades(gs=>gs.map(g=>g.status==="reviewed"?{...g,status:"published"}:g));
    showToast("Grades published! Students have been notified.");
  };
  const resolveAppeal = (id, newScore, decision) => {
    setGrades(gs=>gs.map(g=>g.id===id?{...g,status:"final",score:newScore,appeal:null}:g));
    setAppealModal(null);
    showToast(`Appeal resolved — grade ${decision}.`);
  };

  const pct = s => grades.length ? Math.round(grades.filter(g=>g.status===s).length/grades.length*100) : 0;

  // Grade distribution bar
  const dist = [0,1,2,3,4,5,6,7,8,9,10].map(v=>({v, n:grades.filter(g=>g.score===v).length}));
  const maxDist = Math.max(...dist.map(d=>d.n),1);

  return (
    <div className="space-y-6">
      <PageHeader breadcrumb="Grading" title="Grading"
        subtitle="draft → reviewed → published · appeals window: 14 days"
        action={
          counts.reviewed > 0 &&
          <button onClick={publishAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{backgroundColor:green}}>
            <CheckIcon size={14} color={white}/> Publish {counts.reviewed} grade{counts.reviewed>1?"s":""}
          </button>
        }/>

      {/* Course selector */}
      <div className="flex gap-2 flex-wrap">
        {MY_COURSES.map(c=>(
          <button key={c.id} onClick={()=>setSelectedCourse(c.id)}
            className="px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{backgroundColor:selectedCourse===c.id?ink:white,
              color:selectedCourse===c.id?white:muted,
              border:`1px solid ${selectedCourse===c.id?ink:border}`}}>
            {c.code} · {c.title}
          </button>
        ))}
      </div>

      {/* Workflow pipeline */}
      <div className="grid grid-cols-5 gap-2">
        {[
          {key:"draft",    label:"Draft",     color:muted,  bg:"#F1F5F9", arrow:true },
          {key:"reviewed", label:"Reviewed",  color:amber,  bg:amberBg,   arrow:true },
          {key:"published",label:"Published", color:green,  bg:greenBg,   arrow:false},
          {key:"appealed", label:"Appealed",  color:red,    bg:redBg,     arrow:false},
          {key:"final",    label:"Final",     color:violet, bg:violetBg,  arrow:false},
        ].map(({key,label,color,bg,arrow})=>(
          <div key={key} className="relative">
            <div className="rounded-xl p-3 text-center" style={{backgroundColor:bg}}>
              <p className="text-2xl font-serif" style={{color}}>{counts[key]}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide mt-1" style={{color}}>{label}</p>
            </div>
            {arrow && counts[key]>0 && (
              <button onClick={()=>promoteAll(key,key==="draft"?"reviewed":"published")}
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center z-10 shadow-sm"
                style={{backgroundColor:white,border:`1px solid ${border}`,fontSize:10,color:muted}}>
                →
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Appeals alert */}
      {counts.appealed > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{backgroundColor:redBg,border:`1px solid #FECACA`}}>
          <AlertIcon size={16} color={red}/>
          <p className="text-xs font-medium" style={{color:red}}>
            <strong>{counts.appealed} appeal{counts.appealed>1?"s":""}</strong> require review.
            Appeals window is 14 days from grade publication.
          </p>
          <button onClick={()=>setFilter("appealed")} className="ml-auto text-xs font-semibold shrink-0" style={{color:red}}>
            Show appeals
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Grade table */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          {/* Filter tabs */}
          <div className="flex border-b" style={{borderColor:border}}>
            {[["all","All",grades.length],["draft","Draft",counts.draft],["reviewed","Reviewed",counts.reviewed],["appealed","Appeals",counts.appealed]].map(([f,l,n])=>(
              <button key={f} onClick={()=>setFilter(f)}
                className="px-4 py-3 text-xs font-semibold transition-colors"
                style={{color:filter===f?gold:muted,borderBottom:filter===f?`2px solid ${gold}`:"2px solid transparent"}}>
                {l} {n>0&&<span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full"
                  style={{backgroundColor:f==="appealed"&&n>0?redBg:goldBg,color:f==="appealed"&&n>0?red:amber}}>{n}</span>}
              </button>
            ))}
            <div className="ml-auto flex items-center px-4 gap-2">
              <UploadIcon size={14}/>
              <span className="text-[11px]" style={{color:muted}}>CSV import</span>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr style={{backgroundColor:page}}>
                {["Student","ID","Score","Status",""].map(h=>(
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5"
                    style={{color:muted}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(g=>(
                <tr key={g.id} className="border-t hover:bg-gray-50 transition-colors"
                  style={{borderColor:border,backgroundColor:g.status==="appealed"?`${redBg}66`:""}}>
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold" style={{color:ink}}>{g.student}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[10px] font-mono" style={{color:muted}}>{g.sid}</p>
                  </td>
                  <td className="px-4 py-3">
                    {editingGrade===g.id
                      ? <input type="number" min="0" max="10" defaultValue={g.score}
                          autoFocus className="w-14 rounded-lg border px-2 py-1 text-sm outline-none text-center font-semibold"
                          style={{borderColor:gold,color:ink}}
                          onBlur={e=>{
                            const v=Math.min(10,Math.max(0,+e.target.value));
                            setGrades(gs=>gs.map(x=>x.id===g.id?{...x,score:v}:x));
                            setEditingGrade(null);
                          }}/>
                      : <span className="text-sm font-bold" style={{color:g.score>=5?ink:red}}>
                          {g.score}<span className="text-[10px] font-normal" style={{color:muted}}>/10</span>
                        </span>
                    }
                  </td>
                  <td className="px-4 py-3"><GradeStatusBadge status={g.status}/></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {g.status!=="published" && g.status!=="final" && (
                        <button onClick={()=>setEditingGrade(g.id)}
                          className="p-1.5 rounded hover:bg-gray-100"><EditIcon size={13}/></button>
                      )}
                      {g.status==="appealed" && (
                        <button onClick={()=>setAppealModal(g)}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                          style={{backgroundColor:redBg,color:red}}>
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Distribution chart */}
        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <p className="text-xs font-semibold mb-4" style={{color:ink}}>Grade distribution</p>
          <div className="flex items-end gap-1 h-32 mb-2">
            {dist.filter(d=>d.v>=1).map(d=>(
              <div key={d.v} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-sm transition-all"
                  style={{height:`${(d.n/maxDist)*100}%`,minHeight:d.n>0?4:0,
                    backgroundColor:d.v<=4?red:d.v<=6?amber:green,opacity:0.85}}/>
                <span className="text-[9px] font-semibold" style={{color:muted}}>{d.v}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-3 border-t" style={{borderColor:border}}>
            {[
              {label:"Pass rate",   value:`${course.passRate||"—"}%`, color:green},
              {label:"Average",     value:`${course.avgGrade||"—"}/10`,color:ink},
              {label:"Published",   value:`${counts.published}/${grades.length}`,color:muted},
            ].map(({label,value,color})=>(
              <div key={label} className="flex justify-between text-xs">
                <span style={{color:muted}}>{label}</span>
                <span className="font-semibold" style={{color}}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appeal resolution modal */}
      {appealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{backgroundColor:"rgba(15,23,41,0.6)",backdropFilter:"blur(3px)"}}>
          <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            style={{backgroundColor:white}}>
            <div className="px-6 py-4 flex items-center justify-between"
              style={{backgroundColor:"#FEF2F2"}}>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold" style={{color:red}}>Grade Appeal</p>
                <p className="text-sm font-semibold mt-0.5" style={{color:ink}}>{appealModal.student}</p>
              </div>
              <button onClick={()=>setAppealModal(null)} className="p-1.5 rounded-lg hover:bg-red-100">
                <XIcon size={14}/>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-xl p-4" style={{backgroundColor:page}}>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>Student's appeal reason</p>
                <p className="text-xs leading-relaxed italic" style={{color:ink}}>"{appealModal.appeal}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>Current score</p>
                  <p className="text-2xl font-serif" style={{color:ink}}>{appealModal.score}/10</p>
                </div>
                <div className="text-2xl" style={{color:muted}}>→</div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>New score (or keep)</p>
                  <input id="new-score" type="number" min="0" max="10" defaultValue={appealModal.score}
                    className="w-24 rounded-lg border px-3 py-2 text-lg font-bold outline-none text-center"
                    style={{borderColor:border,color:ink}}
                    onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={()=>{
                  const v=+document.getElementById("new-score").value;
                  resolveAppeal(appealModal.id,v,v===appealModal.score?"unchanged":"updated");
                }} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{backgroundColor:ink}}>
                  Resolve appeal
                </button>
                <button onClick={()=>{
                  setGrades(gs=>gs.map(g=>g.id===appealModal.id?{...g,status:"published",appeal:null}:g));
                  setAppealModal(null);
                  showToast("Appeal dismissed — grade unchanged.");
                }} className="px-4 py-2.5 rounded-xl text-sm font-medium border"
                  style={{borderColor:border,color:muted}}>
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} ok={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// ANALYTICS VIEW
// ════════════════════════════════════════════════
function AnalyticsView() {
  const [selectedCourse, setSelectedCourse] = useState("mc1");

  // Skills heat-map data per course
  const heatmap = [
    {skill:"Distributed Consensus",  score:88, prev:75},
    {skill:"Fault Tolerance",        score:74, prev:70},
    {skill:"Networking Protocols",   score:91, prev:85},
    {skill:"Concurrency Primitives", score:62, prev:58},
    {skill:"System Design",          score:79, prev:72},
    {skill:"CAP Theorem",            score:55, prev:48},
  ];

  const gradeDist = [
    {range:"1-3 (Fail)",  count:3,  pct:9},
    {range:"4-5",         count:5,  pct:15},
    {range:"6-7",         count:11, pct:32},
    {range:"8-9",         count:12, pct:35},
    {range:"10 (Max)",    count:3,  pct:9},
  ];

  return (
    <div className="space-y-6">
      <PageHeader breadcrumb="Analytics" title="Cohort Analytics"
        subtitle="Grade distribution · skills heat-map · cohort trends"/>

      {/* Course tabs */}
      <div className="flex gap-2 flex-wrap">
        {MY_COURSES.filter(c=>c.status==="active").map(c=>(
          <button key={c.id} onClick={()=>setSelectedCourse(c.id)}
            className="px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{backgroundColor:selectedCourse===c.id?ink:white,
              color:selectedCourse===c.id?white:muted,
              border:`1px solid ${selectedCourse===c.id?ink:border}`}}>
            {c.code}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {[
          {label:"Enrolled",    value:"34", sub:"/ 40 capacity"},
          {label:"Pass rate",   value:"82%", sub:"prev. term: 78%", color:green},
          {label:"Average grade",value:"7.4", sub:"median: 7.0"},
          {label:"Attempts",    value:"1.2", sub:"avg per student"},
        ].map(({label,value,sub,color=ink})=>(
          <StatCard key={label} label={label} value={value} sub={sub} color={color}/>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Grade distribution */}
        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <p className="text-xs font-semibold mb-4" style={{color:ink}}>Grade distribution</p>
          <div className="space-y-3">
            {gradeDist.map(d=>(
              <div key={d.range}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span style={{color:muted}}>{d.range}</span>
                  <span className="font-semibold" style={{color:ink}}>{d.count} students ({d.pct}%)</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                  <div className="h-full rounded-full" style={{width:`${d.pct}%`,
                    backgroundColor:d.range.includes("Fail")?red:d.range.includes("10")?green:d.range.includes("8")?green:amber}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills heat-map */}
        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold" style={{color:ink}}>Skills heat-map</p>
            <div className="flex items-center gap-3 text-[10px]" style={{color:muted}}>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{backgroundColor:blue}}/> This term</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{backgroundColor:border}}/> Prev.</span>
            </div>
          </div>
          <div className="space-y-3">
            {heatmap.map(h=>(
              <div key={h.skill}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span style={{color:muted}}>{h.skill}</span>
                  <span className="font-semibold" style={{color:h.score>=80?green:h.score>=60?amber:red}}>{h.score}%</span>
                </div>
                <div className="relative h-2 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                  <div className="absolute h-full rounded-full opacity-40" style={{width:`${h.prev}%`,backgroundColor:blue}}/>
                  <div className="absolute h-full rounded-full" style={{width:`${h.score}%`,backgroundColor:h.score>=80?green:h.score>=60?amber:red,opacity:0.85}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cohort table */}
      <div className="rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{borderColor:border}}>
          <p className="text-xs font-semibold" style={{color:ink}}>Individual results</p>
          <button className="flex items-center gap-1.5 text-xs font-medium" style={{color:gold}}>
            <UploadIcon size={12}/> Export CSV
          </button>
        </div>
        <table className="w-full">
          <thead style={{backgroundColor:page}}>
            <tr>{["Student","Score","Status","Percentile"].map(h=>(
              <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5" style={{color:muted}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {GRADES.sort((a,b)=>b.score-a.score).map((g,i)=>(
              <tr key={g.id} className="border-t" style={{borderColor:border}}>
                <td className="px-4 py-3 text-xs font-medium" style={{color:ink}}>{g.student}</td>
                <td className="px-4 py-3">
                  <span className="text-sm font-bold" style={{color:g.score>=5?ink:red}}>{g.score}/10</span>
                </td>
                <td className="px-4 py-3"><GradeStatusBadge status={g.status}/></td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium" style={{color:muted}}>
                    Top {Math.round((1-(i/GRADES.length))*100)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// ADVISEES VIEW
// ════════════════════════════════════════════════
function AdviseesView() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">
      <PageHeader breadcrumb="Advisees" title="Advisee Roadmaps"
        subtitle={`${ADVISEES.length} students under your academic guidance`}/>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Advisee list */}
        <div className="space-y-3">
          {ADVISEES.map(a=>(
            <button key={a.id} onClick={()=>setSelected(a)}
              className="w-full text-left rounded-xl p-4 transition-all"
              style={{backgroundColor:selected?.id===a.id?inkSoft:white,
                border:`2px solid ${selected?.id===a.id?ink:border}`,
                boxShadow:selected?.id===a.id?"0 8px 24px -6px rgba(15,23,41,0.3)":"none"}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{backgroundColor:a.match>=80?green:a.match>=60?gold:amber}}>
                  {a.name.split(" ").map(n=>n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{color:selected?.id===a.id?white:ink}}>{a.name}</p>
                  <p className="text-[11px]" style={{color:selected?.id===a.id?"#94A3B8":muted}}>{a.programme}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[10px] mb-1"
                    style={{color:selected?.id===a.id?"#94A3B8":muted}}>
                    <span>ECTS</span><span>{a.ects}/{a.ectsReq}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden"
                    style={{backgroundColor:selected?.id===a.id?"rgba(255,255,255,0.1)":border}}>
                    <div className="h-full rounded-full" style={{width:`${a.ects/a.ectsReq*100}%`,backgroundColor:gold}}/>
                  </div>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span style={{color:selected?.id===a.id?"#94A3B8":muted}}>Target: {a.target}</span>
                  <span className="font-semibold" style={{color:a.match>=80?green:a.match>=60?gold:amber}}>{a.match}% match</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Advisee detail */}
        {selected ? (
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{color:muted}}>Academic roadmap</p>
                  <h2 className="font-serif text-xl" style={{color:ink}}>{selected.name}</h2>
                  <p className="text-sm" style={{color:muted}}>{selected.programme} · Last meeting: {selected.lastMeeting}</p>
                </div>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
                  style={{backgroundColor:goldBg,color:amber,border:`1px solid ${goldBdr}`}}>
                  <CalendarIcon size={12} color={amber}/> Schedule meeting
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {[
                  {label:"ECTS progress", value:`${selected.ects}/${selected.ectsReq}`,color:gold},
                  {label:"Career match",  value:`${selected.match}%`,color:selected.match>=80?green:selected.match>=60?gold:amber},
                  {label:"Target role",   value:selected.target,color:ink},
                ].map(({label,value,color})=>(
                  <div key={label} className="rounded-xl p-3" style={{backgroundColor:page}}>
                    <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>{label}</p>
                    <p className="text-sm font-semibold leading-snug" style={{color}}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Skill gaps */}
              <div>
                <p className="text-xs font-semibold mb-3" style={{color:ink}}>Skill gaps to address</p>
                <div className="space-y-2">
                  {selected.gap.map((g,i)=>(
                    <div key={g} className="flex items-center gap-3 p-3 rounded-lg"
                      style={{backgroundColor:i===0?redBg:i===1?amberBg:page,
                        border:`1px solid ${i===0?"#FECACA":i===1?"#FDE68A":border}`}}>
                      <span className="text-xs font-semibold shrink-0"
                        style={{color:i===0?red:i===1?amber:muted}}>
                        {i===0?"High":i===1?"Med":"Low"}
                      </span>
                      <span className="text-xs" style={{color:ink}}>{g}</span>
                      <button className="ml-auto text-[11px] font-semibold shrink-0"
                        style={{color:gold}}>Recommend course →</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <p className="text-xs font-semibold mb-3" style={{color:ink}}>Meeting notes</p>
              <textarea placeholder={`Add notes from your meeting with ${selected.name}…`}
                rows={4} className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none resize-none"
                style={{borderColor:border,color:ink}}
                onFocus={e=>e.target.style.borderColor=gold}
                onBlur={e=>e.target.style.borderColor=border}/>
              <button className="mt-2 px-4 py-2 rounded-lg text-xs font-semibold text-white"
                style={{backgroundColor:ink}}>Save notes</button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 flex items-center justify-center rounded-xl"
            style={{backgroundColor:white,border:`1px solid ${border}`,minHeight:320}}>
            <div className="text-center">
              <p className="text-3xl mb-3">👤</p>
              <p className="text-sm font-medium" style={{color:ink}}>Select a student to view their roadmap</p>
              <p className="text-xs mt-1" style={{color:muted}}>You can recommend courses and add meeting notes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════
export default function EducatorConsole() {
  const [nav, setNav]           = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true); // start logged in for demo

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor:page}}>
        <div className="rounded-2xl p-10 text-center" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{border:`1.5px solid ${gold}`}}>
            <div className="w-3 h-3 rounded-full" style={{backgroundColor:gold}}/>
          </div>
          <h1 className="font-serif text-xl mb-1" style={{color:ink}}>Eduxcert</h1>
          <p className="text-sm mb-6" style={{color:muted}}>Educator Console · University of Ljubljana</p>
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
    dashboard: <DashboardView onNav={setNav}/>,
    courses:   <CoursesView onNav={setNav}/>,
    grading:   <GradingView/>,
    analytics: <AnalyticsView/>,
    advisees:  <AdviseesView/>,
  };

  return (
    <div className="flex h-screen" style={{backgroundColor:page}}>

      <Sidebar
        subtitle="Educator Console"
        navItems={NAV_ITEMS}
        active={nav}
        onNav={setNav}
        collapsed={collapsed}
        onToggle={() => setCollapsed((b) => !b)}
        onLogout={() => setLoggedIn(false)}
        user={{
          initials: EDUCATOR.initials,
          name: EDUCATOR.name.replace("Prof. ", ""),
          sub: EDUCATOR.title,
          color: "#7C3AED",
        }}
      />

      <main className="flex-1 overflow-auto p-6 lg:p-8" style={{minWidth:0}}>
        {views[nav]}
      </main>
    </div>
  );
}
