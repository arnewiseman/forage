import React from "react";
import { IconButton } from "../core/IconButton.jsx";

const CSS = `
@keyframes fg-dialog-in{from{opacity:0;transform:translateY(8px) scale(.985)}to{opacity:1;transform:none}}
@keyframes fg-scrim-in{from{opacity:0}to{opacity:1}}
.fg-scrim{position:fixed;inset:0;background:var(--surface-overlay);display:flex;align-items:center;justify-content:center;padding:var(--space-2xl);z-index:60;animation:fg-scrim-in var(--duration-fast) var(--ease-standard)}
.fg-dialog{background:var(--surface-card);border:var(--border-width-solid) solid var(--border-strong);border-radius:var(--radius-md);box-shadow:var(--shadow-3);width:100%;max-height:86vh;display:flex;flex-direction:column;animation:fg-dialog-in var(--duration-base) var(--ease-entrance)}
.fg-dialog--sm{max-width:420px}.fg-dialog--md{max-width:560px}.fg-dialog--lg{max-width:760px}
.fg-dialog__head{display:flex;align-items:flex-start;gap:var(--space-lg);padding:var(--space-2xl) var(--space-2xl) var(--space-md)}
.fg-dialog__title{font-family:var(--font-display);font-weight:var(--weight-bold);font-size:var(--size-title-md);letter-spacing:var(--tracking-title);color:var(--text-strong);flex:1 1 auto}
.fg-dialog__desc{font-size:var(--size-body-sm);color:var(--text-muted);margin-top:var(--space-2xs)}
.fg-dialog__body{padding:0 var(--space-2xl) var(--space-2xl);overflow:auto}
.fg-dialog__foot{display:flex;justify-content:flex-end;gap:var(--space-md);padding:var(--space-lg) var(--space-2xl);border-top:1px solid var(--border-hairline);background:var(--paper-050);border-radius:0 0 6px 6px}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","dialog");el.textContent=CSS;document.head.appendChild(el)}

export function Dialog({ open = true, title, description, size = "md", onClose, footer, children }) {
  ensureStyles();
  React.useEffect(() => {
    if (!open || !onClose) return;
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fg-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}>
      <div className={"fg-dialog fg-dialog--" + size} role="dialog" aria-modal="true" aria-label={typeof title === "string" ? title : undefined}>
        <div className="fg-dialog__head">
          <div style={{ flex: "1 1 auto", minWidth: 0 }}>
            <div className="fg-dialog__title">{title}</div>
            {description ? <div className="fg-dialog__desc">{description}</div> : null}
          </div>
          {onClose ? <IconButton icon="x" label="Close" onClick={onClose} size="sm" /> : null}
        </div>
        <div className="fg-dialog__body">{children}</div>
        {footer ? <div className="fg-dialog__foot">{footer}</div> : null}
      </div>
    </div>
  );
}
