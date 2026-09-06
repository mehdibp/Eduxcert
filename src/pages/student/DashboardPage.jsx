
import { ink, gold, goldBg, goldBdr, white, muted, border, green, greenBg, amber } from "../../styles/colors";
import { STUDENT, DASH_COURSES, DASH_CREDS, TIMELINE } from "../../data/student"

import { SealCredIcon } from "../../components/icons/icons";
import { Badge }        from "../../components/commen/Badge"
import { Button }       from "../../components/commen/Button"
import StatCard         from "../../components/commen/StatCard"
import ProgressRing     from "../../components/commen/ProgressRing";


// --------------------------------------------------------------------------------------
export default function DashboardPage({onNav}) {

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl" style={{color:ink}}>Good morning, Andreja</h1>
          <p className="text-sm mt-0.5" style={{color:muted}}>{STUDENT.programme} · {STUDENT.institution}</p>
        </div>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full"
          style={{backgroundColor:goldBg, color:amber, border:`1px solid ${goldBdr}`}}>
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
