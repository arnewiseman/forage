import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.fg-empty{display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--space-md);padding:var(--space-5xl) var(--space-2xl);border:1px dashed var(--border-default);border-radius:var(--radius-md);background:var(--paper-050)}
.fg-empty__mark{width:52px;height:52px;border-radius:var(--radius-pill);background:var(--fir-050);border:1px solid var(--fir-200);display:flex;align-items:center;justify-content:center;color:var(--fir-600)}
.fg-empty__title{font-family:var(--font-display);font-weight:var(--weight-bold);font-size:var(--size-title-sm);letter-spacing:var(--tracking-title);color:var(--text-strong)}
.fg-empty__body{font-size:var(--size-body-md);color:var(--text-muted);max-width:44ch;line-height:var(--leading-relaxed)}
.fg-empty__actions{display:flex;gap:var(--space-md);margin-top:var(--space-2xs)}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","emptystate");el.textContent=CSS;document.head.appendChild(el)}

export function EmptyState({ icon = "compass", title, children, actions, className = "" }) {
  ensureStyles();
  return (
    <div className={["fg-empty", className].filter(Boolean).join(" ")}>
      <span className="fg-empty__mark"><Icon name={icon} size={24} /></span>
      {title ? <div className="fg-empty__title">{title}</div> : null}
      {children ? <div className="fg-empty__body">{children}</div> : null}
      {actions ? <div className="fg-empty__actions">{actions}</div> : null}
    </div>
  );
}
