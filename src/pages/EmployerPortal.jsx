import { useState, useMemo } from "react";
import {ink, inkSoft, gold, goldBg, goldBdr, 
  pageColor, white, muted, mutedBg, border, 
  green, greenBg, amber, amberBg, violet, violetBg, blue, blueBg, red, redBg, rose, roseBg, teal, tealBg} from "../styles/colors";

import {GridIcon, SearchPeopleIcon, BriefcaseIcon, BadgeIcon, ChartIcon, PathIcon, LogoutIcon, 
        CheckIcon, XIcon, PlusIcon, AlertIcon, ShieldIcon, SendIcon, } from "../components/icons/icons"

import Sidebar from "../components/layout/Sidebar"

import {Badge, StatusBadge} from "../components/commen/Badge"
import PageHeader from "../components/commen/PageHeader"
import ProgressRing from "../components/commen/ProgressRing"
import StatCard from "../components/commen/StatCard"
import Toast from "../components/commen/Toast"

import { COMPANY, CANDIDATES, JOB_POSTS, EMPLOYEES, WORKFORCE_SKILLS, PATHWAYS } from "../data/employer"


// ════════════════════════════════════════════════
// SIDEBAR
// ════════════════════════════════════════════════
const NAV_ITEMS = [
  { id:"dashboard",  label:"Dashboard",         Icon:GridIcon       },
  { id:"candidates", label:"Candidates",        Icon:SearchPeopleIcon},
  { id:"jobs",       label:"Job Posts",         Icon:BriefcaseIcon  },
  { id:"issue",      label:"Issue Work-History",Icon:BadgeIcon      },
  { id:"workforce",  label:"Workforce Skills",  Icon:ChartIcon      },
  { id:"pathways",   label:"Upskilling",        Icon:PathIcon       },
];

// Candidate status badge
const STATUS_CFG = {
  new:       {label:"New",       color:muted,  bg:mutedBg  },
  screening: {label:"Screening", color:blue,   bg:blueBg   },
  interview: {label:"Interview", color:violet, bg:violetBg },
  offer:     {label:"Offer",     color:green,  bg:greenBg  },
  hired:     {label:"Hired",     color:white,  bg:green    },
  rejected:  {label:"Rejected",  color:muted,  bg:mutedBg  },
};

// ════════════════════════════════════════════════
// SHARED UI
// ════════════════════════════════════════════════
// Credential validity chip
function CredChip({cred}){
  return(
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px]"
      style={{backgroundColor:cred.valid?greenBg:redBg,border:`1px solid ${cred.valid?"#BBF7D0":"#FECACA"}`}}>
      {cred.valid?<ShieldIcon size={11} color={green}/>:<XIcon size={11} color={red}/>}
      <span className="font-mono" style={{color:cred.valid?green:red}}>{cred.code}</span>
      <span style={{color:muted}}>· {cred.title}</span>
    </div>
  );
}

