import React from "react";
import { Icon } from "./Icon.jsx";

const CSS = `
.fg-callout{display:flex;gap:var(--space-md);padding:var(--space-lg);border-radius:var(--radius-md);border:1px solid var(--border-hairline);background:var(--surface-sunken);font-size:var(--size-body-sm);line-height:var(--leading-normal)}
.fg-callout__body{display:flex;flex-direction:column;gap:var(--space-2xs);min-width:0}
.fg-callout__title{font-family:var(--font-display);font-weight:var(--weight-bold);font-size:var(--size-body-md);color:var(--text-strong);letter-spacing:var(--tracking-title)}
.fg-callout--info{background:var(--status-info-surface);border-color:var(--hood-200);color:var(--hood-800)}
.fg-callout--positive{background:var(--status-positive-surface);border-color:var(--moss-300);color:var(--moss-700)}
.fg-callout--caution{background:var(--status-caution-surface);border-color:var(--amber-300);color:var(--amber-700)}
.fg-callout--critical{background:var(--status-critical-surface);border-color:var(--rose-300);color:var(--rose-800)}
.fg-callout--disclosure{background:var(--paper-200);border:1px dashed var(--rain-500);color:var(--ink-700);font-family:var(--font-mono);font-size:var(--size-micro);line-height:1.55}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","callout");el.textContent=CSS;document.head.appendChild(el)}

const ICONS = { neutral: "info", info: "info", positive: "circle-check", caution: "triangle-alert", critical: "octagon-alert", disclosure: "scroll-text" };

export function Callout({ tone = "neutral", title, icon, className = "", children, ...rest }) {
  ensureStyles();
  const glyph = icon || ICONS[tone] || "info";
  return (
    <div className={["fg-callout", tone !== "neutral" ? "fg-callout--" + tone : "", className].filter(Boolean).join(" ")} {...rest}>
      <Icon name={glyph} size={tone === "disclosure" ? 15 : 18} style={{ marginTop: 1 }} />
      <div className="fg-callout__body">
        {title ? <div className="fg-callout__title">{title}</div> : null}
        <div>{children}</div>
      </div>
    </div>
  );
}
