import { useState, useMemo } from "react";

import {ink, gold, pageColor, white, muted, border, 
        green, greenBg, amber, violet, violetBg, blue, blueBg, rose} from "../../styles/colors";
import { SearchIcon, PlusIcon } from "../../components/icons/icons";
import { USERS } from "../../data/admin";

import PageHeader from "../../components/commen/PageHeader";
import {Badge}    from "../../components/commen/Badge";
import {Button}   from "../../components/commen/Button";
import Toast      from "../../components/commen/Toast";


// --------------------------------------------------------------------------------------
export default function UsersPage(){
  const [users,setUsers]  = useState(USERS);
  const [filter,setFilter]= useState("all");
  const [search,setSearch]= useState("");
  const [toast,setToast]  = useState(null);
  const showToast = (msg, ok=true) => { setToast({msg, ok}); setTimeout(() => setToast(null), 3000); };

  const filtered = useMemo(() => {
    let l=users;
    if(filter!=="all") l=l.filter(u=>u.role===filter);
    if(search) l=l.filter(u=>u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase()));
    return l;
  }, [users,filter,search]);

  const roleColor = {educator:violet,   student:blue,   admin:rose};
  const roleBg    = {educator:violetBg, student:blueBg, admin:"#FFE4E6"};

  return (
    <div className="space-y-5">
      <PageHeader rootLabel={"Admin Zupan"} crumb="Users & Roles" title="Users & Roles"
        subtitle={`${users.filter(u=>u.status==="active").length} active · ${users.length} total`}
        action={
          <Button onClick={()=>showToast("User invite sent.")} color={white} backgroundColor={ink}
                  className="text-sm font-semibold px-4 py-2 gap-2">
            <PlusIcon size={13}/> Invite user
          </Button>
        }/>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-44">
          <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm outline-none"
            style={{backgroundColor:white,borderColor:border,color:ink}}
            onFocus={e=>e.target.style.borderColor=gold} onBlur={e=>e.target.style.borderColor=border}/>
        </div>
        <div className="flex rounded-xl overflow-hidden border" style={{borderColor:border}}>
          {[["all","All"],["educator","Educators"],["student","Students"],["admin","Admins"]].map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)}
              className="px-3 py-2.5 text-xs font-semibold transition-colors"
              style={{backgroundColor:filter===v?ink:white,color:filter===v?white:muted}}>{l}</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{backgroundColor:white,border:`1px solid ${border}`}}>
        <table className="w-full">
          <thead style={{backgroundColor:pageColor}}>
            <tr>{["Name","Role","Department","Status","MFA","Actions"].map(h=>(
              <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider px-4 py-3"
                style={{color:muted}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filtered.map(u=>(
              <tr key={u.id} className="border-t hover:bg-gray-50 transition-colors"
                style={{borderColor:border}}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{backgroundColor:roleColor[u.role]||muted}}>
                      {u.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{color:ink}}>{u.name}</p>
                      <p className="text-[10px]" style={{color:muted}}>{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge backgroundColor={roleBg[u.role]||pageColor} color={roleColor[u.role]||muted}> {u.role.charAt(0).toUpperCase()+u.role.slice(1)} </Badge>
                </td>
                <td className="px-4 py-3 text-xs" style={{color:muted}}>{u.dept}</td>
                <td className="px-4 py-3">
                  <Badge backgroundColor={u.status==="active"?greenBg:"#F1F5F9"} color={u.status==="active"?green:muted}> {u.status==="active"?"Active":"Inactive"} </Badge>
                </td>
                <td className="px-4 py-3">
                  {u.mfa
                    ? <span className="text-[11px] font-semibold" style={{color:green}}>✓ Enabled</span>
                    : <span className="text-[11px]" style={{color:amber}}>Not set</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button onClick={()=>{
                              setUsers(us=>us.map(x=>x.id===u.id?{...x,status:x.status==="active"?"inactive":"active"}:x));
                              showToast(`${u.name} ${u.status==="active"?"deactivated":"reactivated"}.`);
                            }} color={muted} border={`1px solid ${border}`}
                            className="text-[11px] font-medium px-2.5 py-1">
                      {u.status==="active"?"Deactivate":"Activate"}
                    </Button>
                    <Button onClick={()=>{
                              const roles=["educator","student","admin"];
                              const next=roles[(roles.indexOf(u.role)+1)%roles.length];
                              setUsers(us=>us.map(x=>x.id===u.id?{...x,role:next}:x));
                              showToast(`Role changed to ${next}.`);
                            }} color={muted} border={`1px solid ${border}`}
                            className="text-[11px] font-medium px-2.5 py-1">
                      Change role
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast&&<Toast message={toast.msg} type={toast.ok}/>}
    </div>
  );

}
