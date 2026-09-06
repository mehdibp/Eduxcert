import { useState } from "react";

import { ink, inkSoft, gold, goldBg, goldBdr, pageColor, white, muted, border, green, amber, amberBg, red, redBg } from "../../styles/colors";
import { CalendarIcon } from "../../components/icons/icons";
import { EDUCATOR, ADVISEES } from "../../data/educator"

import PageHeader from "../../components/commen/PageHeader"
import { Button } from "../../components/commen/Button"


// --------------------------------------------------------------------------------------
export default function AdviseesPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">
      <PageHeader rootLabel={EDUCATOR.name} crumb="Advisees" title="Advisee Roadmaps"
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
                <Button color={amber} backgroundColor={goldBg} border={`1px solid ${goldBdr}`}
                        className="text-xs font-semibold gap-2 px-3 py-2">
                  <CalendarIcon size={12} color={amber}/> Schedule meeting
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {[
                  {label:"ECTS progress", value:`${selected.ects}/${selected.ectsReq}`,color:gold},
                  {label:"Career match",  value:`${selected.match}%`,color:selected.match>=80?green:selected.match>=60?gold:amber},
                  {label:"Target role",   value:selected.target,color:ink},
                ].map(({label,value,color})=>(
                  <div key={label} className="rounded-xl p-3" style={{backgroundColor:pageColor}}>
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
                      style={{backgroundColor:i===0?redBg:i===1?amberBg:pageColor,
                        border:`1px solid ${i===0?"#FECACA":i===1?"#FDE68A":border}`}}>
                      <span className="text-xs font-semibold shrink-0"
                        style={{color:i===0?red:i===1?amber:muted}}>
                        {i===0?"High":i===1?"Med":"Low"}
                      </span>
                      <span className="text-xs" style={{color:ink}}>{g}</span>
                      <Button color={gold} className="text-[11px] font-semibold ml-auto"> Recommend course → </Button>
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
              <Button color={white} backgroundColor={ink}
                      className="text-xs font-semibold mt-2 px-4 py-2">
                Save notes
              </Button>
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
