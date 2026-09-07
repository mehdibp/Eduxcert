import { useState, useMemo } from "react";

import {ink, goldBg, goldBdr, pageColor, white, muted, border, green, greenBg, amber, amberBg, red, redBg} from "../../styles/colors";
import { AlertIcon, UploadIcon} from "../../components/icons/icons";
import { AUDIT_LOG } from "../../data/admin";

import PageHeader from "../../components/commen/PageHeader";
import {Badge}    from "../../components/commen/Badge";
import {Button}   from "../../components/commen/Button";


// --------------------------------------------------------------------------------------
export default function AuditPage(){
  const [filter,setFilter] = useState("all");
  const filtered = useMemo(() => filter==="all" ? AUDIT_LOG:AUDIT_LOG.filter(a=>a.risk===filter) , [filter]);
  const riskColor = {low:green,   medium:amber,   high:red};
  const riskBg    = {low:greenBg, medium:amberBg, high:redBg};

  return (
    <div className="space-y-5">
      <PageHeader rootLabel={"Admin Zupan"} crumb="Audit Log" title="Audit Log"
        subtitle="Immutable log · Merkle root anchored externally · 7-year retention"/>

      {AUDIT_LOG.filter(a=>a.risk==="high").length>0&&(
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{backgroundColor:redBg,border:`1px solid #FECACA`}}>
          <AlertIcon size={16} color={red}/>
          <p className="text-sm font-medium" style={{color:red}}>
            <strong>High-risk event detected:</strong> Multiple failed login attempts on admin account — {new Date().toLocaleDateString("en-GB")}.
          </p>
        </div>
      )}

      <div className="flex gap-2">
        {[["all","All"],["low","Low"],["medium","Medium"],["high","High risk"]].map(([v,l])=>(
          <Button key={v} onClick={()=>setFilter(v)} 
                  color={filter===v?white:muted} backgroundColor={filter===v?(v==="high"?red:v==="medium"?amber:ink):white} border={`1px solid ${filter===v?"transparent":border}`}
                  className="text-xs font-semibold px-3 py-2 transition-colors">
            {l}
          </Button>
        ))}
        <Button color={muted} border={`1px solid ${border}`}
                className="text-xs font-medium px-3 py-2 ml-auto gap-1.5">
          <UploadIcon/> Export CSV
        </Button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <table className="w-full">
          <thead style={{backgroundColor:pageColor}}>
            <tr>{["Timestamp","Actor","Action","Resource","Risk"].map(h=>(
              <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider px-4 py-3"
                style={{color:muted}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map(a=>(
              <tr key={a.id} className="border-t hover:bg-gray-50"
                style={{borderColor:border,backgroundColor:a.risk==="high"?`${redBg}44`:""}}>
                <td className="px-4 py-3 text-[11px] font-mono" style={{color:muted}}>{a.ts}</td>
                <td className="px-4 py-3 text-xs font-medium" style={{color:ink}}>{a.actor}</td>
                <td className="px-4 py-3 text-xs" style={{color:ink}}>{a.action}</td>
                <td className="px-4 py-3 text-xs" style={{color:muted}}>{a.resource}</td>
                <td className="px-4 py-3">
                  <Badge backgroundColor={riskBg[a.risk]} color={riskColor[a.risk]}> {a.risk.charAt(0).toUpperCase()+a.risk.slice(1)} </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl p-4 flex items-start gap-3"
        style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
        <span className="text-base">⚓</span>
        <div>
          <p className="text-xs font-semibold mb-0.5" style={{color:ink}}>Merkle root anchoring</p>
          <p className="text-[11px]" style={{color:muted}}>
            Audit log hash anchored externally every 24h. Last anchor: <span className="font-mono">2025-06-08 00:00 UTC</span>.
            7-year retention per GDPR Art. 30 + eIDAS 2.0 audit requirements.
          </p>
        </div>
      </div>
    </div>
  );

}
