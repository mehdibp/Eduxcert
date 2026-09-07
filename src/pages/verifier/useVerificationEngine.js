import { useState, useEffect, useRef } from "react";
import { VSTEPS } from "../../data/verifier";


// VERIFICATION ENGINE (simulated) ------------------------------------------------------
export default function useVerificationEngine(cred) {
  const [step, setStep]       = useState(0);   // 0=idle 1-4=running 5=done
  const [steps, setSteps]     = useState([]);  // completed step results
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
