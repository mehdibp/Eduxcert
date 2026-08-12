import {violet, green, blue, amber, violetBg, greenBg, blueBg, amberBg} from "../styles/colors"


export const STUDENT = {
  name: "Andreja Novak", 
  initials: "AN",
  institution: "University of Ljubljana",
  programme: "MSc Computer Science",
  ectsEarned: 68, 
  ectsRequired: 120, 
  graduationTerm: "Spring 2026",
};

// Dashboard data --------------------------------------------------
export const DASH_COURSES = [
  {id: "1", code: "CS-711", title: "Distributed Systems",   ects: 6, language: "English",   status: "active",    progress: 72,  exam: "12 Jun 2025", grade: null},
  {id: "2", code: "CS-604", title: "ML Fundamentals",       ects: 6, language: "English",   status: "active",    progress: 45,  exam: "19 Jun 2025", grade: null},
  {id: "3", code: "CS-522", title: "Database Architecture", ects: 4, language: "Slovenian", status: "completed", progress: 100, exam: null,          grade: "9 / 10"},
  {id: "4", code: "CS-480", title: "Software Engineering",  ects: 4, language: "English",   status: "completed", progress: 100, exam: null,          grade: "8 / 10"},
];
export const DASH_CREDS = [
  {id: "c1", title: "Database Architecture", type: "Certificate", code: "EDX-4401-DB03"},
  {id: "c2", title: "Software Engineering",  type: "Certificate", code: "EDX-3120-QW88"},
];
export const TIMELINE = [
  {id: "t1", ts: "Apr 22, 2025", type: "grade",      text: "Grade published for Database Architecture — 9 / 10"},
  {id: "t2", ts: "Apr 10, 2025", type: "ects",       text: "4 ECTS awarded — Database Architecture"},
  {id: "t3", ts: "Mar 3, 2025",  type: "enrol",      text: "Enrolled in Distributed Systems (CS-711)"},
  {id: "t4", ts: "Feb 28, 2025", type: "enrol",      text: "Enrolled in Machine Learning Fundamentals (CS-604)"},
  {id: "t5", ts: "Jan 15, 2025", type: "credential", text: "Credential issued — Software Engineering Certificate"},
];

// Courses data ----------------------------------------------------
export const ALL_COURSES=[
  {id: "c01", code: "CS-711",   title: "Distributed Systems",           ects: 6, language: "English",   level: "MA",  programme: "Computer Science", term: "Spring 2025", capacity: 40, enrolled: 34, status: "open",      educator: "Prof. Kovač",        tags: ["Systems","Networking"],   description: "Fundamentals of distributed computing, consensus protocols, fault tolerance, and scalable architectures."},
  {id: "c02", code: "CS-604",   title: "Machine Learning Fundamentals", ects: 6, language: "English",   level: "MA",  programme: "Computer Science", term: "Spring 2025", capacity: 60, enrolled: 58, status: "full",      educator: "Assoc. Prof. Leban", tags: ["AI","Statistics"],        description: "Supervised & unsupervised learning, neural networks, model evaluation, and practical implementation."},
  {id: "c03", code: "CS-512",   title: "Cloud Architecture",            ects: 4, language: "English",   level: "MA",  programme: "Computer Science", term: "Spring 2025", capacity: 30, enrolled: 21, status: "open",      educator: "Prof. Merhar",       tags: ["Cloud","DevOps"],         description: "Design patterns for cloud-native systems, IaC, Kubernetes, and multi-region deployments."},
  {id: "c04", code: "CS-480",   title: "Software Engineering",          ects: 4, language: "English",   level: "BA",  programme: "Computer Science", term: "Spring 2025", capacity: 80, enrolled: 77, status: "open",      educator: "Dr. Zupan",          tags: ["Engineering","Agile"],    description: "Software lifecycle, architecture patterns, testing strategies, and team collaboration."},
  {id: "c05", code: "MATH-310", title: "Probability & Statistics",      ects: 6, language: "Slovenian", level: "BA",  programme: "Mathematics",      term: "Spring 2025", capacity: 50, enrolled: 50, status: "full",      educator: "Prof. Bergant",      tags: ["Math","Statistics"],      description: "Probability theory, random variables, hypothesis testing, and regression analysis."},
  {id: "c06", code: "CS-390",   title: "Operating Systems",             ects: 6, language: "Slovenian", level: "BA",  programme: "Computer Science", term: "Spring 2025", capacity: 45, enrolled: 29, status: "open",      educator: "Dr. Ferko",          tags: ["Systems","C"],            description: "Process scheduling, memory management, file systems, and concurrency primitives."},
  {id: "c07", code: "CS-801",   title: "Advanced Cryptography",         ects: 6, language: "English",   level: "PhD", programme: "Computer Science", term: "Spring 2025", capacity: 15, enrolled: 8,  status: "open",      educator: "Prof. Štefanič",     tags: ["Security","Math"],        description: "Public-key infrastructure, zero-knowledge proofs, lattice-based cryptography."},
  {id: "c08", code: "DATA-201", title: "Data Engineering",              ects: 4, language: "English",   level: "MA",  programme: "Data Science",     term: "Spring 2025", capacity: 35, enrolled: 35, status: "full",      educator: "Dr. Hribar",         tags: ["Data","Pipelines"],       description: "ETL pipelines, data lakes, streaming with Kafka, and warehouse design."},
  {id: "c09", code: "CS-670",   title: "Human-Computer Interaction",    ects: 4, language: "English",   level: "MA",  programme: "Computer Science", term: "Spring 2025", capacity: 40, enrolled: 18, status: "open",      educator: "Assoc. Prof. Rus",   tags: ["UX","Research"],          description: "User research, prototyping, usability testing, and accessibility standards."},
  {id: "c10", code: "CS-522",   title: "Database Architecture",         ects: 4, language: "Slovenian", level: "MA",  programme: "Computer Science", term: "Autumn 2024", capacity: 40, enrolled: 40, status: "completed", educator: "Prof. Kovač",        tags: ["Databases","SQL"],        description: "Relational theory, query optimisation, indexing strategies, and NoSQL alternatives."},
  {id: "c11", code: "CS-340",   title: "Computer Networks",             ects: 6, language: "Slovenian", level: "BA",  programme: "Computer Science", term: "Autumn 2024", capacity: 55, enrolled: 55, status: "completed", educator: "Dr. Vidmar",         tags: ["Networking","Protocols"], description: "TCP/IP stack, routing protocols, network security, and hands-on packet analysis."},
  {id: "c12", code: "CS-720",   title: "Formal Methods",                ects: 6, language: "English",   level: "MA",  programme: "Computer Science", term: "Spring 2025", capacity: 20, enrolled: 6,  status: "open",      educator: "Prof. Jakopin",      tags: ["Theory","Logic"],         description: "Model checking, temporal logic, theorem proving, and program verification."},
];

