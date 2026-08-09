import React from "react";

const CSS = `
.fg-field{display:flex;flex-direction:column;gap:var(--space-xs)}
.fg-field__label{font-family:var(--font-body);font-weight:var(--weight-bold);font-size:var(--size-label);letter-spacing:var(--tracking-label);text-transform:uppercase;color:var(--text-muted)}
.fg-field__hint{font-size:var(--size-body-sm);color:var(--text-muted)}
.fg-field__error{font-size:var(--size-body-sm);color:var(--status-critical);font-weight:var(--weight-medium)}
.fg-field__req{color:var(--rose-600)}
.fg-textarea{width:100%;font-family:var(--font-body);font-size:var(--size-body-md);line-height:var(--leading-relaxed);color:var(--text-strong);background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-sm);padding:var(--space-md);resize:vertical;transition:var(--transition-control);box-shadow:var(--shadow-inset-well)}
.fg-textarea::placeholder{color:var(--rain-400)}
.fg-textarea:hover:not(:disabled){border-color:var(--rain-500)}
.fg-textarea:focus{outline:none;border-color:var(--border-focus);box-shadow:var(--focus-ring)}
.fg-textarea:disabled{background:var(--paper-200);color:var(--rain-400);cursor:not-allowed}
.fg-textarea--invalid{border-color:var(--rose-600)}
.fg-textarea__foot{display:flex;justify-content:space-between;gap:var(--space-md)}
.fg-textarea__count{font-family:var(--font-mono);font-size:var(--size-micro);color:var(--text-muted)}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","textarea");el.textContent=CSS;document.head.appendChild(el)}

export function Textarea({ label, hint, error, required = false, rows = 4, maxLength, value, id, className = "", ...rest }) {
  ensureStyles();
  const autoId = React.useId ? React.useId() : "fg-textarea";
  const taId = id || autoId;
  const len = typeof value === "string" ? value.length : null;
  return (
    <div className={["fg-field", className].filter(Boolean).join(" ")}>
      {label ? <label className="fg-field__label" htmlFor={taId}>{label}{required ? <span className="fg-field__req"> *</span> : null}</label> : null}
      <textarea id={taId} rows={rows} maxLength={maxLength} value={value}
        aria-invalid={error ? "true" : undefined}
        className={["fg-textarea", error ? "fg-textarea--invalid" : ""].filter(Boolean).join(" ")} {...rest} />
      <div className="fg-textarea__foot">
        {error ? <div className="fg-field__error">{error}</div> : hint ? <div className="fg-field__hint">{hint}</div> : <span />}
        {maxLength && len !== null ? <div className="fg-textarea__count">{len}/{maxLength}</div> : null}
      </div>
    </div>
  );
}
