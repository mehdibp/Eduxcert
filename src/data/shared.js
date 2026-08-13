import { green, greenBg, amber, amberBg, violet, violetBg, blue, blueBg, teal, tealBg } from "../styles/colors";


export const USER = {
  name: "Andreja Novak",
  initials: "AN",
  email: "a.novak@student.uni-lj.si",
  institution: "University of Ljubljana",
  programme: "MSc Computer Science",
  role: "student",
  did: "did:ebsi:andreja-novak-2024",
  locale: "en-GB",
  mfa: true,
  joinedOn: "September 2023",
  walletConnected: true,
};

export const CONSENTS = [
  { id:"qi",    label:"Quality Intelligence (QI)",      desc:"Allow QI to analyse your learning patterns and generate personalised roadmaps.",       granted:true,  required:false },
  { id:"share", label:"Share anonymised data with EQAR",desc:"Contribute anonymised academic data to the European Quality Assurance Register.",      granted:true,  required:false },
  { id:"push",  label:"Push notifications",             desc:"Receive grade alerts, exam reminders, and credential issuance notices.",               granted:true,  required:false },
  { id:"bench", label:"Benchmarking pool",              desc:"Allow your ECTS progress to be included in peer-institution benchmarks (anonymised).", granted:false, required:false },
  { id:"core",  label:"Essential platform cookies",     desc:"Required for authentication and session security. Cannot be disabled.",                granted:true,  required:true  },
];

export const NOTIFICATIONS = [
  { id:"n1", ts:"Today, 14:23",     type:"appeal",     read:false, title:"Grade appeal resolved",    body:"Your appeal for CS-711 Distributed Systems has been reviewed. Final grade: 9/10." },
  { id:"n2", ts:"Today, 09:05",     type:"grade",      read:false, title:"Grade published",          body:"Prof. Kovač published your grade for Distributed Systems — 9/10." },
  { id:"n3", ts:"Yesterday, 16:40", type:"credential", read:false, title:"Credential ready",         body:"Your certificate for Database Architecture (EDX-4401-DB03) is ready to share." },
  { id:"n4", ts:"Yesterday, 08:00", type:"exam",       read:true,  title:"Exam reminder",            body:"ML Fundamentals exam tomorrow at 13:00 in P-22. Don't forget your student ID." },
  { id:"n5", ts:"Jun 7, 11:15",     type:"ects",       read:true,  title:"ECTS awarded",             body:"4 ECTS awarded for completing Database Architecture. Your total: 68 / 120 ECTS." },
  { id:"n6", ts:"Jun 5, 09:30",     type:"roadmap",    read:true,  title:"Roadmap updated",          body:"QI refreshed your career roadmap. New recommendation: Formal Methods (CS-720)." },
  { id:"n7", ts:"Jun 3, 14:00",     type:"enrol",      read:true,  title:"Enrolment confirmed",      body:"You're enrolled in Cloud Architecture (CS-512). Check your timetable for session times." },
  { id:"n8", ts:"May 28, 10:00",    type:"benefit",    read:true,  title:"Student benefit redeemed", body:"Meal discount used at UL Cafeteria — 30% off. Monthly usage: 3/10." },
];

export const NOTIF_PREFS = [
  { id:"grades",      label:"Grade & exam results",  email:true,  push:true,  sms:false },
  { id:"credentials", label:"Credential issuance",   email:true,  push:true,  sms:false },
  { id:"exams",       label:"Exam reminders",        email:true,  push:true,  sms:true  },
  { id:"enrol",       label:"Enrolment changes",     email:true,  push:false, sms:false },
  { id:"roadmap",     label:"Roadmap & QI updates",  email:false, push:true,  sms:false },
  { id:"benefits",    label:"Benefit redemptions",   email:false, push:true,  sms:false },
];

export const BENEFITS = [
  { id:"b1", category:"Meals",     partner:"UL Cafeteria",               discount:"30%",  used:3,  limit:10,   status:"active", desc:"Show QR at any University of Ljubljana cafeteria for 30% off meals.",               icon:"🍽️", color:teal,   bg:tealBg   },
  { id:"b2", category:"Transport", partner:"Ljubljanski Potniški Promet",discount:"50%",  used:8,  limit:30,   status:"active", desc:"50% discount on monthly bus/tram passes in Ljubljana.",                             icon:"🚌", color:blue,   bg:blueBg   },
  { id:"b3", category:"Discounts", partner:"Celtra Technologies",        discount:"20%",  used:0,  limit:5,    status:"active", desc:"20% off Celtra SaaS products for students. Verify once, use for full term.",        icon:"💻", color:violet, bg:violetBg },
  { id:"b4", category:"Sports",    partner:"UL Sports Centre",           discount:"Free", used:12, limit:null, status:"active", desc:"Free access to university sports facilities with valid student-status credential.", icon:"🏋️", color:green,  bg:greenBg  },
  { id:"b5", category:"Library",   partner:"NUK — National Library",     discount:"Free", used:0,  limit:null, status:"active", desc:"Free access to NUK digital archives and reading rooms.",                            icon:"📚", color:amber,  bg:amberBg  },
];
