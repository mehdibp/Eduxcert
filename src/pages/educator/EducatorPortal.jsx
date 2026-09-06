import { useState } from "react";
import { pageColor, white, border, ink, muted } from "../../styles/colors";
import { GridIcon, BookIcon, GradeIcon, ChartIcon, PeopleIcon } from "../../components/icons/icons"
import { EDUCATOR, GRADES } from "../../data/educator";
import Logo from '../../assets/react.svg'

import DashboardPage from "./DashboardPage";
import CoursesPage   from "./CoursesPage";
import GradingPage   from "./GradingPage";
import AnalyticsPage from "./AnalyticsPage";
import AdviseesPage  from "./AdviseesPage";

import Sidebar from "../../components/layout/Sidebar"

const NAV_ITEMS = [
  { id:"dashboard", label:"Dashboard",  Icon:GridIcon  },
  { id:"courses",   label:"My Courses", Icon:BookIcon  },
  { id:"grading",   label:"Grading",    Icon:GradeIcon },
  { id:"analytics", label:"Analytics",  Icon:ChartIcon },
  { id:"advisees",  label:"Advisees",   Icon:PeopleIcon },
];

import { Button } from "../../components/commen/Button"


// ─────────────────────────────────────────────────────────
// EducatorPortal — پوسته‌ی اصلی کنسول استاد
// ─────────────────────────────────────────────────────────
export default function EducatorConsole() {
  const [nav, setNav]             = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [loggedIn, setLoggedIn]   = useState(true); // start logged in for demo

  // Count grade objections to show on the "Grading" item in the Sidebar
  const appeals = GRADES.filter((g) => g.status === "appealed").length;
  const navItems = NAV_ITEMS.map((item) =>
    item.id === "grading" && appeals > 0 ? { ...item, badge: appeals } : item
  );

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor:pageColor}}>
        <div className="rounded-2xl p-10 text-center" style={{backgroundColor:white,border:`1px solid ${border}`}}>
          <img className="w-12 h-12 mx-auto shrink-0" src={Logo}/>
          <h1 className="font-serif text-xl mb-1" style={{color:ink}}>Eduxcert</h1>
          <p className="text-sm mb-6" style={{color:muted}}>Educator Console · University of Ljubljana</p>
          <Button onClick={()=>setLoggedIn(true)} color={white} backgroundColor={ink}
                  className="text-sm font-semibold py-2.5 w-full">
            Sign in with Keycloak SSO
          </Button>
        </div>
      </div>
    );
  }

  const views = {
    dashboard: <DashboardPage onNav={setNav}/>,
    courses:   <CoursesPage   onNav={setNav}/>,
    grading:   <GradingPage/>,
    analytics: <AnalyticsPage/>,
    advisees:  <AdviseesPage/>,
  };

  return (
    <div className="flex h-screen" style={{backgroundColor:pageColor}}>

      <Sidebar
        subtitle="Educator Console"
        navItems={navItems}
        active={nav}
        onNav={setNav}
        collapsed={collapsed}
        onToggle={() => setCollapsed((b) => !b)}
        onLogout={() => setLoggedIn(false)}
        user={{
          initials: EDUCATOR.initials,
          name: EDUCATOR.name.replace("Prof. ", ""),
          sub: EDUCATOR.title,
          color: "#7C3AED",
        }}
      />

      <main className="flex-1 overflow-auto p-6 lg:p-8" style={{minWidth:0}}>
        {views[nav]}
      </main>
    </div>
  );
}

