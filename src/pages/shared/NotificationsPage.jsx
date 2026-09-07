import { useState } from "react";

import { ink, gold, pageColor, white, muted, border, amber, green, violet, blue, red, teal } from "../../styles/colors";
import { XIcon } from "../../components/icons/icons";
import { NOTIFICATIONS, NOTIF_PREFS } from "../../data/shared";

import {Badge}      from "../../components/commen/Badge";
import {Button}     from "../../components/commen/Button";
import ToggleSwitch from "../../components/commen/ToggleSwitch";
import Toast        from "../../components/commen/Toast";


// --------------------------------------------------------------------------------------
function SectionCard({title, children, action}){
  return(
    <div className="rounded-2xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
      <div className="px-6 py-4 flex items-center justify-between border-b" style={{borderColor:border}}>
        <p className="text-sm font-semibold" style={{color:ink}}>{title}</p>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// notification type config -------------------------------------------------------------
const N_TYPE = {
  grade:      {dot:amber,  label:"Grade"     },
  appeal:     {dot:red,    label:"Appeal"    },
  credential: {dot:gold,   label:"Credential"},
  exam:       {dot:violet, label:"Exam"      },
  ects:       {dot:green,  label:"ECTS"      },
  roadmap:    {dot:blue,   label:"Roadmap"   },
  enrol:      {dot:teal,   label:"Enrolment" },
  benefit:    {dot:teal,   label:"Benefit"   },
};

// --------------------------------------------------------------------------------------
export default function NotificationsPage(){
  const [notifs,setNotifs] = useState(NOTIFICATIONS);
  const [prefs,setPrefs]   = useState(NOTIF_PREFS);
  const [tab,setTab]       = useState("inbox");
  const [filter,setFilter] = useState("all");
  const [toast,setToast]   = useState(null);

  const unread = notifs.filter(n=>!n.read).length;
  const showToast = (msg, ok=true)=>{setToast({msg,ok}); setTimeout(()=>setToast(null), 3000);};
  const markAll   = ()=>{setNotifs(ns=>ns.map(n=>({...n,read:true})));showToast("All notifications marked as read.");};
  const markOne   = (id)=>setNotifs(ns=>ns.map(n=>n.id===id?{...n,read:true}:n));
  const del       = (id)=>setNotifs(ns=>ns.filter(n=>n.id!==id));

  const filtered = filter==="all" ? notifs : notifs.filter(n=>n.type===filter);

  const togglePref=(id,ch)=>{
    setPrefs(ps=>ps.map(p=>p.id===id?{...p,[ch]:!p[ch]}:p));
    showToast("Notification preference saved.");
  };

  return(
    <div className="min-h-screen" style={{backgroundColor:pageColor}}>
      {/* Header */}
      <div className="pt-8 pb-6 px-6 lg:px-10" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs mb-3" style={{color:muted}}>
            <span style={{color:ink}}>Andreja Novak</span> / Notifications
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-serif text-2xl" style={{color:ink}}>Notifications</h1>
              {unread>0&&<p className="text-sm mt-0.5" style={{color:muted}}>
                <span className="font-semibold" style={{color:amber}}>{unread} unread</span>
              </p>}
            </div>
            {tab==="inbox"&&unread>0&&(
              <Button onClick={markAll} color={gold} className="text-xs font-medium"> Mark all as read </Button>
            )}
          </div>
          <div className="flex gap-1 mt-6">
            {[["inbox","Inbox"],["preferences","Preferences"]].map(t=>(
              <button key={t[0]} onClick={()=>setTab(t[0])}
                className="px-4 py-2 text-xs font-semibold rounded-t-lg"
                style={{backgroundColor:tab===t[0]?pageColor:"transparent",color:tab===t[0]?ink:muted,
                  borderBottom:tab===t[0]?`2px solid ${gold}`:"2px solid transparent"}}>
                {t[1]}
                {t[0]==="inbox"&&unread>0&&(
                  // <Badge color={white} backgroundColor={amber}
                  //        className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full"> {unread} </Badge>
                  <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{backgroundColor:amber,color:white}}>{unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-6 space-y-5">

        {/* ── INBOX ── */}
        {tab==="inbox"&&(
          <>
            {/* Type filters */}
            <div className="flex flex-wrap gap-2">
              {[["all","All"],["grade","Grades"],["credential","Credentials"],["exam","Exams"],["ects","ECTS"],["roadmap","Roadmap"]].map(([v,l])=>(
                <Button key={v} onClick={()=>setFilter(v)} 
                        color={filter===v?white:muted} backgroundColor={filter===v?ink:white} border={`1px solid ${filter===v?ink:border}`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full! transition-colors">
                  {l}
                </Button>
              ))}
            </div>

            {filtered.length===0?(
              <div className="rounded-2xl py-16 flex flex-col items-center gap-3"
                style={{backgroundColor:white,border:`1px solid ${border}`}}>
                <p className="text-3xl">🔔</p>
                <p className="text-sm font-medium" style={{color:ink}}>No notifications</p>
                <p className="text-xs" style={{color:muted}}>You're all caught up.</p>
              </div>
            ):(
              <div className="rounded-2xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
                {filtered.map((n,i)=>{
                  const t=N_TYPE[n.type]||{dot:muted,label:""};
                  return(
                    <div key={n.id} onClick={()=>markOne(n.id)}
                      className="flex items-start gap-4 px-5 py-4 border-b last:border-0 cursor-pointer transition-colors hover:bg-gray-50"
                      style={{borderColor:border,backgroundColor:n.read?"transparent":`${amber}08`}}>
                      {/* Dot */}
                      <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full"
                          style={{backgroundColor:n.read?border:t.dot}}/>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <p className="text-xs font-semibold" style={{color:n.read?muted:ink}}>{n.title}</p>
                          <Badge color={muted} backgroundColor={pageColor}> {t.label} </Badge>
                        </div>
                        <p className="text-[11px] leading-relaxed" style={{color:muted}}>{n.body}</p>
                        <p className="text-[10px] mt-1.5" style={{color:border}}>{n.ts}</p>
                      </div>
                      {/* Actions */}
                      <Button onClick={e=>{e.stopPropagation();del(n.id);}}
                              className="p-1.5 opacity-30 hover:opacity-100">
                        <XIcon size={13}/>
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── PREFERENCES ── */}
        {tab==="preferences"&&(
          <SectionCard title="Notification channels">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider pb-3"
                      style={{color:muted}}>Type</th>
                    {["Email","Push","SMS"].map(ch=>(
                      <th key={ch} className="text-center text-[10px] font-semibold uppercase tracking-wider pb-3 w-20"
                        style={{color:muted}}>{ch}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prefs.map(p=>(
                    <tr key={p.id} className="border-t" style={{borderColor:border}}>
                      <td className="py-3.5 pr-4">
                        <p className="text-xs font-medium" style={{color:ink}}>{p.label}</p>
                      </td>
                      {["email","push","sms"].map(ch=>(
                        <td key={ch} className="py-3.5 text-center">
                          <div className="flex justify-center">
                            <ToggleSwitch on={p[ch]} onChange={()=>togglePref(p.id,ch)}/>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] mt-4" style={{color:muted}}>
              SMS is charged per message to your institutional account. Push notifications require the Eduxcert mobile app.
            </p>
          </SectionCard>
        )}
      </div>

      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
