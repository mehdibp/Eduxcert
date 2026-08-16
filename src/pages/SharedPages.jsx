import { useState } from "react";
import {ink, inkSoft, gold, goldBg, goldBdr, goldTra,
        pageColor, white, muted, border, 
        green, greenBg, amber, amberBg, violet, violetBg, violetBdr, blue, blueBg, red, redBg, redBdr, teal, tealBg} from "../styles/colors";

import {UserIcon, BellIcon, CenterDotIcon, DownloadIcon, GiftIcon, ShieldIcon, WalletIcon, 
        KeyIcon, TrashIcon, CheckIcon, XIcon, ExternalIcon } from "../components/icons/icons"

import { USER, CONSENTS, NOTIFICATIONS, NOTIF_PREFS, BENEFITS } from "../data/shared"
import Logo from '../assets/react.svg'

import {Badge} from "../components/commen/Badge"
import {Button} from "../components/commen/Button"
import ToggleSwitch from "../components/commen/ToggleSwitch"
import StatCard from "../components/commen/StatCard"
import Toast from "../components/commen/Toast"

// ════════════════════════════════════════════════
// SHARED UI
// ════════════════════════════════════════════════
function SectionCard({title, children, action}){
  return(
    <div className="rounded-2xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
      <div className="px-6 py-4 flex items-center justify-between border-b" style={{borderColor:border}}>
        <p className="text-sm font-semibold" style={{color:ink}}>{title}</p>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// notification type config
const N_TYPE = {
  grade:      {dot:amber,  label:"Grade"     },
  appeal:     {dot:red,    label:"Appeal"    },
  credential: {dot:gold,   label:"Credential"},
  exam:       {dot:violet, label:"Exam"      },
  ects:       {dot:green,  label:"ECTS"      },
  roadmap:    {dot:blue,   label:"Roadmap"   },
  enrol:      {dot:teal,   label:"Enrolment" },
  benefit:    {dot:teal,   label:"Benefit"   },
};


// ════════════════════════════════════════════════
// PROFILE PAGE
// ════════════════════════════════════════════════
function ProfilePage(){
  const [user,setUser]       = useState(USER);
  const [consents,setConsents]= useState(CONSENTS);
  const [editMode,setEditMode]= useState(false);
  const [form,setForm]       = useState({name:USER.name,email:USER.email,locale:USER.locale});
  const [delModal,setDelModal]= useState(false);
  const [toast,setToast]     = useState(null);
  const [tab,setTab]         = useState("account");

  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};

  const saveProfile=()=>{
    setUser(u=>({...u,...form}));
    setEditMode(false);
    showToast("Profile saved.");
  };
  const toggleConsent=(id)=>{
    setConsents(cs=>cs.map(c=>c.id===id&&!c.required?{...c,granted:!c.granted}:c));
    showToast("Consent preference updated.");
  };

  const TABS=[
    {id:"account",  label:"Account"},
    {id:"privacy",  label:"Privacy & Consent"},
    {id:"security", label:"Security"},
    {id:"did",      label:"Digital Identity"},
  ];

  return(
    <div className="min-h-screen" style={{backgroundColor:pageColor}}>
      {/* Header */}
      <div className="pt-8 pb-6 px-6 lg:px-10" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs mb-4" style={{color:muted}}>
            <span style={{color:ink}}>{user.name}</span> / Profile
          </p>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0"
              style={{backgroundColor:ink}}>
              {user.initials}
            </div>
            <div>
              <h1 className="font-serif text-2xl" style={{color:ink}}>{user.name}</h1>
              <p className="text-sm mt-0.5" style={{color:muted}}>
                {user.programme} · {user.institution}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge color={green} backgroundColor={greenBg}> Active </Badge>
                {user.mfa && <Badge color={teal} backgroundColor={tealBg}> MFA enabled </Badge> }
                {user.walletConnected && <Badge color={violet} backgroundColor={violetBg}> EUDI Wallet linked </Badge> }
              </div>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 mt-6">
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                className="px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors"
                style={{backgroundColor:tab===t.id?pageColor:"transparent",color:tab===t.id?ink:muted,
                  borderBottom:tab===t.id?`2px solid ${gold}`:"2px solid transparent"}}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-7 space-y-5">

        {/* ── ACCOUNT ── */}
        {tab==="account"&&(
          <div className="space-y-5">
            <SectionCard title="Personal information"
              action={
                editMode
                  ? <div className="flex gap-2">
                      <Button onClick={saveProfile} color={muted} border={`1px solid ${border}`}
                              className="text-xs font-medium px-3 py-1.5">
                        Cancel
                      </Button>
                      <Button onClick={saveProfile} color={white} backgroundColor={ink}
                              className="text-xs font-semibold px-3 py-1.5">
                        Save
                      </Button>
                    </div>
                  : <Button onClick={()=>setEditMode(true)} color={muted} border={`1px solid ${border}`}
                              className="text-xs font-medium px-3 py-1.5">
                        Edit
                      </Button>
              }>
              <div className="space-y-4">
                {[
                  {label:"Full name",     key:"name",   type:"text",   editable:true},
                  {label:"Email address", key:"email",  type:"email",  editable:true},
                  {label:"Institution",   value:user.institution,      editable:false},
                  {label:"Programme",     value:user.programme,        editable:false},
                  {label:"Role",          value:"Student",             editable:false},
                  {label:"Member since",  value:user.joinedOn,         editable:false},
                  {label:"Language",      key:"locale", type:"select", editable:true,
                    opts:["en-GB","sl-SI","de-DE","fr-FR"]},
                ].map(({label,key,type,editable,value,opts})=>(
                  <div key={label} className="flex items-center justify-between gap-4 py-2.5 border-b last:border-0"
                    style={{borderColor:border}}>
                    <p className="text-xs font-medium shrink-0 w-32" style={{color:muted}}>{label}</p>
                    {editMode&&editable&&key
                      ? type==="select"
                        ? <select value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                            className="flex-1 max-w-xs rounded-lg border px-3 py-1.5 text-sm outline-none"
                            style={{borderColor:border,color:ink}}>
                            {opts.map(o=><option key={o}>{o}</option>)}
                          </select>
                        : <input type={type} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                            className="flex-1 max-w-xs rounded-lg border px-3 py-1.5 text-sm outline-none"
                            style={{borderColor:border,color:ink}}
                            onFocus={e=>e.target.style.borderColor=gold}
                            onBlur={e=>e.target.style.borderColor=border}/>
                      : <p className="text-sm flex-1 text-right" style={{color:ink}}>{key?form[key]||user[key]:value}</p>
                    }
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Data export */}
            <SectionCard title="Data portability">
              <p className="text-xs mb-4" style={{color:muted}}>
                Under GDPR Art. 20 you can export all your personal data.
                The archive includes credentials, grades, consents, and audit trail as a signed JSON + PDF bundle.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={()=>showToast("Export started — you'll receive an email with the download link within 24h.")}
                        color={ink} border={`1px solid ${border}`}
                        className="text-sm font-semibold gap-2 px-4 py-2.5">
                  <DownloadIcon size={14}/> Export my data (JSON + PDF)
                </Button>
              </div>
            </SectionCard>

            {/* Danger zone */}
            <div className="rounded-2xl p-5" style={{border:`1.5px solid #FECACA`,backgroundColor:"#FFFAFA"}}>
              <p className="text-xs font-semibold mb-1" style={{color:red}}>Danger zone</p>
              <p className="text-xs mb-4" style={{color:muted}}>
                Deleting your account is permanent. All personal data will be erased within 30 days
                per GDPR Art. 17. Issued credentials remain valid on the blockchain — only your
                Eduxcert account and PII are removed.
              </p>
              <Button onClick={()=>setDelModal(true)}
                      color={red} backgroundColor={redBg} border={`1px solid ${redBdr}`}
                      className="text-xs font-semibold px-4 py-2 gap-2">
                <TrashIcon size={13}/> Request account deletion
              </Button>
            </div>
          </div>
        )}

        {/* ── PRIVACY & CONSENT ── */}
        {tab==="privacy"&&(
          <div className="space-y-5">
            <div className="rounded-xl p-4 flex items-start gap-3"
              style={{backgroundColor:goldBg,border:`1px solid ${goldBdr}`}}>
              <ShieldIcon size={16} color={gold}/>
              <p className="text-xs" style={{color:amber}}>
                Eduxcert processes data under GDPR Art. 6(1)(b) — performance of contract — and
                Art. 6(1)(a) — consent — where indicated. You can withdraw consent at any time.
                Purpose and retention are listed per consent below.
              </p>
            </div>

            <SectionCard title="Consent management">
              <div className="space-y-4">
                {consents.map(c=>(
                  <div key={c.id} className="flex items-start gap-4 py-3 border-b last:border-0"
                    style={{borderColor:border}}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-xs font-semibold" style={{color:ink}}>{c.label}</p>
                        {c.required&&(
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                            style={{backgroundColor:pageColor,color:muted,border:`1px solid ${border}`}}>REQUIRED</span>
                        )}
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{color:muted}}>{c.desc}</p>
                    </div>
                    <ToggleSwitch on={c.granted} onChange={()=>!c.required&&toggleConsent(c.id)}/>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Consent history">
              <div className="space-y-3">
                {[
                  {event:"QI consent granted",           ts:"Sep 5, 2023",  by:"User"},
                  {event:"Push notifications enabled",    ts:"Sep 5, 2023",  by:"User"},
                  {event:"EQAR sharing enabled",          ts:"Oct 1, 2023",  by:"User"},
                  {event:"Benchmarking pool declined",    ts:"Feb 14, 2025", by:"User"},
                ].map((e,i)=>(
                  <div key={i} className="flex justify-between text-xs py-2 border-b last:border-0"
                    style={{borderColor:border}}>
                    <span style={{color:ink}}>{e.event}</span>
                    <div className="text-right">
                      <span style={{color:muted}}>{e.ts}</span>
                      <span className="ml-2 font-semibold" style={{color:muted}}>·{e.by}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* ── SECURITY ── */}
        {tab==="security"&&(
          <div className="space-y-5">
            <SectionCard title="Authentication">
              <div className="space-y-4">
                {/* Password */}
                <div className="flex items-center justify-between py-3 border-b" style={{borderColor:border}}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{backgroundColor:pageColor}}>
                      <KeyIcon size={16} color={muted}/>
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{color:ink}}>Password</p>
                      <p className="text-[11px]" style={{color:muted}}>Managed by Keycloak SSO · last changed 90 days ago</p>
                    </div>
                  </div>
                  <Button onClick={()=>showToast("Password reset email sent.")} color={muted} border={`1px solid ${border}`}
                          className="text-xs font-medium px-3 py-1.5">
                    Change
                  </Button>
                </div>

                {/* MFA */}
                <div className="flex items-center justify-between py-3 border-b" style={{borderColor:border}}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{backgroundColor:tealBg}}>
                      <ShieldIcon size={16} color={teal}/>
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{color:ink}}>Multi-factor authentication</p>
                      <p className="text-[11px]" style={{color:teal}}>✓ Enabled — TOTP authenticator app</p>
                    </div>
                  </div>
                  <Button onClick={()=>showToast("MFA settings opened in Keycloak.")} color={muted} border={`1px solid ${border}`}
                          className="text-xs font-medium px-3 py-1.5">
                    Manage
                  </Button>
                </div>

                {/* WebAuthn */}
                <div className="flex items-center justify-between py-3" style={{borderColor:border}}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{backgroundColor:violetBg}}>
                      <CenterDotIcon />
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{color:ink}}>Passkey (WebAuthn)</p>
                      <p className="text-[11px]" style={{color:muted}}>No passkeys registered yet</p>
                    </div>
                  </div>
                  <Button onClick={()=>showToast("Passkey registration initiated.")} 
                          color={violet} backgroundColor={violetBg} border={`1px solid ${violetBdr}`}
                          className="text-xs font-semibold px-3 py-1.5">
                    Add passkey
                  </Button>
                </div>
              </div>
            </SectionCard>

            {/* Active sessions */}
            <SectionCard title="Active sessions">
              <div className="space-y-3">
                {[
                  {device:"Chrome · macOS",     ip:"193.2.xx.xx",  location:"Ljubljana, SI", current:true},
                  {device:"Safari · iPhone 15", ip:"193.2.xx.xx",  location:"Ljubljana, SI", current:false},
                ].map((s,i)=>(
                  <div key={i} className="flex items-center justify-between py-2.5 border-b last:border-0"
                    style={{borderColor:border}}>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold" style={{color:ink}}>{s.device}</p>
                        {s.current&&<span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{backgroundColor:greenBg,color:green}}>This device</span>}
                      </div>
                      <p className="text-[11px]" style={{color:muted}}>{s.ip} · {s.location}</p>
                    </div>
                    {!s.current&&(
                      <Button onClick={()=>showToast("Session revoked.",false)} color={red} className="text-[11px] font-medium"> Revoke </Button>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* ── DIGITAL IDENTITY ── */}
        {tab==="did"&&(
          <div className="space-y-5">
            <SectionCard title="Your decentralised identity (DID)">
              <div className="space-y-4">
                <div className="rounded-xl p-4" style={{backgroundColor:inkSoft}}>
                  <p className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{color:gold}}>Subject DID</p>
                  <p className="text-sm font-mono break-all text-white">{user.did}</p>
                  <p className="text-[11px] mt-2" style={{color:"#94A3B8"}}>
                    This DID is the cryptographic subject identifier embedded in all your credentials.
                    It is registered in EBSI.
                  </p>
                </div>
                {[
                  {label:"DID method",     value:"did:ebsi"},
                  {label:"Key algorithm",  value:"Ed25519"},
                  {label:"Status",         value:"Active · on-chain"},
                  {label:"Registered",     value:"September 2023"},
                ].map(({label,value})=>(
                  <div key={label} className="flex justify-between py-2 border-b last:border-0 text-xs"
                    style={{borderColor:border}}>
                    <span style={{color:muted}}>{label}</span>
                    <span className="font-semibold" style={{color:ink}}>{value}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="EUDI Wallet connection">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{backgroundColor:user.walletConnected?violetBg:pageColor}}>
                  <WalletIcon size={22} color={user.walletConnected?violet:muted}/>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{color:ink}}>
                    {user.walletConnected?"Wallet connected":"No wallet connected"}
                  </p>
                  <p className="text-[11px]" style={{color:user.walletConnected?violet:muted}}>
                    {user.walletConnected?"All issued credentials are pushed to your EUDI Wallet automatically."
                      :"Connect your EUDI Wallet to receive credentials directly."}
                  </p>
                </div>
              </div>
              {user.walletConnected?(
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={()=>showToast("Wallet sync started.")} color={ink} border={`1px solid ${border}`}
                          className="text-xs font-semibold py-2.5 rounded-xl!">
                    Sync credentials
                  </Button>
                  <Button onClick={()=>{setUser(u=>({...u,walletConnected:false})); showToast("Wallet disconnected.",false);}}
                          color={red} backgroundColor={redBg}
                          className="text-xs font-semibold py-2.5 rounded-xl!">
                    Disconnect wallet
                  </Button>
                </div>
              ):(
                <Button onClick={()=>{setUser(u=>({...u,walletConnected:true})); showToast("EUDI Wallet connected via OID4VCI.");}}
                        color={white} backgroundColor={violet}
                        className="text-sm font-semibold py-2.5 rounded-xl! w-full">
                  Connect EUDI Wallet (OID4VCI) →
                </Button>
              )}
            </SectionCard>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {delModal&&(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{backgroundColor:"rgba(15,23,41,0.6)",backdropFilter:"blur(3px)"}}>
          <div className="w-full max-w-sm rounded-2xl p-7 shadow-2xl" style={{backgroundColor:white}}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{backgroundColor:redBg}}>
              <TrashIcon size={20}/>
            </div>
            <h3 className="font-serif text-lg mb-2" style={{color:ink}}>Request account deletion</h3>
            <p className="text-xs mb-5 leading-relaxed" style={{color:muted}}>
              All personal data will be erased within 30 days (GDPR Art. 17). Your issued credentials
              remain cryptographically valid — only your Eduxcert account and linked PII are removed.
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button onClick={()=>setDelModal(false)} color={muted} border={`1px solid ${border}`}
                      className="text-sm font-medium flex-1 py-2.5 rounded-xl!">
                Cancel
              </Button>
              <Button onClick={()=>{setDelModal(false);showToast("Deletion request submitted. You will receive a confirmation email.",false);}}
                      color={white} backgroundColor={red}
                      className="text-sm font-semibold flex-1 py-2.5 rounded-xl!">
                Confirm deletion
              </Button>
            </div>
          </div>
        </div>
      )}

      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// NOTIFICATIONS PAGE
// ════════════════════════════════════════════════
function NotificationsPage(){
  const [notifs,setNotifs]  = useState(NOTIFICATIONS);
  const [prefs,setPrefs]    = useState(NOTIF_PREFS);
  const [tab,setTab]        = useState("inbox");
  const [filter,setFilter]  = useState("all");
  const [toast,setToast]    = useState(null);

  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};
  const unread = notifs.filter(n=>!n.read).length;
  const markAll=()=>{setNotifs(ns=>ns.map(n=>({...n,read:true})));showToast("All notifications marked as read.");};
  const markOne=(id)=>setNotifs(ns=>ns.map(n=>n.id===id?{...n,read:true}:n));
  const del=(id)=>setNotifs(ns=>ns.filter(n=>n.id!==id));

  const filtered = filter==="all" ? notifs : notifs.filter(n=>n.type===filter);

  const togglePref=(id,ch)=>{
    setPrefs(ps=>ps.map(p=>p.id===id?{...p,[ch]:!p[ch]}:p));
    showToast("Notification preference saved.");
  };

  return(
    <div className="min-h-screen" style={{backgroundColor:pageColor}}>
      {/* Header */}
      <div className="pt-8 pb-6 px-6 lg:px-10" style={{backgroundColor:white,borderBottom:`1px solid ${border}`}}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs mb-3" style={{color:muted}}>
            <span style={{color:ink}}>Andreja Novak</span> / Notifications
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-serif text-2xl" style={{color:ink}}>Notifications</h1>
              {unread>0&&<p className="text-sm mt-0.5" style={{color:muted}}>
                <span className="font-semibold" style={{color:amber}}>{unread} unread</span>
              </p>}
            </div>
            {tab==="inbox"&&unread>0&&(
              <Button onClick={markAll} color={gold} className="text-xs font-medium"> Mark all as read </Button>
            )}
          </div>
          <div className="flex gap-1 mt-6">
            {[["inbox","Inbox"],["preferences","Preferences"]].map(t=>(
              <button key={t[0]} onClick={()=>setTab(t[0])}
                className="px-4 py-2 text-xs font-semibold rounded-t-lg"
                style={{backgroundColor:tab===t[0]?pageColor:"transparent",color:tab===t[0]?ink:muted,
                  borderBottom:tab===t[0]?`2px solid ${gold}`:"2px solid transparent"}}>
                {t[1]}
                {t[0]==="inbox"&&unread>0&&(
                  // <Badge color={white} backgroundColor={amber}
                  //        className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full"> {unread} </Badge>
                  <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{backgroundColor:amber,color:white}}>{unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-6 space-y-5">

        {/* ── INBOX ── */}
        {tab==="inbox"&&(
          <>
            {/* Type filters */}
            <div className="flex flex-wrap gap-2">
              {[["all","All"],["grade","Grades"],["credential","Credentials"],["exam","Exams"],["ects","ECTS"],["roadmap","Roadmap"]].map(([v,l])=>(
                <Button key={v} onClick={()=>setFilter(v)} 
                        color={filter===v?white:muted} backgroundColor={filter===v?ink:white} border={`1px solid ${filter===v?ink:border}`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full! transition-colors">
                  {l}
                </Button>
              ))}
            </div>

            {filtered.length===0?(
              <div className="rounded-2xl py-16 flex flex-col items-center gap-3"
                style={{backgroundColor:white,border:`1px solid ${border}`}}>
                <p className="text-3xl">🔔</p>
                <p className="text-sm font-medium" style={{color:ink}}>No notifications</p>
                <p className="text-xs" style={{color:muted}}>You're all caught up.</p>
              </div>
            ):(
              <div className="rounded-2xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
                {filtered.map((n,i)=>{
                  const t=N_TYPE[n.type]||{dot:muted,label:""};
                  return(
                    <div key={n.id} onClick={()=>markOne(n.id)}
                      className="flex items-start gap-4 px-5 py-4 border-b last:border-0 cursor-pointer transition-colors hover:bg-gray-50"
                      style={{borderColor:border,backgroundColor:n.read?"transparent":`${amber}08`}}>
                      {/* Dot */}
                      <div className="flex flex-col items-center gap-1 pt-1 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full"
                          style={{backgroundColor:n.read?border:t.dot}}/>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <p className="text-xs font-semibold" style={{color:n.read?muted:ink}}>{n.title}</p>
                          <Badge color={muted} backgroundColor={pageColor}> {t.label} </Badge>
                        </div>
                        <p className="text-[11px] leading-relaxed" style={{color:muted}}>{n.body}</p>
                        <p className="text-[10px] mt-1.5" style={{color:border}}>{n.ts}</p>
                      </div>
                      {/* Actions */}
                      <Button onClick={e=>{e.stopPropagation();del(n.id);}}
                              className="p-1.5 opacity-30 hover:opacity-100">
                        <XIcon size={13}/>
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* ── PREFERENCES ── */}
        {tab==="preferences"&&(
          <SectionCard title="Notification channels">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider pb-3"
                      style={{color:muted}}>Type</th>
                    {["Email","Push","SMS"].map(ch=>(
                      <th key={ch} className="text-center text-[10px] font-semibold uppercase tracking-wider pb-3 w-20"
                        style={{color:muted}}>{ch}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prefs.map(p=>(
                    <tr key={p.id} className="border-t" style={{borderColor:border}}>
                      <td className="py-3.5 pr-4">
                        <p className="text-xs font-medium" style={{color:ink}}>{p.label}</p>
                      </td>
                      {["email","push","sms"].map(ch=>(
                        <td key={ch} className="py-3.5 text-center">
                          <div className="flex justify-center">
                            <ToggleSwitch on={p[ch]} onChange={()=>togglePref(p.id,ch)}/>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] mt-4" style={{color:muted}}>
              SMS is charged per message to your institutional account. Push notifications require the Eduxcert mobile app.
            </p>
          </SectionCard>
        )}
      </div>

      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );
}

// ════════════════════════════════════════════════
// BENEFITS PAGE
// ════════════════════════════════════════════════
function BenefitsPage(){
  const [selected,setSelected] = useState(null);
  const [redeemed,setRedeemed] = useState(new Set());
  const [toast,setToast]       = useState(null);
  const [filter,setFilter]     = useState("All");

  const showToast=(msg,ok=true)=>{setToast({msg,ok});setTimeout(()=>setToast(null),3000);};
  const cats=["All",...new Set(BENEFITS.map(b=>b.category))];
  const filtered=filter==="All"?BENEFITS:BENEFITS.filter(b=>b.category===filter);

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

// ════════════════════════════════════════════════
// ROOT — demo shell switching between all 3 pages
// ════════════════════════════════════════════════
const PAGES = [
  { id:"profile",       label:"Profile",       Icon:UserIcon },
  { id:"notifications", label:"Notifications", Icon:BellIcon },
  { id:"benefits",      label:"Benefits",      Icon:GiftIcon },
];

export default function SharedPages(){
  const [activePage, setActivePage] = useState("profile");
  const unread = NOTIFICATIONS.filter(n=>!n.read).length;

  const views = {
    profile:       <ProfilePage/>,
    notifications: <NotificationsPage/>,
    benefits:      <BenefitsPage/>,
  };

  return(
    <div className="min-h-screen" style={{backgroundColor:pageColor}}>
      {/* Top nav for demo */}
      <div className="sticky top-0 z-20" style={{backgroundColor:ink,borderBottom:`1px solid ${inkSoft}`}}>
        <div className="flex items-center gap-2 px-6 py-3">
          <div className="flex items-center gap-2.5 mr-6">
            <img className="w-7 h-7 shrink-0" src={Logo}/>
            <span className="text-white font-serif text-sm tracking-wide">Eduxcert</span>
            <Badge color={gold} backgroundColor={goldTra}> Shared Pages </Badge>
          </div>
          {PAGES.map(({id,label,Icon})=>{
            const on=activePage===id;
            return(
              <Button key={id} onClick={()=>setActivePage(id)} 
                      color={on?"#FBF7F0":"#94A3B8"} backgroundColor={on?{goldTra}:"transparent"}
                      className="text-xs font-semibold px-3 py-2 gap-2 transition-colors relative">
                <Icon size={14} color={on?gold:"#64748B"}/>
                {label}
                {id==="notifications"&&unread>0&&(
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center" style={{backgroundColor:amber,color:white}}>{unread}</span>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {views[activePage]}
    </div>
  );
}
