import { useState } from "react";

import {ink, inkSoft, gold, pageColor, white, muted, border, green, amber, amberBg, violet, blue, blueBg, rose, roseBg} from "../../styles/colors";
import { CheckIcon, LightningIcon } from "../../components/icons/icons";
import { CAREER_TARGETS, SKILLS, RECS, MILESTONES } from "../../data/student"

import { Badge }    from "../../components/commen/Badge"
import { Button }   from "../../components/commen/Button"
import ProgressRing from "../../components/commen/ProgressRing"
import PageHeader   from "../../components/commen/PageHeader"
import QualityBadge from "../../components/commen/QualityBadge"


// --------------------------------------------------------------------------------------
const catColor = {Systems:violet, "AI/ML":blue, DevOps:amber, Data:green, Engineering:rose, Soft:muted};

// --------------------------------------------------------------------------------------
export default function RoadmapPage({onNav}){
  const [target,setTarget]       = useState("t1");
  const [showT,setShowT]         = useState(true);
  const [enrolled2,setEnrolled2] = useState(new Set());
  const [tab,setTab]             = useState("skills");
  const t = CAREER_TARGETS.find(x=>x.id===target);

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
                  <div className="absolute top-0.5 -left-7 w-7 flex justify-center">
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
