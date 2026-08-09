import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.fg-field{display:flex;flex-direction:column;gap:var(--space-xs)}
.fg-field__label{font-family:var(--font-body);font-weight:var(--weight-bold);font-size:var(--size-label);letter-spacing:var(--tracking-label);text-transform:uppercase;color:var(--text-muted)}
.fg-field__hint{font-size:var(--size-body-sm);color:var(--text-muted)}
.fg-field__error{font-size:var(--size-body-sm);color:var(--status-critical);font-weight:var(--weight-medium)}
.fg-field__req{color:var(--rose-600)}
.fg-input__wrap{position:relative;display:flex;align-items:center}
.fg-input{width:100%;font-family:var(--font-body);font-size:var(--size-body-md);color:var(--text-strong);background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-sm);height:var(--control-height-md);padding:0 var(--space-md);transition:var(--transition-control);box-shadow:var(--shadow-inset-well)}
.fg-input::placeholder{color:var(--rain-400)}
.fg-input:hover:not(:disabled){border-color:var(--rain-500)}
.fg-input:focus{outline:none;border-color:var(--border-focus);box-shadow:var(--focus-ring)}
.fg-input:disabled{background:var(--paper-200);color:var(--rain-400);cursor:not-allowed;box-shadow:none}
.fg-input--lg{height:var(--control-height-lg);font-size:var(--size-body-lg);padding:0 var(--space-lg)}
.fg-input--sm{height:var(--control-height-sm);font-size:var(--size-body-sm)}
.fg-input--has-start{padding-left:38px}
.fg-input--has-end{padding-right:38px}
.fg-input--invalid{border-color:var(--rose-600)}
.fg-input--invalid:focus{box-shadow:0 0 0 3px var(--rose-100)}
.fg-input__icon{position:absolute;color:var(--rain-500);pointer-events:none}
.fg-input__icon--start{left:var(--space-md)}
.fg-input__icon--end{right:var(--space-md)}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","input");el.textContent=CSS;document.head.appendChild(el)}

export function Input({ label, hint, error, required = false, size = "md", iconStart, iconEnd, id, className = "", ...rest }) {
  ensureStyles();
  const autoId = React.useId ? React.useId() : "fg-input";
  const inputId = id || autoId;
  return (
    <div className={["fg-field", className].filter(Boolean).join(" ")}>
      {label ? <label className="fg-field__label" htmlFor={inputId}>{label}{required ? <span className="fg-field__req"> *</span> : null}</label> : null}
      <div className="fg-input__wrap">
        {iconStart ? <Icon className="fg-input__icon fg-input__icon--start" name={iconStart} size={17} /> : null}
        <input
          id={inputId}
          aria-invalid={error ? "true" : undefined}
          className={["fg-input", "fg-input--" + size, iconStart ? "fg-input--has-start" : "", iconEnd ? "fg-input--has-end" : "", error ? "fg-input--invalid" : ""].filter(Boolean).join(" ")}
          {...rest}
        />
        {iconEnd ? <Icon className="fg-input__icon fg-input__icon--end" name={iconEnd} size={17} /> : null}
      </div>
      {error ? <div className="fg-field__error">{error}</div> : hint ? <div className="fg-field__hint">{hint}</div> : null}
    </div>
  );
}
