import { useState, useEffect, useRef } from "react";
import {ink, inkSoft, gold, goldBg, goldBdr, 
  pageColor, white, muted, border, 
  green, greenBg, amber, amberBg, violet, violetBg, blue, blueBg, red, redBg} from "../styles/colors";

import {CheckIcon, XCircleIcon, QuestionIcon, SpinIcon, ScanIcon, ShieldIcon, ExternalIcon, 
        CopyIcon } from "../components/icons/icons"

import { SCENARIOS, VSTEPS } from "../data/verifier"


// ════════════════════════════════════════════════
// VERIFICATION ENGINE (simulated)
// ════════════════════════════════════════════════
function useVerificationEngine(cred) {
  const [step, setStep]     = useState(0);   // 0=idle 1-4=running 5=done
  const [steps, setSteps]   = useState([]);  // completed step results
  const [running, setRunning] = useState(false);
  const timer = useRef(null);

  const start = () => {
    setStep(1); setSteps([]); setRunning(true);
  };

  useEffect(()=>{
    if(!running || step===0 || step>4) return;
    const delay = [900, 1100, 800, 1000][step-1];
    timer.current = setTimeout(()=>{
      let ok = true, note = "";
      if(step===2 && cred.result==="unknown") { ok=false; note="Signature could not be verified — key not found"; }
      if(step===3 && cred.result==="revoked") { ok=false; note="Bit 1 set — credential is revoked"; }
      if(step===4 && cred.result==="unknown") { ok=false; note="Issuer DID not found in EBSI TIR"; }
      if(ok) note = VSTEPS[step-1].detail;

      setSteps(prev=>[...prev,{step,ok,note}]);
      if(step<4) setStep(s=>s+1);
      else { setStep(5); setRunning(false); }
    }, delay);
    return ()=>clearTimeout(timer.current);
  },[running, step, cred]);

  const reset = () => { setStep(0); setSteps([]); setRunning(false); };
  return { step, steps, running, start, reset, done: step===5 };
}

