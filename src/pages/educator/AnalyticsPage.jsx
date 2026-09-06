import { useState } from "react";

import { ink, gold, pageColor, white, muted, mutedBg, border, 
         green, greenBg, amber, amberBg, blue, violet, violetBg, red, redBg } from "../../styles/colors";
import { UploadIcon } from "../../components/icons/icons";
import { EDUCATOR, MY_COURSES, GRADES } from "../../data/educator"

import PageHeader    from "../../components/commen/PageHeader";
import {StatusBadge} from "../../components/commen/Badge";
import {Button}      from "../../components/commen/Button";
import StatCard      from "../../components/commen/StatCard";


// --------------------------------------------------------------------------------------
const STATUS_CFG = {
  draft:     {label:"Draft",     color:muted,  bg:mutedBg },
  reviewed:  {label:"Reviewed",  color:amber,  bg:amberBg },
  published: {label:"Published", color:green,  bg:greenBg },
  appealed:  {label:"Appeal",    color:red,    bg:redBg   },
  final:     {label:"Final",     color:violet, bg:violetBg},
};

// --------------------------------------------------------------------------------------
export default function AnalyticsPage() {
  const [selectedCourse, setSelectedCourse] = useState("mc1");

  // Skills heat-map data per course
  const heatmap = [
    {skill:"Distributed Consensus",  score:88, prev:75},
    {skill:"Fault Tolerance",        score:74, prev:70},
    {skill:"Networking Protocols",   score:91, prev:85},
    {skill:"Concurrency Primitives", score:62, prev:58},
    {skill:"System Design",          score:79, prev:72},
    {skill:"CAP Theorem",            score:55, prev:48},
  ];

  const gradeDist = [
    {range:"1-3 (Fail)",  count:3,  pct:9},
    {range:"4-5",         count:5,  pct:15},
    {range:"6-7",         count:11, pct:32},
    {range:"8-9",         count:12, pct:35},
    {range:"10 (Max)",    count:3,  pct:9},
  ];

  return (
    <div className="space-y-6">
      <PageHeader rootLabel={EDUCATOR.name} crumb="Analytics" title="Cohort Analytics"
        subtitle="Grade distribution · skills heat-map · cohort trends"/>

      {/* Course tabs */}
      <div className="flex gap-2 flex-wrap">
        {MY_COURSES.filter(c=>c.status==="active").map(c=>(
          <Button key={c.id} onClick={()=>setSelectedCourse(c.id)} 
                  color={selectedCourse===c.id?white:muted} backgroundColor={selectedCourse===c.id?ink:white} border={`1px solid ${selectedCourse===c.id?ink:border}`}
                  className="text-xs font-semibold px-3 py-2 transition-colors">
            {c.code}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {[
          {label:"Enrolled",    value:"34", sub:"/ 40 capacity"},
          {label:"Pass rate",   value:"82%", sub:"prev. term: 78%", color:green},
          {label:"Average grade",value:"7.4", sub:"median: 7.0"},
          {label:"Attempts",    value:"1.2", sub:"avg per student"},
        ].map(({label,value,sub,color=ink})=>(
          <StatCard key={label} label={label} value={value} sub={sub} color={color}/>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Grade distribution */}
        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <p className="text-xs font-semibold mb-4" style={{color:ink}}>Grade distribution</p>
          <div className="space-y-3">
            {gradeDist.map(d=>(
              <div key={d.range}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span style={{color:muted}}>{d.range}</span>
                  <span className="font-semibold" style={{color:ink}}>{d.count} students ({d.pct}%)</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                  <div className="h-full rounded-full" style={{width:`${d.pct}%`,
                    backgroundColor:d.range.includes("Fail")?red:d.range.includes("10")?green:d.range.includes("8")?green:amber}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills heat-map */}
        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold" style={{color:ink}}>Skills heat-map</p>
            <div className="flex items-center gap-3 text-[10px]" style={{color:muted}}>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{backgroundColor:blue}}/> This term</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{backgroundColor:border}}/> Prev.</span>
            </div>
          </div>
          <div className="space-y-3">
            {heatmap.map(h=>(
              <div key={h.skill}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span style={{color:muted}}>{h.skill}</span>
                  <span className="font-semibold" style={{color:h.score>=80?green:h.score>=60?amber:red}}>{h.score}%</span>
                </div>
                <div className="relative h-2 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                  <div className="absolute h-full rounded-full opacity-40" style={{width:`${h.prev}%`,backgroundColor:blue}}/>
                  <div className="absolute h-full rounded-full" style={{width:`${h.score}%`,backgroundColor:h.score>=80?green:h.score>=60?amber:red,opacity:0.85}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cohort table */}
      <div className="rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{borderColor:border}}>
          <p className="text-xs font-semibold" style={{color:ink}}>Individual results</p>
          <Button color={gold} className="text-xs font-medium gap-1.5">
            <UploadIcon size={12}/> Export CSV
          </Button>
        </div>
        <table className="w-full">
          <thead style={{backgroundColor:pageColor}}>
            <tr>{["Student","Score","Status","Percentile"].map(h=>(
              <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5" style={{color:muted}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {GRADES.sort((a,b)=>b.score-a.score).map((g,i)=>(
              <tr key={g.id} className="border-t" style={{borderColor:border}}>
                <td className="px-4 py-3 text-xs font-medium" style={{color:ink}}>{g.student}</td>
                <td className="px-4 py-3">
                  <span className="text-sm font-bold" style={{color:g.score>=5?ink:red}}>{g.score}/10</span>
                </td>
                <td className="px-4 py-3"> <StatusBadge config={STATUS_CFG} status={g.status} fallbackKey="draft"/> </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium" style={{color:muted}}>
                    Top {Math.round((1-(i/GRADES.length))*100)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}