// ════════════════════════════════════════════════
// DASHBOARD
// ════════════════════════════════════════════════
function DashboardView({onNav}){
  const unverified=CANDIDATES.filter(c=>c.status==="pending").length;
  return(
    <div className="space-y-7">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl" style={{color:ink}}>Good morning, Celtra</h1>
          <p className="text-sm mt-0.5" style={{color:muted}}>{COMPANY.name} · Workforce plan</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
            style={{backgroundColor:greenBg,color:green,border:`1px solid #BBF7D0`}}>
            <ShieldIcon size={12} color={green}/> Trusted issuer · EUDI Org Wallet active
          </div>
        </div>
      </div>

      {unverified>0&&(
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer"
          onClick={()=>onNav("candidates")}
          style={{backgroundColor:amberBg,border:`1px solid #FDE68A`}}>
          <AlertIcon size={16} color={amber}/>
          <p className="text-sm font-medium" style={{color:amber}}>
            <strong>{unverified} candidate{unverified>1?"s":""}</strong> with unverified credentials — review before interview.
          </p>
          <span className="ml-auto text-xs font-semibold shrink-0" style={{color:amber}}>Review →</span>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Candidates" value={CANDIDATES.length} sub="active pipeline" onClick={()=>onNav("candidates")}/>
        <StatCard label="Open roles" value={COMPANY.openRoles} sub="3 active postings"/>
        <StatCard label="Employees"  value={COMPANY.employees} sub="148 total"/>
        <StatCard label="VCs issued" value={EMPLOYEES.filter(e=>e.vcIssued).length} sub="work-history credentials" color={teal}/>
      </div>

      {/* Skill gap alert */}
      <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold" style={{color:ink}}>Workforce skill gaps — top 3</p>
          <button onClick={()=>onNav("workforce")} className="text-xs font-medium" style={{color:gold}}>Full heatmap →</button>
        </div>
        {WORKFORCE_SKILLS.filter(s=>s.market-s.have>15).slice(0,3).map(s=>(
          <div key={s.skill} className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span style={{color:ink}}>{s.skill}</span>
              <span style={{color:red,fontWeight:600}}>−{s.market-s.have} pts vs market</span>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden" style={{backgroundColor:border}}>
              <div className="absolute h-full rounded-full opacity-30" style={{width:`${s.market}%`,backgroundColor:blue}}/>
              <div className="h-full rounded-full" style={{width:`${s.have}%`,backgroundColor:red}}/>
            </div>
          </div>
        ))}
        <button onClick={()=>onNav("pathways")}
          className="mt-3 w-full py-2 rounded-lg text-xs font-semibold text-white"
          style={{backgroundColor:teal}}>
          Browse upskilling pathways →
        </button>
      </div>

      {/* Pipeline summary */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold" style={{color:ink}}>Candidate pipeline</p>
            <button onClick={()=>onNav("candidates")} className="text-xs font-medium" style={{color:gold}}>View all →</button>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[["New",1,muted,"#F1F5F9"],["Screen",1,blue,blueBg],["Interview",1,violet,violetBg],["Offer",1,green,greenBg]].map(([l,n,c,bg])=>(
              <div key={l} className="rounded-xl p-3 text-center" style={{backgroundColor:bg}}>
                <p className="text-xl font-serif" style={{color:c}}>{n}</p>
                <p className="text-[10px] font-semibold mt-0.5" style={{color:c}}>{l}</p>
              </div>
            ))}
          </div>
          {CANDIDATES.slice(0,3).map(c=>(
            <div key={c.id} className="flex items-center gap-3 py-2 border-b last:border-0" style={{borderColor:border}}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{backgroundColor:c.match>=80?green:c.match>=60?gold:amber}}>
                {c.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{color:ink}}>{c.name}</p>
                <p className="text-[11px]" style={{color:muted}}>{c.role}</p>
              </div>
              <StatusBadge config={STATUS_CFG} status={c.stage} fallbackKey="new"/>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold" style={{color:ink}}>Active job posts</p>
            <button onClick={()=>onNav("jobs")} className="text-xs font-medium" style={{color:gold}}>Manage →</button>
          </div>
          {JOB_POSTS.filter(j=>j.status==="active").map(j=>(
            <div key={j.id} className="flex items-center justify-between py-2.5 border-b last:border-0" style={{borderColor:border}}>
              <div>
                <p className="text-xs font-semibold" style={{color:ink}}>{j.title}</p>
                <p className="text-[11px]" style={{color:muted}}>{j.dept} · {j.applicants} applicants</p>
              </div>
              <span className="text-xs font-semibold" style={{color:teal}}>{j.applicants}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// CANDIDATES VIEW
// ════════════════════════════════════════════════
function CandidatesView(){
  const [candidates,setCandidates]=useState(CANDIDATES);
  const [selected,setSelected]=useState(null);
  const [filter,setFilter]=useState("all");
  const [toast,setToast]=useState(null);
  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  const filtered=useMemo(()=>filter==="all"?candidates:candidates.filter(c=>c.stage===filter),[candidates,filter]);

  const advance=(id)=>{
    const order=["new","screening","interview","offer","hired"];
    setCandidates(cs=>cs.map(c=>{
      if(c.id!==id) return c;
      const idx=order.indexOf(c.stage);
      return idx<order.length-1?{...c,stage:order[idx+1]}:c;
    }));
    showToast("Candidate moved to next stage.");
  };

  return(
    <div className="space-y-5">
      <PageHeader rootLabel={COMPANY.name} crumb="Candidates" title="Candidate Pipeline"
        subtitle="Credential verification + skill-match score"/>

      <div className="flex gap-2 flex-wrap">
        {[["all","All"],["new","New"],["screening","Screening"],["interview","Interview"],["offer","Offer"]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)}
            className="px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{backgroundColor:filter===v?ink:white,color:filter===v?white:muted,border:`1px solid ${filter===v?ink:border}`}}>
            {l}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* List */}
        <div className="space-y-3">
          {filtered.map(c=>(
            <button key={c.id} onClick={()=>setSelected(c)}
              className="w-full text-left rounded-xl p-4 transition-all hover:shadow-md"
              style={{backgroundColor:selected?.id===c.id?inkSoft:white,
                border:`2px solid ${selected?.id===c.id?ink:border}`}}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{backgroundColor:c.match>=80?green:c.match>=60?gold:amber}}>
                  {c.name.split(" ").map(n=>n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{color:selected?.id===c.id?white:ink}}>{c.name}</p>
                  <p className="text-[11px] truncate" style={{color:selected?.id===c.id?"#94A3B8":muted}}>{c.role}</p>
                </div>
                <ProgressRing earned={c.match} required={100} size={45} />
              </div>
              <div className="flex items-center justify-between">
                <StatusBadge config={STATUS_CFG} status={c.stage} fallbackKey="new"/>
                <span className="text-[10px]" style={{color:selected?.id===c.id?"#94A3B8":muted}}>
                  {c.status==="verified"
                    ? <span className="flex items-center gap-1" style={{color:green}}><CheckIcon size={11} color={green}/>Verified</span>
                    : <span style={{color:amber}}>⚠ Pending verify</span>}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        {selected?(
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0"
                  style={{backgroundColor:selected.match>=80?green:selected.match>=60?gold:amber}}>
                  {selected.name.split(" ").map(n=>n[0]).join("")}
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-xl" style={{color:ink}}>{selected.name}</h2>
                  <p className="text-sm" style={{color:muted}}>Applying for: {selected.role}</p>
                  <p className="text-[11px] mt-1" style={{color:muted}}>Applied: {selected.applied}</p>
                </div>
                <div className="text-center">
                  <ProgressRing earned={selected.match} required={100} size={60} />
                  <p className="text-[10px] mt-1 font-semibold" style={{color:muted}}>skill match</p>
                </div>
              </div>

              {/* Credentials */}
              <div className="mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{color:muted}}>Verified credentials</p>
                <div className="space-y-2">
                  {selected.credentials.map(cr=><CredChip key={cr.code} cred={cr}/>)}
                </div>
                {selected.status==="pending"&&(
                  <div className="mt-2 p-3 rounded-lg" style={{backgroundColor:amberBg}}>
                    <p className="text-xs font-medium" style={{color:amber}}>⚠ One or more credentials could not be verified. Do not advance until resolved.</p>
                  </div>
                )}
              </div>

              {/* Skill match */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{color:muted}}>Skills confirmed</p>
                  <div className="space-y-1">
                    {selected.skills.map(s=>(
                      <div key={s} className="flex items-center gap-2 text-xs">
                        <CheckIcon size={12} color={green}/><span style={{color:ink}}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{color:muted}}>Skill gaps</p>
                  <div className="space-y-1">
                    {selected.gaps.map(s=>(
                      <div key={s} className="flex items-center gap-2 text-xs">
                        <XIcon size={11} color={amber}/><span style={{color:muted}}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t" style={{borderColor:border}}>
                <StatusBadge config={STATUS_CFG} status={selected.stage} fallbackKey="new"/>
                <div className="flex gap-2 ml-auto flex-wrap">
                  {selected.stage!=="hired"&&selected.stage!=="rejected"&&(
                    <button onClick={()=>{advance(selected.id);setSelected(s=>({...s,stage:{new:"screening",screening:"interview",interview:"offer",offer:"hired"}[s.stage]||s.stage}));}}
                      className="text-xs font-semibold px-4 py-2 rounded-lg text-white"
                      style={{backgroundColor:green}}>
                      Advance stage →
                    </button>
                  )}
                  {selected.stage==="offer"&&(
                    <button onClick={()=>{showToast("Offer letter sent to candidate.");}}
                      className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg text-white"
                      style={{backgroundColor:teal}}>
                      <SendIcon size={12}/> Send offer
                    </button>
                  )}
                  <button onClick={()=>{setCandidates(cs=>cs.map(c=>c.id===selected.id?{...c,stage:"rejected"}:c));setSelected(s=>({...s,stage:"rejected"}));showToast("Candidate rejected.",false);}}
                    className="text-xs font-medium px-4 py-2 rounded-lg border"
                    style={{borderColor:border,color:muted}}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ):(
          <div className="lg:col-span-2 flex items-center justify-center rounded-xl"
            style={{backgroundColor:white,border:`1px solid ${border}`,minHeight:300}}>
            <div className="text-center">
              <p className="text-3xl mb-3">👤</p>
              <p className="text-sm font-medium" style={{color:ink}}>Select a candidate to see details</p>
              <p className="text-xs mt-1" style={{color:muted}}>Credentials, skill-match score, and pipeline actions</p>
            </div>
          </div>
        )}
      </div>
      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// JOB POSTS
// ════════════════════════════════════════════════
function JobsView(){
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
          <button onClick={()=>setShowNew(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{backgroundColor:ink}}>
            <PlusIcon size={13}/> Post a job
          </button>
        }/>

      <div className="space-y-4">
        {jobs.map(j=>(
          <div key={j.id} className="rounded-xl p-5"
            style={{backgroundColor:white,border:`1px solid ${border}`,opacity:j.status==="closed"?.7:1}}>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-sm font-semibold" style={{color:ink}}>{j.title}</h3>
                  <Badge label={j.status==="active"?"Active":"Closed"}
                    bg={j.status==="active"?greenBg:"#F1F5F9"} color={j.status==="active"?green:muted}/>
                </div>
                <p className="text-xs" style={{color:muted}}>{j.dept} · Posted {j.posted} · {j.applicants} applicants</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {j.status==="active"&&(
                  <button onClick={()=>{setJobs(js=>js.map(x=>x.id===j.id?{...x,status:"closed"}:x));showToast("Job closed.");}}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                    style={{borderColor:border,color:muted}}>Close</button>
                )}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{color:muted}}>Required ESCO skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {j.skills.map(s=><span key={s} className="text-[11px] px-2 py-0.5 rounded-md"
                    style={{backgroundColor:tealBg,color:teal,border:`1px solid #99F6E4`}}>{s}</span>)}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{color:muted}}>Required credentials</p>
                <div className="flex flex-wrap gap-1.5">
                  {j.credentials.map(c=><span key={c} className="text-[11px] px-2 py-0.5 rounded-md"
                    style={{backgroundColor:goldBg,color:amber,border:`1px solid ${goldBdr}`}}>{c}</span>)}
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
              <button onClick={()=>setShowNew(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <XIcon color={white}/>
              </button>
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
                    <button onClick={add} className="px-3 py-2 rounded-lg text-sm font-medium"
                      style={{backgroundColor:goldBg,color:amber,border:`1px solid ${goldBdr}`}}>Add</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {form[listKey].map(t=>(
                      <span key={t} className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full"
                        style={{backgroundColor:bg,color}}>
                        {t}
                        <button onClick={()=>setForm(f=>({...f,[listKey]:f[listKey].filter(x=>x!==t)}))}>
                          <XIcon size={10} color={color}/>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 flex gap-3 border-t shrink-0" style={{borderColor:border}}>
              <button onClick={()=>setShowNew(false)} className="flex-1 py-2 rounded-lg border text-sm font-medium"
                style={{borderColor:border,color:muted}}>Cancel</button>
              <button onClick={publish} className="flex-1 py-2 rounded-lg text-sm font-semibold text-white"
                style={{backgroundColor:ink}}>Publish job</button>
            </div>
          </div>
        </div>
      )}
      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// ISSUE WORK-HISTORY VC
// ════════════════════════════════════════════════
function IssueVCView(){
  const [employees,setEmployees]=useState(EMPLOYEES);
  const [selected,setSelected]=useState(null);
  const [form,setForm]=useState({role:"",startDate:"",endDate:"",skills:[]});
  const [toast,setToast]=useState(null);
  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  const issue=(empId)=>{
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
                  ? <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                      style={{backgroundColor:tealBg,color:teal}}>VC issued</span>
                  : <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                      style={{backgroundColor:"#F1F5F9",color:muted}}>Pending</span>}
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
                    <span key={s} className="text-[11px] px-2.5 py-1 rounded-full"
                      style={{backgroundColor:tealBg,color:teal,border:`1px solid #99F6E4`}}>{s}</span>
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
                <button onClick={()=>issue(selected.id)}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{backgroundColor:teal}}>
                  Issue work-history credential →
                </button>
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

// ════════════════════════════════════════════════
// WORKFORCE SKILLS HEATMAP
// ════════════════════════════════════════════════
function WorkforceView(){
  const [view,setView]=useState("heatmap");
  return(
    <div className="space-y-6">
      <PageHeader rootLabel={COMPANY.name} crumb="Workforce Skills" title="Workforce Skills Heatmap"
        subtitle={`${COMPANY.employees} employees · skills vs. market demand`}
        action={
          <div className="flex rounded-xl overflow-hidden border" style={{borderColor:border}}>
            {[["heatmap","Heatmap"],["table","By employee"]].map(([v,l])=>(
              <button key={v} onClick={()=>setView(v)}
                className="px-4 py-2 text-xs font-semibold"
                style={{backgroundColor:view===v?ink:white,color:view===v?white:muted}}>{l}</button>
            ))}
          </div>
        }/>

      {view==="heatmap"&&(
        <div className="space-y-5">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Skills above market" value={WORKFORCE_SKILLS.filter(s=>s.have>=s.market).length}   color={green} />
            <StatCard label="Skills at risk"      value={WORKFORCE_SKILLS.filter(s=>s.market-s.have>15).length} color={red} />
            <StatCard label="Avg coverage"        value={`${Math.round(WORKFORCE_SKILLS.reduce((a,s)=>a+s.have,0)/WORKFORCE_SKILLS.length)}%`}   color={ink} />
            <StatCard label="Market avg"          value={`${Math.round(WORKFORCE_SKILLS.reduce((a,s)=>a+s.market,0)/WORKFORCE_SKILLS.length)}%`} color={muted} />
          </div>

          <div className="rounded-xl p-6" style={{backgroundColor:white,border:`1px solid ${border}`}}>
            <div className="flex items-center gap-4 mb-5 text-[11px]" style={{color:muted}}>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full inline-block" style={{backgroundColor:teal}}/> Your workforce</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full inline-block" style={{backgroundColor:blue,opacity:.4}}/> Market demand</span>
            </div>
            <div className="space-y-5">
              {WORKFORCE_SKILLS.map(s=>{
                const gap=s.market-s.have;
                const status=gap>15?"critical":gap>0?"gap":"ok";
                return(
                  <div key={s.skill}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium" style={{color:ink}}>{s.skill}</span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="font-semibold" style={{color:status==="critical"?red:status==="gap"?amber:green}}>
                          {s.have}%
                        </span>
                        <span style={{color:muted}}>market: {s.market}%</span>
                        {gap>0&&<span className="font-semibold text-[11px]" style={{color:status==="critical"?red:amber}}>
                          −{gap} pts
                        </span>}
                      </div>
                    </div>
                    <div className="relative h-3 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                      <div className="absolute h-full rounded-full opacity-25"
                        style={{width:`${s.market}%`,backgroundColor:blue}}/>
                      <div className="h-full rounded-full"
                        style={{width:`${s.have}%`,
                          backgroundColor:status==="critical"?red:status==="gap"?amber:teal}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {view==="table"&&(
        <div className="rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <table className="w-full">
            <thead style={{backgroundColor:pageColor}}>
              <tr>{["Employee","Dept","Confirmed skills","Gaps","VC"].map(h=>(
                <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider px-4 py-3"
                  style={{color:muted}}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {EMPLOYEES.map(e=>(
                <tr key={e.id} className="border-t" style={{borderColor:border}}>
                  <td className="px-4 py-3 text-xs font-semibold" style={{color:ink}}>{e.name}</td>
                  <td className="px-4 py-3 text-xs" style={{color:muted}}>{e.dept}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {e.skills.map(s=><span key={s} className="text-[10px] px-1.5 py-0.5 rounded-md"
                        style={{backgroundColor:tealBg,color:teal}}>{s}</span>)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {e.gaps.map(g=><span key={g} className="text-[10px] px-1.5 py-0.5 rounded-md"
                        style={{backgroundColor:redBg,color:red}}>{g}</span>)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {e.vcIssued
                      ? <span className="text-[11px] font-semibold" style={{color:teal}}>✓ Issued</span>
                      : <span className="text-[11px]" style={{color:muted}}>Pending</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════
// UPSKILLING PATHWAYS
// ════════════════════════════════════════════════
function PathwaysView(){
  const [pathways,setPathways]=useState(PATHWAYS);
  const [toast,setToast]=useState(null);
  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  const enroll=(id)=>{
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
                  {p.status==="enrolled"&&(
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{backgroundColor:tealBg,color:teal}}>Enrolled</span>
                  )}
                </div>
                <p className="text-xs" style={{color:muted}}>{p.provider} · {p.duration}</p>
              </div>
              {p.status==="available"?(
                <button onClick={()=>enroll(p.id)}
                  className="shrink-0 text-xs font-semibold px-4 py-2 rounded-lg text-white"
                  style={{backgroundColor:teal}}>
                  Enrol team →
                </button>
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
                      <span key={e} className="text-[11px] px-2.5 py-1 rounded-full"
                        style={{backgroundColor:violetBg,color:violet}}>{e}</span>
                    ))}
                  </div>
                ):(
                  <div>
                    <p className="text-xs" style={{color:muted}}>Employees with skill gaps in this track:</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {EMPLOYEES.filter(e=>e.gaps.some(g=>p.title.toLowerCase().includes(g.toLowerCase().split(" ")[0]))).map(e=>(
                        <span key={e.id} className="text-[11px] px-2.5 py-1 rounded-full"
                          style={{backgroundColor:"#F1F5F9",color:muted}}>{e.name}</span>
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
                    <span key={s.skill} className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full"
                      style={{backgroundColor:redBg,color:red}}>
                      {s.skill} <span style={{color:muted}}>−{s.market-s.have}pts</span>
                    </span>
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

// ════════════════════════════════════════════════
// KYC / REGISTRATION (first-run)
// ════════════════════════════════════════════════
function KYCPage({onComplete}){
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({company:"",reg:"",country:"Slovenia",contact:"",email:""});

  const steps=["Company details","Identity verification","EUDI Org Wallet","Confirm"];

  return(
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor:pageColor}}>
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{border:`1.5px solid ${gold}`}}>
              <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor:gold}}/>
            </div>
            <span className="font-serif text-xl tracking-wide" style={{color:ink}}>Eduxcert</span>
          </div>
          <h1 className="font-serif text-2xl mb-1" style={{color:ink}}>Register as trusted issuer</h1>
          <p className="text-sm" style={{color:muted}}>Employer onboarding · KYC + EUDI Org Wallet</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center mb-8">
          {steps.map((s,i)=>(
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{backgroundColor:i+1<step?green:i+1===step?ink:border,
                    color:i+1<=step?white:muted}}>
                  {i+1<step?<CheckIcon size={14} color={white}/>:i+1}
                </div>
                <p className="text-[10px] mt-1 text-center w-16 leading-tight" style={{color:i+1===step?ink:muted}}>{s}</p>
              </div>
              {i<steps.length-1&&<div className="flex-1 h-px mx-1 mb-4"
                style={{backgroundColor:i+1<step?green:border}}/>}
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-7 space-y-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          {step===1&&<>
            <h3 className="font-serif text-lg" style={{color:ink}}>Company details</h3>
            {[{l:"Company name",k:"company",ph:"e.g. Celtra Technologies d.o.o."},{l:"Company registration no.",k:"reg",ph:"e.g. 1234567000"},{l:"Contact name",k:"contact",ph:"HR Manager"},{l:"Contact email",k:"email",ph:"hr@company.com"}].map(({l,k,ph})=>(
              <div key={k}>
                <label className="block text-xs font-medium mb-1.5" style={{color:"#334155"}}>{l}</label>
                <input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={ph}
                  className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none"
                  style={{borderColor:border,color:ink}}
                  onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
              </div>
            ))}
          </>}

          {step===2&&<>
            <h3 className="font-serif text-lg" style={{color:ink}}>Identity verification</h3>
            <p className="text-sm" style={{color:muted}}>Upload company registration certificate and VAT number for KYC.</p>
            {[["Company registration certificate","PDF / image"],["VAT certificate","PDF / image"],["Authorised signatory ID","Passport or ID card"]].map(([l,f])=>(
              <div key={l} className="flex items-center justify-between p-4 rounded-xl"
                style={{backgroundColor:pageColor,border:`1px solid ${border}`}}>
                <div>
                  <p className="text-xs font-semibold" style={{color:ink}}>{l}</p>
                  <p className="text-[11px]" style={{color:muted}}>{f}</p>
                </div>
                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{backgroundColor:goldBg,color:amber,border:`1px solid ${goldBdr}`}}>Upload</button>
              </div>
            ))}
          </>}

          {step===3&&<>
            <h3 className="font-serif text-lg" style={{color:ink}}>EUDI Organisation Wallet</h3>
            <p className="text-sm" style={{color:muted}}>Connect your EU Digital Identity Organisation Wallet to become a trusted issuer on EBSI.</p>
            <div className="rounded-xl p-4" style={{backgroundColor:blueBg,border:`1px solid #BFDBFE`}}>
              <p className="text-xs font-semibold mb-1" style={{color:blue}}>What this means</p>
              <p className="text-[11px] leading-relaxed" style={{color:blue}}>
                Your company DID will be registered in the EBSI Trusted Issuers Registry.
                Work-history credentials you issue will carry Ed25519 cryptographic signatures verifiable by anyone, anywhere.
              </p>
            </div>
            <button className="w-full py-3 rounded-xl text-sm font-semibold"
              style={{backgroundColor:violetBg,color:violet,border:`1px solid #C4B5FD`}}>
              Connect via eIDAS 2.0 Org Wallet →
            </button>
          </>}

          {step===4&&<>
            <h3 className="font-serif text-lg" style={{color:ink}}>You're all set!</h3>
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{backgroundColor:greenBg}}>
              <ShieldIcon size={20} color={green}/>
              <div>
                <p className="text-xs font-semibold" style={{color:green}}>Trust status: Active</p>
                <p className="text-[11px]" style={{color:green}}>DID registered in EBSI TIR · KYC approved</p>
              </div>
            </div>
            {[["Company","Celtra Technologies d.o.o."],["DID","did:ebsi:celtra-tech-2024-01"],["KYC date","2024-11-03"],["Plan","Workforce"]].map(([k,v])=>(
              <div key={k} className="flex justify-between py-2 border-b last:border-0 text-xs" style={{borderColor:border}}>
                <span style={{color:muted}}>{k}</span><span className="font-semibold" style={{color:ink}}>{v}</span>
              </div>
            ))}
          </>}

          <button onClick={()=>step<4?setStep(s=>s+1):onComplete()}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{backgroundColor:ink}}>
            {step<4?"Continue →":"Enter Employer Portal"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// ROOT
// ════════════════════════════════════════════════
export default function EmployerPortal(){
  const [nav,setNav]              = useState("dashboard");
  const [collapsed,setCollapsed]  = useState(false);
  const [registered,setRegistered]= useState(false);
  const [loggedIn,setLoggedIn]    = useState(false);

  if(!loggedIn){
    return(
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor:pageColor}}>
        <div className="rounded-2xl p-10 text-center w-full max-w-sm"
          style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{border:`1.5px solid ${gold}`}}>
            <div className="w-3 h-3 rounded-full" style={{backgroundColor:gold}}/>
          </div>
          <h1 className="font-serif text-xl mb-1" style={{color:ink}}>Eduxcert</h1>
          <p className="text-sm mb-6" style={{color:muted}}>Employer Portal</p>
          <button onClick={()=>setLoggedIn(true)}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white mb-3"
            style={{backgroundColor:ink}}>
            Sign in with company SSO
          </button>
          <button onClick={()=>{setLoggedIn(true);setRegistered(false);}}
            className="w-full py-2.5 rounded-lg text-sm font-medium border"
            style={{borderColor:border,color:muted}}>
            Register as new employer
          </button>
        </div>
      </div>
    );
  }

  if(!registered) return <KYCPage onComplete={()=>setRegistered(true)}/>;

  const views={
    dashboard:  <DashboardView  onNav={setNav}/>,
    candidates: <CandidatesView/>,
    jobs:       <JobsView/>,
    issue:      <IssueVCView/>,
    workforce:  <WorkforceView/>,
    pathways:   <PathwaysView/>,
  };

  return(
    <div className="flex h-screen" style={{backgroundColor:pageColor}}>

      <Sidebar
        subtitle="Employer Portal"
        navItems={NAV_ITEMS}
        active={nav}
        onNav={setNav}
        collapsed={collapsed}
        onToggle={() => setCollapsed((b) => !b)}
        onLogout={() => { setLoggedIn(false); setRegistered(false); }}
        user={{ initials: "CT", name: "Celtra Tech", sub: `${COMPANY.tier} plan`, color: "#0D9488" }}
      />

      <main className="flex-1 overflow-auto p-6 lg:p-8" style={{minWidth:0}}>
        {views[nav]}
      </main>
    </div>
  );
}
