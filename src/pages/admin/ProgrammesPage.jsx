import { useState } from "react";

import {ink, goldBg, goldBdr, pageColor, white, muted, border, 
        green, greenBg, amber, amberBg, violet, violetBg} from "../../styles/colors";
import {XIcon, PlusIcon } from "../../components/icons/icons";
import { TENANT, PROGRAMMES } from "../../data/admin";

import PageHeader from "../../components/commen/PageHeader";
import {Badge}    from "../../components/commen/Badge";
import {Button}   from "../../components/commen/Button";
import Toast      from "../../components/commen/Toast";


// --------------------------------------------------------------------------------------
export default function ProgrammesPage(){
  const [programmes, setProgs] = useState(PROGRAMMES);
  const [editing, setEditing]  = useState(null);
  const [toast, setToast]      = useState(null);
  const showToast = (msg,ok=true)=>{ setToast({msg,ok}); setTimeout(()=>setToast(null), 3000); };

  return (
    <div className="space-y-5">
      <PageHeader rootLabel={"Admin Zupan"} crumb="Programmes" title="Programmes & Curricula"
        subtitle={`${TENANT.name} · ${programmes.filter(p=>p.status==="active").length} active`}
        action={
          <Button onClick={()=>showToast("New programme form coming soon.")} color={white} backgroundColor={ink}
                  className="text-sm font-semibold px-4 py-2 gap-2">
            <PlusIcon size={13}/> New Programme
          </Button>
        }/>

      <div className="space-y-3">
        {programmes.map(p=>(
          <div key={p.id} className="rounded-xl overflow-hidden"
            style={{backgroundColor:white,border:`1px solid ${border}`}}>
            <div className="p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0"
                style={{backgroundColor:{BA:goldBg,MA:violetBg,PhD:greenBg}[p.level]||goldBg}}>
                <span className="text-sm font-bold" style={{color:{BA:amber,MA:violet,PhD:green}[p.level]||amber}}>{p.level}</span>
                <span className="text-[9px] font-semibold" style={{color:muted}}>{p.ects}cr</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-[10px] font-mono" style={{color:muted}}>{p.code}</p>
                  <Badge backgroundColor={p.status==="active" ?greenBg:amberBg} color={p.status==="active" ?green:amber}> {p.status==="active"?"Active":"Draft"} </Badge>
                  <Badge backgroundColor={p.accred==="Pending"?amberBg:greenBg} color={p.accred==="Pending"?amber:green}> {p.accred} </Badge>
                </div>
                <h3 className="text-sm font-semibold" style={{color:ink}}>{p.title}</h3>
                <p className="text-[11px] mt-0.5" style={{color:muted}}>
                  {p.students} students enrolled · {p.ects} ECTS · {p.curricula.length} tracks
                </p>
              </div>
              <div className="shrink-0 flex gap-2">
                <Button onClick={()=>setEditing(p.id===editing?null:p.id)} 
                        color={muted} backgroundColor={white} border={`1px solid ${border}`}
                        className="text-xs font-medium px-3 py-1.5">
                  {p.id===editing?"Collapse":"Manage"}
                </Button>
              </div>
            </div>

            {editing===p.id && (
              <div className="border-t px-5 pb-5 pt-4" style={{borderColor:border}}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{color:muted}}>
                  Curriculum tracks
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.curricula.map(c=>(
                    <div key={c} className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                      style={{backgroundColor:pageColor,border:`1px solid ${border}`,color:ink}}>
                      {c}
                      <Button className="opacity-40 hover:opacity-100"> <XIcon size={11}/> </Button>
                    </div>
                  ))}
                  <Button onClick={()=>showToast("Track added.")} 
                          color={amber} backgroundColor={goldBg} border={`1px solid ${goldBdr}`}
                          className="text-xs px-3 py-1.5 gap-1">
                    <PlusIcon size={11}/> Add track
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {label:"Enrolment window", value:"1 Sep – 30 Sep"},
                    {label:"Term calendar",    value:"2 terms / year"},
                    {label:"Credit system",    value:"ECTS"},
                  ].map(({label,value})=>(
                    <div key={label} className="rounded-lg p-3" style={{backgroundColor:pageColor}}>
                      <p className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{color:muted}}>{label}</p>
                      <p className="text-xs font-medium" style={{color:ink}}>{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={()=>{setProgs(ps=>ps.map(x=>x.id===p.id?{...x,status:x.status==="active"?"draft":"active"}:x)); showToast(`Programme ${p.status==="active"?"archived":"activated"}.`);}}
                          color={muted} border={`1px solid ${border}`}
                          className="text-xs font-medium px-3 py-2">
                    {p.status==="active"?"Archive programme":"Activate programme"}
                  </Button>
                  <Button onClick={()=>showToast("Accreditation dossier opened.")}
                          color={white} backgroundColor={ink}
                          className="text-xs font-semibold px-3 py-2">
                    Open accreditation dossier
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
