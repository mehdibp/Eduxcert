import { useState } from "react";

import {ink, gold, goldBg, goldBdr, pageColor, white, muted, border, green, amber, violet, violetBg } from "../../styles/colors";
import { TENANT } from "../../data/admin";

import PageHeader from "../../components/commen/PageHeader";
import {Button}   from "../../components/commen/Button";
import Toast      from "../../components/commen/Toast";


// --------------------------------------------------------------------------------------
export default function ConfigPage(){
  const [toast, setToast] = useState(null);
  const [brand, setBrand] = useState({primary:"#0F1729",accent:"#B08D57",logo:"UL",name:"University of Ljubljana"});
  const [integrations, setIntegrations] = useState([
    {id:"moodle",name:"Moodle LTI",  desc:"Course sync + grade push",   enabled:true,  status:"connected"},
    {id:"sis",   name:"SIS",         desc:"Student information system",  enabled:true,  status:"connected"},
    {id:"hr",    name:"HR System",   desc:"Staff provisioning via SCIM", enabled:false, status:"not connected"},
    {id:"boni",  name:"Boni",        desc:"Student benefits connector",  enabled:false, status:"not connected"},
  ]);
  const showToast = (msg, ok=true) => { setToast({msg, ok}); setTimeout(() => setToast(null), 3000); };

  return (
    <div className="space-y-6">
      <PageHeader rootLabel={"Admin Zupan"} crumb="Tenant Config" title="Tenant Configuration"
        subtitle="Branding · integrations · credential templates"/>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Branding */}
        <div className="rounded-xl p-6 space-y-5" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{color:ink}}>Branding</p>
            <p className="text-[11px]" style={{color:muted}}>Applied to student portal login page and credential PDF headers.</p>
          </div>

          {/* Preview */}
          <div className="rounded-xl overflow-hidden" style={{border:`1px solid ${border}`}}>
            <div className="px-4 py-3 flex items-center gap-3"
              style={{backgroundColor:brand.primary}}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{backgroundColor:brand.accent,color:white}}>
                {brand.logo}
              </div>
              <span className="text-white font-serif text-sm">{brand.name}</span>
            </div>
            <div className="px-4 py-3" style={{backgroundColor:pageColor}}>
              <p className="text-[11px]" style={{color:muted}}>Student portal preview</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {label:"Institution name",key:"name",  type:"text"},
              {label:"Logo abbreviation",key:"logo", type:"text"},
              {label:"Primary colour",  key:"primary",type:"color"},
              {label:"Accent colour",   key:"accent", type:"color"},
            ].map(({label,key,type})=>(
              <div key={key} className="flex items-center justify-between gap-4">
                <label className="text-xs font-medium shrink-0" style={{color:"#334155"}}>{label}</label>
                {type==="color"
                  ? <div className="flex items-center gap-2">
                      <input type="color" value={brand[key]}
                        onChange={e=>setBrand(b=>({...b,[key]:e.target.value}))}
                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"/>
                      <span className="text-xs font-mono" style={{color:muted}}>{brand[key]}</span>
                    </div>
                  : <input type="text" value={brand[key]}
                      onChange={e=>setBrand(b=>({...b,[key]:e.target.value}))}
                      className="flex-1 max-w-xs rounded-lg border px-3 py-1.5 text-sm outline-none"
                      style={{borderColor:border,color:ink}}
                      onFocus={e=>e.target.style.borderColor=gold}
                      onBlur={e=>e.target.style.borderColor=border}/>
                }
              </div>
            ))}
            <Button onClick={()=>showToast("Branding saved and propagated.")} color={white} backgroundColor={ink}
                    className="text-sm font-semibold w-full py-2.5 rounded-xl!">
              Save branding
            </Button>
          </div>
        </div>

        {/* Integrations */}
        <div className="rounded-xl p-6 space-y-4" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{color:ink}}>Integrations</p>
            <p className="text-[11px]" style={{color:muted}}>Connect your existing systems via webhooks and LTI.</p>
          </div>
          {integrations.map(ig=>(
            <div key={ig.id} className="flex items-center gap-4 p-4 rounded-xl"
              style={{backgroundColor:pageColor,border:`1px solid ${border}`}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                style={{backgroundColor:ig.enabled?violetBg:"#F1F5F9",color:ig.enabled?violet:muted}}>
                {ig.name.slice(0,2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold" style={{color:ink}}>{ig.name}</p>
                <p className="text-[11px]" style={{color:muted}}>{ig.desc}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-semibold" style={{color:ig.enabled?green:muted}}>
                  {ig.status}
                </span>
                <button 
                  onClick={()=>{
                    setIntegrations(is=>is.map(x=>x.id===ig.id?{...x,enabled:!x.enabled,status:!x.enabled?"connected":"not connected"}:x));
                    showToast(`${ig.name} ${ig.enabled?"disconnected":"connected"}.`);
                  }}
                  className="relative w-10 h-5 rounded-full transition-colors"
                  style={{backgroundColor:ig.enabled?green:border}}>
                  <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                    style={{transform:ig.enabled?"translateX(2px)":"translateX(-18px)"}}/>
                </button>
              </div>
            </div>
          ))}

          {/* DID info */}
          <div className="rounded-xl p-4 mt-2" style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{color:amber}}>Tenant DID</p>
            <p className="text-[11px] font-mono break-all" style={{color:ink}}>{TENANT.did}</p>
            <p className="text-[10px] mt-2" style={{color:muted}}>Registered in EBSI Trusted Issuers Registry. Rotate keys via Vault.</p>
          </div>
        </div>
      </div>
      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
