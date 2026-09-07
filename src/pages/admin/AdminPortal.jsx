import { useState } from "react";
import { pageColor, white, border, ink, muted } from "../../styles/colors";
import { GridIcon, PeopleIcon, BookOpenIcon, DiplomaIcon, ShieldIcon, SettingsIcon, LogIcon } from "../../components/icons/icons"
import { TENANT } from "../../data/admin";
import Logo from '../../assets/react.svg';

import { Button } from "../../components/commen/Button"


import Sidebar from "../../components/layout/Sidebar"
const NAV_ITEMS = [
  { id:"dashboard",  label:"Dashboard",     Icon:GridIcon    },
  { id:"programmes", label:"Programmes",    Icon:BookOpenIcon},
  { id:"degrees",    label:"Degree Award",  Icon:DiplomaIcon },
  { id:"accred",     label:"Accreditation", Icon:ShieldIcon  },
  { id:"users",      label:"Users & Roles", Icon:PeopleIcon   },
  { id:"config",     label:"Tenant Config", Icon:SettingsIcon},
  { id:"audit",      label:"Audit Log",     Icon:LogIcon     },
];

import DashboardPage     from "./DashboardPage";
import ProgrammesPage    from "./ProgrammesPage";
import DegreesPage       from "./DegreesPage";
import AccreditationPage from "./AccreditationPage";
import UsersPage         from "./UsersPage";
import ConfigPage        from "./ConfigPage";
import AuditPage         from "./AuditPage";


// --------------------------------------------------------------------------------------
export default function AdminConsole() {
  const [nav,setNav]             = useState("dashboard");
  const [collapsed,setCollapsed] = useState(false);
  const [loggedIn,setLoggedIn]   = useState(true);

  if(!loggedIn){
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor:pageColor}}>
        <div className="rounded-2xl p-10 text-center" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <img className="w-12 h-12 mx-auto shrink-0" src={Logo}/>
          <h1 className="font-serif text-xl mb-1" style={{color:ink}}>Eduxcert</h1>
          <p className="text-sm mb-6" style={{color:muted}}>Admin Console · {TENANT.name}</p>          
          <Button onClick={()=>setLoggedIn(true)} color={white} backgroundColor={ink}
                  className="text-sm font-semibold py-2.5 w-full">
            Sign in with Keycloak SSO
          </Button>
        </div>
      </div>
    );
  }

  const views = {
    dashboard:  <DashboardPage onNav={setNav}/>,
    programmes: <ProgrammesPage/>,
    degrees:    <DegreesPage/>,
    accred:     <AccreditationPage/>,
    users:      <UsersPage/>,
    config:     <ConfigPage/>,
    audit:      <AuditPage/>,
  };

  return (
    <div className="flex h-screen" style={{backgroundColor:pageColor}}>
      
      <Sidebar
        subtitle="Admin Console"
        navItems={NAV_ITEMS}
        active={nav}
        onNav={setNav}
        collapsed={collapsed}
        onToggle={() => setCollapsed((b) => !b)}
        onLogout={() => setLoggedIn(false)}
        user={{ initials: "AZ", name: "Admin Zupan", sub: "University Admin", color: "#E11D48" }}
      />
      
      <main className="flex-1 overflow-auto p-6 lg:p-8" style={{minWidth:0}}>
        {views[nav]}
      </main>
    </div>
  );

}
