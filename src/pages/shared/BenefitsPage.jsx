import { useState } from "react";

import {ink, gold, goldBg, goldBdr, pageColor, white, muted, border, green, greenBg, amber, teal} from "../../styles/colors";
import { ShieldIcon, CheckIcon, XIcon, ExternalIcon } from "../../components/icons/icons";
import { BENEFITS } from "../../data/shared";

import {Badge}  from "../../components/commen/Badge";
import {Button} from "../../components/commen/Button";
import StatCard from "../../components/commen/StatCard";
import Toast    from "../../components/commen/Toast";


// --------------------------------------------------------------------------------------
export default function BenefitsPage(){
  const [selected, setSelected] = useState(null);
  const [redeemed, setRedeemed] = useState(new Set());
  const [toast, setToast]       = useState(null);
  const [filter, setFilter]     = useState("All");

  const showToast = (msg, ok=true)=>{setToast({msg,ok}); setTimeout(()=>setToast(null), 3000);};
  const cats = ["All", ...new Set(BENEFITS.map(b=>b.category))];
  const filtered = filter==="All"?BENEFITS:BENEFITS.filter(b=>b.category===filter);

  const redeem=(b)=>{
    setRedeemed(r=>new Set([...r,b.id]));
    showToast(`${b.partner} benefit activated! Show the QR code at the counter.`);
  };

  return(
    <div className="min-h-screen" style={{backgroundColor:pageColor}}>
      {/* Header */}
      <div className="pt-8 pb-6 px-6 lg:px-10" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs mb-3" style={{color:muted}}>
            <span style={{color:ink}}>Andreja Novak</span> / Benefits
          </p>
          <h1 className="font-serif text-2xl mb-1" style={{color:ink}}>Student Benefits</h1>
          <p className="text-sm" style={{color:muted}}>
            Powered by your student-status credential · SD-JWT selective disclosure
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-7 space-y-6">

        {/* How it works */}
        <div className="rounded-xl p-4 flex items-start gap-3"
          style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
          <ShieldIcon size={16} color={gold}/>
          <p className="text-xs leading-relaxed" style={{color:amber}}>
            Each benefit redemption uses your <strong>student-status credential</strong>.
            Only the attributes required by each partner are disclosed (SD-JWT) —
            for example, "is a current student" without revealing your name or programme.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Active benefitst" value={BENEFITS.filter(b=>b.status==="active").length} color={green} />
          <StatCard label="Used this month"  value={redeemed.size} color={gold} />
          <StatCard label="Saved (est.)"     value={"€48"} color={teal} />
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          {cats.map(c=>(
            <Button key={c} onClick={()=>setFilter(c)} 
                    color={filter===c?white:muted} backgroundColor={filter===c?ink:white} border={`1px solid ${filter===c?ink:border}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full! transition-colors">
              {c}
            </Button>
          ))}
        </div>

        {/* Benefit cards */}
        <div className="space-y-4">
          {filtered.map(b=>(
            <div key={b.id} className="rounded-2xl overflow-hidden"
              style={{backgroundColor:white,border:`2px solid ${selected===b.id?b.color:border}`}}>
              <div className="p-5 flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{backgroundColor:b.bg}}>
                  {b.icon}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge color={b.color} backgroundColor={b.bg}   > {b.category} </Badge>
                    <Badge color={green}   backgroundColor={greenBg}> Active       </Badge>
                  </div>
                  <h3 className="text-sm font-semibold" style={{color:ink}}>{b.partner}</h3>
                  <p className="text-[11px] mt-0.5" style={{color:muted}}>{b.desc}</p>
                  {b.limit&&(
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] mb-1" style={{color:muted}}>
                        <span>Monthly usage</span>
                        <span>{b.used}/{b.limit}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{backgroundColor:border}}>
                        <div className="h-full rounded-full"
                          style={{width:`${(b.used/b.limit)*100}%`,
                            backgroundColor:b.used/b.limit>.8?amber:b.color}}/>
                      </div>
                    </div>
                  )}
                </div>
                {/* Discount + action */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <span className="text-xl font-serif" style={{color:b.color}}>{b.discount}</span>
                  <Button onClick={()=>setSelected(selected===b.id?null:b.id)} 
                          color={selected===b.id?white:b.color} backgroundColor={selected===b.id?ink:b.bg} border={`1px solid ${b.color}30`}
                          className="text-xs font-semibold px-3 py-1.5 transition-colors">
                    {selected===b.id?"Hide QR":"Show QR"}
                  </Button>
                </div>
              </div>

              {/* Expanded: QR + redeem */}
              {selected===b.id&&(
                <div className="border-t px-5 pb-6 pt-5" style={{borderColor:border}}>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* QR */}
                    <div className="p-4 rounded-2xl shrink-0" style={{backgroundColor:pageColor,border:`1px solid ${border}`}}>
                      <img src="src/assets/QR code.webp"/>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{color:ink}}>How to use</p>
                        <p className="text-[11px] leading-relaxed" style={{color:muted}}>
                          Show this QR code to the partner's scanner. Only your student status
                          is disclosed — not your name, programme, or credential ID.
                        </p>
                      </div>

                      {/* Disclosed attributes */}
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{color:muted}}>
                          Disclosed to partner (SD-JWT)
                        </p>
                        <div className="space-y-1">
                          {[
                            {attr:"is_student", value:"true",             shown:true},
                            {attr:"institution",value:"University of Ljubljana", shown:true},
                            {attr:"valid_until",value:"30 Jun 2026",      shown:true},
                            {attr:"name",       value:"Andreja Novak",    shown:false},
                            {attr:"programme",  value:"MSc CS",           shown:false},
                          ].map(a=>(
                            <div key={a.attr} className="flex items-center gap-2 text-[11px]">
                              {a.shown
                                ? <CheckIcon size={11} color={green}/>
                                : <XIcon size={11} color={border}/>}
                              <span className="font-mono" style={{color:muted}}>{a.attr}</span>
                              {a.shown
                                ? <span style={{color:ink}}>{a.value}</span>
                                : <span style={{color:border}}>hidden</span>}
                            </div>
                          ))}
                        </div>
                      </div>

                      {redeemed.has(b.id)?(
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
                          style={{backgroundColor:greenBg}}>
                          <CheckIcon size={13} color={green}/>
                          <p className="text-xs font-medium" style={{color:green}}>
                            Benefit activated this session
                          </p>
                        </div>
                      ):(
                        <Button onClick={()=>redeem(b)} color={white} backgroundColor={b.color}
                                className="text-sm font-semibold w-full py-2.5 rounded-xl!">
                          Redeem benefit →
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Validity info */}
        <div className="rounded-xl p-5 flex items-start gap-3"
          style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <ShieldIcon size={16} color={muted}/>
          <div>
            <p className="text-xs font-semibold mb-1" style={{color:ink}}>Student-status credential validity</p>
            <p className="text-[11px] leading-relaxed" style={{color:muted}}>
              Your student-status credential is automatically renewed at the start of each academic term.
              Current credential valid until <strong style={{color:ink}}>30 Jun 2026</strong>.
              If you interrupt your studies, benefits are suspended within 24h.
            </p>
            <a href="#" className="flex items-center gap-1 text-[11px] font-medium mt-2" style={{color:gold}}>
              View student-status credential <ExternalIcon size={11} color={gold}/>
            </a>
          </div>
        </div>
      </div>

      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
