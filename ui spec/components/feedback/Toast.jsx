import React from "react";
import { Icon } from "../core/Icon.jsx";
import { IconButton } from "../core/IconButton.jsx";

const CSS = `
@keyframes fg-toast-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.fg-toast{display:flex;align-items:flex-start;gap:var(--space-md);background:var(--fir-800);color:var(--paper-100);border-radius:var(--radius-md);padding:var(--space-md) var(--space-md) var(--space-md) var(--space-lg);box-shadow:var(--shadow-3);font-size:var(--size-body-sm);line-height:var(--leading-normal);max-width:420px;animation:fg-toast-in var(--duration-base) var(--ease-entrance)}
.fg-toast__title{font-family:var(--font-display);font-weight:var(--weight-bold);font-size:var(--size-body-md);color:var(--paper-000)}
.fg-toast__body{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}
.fg-toast--positive .fg-toast__mark{color:var(--moss-300)}
.fg-toast--critical{background:var(--rose-800)}
.fg-toast--caution{background:var(--amber-700)}
.fg-toast__action{background:transparent;border:0;color:var(--paper-000);font:inherit;font-weight:var(--weight-bold);text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:0;align-self:flex-start;margin-top:2px}
.fg-toast-stack{position:fixed;bottom:var(--space-2xl);right:var(--space-2xl);display:flex;flex-direction:column;gap:var(--space-md);z-index:70}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","toast");el.textContent=CSS;document.head.appendChild(el)}

const ICONS = { neutral: "info", positive: "circle-check", caution: "triangle-alert", critical: "octagon-alert" };

export function Toast({ tone = "neutral", title, actionLabel, onAction, onClose, className = "", children }) {
  ensureStyles();
  return (
    <div role="status" className={["fg-toast", "fg-toast--" + tone, className].filter(Boolean).join(" ")}>
      <Icon className="fg-toast__mark" name={ICONS[tone] || "info"} size={18} style={{ marginTop: 2 }} />
      <div className="fg-toast__body">
        {title ? <div className="fg-toast__title">{title}</div> : null}
        {children ? <div>{children}</div> : null}
        {actionLabel ? <button type="button" className="fg-toast__action" onClick={onAction}>{actionLabel}</button> : null}
      </div>
      {onClose ? <IconButton icon="x" label="Dismiss" size="sm" onClick={onClose} style={{ color: "inherit" }} /> : null}
    </div>
  );
}

export function ToastStack({ children }) {
  ensureStyles();
  return <div className="fg-toast-stack">{children}</div>;
}
