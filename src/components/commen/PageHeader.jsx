import { white, border, muted, ink } from "../../styles/colors";


// Header at the top of each internal page of portals (breadcrumb + title + action button)
// rootLabel: The name that comes before the breadcrumb (e.g. university/company name or "Admin Zupan")
export default function PageHeader({ rootLabel, crumb, title, subtitle, action, children }) {
  return (
    <div className="p-6 pt-8" style={{ backgroundColor: white, borderBottom: `1px solid ${border}` }}>
      <p className="text-xs mb-3" style={{ color: muted }}>
        <span style={{ color: ink }}>{rootLabel}</span> / {crumb}
      </p>
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl" style={{ color: ink }}>{title}</h1>
          {subtitle && <p className="text-sm mt-0.5" style={{ color: muted }}>{subtitle}</p>}
        </div>
        {action}
      </div>

      {/* Tabs section or bottom elements (if any) */}
      {children && ( <div className="flex gap-1 mt-6"> {children} </div> )}

    </div>
  );
}
