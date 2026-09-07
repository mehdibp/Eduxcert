import { useState, useMemo } from "react";

import { ink, inkSoft, gold, white, muted, mutedBg, border, 
         green, greenBg, amber, amberBg, violet, violetBg, blue, blueBg, red, redBg, teal } from "../../styles/colors";
import { CheckIcon, XIcon, ShieldIcon, SendIcon } from "../../components/icons/icons";
import { COMPANY, CANDIDATES } from "../../data/employer";

import PageHeader    from "../../components/commen/PageHeader";
import {StatusBadge} from "../../components/commen/Badge";
import {Button}      from "../../components/commen/Button";
import ProgressRing  from "../../components/commen/ProgressRing";
import Toast         from "../../components/commen/Toast";


// Candidate status badge ---------------------------------------------------------------
const STATUS_CFG = {
  new:       {label:"New",       color:muted,  bg:mutedBg  },
  screening: {label:"Screening", color:blue,   bg:blueBg   },
  interview: {label:"Interview", color:violet, bg:violetBg },
  offer:     {label:"Offer",     color:green,  bg:greenBg  },
  hired:     {label:"Hired",     color:white,  bg:green    },
  rejected:  {label:"Rejected",  color:muted,  bg:mutedBg  },
};

// Credential validity chip -------------------------------------------------------------
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


// --------------------------------------------------------------------------------------
export default function CandidatesPage(){
  const [candidates, setCandidates] = useState(CANDIDATES);
  const [selected, setSelected]     = useState(null);
  const [filter, setFilter]         = useState("all");
  const [toast, setToast]           = useState(null);
  const showToast = (msg, ok=true) => { setToast({msg,ok}); setTimeout(()=>setToast(null), 3000); };

  const filtered = useMemo(()=>filter==="all"?candidates:candidates.filter(c=>c.stage===filter),[candidates,filter]);

  const advance = (id) => {
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
          <Button key={v} onClick={()=>setFilter(v)} 
                  color={filter===v?white:muted} backgroundColor={filter===v?ink:white} border={`1px solid ${filter===v?ink:border}`}
                  className="text-xs font-semibold px-3 py-2 transition-colors">
            {l}
          </Button>
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
                <ProgressRing earned={c.match} required={100} size={45} dark={selected?.id===c.id}/>
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
              <div className="flex flex-wrap gap-3 pt-4 border-t items-center" style={{borderColor:border}}>
                <StatusBadge config={STATUS_CFG} status={selected.stage} fallbackKey="new"/>
                <div className="flex gap-2 ml-auto flex-wrap">
                  {selected.stage!=="hired"&&selected.stage!=="rejected"&&(
                    <Button onClick={()=>{advance(selected.id);setSelected(s=>({...s,stage:{new:"screening",screening:"interview",interview:"offer",offer:"hired"}[s.stage]||s.stage}));}}
                            color={white} backgroundColor={green} className="text-xs font-semibold px-4 py-2">
                      Advance stage →
                    </Button>
                  )}
                  {selected.stage==="offer"&&(
                    <Button onClick={()=>{showToast("Offer letter sent to candidate.");}}
                            color={white} backgroundColor={teal} className="text-xs font-semibold px-4 py-2 gap-1.5">
                      <SendIcon size={12}/> Send offer
                    </Button>
                  )}
                  
                  <Button onClick={()=>{setCandidates(cs=>cs.map(c=>c.id===selected.id?{...c,stage:"rejected"}:c));setSelected(s=>({...s,stage:"rejected"}));showToast("Candidate rejected.",false);}}
                          color={muted} border={`1px solid ${border}`} className="text-xs font-medium px-4 py-2">
                    Reject
                  </Button>
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
