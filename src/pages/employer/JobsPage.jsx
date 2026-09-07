import { useState } from "react";

import {ink, inkSoft, gold, goldBg, goldBdr, white, muted, border, green, greenBg, amber, teal, tealBg, tealBdr} from "../../styles/colors";
import { XIcon, PlusIcon } from "../../components/icons/icons";
import { COMPANY, JOB_POSTS } from "../../data/employer";

import PageHeader from "../../components/commen/PageHeader";
import {Badge}    from "../../components/commen/Badge";
import {Button}   from "../../components/commen/Button";
import Toast      from "../../components/commen/Toast";


// --------------------------------------------------------------------------------------
export default function JobsPage(){
  const [jobs,setJobs]=useState(JOB_POSTS);
  const [showNew,setShowNew]=useState(false);
  const [form,setForm]=useState({title:"",dept:"Engineering",skills:[],credentials:[],skillInput:"",credInput:""});
  const [toast,setToast]=useState(null);
  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  const addSkill=()=>{if(form.skillInput.trim()){setForm(f=>({...f,skills:[...f.skills,f.skillInput.trim()],skillInput:""}));}};
  const addCred=()=>{if(form.credInput.trim()){setForm(f=>({...f,credentials:[...f.credentials,f.credInput.trim()],credInput:""}));}};
  const publish=()=>{
    setJobs(js=>[...js,{id:`j${Date.now()}`,title:form.title,dept:form.dept,ects:null,skills:form.skills,credentials:form.credentials,applicants:0,status:"active",posted:new Date().toISOString().slice(0,10)}]);
    setShowNew(false);setForm({title:"",dept:"Engineering",skills:[],credentials:[],skillInput:"",credInput:""});
    showToast("Job post published. Eduxcert QI will notify matching candidates.");
  };

  return(
    <div className="space-y-5">
      <PageHeader rootLabel={COMPANY.name} crumb="Job Posts" title="Job Posts"
        subtitle={`${jobs.filter(j=>j.status==="active").length} active · ${jobs.reduce((s,j)=>s+j.applicants,0)} total applicants`}
        action={
          <Button onClick={()=>setShowNew(true)} color={white} backgroundColor={ink}
                  className="text-sm font-semibold px-4 py-2 gap-2">
            <PlusIcon size={13}/> Post a job
          </Button>
        }/>

      <div className="space-y-4">
        {jobs.map(j=>(
          <div key={j.id} className="rounded-xl p-5"
            style={{backgroundColor:white,border:`1px solid ${border}`,opacity:j.status==="closed"?.7:1}}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-sm font-semibold" style={{color:ink}}>{j.title}</h3>
                  <Badge backgroundColor={j.status==="active"?greenBg:"#F1F5F9"} color={j.status==="active"?green:muted}> {j.status==="active"?"Active":"Closed"} </Badge>
                </div>
                <p className="text-xs" style={{color:muted}}>{j.dept} · Posted {j.posted} · {j.applicants} applicants</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {j.status==="active"&&(
                  <Button onClick={()=>{setJobs(js=>js.map(x=>x.id===j.id?{...x,status:"closed"}:x)); showToast("Job closed.");}}
                          color={muted} border={`1px solid ${border}`}
                          className="text-xs font-medium px-3 py-1.5">
                    Close
                  </Button>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{color:muted}}>Required ESCO skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {j.skills.map(s=>
                  <Badge key={s} color={teal} backgroundColor={tealBg} border={`1px solid ${tealBdr}`}
                         className="text-[11px] px-2 py-0.5 rounded-md"> {s} </Badge> )}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{color:muted}}>Required credentials</p>
                <div className="flex flex-wrap gap-1.5">
                  {j.credentials.map(c=>
                  <Badge key={c} color={amber} backgroundColor={goldBg} border={`1px solid ${goldBdr}`}
                         className="text-[11px] px-2 py-0.5 rounded-md"> {c} </Badge>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New job modal */}
      {showNew&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{backgroundColor:"rgba(15,23,41,0.6)",backdropFilter:"blur(3px)"}}>
          <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{backgroundColor:white,maxHeight:"92vh"}}>
            <div className="px-6 py-5 flex items-center justify-between shrink-0"
              style={{backgroundColor:inkSoft}}>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold" style={{color:goldBg}}>New job post</p>
                <h2 className="font-serif text-lg text-white">{form.title||"Untitled role"}</h2>
              </div>
              <Button onClick={()=>setShowNew(false)} className="p-1.5 hover:bg-white/10"> <XIcon color={white}/> </Button>
            </div>
            <div className="overflow-y-auto flex-1 p-6 space-y-5">
              {[{label:"Job title",key:"title",ph:"e.g. Senior Backend Engineer"},{label:"Department",key:"dept",ph:"Engineering"}].map(({label,key,ph})=>(
                <div key={key}>
                  <label className="block text-xs font-medium mb-1.5" style={{color:"#334155"}}>{label}</label>
                  <input value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph}
                    className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none"
                    style={{borderColor:border,color:ink}}
                    onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
                </div>
              ))}
              {[
                {label:"Required ESCO skills",inputKey:"skillInput",listKey:"skills",add:addSkill,ph:"e.g. Distributed Systems",bg:tealBg,color:teal},
                {label:"Required credentials", inputKey:"credInput", listKey:"credentials",add:addCred, ph:"e.g. BSc Computer Science",bg:goldBg,color:amber},
              ].map(({label,inputKey,listKey,add,ph,bg,color})=>(
                <div key={label}>
                  <label className="block text-xs font-medium mb-1.5" style={{color:"#334155"}}>{label}</label>
                  <div className="flex gap-2 mb-2">
                    <input value={form[inputKey]} onChange={e=>setForm(f=>({...f,[inputKey]:e.target.value}))}
                      onKeyDown={e=>e.key==="Enter"&&add()} placeholder={ph}
                      className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
                      style={{borderColor:border,color:ink}}
                      onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
                      <Button onClick={add} color={amber} backgroundColor={goldBg} border={`1px solid ${goldBdr}`}
                              className="text-sm font-medium px-3 py-2">
                        Add
                      </Button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {form[listKey].map(t=>(
                      <span key={t} className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full"
                        style={{backgroundColor:bg,color}}>
                        {t}
                        <Button onClick={()=>setForm(f=>({...f,[listKey]:f[listKey].filter(x=>x!==t)}))}> <XIcon size={10} color={color}/> </Button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 flex gap-3 border-t shrink-0" style={{borderColor:border}}>
              <Button onClick={()=>setShowNew(false)} color={muted} border={`1px solid ${border}`}
                      className="text-sm font-medium flex-1 py-2">
                Cancel
              </Button>
              <Button onClick={publish} color={white} backgroundColor={ink}
                      className="text-sm font-semibold flex-1 py-2">
                Publish job
              </Button>
            </div>
          </div>
        </div>
      )}
      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
