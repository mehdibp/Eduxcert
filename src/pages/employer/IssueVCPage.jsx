import { useState } from "react";

import {ink, inkSoft, gold, goldBg, goldBdr, white, muted, mutedBg, border, amber, teal, tealBg, tealBdr} from "../../styles/colors";
import { CheckIcon, ShieldIcon } from "../../components/icons/icons";
import { COMPANY, EMPLOYEES } from "../../data/employer";

import PageHeader from "../../components/commen/PageHeader";
import {Badge}    from "../../components/commen/Badge";
import {Button}   from "../../components/commen/Button";
import Toast      from "../../components/commen/Toast";


// --------------------------------------------------------------------------------------
export default function IssueVCPage(){
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [selected, setSelected]   = useState(null);
  const [form, setForm]           = useState({role:"", startDate:"", endDate:"", skills:[]});
  const [toast, setToast]         = useState(null);
  const showToast = (msg, ok=true)=>{ setToast({msg,ok}); setTimeout(()=>setToast(null), 3000); };

  const issue = (empId)=>{
    setEmployees(es=>es.map(e=>e.id===empId?{...e,vcIssued:true}:e));
    setSelected(null);
    showToast("Work-history credential issued → pushed to employee's EUDI Wallet.");
  };

  return(
    <div className="space-y-5">
      <PageHeader rootLabel={COMPANY.name} crumb="Issue Work-History" title="Issue Work-History Credentials"
        subtitle={`Celtra Technologies as trusted issuer · DID: ${COMPANY.did.slice(0,28)}…`}/>

      <div className="rounded-xl p-4 flex items-start gap-3"
        style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
        <ShieldIcon size={16} color={gold}/>
        <p className="text-xs" style={{color:amber}}>
          Celtra Technologies is registered as a <strong>Trusted Issuer</strong> in the EBSI registry.
          Credentials you issue carry the same cryptographic weight as academic credentials — verifiable by any employer, platform, or authority worldwide.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Employee list */}
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest" style={{color:muted}}>Employees</p>
          {employees.map(e=>(
            <button key={e.id} onClick={()=>{setSelected(e);setForm({role:e.role,startDate:e.start,endDate:"",skills:e.skills});}}
              className="w-full text-left rounded-xl p-4 transition-all"
              style={{backgroundColor:selected?.id===e.id?inkSoft:white,
                border:`2px solid ${selected?.id===e.id?ink:border}`}}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                  style={{backgroundColor:e.vcIssued?teal:muted}}>
                  {e.name.split(" ").map(n=>n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{color:selected?.id===e.id?white:ink}}>{e.name}</p>
                  <p className="text-[11px] truncate" style={{color:selected?.id===e.id?"#94A3B8":muted}}>{e.dept} · {e.role}</p>
                </div>
                {e.vcIssued
                  ? <Badge color={teal}  backgroundColor={tealBg}> VC issued </Badge>
                  : <Badge color={muted} backgroundColor={mutedBg}> Pending  </Badge> }
                    
              </div>
            </button>
          ))}
        </div>

        {/* Credential form */}
        {selected?(
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-xl p-6 space-y-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{color:muted}}>Issuing credential for</p>
                <h3 className="font-serif text-lg" style={{color:ink}}>{selected.name}</h3>
                <p className="text-xs" style={{color:muted}}>{selected.dept} · {COMPANY.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {label:"Role / position",key:"role",   type:"text", ph:"e.g. Senior Backend Engineer"},
                  {label:"Department",     key:"dept",   type:"text", ph:"Engineering"},
                  {label:"Start date",     key:"startDate",type:"date",ph:""},
                  {label:"End date (leave blank if current)",key:"endDate",type:"date",ph:""},
                ].map(({label,key,type,ph})=>(
                  <div key={key}>
                    <label className="block text-[10px] font-medium mb-1" style={{color:muted}}>{label}</label>
                    <input type={type} value={form[key]||""} placeholder={ph}
                      onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                      className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                      style={{borderColor:border,color:ink}}
                      onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[10px] font-medium mb-2" style={{color:muted}}>Skills attested (ESCO)</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.skills.map(s=>(
                    <Badge key={s} color={teal} backgroundColor={tealBg} border={`1px solid ${tealBdr}`}
                         className="text-[11px] px-2.5 py-1 rounded-full"> {s} </Badge>
                  ))}
                </div>
              </div>

              {/* VC preview card */}
              <div className="rounded-xl p-4" style={{backgroundColor:inkSoft}}>
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{color:gold}}>Credential preview</p>
                <div className="space-y-1.5 text-xs">
                  {[
                    ["Type",    "Work-History Verifiable Credential"],
                    ["Subject", selected.name],
                    ["Issuer",  COMPANY.name],
                    ["Role",    form.role||selected.role],
                    ["Period",  `${form.startDate||selected.start} → ${form.endDate||"Present"}`],
                    ["Algorithm","Ed25519"],
                    ["Issued to","Employee EUDI Wallet"],
                  ].map(([k,v])=>(
                    <div key={k} className="flex justify-between gap-4">
                      <span style={{color:"#94A3B8"}}>{k}</span>
                      <span className="text-right" style={{color:white}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selected.vcIssued?(
                <div className="flex items-center gap-2 p-3 rounded-xl" style={{backgroundColor:tealBg}}>
                  <CheckIcon size={14} color={teal}/><p className="text-xs font-medium" style={{color:teal}}>Credential already issued — employee can share it from their EUDI Wallet.</p>
                </div>
              ):(
                <Button onClick={()=>issue(selected.id)} color={white} backgroundColor={teal}
                        className="text-sm font-semibold py-2.5 rounded-xl! w-full">
                  Issue work-history credential →
                </Button>
              )}
            </div>
          </div>
        ):(
          <div className="lg:col-span-2 flex items-center justify-center rounded-xl"
            style={{backgroundColor:white,border:`1px solid ${border}`,minHeight:300}}>
            <div className="text-center">
              <p className="text-3xl mb-3">🏅</p>
              <p className="text-sm font-medium" style={{color:ink}}>Select an employee</p>
              <p className="text-xs mt-1" style={{color:muted}}>Configure and issue their work-history credential</p>
            </div>
          </div>
        )}
      </div>
      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