// Credentials -----------------------------------------------------
export const CRED_DATA=[
  {id: "cred-4401", code: "EDX-4401-DB03", type: "certificate", title: "Database Architecture", issuer:"University of Ljubljana", programme: "MSc Computer Science", issuedOn: "2025-01-22", ects: 4,   grade: "9 / 10", status:"active",  algorithm: "Ed25519", keyId: "did:ebsi:uni-lj-2024-01#key-1", ebsiTxHash: "0x3fa9...c812", verifyUrl: "https://verify.eduxcert.eu/c/EDX-4401-DB03", fields:[{id: "name", label: "Full name", value: "Andreja Novak", shown: true}, {id: "dob", label: "Date of birth", value: "1999-04-11", shown: false}, {id: "grade", label: "Grade", value: "9 / 10", shown: true}, {id: "ects", label: "ECTS credits", value: "4", shown: true}, {id: "issuer", label: "Issuer", value: "University of Ljubljana", shown: true}, {id: "nat", label: "Nationality", value: "Slovenian", shown: false}]},
  {id: "cred-3120", code: "EDX-3120-QW88", type: "certificate", title: "Software Engineering",  issuer:"University of Ljubljana", programme: "MSc Computer Science", issuedOn: "2025-01-15", ects: 4,   grade: "8 / 10", status:"active",  algorithm: "Ed25519", keyId: "did:ebsi:uni-lj-2024-01#key-1", ebsiTxHash: "0x7bc1...a034", verifyUrl: "https://verify.eduxcert.eu/c/EDX-3120-QW88", fields:[{id: "name", label: "Full name", value: "Andreja Novak", shown: true}, {id: "dob", label: "Date of birth", value: "1999-04-11", shown: false}, {id: "grade", label: "Grade", value: "8 / 10", shown: true}, {id: "ects", label: "ECTS credits", value: "4", shown: true}, {id: "issuer", label: "Issuer", value: "University of Ljubljana", shown: true}, {id: "nat", label: "Nationality", value: "Slovenian", shown: false}]},
  {id: "cred-9900", code: "EDX-9900-MSC1", type: "degree",      title: "MSc Computer Science",  issuer:"University of Ljubljana", programme: "MSc Computer Science", issuedOn: null,         ects: 120, grade: null,     status:"pending", algorithm: null,      keyId: null,                            ebsiTxHash: null,            verifyUrl: null,                                         fields:[]},
];

