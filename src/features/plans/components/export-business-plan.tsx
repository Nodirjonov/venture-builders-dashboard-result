import { useState, useRef, useEffect } from "react";
import { useUpgradeStore } from '@/stores/upgrade-store';

export interface IPalette {
  bg: string;
  primary: string;
  a1: string;
  a2: string;
  a3: string;
}

export interface ExportConfig {
  palette: IPalette;
  layout: string;
  font: IFontOption;
  logoUrl?: string;
  formData: IFormData;
}

export const DEFAULT_PALETTES: IPalette[] = [
  { bg: "#003629", primary: "#465d21", a1: "#b6e972", a2: "#dcf8b6", a3: "#2bc085" },
  { bg: "#1a2332", primary: "#2563eb", a1: "#3b82f6", a2: "#93c5fd", a3: "#1e40af" },
  { bg: "#0f172a", primary: "#0ea5e9", a1: "#38bdf8", a2: "#7dd3fc", a3: "#0284c7" },
  { bg: "#1c1917", primary: "#d97706", a1: "#fbbf24", a2: "#fde68a", a3: "#b45309" },
  { bg: "#1e1b4b", primary: "#7c3aed", a1: "#a78bfa", a2: "#c4b5fd", a3: "#5b21b6" },
  { bg: "#14532d", primary: "#16a34a", a1: "#4ade80", a2: "#bbf7d0", a3: "#15803d" },
  { bg: "#7f1d1d", primary: "#ef4444", a1: "#f87171", a2: "#fecaca", a3: "#dc2626" },
  { bg: "#431407", primary: "#ea580c", a1: "#fb923c", a2: "#fed7aa", a3: "#c2410c" },
  { bg: "#fefce8", primary: "#d97706", a1: "#f59e0b", a2: "#fde68a", a3: "#b45309" },
  { bg: "#ecfdf5", primary: "#059669", a1: "#34d399", a2: "#a7f3d0", a3: "#047857" },
  { bg: "#fdf2f8", primary: "#db2777", a1: "#f472b6", a2: "#fbcfe8", a3: "#be185d" },
  { bg: "#f0fdf4", primary: "#465d21", a1: "#b6e972", a2: "#dcf8b6", a3: "#2bc085" },
  { bg: "#1e293b", primary: "#64748b", a1: "#94a3b8", a2: "#cbd5e1", a3: "#475569" },
  { bg: "#292524", primary: "#78716c", a1: "#a8a29e", a2: "#d6d3d1", a3: "#57534e" },
  { bg: "#faf5ff", primary: "#9333ea", a1: "#c084fc", a2: "#e9d5ff", a3: "#7e22ce" },
];

export interface IFontOption {
  heading: string;
  body: string;
  hFont: string;
  bFont: string;
}

