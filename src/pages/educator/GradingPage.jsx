import { useState, useMemo } from "react";

import { ink, gold, goldBg, pageColor, white, muted, mutedBg, border, 
         green, greenBg, amber, amberBg, violet, violetBg, red, redBg } from "../../styles/colors";
import { AlertIcon, CheckIcon, EditIcon, UploadIcon, XIcon } from "../../components/icons/icons";
import { EDUCATOR, MY_COURSES, GRADES } from "../../data/educator";

import PageHeader      from "../../components/commen/PageHeader";
import { StatusBadge } from "../../components/commen/Badge"
import { Button }      from "../../components/commen/Button"
import Toast           from "../../components/commen/Toast";


// --------------------------------------------------------------------------------------
const STATUS_CFG = {
  draft:     {label:"Draft",     color:muted,  bg:mutedBg },
  reviewed:  {label:"Reviewed",  color:amber,  bg:amberBg },
  published: {label:"Published", color:green,  bg:greenBg },
  appealed:  {label:"Appeal",    color:red,    bg:redBg   },
  final:     {label:"Final",     color:violet, bg:violetBg},
};

// --------------------------------------------------------------------------------------
export default function GradingPage() {
  const [grades, setGrades] = useState(GRADES);
  const [selectedCourse, setSelectedCourse] = useState("mc1");
  const [editingGrade, setEditingGrade] = useState(null);
  const [appealModal, setAppealModal] = useState(null);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);

  const showToast = (msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  const course = MY_COURSES.find(c=>c.id===selectedCourse);
  const filtered = useMemo(()=>
    filter==="all" ? grades : grades.filter(g=>g.status===filter),
    [grades, filter]
  );

  const counts = {
    draft:     grades.filter(g=>g.status==="draft").length,
    reviewed:  grades.filter(g=>g.status==="reviewed").length,
    published: grades.filter(g=>g.status==="published").length,
    appealed:  grades.filter(g=>g.status==="appealed").length,
    final:     grades.filter(g=>g.status==="final").length,
  };

  const promoteAll = (from, to) => {
    setGrades(gs=>gs.map(g=>g.status===from?{...g,status:to}:g));
    showToast(`All ${from} grades moved to ${to}.`);
  };
  const publishAll = () => {
    setGrades(gs=>gs.map(g=>g.status==="reviewed"?{...g,status:"published"}:g));
    showToast("Grades published! Students have been notified.");
  };
  const resolveAppeal = (id, newScore, decision) => {
    setGrades(gs=>gs.map(g=>g.id===id?{...g,status:"final",score:newScore,appeal:null}:g));
    setAppealModal(null);
    showToast(`Appeal resolved — grade ${decision}.`);
  };

  // Grade distribution bar
  const dist = [0,1,2,3,4,5,6,7,8,9,10].map(v=>({v, n:grades.filter(g=>g.score===v).length}));
  const maxDist = Math.max(...dist.map(d=>d.n),1);

  return (
    <div className="space-y-6">
      <PageHeader rootLabel={EDUCATOR.name} crumb="Grading" title="Grading"
        subtitle="draft → reviewed → published · appeals window: 14 days"
        action={
          counts.reviewed > 0 &&
          <Button onClick={publishAll} color={white} backgroundColor={green}
                  className="text-sm font-semibold px-4 py-2 gap-2">
            <CheckIcon size={14} color={white}/> Publish {counts.reviewed} grade{counts.reviewed>1?"s":""}
          </Button>
        }/>

      {/* Course selector */}
      <div className="flex gap-2 flex-wrap">
        {MY_COURSES.map(c=>(
          <Button key={c.id} onClick={()=>setSelectedCourse(c.id)} 
                  color={selectedCourse===c.id?white:muted} backgroundColor={selectedCourse===c.id?ink:white} border={`1px solid ${selectedCourse===c.id?ink:border}`}
                  className="text-xs font-semibold px-3 py-2 transition-colors">
            {c.code} · {c.title}
          </Button>
        ))}
      </div>

      {/* Workflow pipeline */}
      <div className="grid grid-cols-5 gap-2">
        {[
          {key:"draft",    label:"Draft",     color:muted,  bg:"#F1F5F9", arrow:true },
          {key:"reviewed", label:"Reviewed",  color:amber,  bg:amberBg,   arrow:true },
          {key:"published",label:"Published", color:green,  bg:greenBg,   arrow:false},
          {key:"appealed", label:"Appealed",  color:red,    bg:redBg,     arrow:false},
          {key:"final",    label:"Final",     color:violet, bg:violetBg,  arrow:false},
        ].map(({key,label,color,bg,arrow})=>(
          <div key={key} className="relative">
            <div className="rounded-xl p-3 text-center" style={{backgroundColor:bg}}>
              <p className="text-2xl font-serif" style={{color}}>{counts[key]}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide mt-1" style={{color}}>{label}</p>
            </div>
            {arrow && counts[key]>0 && (
              <Button onClick={()=>promoteAll(key,key==="draft"?"reviewed":"published")}
                      color={muted} backgroundColor={white} border={`1px solid ${border}`}
                      className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full! z-10 shadow-sm">
                →
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Appeals alert */}
      {counts.appealed > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{backgroundColor:redBg,border:`1px solid #FECACA`}}>
          <AlertIcon size={16} color={red}/>
          <p className="text-xs font-medium" style={{color:red}}>
            <strong>{counts.appealed} appeal{counts.appealed>1?"s":""}</strong> require review.
            Appeals window is 14 days from grade publication.
          </p>
          <Button onClick={()=>setFilter("appealed")} color={red} border={`1px solid ${red}`}
                  className="text-xs font-semibold p-1.5 ml-auto">
            Show appeals
          </Button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Grade table */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          {/* Filter tabs */}
          <div className="flex border-b" style={{borderColor:border}}>
            {[["all","All",grades.length],["draft","Draft",counts.draft],["reviewed","Reviewed",counts.reviewed],["appealed","Appeals",counts.appealed]].map(([f,l,n])=>(
              <button key={f} onClick={()=>setFilter(f)}
                className="px-4 py-3 text-xs font-semibold transition-colors"
                style={{color:filter===f?gold:muted,borderBottom:filter===f?`2px solid ${gold}`:"2px solid transparent"}}>
                {l} {n>0&&<span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full"
                  style={{backgroundColor:f==="appealed"&&n>0?redBg:goldBg,color:f==="appealed"&&n>0?red:amber}}>{n}</span>}
              </button>
            ))}
            <div className="ml-auto flex items-center px-4 gap-2">
              <UploadIcon size={14}/>
              <span className="text-[11px]" style={{color:muted}}>CSV import</span>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr style={{backgroundColor:pageColor}}>
                {["Student","ID","Score","Status",""].map(h=>(
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider px-4 py-2.5"
                    style={{color:muted}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(g=>(
                <tr key={g.id} className="border-t hover:bg-gray-50 transition-colors"
                  style={{borderColor:border,backgroundColor:g.status==="appealed"?`${redBg}66`:""}}>
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold" style={{color:ink}}>{g.student}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[10px] font-mono" style={{color:muted}}>{g.sid}</p>
                  </td>
                  <td className="px-4 py-3">
                    {editingGrade===g.id
                      ? <input type="number" min="0" max="10" defaultValue={g.score}
                          autoFocus className="w-14 rounded-lg border px-2 py-1 text-sm outline-none text-center font-semibold"
                          style={{borderColor:gold,color:ink}}
                          onBlur={e=>{
                            const v=Math.min(10,Math.max(0,+e.target.value));
                            setGrades(gs=>gs.map(x=>x.id===g.id?{...x,score:v}:x));
                            setEditingGrade(null);
                          }}/>
                      : <span className="text-sm font-bold" style={{color:g.score>=5?ink:red}}>
                          {g.score}<span className="text-[10px] font-normal" style={{color:muted}}>/10</span>
                        </span>
                    }
                  </td>
                  <td className="px-4 py-3"> <StatusBadge config={STATUS_CFG} status={g.status} fallbackKey="draft"/> </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {g.status!=="published" && g.status!=="final" && (
                        <Button onClick={()=>setEditingGrade(g.id)} className="p-1.5 rounded! hover:bg-gray-100"> <EditIcon size={13}/> </Button>
                      )}
                      {g.status==="appealed" && (
                        <Button onClick={()=>setAppealModal(g)} color={red} backgroundColor={redBg}
                                className="text-[11px] font-semibold px-2.5 py-1">
                          Resolve
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Distribution chart */}
        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <p className="text-xs font-semibold mb-4" style={{color:ink}}>Grade distribution</p>
          <div className="flex items-end gap-1 h-32 mb-2">
            {dist.filter(d=>d.v>=1).map(d=>(
              <div key={d.v} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-sm transition-all"
                  style={{height:`${(d.n/maxDist)*100}%`,minHeight:d.n>0?4:0,
                    backgroundColor:d.v<=4?red:d.v<=6?amber:green,opacity:0.85}}/>
                <span className="text-[9px] font-semibold" style={{color:muted}}>{d.v}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-3 border-t" style={{borderColor:border}}>
            {[
              {label:"Pass rate",   value:`${course.passRate||"—"}%`, color:green},
              {label:"Average",     value:`${course.avgGrade||"—"}/10`,color:ink},
              {label:"Published",   value:`${counts.published}/${grades.length}`,color:muted},
            ].map(({label,value,color})=>(
              <div key={label} className="flex justify-between text-xs">
                <span style={{color:muted}}>{label}</span>
                <span className="font-semibold" style={{color}}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appeal resolution modal */}
      {appealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{backgroundColor:"rgba(15,23,41,0.6)",backdropFilter:"blur(3px)"}}>
          <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            style={{backgroundColor:white}}>
            <div className="px-6 py-4 flex items-center justify-between"
              style={{backgroundColor:"#FEF2F2"}}>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold" style={{color:red}}>Grade Appeal</p>
                <p className="text-sm font-semibold mt-0.5" style={{color:ink}}>{appealModal.student}</p>
              </div>
              <Button onClick={()=>setAppealModal(null)} className="p-1.5 hover:bg-red-100"> <XIcon size={14}/> </Button>
            </div>
            <div className="p-6 space-y-4">
              <div className="rounded-xl p-4" style={{backgroundColor:pageColor}}>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>Student's appeal reason</p>
                <p className="text-xs leading-relaxed italic" style={{color:ink}}>"{appealModal.appeal}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>Current score</p>
                  <p className="text-2xl font-serif" style={{color:ink}}>{appealModal.score}/10</p>
                </div>
                <div className="text-2xl" style={{color:muted}}>→</div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>New score (or keep)</p>
                  <input id="new-score" type="number" min="0" max="10" defaultValue={appealModal.score}
                    className="w-24 rounded-lg border px-3 py-2 text-lg font-bold outline-none text-center"
                    style={{borderColor:border,color:ink}}
                    onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={()=>{
                          const v=+document.getElementById("new-score").value;
                          resolveAppeal(appealModal.id,v,v===appealModal.score?"unchanged":"updated");
                        }} color={white} backgroundColor={ink}
                        className="text-sm font-semibold flex-1 py-2.5 rounded-xl!">
                  Resolve appeal
                </Button>
                <Button onClick={()=>{
                          setGrades(gs=>gs.map(g=>g.id===appealModal.id?{...g,status:"published",appeal:null}:g));
                          setAppealModal(null);
                          showToast("Appeal dismissed — grade unchanged.");
                        }} color={muted} border={`1px solid ${border}`}
                        className="text-sm font-medium px-4 py-2.5 rounded-xl!">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