// Timetable -------------------------------------------------------
export const LECTURES=[
  {id: "l1", day: 0, start: 8,  dur: 2, course: "CS-711", title: "Distributed Systems",           room: "P-22", type: "lecture", color:violet, bg:violetBg},
  {id: "l2", day: 0, start: 10, dur: 1, course: "CS-604", title: "ML Fundamentals",               room: "P-14", type: "lab",     color:green,  bg:greenBg},
  {id: "l3", day: 1, start: 9,  dur: 2, course: "CS-512", title: "Cloud Architecture",            room: "A-8",  type: "lecture", color:blue,   bg:blueBg},
  {id: "l4", day: 1, start: 14, dur: 1, course: "CS-711", title: "Distributed Systems (Lab)",     room: "Lab-3",type: "lab",     color:violet, bg:violetBg},
  {id: "l5", day: 2, start: 8,  dur: 2, course: "CS-604", title: "ML Fundamentals",               room: "P-22", type: "lecture", color:green,  bg:greenBg},
  {id: "l6", day: 2, start: 11, dur: 1, course: "CS-480", title: "Software Engineering",          room: "P-11", type: "seminar", color:amber,  bg:amberBg},
  {id: "l7", day: 3, start: 10, dur: 2, course: "CS-512", title: "Cloud Architecture (Lab)",      room: "Lab-1",type: "lab",     color:blue,   bg:blueBg},
  {id: "l8", day: 3, start: 13, dur: 1, course: "CS-711", title: "Distributed Systems (Seminar)", room: "A-5",  type: "seminar", color:violet, bg:violetBg},
  {id: "l9", day: 4, start: 9,  dur: 2, course: "CS-480", title: "Software Engineering",          room: "P-22", type: "lecture", color:amber,  bg:amberBg},
];
export const EXAMS=[
  {id: "e1", course: "CS-711", title: "Distributed Systems",           date: new Date(2025,5,12), startTime: "09:00", room: "Main Hall A", capacity: 120, registered: 87, type: "written", color:violet, bg:violetBg},
  {id: "e2", course: "CS-604", title: "Machine Learning Fundamentals", date: new Date(2025,5,19), startTime: "13:00", room: "P-22",        capacity: 60,  registered: 58, type: "written", color:green,  bg:greenBg},
  {id: "e3", course: "CS-512", title: "Cloud Architecture",            date: new Date(2025,5,26), startTime: "10:00", room: "Lab-1",       capacity: 30,  registered: 21, type: "project", color:blue,   bg:blueBg},
  {id: "e4", course: "CS-480", title: "Software Engineering",          date: new Date(2025,6,3),  startTime: "09:00", room: "Main Hall B", capacity: 80,  registered: 65, type: "oral",    color:amber,  bg:amberBg},
];

// Roadmap ---------------------------------------------------------
export const CAREER_TARGETS=[
  {id: "t1", title: "Backend Engineer",   match:78,icon:"⚙️"},
  {id: "t2", title: "ML Engineer",        match:62,icon:"🤖"},
  {id: "t3", title: "Cloud Architect",    match:55,icon:"☁️"},
  {id: "t4", title: "Research Scientist", match:44,icon:"🔬"},
];
export const SKILLS=[
  {id: "s1", label: "Distributed Systems",   category: "Systems",     have: 72, need: 85},
  {id: "s2", label: "Machine Learning",      category: "AI/ML",       have: 45, need: 80},
  {id: "s3", label: "Cloud Infrastructure",  category: "DevOps",      have: 38, need: 75},
  {id: "s4", label: "SQL / NoSQL Databases", category: "Data",        have: 88, need: 90},
  {id: "s5", label: "Software Architecture", category: "Engineering", have: 61, need: 80},
  {id: "s6", label: "Python / Data Science", category: "AI/ML",       have: 52, need: 85},
  {id: "s7", label: "Security & Auth",       category: "Systems",     have: 35, need: 60},
  {id: "s8", label: "Technical Writing",     category: "Soft",        have: 70, need: 70},
];
export const RECS=[
  {id: "r1", code: "CS-720",   title:"Formal Methods",             ects:6, reason:"Closes logic-proof gap for ML roles",     priority:"high",   status: "open", color: violet, bg:violetBg},
  {id: "r2", code: "CS-801",   title:"Advanced Cryptography",      ects:6, reason:"Security gap identified by ESCO match",   priority:"medium", status: "open", color: blue,   bg:blueBg},
  {id: "r3", code: "DATA-201", title:"Data Engineering",           ects:4, reason:"Required for ML Engineer track",          priority:"high",   status: "full", color: amber,  bg:amberBg},
  {id: "r4", code: "CS-670",   title:"Human-Computer Interaction", ects:4, reason:"Rounds out software engineering profile", priority:"low",    status: "open", color: green,  bg:greenBg},
];
export const MILESTONES=[
  {id: "m1", label: "Enrolled in programme",      done: true,  date: "Sep 2023", ects: null},
  {id: "m2", label: "Completed 30 ECTS",          done: true,  date: "Jan 2024", ects: 30},
  {id: "m3", label: "Completed 60 ECTS",          done: true,  date: "Jun 2024", ects: 60},
  {id: "m4", label: "First credential issued",    done: true,  date: "Jan 2025", ects: null},
  {id: "m5", label: "Complete 90 ECTS",           done: false, date: "Jun 2025", ects: 90},
  {id: "m6", label: "Thesis proposal approved",   done: false, date: "Oct 2025", ects: null},
  {id: "m7", label: "Complete 120 ECTS (degree)", done: false, date: "Jun 2026", ects: 120},
  {id: "m8", label: "Degree credential issued",   done: false, date: "Jul 2026", ects: null},
];

