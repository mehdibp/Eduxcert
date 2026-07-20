import { useState } from "react";

// ─── Design tokens ────────────────────────────────────────────
const ink     = "#0F1729";
const inkSoft = "#1B2A4A";
const gold    = "#B08D57";
const goldBg  = "#FBF7F0";
const page    = "#F3F5F8";
const white   = "#FFFFFF";
const muted   = "#64748B";
const border  = "#E2E8F0";
const green   = "#16A34A";
const amber   = "#D97706";

// ─── Mock data (طبق data-model سند ۰۶) ───────────────────────
const student = {
  name: "Andreja Novak",
  initials: "AN",
  institution: "University of Ljubljana",
  programme: "MSc Computer Science",
  ectsEarned: 68,
  ectsRequired: 120,
  graduationTerm: "Spring 2026",
};

const courses = [
  {
    id: "1",
    code: "CS-711",
    title: "Distributed Systems",
    ects: 6,
    language: "English",
    status: "active",
    progress: 72,
    exam: "12 Jun 2025",
    grade: null,
  },
  {
    id: "2",
    code: "CS-604",
    title: "Machine Learning Fundamentals",
    ects: 6,
    language: "English",
    status: "active",
    progress: 45,
    exam: "19 Jun 2025",
    grade: null,
  },
  {
    id: "3",
    code: "CS-522",
    title: "Database Architecture",
    ects: 4,
    language: "Slovenian",
    status: "completed",
    progress: 100,
    exam: null,
    grade: "9 / 10",
  },
  {
    id: "4",
    code: "CS-480",
    title: "Software Engineering",
    ects: 4,
    language: "English",
    status: "completed",
    progress: 100,
    exam: null,
    grade: "8 / 10",
  },
];

const timeline = [
  { id: "t1", ts: "Apr 22, 2025", type: "grade", text: "Grade published for Database Architecture — 9 / 10" },
  { id: "t2", ts: "Apr 10, 2025", type: "ects", text: "4 ECTS awarded — Database Architecture" },
  { id: "t3", ts: "Mar 3, 2025",  type: "enrol", text: "Enrolled in Distributed Systems (CS-711)" },
  { id: "t4", ts: "Feb 28, 2025", type: "enrol", text: "Enrolled in Machine Learning Fundamentals (CS-604)" },
  { id: "t5", ts: "Jan 15, 2025", type: "credential", text: "Credential issued — Software Engineering Certificate" },
];

const credentials = [
  { id: "c1", title: "Database Architecture", type: "Certificate", code: "EDX-4401-DB03", status: "active" },
  { id: "c2", title: "Software Engineering",  type: "Certificate", code: "EDX-3120-QW88", status: "active" },
];

const navItems = [
  { id: "dashboard",    label: "Dashboard",    icon: GridIcon },
  { id: "courses",      label: "My Courses",   icon: BookIcon },
  { id: "credentials",  label: "Credentials",  icon: SealIcon },
  { id: "timetable",    label: "Timetable",    icon: CalIcon },
  { id: "roadmap",      label: "Roadmap",      icon: MapIcon },
];

// ─── Icon components ──────────────────────────────────────────
function GridIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill={color} opacity="0.8" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill={color} opacity="0.8" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill={color} opacity="0.8" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill={color} opacity="0.8" />
    </svg>
  );
}
function BookIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 2h7a2 2 0 0 1 2 2v9H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke={color} strokeWidth="1.3" />
      <path d="M12 13a1 1 0 0 0 1-1V5h-1" stroke={color} strokeWidth="1.3" />
      <path d="M5 5h5M5 7.5h5M5 10h3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function SealIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.3" />
      <path d="M5 8.5l2 2 4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CalIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3" width="13" height="11" rx="1.5" stroke={color} strokeWidth="1.3" />
      <path d="M5 1.5V4M11 1.5V4M1.5 7h13" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function MapIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 2L2 4v10l4-2 4 2 4-2V2l-4 2-4-2z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6 2v10M10 4v10" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

