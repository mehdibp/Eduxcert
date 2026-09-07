import { useState } from "react";

import {ink, gold, goldBg, goldBdr, pageColor, white, muted, border, 
        green, greenBg, amber, violet, violetBg, violetBdr, blue, blueBg } from "../../styles/colors";
import { CheckIcon, ShieldIcon } from "../../components/icons/icons";
import Logo from '../../assets/react.svg';

import {Button} from "../../components/commen/Button";


// --------------------------------------------------------------------------------------
export default function KYCPage({onComplete}){
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({company:"", reg:"", country:"Slovenia", contact:"", email:""});

  const steps = ["Company details","Identity verification","EUDI Org Wallet","Confirm"];

  return(
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor:pageColor}}>
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img className="w-7 h-7 shrink-0" src={Logo}/>
            <span className="font-serif text-xl tracking-wide" style={{color:ink}}>Eduxcert</span>
          </div>
          <h1 className="font-serif text-2xl mb-1" style={{color:ink}}>Register as trusted issuer</h1>
          <p className="text-sm" style={{color:muted}}>Employer onboarding · KYC + EUDI Org Wallet</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center mb-8">
          {steps.map((s,i)=>(
            <div key={i} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{backgroundColor:i+1<step?green:i+1===step?ink:border,
                    color:i+1<=step?white:muted}}>
                  {i+1<step?<CheckIcon size={14} color={white}/>:i+1}
                </div>
                <p className="text-[10px] mt-1 text-center w-16 leading-tight" style={{color:i+1===step?ink:muted}}>{s}</p>
              </div>
              {i<steps.length-1&&<div className="flex-1 h-px mx-1 mb-4"
                style={{backgroundColor:i+1<step?green:border}}/>}
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-7 space-y-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          {step===1&&<>
            <h3 className="font-serif text-lg" style={{color:ink}}>Company details</h3>
            {[{l:"Company name",k:"company",ph:"e.g. Celtra Technologies d.o.o."},{l:"Company registration no.",k:"reg",ph:"e.g. 1234567000"},{l:"Contact name",k:"contact",ph:"HR Manager"},{l:"Contact email",k:"email",ph:"hr@company.com"}].map(({l,k,ph})=>(
              <div key={k}>
                <label className="block text-xs font-medium mb-1.5" style={{color:"#334155"}}>{l}</label>
                <input value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={ph}
                  className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none"
                  style={{borderColor:border,color:ink}}
                  onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
              </div>
            ))}
          </>}

          {step===2&&<>
            <h3 className="font-serif text-lg" style={{color:ink}}>Identity verification</h3>
            <p className="text-sm" style={{color:muted}}>Upload company registration certificate and VAT number for KYC.</p>
            {[["Company registration certificate","PDF / image"],["VAT certificate","PDF / image"],["Authorised signatory ID","Passport or ID card"]].map(([l,f])=>(
              <div key={l} className="flex items-center justify-between p-4 rounded-xl"
                style={{backgroundColor:pageColor,border:`1px solid ${border}`}}>
                <div>
                  <p className="text-xs font-semibold" style={{color:ink}}>{l}</p>
                  <p className="text-[11px]" style={{color:muted}}>{f}</p>
                </div>
                <Button color={amber} backgroundColor={goldBg} border={`1px solid ${goldBdr}`}
                        className="text-xs font-semibold px-3 py-1.5">
                  Upload
                </Button>
              </div>
            ))}
          </>}

          {step===3&&<>
            <h3 className="font-serif text-lg" style={{color:ink}}>EUDI Organisation Wallet</h3>
            <p className="text-sm" style={{color:muted}}>Connect your EU Digital Identity Organisation Wallet to become a trusted issuer on EBSI.</p>
            <div className="rounded-xl p-4" style={{backgroundColor:blueBg,border:`1px solid #BFDBFE`}}>
              <p className="text-xs font-semibold mb-1" style={{color:blue}}>What this means</p>
              <p className="text-[11px] leading-relaxed" style={{color:blue}}>
                Your company DID will be registered in the EBSI Trusted Issuers Registry.
                Work-history credentials you issue will carry Ed25519 cryptographic signatures verifiable by anyone, anywhere.
              </p>
            </div>
            <Button color={violet} backgroundColor={violetBg} border={`1px solid ${violetBdr}`}
                    className="text-sm font-semibold py-3 rounded-xl! w-full">
              Connect via eIDAS 2.0 Org Wallet →
            </Button>
          </>}

          {step===4&&<>
            <h3 className="font-serif text-lg" style={{color:ink}}>You're all set!</h3>
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{backgroundColor:greenBg}}>
              <ShieldIcon size={20} color={green}/>
              <div>
                <p className="text-xs font-semibold" style={{color:green}}>Trust status: Active</p>
                <p className="text-[11px]" style={{color:green}}>DID registered in EBSI TIR · KYC approved</p>
              </div>
            </div>
            {[["Company","Celtra Technologies d.o.o."],["DID","did:ebsi:celtra-tech-2024-01"],["KYC date","2024-11-03"],["Plan","Workforce"]].map(([k,v])=>(
              <div key={k} className="flex justify-between py-2 border-b last:border-0 text-xs" style={{borderColor:border}}>
                <span style={{color:muted}}>{k}</span><span className="font-semibold" style={{color:ink}}>{v}</span>
              </div>
            ))}
          </>}

          <Button onClick={()=>step<4?setStep(s=>s+1):onComplete()} color={white} backgroundColor={ink}
                  className="text-sm font-semibold py-3 rounded-xl! w-full transition-opacity hover:opacity-90">
            {step<4?"Continue →":"Enter Employer Portal"}
          </Button>
        </div>
      </div>
    </div>
  );

}
