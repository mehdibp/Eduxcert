

export const TENANT = {
  name: "University of Ljubljana",
  shortName: "UL",
  did: "did:ebsi:uni-lj-2024-01",
  tier: "Pro",
  students: 4820,
  educators: 312,
  credentials: 1840,
  passRate: 84,
  avgGrade: 7.6,
};

export const PROGRAMMES = [
  { id:"p1", code:"CS-MSC", title:"MSc Computer Science",       level:"MA",  ects:120, students:284, status:"active", accred:"ABET 2027", curricula:["Core","Systems Track","AI Track"] },
  { id:"p2", code:"CS-BSC", title:"BSc Computer Science",       level:"BA",  ects:180, students:541, status:"active", accred:"ABET 2026", curricula:["Year 1","Year 2","Year 3"] },
  { id:"p3", code:"DS-MSC", title:"MSc Data Science",           level:"MA",  ects:120, students:162, status:"active", accred:"Pending",   curricula:["Core","Specialisation"] },
  { id:"p4", code:"MATH-B", title:"BSc Mathematics",            level:"BA",  ects:180, students:203, status:"active", accred:"EUA 2025",  curricula:["Year 1","Year 2","Year 3"] },
  { id:"p5", code:"AI-PHD", title:"PhD Artificial Intelligence",level:"PhD", ects:240, students:38,  status:"draft",  accred:"Pending",   curricula:["Research Plan"] },
];

export const DEGREE_PIPELINE = [
  { id:"d1", student:"Andreja Novak",  programme:"MSc Computer Science",  ects:120, gpa:8.4, status:"approved",  date:"Jun 2025" },
  { id:"d2", student:"Luka Petrov",    programme:"MSc Computer Science",  ects:120, gpa:7.1, status:"approved",  date:"Jun 2025" },
  { id:"d3", student:"Maja Horvat",    programme:"BSc Computer Science",  ects:180, gpa:8.9, status:"pending",   date:"Jun 2025" },
  { id:"d4", student:"Nik Zupan",      programme:"MSc Data Science",      ects:120, gpa:6.8, status:"pending",   date:"Jun 2025" },
  { id:"d5", student:"Sara Leban",     programme:"BSc Mathematics",       ects:180, gpa:9.1, status:"issued",    date:"Jan 2025" },
  { id:"d6", student:"Tine Merhar",    programme:"BSc Computer Science",  ects:180, gpa:7.5, status:"issued",    date:"Jan 2025" },
];

export const USERS = [
  { id:"u1", name:"Prof. Ana Kovač", email:"a.kovac@uni-lj.si",         role:"educator", dept:"Computer Science", status:"active",   mfa:true  },
  { id:"u2", name:"Dr. Miha Rus",    email:"m.rus@uni-lj.si",           role:"educator", dept:"Mathematics",      status:"active",   mfa:true  },
  { id:"u3", name:"Andreja Novak",   email:"a.novak@student.uni-lj.si", role:"student",  dept:"CS",               status:"active",   mfa:false },
  { id:"u4", name:"Admin Zupan",     email:"admin@uni-lj.si",           role:"admin",    dept:"Registry",         status:"active",   mfa:true  },
  { id:"u5", name:"Eva Bergant",     email:"e.bergant@uni-lj.si",       role:"educator", dept:"Data Science",     status:"inactive", mfa:false },
  { id:"u6", name:"Rok Vidmar",      email:"r.vidmar@student.uni-lj.si",role:"student",  dept:"Math",             status:"active",   mfa:false },
];

export const ACCRED_STEPS = [
  { id:"s1", label:"QI scorecard",            status:"done",    pct:100, detail:"Institution score: 87/100 · Top 15% in EU" },
  { id:"s2", label:"Auto-map evidence",       status:"done",    pct:82,  detail:"~80% coverage from QA records + audit log" },
  { id:"s3", label:"Fill gaps",               status:"active",  pct:45,  detail:"3 of 7 gap documents uploaded" },
  { id:"s4", label:"Preview dossier",         status:"pending", pct:0,   detail:"PDF + JSON with per-claim explainability" },
  { id:"s5", label:"Human review (2-person)", status:"pending", pct:0,   detail:"WebAuthn step-up required for both reviewers" },
  { id:"s6", label:"Submit to agency",        status:"pending", pct:0,   detail:"Signed PDF + JSON QR + audit trail → DEQAR" },
];

export const AUDIT_LOG = [
  { id:"a1", ts:"2025-06-09 14:23",  actor:"Admin Zupan",     action:"Degree awarded",                     resource:"Andreja Novak · MSc CS", risk:"low"    },
  { id:"a2", ts:"2025-06-09 11:05",  actor:"Prof. Kovač",     action:"Grades published",                   resource:"CS-711 · 34 students",   risk:"low"    },
  { id:"a3", ts:"2025-06-08 09:41",  actor:"System",          action:"Accreditation evidence auto-mapped", resource:"MSc CS · ABET 2027",     risk:"low"    },
  { id:"a4", ts:"2025-06-07 16:12",  actor:"Admin Zupan",     action:"Role changed",                       resource:"Eva Bergant → inactive", risk:"medium" },
  { id:"a5", ts:"2025-06-05 08:30",  actor:"System",          action:"Credential issued",                  resource:"Sara Leban · BSc Math",  risk:"low"    },
  { id:"a6", ts:"2025-06-04 23:11",  actor:"Unknown IP",      action:"Login failed (×5)",                  resource:"admin@uni-lj.si",        risk:"high"   },
  { id:"a7", ts:"2025-06-03 10:00",  actor:"Admin Zupan",     action:"Integration enabled",                resource:"Moodle LTI sync",        risk:"low"    },
];

export const QI_BENCHMARKS = [
  { metric:"Pass rate",          value:84,  peer:79,  unit:"%" },
  { metric:"Avg grade",          value:7.6, peer:7.1, unit:"/10" },
  { metric:"Credential issued",  value:92,  peer:81,  unit:"%" },
  { metric:"Time-to-degree",     value:28,  peer:32,  unit:"mo" },
  { metric:"Skills gap score",   value:71,  peer:65,  unit:"/100" },
];