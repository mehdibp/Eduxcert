import { useState } from "react";
import { ink, inkSoft, gold, goldBg, goldBdr, pageColor, white, muted, border, green, greenBg, amber, amberBg, violet, violetBg } from "../../styles/colors";
import { CheckIcon, DiplomaIcon, DownloadIcon, SealCredIcon, ShareIcon, SpinIcon, WalletIcon, XIcon } from "../../components/icons/icons";
import { CRED_DATA } from "../../data/student"

import PageHeader from "../../components/commen/PageHeader"
import { Badge }  from "../../components/commen/Badge"
import { Button } from "../../components/commen/Button"


// --------------------------------------------------------------------------------------
function CredTypeStyle(type){
  if(type==="degree") return{Icon:DiplomaIcon, bg:violetBg, color:violet};
  return{Icon:SealCredIcon, bg:goldBg, color:gold};
}

// --------------------------------------------------------------------------------------
function CredentialModal({cred,onClose}){
  const [tab,setTab] = useState("overview");
  const [fields,setFields] = useState(cred.fields);
  const [showV,setShowV] = useState(false);
  const [copied,setCopied] = useState(false);
  const [vstep,setVstep] = useState(0);
  const {Icon,bg,color} = CredTypeStyle(cred.type);
  const toggle=id=>setFields(p=>p.map(f=>f.id===id?{...f,shown:!f.shown}:f));

  return <>
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{backgroundColor:"rgba(15,23,41,0.55)",backdropFilter:"blur(3px)"}}>
      <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{backgroundColor:white,maxHeight:"92vh"}}>
        <div className="px-6 py-5 flex items-start gap-4 shrink-0" style={{backgroundColor:inkSoft}}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor:bg}}>
            <Icon size={24} color={color}/>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{color:goldBg}}>{cred.type}</p>
            <h2 className="font-serif text-lg text-white leading-snug">{cred.title}</h2>
            <p className="text-xs mt-0.5" style={{color:"#94A3B8"}}>{cred.issuer}</p>
          </div>
          <button onClick={onClose} className="mt-1 p-1.5 rounded-lg hover:bg-white/10 shrink-0"><XIcon/></button>
        </div>

        <div className="flex border-b shrink-0" style={{borderColor:border}}>
          {["overview","share","verify"].map(t=><button key={t} onClick={()=>setTab(t)}
            className="flex-1 py-3 text-xs font-semibold capitalize"
            style={{color:tab===t?gold:muted,borderBottom:tab===t?`2px solid ${gold}`:"2px solid transparent"}}>
            {t==="overview"?"Overview":t==="share"?"Share":"Verify"}
          </button>)}
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {tab==="overview"&&<div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[["Issued on",new Date(cred.issuedOn).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})],
                ["ECTS",`${cred.ects} credits`],["Grade",cred.grade||"—"],["Programme",cred.programme]].map(([k,v])=>(
                <div key={k} className="rounded-xl p-3.5" style={{backgroundColor:pageColor}}>
                  <p className="text-[10px] uppercase tracking-wider font-semibold mb-1" style={{color:muted}}>{k}</p>
                  <p className="text-sm font-medium" style={{color:ink}}>{v}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4" style={{border:`1px solid ${border}`}}>
              <p className="text-[10px] uppercase tracking-wider font-semibold mb-3" style={{color:muted}}>Cryptographic proof</p>
              {[["Algorithm",cred.algorithm],["Key ID",cred.keyId],["EBSI tx",cred.ebsiTxHash]].map(([k,v])=>(
                <div key={k} className="flex justify-between py-1.5 border-b last:border-0 text-xs" style={{borderColor:border}}>
                  <span style={{color:muted}}>{k}</span><span className="font-mono text-[10px]" style={{color:ink}}>{v}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl" style={{backgroundColor:greenBg}}>
              <CheckIcon color={green}/><p className="text-xs font-medium" style={{color:green}}>Signature valid · Not revoked · Issuer in EBSI TIR</p>
            </div>
          </div>}

          {tab==="share"&&<div className="space-y-6">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-2xl" style={{backgroundColor:pageColor,border:`1px solid ${border}`}}>
                <img src="src/assets/QR code.webp"/>
              </div>
              <p className="text-xs text-center" style={{color:muted}}>Anyone can scan this QR to verify without an account.</p>
              <Button onClick={()=>{setCopied(true); setTimeout(()=>setCopied(false),2000);}}
                      color={copied?green:amber} backgroundColor={copied?greenBg:goldBg} border={`1px solid ${copied?greenBdr:goldBdr}`}
                      className="text-xs font-semibold px-4 py-2 gap-2">
                {copied?<><CheckIcon size={12} color={green}/> Link copied!</>:<><ShareIcon size={12}/> Copy verify link</>}
              </Button>
            </div>
            <div>
              <p className="text-xs font-semibold mb-1" style={{color:ink}}>Selective disclosure <span style={{color:muted,fontWeight:400}}>(SD-JWT)</span></p>
              <p className="text-[11px] mb-3" style={{color:muted}}>Choose which attributes to reveal when presenting this credential.</p>
              {fields.map(f=>(
                <div key={f.id} className="flex items-center justify-between py-2.5 border-b" style={{borderColor:border}}>
                  <div>
                    <p className="text-xs font-medium" style={{color:ink}}>{f.label}</p>
                    <p className="text-[11px] mt-0.5" style={{color:f.shown?muted:"transparent",userSelect:"none"}}>{f.shown?f.value:"•••••••"}</p>
                  </div>
                  <button onClick={()=>toggle(f.id)} className="relative w-9 h-5 rounded-full shrink-0" style={{backgroundColor:f.shown?green:border}}>
                    <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                      style={{transform:f.shown?"translateX(0px)":"translateX(-17px)"}}/>
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button color={ink} backgroundColor={white} border={`1px solid ${border}`}
                      className="text-xs font-semibold py-2.5 gap-2 rounded-xl!">
                <DownloadIcon size={14}/> Download PDF
              </Button>
      
              <Button color={white} backgroundColor={inkSoft}
                      className="text-xs font-semibold py-2.5 gap-2 rounded-xl!">
                <WalletIcon size={14}/> Add to EUDI Wallet
              </Button>
            </div>
          </div>}

          {tab==="verify"&&<div className="space-y-4">
            {!showV
              ? <>
                  <div className="rounded-xl p-4" style={{backgroundColor:pageColor}}>
                    <p className="text-xs font-semibold mb-2" style={{color:ink}}>Public verify link</p>
                    <p className="text-[11px] font-mono break-all" style={{color:muted}}>{cred.verifyUrl}</p>
                  </div>
                  <Button onClick={()=>{setShowV(true);setVstep(0);}} color={white} backgroundColor={ink}
                          className="text-sm font-semibold w-full py-2.5 rounded-xl">
                    Run verification demo
                  </Button>
                </>
              : vstep<4
              ? <>
                  <p className="text-xs" style={{color:muted}}>Simulating verification for <span className="font-mono font-semibold" style={{color:ink}}>{cred.code}</span></p>
                  <ol className="space-y-3">
                    {[["Reading credential JSON…","Parsing W3C VC structure"],["Verifying Ed25519 signature…","Checking JWS against issuer key"],["Checking revocation status…","CDN-cached status-list 2021"],["Verifying trust anchor…","DID found in EBSI TIR"]].map(([l,d],i)=>(
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0">
                          {i<vstep?<CheckIcon/>:i===vstep?<SpinIcon/>:<span className="w-3.5 h-3.5 rounded-full block" style={{border:`1.5px solid ${border}`}}/>}
                        </span>
                        <div>
                          <p className="text-xs font-medium" style={{color:i<=vstep?ink:muted}}>{l}</p>
                          {i<vstep&&<p className="text-[10px] mt-0.5" style={{color:muted}}>{d}</p>}
                        </div>
                      </li>
                    ))}
                  </ol> 
                  <Button onClick={()=>setVstep(s=>s+1)} color={white} backgroundColor={ink}
                          className="text-xs font-semibold w-full py-2.5">
                    {vstep===0?"Start verification":vstep<3?"Next step":"Complete"}
                  </Button>
                </>
              : <div className="flex flex-col items-center text-center gap-3 py-2">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{backgroundColor:greenBg}}>
                    <CheckIcon size={24} color={green}/>
                  </div>
                  <p className="font-serif text-xl" style={{color:green}}>Valid</p>
                  <p className="text-xs" style={{color:muted}}>Authentic, unrevoked, and issued by a trusted institution in EBSI.</p>
                  <Button onClick={()=>{setShowV(false); setVstep(0);}} color={white} backgroundColor={ink}
                          className="text-xs font-semibold w-full py-2.5">
                    Done
                  </Button>
              </div>
            }
          </div>}
        </div>
      </div>
    </div>
  </>;
}

// --------------------------------------------------------------------------------------
export default function CredentialsPage(){
  const [sel,setSel] = useState(null);
  const active=CRED_DATA.filter(c=>c.status==="active");
  const pending=CRED_DATA.filter(c=>c.status==="pending");

  return (
    <div className="min-h-screen" style={{backgroundColor:pageColor}}>
      <PageHeader rootLabel={"Andreja Novak"} crumb="Credentials" title="My Credentials"
        subtitle="Digitally signed · verifiable by anyone" 
        action={<div className="flex gap-4 text-xs" style={{color:muted}}>
                  <span><span className="font-bold" style={{color:ink}}>{active.length}</span> active </span>
                  <span><span className="font-bold" style={{color:amber}}>{pending.length}</span> pending </span>
                </div>}/>

      <div className="px-1 py-7 space-y-8">
        <section>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{color:muted}}>Issued credentials</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {active.map(c=>{
              const {Icon,bg,color}=CredTypeStyle(c.type);
              return <button key={c.id} onClick={()=>setSel(c)}
                className="text-left rounded-2xl p-5 flex flex-col gap-4 hover:shadow-lg transition-shadow"
                style={{backgroundColor:white,border:`1px solid ${border}`}}>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor:bg,border:`1px solid ${goldBdr}`}}>
                    <Icon size={22} color={color}/>
                  </div>
                  <Badge color={green} backgroundColor={greenBg}
                         className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase"> Active </Badge>
                  </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{color}}>{c.type}</p>
                  <h3 className="text-base font-serif" style={{color:ink}}>{c.title}</h3>
                  <p className="text-xs mt-1" style={{color:muted}}>{c.issuer}</p>
                </div>
                <div className="border-t pt-3 flex justify-between" style={{borderColor:border}}>
                  <span className="font-mono text-[10px]" style={{color:muted}}>{c.code}</span>
                  <span className="text-xs" style={{color:muted}}>{new Date(c.issuedOn).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}</span>
                </div>
              </button>;
            })}
          </div>
        </section>
        {pending.length>0&&<section>
          <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{color:muted}}>Pending</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {pending.map(c=>{
              const {Icon,bg,color}=CredTypeStyle(c.type);
              return <div key={c.id} className="rounded-2xl p-5 flex flex-col gap-4 opacity-75"
                style={{backgroundColor:white,border:`1px solid ${border}`}}>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor:bg}}><Icon size={22} color={color}/></div>
                  <Badge color={amber} backgroundColor={amberBg}
                         className="text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full uppercase"> Pending </Badge>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{color}}>{c.type}</p>
                  <h3 className="text-base font-serif" style={{color:ink}}>{c.title}</h3>
                  <p className="text-xs mt-1" style={{color:muted}}>{c.issuer}</p>
                </div>
                <p className="text-xs italic" style={{color:muted}}>Awaiting award</p>
              </div>;
            })}
          </div>
        </section>}
        <div className="rounded-2xl p-5 flex gap-4 items-start" style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
          <SealCredIcon size={22}/>
          <div>
            <p className="text-sm font-semibold mb-1" style={{color:ink}}>Your credentials are portable</p>
            <p className="text-xs leading-relaxed" style={{color:muted}}>Each credential is a W3C Verifiable Credential signed by your institution's DID. Share via QR, download as PDF, or add to your EUDI Wallet — with SD-JWT selective disclosure.</p>
          </div>
        </div>
      </div>
      {sel&&<CredentialModal cred={sel} onClose={()=>setSel(null)}/>}
    </div>
  );

}