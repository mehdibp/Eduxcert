import { useState } from "react";
import {ink, pageColor, white, muted, border } from "../../styles/colors";
import {GridIcon, SearchPeopleIcon, BriefcaseIcon, BadgeIcon, ChartIcon, PathIcon } from "../../components/icons/icons";
import { COMPANY } from "../../data/employer";
import Logo from '../../assets/react.svg';

import Sidebar from "../../components/layout/Sidebar";
const NAV_ITEMS = [
  { id:"dashboard",  label:"Dashboard",         Icon:GridIcon       },
  { id:"candidates", label:"Candidates",        Icon:SearchPeopleIcon},
  { id:"jobs",       label:"Job Posts",         Icon:BriefcaseIcon  },
  { id:"issue",      label:"Issue Work-History",Icon:BadgeIcon      },
  { id:"workforce",  label:"Workforce Skills",  Icon:ChartIcon      },
  { id:"pathways",   label:"Upskilling",        Icon:PathIcon       },
];

import {Button} from "../../components/commen/Button"

import KYCPage        from "./KYCPage";
import DashboardPage  from "./DashboardPage";
import CandidatesPage from "./CandidatesPage";
import JobsPage       from "./JobsPage";
import IssueVCPage    from "./IssueVCPage";
import WorkforcePage  from "./WorkforcePage";
import PathwaysPage   from "./PathwaysPage";


// --------------------------------------------------------------------------------------
export default function EmployerPortal(){
  const [nav, setNav]              = useState("dashboard");
  const [collapsed, setCollapsed]  = useState(false);
  const [registered, setRegistered]= useState(true);
  const [loggedIn, setLoggedIn]    = useState(true);

  if(!loggedIn){
    return(
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor:pageColor}}>
        <div className="rounded-2xl p-10 text-center w-full max-w-sm" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <img className="w-12 h-12 mx-auto shrink-0" src={Logo}/>
          <h1 className="font-serif text-xl mb-1" style={{color:ink}}>Eduxcert</h1>
          <p className="text-sm mb-6" style={{color:muted}}>Employer Portal</p>
          <Button onClick={()=>setLoggedIn(true)} color={white} backgroundColor={ink}
                  className="text-sm font-semibold py-2.5 w-full mb-3">
            Sign in with company SSO
          </Button>
          <Button onClick={()=>{setLoggedIn(true);setRegistered(false);}} 
                  color={muted} border={`1px solid ${border}`}
                  className="text-sm font-medium py-2.5 w-full">
            Register as new employer
          </Button>
        </div>
      </div>
    );
  }

  if(!registered) return <KYCPage onComplete={()=>setRegistered(true)}/>;

  const views={
    dashboard:  <DashboardPage onNav={setNav}/>,
    candidates: <CandidatesPage />,
    jobs:       <JobsPage />,
    issue:      <IssueVCPage />,
    workforce:  <WorkforcePage />,
    pathways:   <PathwaysPage />,
  };

  return(
    <div className="flex h-screen" style={{backgroundColor:pageColor}}>

      <Sidebar
        subtitle="Employer Portal"
        navItems={NAV_ITEMS}
        active={nav}
        onNav={setNav}
        collapsed={collapsed}
        onToggle={() => setCollapsed((b) => !b)}
        onLogout={() => { setLoggedIn(false); setRegistered(false); }}
        user={{ initials: "CT", name: "Celtra Tech", sub: `${COMPANY.tier} plan`, color: "#0D9488" }}
      />

      <main className="flex-1 overflow-auto p-6 lg:p-8" style={{minWidth:0}}>
        {views[nav]}
      </main>
    </div>
  );
}