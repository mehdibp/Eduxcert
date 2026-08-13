

export const COMPANY = {
  name: "Celtra Technologies d.o.o.",
  did: "did:ebsi:celtra-tech-2024-01",
  trustStatus: "active",
  kycDate: "2024-11-03",
  tier: "Workforce",
  employees: 148,
  openRoles: 3,
};

export const CANDIDATES = [
  { id:"c1", name:"Andreja Novak", role:"Backend Engineer", match:91, status:"verified", credentials:[ { code:"EDX-4401-DB03", title:"Database Architecture", valid:true,  ects:4 }, { code:"EDX-3120-QW88", title:"Software Engineering",  valid:true, ects:4 }, ], skills:["Distributed Systems","SQL/NoSQL","Software Architecture","Python"],    gaps:["Cloud Infrastructure"],                                                          applied:"2025-06-01", stage:"offer" },
  { id:"c2", name:"Luka Petrov",   role:"ML Engineer",      match:67, status:"verified", credentials:[ { code:"EDX-5510-ML01", title:"ML Fundamentals",       valid:true,  ects:6 },                                                                              ], skills:["Machine Learning","Python"],                                           gaps:["Distributed Systems","Cloud Infrastructure","Security"],                         applied:"2025-06-03", stage:"interview" },
  { id:"c3", name:"Maja Horvat",   role:"Cloud Architect",  match:88, status:"verified", credentials:[ { code:"EDX-7821-CA02", title:"Cloud Architecture",    valid:true,  ects:4 }, { code:"EDX-4401-DB03", title:"Database Architecture", valid:true, ects:4 }, ], skills:["Cloud Infrastructure","Kubernetes","SQL/NoSQL","Distributed Systems"], gaps:["Advanced Cryptography"],                                                         applied:"2025-06-05", stage:"screening" },
  { id:"c4", name:"Nik Zupan",     role:"Backend Engineer", match:44, status:"pending",  credentials:[ { code:"EDX-0000-UNK9", title:"Advanced Statistics",   valid:false, ects:4 },                                                                              ], skills:["Python"],                                                              gaps:["Distributed Systems","Software Architecture","Cloud Infrastructure","Security"], applied:"2025-06-07", stage:"new" },
];

export const JOB_POSTS = [
  { id:"j1", title:"Senior Backend Engineer",  dept:"Engineering", ects:null, skills:["Distributed Systems","Software Architecture","SQL/NoSQL","Security"], credentials:["BSc or MSc Computer Science"],                                  applicants:12, status:"active",  posted:"2025-05-20" },
  { id:"j2", title:"ML Engineer",              dept:"Data",        ects:null, skills:["Machine Learning","Python / Data Science","Cloud Infrastructure"],    credentials:["BSc Computer Science","ML Fundamentals Certificate"],           applicants:7,  status:"active",  posted:"2025-05-28" },
  { id:"j3", title:"Cloud Architect",          dept:"Platform",    ects:null, skills:["Cloud Infrastructure","Kubernetes","Distributed Systems"],            credentials:["BSc or MSc Computer Science","Cloud Architecture Certificate"], applicants:5,  status:"active",  posted:"2025-06-01" },
  { id:"j4", title:"Junior Data Analyst",      dept:"Data",        ects:null, skills:["SQL/NoSQL","Python / Data Science"],                                  credentials:["BSc Mathematics or Data Science"],                              applicants:21, status:"closed",  posted:"2025-04-10" },
];

export const EMPLOYEES = [
  { id:"e1", name:"Sara Leban",   dept:"Engineering", role:"Backend Engineer", start:"2023-03-01", skills:["Distributed Systems","SQL/NoSQL","Software Architecture"], gaps:["Machine Learning","Advanced Cryptography"],               vcIssued:true  },
  { id:"e2", name:"Tine Merhar",  dept:"Data",        role:"Data Scientist",   start:"2022-11-15", skills:["Machine Learning","Python / Data Science","SQL/NoSQL"],    gaps:["Cloud Infrastructure"],                                   vcIssued:true  },
  { id:"e3", name:"Blaž Jakopin", dept:"Platform",    role:"DevOps Engineer",  start:"2024-01-08", skills:["Cloud Infrastructure","Kubernetes"],                       gaps:["Security","Distributed Systems"],                         vcIssued:false },
  { id:"e4", name:"Eva Bergant",  dept:"Engineering", role:"Junior Developer", start:"2024-09-01", skills:["Python / Data Science","Software Architecture"],           gaps:["Distributed Systems","SQL/NoSQL","Cloud Infrastructure"], vcIssued:false },
];

export const WORKFORCE_SKILLS = [
  { skill:"Software Architecture",  have:78, market:80 },
  { skill:"SQL / NoSQL",            have:85, market:82 },
  { skill:"Machine Learning",       have:52, market:75 },
  { skill:"Cloud Infrastructure",   have:44, market:78 },
  { skill:"Distributed Systems",    have:61, market:72 },
  { skill:"Security & Auth",        have:35, market:68 },
  { skill:"Python / Data Science",  have:70, market:76 },
  { skill:"Advanced Cryptography",  have:20, market:45 },
];

export const PATHWAYS = [
  { id:"pw1", title:"Cloud Engineering Track", provider:"University of Ljubljana",  courses:["Cloud Architecture (4 ECTS)","Distributed Systems (6 ECTS)"], duration:"2 terms", employees:["Blaž Jakopin","Eva Bergant"], status:"available" },
  { id:"pw2", title:"ML & Data Science Track", provider:"University of Ljubljana",  courses:["ML Fundamentals (6 ECTS)","Data Engineering (4 ECTS)"],       duration:"2 terms", employees:["Sara Leban"],                 status:"enrolled"  },
  { id:"pw3", title:"Security Fundamentals",   provider:"Eduxcert Partner Network", courses:["Advanced Cryptography (6 ECTS)","Security & Auth (4 ECTS)"],  duration:"2 terms", employees:[],                             status:"available" },
];