export interface IFormData {
  companyName: string;
  website: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

export const FONT_OPTIONS: IFontOption[] = [
  { heading: "Venturekit", body: "Venturekit", hFont: "Inter", bFont: "Inter" },
  { heading: "Abril Fatface", body: "Josefin Sans", hFont: "'Abril Fatface', serif", bFont: "'Josefin Sans', sans-serif" },
  { heading: "Oswald", body: "Inter", hFont: "'Oswald', sans-serif", bFont: "'Inter', sans-serif" },
  { heading: "Poppins", body: "Inter", hFont: "'Poppins', sans-serif", bFont: "'Inter', sans-serif" },
  { heading: "Roboto", body: "Open Sans", hFont: "'Roboto', sans-serif", bFont: "'Open Sans', sans-serif" },
  { heading: "Poppins", body: "Nunito", hFont: "'Poppins', sans-serif", bFont: "'Nunito', sans-serif" },
  { heading: "Montserrat", body: "Merriweather", hFont: "'Montserrat', sans-serif", bFont: "'Merriweather', serif" },
  { heading: "Noto Sans", body: "Noto Serif", hFont: "'Noto Sans', sans-serif", bFont: "'Noto Serif', serif" },
];

function isColorDark(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

export function CoverPage({ colors, scale = 1, showDetails = true, formData, layout = "classic", font, logoUrl }: { colors: IPalette, scale?: number, showDetails?: boolean, formData?: IFormData, layout?: string, font?: IFontOption, logoUrl?: string }) {
  const w = 220 * scale;
  const h = 310 * scale;
  const f = scale;
  const isDark = isColorDark(colors.bg);
  const textColor = isDark ? "#fff" : "#111";
  const subColor = isDark ? colors.a2 : "#555";
  const cName = formData?.companyName || "Innovatech Academy";
  const cNameU = cName.toUpperCase();
  const cParts = cName.split(" ");
  const cNameS1 = cParts[0]?.toUpperCase() || "";
  const cNameS2 = cParts.slice(1).join(" ")?.toUpperCase() || "";
  const contact = formData?.contactName || "Jane Doe";
  const address = formData?.contactAddress || "123 Elm street, Toronto, ON";
  const website = formData?.website || "example.com";
  const phone = formData?.contactPhone || "416 555 1234";
  const hFont = font?.hFont || "Inter";
  const bFont = font?.bFont || "Inter";

  const renderLogo = (size: number = 9) => logoUrl ? (
    <img src={logoUrl} alt="Logo" style={{ height: size * f * 2.5, objectFit: "contain", maxWidth: "100%" }} />
  ) : (
    <div style={{ background: colors.a3, color: "#fff", fontSize: size * f, fontWeight: 700, padding: `${(size/3) * f}px ${size * f}px`, borderRadius: 4 * f, display: "inline-block", letterSpacing: 1.2, fontFamily: hFont }}>LOGO</div>
  );

  const layouts: Record<string, React.ReactNode> = {
    classic: (
      <div style={{ background: colors.bg, width: w, height: h, borderRadius: 10 * f, position: "relative", overflow: "hidden", flexShrink: 0, fontFamily: bFont }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 140 * f, height: 140 * f, borderRadius: "0 0 0 100%", background: `linear-gradient(135deg, ${colors.a1}55, ${colors.primary}77)` }} />
        <div style={{ position: "absolute", top: 20 * f, right: -20 * f, width: 120 * f, height: 120 * f, borderRadius: "50%", background: `radial-gradient(ellipse at 40% 40%, ${colors.a1}33, transparent 70%)` }} />
        <div style={{ position: "absolute", left: 0, top: "35%", width: 5 * f, height: "25%", background: colors.a3, borderRadius: `0 ${4 * f}px ${4 * f}px 0` }} />
        <div style={{ position: "relative", zIndex: 2, margin: `${14 * f}px 0 0 ${16 * f}px` }}>{renderLogo(9)}</div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: `0 ${16 * f}px ${16 * f}px`, zIndex: 2 }}>
          <div style={{ color: colors.a1, fontSize: 20 * f, fontWeight: 700, lineHeight: 1.2, fontFamily: hFont }}>Business Plan</div>
          <div style={{ color: subColor, fontSize: 11 * f, marginTop: 2 * f, opacity: 0.85 }}>{cName}</div>
          {showDetails && scale >= 0.7 && (
            <>
              <div style={{ marginTop: 16 * f, color: subColor, fontSize: 8.5 * f, opacity: 0.7 }}>
                Prepared by: <span style={{ fontWeight: 600, color: textColor }}>{contact}</span>
              </div>
              <div style={{ marginTop: 8 * f, color: subColor, fontSize: 7 * f, opacity: 0.55, lineHeight: 1.6 }}>
                {address} | {phone} | {website}
              </div>
            </>
          )}
        </div>
      </div>
    ),
    modern: (
      <div style={{ background: "#fff", width: w, height: h, borderRadius: 10 * f, position: "relative", overflow: "hidden", flexShrink: 0, fontFamily: bFont }}>
        <div style={{ position: "relative", zIndex: 1, padding: `${16 * f}px`, height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
          <div>{renderLogo(9)}</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 11 * f, color: colors.primary, fontWeight: 600, letterSpacing: 0.5, marginBottom: 6 * f, fontFamily: hFont }}>BUSINESS PLAN</div>
            <div style={{ fontSize: 16 * f, fontWeight: 800, color: "#111", fontFamily: hFont, lineHeight: 1.2 }}>{cNameU}</div>
          </div>
          <div style={{ display: "flex", gap: 6 * f, marginBottom: 12 * f }}>
            <div style={{ flex: 1, height: 6 * f, background: colors.primary, borderRadius: 4 * f }} />
            <div style={{ flex: 1, height: 6 * f, background: colors.a1, borderRadius: 4 * f }} />
            <div style={{ flex: 1, height: 6 * f, background: colors.a3, borderRadius: 4 * f }} />
          </div>
          {showDetails && scale >= 0.7 && <div style={{ fontSize: 8.5 * f, color: "#999", lineHeight: 1.5 }}>Prepared by: {contact}<br />{address}</div>}
        </div>
      </div>
    ),
    bold: (
      <div style={{ background: colors.bg, width: w, height: h, borderRadius: 10 * f, position: "relative", overflow: "hidden", flexShrink: 0, fontFamily: bFont }}>
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "42%", background: `linear-gradient(160deg, ${colors.a1}33, ${colors.a3}66)` }} />
        <div style={{ position: "relative", zIndex: 1, padding: `${16 * f}px`, height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
          <div>{renderLogo(9)}</div>
          <div style={{ flex: 1 }} />
          <div style={{ color: colors.a1, fontSize: 18 * f, fontWeight: 800, lineHeight: 1.2, fontFamily: hFont }}>Business Plan</div>
          <div style={{ color: subColor, fontSize: 10 * f, marginTop: 4 * f }}>{cName}</div>
          {showDetails && scale >= 0.7 && (
            <>
              <div style={{ marginTop: 16 * f }}>
                <div style={{ fontSize: 7 * f, color: subColor, opacity: 0.7 }}>Prepared by</div>
                <div style={{ fontSize: 10 * f, color: textColor, fontWeight: 600 }}>{contact}</div>
              </div>
              <div style={{ fontSize: 7 * f, color: subColor, opacity: 0.5, marginTop: 6 * f, lineHeight: 1.5 }}>{address}<br />{phone} | {website}</div>
            </>
          )}
        </div>
      </div>
    ),
    minimal: (
      <div style={{ background: colors.bg, width: w, height: h, borderRadius: 10 * f, position: "relative", overflow: "hidden", flexShrink: 0, fontFamily: bFont }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6 * f, background: colors.a1 }} />
        <div style={{ position: "relative", zIndex: 1, padding: `${16 * f}px`, height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
          <div>{renderLogo(9)}</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ color: isDark ? colors.a1 : colors.primary, fontSize: 10 * f, fontWeight: 500, marginBottom: 6 * f, fontFamily: hFont }}>Business Plan</div>
            <div style={{ color: textColor, fontSize: 15 * f, fontWeight: 800, lineHeight: 1.3, fontFamily: hFont }}>{cName}</div>
          </div>
          {showDetails && scale >= 0.7 && (
            <div style={{ borderTop: `1px solid ${isDark ? colors.a1 + "44" : "#ddd"}`, paddingTop: 10 * f, fontSize: 8.5 * f, color: subColor, opacity: 0.7, lineHeight: 1.5 }}>
              Prepared by: {contact}<br />{address}
            </div>
          )}
        </div>
      </div>
    ),
    elegant: (
      <div style={{ background: `linear-gradient(170deg, ${colors.bg}, ${colors.primary}cc)`, width: w, height: h, borderRadius: 10 * f, position: "relative", overflow: "hidden", flexShrink: 0, fontFamily: bFont }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 140 * f, height: 140 * f, borderRadius: "50%", border: `1px solid ${colors.a1}33` }} />
        <div style={{ position: "relative", zIndex: 1, padding: `${16 * f}px`, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", boxSizing: "border-box" }}>
          <div>{renderLogo(12)}</div>
          <div style={{ color: "#fff", fontSize: 16 * f, fontWeight: 700, letterSpacing: 0.5, marginTop: 16 * f, fontFamily: hFont }}>Business Plan</div>
          <div style={{ color: colors.a2, fontSize: 9 * f, marginTop: 6 * f, opacity: 0.8 }}>{cName}</div>
          <div style={{ width: 40 * f, height: 2 * f, background: colors.a1, margin: `${16 * f}px 0`, opacity: 0.5 }} />
          {showDetails && scale >= 0.7 && <div style={{ fontSize: 8 * f, color: colors.a2, opacity: 0.6 }}>Prepared by: {contact}</div>}
        </div>
      </div>
    ),
    corporate: (
      <div style={{ background: "#fff", width: w, height: h, borderRadius: 10 * f, position: "relative", overflow: "hidden", flexShrink: 0, fontFamily: bFont }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 44 * f, background: colors.bg }} />
        <div style={{ position: "relative", zIndex: 1, padding: `${16 * f}px`, height: "100%", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
          <div style={{ marginTop: 2 * f }}>{renderLogo(7)}</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 16 * f }}>
            <div style={{ fontSize: 8 * f, color: colors.primary, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 * f, fontFamily: hFont }}>Business Plan</div>
            <div style={{ fontSize: 18 * f, fontWeight: 800, color: "#111", lineHeight: 1.2, fontFamily: hFont }}>{cNameS1}</div>
            <div style={{ fontSize: 18 * f, fontWeight: 800, color: colors.primary, lineHeight: 1.2, fontFamily: hFont }}>{cNameS2}</div>
          </div>
          {showDetails && scale >= 0.7 && <div style={{ borderTop: `1px solid ${colors.primary}33`, paddingTop: 10 * f, fontSize: 8 * f, color: "#999" }}>{contact} · {address.split(",")[1]?.trim() || "City"} · 2025</div>}
        </div>
      </div>
    ),
  };

  return layouts[layout] || layouts.classic;
}

