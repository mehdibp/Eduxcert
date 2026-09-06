import { useState } from "react";

import { ink, gold, pageColor, white, muted, mutedBg, border, green, greenBg, amber, amberBg, violet, violetBg, blue, blueBg, red, redBg } from "../../styles/colors";
import { CalendarIcon, ClockIcon, PeopleIcon, RoomIcon } from "../../components/icons/icons";
import { LECTURES, EXAMS } from "../../data/student"

import PageHeader from "../../components/commen/PageHeader"
import { Badge, StatusBadge }  from "../../components/commen/Badge"

// --------------------------------------------------------------------------------------
const WEEK_START = new Date(2025,5,9);
const TODAY_D = 9, DAYS_W = ["Mon","Tue","Wed","Thu","Fri"], HOURS = [8,9,10,11,12,13,14,15,16];
const STATUS_CFG = {
  written: {label:"Written", color:muted,  bg:mutedBg},
  oral:    {label:"Oral"   , color:violet, bg:violetBg},
  project: {label:"Project", color:blue,   bg:blueBg},
};

// --------------------------------------------------------------------------------------
export default function TimetablePage(){
  const [view,setView] = useState("week");
  const [hov,setHov]   = useState(null);
  const ROW=52, COL=140, LAB=44, gridH=HOURS.length*ROW;
  const daysUntil=d=>Math.round((d-new Date(2025,5,9))/(1000*60*60*24));
  // const TypeBadge=({type})=>{const m={written:{l:"Written",bg:"#F1F5F9",c:muted},oral:{l:"Oral",bg:violetBg,c:violet},project:{l:"Project",bg:blueBg,c:blue}};const s=m[type]||m.written;return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide" style={{backgroundColor:s.bg,color:s.c}}>{s.l}</span>;};

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
