import { useState } from "react";
import { ink, inkSoft, gold, goldLight, paper, page} from "../styles/colors";


function SealMark({ size = 88 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" stroke={goldLight} strokeWidth="1.5" opacity="0.55" />
      <circle cx="50" cy="50" r="38" stroke={gold} strokeWidth="1.5" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const x1 = 50 + Math.cos(a) * 41;
        const y1 = 50 + Math.sin(a) * 41;
        const x2 = 50 + Math.cos(a) * 44.5;
        const y2 = 50 + Math.sin(a) * 44.5;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={goldLight} strokeWidth="1.2" />;
      })}
      <path
        d="M35 51 L45 61 L66 38"
        stroke={gold}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function CredentialCard({ rotate, offsetY, title, name, idCode }) {
  return (
    <div
      className="absolute w-56 rounded-lg p-4 shadow-2xl"
      style={{
        backgroundColor: paper,
        transform: `rotate(${rotate}deg) translateY(${offsetY}px)`,
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.45)",
      }}
    >
      <div
        className="absolute top-0 right-0 w-8 h-8"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${gold} 50%)`,
          borderRadius: "0 6px 0 0",
        }}
      />
      <p className="text-[9px] font-semibold tracking-[0.18em] uppercase" style={{ color: gold }}>
        Verified Credential
      </p>
      <p className="mt-2 font-serif text-sm" style={{ color: ink }}>
        {title}
      </p>
      <p className="mt-3 text-[11px]" style={{ color: "#475569" }}>
        {name}
      </p>
      <p className="mt-2 font-mono text-[10px] tracking-wide" style={{ color: "#94A3B8" }}>
        {idCode}
      </p>
    </div>
  );
}

export default function StudentLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-stretch" style={{ backgroundColor: page }}>
      <div className="w-full grid lg:grid-cols-2">
        {/* Left — brand / trust panel */}
        <div
          className="relative hidden lg:flex flex-col justify-between overflow-hidden px-14 py-12"
          style={{ background: `linear-gradient(160deg, ${ink} 0%, ${inkSoft} 100%)` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ border: `1.5px solid ${gold}` }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: gold }} />
            </div>
            <span className="text-white font-serif text-lg tracking-wide">Eduxcert</span>
          </div>

          <div className="relative flex-1 flex items-center">
            <div className="relative w-full" style={{ height: 280 }}>
              <div className="absolute left-2 top-6">
                <CredentialCard
                  rotate={-9}
                  offsetY={18}
                  title="Bachelor of Science, Computer Engineering"
                  name="A. Novak"
                  idCode="EDX-7741-KX02"
                />
              </div>
              <div className="absolute left-24 top-0">
                <CredentialCard
                  rotate={6}
                  offsetY={0}
                  title="Professional Certificate, Data Analysis"
                  name="A. Novak"
                  idCode="EDX-3120-QW88"
                />
              </div>
              <div
                className="absolute"
                style={{ left: 8, top: 150, filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.5))" }}
              >
                <SealMark size={72} />
              </div>
            </div>
          </div>

          <div>
            <div
              className="h-px w-full mb-5"
              style={{
                backgroundImage: `radial-gradient(${goldLight} 1px, transparent 1.5px)`,
                backgroundSize: "10px 1px",
                opacity: 0.6,
              }}
            />
            <h1 className="font-serif text-3xl text-white leading-snug max-w-sm">
              Every credential, traceable to its source.
            </h1>
            <p className="mt-3 text-sm max-w-sm" style={{ color: "#A9B4CC" }}>
              Your transcripts, certificates and degrees — issued by your institution,
              held by you, verifiable by anyone you choose to show them to.
            </p>
          </div>
        </div>

        {/* Right — sign in */}
        <div className="flex flex-col justify-center px-6 sm:px-16 py-12" style={{ backgroundColor: paper }}>
          <div className="w-full max-w-sm mx-auto">
            <div className="lg:hidden flex items-center gap-3 mb-10">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ border: `1.5px solid ${gold}` }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: gold }} />
              </div>
              <span className="font-serif text-lg tracking-wide" style={{ color: ink }}>
                Eduxcert
              </span>
            </div>

            <p
              className="text-[11px] font-semibold tracking-[0.16em] uppercase mb-2"
              style={{ color: gold }}
            >
              Student Portal · University of Ljubljana
            </p>
            <h2 className="font-serif text-2xl mb-1" style={{ color: ink }}>
              Sign in to your record
            </h2>
            <p className="text-sm mb-8" style={{ color: "#64748B" }}>
              Use your institutional account to continue.
            </p>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#334155" }}>
                  Institutional email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors"
                  style={{ borderColor: "#CBD5E1", color: ink }}
                  onFocus={(e) => (e.target.style.borderColor = gold)}
                  onBlur={(e) => (e.target.style.borderColor = "#CBD5E1")}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium" style={{ color: "#334155" }}>
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium"
                    style={{ color: gold }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors pr-16"
                    style={{ borderColor: "#CBD5E1", color: ink }}
                    onFocus={(e) => (e.target.style.borderColor = gold)}
                    onBlur={(e) => (e.target.style.borderColor = "#CBD5E1")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium"
                    style={{ color: "#64748B" }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-md py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: ink }}
              >
                Sign in
              </button>
            </form>

            <div className="flex items-center gap-3 my-7">
              <div className="h-px flex-1" style={{ backgroundColor: "#E2E8F0" }} />
              <span className="text-xs" style={{ color: "#94A3B8" }}>or</span>
              <div className="h-px flex-1" style={{ backgroundColor: "#E2E8F0" }} />
            </div>

            <button
              type="button"
              className="w-full rounded-md py-2.5 text-sm font-medium border flex items-center justify-center gap-2"
              style={{ borderColor: "#CBD5E1", color: ink }}
            >
              <SealMark size={16} />
              Continue with EUDI Wallet
            </button>

            <p className="mt-9 text-xs text-center" style={{ color: "#94A3B8" }}>
              Protected by your institution's identity provider. Eduxcert never sees your
              password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
