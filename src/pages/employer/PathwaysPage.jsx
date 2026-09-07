import { useState } from "react";

import { ink, white, muted, mutedBg, border, violet, violetBg, blue, blueBg, red, redBg, teal, tealBg } from "../../styles/colors";
import { COMPANY, EMPLOYEES, WORKFORCE_SKILLS, PATHWAYS } from "../../data/employer";

import PageHeader from "../../components/commen/PageHeader";
import {Badge}    from "../../components/commen/Badge";
import {Button}   from "../../components/commen/Button";
import Toast      from "../../components/commen/Toast";


// --------------------------------------------------------------------------------------
export default function PathwaysPage(){
  const [pathways, setPathways] = useState(PATHWAYS);
  const [toast, setToast]       = useState(null);
  const showToast = (msg, ok=true)=>{ setToast({msg, ok}); setTimeout(()=>setToast(null), 3000); };

  const enroll = (id)=>{
    setPathways(ps=>ps.map(p=>p.id===id?{...p,status:"enrolled",employees:[...p.employees,"Blaž Jakopin"]}:p));
    showToast("Team enrolled in pathway. University will confirm within 48h.");
  };

  return(
    <div className="space-y-5">
      <PageHeader rootLabel={COMPANY.name} crumb="Upskilling" title="Upskilling Pathways"
        subtitle="Subscribe your team to structured learning tracks from partner institutions"/>

      <div className="rounded-xl p-4 flex items-start gap-3"
        style={{backgroundColor:blueBg,border:`1px solid #BFDBFE`}}>
        <span className="text-base">💡</span>
        <p className="text-xs" style={{color:blue}}>
          Pathways are powered by Eduxcert-connected universities. Completing a pathway earns
          your employees <strong>verified ECTS credentials</strong> — automatically pushed to their EUDI Wallet
          and linked back to your workforce skills heatmap.
        </p>
      </div>

      <div className="space-y-4">
        {pathways.map(p=>(
          <div key={p.id} className="rounded-2xl p-6"
            style={{backgroundColor:white,border:`2px solid ${p.status==="enrolled"?teal:border}`}}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-sm font-semibold" style={{color:ink}}>{p.title}</h3>
                  {p.status==="enrolled"&&( <Badge color={teal} backgroundColor={tealBg}> Enrolled </Badge> )}
                </div>
                <p className="text-xs" style={{color:muted}}>{p.provider} · {p.duration}</p>
              </div>
              {p.status==="available"?(
                <Button onClick={()=>enroll(p.id)} color={white} backgroundColor={teal}
                        className="text-xs font-semibold px-4 py-2">
                  Enrol team →
                </Button>
              ):(
                <span className="shrink-0 text-xs font-semibold px-4 py-2 rounded-lg"
                  style={{backgroundColor:tealBg,color:teal}}>
                  Active
                </span>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{color:muted}}>Courses included</p>
                <div className="space-y-1">
                  {p.courses.map(c=>(
                    <div key={c} className="flex items-center gap-2 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{backgroundColor:teal}}/>
                      <span style={{color:ink}}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{color:muted}}>
                  {p.status==="enrolled"?"Enrolled employees":"Recommended for"}
                </p>
                {p.status==="enrolled"&&p.employees.length>0?(
                  <div className="flex flex-wrap gap-1.5">
                    {p.employees.map(e=>(
                      <Badge key={e} color={violet} backgroundColor={violetBg} className="text-[11px] px-2.5 py-1 rounded-full"> {e} </Badge>
                    ))}
                  </div>
                ):(
                  <div>
                    <p className="text-xs" style={{color:muted}}>Employees with skill gaps in this track:</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {EMPLOYEES.filter(e=>e.gaps.some(g=>p.title.toLowerCase().includes(g.toLowerCase().split(" ")[0]))).map(e=>(
                      <Badge key={e.id} color={muted} backgroundColor={mutedBg} className="text-[11px] px-2.5 py-1 rounded-full"> {e.name} </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Skills this pathway closes */}
            <div className="mt-4 pt-4 border-t" style={{borderColor:border}}>
              <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{color:muted}}>Closes skill gaps</p>
              <div className="flex flex-wrap gap-1.5">
                {WORKFORCE_SKILLS
                  .filter(s=>s.market-s.have>10&&p.title.toLowerCase().split(" ").some(w=>s.skill.toLowerCase().includes(w)))
                  .map(s=>(
                    // <span key={s.skill} className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full"
                    //   style={{backgroundColor:redBg,color:red}}>
                    //   {s.skill} <span style={{color:muted}}>−{s.market-s.have}pts</span>
                    // </span>
                    <Badge key={s.skill} color={red} backgroundColor={redBg} className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full">
                      {s.skill} <span style={{color:muted}}>−{s.market-s.have}pts</span>
                    </Badge>
                  ))
                }
                {p.id==="pw1"&&<span className="text-[11px] px-2.5 py-1 rounded-full" style={{backgroundColor:redBg,color:red}}>Cloud Infrastructure −34pts</span>}
                {p.id==="pw3"&&<span className="text-[11px] px-2.5 py-1 rounded-full" style={{backgroundColor:redBg,color:red}}>Security & Auth −33pts</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
