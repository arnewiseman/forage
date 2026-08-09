import React from "react";

const CSS = `
.fg-meter{display:flex;flex-direction:column;gap:var(--space-xs);width:100%}
.fg-meter__top{display:flex;align-items:baseline;justify-content:space-between;gap:var(--space-md)}
.fg-meter__label{font-family:var(--font-body);font-weight:var(--weight-semibold);font-size:var(--size-body-md);color:var(--text-strong)}
.fg-meter__value{font-family:var(--font-mono);font-size:var(--size-body-sm);color:var(--text-muted)}
.fg-meter__track{position:relative;height:10px;border-radius:var(--radius-pill);background:var(--paper-200);border:1px solid var(--paper-300);overflow:hidden}
.fg-meter__fill{position:absolute;inset:0 auto 0 0;border-radius:var(--radius-pill);background:var(--fir-600);transition:width var(--duration-slow) var(--ease-entrance)}
.fg-meter--positive .fg-meter__fill{background:var(--moss-500)}
.fg-meter--caution .fg-meter__fill{background:var(--amber-500)}
.fg-meter--critical .fg-meter__fill{background:var(--rose-600)}
.fg-meter__note{font-size:var(--size-body-sm);color:var(--text-muted)}
.fg-meter--lg .fg-meter__track{height:16px}
.fg-meter--sm .fg-meter__track{height:6px}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","skillmeter");el.textContent=CSS;document.head.appendChild(el)}

export function SkillMeter({ label, value = 0, max = 100, tone = "brand", size = "md", valueLabel, note, className = "" }) {
  ensureStyles();
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={["fg-meter", "fg-meter--" + tone, "fg-meter--" + size, className].filter(Boolean).join(" ")}>
      {(label || valueLabel) ? (
        <div className="fg-meter__top">
          <span className="fg-meter__label">{label}</span>
          <span className="fg-meter__value">{valueLabel != null ? valueLabel : Math.round(pct) + "%"}</span>
        </div>
      ) : null}
      <div className="fg-meter__track" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={typeof label === "string" ? label : undefined}>
        <div className="fg-meter__fill" style={{ width: pct + "%" }} />
      </div>
      {note ? <div className="fg-meter__note">{note}</div> : null}
    </div>
  );
}
