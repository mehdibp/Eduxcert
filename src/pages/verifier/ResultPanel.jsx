import { ink, gold, goldBg, goldBdr, pageColor, white, muted, border, 
        green, greenBg, amber, amberBg,  violetBg, red, redBg} from "../../styles/colors";
import {CheckIcon, XCircleIcon, ShieldIcon, ExternalIcon } from "../../components/icons/icons";
import { VSTEPS } from "../../data/verifier";

import {Button} from "../../components/commen/Button";


// --------------------------------------------------------------------------------------
export default function ResultPanel({cred, steps}) {
  // const allOk = steps.every(s=>s.ok);
  const r = cred.result;

  const cfg = {
    valid:   { Icon:ShieldIcon, iconColor:green, bg:greenBg,  border2:`1px solid #BBF7D0`, title:"Valid credential",   sub:"Authentic, unrevoked, and issued by a trusted institution." },
    revoked: { Icon:ShieldIcon, iconColor:red,   bg:redBg,    border2:`1px solid #FECACA`, title:"Credential revoked", sub:"This credential has been revoked by the issuing institution." },
    unknown: { Icon:ShieldIcon, iconColor:amber, bg:amberBg,  border2:`1px solid #FDE68A`, title:"Cannot verify",      sub:"Issuer is not in the EBSI Trusted Issuers Registry." },
  }[r];

  return (
    <div className="space-y-5">
      {/* Verdict */}
      <div className="rounded-2xl p-6 flex flex-col items-center text-center gap-3"
        style={{backgroundColor:cfg.bg, border:cfg.border2}}>
        <cfg.Icon size={48} color={cfg.iconColor}/>
        <div>
          <p className="font-serif text-xl" style={{color:cfg.iconColor}}>{cfg.title}</p>
          <p className="text-xs mt-1 max-w-xs mx-auto" style={{color:muted}}>{cfg.sub}</p>
        </div>
        {r==="valid" && (
          <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
            style={{backgroundColor:white, color:green, border:`1px solid #BBF7D0`}}>
            <CheckIcon size={12}/> eIDAS 2.0 / EBSI compliant
          </div>
        )}
      </div>

      {/* Step results */}
      <div className="rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        {steps.map((s,i)=>(
          <div key={i} className="flex items-start gap-3 px-4 py-3 border-b last:border-0"
            style={{borderColor:border}}>
            <span className="mt-0.5 shrink-0">
              {s.ok ? <CheckIcon size={14}/> : <XCircleIcon size={14}/>}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium" style={{color:ink}}>
                  {VSTEPS[s.step-1].icon} {VSTEPS[s.step-1].label}
                </span>
              </div>
              <p className="text-[11px] mt-0.5" style={{color:s.ok?muted:red}}>{s.note}</p>
            </div>
            <span className="text-[10px] font-semibold shrink-0"
              style={{color:s.ok?green:red}}>{s.ok?"PASS":"FAIL"}</span>
          </div>
        ))}
      </div>

      {/* Credential metadata */}
      {r!=="unknown" && (
        <div className="rounded-xl p-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{color:muted}}>
            Disclosed attributes
          </p>
          <div className="space-y-2.5">
            {[
              ["Type",         cred.type],
              ["Title",        cred.title],
              ["Issuer",       cred.issuer],
              ["Issue date",   cred.issuedOn],
              ["ECTS credits", cred.ects ? `${cred.ects} credits` : null],
              ["Subject hash", cred.subjectHash],
              ["Algorithm",    cred.algorithm],
              ["EBSI tx",      cred.ebsiTxHash],
            ].filter(([,v])=>v).map(([k,v])=>(
              <div key={k} className="flex justify-between gap-4 text-xs py-1.5 border-b last:border-0"
                style={{borderColor:border}}>
                <span style={{color:muted}}>{k}</span>
                <span className="font-mono text-right break-all" style={{color:ink,maxWidth:"55%"}}>{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 rounded-lg text-[11px] leading-relaxed"
            style={{backgroundColor:pageColor,color:muted}}>
            🔒 <strong>Privacy:</strong> The verifier never sees personal data beyond these disclosed attributes.
            The holder chose what to share using SD-JWT selective disclosure.
          </div>
        </div>
      )}

      {/* Issuer DID */}
      {r==="valid" && (
        <div className="rounded-xl p-4 flex items-start gap-3"
          style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
          <span className="text-base">⚓</span>
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{color:ink}}>Issuer DID · EBSI Trust Registry</p>
            <p className="text-[11px] font-mono break-all" style={{color:muted}}>{cred.issuerDid}</p>
            <a href="#" className="flex items-center gap-1 text-[11px] font-medium mt-1.5" style={{color:gold}}>
              View in EBSI registry <ExternalIcon size={11}/>
            </a>
          </div>
        </div>
      )}

      {/* Register CTA */}
      <div className="rounded-xl p-5 flex items-start gap-4"
        style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-lg"
          style={{backgroundColor:violetBg}}>📋</div>
        <div className="flex-1">
          <p className="text-xs font-semibold mb-0.5" style={{color:ink}}>High-volume verifier?</p>
          <p className="text-[11px]" style={{color:muted}}>
            Register a free verifier account to get API access, verification history, and audit logs.
          </p>
        </div>
        <Button color={white} backgroundColor={ink} className="text-xs font-semibold px-3 py-2"> Register </Button>
      </div>
    </div>
  );

}
