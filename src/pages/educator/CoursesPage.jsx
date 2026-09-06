import { useState } from "react";

import { ink, inkSoft, gold, goldBg, goldBdr, pageColor, white, muted, mutedBg, border,
         green, greenBg, amber, amberBg, amberBdr, violet, violetBg, red, redBg } from "../../styles/colors";
import { EditIcon, PlusIcon, XIcon } from "../../components/icons/icons";
import { EDUCATOR, MY_COURSES } from "../../data/educator";

import { Badge, StatusBadge } from "../../components/commen/Badge";
import PageHeader from "../../components/commen/PageHeader";
import { Button } from "../../components/commen/Button";
import Toast      from "../../components/commen/Toast";


// --------------------------------------------------------------------------------------
const STATUS_CFG = {
  draft:     {label:"Draft",     color:muted,  bg:mutedBg },
  reviewed:  {label:"Reviewed",  color:amber,  bg:amberBg },
  published: {label:"Published", color:green,  bg:greenBg },
  appealed:  {label:"Appeal",    color:red,    bg:redBg   },
  final:     {label:"Final",     color:violet, bg:violetBg},
};

// --------------------------------------------------------------------------------------
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
          <Button onClick={onClose} className="p-1.5 hover:bg-white/10"> <XIcon color={white}/> </Button>
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

          <div className="rounded-xl p-4 space-y-3" style={{backgroundColor:pageColor}}>
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
                <Button onClick={addTag} color={amber} backgroundColor={goldBg} border={`1px solid ${goldBdr}`}
                        className="text-sm font-mediumpx-3 p-2">
                  Add
                </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.tags.map(t=>(
                <Badge key={t} color={violet} backgroundColor={violetBg} className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full">
                    {t}
                    <Button onClick={()=>setForm(f=>({...f,tags:f.tags.filter(x=>x!==t)}))}> <XIcon size={10} color={violet}/> </Button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 flex gap-3 border-t shrink-0" style={{borderColor:border}}>
          <Button onClick={onClose} color={muted} border={`1px solid ${border}`}
                  className="text-sm font-medium flex-1 py-2">
            Cancel
          </Button>
          <Button onClick={()=>onSave(form)} color={white} backgroundColor={ink}
                  className="text-sm font-medium flex-1 py-2">
            {course?"Save changes":"Create course"}
          </Button>
        </div>
      </div>
    </div>
  );

}


// --------------------------------------------------------------------------------------
export default function CoursesPage({onNav}) {
  const [editing, setEditing] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [courses, setCourses] = useState(MY_COURSES);
  const [toast, setToast]     = useState(null);

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
      <PageHeader rootLabel={EDUCATOR.name} crumb="My Courses" title="My Courses"
        subtitle={`${EDUCATOR.institution} · ${courses.filter(c=>c.status==="active").length} active`}
        action={
          <Button onClick={()=>setShowNew(true)} color={white} backgroundColor={ink}
                  className="text-sm font-semibold px-4 py-2 gap-2">
            <PlusIcon size={14} color={white}/> New Course
          </Button>
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
                  <Badge backgroundColor={c.level==="MA"?violetBg:c.level==="PhD"?greenBg:goldBg} color={c.level==="MA"?violet:c.level==="PhD"?green:amber}> {c.level} </Badge>
                  <Badge backgroundColor={c.status==="active"?greenBg:"#F1F5F9"} color={c.status==="active"?green:muted}> {c.status==="active"?"Active":"Archived"} </Badge>
                  <StatusBadge config={STATUS_CFG} status={c.gradingStatus} fallbackKey="draft"/>
                </div>
                <h3 className="text-sm font-semibold" style={{color:ink}}>{c.title}</h3>
                <p className="text-[11px] mt-0.5" style={{color:muted}}>
                  {c.educator||EDUCATOR.name} · {c.language} · {c.term}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                {c.gradingStatus!=="published" &&
                  <Button onClick={()=>onNav("grading")} color={amber} backgroundColor={amberBg} border={`1px solid ${amberBdr}`}
                          className="text-xs font-semibold px-3 py-1.5">
                    Grade
                  </Button>
                }
                <Button onClick={()=>setEditing(c)} className="p-2 hover:bg-gray-100 transition-colors"> <EditIcon size={14}/> </Button>
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
              <div className="flex flex-wrap gap-1 mt-1 items-end">
                {c.tags.map(t=>
                  <Badge key={t} color={muted} backgroundColor={pageColor} border={`1px solid ${border}`}
                         className="text-[10px] px-2 py-0.5 rounded-md"> {t} </Badge>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {(editing||showNew) &&
        <CourseModal course={editing} onClose={()=>{setEditing(null);setShowNew(false);}} onSave={handleSave}/>}
      {toast && <Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
