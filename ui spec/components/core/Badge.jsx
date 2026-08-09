import React from "react";
import { Icon } from "./Icon.jsx";

const CSS = `
.fg-badge{display:inline-flex;align-items:center;gap:var(--space-2xs);font-family:var(--font-body);font-weight:var(--weight-bold);font-size:var(--size-micro);letter-spacing:var(--tracking-label);text-transform:uppercase;padding:3px var(--space-sm);border-radius:var(--radius-xs);border:1px solid transparent;white-space:nowrap}
.fg-badge--neutral{background:var(--paper-200);color:var(--ink-700);border-color:var(--paper-300)}
.fg-badge--brand{background:var(--fir-100);color:var(--fir-700);border-color:var(--fir-200)}
.fg-badge--positive{background:var(--status-positive-surface);color:var(--status-positive);border-color:var(--moss-300)}
.fg-badge--caution{background:var(--status-caution-surface);color:var(--status-caution);border-color:var(--amber-300)}
.fg-badge--critical{background:var(--status-critical-surface);color:var(--status-critical);border-color:var(--rose-300)}
.fg-badge--info{background:var(--status-info-surface);color:var(--status-info);border-color:var(--hood-200)}
.fg-badge--solid{background:var(--fir-700);color:var(--paper-050);border-color:var(--fir-700)}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","badge");el.textContent=CSS;document.head.appendChild(el)}

export function Badge({ tone = "neutral", icon, className = "", children, ...rest }) {
  ensureStyles();
  return (
    <span className={["fg-badge", "fg-badge--" + tone, className].filter(Boolean).join(" ")} {...rest}>
      {icon ? <Icon name={icon} size={12} /> : null}
      {children}
    </span>
  );
}