// ════════════════════════════════════════════════
// RESULT DISPLAY
// ════════════════════════════════════════════════
function ResultPanel({cred, steps}) {
  const allOk = steps.every(s=>s.ok);
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
        <button className="shrink-0 text-xs font-semibold px-3 py-2 rounded-lg text-white"
          style={{backgroundColor:ink}}>
          Register
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// MAIN PAGE
// ════════════════════════════════════════════════
export default function PublicVerifierPage() {
  const [input,       setInput]       = useState("");
  const [cred,        setCred]        = useState(null);
  const [mode,        setMode]        = useState("landing"); // landing | qr | manual | verifying | result
  const [scenario,    setScenario]    = useState("valid");
  const [copiedCode,  setCopiedCode]  = useState(false);

  const engine = useVerificationEngine(cred || SCENARIOS.valid);

  const handleVerify = (sc=scenario) => {
    const c = SCENARIOS[sc];
    setCred(c);
    setMode("verifying");
    engine.reset();
    setTimeout(()=>engine.start(), 100);
  };

  useEffect(()=>{
    if(engine.done && mode==="verifying") setMode("result");
  },[engine.done]);

  const reset = () => {
    setMode("landing"); setCred(null); setInput(""); engine.reset();
  };

  // ── spin keyframe (injected once) ──
  const styleTag = `@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;

  return (
    <div className="min-h-screen" style={{backgroundColor:pageColor}}>
      <style>{styleTag}</style>

      {/* ── Top bar ── */}
      <header style={{backgroundColor:ink,borderBottom:`1px solid ${inkSoft}`}}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{border:`1.5px solid ${gold}`}}>
              <div className="w-2 h-2 rounded-full" style={{backgroundColor:gold}}/>
            </div>
            <div>
              <span className="text-white font-serif text-base tracking-wide">Eduxcert</span>
              <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full"
                style={{backgroundColor:"rgba(176,141,87,0.2)",color:gold}}>
                Public Verifier
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px]" style={{color:"#94A3B8"}}>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:green}}/>
              No login required
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:green}}/>
              Offline-capable
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">

        {/* ══ LANDING ══ */}
        {mode==="landing" && (
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3" style={{color:gold}}>
                Credential verification
              </p>
              <h1 className="font-serif text-3xl mb-3" style={{color:ink}}>
                Verify an Eduxcert credential
              </h1>
              <p className="text-sm max-w-md mx-auto" style={{color:muted}}>
                Scan a QR code or paste a verify link to confirm the authenticity of
                any degree, certificate, or badge issued by an Eduxcert-connected institution.
              </p>
            </div>

            {/* Entry modes */}
            <div className="grid sm:grid-cols-2 gap-4">
              <button onClick={()=>setMode("qr")}
                className="rounded-2xl p-7 flex flex-col items-center gap-4 text-left hover:shadow-lg transition-shadow"
                style={{backgroundColor:white,border:`2px solid ${border}`}}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{backgroundColor:goldBg}}>
                  <ScanIcon size={36} color={gold}/>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{color:ink}}>Scan QR code</p>
                  <p className="text-xs mt-1" style={{color:muted}}>
                    Point your camera at the QR on a credential card or PDF.
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full self-start"
                  style={{backgroundColor:goldBg,color:amber,border:`1px solid ${goldBdr}`}}>
                  Recommended
                </span>
              </button>

              <button onClick={()=>setMode("manual")}
                className="rounded-2xl p-7 flex flex-col items-center gap-4 text-left hover:shadow-lg transition-shadow"
                style={{backgroundColor:white,border:`2px solid ${border}`}}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{backgroundColor:violetBg}}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M6 8h24M6 14h24M6 20h16" stroke={violet} strokeWidth="2.5" strokeLinecap="round"/>
                    <circle cx="27" cy="26" r="7" stroke={violet} strokeWidth="2"/>
                    <path d="M25 26h4M27 24v4" stroke={violet} strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{color:ink}}>Enter verify link</p>
                  <p className="text-xs mt-1" style={{color:muted}}>
                    Paste a verification URL or credential code (EDX-XXXX-XXXX).
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full self-start"
                  style={{backgroundColor:violetBg,color:violet}}>
                  Also available
                </span>
              </button>
            </div>

            {/* How it works */}
            <div className="rounded-2xl p-6" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{color:muted}}>
                How verification works
              </p>
              <div className="grid sm:grid-cols-4 gap-4">
                {VSTEPS.map((s,i)=>(
                  <div key={s.id} className="relative">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-lg"
                      style={{backgroundColor:goldBg}}>{s.icon}</div>
                    {i<3 && <div className="hidden sm:block absolute top-4 left-full w-full h-px"
                      style={{backgroundColor:border,width:"calc(100% - 36px)",left:36}}/>}
                    <p className="text-xs font-semibold mb-1" style={{color:ink}}>{s.label}</p>
                    <p className="text-[11px] leading-relaxed" style={{color:muted}}>{s.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t text-[11px] leading-relaxed" style={{borderColor:border,color:muted}}>
                🔒 <strong style={{color:ink}}>Privacy first.</strong> All signature and revocation checks happen
                locally in your browser — no personal data is sent to Eduxcert servers.
                The audit log records only a k-anonymous timestamp and IP, never the holder's identity.
              </div>
            </div>

            {/* Demo section */}
            <div className="rounded-2xl p-6 space-y-4" style={{backgroundColor:inkSoft}}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-white font-semibold text-sm">Try a demo verification</p>
                  <p className="text-[11px] mt-0.5" style={{color:"#94A3B8"}}>
                    Choose a scenario to see how different results look.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  {id:"valid",   label:"✅ Valid credential",    col:green},
                  {id:"revoked", label:"❌ Revoked credential",  col:red},
                  {id:"unknown", label:"⚠️ Unknown issuer",      col:amber},
                ].map(({id,label,col})=>(
                  <button key={id} onClick={()=>setScenario(id)}
                    className="px-3 py-2 rounded-lg text-xs font-semibold transition-all"
                    style={{backgroundColor:scenario===id?col+"22":white+"10",
                      color:scenario===id?col:white,
                      border:`1px solid ${scenario===id?col:white+"15"}`}}>
                    {label}
                  </button>
                ))}
              </div>
              <button onClick={()=>handleVerify(scenario)}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{backgroundColor:gold}}>
                Run verification demo →
              </button>
            </div>
          </div>
        )}

        {/* ══ QR MODE ══ */}
        {mode==="qr" && (
          <div className="space-y-6">
            <button onClick={reset} className="text-xs flex items-center gap-1.5" style={{color:muted}}>
              ← Back
            </button>
            <div className="rounded-2xl p-8 flex flex-col items-center gap-5 text-center"
              style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <p className="font-serif text-xl" style={{color:ink}}>Scan QR code</p>
              <p className="text-sm" style={{color:muted}}>
                In a real deployment, your camera opens here. For this demo, try one of the sample QR codes below.
              </p>

              {/* Sample QR cards */}
              <div className="grid sm:grid-cols-3 gap-4 w-full mt-2">
                {[
                  {sc:"valid",   label:"Database Architecture", code:"EDX-4401-DB03", col:green},
                  {sc:"revoked", label:"Intro to Programming",  code:"EDX-7700-XX11", col:red},
                  {sc:"unknown", label:"Advanced Statistics",   code:"EDX-0000-UNK9", col:amber},
                ].map(({sc,label,code,col})=>(
                  <button key={sc} onClick={()=>{setScenario(sc);handleVerify(sc);}}
                    className="rounded-xl p-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
                    style={{backgroundColor:pageColor,border:`1.5px solid ${border}`}}>
                    <div className="rounded-lg overflow-hidden p-2" style={{backgroundColor:white}}>
                      <img src="src/assets/QR code.webp"/>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold" style={{color:ink}}>{label}</p>
                      <p className="text-[10px] font-mono mt-0.5" style={{color:muted}}>{code}</p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{backgroundColor:col+"18",color:col}}>
                      {sc==="valid"?"Valid":sc==="revoked"?"Revoked":"Unknown issuer"}
                    </span>
                  </button>
                ))}
              </div>

              <button onClick={()=>setMode("manual")} className="text-xs font-medium" style={{color:muted}}>
                Or enter a link manually →
              </button>
            </div>
          </div>
        )}

        {/* ══ MANUAL INPUT ══ */}
        {mode==="manual" && (
          <div className="space-y-6">
            <button onClick={reset} className="text-xs flex items-center gap-1.5" style={{color:muted}}>
              ← Back
            </button>
            <div className="rounded-2xl p-8 space-y-5"
              style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <div>
                <p className="font-serif text-xl mb-1" style={{color:ink}}>Enter verify link</p>
                <p className="text-sm" style={{color:muted}}>
                  Paste the URL or the credential code from the document you want to verify.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{color:"#334155"}}>
                  Verification URL or credential code
                </label>
                <div className="flex gap-2">
                  <input value={input} onChange={e=>setInput(e.target.value)}
                    placeholder="https://verify.eduxcert.eu/c/EDX-XXXX-XXXX  or  EDX-XXXX-XXXX"
                    className="flex-1 rounded-lg border px-3.5 py-2.5 text-sm outline-none"
                    style={{borderColor:border,color:ink}}
                    onFocus={e=>e.target.style.borderColor=gold}
                    onBlur={e=>e.target.style.borderColor=border}
                    onKeyDown={e=>{
                      if(e.key==="Enter") {
                        const sc = input.includes("7700")?"revoked":input.includes("0000")?"unknown":"valid";
                        setScenario(sc); handleVerify(sc);
                      }
                    }}/>
                  <button onClick={()=>{
                    const sc = input.includes("7700")?"revoked":input.includes("0000")?"unknown":"valid";
                    setScenario(sc); handleVerify(sc);
                  }} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
                    style={{backgroundColor:ink}}>
                    Verify
                  </button>
                </div>
                <p className="text-[11px] mt-2" style={{color:muted}}>
                  Example codes to try: <button onClick={()=>setInput("EDX-4401-DB03")}
                    className="font-mono underline" style={{color:gold}}>EDX-4401-DB03</button>
                  {" · "}<button onClick={()=>setInput("EDX-7700-XX11")}
                    className="font-mono underline" style={{color:red}}>EDX-7700-XX11</button>
                  {" · "}<button onClick={()=>setInput("EDX-0000-UNK9")}
                    className="font-mono underline" style={{color:amber}}>EDX-0000-UNK9</button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ══ VERIFYING ══ */}
        {mode==="verifying" && (
          <div className="space-y-6">
            <div className="rounded-2xl p-8" style={{backgroundColor:white,border:`1px solid ${border}`}}>
              <p className="font-serif text-xl mb-1" style={{color:ink}}>Verifying…</p>
              <p className="text-sm mb-6" style={{color:muted}}>
                Checking <span className="font-mono font-semibold" style={{color:ink}}>{cred?.code}</span>
              </p>
              <ol className="space-y-5">
                {VSTEPS.map((s,i)=>{
                  const done  = engine.steps.find(x=>x.step===s.id);
                  const active= engine.step===s.id && !done;
                  return (
                    <li key={s.id} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{backgroundColor:done?(done.ok?greenBg:redBg):active?goldBg:pageColor}}>
                        {done
                          ? (done.ok
                              ? <CheckIcon size={16} color={green}/>
                              : <XCircleIcon size={16} color={red}/>)
                          : active
                          ? <SpinIcon size={18}/>
                          : <span className="text-base opacity-40">{s.icon}</span>
                        }
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-sm font-semibold" style={{color:done||active?ink:muted}}>
                          {s.icon} {s.label}
                        </p>
                        {done && (
                          <p className="text-[11px] mt-0.5" style={{color:done.ok?muted:red}}>
                            {done.note}
                          </p>
                        )}
                        {active && (
                          <p className="text-[11px] mt-0.5" style={{color:gold}}>Running…</p>
                        )}
                      </div>
                      {done && (
                        <span className="text-[10px] font-bold pt-1 shrink-0"
                          style={{color:done.ok?green:red}}>
                          {done.ok?"PASS":"FAIL"}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}

        {/* ══ RESULT ══ */}
        {mode==="result" && cred && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-[11px] font-mono" style={{color:muted}}>
                  verify.eduxcert.eu/c/{cred.code}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={()=>{setCopiedCode(true);setTimeout(()=>setCopiedCode(false),2000);}}
                    className="flex items-center gap-1.5 text-[11px] font-medium"
                    style={{color:copiedCode?green:muted}}>
                    <CopyIcon size={12}/>
                    {copiedCode?"Copied!":"Copy link"}
                  </button>
                  <span style={{color:border}}>·</span>
                  <button onClick={reset} className="text-[11px] font-medium" style={{color:muted}}>
                    Verify another
                  </button>
                </div>
              </div>
              <p className="text-[11px]" style={{color:muted}}>
                Verified {new Date().toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})} UTC
              </p>
            </div>

            <ResultPanel cred={cred} steps={engine.steps}/>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t mt-16 py-8" style={{borderColor:border}}>
        <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]"
          style={{color:muted}}>
          <span>© 2025 Eduxcert · Public Verifier Widget</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:underline">Privacy policy</a>
            <a href="#" className="hover:underline">EBSI Trust Framework</a>
            <a href="#" className="hover:underline" style={{color:gold}}>
              Integrate this widget →
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
