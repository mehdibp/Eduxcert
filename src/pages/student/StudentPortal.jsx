import { useState } from "react";

import { pageColor } from "../../styles/colors";
import { BookIcon, CalendarIcon, GridIcon, MapIcon, SealNavIcon } from "../../components/icons/icons";
import { STUDENT } from "../../data/student"

import LoginPage       from "./LoginPage";
import DashboardPage   from "./DashboardPage";
import CoursesPage     from "./CoursesPage";
import CredentialsPage from "./CredentialsPage";
import TimetablePage   from "./TimetablePage";
import RoadmapPage     from "./RoadmapPage";

import Sidebar         from "../../components/layout/Sidebar"

const NAV_ITEMS = [
  {id:"dashboard",  label:"Dashboard",   Icon:GridIcon},
  {id:"courses",    label:"My Courses",  Icon:BookIcon},
  {id:"credentials",label:"Credentials", Icon:SealNavIcon},
  {id:"timetable",  label:"Timetable",   Icon:CalendarIcon},
  {id:"roadmap",    label:"Roadmap",     Icon:MapIcon},
];

// ─────────────────────────────────────────────────────────
// StudentPortal — the main skin for the student portal
//
// This component is responsible for the following:
// - Keeping the login state
// - Keeping which page (tab) is currently active
// - Showing the Sidebar + active page
//
// Switching between pages is done with internal state (not with URL),
// Exactly the same as before — because everything happens inside a "portal".
// ─────────────────────────────────────────────────────────

export default function StudentPortal() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [nav, setNav] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  if (!loggedIn) {
    return <LoginPage onLogin={() => { setLoggedIn(true); setNav("dashboard"); }} />;
  }

  const views = {
    dashboard:   <DashboardPage onNav={setNav} />,
    courses:     <CoursesPage />,
    credentials: <CredentialsPage />,
    timetable:   <TimetablePage />,
    roadmap:     <RoadmapPage onNav={setNav} />,
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: pageColor }}>
      <Sidebar
        subtitle="Student Portal"
        navItems={NAV_ITEMS}
        active={nav}
        onNav={setNav}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        onLogout={() => { setLoggedIn(false); setNav("dashboard"); }}
        user={{
          initials: STUDENT.initials,
          name: STUDENT.name.split(" ")[0],
          sub: STUDENT.institution.split(" ").slice(-1)[0],
          color: undefined,       // Default uses gold color
        }}
      />
      <main className="flex-1 overflow-auto p-6 lg:p-8" style={{ minWidth: 0 }}>
        {views[nav]}
      </main>
    </div>
  );
}
