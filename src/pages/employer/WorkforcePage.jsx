import { useState } from "react";

import { ink, pageColor, white, muted, border, green, amber, blue, red, redBg, teal, tealBg } from "../../styles/colors";
import { COMPANY, EMPLOYEES, WORKFORCE_SKILLS } from "../../data/employer";

import PageHeader from "../../components/commen/PageHeader";
import {Badge}    from "../../components/commen/Badge";
import StatCard   from "../../components/commen/StatCard";


// --------------------------------------------------------------------------------------
export default function WorkforcePage(){
  const [view, setView] = useState("heatmap");

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
                      {e.skills.map(s=>
                      <Badge key={s} color={teal} backgroundColor={tealBg}
                             className="text-[10px] px-1.5 py-0.5 rounded-md"> {s} </Badge> 
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {e.gaps.map(g=>
                      <Badge key={g} color={red} backgroundColor={redBg}
                             className="text-[10px] px-1.5 py-0.5 rounded-md"> {g} </Badge> 
                      )}
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
