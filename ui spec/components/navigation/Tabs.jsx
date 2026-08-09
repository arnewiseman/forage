import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.fg-tabs{display:flex;gap:var(--space-2xl);border-bottom:1px solid var(--border-hairline)}
.fg-tabs__tab{position:relative;display:inline-flex;align-items:center;gap:var(--space-sm);border:0;background:transparent;cursor:pointer;font-family:var(--font-display);font-weight:var(--weight-semibold);font-size:var(--size-body-md);letter-spacing:var(--tracking-title);color:var(--text-muted);padding:var(--space-md) 0;transition:color var(--duration-fast) var(--ease-standard)}
.fg-tabs__tab::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:3px;background:transparent;transition:background var(--duration-fast) var(--ease-standard)}
.fg-tabs__tab:hover{color:var(--text-strong)}
.fg-tabs__tab[aria-selected="true"]{color:var(--text-brand)}
.fg-tabs__tab[aria-selected="true"]::after{background:var(--rose-600)}
.fg-tabs__tab:disabled{color:var(--rain-400);cursor:not-allowed}
.fg-tabs__count{font-family:var(--font-mono);font-size:var(--size-micro);background:var(--paper-200);color:var(--ink-700);border-radius:var(--radius-xs);padding:1px 5px}
.fg-tabs--pill{border-bottom:0;gap:var(--space-2xs);background:var(--surface-sunken);padding:var(--space-2xs);border-radius:var(--radius-md);display:inline-flex}
.fg-tabs--pill .fg-tabs__tab{padding:var(--space-sm) var(--space-lg);border-radius:var(--radius-sm)}
.fg-tabs--pill .fg-tabs__tab::after{display:none}
.fg-tabs--pill .fg-tabs__tab[aria-selected="true"]{background:var(--surface-card);color:var(--text-strong);box-shadow:var(--shadow-1)}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","tabs");el.textContent=CSS;document.head.appendChild(el)}

export function Tabs({ items = [], value, onChange, variant = "underline", className = "" }) {
  ensureStyles();
  return (
    <div role="tablist" className={["fg-tabs", variant === "pill" ? "fg-tabs--pill" : "", className].filter(Boolean).join(" ")}>
      {items.map((it) => (
        <button key={it.id} role="tab" type="button" disabled={it.disabled}
          aria-selected={value === it.id}
          className="fg-tabs__tab"
          onClick={() => onChange && onChange(it.id)}>
          {it.icon ? <Icon name={it.icon} size={16} /> : null}
          {it.label}
          {it.count != null ? <span className="fg-tabs__count">{it.count}</span> : null}
        </button>
      ))}
    </div>
  );
}
