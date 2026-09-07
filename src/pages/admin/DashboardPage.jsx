import { ink, gold, goldBg, pageColor, white, muted, border, 
         green, greenBg, amber, amberBg, violet, violetBg, violetBdr, blue } from "../../styles/colors";
import { AlertIcon, CheckIcon } from "../../components/icons/icons";
import { TENANT, PROGRAMMES, DEGREE_PIPELINE, ACCRED_STEPS, QI_BENCHMARKS } from "../../data/admin";

import {Badge}      from "../../components/commen/Badge";
import StatCard     from "../../components/commen/StatCard";
import QualityBadge from "../../components/commen/QualityBadge";


// --------------------------------------------------------------------------------------
export default function DashboardPage({onNav}){
  const pendingDeg = DEGREE_PIPELINE.filter(d=>d.status==="pending").length;

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl" style={{color:ink}}>Good morning, Admin</h1>
          <p className="text-sm mt-0.5" style={{color:muted}}>{TENANT.name} · Academic Year 2024/25</p>
        </div>
        <div className="flex items-center gap-2">
          <QualityBadge> QI · Quality Intelligence  </QualityBadge>
          <Badge color={violet} backgroundColor={violetBg} border={`1px solid ${violetBdr}`}
                 className="text-xs font-medium px-3 py-1.5 rounded-full"> {TENANT.tier} plan </Badge>
        </div>
      </div>

      {pendingDeg>0 && (
        <div onClick={()=>onNav("degrees")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer"
          style={{backgroundColor:amberBg,border:`1px solid #FDE68A`}}>
          <AlertIcon size={16} color={amber}/>
          <p className="text-sm font-medium" style={{color:amber}}>
            <strong>{pendingDeg} degree award{pendingDeg>1?"s":""}</strong> pending final sign-off.
          </p>
          <span className="ml-auto text-xs font-semibold" style={{color:amber}}>Review →</span>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Students" value={TENANT.students.toLocaleString()} sub="enrolled" onClick={()=>onNav("users")}/>
        <StatCard label="Educators" value={TENANT.educators} sub="active staff" onClick={()=>onNav("users")}/>
        <StatCard label="Credentials issued" value={TENANT.credentials.toLocaleString()} sub="all-time" color={green}/>
        <StatCard label="Institution pass rate" value={`${TENANT.passRate}%`} sub="Spring 2025" color={green}/>
      </div>

      {/* QI benchmarks */}
      <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <div className="flex items-center gap-3 mb-5">
          <p className="text-xs font-semibold" style={{color:ink}}>QI Benchmarks — vs. peer institutions</p>
          <QualityBadge> QI · Quality Intelligence  </QualityBadge>
        </div>
        <div className="space-y-4">
          {QI_BENCHMARKS.map(b=>{
            const better = b.metric==="Time-to-degree" ? b.value<b.peer : b.value>b.peer;
            const pctYou  = Math.min(100, b.metric==="Time-to-degree"?100-(b.value/48*100):(b.value/10)*10||b.value);
            const pctPeer = Math.min(100, b.metric==="Time-to-degree"?100-(b.peer/48*100):(b.peer/10)*10||b.peer);
            return (
              <div key={b.metric}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs" style={{color:muted}}>{b.metric}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-semibold" style={{color:better?green:amber}}>
                      You: {b.value}{b.unit}
                    </span>
                    <span style={{color:muted}}>Peers: {b.peer}{b.unit}</span>
                  </div>
                </div>
                <div className="relative h-2 rounded-full" style={{backgroundColor:border}}>
                  <div className="absolute h-full rounded-full opacity-30"
                    style={{width:`${pctPeer}%`,backgroundColor:blue}}/>
                  <div className="absolute h-full rounded-full"
                    style={{width:`${pctYou}%`,backgroundColor:better?green:amber}}/>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] mt-4" style={{color:muted}}>
          Peer group: 47 European HEIs of comparable size · Data: EURES/QI service · Updated daily.
        </p>
      </div>

      {/* Programmes + Accreditation status */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold" style={{color:ink}}>Active programmes</p>
            <button onClick={()=>onNav("programmes")} className="text-xs font-medium" style={{color:gold}}>Manage →</button>
          </div>
          <div className="space-y-3">
            {PROGRAMMES.filter(p=>p.status==="active").slice(0,3).map(p=>(
              <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0"
                style={{borderColor:border}}>
                <div>
                  <p className="text-xs font-semibold" style={{color:ink}}>{p.title}</p>
                  <p className="text-[11px]" style={{color:muted}}>{p.students} students · {p.ects} ECTS</p>
                </div>
                <Badge backgroundColor={p.accred==="Pending"?amberBg:greenBg} color={p.accred==="Pending"?amber:green}> {p.accred} </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold" style={{color:ink}}>Accreditation dossier</p>
            <button onClick={()=>onNav("accred")} className="text-xs font-medium" style={{color:gold}}>Open →</button>
          </div>
          <div className="space-y-2.5">
            {ACCRED_STEPS.map(s=>(
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{backgroundColor:s.status==="done"?greenBg:s.status==="active"?goldBg:pageColor,
                    border:`1.5px solid ${s.status==="done"?green:s.status==="active"?gold:border}`}}>
                  {s.status==="done"
                    ? <CheckIcon size={10} color={green}/>
                    : s.status==="active"
                    ? <div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:gold}}/>
                    : null}
                </div>
                <p className="text-xs flex-1" style={{color:s.status==="pending"?muted:ink}}>{s.label}</p>
                {s.status==="active" && <span className="text-[10px] font-semibold" style={{color:gold}}>{s.pct}%</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}
