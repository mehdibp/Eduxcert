import Logo from '../../assets/react.svg'
import { LogoutIcon } from "../icons/icons";
import { ink, inkSoft, gold, goldBg, red, redBg, white } from "../../styles/colors";


// Just to show notifications next to each navbar --------------------
const renderBadge = ({ className, style, badge, show = true }) => {
    if (!show || !badge) return null;
    return ( <span className={className} style={style}> {badge} </span> )};


export default function Sidebar({ subtitle, navItems, active, onNav, collapsed, onToggle, onLogout, user, width=224 }) {
  return (
    <aside
      className="flex flex-col h-full select-none transition-all duration-200 min-h-screen border-r"
      style={{
        width: collapsed ? 56 : width,
        backgroundColor: ink,
        borderColor: inkSoft,
      }}
    >
      
      {/* Logo and Name ------------------------------- */}
      <div className="flex items-center gap-2.5 h-16 px-4 py-5 cursor-pointer shrink-0" onClick={onToggle}>
        <img className="w-7 h-7 shrink-0" src={Logo}/>

        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-white font-serif text-sm tracking-wide truncate">Eduxcert</p>
            {subtitle && <p className="text-[10px] truncate" style={{ color: "#64748B" }}>{subtitle}</p>}
          </div>
        )}
      </div>

      {/* All navbar options -------------------------- */}
      <nav className="flex-1 px-2 pt-2 space-y-0.5">  
        {navItems.map(({ id, label, Icon, badge }) => {
          const on = active === id;
          return (
            <button 
              key={id} 
              onClick={() => onNav(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
              style={{ backgroundColor: on ? "rgba(176,141,87,0.18)" : "transparent", color: on ? goldBg : "#94A3B8" }}
            >
              <span className="shrink-0 relative">
                <Icon size={16} color={on ? gold : "#64748B"} />
                {renderBadge({
                  className: "absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center",
                  style: { backgroundColor: red, color: white, },
                  badge: badge
                })}
              </span>

              {!collapsed && <span className="text-sm font-medium truncate flex-1"> {label} </span>}

              {renderBadge({
                show: !collapsed,
                className: "text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0",
                style: { backgroundColor: redBg, color: red, },
                badge: badge
              })}
              
            </button>
          );
        })}
      </nav>

      {/* Sign out section ---------------------------- */}
      <div className="px-2 mb-2">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-white/5" style={{color: "#64748B"}}>
          <span className="shrink-0 relative"><LogoutIcon size={16} /></span>
          {!collapsed && <span className="text-xs font-medium truncate">Sign out</span>}
        </button>
      </div>

      {/* User account section ------------------------ */}
      {user && (
        <button
          className="flex h-12 items-center gap-2.5 rounded-lg mx-2 mb-3 px-1.5 py-2" 
          style={{ backgroundColor: collapsed ? "transparent" : "rgba(255,255,255,0.05)" }}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ backgroundColor: user.color || gold }}>
            {user.initials}
          </div>

          {!collapsed && (
            <div className="overflow-hidden truncate text-left">
              <p className="text-white text-xs font-semibold">{user.name}</p>
              <p className="text-[10px]" style={{ color: "#64748B" }}>{user.sub}</p>
            </div>
          )}

        </button>
      )}

    </aside>
  );
}
