

export const SCENARIOS = {
  valid:   { code: "EDX-4401-DB03", type: "Certificate", title: "Database Architecture",       subject: "A. Novak", subjectHash: "sha256:3fa9b…c812", issuer: "University of Ljubljana", issuerDid: "did:ebsi:uni-lj-2024-01",    issuedOn: "22 Jan 2025", algorithm: "Ed25519",  ebsiTxHash: "0x3fa9b1c2d3e4f5…c812", ects: 4,    disclosed: ["Title","Issuer","ECTS credits","Issue date"], result: "valid", },
  revoked: { code: "EDX-7700-XX11", type: "Certificate", title: "Introduction to Programming", subject: "B. K.",    subjectHash: "sha256:9bc1e…a034", issuer: "University of Ljubljana", issuerDid: "did:ebsi:uni-lj-2024-01",    issuedOn: "10 Jun 2023", algorithm: "Ed25519",  ebsiTxHash: null,                    ects: 4,    disclosed: ["Title","Issuer"],                             result: "revoked", },
  unknown: { code: "EDX-0000-UNK9", type: "Certificate", title: "Advanced Statistics",         subject: "—",        subjectHash: "sha256:????",       issuer: "Unknown Institution",     issuerDid: "did:example:unknown-issuer", issuedOn: "—",           algorithm: "RSA-2048", ebsiTxHash: null,                    ects: null, disclosed: [],                                             result: "unknown", },
};

export const VSTEPS = [
  { id:1, label:"Read credential",  detail:"Parsing W3C Verifiable Credential JSON structure",      icon:"📄" },
  { id:2, label:"Verify signature", detail:"Ed25519 JWS checked against issuer public key offline", icon:"🔏" },
  { id:3, label:"Revocation check", detail:"CDN-cached status-list 2021 bitstring",                 icon:"🔍" },
  { id:4, label:"Trust anchor",     detail:"Issuer DID looked up in EBSI Trusted Issuers Registry", icon:"⚓" },
];