// ─── Tiny Progress Ring ──────────────────────────────────────
function ProgressRing({ pct, size = 48, stroke = 4 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={border} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={pct === 100 ? green : gold}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontWeight="600" fill={ink}>
        {pct}%
      </text>
    </svg>
  );
}

// ─── Big ECTS arc ────────────────────────────────────────────
function EctsArc({ earned, required }) {
  const pct = earned / required;
  const w = 180; const h = 100;
  const cx = w / 2; const cy = h - 10;
  const r = 82;
  const startAngle = Math.PI;
  const endAngle = Math.PI + pct * Math.PI;
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  const large = pct > 0.5 ? 1 : 0;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[180px]">
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy}`}
        fill="none" stroke={border} strokeWidth="10" strokeLinecap="round"
      />
      <path
        d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`}
        fill="none" stroke={gold} strokeWidth="10" strokeLinecap="round"
      />
      <text x={cx} y={cy - 10} textAnchor="middle" fontWeight="700" fontSize="22" fill={ink}>{earned}</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="11" fill={muted}>of {required} ECTS</text>
    </svg>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────
function Sidebar({ active, onNav, collapsed, onToggle }) {
  return (
    <aside
      className="flex flex-col h-full transition-all duration-200 select-none"
      style={{
        width: collapsed ? 56 : 220,
        backgroundColor: ink,
        borderRight: `1px solid ${inkSoft}`,
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-4 py-5 cursor-pointer shrink-0"
        onClick={onToggle}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ border: `1.5px solid ${gold}` }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: gold }} />
        </div>
        {!collapsed && (
          <span className="text-white font-serif text-base tracking-wide truncate">Eduxcert</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 pt-2 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onNav(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
              style={{
                backgroundColor: isActive ? "rgba(176,141,87,0.18)" : "transparent",
                color: isActive ? goldBg : "#94A3B8",
              }}
            >
              <span className="shrink-0">
                <Icon size={16} color={isActive ? gold : "#64748B"} />
              </span>
              {!collapsed && (
                <span className="text-sm font-medium truncate">{label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Avatar */}
      <div
        className="flex items-center gap-2.5 px-3 py-4 mx-2 mb-3 rounded-lg"
        style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: gold }}
        >
          {student.initials}
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white text-xs font-semibold truncate">{student.name.split(" ")[0]}</p>
            <p className="text-xs truncate" style={{ color: "#64748B" }}>{student.institution.split(" ").slice(-1)[0]}</p>
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── Course card ─────────────────────────────────────────────
function CourseCard({ course }) {
  const done = course.status === "completed";
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{ backgroundColor: white, border: `1px solid ${border}` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-mono tracking-wider" style={{ color: muted }}>{course.code}</p>
          <h3 className="text-sm font-semibold mt-0.5 leading-snug" style={{ color: ink }}>{course.title}</h3>
        </div>
        <ProgressRing pct={course.progress} size={44} />
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
          style={{
            backgroundColor: done ? "#DCFCE7" : goldBg,
            color: done ? green : amber,
          }}
        >
          {done ? "Completed" : "In progress"}
        </span>
        <span className="text-[11px]" style={{ color: muted }}>{course.ects} ECTS</span>
        <span className="text-[11px]" style={{ color: muted }}>{course.language}</span>
      </div>
      {done && course.grade && (
        <p className="text-xs font-semibold" style={{ color: green }}>Grade: {course.grade}</p>
      )}
      {!done && course.exam && (
        <p className="text-xs" style={{ color: muted }}>
          Exam: <span style={{ color: ink, fontWeight: 600 }}>{course.exam}</span>
        </p>
      )}
    </div>
  );
}

// ─── Main dashboard view ──────────────────────────────────────
function DashboardView() {
  return (
    <div className="space-y-7">
      {/* Welcome row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl" style={{ color: ink }}>
            Good morning, Andreja
          </h1>
          <p className="text-sm mt-0.5" style={{ color: muted }}>
            {student.programme} · {student.institution}
          </p>
        </div>
        <span
          className="text-xs font-medium px-3 py-1.5 rounded-full"
          style={{ backgroundColor: goldBg, color: amber, border: `1px solid #EFD8B0` }}
        >
          Expected graduation: {student.graduationTerm}
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Courses",  value: "2" },
          { label: "Upcoming Exams",  value: "2" },
          { label: "Credentials",     value: String(credentials.length) },
          { label: "ECTS Completion", value: `${Math.round(student.ectsEarned / student.ectsRequired * 100)}%` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl p-4"
            style={{ backgroundColor: white, border: `1px solid ${border}` }}
          >
            <p className="text-xs" style={{ color: muted }}>{label}</p>
            <p className="text-2xl font-serif mt-1" style={{ color: ink }}>{value}</p>
          </div>
        ))}
      </div>

      {/* ECTS + Timeline */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* ECTS progress */}
        <div
          className="rounded-xl p-5 flex flex-col items-center"
          style={{ backgroundColor: white, border: `1px solid ${border}` }}
        >
          <p className="text-xs font-semibold tracking-wide uppercase self-start mb-4" style={{ color: muted }}>
            ECTS Progress
          </p>
          <EctsArc earned={student.ectsEarned} required={student.ectsRequired} />
          <div className="mt-4 w-full">
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: muted }}>Earned</span>
              <span style={{ color: gold, fontWeight: 600 }}>{student.ectsEarned} ECTS</span>
            </div>
            <div className="flex justify-between text-xs">
              <span style={{ color: muted }}>Remaining</span>
              <span style={{ color: ink, fontWeight: 600 }}>{student.ectsRequired - student.ectsEarned} ECTS</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div
          className="lg:col-span-2 rounded-xl p-5"
          style={{ backgroundColor: white, border: `1px solid ${border}` }}
        >
          <p className="text-xs font-semibold tracking-wide uppercase mb-4" style={{ color: muted }}>
            Recent Activity
          </p>
          <ol className="relative space-y-4" style={{ borderLeft: `1.5px solid ${border}`, paddingLeft: 20 }}>
            {timeline.map((ev) => {
              const dotColor =
                ev.type === "credential" ? gold :
                ev.type === "grade"      ? green :
                ev.type === "ects"       ? "#8B5CF6" : "#94A3B8";
              return (
                <li key={ev.id} className="relative">
                  <span
                    className="absolute w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: dotColor, left: -26, top: 3 }}
                  />
                  <p className="text-[11px]" style={{ color: muted }}>{ev.ts}</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: ink }}>{ev.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Courses */}
      <div>
        <p className="text-xs font-semibold tracking-wide uppercase mb-3" style={{ color: muted }}>
          My Courses
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </div>

      {/* Credentials */}
      <div>
        <p className="text-xs font-semibold tracking-wide uppercase mb-3" style={{ color: muted }}>
          My Credentials
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {credentials.map((cr) => (
            <div
              key={cr.id}
              className="rounded-xl p-5 flex items-center gap-4"
              style={{ backgroundColor: goldBg, border: `1px solid #EFD8B0` }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: white, border: `1.5px solid ${gold}` }}
              >
                <SealIcon size={18} color={gold} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold" style={{ color: amber }}>{cr.type}</p>
                <p className="text-sm font-medium mt-0.5 truncate" style={{ color: ink }}>{cr.title}</p>
                <p className="font-mono text-[10px] mt-0.5" style={{ color: muted }}>{cr.code}</p>
              </div>
              <button
                className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: gold, color: white }}
              >
                Share
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder views ────────────────────────────────────────
function PlaceholderView({ label }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <p className="text-4xl">🚧</p>
      <p className="text-sm" style={{ color: muted }}>
        <span style={{ color: ink, fontWeight: 600 }}>{label}</span> — در مرحله بعد می‌سازیم
      </p>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const viewMap = {
    dashboard:   <DashboardView />,
    courses:     <PlaceholderView label="My Courses" />,
    credentials: <PlaceholderView label="Credentials" />,
    timetable:   <PlaceholderView label="Timetable" />,
    roadmap:     <PlaceholderView label="Roadmap" />,
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: page }}>
      <Sidebar
        active={activeNav}
        onNav={setActiveNav}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        {viewMap[activeNav]}
      </main>
    </div>
  );
}
