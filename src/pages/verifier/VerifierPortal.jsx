import { useState, useEffect } from "react";
import { ink, inkSoft, gold, goldBg, goldBdr, goldTra, pageColor, white, muted, border, 
        green, greenBg, amber, violet, violetBg, violetBdr, red, redBg } from "../../styles/colors";
import {CheckIcon, XCircleIcon, SpinIcon, ScanIcon, CopyIcon, ListPlusIcon } from "../../components/icons/icons";
import { SCENARIOS, VSTEPS } from "../../data/verifier"
import Logo from '../../assets/react.svg'

import {Badge}  from "../../components/commen/Badge"
import {Button} from "../../components/commen/Button"

import useVerificationEngine from "./useVerificationEngine";
import ResultPanel from "./ResultPanel";


// --------------------------------------------------------------------------------------
export default function VerifierPortal() {
  const [input,      setInput]      = useState("");
  const [cred,       setCred]       = useState(null);
  const [mode,       setMode]       = useState("landing"); // landing | qr | manual | verifying | result
  const [scenario,   setScenario]   = useState("valid");
  const [copiedCode, setCopiedCode] = useState(false);

  const engine = useVerificationEngine(cred || SCENARIOS.valid);
  useEffect( ()=>{ if(engine.done && mode==="verifying") setMode("result"); } , [engine.done] );
  const reset = () => { setMode("landing"); setCred(null); setInput(""); engine.reset(); };

  const handleVerify = (sc=scenario) => {
    const c = SCENARIOS[sc];
    setCred(c);
    setMode("verifying");
    engine.reset();
    setTimeout(()=>engine.start(), 100);
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
            <img className="w-7 h-7 shrink-0" src={Logo}/>
            <div>
              <span className="text-white font-serif text-base tracking-wide"> Eduxcert </span>
              <Badge color={gold} backgroundColor={goldTra}
                     className="ml-2 text-[11px] px-2 py-0.5 rounded-full"> Public Verifier </Badge>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px]" style={{color:"#94A3B8"}}>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:green}}/> No login required </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:green}}/> Offline-capable </span>
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
                <Badge color={amber} backgroundColor={goldBg} border={`1px solid ${goldBdr}`}
                       className="text-xs font-semibold px-3 py-1.5 rounded-full self-start"> Recommended </Badge>
              </button>

              <button onClick={()=>setMode("manual")}
                className="rounded-2xl p-7 flex flex-col items-center gap-4 text-left hover:shadow-lg transition-shadow"
                style={{backgroundColor:white,border:`2px solid ${border}`}}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{backgroundColor:violetBg}}>
                  <ListPlusIcon size={36} color={violet}/>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{color:ink}}>Enter verify link</p>
                  <p className="text-xs mt-1" style={{color:muted}}>
                    Paste a verification URL or credential code (EDX-XXXX-XXXX).
                  </p>
                </div>
                <Badge color={violet} backgroundColor={violetBg} border={`1px solid ${violetBdr}`}
                       className="text-xs font-semibold px-3 py-1.5 rounded-full self-start"> Also available </Badge>
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
                  <Button key={id} onClick={()=>setScenario(id)} 
                          color={scenario===id?col:white} backgroundColor={scenario===id?col+"22":white+"10"} border={`1px solid ${scenario===id?col:white+"15"}`}
                          className="text-xs font-semibold px-3 py-2 transition-all">
                    {label}
                  </Button>
                ))}
              </div>
              <Button onClick={()=>handleVerify(scenario)}
                      color={white} backgroundColor={gold}
                      className="text-sm font-semibold py-3 rounded-xl! w-full transition-opacity hover:opacity-90">
                Run verification demo →
              </Button>
            </div>
          </div>
        )}

        {/* ══ QR MODE ══ */}
        {mode==="qr" && (
          <div className="space-y-6">
            <Button onClick={reset} color={muted} className="text-xs gap-1.5"> ← Back </Button>
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
                    <Badge color={col} backgroundColor={col+"18"}> 
                      {sc==="valid"?"Valid":sc==="revoked"?"Revoked":"Unknown issuer"}
                    </Badge>
                  </button>
                ))}
              </div>

              <Button onClick={()=>setMode("manual")} color={muted} className="text-xs font-medium"> Or enter a link manually → </Button>
            </div>
          </div>
        )}

        {/* ══ MANUAL INPUT ══ */}
        {mode==="manual" && (
          <div className="space-y-6">
            <Button onClick={reset} color={muted} className="text-xs gap-1.5"> ← Back </Button>
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
                  <Button onClick={()=>{
                            const sc = input.includes("7700")?"revoked":input.includes("0000")?"unknown":"valid";
                            setScenario(sc); handleVerify(sc);
                          }} 
                          color={white} backgroundColor={ink}
                          className="text-sm font-semibold px-5 py-2.5">
                    Verify
                  </Button>
                </div>
                <p className="text-[11px] mt-2" style={{color:muted}}>
                  Example codes to try: {" "}
                  <Button onClick={()=>setInput("EDX-4401-DB03")} color={gold}  className="font-mono underline"> EDX-4401-DB03 </Button> {" · "}
                  <Button onClick={()=>setInput("EDX-7700-XX11")} color={red}   className="font-mono underline"> EDX-7700-XX11 </Button> {" · "}
                  <Button onClick={()=>setInput("EDX-0000-UNK9")} color={amber} className="font-mono underline"> EDX-0000-UNK9 </Button>
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
                  <Button onClick={()=>{setCopiedCode(true); setTimeout(()=>setCopiedCode(false),2000);}} 
                          color={copiedCode?green:muted} className="text-[11px] font-medium flex gap-1.5">
                    <CopyIcon size={12}/> {copiedCode?"Copied!":"Copy link"}
                  </Button>
                  <span style={{color:border}}>·</span>
                  <Button onClick={reset} color={muted} className="text-[11px] font-medium"> Verify another </Button>
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
