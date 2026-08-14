import { gold, green, red, amber, muted, border } from "../../styles/colors";



// Shield with a check mark inside it ------------------------------
export function ShieldIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M8 1L2 3.5v5.5c0 3.5 2.7 5.5 6 6 3.3-.5 6-2.5 6-6V3.5L8 1z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M5.5 8l2 2L11 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    }

// Triangle with an exclamation mark inside it ---------------------
export function AlertIcon({size=16, color=amber}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M8 2L1.5 13h13L8 2z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M8 7v3M8 11.5v.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>;
    }

// Star ------------------------------------------------------------
export function BadgeIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
        <path d="M8 1.5l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9.5l-3 1.5.5-3.5L3 5l3.5-.5L8 1.5z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/></svg>;
    }

// Bell ------------------------------------------------------------
export function BellIcon ({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M8 2a5 5 0 0 1 5 5v3l1.5 2h-13L3 10V7a5 5 0 0 1 5-5z" stroke={color} strokeWidth="1.3"/>
        <path d="M6.5 12.5a1.25 1.5 0 0 0 3 0" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>;
    }

// Book or Paper ---------------------------------------------------
export function BookIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M3 2h7a2 2 0 0 1 2 2v9H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke={color} strokeWidth="1.3"/>
        <path d="M12.5 13a1 1 0 0 0 1-1V5h-1" stroke={color} strokeWidth="1.3"/>
        <path d="M5 5h5M5 7.5h5M5 10h3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/></svg>;
    }

// Open Book -------------------------------------------------------
export function BookOpenIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M8 3C6 1.5 3 2 2 3v10c1-1 4-1.5 6 0 2-1.5 5-1 6 0V3c-1-1-4-1.5-6 0z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M8 3v10" stroke={color} strokeWidth="1.3"/></svg>;
    }

// Briefcase or Bag ------------------------------------------------
export function BriefcaseIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="5" width="13" height="9" rx="1.5" stroke={color} strokeWidth="1.3"/>
        <path d="M5 5V3.5A1.5 1.5 0 0 1 6.5 2h3A1.5 1.5 0 0 1 11 3.5V5" stroke={color} strokeWidth="1.3"/>
        <path d="M1.5 9h13" stroke={color} strokeWidth="1.3"/></svg>;
    }

// Calendar --------------------------------------------------------
export function CalendarIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="3" width="13" height="11" rx="1.5" stroke={color} strokeWidth="1.3"/>
        <path d="M5 1.5V4M11 1.5V4M1.5 7h13" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>;
    }

// Bar chart -------------------------------------------------------
export function ChartIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <rect x="2"   y="9" width="3" height="5"  rx="0.5" fill={color} opacity="0.6"/>
        <rect x="6.5" y="5" width="3" height="9"  rx="0.5" fill={color} opacity="0.8"/>
        <rect x="11"  y="2" width="3" height="12" rx="0.5" fill={color}/></svg>;
    }

// Green Check -----------------------------------------------------
export function CheckIcon({size=14, color=green}) {
    return <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
        <path d="M2 7l3.5 3.5L12 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    }

// Down arrow ------------------------------------------------------
export function ChevronIcon({size=14, color=muted, open}) {
    return <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={{transform:open?"rotate(180deg)":"rotate(0)",transition:"transform .15s"}}>
        <path d="M3 5l4 4 4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    }

// Clock -----------------------------------------------------------
export function ClockIcon({size=12, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M6 3.5V6l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    }

// Copy in square ---------------------------------------------------
export function CopyIcon({size=14, color="currentColor"}){
    return <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
        <rect x="4" y="4" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.2"/>
        <path d="M2 10V3a1 1 0 0 1 1-1h7" stroke={color} strokeWidth="1.2" strokeLinecap="round"/> </svg>;
    }

// Certificate or Diploma -------------------------------------------
export function DiplomaIcon({size=20, color=gold}) {
    return <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="14" rx="2" stroke={color} strokeWidth="1.4"/>
        <path d="M6 7h8M6 10h5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="14" cy="13" r="2.5" stroke={color} strokeWidth="1.2"/>
        <path d="M15 15.5v2.5l-1-.8-1 .8v-2.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    }

// Download ---------------------------------------------------------
export function DownloadIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M8 3v7M5 8l3 3 3-3" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 13h10" stroke={color} strokeWidth="1.4" strokeLinecap="round"/> </svg>;
    }

// Pencil for editing -----------------------------------------------
export function EditIcon({size=14, color=muted}) {
    return <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
        <path d="M9.5 2.5l2 2-7 7H2.5v-2l7-7z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/> </svg>;
    }

// Extract ----------------------------------------------------------
export function ExternalIcon({size=12, color="currentColor"}){
    return <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
        <path d="M7 2h3v3M10 2L5.5 6.5M6 3H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V7" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    }

// Three parallel lines (Filter) ------------------------------------
export function FilterIcon({size=16, color=muted}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M2 4h12M4 8h8M6 12h4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/> </svg>;
    }

// Gift -------------------------------------------------------------
export function GiftIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="6" width="13" height="8" rx="1.5" stroke={color} strokeWidth="1.3"/>
        <path d="M1.5 9h13M8 6v8" stroke={color} strokeWidth="1.3"/>
        <path d="M8 6C8 4 6 2 4.5 3.5S5 6 8 6zM8 6c0-2 2-4 3.5-2.5S11 6 8 6z" stroke={color} strokeWidth="1.2"/> </svg>;
    }

// A page with a check mark inside it -------------------------------
export function GradeIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M4 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke={color} strokeWidth="1.3"/>
        <path d="M6 6l1.5 1.5L11 4M6 10h4" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/> </svg>;
    }

// Four squares as a grid -------------------------------------------
export function GridIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill={color} opacity="0.8"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill={color} opacity="0.8"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill={color} opacity="0.8"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill={color} opacity="0.8"/> </svg>;
    }