function TemplateCard({ colors, selected, onClick, layout, formData, font, logoUrl }: { colors: IPalette, selected: boolean, onClick: () => void, layout: string, formData: IFormData, font: IFontOption, logoUrl?: string }) {
  return (
    <div onClick={onClick} style={{
      width: 142, height: 196,
      borderRadius: 10, position: "relative", cursor: "pointer",
      border: selected ? `3px solid ${colors.primary}` : "2px solid #e5e7eb",
      overflow: "hidden", transition: "all 0.2s", flexShrink: 0,
      boxShadow: selected ? `0 0 0 2px ${colors.primary}33` : "0 1px 4px rgba(0,0,0,0.06)",
    }}>
      <CoverPage colors={colors} scale={142/220} layout={layout} formData={formData} font={font} logoUrl={logoUrl} showDetails={false} />
    </div>
  );
}

function DocPreview({ colors, layout, formData, font, logoUrl }: { colors: IPalette, layout: string, formData: IFormData, font: IFontOption, logoUrl?: string }) {
  const hFont = font?.hFont || "Inter";
  const bFont = font?.bFont || "Inter";

  return (
    <div style={{ display: "flex", gap: 0, background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb", fontFamily: bFont }}>
      <CoverPage colors={colors} scale={0.82} layout={layout} formData={formData} font={font} logoUrl={logoUrl} />
      <div style={{ flex: 1, padding: "16px 18px", fontSize: 11, color: "#333", minWidth: 0, overflow: "hidden" }}>
        <div style={{ color: colors.primary, fontSize: 8.5, fontWeight: 600, marginBottom: 2, letterSpacing: 0.5, fontFamily: hFont }}>{formData?.companyName || "Innovatech Academy"}</div>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: "#111", fontFamily: hFont }}>Executive Summary</div>
        <p style={{ fontSize: 8.5, lineHeight: 1.65, color: "#555", margin: "0 0 12px" }}>
          {formData?.companyName || "Our startup"} is a highly engaging service. We understand the importance of quality, and we are committed to ensuring that our deliverables are top-notch.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "6px 0 12px", padding: "8px 10px", background: "#f9fafb", borderRadius: 8, border: "1px solid #f0f0f0" }}>
          <svg width="60" height="60" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="28" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle cx="35" cy="35" r="28" fill="none" stroke={colors.a1} strokeWidth="8" strokeDasharray="44 132" />
            <circle cx="35" cy="35" r="28" fill="none" stroke={colors.primary} strokeWidth="8" strokeDasharray="35 141" strokeDashoffset="-44" />
            <circle cx="35" cy="35" r="28" fill="none" stroke={colors.a3} strokeWidth="8" strokeDasharray="30 146" strokeDashoffset="-79" />
            <circle cx="35" cy="35" r="28" fill="none" stroke={colors.a2} strokeWidth="8" strokeDasharray="23 153" strokeDashoffset="-109" />
          </svg>
          <div style={{ fontSize: 7.5 }}>
            {[{ c: colors.a1, l: "Market Share" }, { c: colors.primary, l: "Revenue" }, { c: colors.a3, l: "Growth" }, { c: colors.a2, l: "Retention" }].map(it => (
              <div key={it.l} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                <div style={{ width: 7, height: 7, borderRadius: 2, background: it.c }} />
                <span style={{ color: "#555" }}>{it.l}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 11, marginBottom: 4, color: "#111", fontFamily: hFont }}>Market Research</div>
        <p style={{ fontSize: 8.5, lineHeight: 1.65, color: "#555", margin: "0 0 10px" }}>
          Current trends show immense opportunity, allowing {formData?.companyName || "us"} to capture significant value moving forward.
        </p>
        <table style={{ width: "100%", fontSize: 7.5, borderCollapse: "collapse", marginBottom: 10 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${colors.primary}` }}>
              <th style={{ textAlign: "left", padding: "3px 5px", color: "#333", fontFamily: hFont }}>Metric</th>
              <th style={{ textAlign: "right", padding: "3px 5px", color: "#333", fontFamily: hFont }}>2024</th>
              <th style={{ textAlign: "right", padding: "3px 5px", color: "#333", fontFamily: hFont }}>2025</th>
            </tr>
          </thead>
          <tbody>
            {[["Users", "170K", "300K"], ["Revenue", "$50K", "$100K"]].map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: "3px 5px", textAlign: j === 0 ? "left" : "right", color: "#666" }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 999,
        background: checked ? "#22c55e" : "#e5e7eb",
        position: "relative", cursor: "pointer", flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 3,
        left: checked ? 23 : 3,
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        transition: "left 0.2s",
      }} />
    </div>
  );
}

function Accordion({ title, locked, children, defaultOpen }: { title: string, locked?: boolean, children: React.ReactNode, defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <div style={{ borderBottom: "1px solid #f0f0f0" }}>
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 0", cursor: "pointer", userSelect: "none",
      }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: "#111" }}>{title}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {locked && <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      {open && <div style={{ paddingBottom: 14 }}>{children}</div>}
    </div>
  );
}


// ─── Section Icons ──────────────────────────────────────────────────────────

const SECTION_ICONS: Record<string, React.ReactNode> = {
  overview: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  'market-research': <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  'products-services': <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  'sales-marketing': <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  financials: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  operations: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  implementation: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
};

// Free items that don't have pro icons
const FREE_ITEM_IDS = new Set([
  'executive-summary', 'swot-analysis', 'business-models', 'viability-analysis',
  'industry-overview', 'target-audience', 'market-size',
  'core-offerings', 'expansion',
  'marketing-overview', 'branding', 'customer-retention',
  'revenue',
  'team-roles',
]);

interface OutlineSection {
  id: string;
  title: string;
  items: { id: string; label: string }[];
}

export function EditOutlineModal({
  isOpen,
  onClose,
  sections: initialSections,
}: {
  isOpen: boolean;
  onClose: () => void;
  sections: OutlineSection[];
}) {
  const { openModal } = useUpgradeStore();
  const [sections, setSections] = useState<OutlineSection[]>(initialSections);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<{ sectionId: string; itemIndex: number } | null>(null);

  // Reset sections when the modal opens without calling setState inside an effect
  /* eslint-disable react-hooks/refs */
  const prevIsOpen = useRef(isOpen);
  if (prevIsOpen.current !== isOpen) {
    prevIsOpen.current = isOpen;
    if (isOpen) {
      setSections(initialSections);
    }
  }
  /* eslint-enable react-hooks/refs */

  const handleStartRename = (itemId: string, currentLabel: string) => {
    setEditingItem(itemId);
    setEditValue(currentLabel);
  };

  const handleConfirmRename = (sectionId: string, itemId: string) => {
    if (!editValue.trim()) return;
    setSections(prev =>
      prev.map(s =>
        s.id === sectionId
          ? { ...s, items: s.items.map(it => (it.id === itemId ? { ...it, label: editValue.trim() } : it)) }
          : s
      )
    );
    setEditingItem(null);
    setEditValue("");
  };

  const handleCancelRename = () => {
    setEditingItem(null);
    setEditValue("");
  };

  const handleDeleteItem = (sectionId: string, itemId: string) => {
    setSections(prev =>
      prev.map(s =>
        s.id === sectionId ? { ...s, items: s.items.filter(it => it.id !== itemId) } : s
      )
    );
    onClose();
  };

  const idCounterRef = useRef(0);

  const handleAddSection = (sectionId: string) => {
    idCounterRef.current += 1;
    const newId = `new-${idCounterRef.current}`;
    setSections(prev =>
      prev.map(s =>
        s.id === sectionId
          ? { ...s, items: [...s.items, { id: newId, label: "New Section" }] }
          : s
      )
    );
    setEditingItem(newId);
    setEditValue("New Section");
  };

  const handleDragStart = (sectionId: string, itemIndex: number) => {
    setDraggedItem({ sectionId, itemIndex });
  };

  const handleDragOver = (e: React.DragEvent, sectionId: string, itemIndex: number) => {
    e.preventDefault();
    if (!draggedItem || draggedItem.sectionId !== sectionId) return;
    if (draggedItem.itemIndex === itemIndex) return;
    setSections(prev =>
      prev.map(s => {
        if (s.id !== sectionId) return s;
        const items = [...s.items];
        const [moved] = items.splice(draggedItem.itemIndex, 1);
        items.splice(itemIndex, 0, moved);
        return { ...s, items };
      })
    );
    setDraggedItem({ sectionId, itemIndex });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1100, display: "flex", justifyContent: "flex-end", backdropFilter: "blur(3px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width: 440, maxWidth: "100vw", background: "#fff", height: "100vh", display: "flex", flexDirection: "column", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)", animation: "slideIn 0.3s ease" }}>
        <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

        {/* Header */}
        <div style={{ padding: "20px 24px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: 0 }}>Edit Outline</h2>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex", alignItems: "center" }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <div style={{ background: "#f0fdf4", borderRadius: 10, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>✦</span>
              <span style={{ fontWeight: 600, fontSize: 13, color: "#111" }}>Pro</span>
              <span style={{ fontSize: 13, color: "#666" }}>Upgrade to edit outline.</span>
            </div>
            <button onClick={() => { onClose(); openModal(); }} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>✦ Upgrade</button>
          </div>
        </div>

        {/* Scrollable sections */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 24px" }}>
          {sections.map(section => (
            <div
              key={section.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: "16px 0",
                marginBottom: 16,
              }}
            >
              {/* Section header */}
              <div
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 16px", marginBottom: 12 }}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <span style={{ color: "#374151", display: "flex" }}>{SECTION_ICONS[section.id] || SECTION_ICONS.overview}</span>
                <span style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{section.title}</span>
                {hoveredSection === section.id && (
                  <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 4, display: "flex" }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 4, display: "flex" }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 4, display: "flex" }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Items */}
              {section.items.map((item, itemIdx) => {
                const isFree = FREE_ITEM_IDS.has(item.id);
                const isEditing = editingItem === item.id;
                const isHovered = hoveredItem === item.id;

                return (
                  <div
                    key={item.id}
                    draggable={!isEditing}
                    onDragStart={() => handleDragStart(section.id, itemIdx)}
                    onDragOver={e => handleDragOver(e, section.id, itemIdx)}
                    onDragEnd={handleDragEnd}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 16px",
                      cursor: isEditing ? "default" : "grab",
                      background: isHovered && !isEditing ? "#f9fafb" : "transparent",
                      transition: "background 0.15s",
                      borderBottom: itemIdx < section.items.length - 1 ? "1px solid #f3f4f6" : "none",
                    }}
                  >
                    {/* Drag handle */}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="#c4c4c4" style={{ flexShrink: 0, opacity: 0.6 }}>
                      <circle cx="4" cy="2" r="1.2"/><circle cx="8" cy="2" r="1.2"/>
                      <circle cx="4" cy="6" r="1.2"/><circle cx="8" cy="6" r="1.2"/>
                      <circle cx="4" cy="10" r="1.2"/><circle cx="8" cy="10" r="1.2"/>
                    </svg>

                    {isEditing ? (
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 14, color: "#111" }}>{editValue || item.label}</span>
                          {/* Confirm / Cancel inline */}
                          <button onClick={() => handleConfirmRename(section.id, item.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", color: "#22c55e" }}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          </button>
                          <button onClick={handleCancelRename} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", color: "#999" }}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </button>
                        </div>
                        <input
                          autoFocus
                          type="text"
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === "Enter") handleConfirmRename(section.id, item.id);
                            if (e.key === "Escape") handleCancelRename();
                          }}
                          style={{
                            width: "100%",
                            padding: "6px 10px",
                            border: "2px solid #22c55e",
                            borderRadius: 6,
                            fontSize: 13,
                            color: "#111",
                            outline: "none",
                            background: "#f0fdf4",
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        <span style={{ flex: 1, fontSize: 14, color: "#111", userSelect: "none" }}>{item.label}</span>
                        {!isFree && (
                          <span style={{ display: "flex", gap: 2, alignItems: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: 13 }}>👑</span>
                            <span style={{ fontSize: 13 }}>✨</span>
                          </span>
                        )}
                        {isHovered && (
                          <div style={{ display: "flex", gap: 2, flexShrink: 0, marginLeft: 4 }}>
                            <button
                              onClick={e => { e.stopPropagation(); handleStartRename(item.id, item.label); }}
                              title="Rename"
                              style={{ background: "none", border: "none", cursor: "pointer", padding: 3, borderRadius: 4, display: "flex" }}
                            >
                              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button
                              onClick={e => { e.stopPropagation(); handleDeleteItem(section.id, item.id); }}
                              title="Delete"
                              style={{ background: "none", border: "none", cursor: "pointer", padding: 3, borderRadius: 4, display: "flex" }}
                            >
                              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                            <button
                              onClick={e => { e.stopPropagation(); }}
                              onMouseEnter={e => { (e.currentTarget.parentElement!.parentElement as HTMLElement).style.background = "#f0fdf4"; }}
                              onMouseLeave={e => { (e.currentTarget.parentElement!.parentElement as HTMLElement).style.background = "#f9fafb"; }}
                              title="Preview"
                              style={{ background: "none", border: "none", cursor: "pointer", padding: 3, borderRadius: 4, display: "flex" }}
                            >
                              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}

              {/* Add Section button */}
              <button
                onClick={() => handleAddSection(section.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 16px 2px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#10b981",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <span style={{ fontSize: 16 }}>+</span> Add Section
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #e5e7eb", display: "flex", gap: 12, flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "12px 0", background: "#fff", color: "#374151",
              border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "12px 0", background: "#10b981", color: "#fff",
              border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export function ExportBusinessPlanModal({ isOpen, onClose, onConfigChange }: { isOpen: boolean; onClose: () => void; onConfigChange?: (config: ExportConfig) => void }) {
  const { openModal } = useUpgradeStore();
  const [activeTab, setActiveTab] = useState("theme");
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [palettes, setPalettes] = useState<IPalette[]>(DEFAULT_PALETTES);
  const [selectedTemplate, setSelectedTemplate] = useState(2);
  const [selectedFontIndex, setSelectedFontIndex] = useState(0);
  const [templatePage, setTemplatePage] = useState(1);
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [isDragOver, setIsDragOver] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [printSettings, setPrintSettings] = useState({
    tableOfContents: true,
    pageBreakAfterChapter: false,
    showCompanyName: true,
    showPageNumber: true,
  });
  const [paperSize, setPaperSize] = useState<"letter" | "a4">("letter");

  const [formData, setFormData] = useState({
    companyName: "Innovatech Academy", website: "", contactName: "",
    contactEmail: "", contactPhone: "", contactAddress: "",
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const colors = palettes[selectedPalette];

  useEffect(() => { if (isOpen && modalRef.current) modalRef.current.scrollTop = 0; }, [isOpen]);

  const templateLayouts = ["classic", "modern", "bold", "minimal", "elegant", "corporate"];

  // Push config changes to parent
  useEffect(() => {
    if (onConfigChange) {
      onConfigChange({
        palette: colors,
        layout: templateLayouts[selectedTemplate],
        font: FONT_OPTIONS[selectedFontIndex],
        logoUrl,
        formData,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPalette, palettes, selectedTemplate, selectedFontIndex, logoUrl, formData]);

  const templatesPerPage = 3;
  const totalTemplatePages = Math.ceil(templateLayouts.length / templatesPerPage);
  const visStart = (templatePage - 1) * templatesPerPage;
  const visibleTemplates = templateLayouts.slice(visStart, visStart + templatesPerPage);

  const handleColorChange = (key: keyof IPalette, value: string) => {
    setPalettes(prev => {
      const updated = [...prev];
      updated[selectedPalette] = { ...updated[selectedPalette], [key]: value };
      return updated;
    });
  };

  const handleLogoFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setLogoUrl(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", justifyContent: "flex-end", backdropFilter: "blur(3px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div ref={modalRef} style={{ width: 540, maxWidth: "100vw", background: "#fff", height: "100vh", overflowY: "auto", boxShadow: "-8px 0 40px rgba(0,0,0,0.15)", animation: "slideIn 0.3s ease" }}>
        <style>{`
          @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          input[type="text"]:focus { outline: none; border-color: #22c55e !important; }
        `}</style>

        {/* Header */}
        <div className="px-4 pt-4 pb-0 sm:px-[22px] sm:pt-[16px] sticky top-0 bg-white z-10">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111", margin: 0 }}>Export Business Plan</h2>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex", alignItems: "center" }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <div style={{ background: "#f0fdf4", borderRadius: 10, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>✦</span>
              <span style={{ fontWeight: 600, fontSize: 13, color: "#111" }}>Pro feature</span>
              <span style={{ fontSize: 13, color: "#666" }}>Upgrade to export.</span>
            </div>
            <button onClick={() => { onClose(); openModal(); }} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>✦ Upgrade</button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 border border-[#e5e7eb] rounded-[10px] p-[11px_16px] mb-3 flex-wrap">
            <span className="font-semibold text-[14px] leading-tight text-[#111]">Innovatech Academy Business Plan</span>
            <div className="flex flex-wrap items-center gap-2 text-[#666] text-[13px]">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Export to PDF
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #22c55e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb" }}>
            {["theme", "document"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                flex: 1, padding: "12px 0", background: "none", border: "none",
                borderBottom: activeTab === tab ? "2px solid #111" : "2px solid transparent",
                color: activeTab === tab ? "#111" : "#999",
                fontWeight: activeTab === tab ? 600 : 400, fontSize: 15, cursor: "pointer",
              }}>{tab === "theme" ? "Theme" : "Document"}</button>
            ))}
          </div>
        </div>

        <div className="px-4 py-4 pb-10 sm:px-[22px]">
          {activeTab === "theme" && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <DocPreview colors={colors} layout={templateLayouts[selectedTemplate]} formData={formData} font={FONT_OPTIONS[selectedFontIndex]} logoUrl={logoUrl} />
              </div>
              <Accordion title="Templates" defaultOpen={true}>
                <div className="flex flex-wrap sm:flex-nowrap gap-3 justify-center">
                  {visibleTemplates.map((layout, i) => {
                    const gi = visStart + i;
                    return <TemplateCard key={layout} colors={colors} selected={selectedTemplate === gi} onClick={() => setSelectedTemplate(gi)} layout={layout} formData={formData} font={FONT_OPTIONS[selectedFontIndex]} logoUrl={logoUrl} />;
                  })}
                </div>
                {totalTemplatePages > 1 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 12 }}>
                    <button onClick={() => setTemplatePage(Math.max(1, templatePage - 1))} disabled={templatePage === 1}
                      style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: 6, width: 30, height: 30, cursor: templatePage === 1 ? "default" : "pointer", opacity: templatePage === 1 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#333" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    <span style={{ fontSize: 13, color: "#666" }}>Page {templatePage} of {totalTemplatePages}</span>
                    <button onClick={() => setTemplatePage(Math.min(totalTemplatePages, templatePage + 1))} disabled={templatePage === totalTemplatePages}
                      style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: 6, width: 30, height: 30, cursor: templatePage === totalTemplatePages ? "default" : "pointer", opacity: templatePage === totalTemplatePages ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#333" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                  </div>
                )}
              </Accordion>

              <Accordion title="Colors" defaultOpen={true}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 16 }}>
                  {palettes.map((pal, i) => (
                    <div key={i} onClick={() => setSelectedPalette(i)} style={{
                      height: 32, borderRadius: 999, cursor: "pointer", display: "flex", overflow: "hidden",
                      border: selectedPalette === i ? "3px solid #0d9488" : "2px solid #e5e7eb",
                      transition: "border-color 0.15s",
                    }}>
                      <div style={{ flex: 1, background: pal.bg }} />
                      <div style={{ flex: 1, background: pal.primary }} />
                      <div style={{ flex: 1, background: pal.a1 }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                  {[
                    { label: "Background", key: "bg" as keyof IPalette },
                    { label: "Primary", key: "primary" as keyof IPalette },
                    { label: "Accent 1", key: "a1" as keyof IPalette },
                    { label: "Accent 2", key: "a2" as keyof IPalette },
                  ].map(c => (
                    <div key={c.label}>
                      <div style={{ fontSize: 10, color: "#666", marginBottom: 4 }}>{c.label}</div>
                      <label style={{ display: "block", position: "relative", cursor: "pointer" }}>
                        <div style={{ width: "100%", height: 56, borderRadius: 10, background: colors[c.key], border: "1px solid #e5e7eb" }} />
                        <input
                          type="color"
                          value={colors[c.key]}
                          onChange={e => handleColorChange(c.key, e.target.value)}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                        />
                      </label>
                      <div style={{ fontSize: 9, color: "#999", fontFamily: "monospace", marginTop: 3 }}>{colors[c.key]}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 10, color: "#666", marginBottom: 4 }}>Accent 3</div>
                  <label style={{ display: "block", position: "relative", cursor: "pointer", width: 80 }}>
                    <div style={{ width: 80, height: 56, borderRadius: 10, background: colors.a3, border: "1px solid #e5e7eb" }} />
                    <input
                      type="color"
                      value={colors.a3}
                      onChange={e => handleColorChange("a3", e.target.value)}
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                    />
                  </label>
                  <div style={{ fontSize: 9, color: "#999", fontFamily: "monospace", marginTop: 3 }}>{colors.a3}</div>
                </div>
              </Accordion>

              <Accordion title="Fonts">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {FONT_OPTIONS.map((f, i) => (
                    <div key={i} onClick={() => setSelectedFontIndex(i)} style={{
                      border: i === selectedFontIndex ? "2px solid #0d9488" : "1px solid #e5e7eb",
                      borderRadius: 10, padding: "12px 10px", cursor: "pointer", opacity: 1, transition: "border-color 0.15s",
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#111", fontFamily: f.hFont, lineHeight: 1.3, marginBottom: 2 }}>{f.heading}</div>
                      <div style={{ fontSize: 11, color: "#999", fontFamily: f.bFont }}>{f.body}</div>
                    </div>
                  ))}
                </div>
              </Accordion>

              <Accordion title="Logo">
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoFile(f); }}
                />
                <div
                  onClick={() => logoInputRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={e => { e.preventDefault(); setIsDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) handleLogoFile(f); }}
                  style={{
                    border: `2px dashed ${isDragOver ? "#0d9488" : logoUrl ? "#22c55e" : "#e5e7eb"}`,
                    borderRadius: 12, padding: "32px 16px",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "border-color 0.2s", background: isDragOver ? "#f0fdfa" : "#fff",
                  }}
                >
                  {logoUrl ? (
                    <>
                      <img src={logoUrl} alt="Logo preview" style={{ maxHeight: 60, maxWidth: 160, objectFit: "contain", marginBottom: 10 }} />
                      <div style={{ fontSize: 12, color: "#0d9488", fontWeight: 600 }}>Logo uploaded ✓</div>
                      <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>Click to replace</div>
                    </>
                  ) : (
                    <>
                      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="1.5">
                        <path d="M12 16V4M12 4l4 4M12 4L8 8" /><path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
                      </svg>
                      <div style={{ marginTop: 8, fontSize: 13, color: "#111" }}>
                        <span style={{ color: "#0d9488", fontWeight: 600 }}>Click to upload</span> or drag and drop
                      </div>
                      <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>SVG, PNG, JPG or GIF</div>
                    </>
                  )}
                </div>
                {logoUrl && (
                  <button
                    onClick={() => setLogoUrl(undefined)}
                    style={{ marginTop: 10, background: "none", border: "1px solid #fecaca", color: "#ef4444", borderRadius: 8, padding: "6px 16px", fontSize: 12, cursor: "pointer", fontWeight: 500 }}
                  >
                    Remove logo
                  </button>
                )}
              </Accordion>

              <Accordion title="Print Settings">
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { key: "tableOfContents" as const, title: "Table of Contents", desc: "Include the table of contents in the report" },
                    { key: "pageBreakAfterChapter" as const, title: "Page break after chapter", desc: "Next chapter will start on a new page" },
                    { key: "showCompanyName" as const, title: "Show company name", desc: "Show company name in each page" },
                  ].map((item) => (
                    <div key={item.key} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>{item.desc}</div>
                      </div>
                      <Toggle
                        checked={printSettings[item.key]}
                        onChange={v => setPrintSettings(p => ({ ...p, [item.key]: v }))}
                      />
                    </div>
                  ))}

                  {/* Paper Size */}
                  <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>Paper Size</div>
                        <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Select the paper size you want to use</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0, marginLeft: 16 }}>
                        <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: "#111" }}>
                          <input type="radio" name="paperSize" checked={paperSize === "letter"} onChange={() => setPaperSize("letter")} style={{ accentColor: "#111" }} /> Letter (8.5&quot; x 11&quot;)
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 13, color: "#111" }}>
                          <input type="radio" name="paperSize" checked={paperSize === "a4"} onChange={() => setPaperSize("a4")} style={{ accentColor: "#111" }} /> A4 (210 x 297 mm)
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Show page number */}
                  <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>Show page number</div>
                      <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Show page number in the footer</div>
                    </div>
                    <Toggle
                      checked={printSettings.showPageNumber}
                      onChange={v => setPrintSettings(p => ({ ...p, showPageNumber: v }))}
                    />
                  </div>
                </div>
              </Accordion>
            </div>
          )}

          {activeTab === "document" && (
            <div className="pt-1.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Company Name", field: "companyName" as const, ph: "Innovatech Academy" },
                  { label: "Website", field: "website" as const, ph: "www.example.com" },
                  { label: "Contact Name", field: "contactName" as const, ph: "Jane Doe" },
                  { label: "Contact Email", field: "contactEmail" as const, ph: "name@example.com" },
                  { label: "Contact Phone", field: "contactPhone" as const, ph: "416 555 1234" },
                  { label: "Contact Address", field: "contactAddress" as const, ph: "123 Elm street, Toronto, ON" },
                ].map(f => (
                  <div key={f.field}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 6 }}>{f.label}</label>
                    <input
                      type="text"
                      value={formData[f.field]}
                      onChange={e => setFormData(p => ({ ...p, [f.field]: e.target.value }))}
                      placeholder={f.ph}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14, color: "#333", boxSizing: "border-box", transition: "border-color 0.2s" }}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleSave}
                style={{
                  width: "100%", marginTop: 24, padding: "12px 0",
                  background: saveSuccess ? "#16a34a" : "#22c55e",
                  color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer",
                  transition: "background 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                {saveSuccess ? (
                  <>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Saved!
                  </>
                ) : "Save"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
