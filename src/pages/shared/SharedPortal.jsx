import { useState } from "react";
import {ink, inkSoft, gold, goldTra, pageColor, white, amber } from "../../styles/colors";
import {UserIcon, BellIcon, GiftIcon } from "../../components/icons/icons";
import { NOTIFICATIONS } from "../../data/shared";
import Logo from '../../assets/react.svg';

import {Badge}  from "../../components/commen/Badge";
import {Button} from "../../components/commen/Button";


import ProfilePage       from "./ProfilePage";
import NotificationsPage from "./NotificationsPage";
import BenefitsPage      from "./BenefitsPage";

// --------------------------------------------------------------------------------------
const NAV_ITEMS = [
  { id:"profile",       label:"Profile",       Icon:UserIcon },
  { id:"notifications", label:"Notifications", Icon:BellIcon },
  { id:"benefits",      label:"Benefits",      Icon:GiftIcon },
];

// --------------------------------------------------------------------------------------
export default function SharedPages(){
  const [activePage, setActivePage] = useState("profile");
  const unread = NOTIFICATIONS.filter(n=>!n.read).length;

  const views = {
    profile:       <ProfilePage />,
    notifications: <NotificationsPage />,
    benefits:      <BenefitsPage />,
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
          {NAV_ITEMS.map(({id,label,Icon})=>{
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