// Key --------------------------------------------------------------
export function KeyIcon({size=14, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="4.5" cy="8" r="2.2" stroke={color} strokeWidth="1.3"/>
        <path d="M7 8.2l7.5-0 M13.7 6.5l-0 1.5 M12 7l-0 1" stroke={color} strokeWidth="1.3" strokeLinecap="round"/> </svg>;
    }

// Lightning --------------------------------------------------------
export function LightningIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M9.5 2L4 9h5l-2.5 6L13 7H9L9.5 2z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/> </svg>;
    }

// Text in page (log) -----------------------------------------------
export function LogIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M3 2h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke={color} strokeWidth="1.3"/>
        <path d="M5 5h6M5 8h6M5 11h3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/> </svg>;
    }

// Logout or Exit ---------------------------------------------------
export function LogoutIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M10 11l3-3-3-3M13 8H6" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/> </svg>;
    }

// Map --------------------------------------------------------------
export function MapIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M6 2L2 4v10l4-2 4 2 4-2V2l-4 2-4-2z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M6 2v10M10 4v10" stroke={color} strokeWidth="1.3"/> </svg>;
    }

// Path - something like git ----------------------------------------
export function PathIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="3"  cy="8"  r="2" stroke={color} strokeWidth="1.3"/>
        <circle cx="13" cy="4"  r="2" stroke={color} strokeWidth="1.3"/>
        <circle cx="13" cy="12" r="2" stroke={color} strokeWidth="1.3"/>
        <path d="M5 8h4M9 8c0-2 2-4 2-4M9 8c0 2 2 4 2 4" stroke={color} strokeWidth="1.2" strokeLinecap="round"/> </svg>;
    }

// Two people together ----------------------------------------------
export function PeopleIcon({size=12, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
        <circle cx="4.5" cy="3.5" r="1.5" stroke={color} strokeWidth="1.1"/>
        <circle cx="8.8" cy="3.5" r="1.5" stroke={color} strokeWidth="1.1"/>
        <path d="M1 10c0-2 1.6-3 3.5-3s3.5 1 3.5 3" stroke={color} strokeWidth="1.1" strokeLinecap="round"/>
        <path d="M8.4 7c1.5.2 2.5 1 2.5 3"          stroke={color} strokeWidth="1.1" strokeLinecap="round"/> </svg>;
    }

// Plus -------------------------------------------------------------
export function PlusIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M3 8h10" stroke={color} strokeWidth="1.6" strokeLinecap="round"/> </svg>;
    }

// Circle with a question mark inside it ----------------------------
export function QuestionIcon({size=16, color=amber}){
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5"/>
        <path d="M6.5 6.5C6.5 5.7 7.2 5 8 5s1.5.7 1.5 1.5c0 1-1.5 1.5-1.5 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="8" cy="11.5" r="0.75" fill={color}/> </svg>;
    }

// Location ---------------------------------------------------------
export function RoomIcon({size=12, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
        <path d="M6 1.5C4.3 1.5 3 2.8 3 4.5c0 2.6 3 6 3 6s3-3.4 3-6c0-1.7-1.3-3-3-3z" stroke={color} strokeWidth="1.2"/>
        <circle cx="6" cy="4.5" r="1" fill={color}/> </svg>;
    }

// Scan -------------------------------------------------------------
export function ScanIcon({size=40, color=muted}){
    return <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M3 12V5a2 2 0 0 1 2-2h7M28 3h7a2 2 0 0 1 2 2v7M37 28v7a2 2 0 0 1-2 2h-7M12 37H5a2 2 0 0 1-2-2v-7" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <rect x="11" y="11" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="22" y="11" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5"/>
        <rect x="11" y="22" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5"/>
        <path d="M22 22h2M24 22v2M24 24h3M27 24v5M24 27h3M22 26v3M22 29h2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 20h24" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2"/> </svg>;
    }

// Circle with a check mark inside it -------------------------------
export function SealNavIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.3"/>
        <path d="M5.3 8l2 2 4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/> </svg>;
    }

