

export const EDUCATOR = {
  name: "Prof. Ana Kovač", 
  initials: "AK",
  title: "Associate Professor",
  department: "Computer Science",
  institution: "University of Ljubljana",
};


export const MY_COURSES = [
  { id:"mc1", code:"CS-711", title:"Distributed Systems",   ects:6, level:"MA", language:"English",   term:"Spring 2025", status:"active",   enrolled:34, capacity:40, programme:"Computer Science", tags:["Systems","Networking","Consensus"], examDate:"2025-06-12", examRoom:"Main Hall A", gradingStatus:"published", passRate:82,   avgGrade:7.4 },
  { id:"mc2", code:"CS-522", title:"Database Architecture", ects:4, level:"MA", language:"Slovenian", term:"Autumn 2024", status:"archived", enrolled:40, capacity:40, programme:"Computer Science", tags:["Databases","SQL","NoSQL"],          examDate:"2024-12-15", examRoom:"P-22",        gradingStatus:"published", passRate:90,   avgGrade:8.1 },
  { id:"mc3", code:"CS-390", title:"Operating Systems",     ects:6, level:"BA", language:"Slovenian", term:"Spring 2025", status:"active",   enrolled:29, capacity:45, programme:"Computer Science", tags:["Systems","C","Concurrency"],        examDate:"2025-06-20", examRoom:"P-14",        gradingStatus:"draft",     passRate:null, avgGrade:null },
];

// grade.status: draft | reviewed | published | appealed | final
export const GRADES = [
  { id:"g01", student:"Andreja Novak",   sid:"S-2211", score:9, max:10, status:"published", appeal:null },
  { id:"g02", student:"Luka Petrov",     sid:"S-2212", score:7, max:10, status:"published", appeal:null },
  { id:"g03", student:"Maja Horvat",     sid:"S-2213", score:8, max:10, status:"published", appeal:null },
  { id:"g04", student:"Nik Zupan",       sid:"S-2214", score:5, max:10, status:"appealed",  appeal:"Score seems inconsistent with my written answers on Q3 and Q5." },
  { id:"g05", student:"Sara Leban",      sid:"S-2215", score:6, max:10, status:"published", appeal:null },
  { id:"g06", student:"Tine Merhar",     sid:"S-2216", score:4, max:10, status:"appealed",  appeal:"I believe the partial credit policy was not applied to my Q2." },
  { id:"g07", student:"Vita Štefanič",   sid:"S-2217", score:10,max:10, status:"published", appeal:null },
  { id:"g08", student:"Rok Vidmar",      sid:"S-2218", score:7, max:10, status:"reviewed",  appeal:null },
  { id:"g09", student:"Katja Ferko",     sid:"S-2219", score:6, max:10, status:"reviewed",  appeal:null },
  { id:"g10", student:"Blaž Jakopin",    sid:"S-2220", score:8, max:10, status:"draft",     appeal:null },
  { id:"g11", student:"Eva Bergant",     sid:"S-2221", score:3, max:10, status:"draft",     appeal:null },
  { id:"g12", student:"Miha Rus",        sid:"S-2222", score:9, max:10, status:"draft",     appeal:null },
];

export const ADVISEES = [
  { id:"a1", name:"Andreja Novak", programme:"MSc CS", ects:68, ectsReq:120, match:78, target:"Backend Engineer", gap:["Machine Learning","Cloud Infrastructure","Security"], lastMeeting:"2025-04-10" },
  { id:"a2", name:"Luka Petrov",   programme:"MSc CS", ects:44, ectsReq:120, match:55, target:"ML Engineer",      gap:["Distributed Systems","Python / Data Science"],        lastMeeting:"2025-03-22" },
  { id:"a3", name:"Maja Horvat",   programme:"MSc CS", ects:92, ectsReq:120, match:88, target:"Cloud Architect",  gap:["Advanced Cryptography"],                              lastMeeting:"2025-05-01" },
];

export const TIMELINE_EVENTS = [
  { id:"e1", ts:"Jun 9, 2025",  type:"appeal",  text:"Grade appeal submitted — Nik Zupan (CS-711)" },
  { id:"e2", ts:"Jun 5, 2025",  type:"grade",   text:"Grades reviewed for CS-711 — awaiting publish" },
  { id:"e3", ts:"Jun 2, 2025",  type:"exam",    text:"Exam held — Distributed Systems · 34 attended" },
  { id:"e4", ts:"May 20, 2025", type:"enrol",   text:"Enrolment closed — CS-390 · 29 / 45 students" },
  { id:"e5", ts:"May 5, 2025",  type:"publish", text:"Grades published — Database Architecture (Autumn 2024)" },
];

