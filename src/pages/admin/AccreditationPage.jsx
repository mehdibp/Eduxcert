import { useState } from "react";

import {ink, inkSoft, gold, goldBg, pageColor, white, muted, border, green, greenBg, amber, red } from "../../styles/colors";
import { CheckIcon, XIcon, UploadIcon } from "../../components/icons/icons";
import { ACCRED_STEPS } from "../../data/admin";

import PageHeader   from "../../components/commen/PageHeader";
import {Button}     from "../../components/commen/Button";
import ProgressRing from "../../components/commen/ProgressRing";
import QualityBadge from "../../components/commen/QualityBadge";
import Toast        from "../../components/commen/Toast";


export default function AccreditationPage(){
  const [steps,setSteps]          = useState(ACCRED_STEPS);
  const [activeStep,setActiveStep]= useState("s3");
  const [toast,setToast]          = useState(null);
  const showToast = (msg, ok=true) => { setToast({msg,ok}); setTimeout(() => setToast(null), 3000); };

  const doneCount=steps.filter(s=>s.status==="done").length;
  const pct=Math.round(doneCount/steps.length*100);

  const uploadDoc=()=>{
    setSteps(ss=>ss.map(s=>s.id==="s3"?{...s,pct:Math.min(100,s.pct+18)}:s));
    showToast("Document uploaded and mapped to dossier.");
  };
  const completeStep=(id)=>{
    const idx=steps.findIndex(s=>s.id===id);
    setSteps(ss=>ss.map((s,i)=>
      s.id===id?{...s,status:"done",pct:100}:
      i===idx+1?{...s,status:"active"}:s
    ));
    showToast("Step completed — next step unlocked.");
  };

  const GAP_DOCS=[
    {name: "External examiner report 2024",   uploaded: true},
    {name: "Student satisfaction survey",     uploaded: true},
    {name: "Research output register",        uploaded: true},
    {name: "Internationalisation strategy",   uploaded: false},
    {name: "Staff development plan",          uploaded: false},
    {name: "Industry advisory board minutes", uploaded: false},
    {name: "Financial sustainability report", uploaded: false},
  ];

  return (
    <div className="space-y-6">
      <PageHeader rootLabel={"Admin Zupan"} crumb="Accreditation" title="Accreditation Dossier"
        subtitle="MSc Computer Science · ABET 2027 cycle"
        action={ <QualityBadge> QI · Quality Intelligence  </QualityBadge> }/>

      {/* Overall */}
      <div className="rounded-xl p-5 flex items-center gap-6"
        style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <ProgressRing earned={pct} required={100} size={80}/>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{color:ink}}>Dossier completion</p>
          <p className="text-[11px] mt-0.5" style={{color:muted}}>{doneCount} of {steps.length} phases complete</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              {l:"Institution score", v:"87/100", c:green},
              {l:"Evidence mapped",   v:"82%",    c:gold},
              {l:"Gaps remaining",    v:"4 docs",  c:amber},
            ].map(({l,v,c})=>(
              <div key={l} className="text-xs">
                <span style={{color:muted}}>{l}: </span>
                <span className="font-semibold" style={{color:c}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={()=>showToast("Dossier preview generated.")} 
                color={ink} border={`1px solid ${border}`}
                className="text-xs font-semibold px-4 py-2.5">
          Preview PDF
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Step pipeline */}
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{color:muted}}>Phases</p>
          {steps.map(s=>(
            <button key={s.id} onClick={()=>setActiveStep(s.id)}
              className="w-full text-left rounded-xl p-4 transition-all"
              style={{backgroundColor:activeStep===s.id?inkSoft:white,
                border:`2px solid ${activeStep===s.id?ink:border}`,
                boxShadow:activeStep===s.id?"0 4px 16px -4px rgba(15,23,41,0.3)":"none"}}>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{backgroundColor:s.status==="done"?greenBg:s.status==="active"?goldBg:pageColor,
                    border:`1.5px solid ${s.status==="done"?green:s.status==="active"?gold:border}`}}>
                  {s.status==="done"&&<CheckIcon size={10} color={green}/>}
                  {s.status==="active"&&<div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:gold}}/>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate"
                    style={{color:activeStep===s.id?white:s.status==="pending"?muted:ink}}>
                    {s.label}
                  </p>
                  {s.status==="active"&&(
                    <div className="h-1 rounded-full mt-1.5 overflow-hidden" style={{backgroundColor:"rgba(255,255,255,0.15)"}}>
                      <div className="h-full rounded-full" style={{width:`${s.pct}%`,backgroundColor:gold}}/>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active step detail */}
        <div className="lg:col-span-2 space-y-5">
          {(()=>{
            const s=steps.find(x=>x.id===activeStep);
            if(!s) return null;
            return (
              <div className="rounded-xl p-6" style={{backgroundColor:white,border:`1px solid ${border}`}}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-semibold mb-1"
                      style={{color:s.status==="done"?green:s.status==="active"?amber:muted}}>
                      {s.status==="done"?"Completed":s.status==="active"?"In progress":"Locked"}
                    </p>
                    <h3 className="font-serif text-lg" style={{color:ink}}>{s.label}</h3>
                    <p className="text-xs mt-1" style={{color:muted}}>{s.detail}</p>
                  </div>
                  {s.status==="done"&&(
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{backgroundColor:greenBg}}>
                      <CheckIcon size={18} color={green}/>
                    </div>
                  )}
                </div>

                {/* Gap docs upload (step s3) */}
                {s.id==="s3"&&s.status==="active"&&(
                  <>
                    <div className="space-y-2 mb-5">
                      {GAP_DOCS.map(d=>(
                        <div key={d.name}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                          style={{backgroundColor:d.uploaded?greenBg:pageColor,border:`1px solid ${d.uploaded?"#BBF7D0":border}`}}>
                          {d.uploaded
                            ? <CheckIcon size={13} color={green}/>
                            : <div className="w-3 h-3 rounded-sm" style={{border:`1.5px solid ${border}`}}/>}
                          <span className="text-xs flex-1" style={{color:d.uploaded?green:ink}}>{d.name}</span>
                          {!d.uploaded&&(
                            <button onClick={uploadDoc}
                              className="flex items-center gap-1 text-[11px] font-semibold"
                              style={{color:gold}}>
                              <UploadIcon size={12}/> Upload
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <Button onClick={()=>completeStep("s3")} color={white} backgroundColor={ink}
                            className="text-sm font-semibold w-full py-2.5 rounded-xl!">
                      Mark step complete → Preview dossier
                    </Button>
                  </>
                )}

                {/* Other active step actions */}
                {s.id!=="s3"&&s.status==="active"&&(
                  <Button onClick={()=>completeStep(s.id)} color={white} backgroundColor={ink}
                          className="text-sm font-semibold w-full py-2.5 rounded-xl!">
                    Complete this step →
                  </Button>
                )}

                {/* Submit step */}
                {s.id==="s6"&&s.status==="done"&&(
                  <div className="mt-4 p-4 rounded-xl" style={{backgroundColor:greenBg}}>
                    <p className="text-xs font-semibold" style={{color:green}}>✅ Submitted to DEQAR</p>
                    <p className="text-[11px] mt-1" style={{color:green}}>Signed PDF + JSON QR + full audit trail sent on 2025-06-01.</p>
                  </div>
                )}

                {s.status==="pending"&&(
                  <div className="mt-4 p-4 rounded-xl" style={{backgroundColor:pageColor}}>
                    <p className="text-xs" style={{color:muted}}>Complete previous steps to unlock this phase.</p>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Explainability per claim */}
          <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
            <p className="text-xs font-semibold mb-3" style={{color:ink}}>Evidence mapping — QI auto-map</p>
            {[
              {claim:"Pass rate ≥ 80%",             evidence:"cohort_stats table · Spring 2025",           ok:true},
              {claim:"External examiner report",     evidence:"Uploaded 2024-11-10",                        ok:true},
              {claim:"Student satisfaction ≥ 75%",  evidence:"Survey 2024 · Score: 81%",                   ok:true},
              {claim:"Internationalisation strategy",evidence:"Document missing — upload required",          ok:false},
              {claim:"Staff development plan",       evidence:"Document missing — upload required",          ok:false},
            ].map(c=>(
              <div key={c.claim} className="flex items-start gap-3 py-2 border-b last:border-0"
                style={{borderColor:border}}>
                {c.ok?<CheckIcon size={13}/>:<XIcon size={13} color={red}/>}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium" style={{color:ink}}>{c.claim}</p>
                  <p className="text-[11px] mt-0.5" style={{color:c.ok?muted:red}}>{c.evidence}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
