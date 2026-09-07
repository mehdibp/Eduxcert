import { useState } from "react";

import {ink, pageColor, white, muted, border, green, greenBg, amber, amberBg, blue, blueBg, blueBdr} from "../../styles/colors";
import { CheckIcon } from "../../components/icons/icons";
import { DEGREE_PIPELINE } from "../../data/admin";

import PageHeader from "../../components/commen/PageHeader";
import {Badge}    from "../../components/commen/Badge";
import {Button}   from "../../components/commen/Button";
import Toast      from "../../components/commen/Toast";


// --------------------------------------------------------------------------------------
export default function DegreesPage(){
  const [pipeline,setPipeline] = useState(DEGREE_PIPELINE);
  const [toast,setToast]       = useState(null);
  const showToast = (msg,ok=true)=>{ setToast({msg,ok}); setTimeout(()=>setToast(null), 3000); };

  const award = (id) => {
    setPipeline(p=>p.map(d=>d.id===id?{...d,status:"issued"}:d));
    showToast("Degree awarded! Credential pipeline triggered — VC will be issued within 5 minutes.");
  };

  const counts = {
    pending:  pipeline.filter(d=>d.status==="pending" ).length,
    approved: pipeline.filter(d=>d.status==="approved").length,
    issued:   pipeline.filter(d=>d.status==="issued"  ).length,
  };

  return (
    <div className="space-y-6">
      <PageHeader rootLabel={"Admin Zupan"} crumb="Degree Award" title="Degree Award Pipeline"
        subtitle="approved → award → credential issued automatically"/>

      {/* Pipeline stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {label:"Pending review", value:counts.pending,  color:amber, bg:amberBg},
          {label:"Approved",       value:counts.approved, color:blue,  bg:blueBg},
          {label:"Issued",         value:counts.issued,   color:green, bg:greenBg},
        ].map(({label,value,color,bg})=>(
          <div key={label} className="rounded-xl p-4 text-center" style={{backgroundColor:bg}}>
            <p className="text-2xl font-serif" style={{color}}>{value}</p>
            <p className="text-[11px] font-semibold mt-1" style={{color}}>{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{borderColor:border}}>
          <p className="text-xs font-semibold" style={{color:ink}}>Summer 2025 cohort</p>
          <div className="flex items-center gap-2 text-[11px]" style={{color:muted}}>
            <span className="w-2 h-2 rounded-full" style={{backgroundColor:amber}}/>Pending review requires 2-admin sign-off
          </div>
        </div>
        <table className="w-full">
          <thead style={{backgroundColor:pageColor}}>
            <tr>{["Student","Programme","ECTS","GPA","Status","Action"].map(h=>(
              <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5"
                style={{color:muted}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {pipeline.map(d=>(
              <tr key={d.id} className="border-t" style={{borderColor:border}}>
                <td className="px-4 py-3 text-xs font-semibold" style={{color:ink}}>{d.student}</td>
                <td className="px-4 py-3 text-xs" style={{color:muted}}>{d.programme}</td>
                <td className="px-4 py-3 text-xs font-semibold" style={{color:ink}}>{d.ects}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-bold" style={{color:d.gpa>=8?green:d.gpa>=6?ink:amber}}>{d.gpa}</span>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    label={d.status==="pending"?"Pending review":d.status==="approved"?"Approved":"Issued"}
                    backgroundColor={d.status==="pending"?amberBg:d.status==="approved"?blueBg:greenBg}
                    color={d.status==="pending"?amber:d.status==="approved"?blue:green}/>
                </td>
                <td className="px-4 py-3">
                  {d.status==="approved"
                    ? <Button onClick={()=>award(d.id)} color={white} backgroundColor={green}
                              className="text-xs font-semibold px-3 py-1.5">
                        Award degree
                      </Button>
                    : d.status==="pending"
                    ? <Button  onClick={()=>{setPipeline(p=>p.map(x=>x.id===d.id?{...x,status:"approved"}:x)); showToast("Degree approved — awaiting co-sign.");}} 
                              color={blue} backgroundColor={blueBg} brand={`1px solid ${blueBdr}`}
                              className="text-xs font-semibold px-3 py-1.5">
                        Approve
                      </Button>
                    : <span className="flex items-center gap-1 text-xs font-medium" style={{color:green}}>
                        <CheckIcon size={12}/> VC issued
                      </span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
