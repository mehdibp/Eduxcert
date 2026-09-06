import { useState } from "react";
import { ink, inkSoft, gold, goldLight, pageColor, white, muted } from "../../styles/colors";
import { SealMark } from "../../components/icons/icons";
import Logo from '../../assets/react.svg'


// --------------------------------------------------------------------------------------
export default function LoginPage({onLogin}) {
  const [email,setEmail]=useState(""),  [pw,setPw]=useState(""), [show,setShow]=useState(false);

  return (

    <div className="min-h-screen w-full flex items-stretch" style={{backgroundColor:pageColor}}>
      <div className="w-full grid lg:grid-cols-2">
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden px-14 py-12"
          style={{background:`linear-gradient(160deg,${ink} 0%,${inkSoft} 100%)`}}>
          <div className="flex items-center gap-3">
            <img className="w-7 h-7 shrink-0" src={Logo}/>
            <span className="text-white font-serif text-lg tracking-wide">Eduxcert</span>
          </div>
          <div className="relative flex-1 flex items-center">
            <div className="relative w-full" style={{height:280}}>
              {[{r:-9,y:18,t:"Bachelor of Science, Computer Engineering",id:"EDX-7741-KX02",l:2,top:6},
                {r:6, y:0, t:"Professional Certificate, Data Analysis",   id:"EDX-3120-QW88",l:24,top:0}].map((c,i)=>(
                <div key={i} className="absolute w-56 rounded-lg p-4 shadow-2xl"
                  style={{backgroundColor:white,left:`${c.l*4}px`,top:`${c.top*4}px`,
                    transform:`rotate(${c.r}deg) translateY(${c.y}px)`,
                    boxShadow:"0 20px 40px -10px rgba(0,0,0,0.45)"}}>
                  <div className="absolute top-0 right-0 w-8 h-8"
                    style={{background:`linear-gradient(135deg,transparent 50%,${gold} 50%)`,borderRadius:"0 6px 0 0"}}/>
                  <p className="text-[9px] font-semibold tracking-[0.18em] uppercase" style={{color:gold}}>Verified Credential</p>
                  <p className="mt-2 font-serif text-sm" style={{color:ink}}>{c.t}</p>
                  <p className="mt-3 text-[11px]" style={{color:"#475569"}}>A. Novak</p>
                  <p className="mt-2 font-mono text-[10px] tracking-wide" style={{color:"#94A3B8"}}>{c.id}</p>
                </div>
              ))}
              <div className="absolute" style={{left:8,top:150,filter:"drop-shadow(0 10px 24px rgba(0,0,0,0.5))"}}>
                <SealMark size={72}/>
              </div>
            </div>
          </div>
          <div>
            <div className="h-px w-full mb-5" style={{backgroundImage:`radial-gradient(${goldLight} 1px,transparent 1.5px)`,backgroundSize:"10px 1px",opacity:0.6}}/>
            <h1 className="font-serif text-3xl text-white leading-snug max-w-sm">Every credential, traceable to its source.</h1>
            <p className="mt-3 text-sm max-w-sm" style={{color:"#A9B4CC"}}>Your transcripts, certificates and degrees — issued by your institution, held by you, verifiable by anyone.</p>
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 sm:px-16 py-12" style={{backgroundColor:white}}>
          <div className="w-full max-w-sm mx-auto">
            <div className="lg:hidden flex items-center gap-3 mb-10">
              <img className="w-7 h-7 shrink-0" src={Logo}/>
              <span className="font-serif text-lg tracking-wide" style={{color:ink}}>Eduxcert</span>
            </div>
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase mb-2" style={{color:gold}}>
              Student Portal · University of Ljubljana
            </p>
            <h2 className="font-serif text-2xl mb-1" style={{color:ink}}>Sign in to your record</h2>
            <p className="text-sm mb-8" style={{color:muted}}>Use your institutional account to continue.</p>

            <div className="space-y-5">
              {[{label:"Institutional email",type:show?"text":"email",val:email,set:setEmail,ph:"name@university.edu"},
                {label:"Password",type:show?"text":"password",val:pw,set:setPw,ph:"••••••••"}].map((f,i)=>(
                <div key={i}>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs font-medium" style={{color:"#334155"}}>{f.label}</label>
                    {i===1 && <button className="text-xs font-medium" style={{color:gold}}>Forgot password?</button>}
                  </div>
                  <div className="relative">
                    <input type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                      className="w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors"
                      style={{borderColor:"#CBD5E1",color:ink,paddingRight:i===1?64:14}}
                      onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor="#CBD5E1"}/>
                    {i===1 && <button onClick={()=>setShow(s=>!s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium" style={{color:muted}}>
                      {show?"Hide":"Show"}
                    </button>}
                  </div>
                </div>
              ))}
              <button onClick={onLogin}
                className="w-full rounded-md py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{backgroundColor:ink}}>
                Sign in
              </button>
            </div>

            <div className="flex items-center gap-3 my-7">
              <div className="h-px flex-1" style={{backgroundColor:"#E2E8F0"}}/>
              <span className="text-xs" style={{color:"#94A3B8"}}>or</span>
              <div className="h-px flex-1" style={{backgroundColor:"#E2E8F0"}}/>
            </div>
            <button onClick={onLogin}
              className="w-full rounded-md py-2.5 text-sm font-medium border flex items-center justify-center gap-2"
              style={{borderColor:"#CBD5E1",color:ink}}>
              <SealMark size={16}/> Continue with EUDI Wallet
            </button>
            <p className="mt-9 text-xs text-center" style={{color:"#94A3B8"}}>
              Protected by your institution's identity provider.
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}

