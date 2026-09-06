import { ink, gold, white, muted, mutedBg, border, 
         green, greenBg, amber, amberBg, violet, violetBg, violetBdr, red, redBg } from "../../styles/colors";
import { AlertIcon } from "../../components/icons/icons";
import { EDUCATOR, MY_COURSES, GRADES, TIMELINE_EVENTS } from "../../data/educator";

import {Badge, StatusBadge} from "../../components/commen/Badge"
import StatCard             from "../../components/commen/StatCard";


// --------------------------------------------------------------------------------------
const STATUS_CFG = {
  draft:     {label:"Draft",     color:muted,  bg:mutedBg },
  reviewed:  {label:"Reviewed",  color:amber,  bg:amberBg },
  published: {label:"Published", color:green,  bg:greenBg },
  appealed:  {label:"Appeal",    color:red,    bg:redBg   },
  final:     {label:"Final",     color:violet, bg:violetBg},
};

// --------------------------------------------------------------------------------------
export default function DashboardPage({onNav}) {
  const activeCourses = MY_COURSES.filter(c=>c.status==="active");
  const appeals       = GRADES.filter(g=>g.status==="appealed").length;
  const pendingGrades = GRADES.filter(g=>g.status==="draft" || g.status==="reviewed").length;

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl" style={{color:ink}}>Good morning, Ana</h1>
          <p className="text-sm mt-0.5" style={{color:muted}}>
            {EDUCATOR.title} · {EDUCATOR.department} · {EDUCATOR.institution}
          </p>
        </div>
        <Badge color={violet} backgroundColor={violetBg} border={`1px solid ${violetBdr}`}
               className="text-xs font-medium px-3 py-1.5 rounded-full"> Spring 2025 Term </Badge>
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
        <StatCard label="Active Courses"    value={activeCourses.length} sub="Spring 2025" onClick={()=>onNav("courses")}/>
        <StatCard label="Students enrolled" value={activeCourses.reduce((s,c)=>s+c.enrolled,0)} />
        <StatCard label="Pending grades"    value={pendingGrades} color={pendingGrades>0?amber:green} sub={pendingGrades>0?"Needs action":""} onClick={()=>onNav("grading")}/>
        <StatCard label="Open appeals"      value={appeals} color={appeals>0?red:green} sub={appeals>0?"Respond within 14 days":""} onClick={()=>onNav("grading")}/>
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
                <StatusBadge config={STATUS_CFG} status={c.gradingStatus} fallbackKey="draft"/>
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