// Search -----------------------------------------------------------
export function SearchIcon({size=16, color=muted}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="4" stroke={color} strokeWidth="1.4"/>
        <path d="M10 10 l4 4" stroke={color} strokeWidth="1.4" strokeLinecap="round"/> </svg>;
    }

// Another Search (Search People) -----------------------------------
export function SearchPeopleIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="6" r="4" stroke={color} strokeWidth="1.3"/>
        <path d="M9 9 l4.5 4.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M4.5 6h3M6 4.5v3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/> </svg>;
    }

// Send or Telegram -------------------------------------------------
export function SendIcon({size=14, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
        <path d="M12 2L6 7M12 2L8.5 12L6 7L1 5L12 2z" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/> </svg>;
    }

// Sun -------------------------------------------------------------- ///
export function SettingsIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke={color} strokeWidth="1.3"/>
        <path d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.2 3.2l.7.7M12.1 12.1l.7.7M3.2 12.8l.7-.7M12.1 3.9l.7-.7" stroke={color} strokeWidth="1.3" strokeLinecap="round"/></svg>;
    }

// Share ------------------------------------------------------------
export function ShareIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="12" cy="4"  r="1.5" stroke={color} fill={color}/>
        <circle cx="4"  cy="8"  r="1.5" stroke={color} fill={color}/>
        <circle cx="12" cy="12" r="1.5" stroke={color} fill={color}/>
        <path d="M5 8.5l6 3M12 4L5 7.5" stroke={color} strokeWidth="1.3"/> </svg>;
    }

// Trash ------------------------------------------------------------
export function TrashIcon({size=14, color=red}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M3 4h10M6 4V1.5h4v2M5 4v6.5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    }

// Upload -----------------------------------------------------------
export function UploadIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <path d="M8 11V4M5 7l3-3 3 3" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 13h10" stroke={color} strokeWidth="1.4" strokeLinecap="round"/> </svg>;
    }

// User - Body ------------------------------------------------------
export function UserIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5" r="3" stroke={color} strokeWidth="1.3"/>
        <path d="M2 14c0-3 2.7-5 6-5s6 2 6 5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/> </svg>;
    }

// Wallet -----------------------------------------------------------
export function WalletIcon({size=16, color="currentColor"}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="4" width="13" height="10" rx="1.5" stroke={color} strokeWidth="1.3"/>
        <path d="M1.5 7h13" stroke={color} strokeWidth="1.3"/>
        <circle cx="11.5" cy="10" r="1" fill={color}/> </svg>;
    }

// Circle with an X inside it ---------------------------------------
export function XCircleIcon({size=16, color=red}) {
    return <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5"/>
        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/> </svg>;
    }

// X ----------------------------------------------------------------
export function XIcon({size=14, color=muted}) {
    return <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
        <path d="M2 2l10 10M12 2L2 12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/> </svg>;
    }
    
// Loading - Spin Rotation ------------------------------------------
export function SpinIcon({size=18}) {
    return <svg width={size} height={size} viewBox="0 0 18 18" fill="none"
        className="animate-spin" style={{animationDuration:"1s"}}>
        <circle cx="9" cy="9" r="7" stroke={border} strokeWidth="2.5"/>
        <path d="M9 2a7 7 0 0 1 7 7" stroke={gold} strokeWidth="2.5" strokeLinecap="round"/> </svg>;
    }

// Seal Creed -------------------------------------------------------
export function SealCredIcon({size=20, color=gold}) {
    return <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke={color} strokeWidth="1.4"/>

        {Array.from({length:20}).map((_,i)=>{
        const a=(i/20)*Math.PI*2,x1=10+Math.cos(a)*9.2,y1=10+Math.sin(a)*9.2;
        const x2=10+Math.cos(a)*10,y2=10+Math.sin(a)*10;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" opacity="0.6"/>;
        })}

        <path d="M6.5 10.5l2.5 2.5 5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/> </svg>;
    }

// Brand Gold Seal (Approval Logo) ----------------------------------
export function SealMark({ size=88, color=gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" opacity="0.55" />
      <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="1.5" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2, x1 = 50 + Math.cos(a) * 41, y1 = 50 + Math.sin(a) * 41;
        const x2 = 50 + Math.cos(a) * 44.5, y2 = 50 + Math.sin(a) * 44.5;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.2" />;
      })}
      <path d="M35 51 L45 61 L66 38" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
