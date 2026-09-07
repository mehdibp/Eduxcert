import { ink, gold, white, muted, mutedBg, border, 
        green, greenBg, amber, amberBg, violet, violetBg, blue, blueBg, red, teal } from "../../styles/colors";
import { AlertIcon, ShieldIcon } from "../../components/icons/icons";
import { COMPANY, CANDIDATES, JOB_POSTS, EMPLOYEES, WORKFORCE_SKILLS } from "../../data/employer";

import {StatusBadge} from "../../components/commen/Badge";
import {Button}      from "../../components/commen/Button";
import StatCard      from "../../components/commen/StatCard";


// Candidate status badge ---------------------------------------------------------------
const STATUS_CFG = {
  new:       {label:"New",       color:muted,  bg:mutedBg  },
  screening: {label:"Screening", color:blue,   bg:blueBg   },
  interview: {label:"Interview", color:violet, bg:violetBg },
  offer:     {label:"Offer",     color:green,  bg:greenBg  },
  hired:     {label:"Hired",     color:white,  bg:green    },
  rejected:  {label:"Rejected",  color:muted,  bg:mutedBg  },
};

// --------------------------------------------------------------------------------------
export default function DashboardPage({onNav}){
  const unverified = CANDIDATES.filter(c=>c.status==="pending").length;

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
          <Button onClick={()=>onNav("workforce")} color={gold} className="text-xs font-medium"> Full heatmap → </Button>
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
        <Button onClick={()=>onNav("pathways")} color={white} backgroundColor={teal}
                className="text-xs font-semibold mt-3 w-full py-2">
          Browse upskilling pathways →
        </Button>
      </div>

      {/* Pipeline summary */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold" style={{color:ink}}>Candidate pipeline</p>
            <Button onClick={()=>onNav("candidates")} color={gold} className="text-xs font-medium"> View all → </Button>
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
            <Button onClick={()=>onNav("jobs")} color={gold} className="text-xs font-medium"> Manage → </Button>
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
