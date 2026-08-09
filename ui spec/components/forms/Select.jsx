import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.fg-field{display:flex;flex-direction:column;gap:var(--space-xs)}
.fg-field__label{font-family:var(--font-body);font-weight:var(--weight-bold);font-size:var(--size-label);letter-spacing:var(--tracking-label);text-transform:uppercase;color:var(--text-muted)}
.fg-field__hint{font-size:var(--size-body-sm);color:var(--text-muted)}
.fg-field__error{font-size:var(--size-body-sm);color:var(--status-critical);font-weight:var(--weight-medium)}
.fg-field__req{color:var(--rose-600)}
.fg-select__wrap{position:relative;display:flex;align-items:center}
.fg-select{appearance:none;width:100%;font-family:var(--font-body);font-size:var(--size-body-md);color:var(--text-strong);background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-sm);height:var(--control-height-md);padding:0 36px 0 var(--space-md);cursor:pointer;transition:var(--transition-control)}
.fg-select:hover:not(:disabled){border-color:var(--rain-500)}
.fg-select:focus{outline:none;border-color:var(--border-focus);box-shadow:var(--focus-ring)}
.fg-select:disabled{background:var(--paper-200);color:var(--rain-400);cursor:not-allowed}
.fg-select--sm{height:var(--control-height-sm);font-size:var(--size-body-sm)}
.fg-select--lg{height:var(--control-height-lg);font-size:var(--size-body-lg)}
.fg-select__chev{position:absolute;right:var(--space-md);color:var(--rain-600);pointer-events:none}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","select");el.textContent=CSS;document.head.appendChild(el)}

export function Select({ label, hint, error, required = false, size = "md", options = [], placeholder, id, className = "", children, ...rest }) {
  ensureStyles();
  const autoId = React.useId ? React.useId() : "fg-select";
  const selId = id || autoId;
  return (
    <div className={["fg-field", className].filter(Boolean).join(" ")}>
      {label ? <label className="fg-field__label" htmlFor={selId}>{label}{required ? <span className="fg-field__req"> *</span> : null}</label> : null}
      <div className="fg-select__wrap">
        <select id={selId} className={["fg-select", "fg-select--" + size].join(" ")} {...rest}>
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) => (typeof o === "string"
            ? <option key={o} value={o}>{o}</option>
            : <option key={o.value} value={o.value}>{o.label}</option>))}
          {children}
        </select>
        <Icon className="fg-select__chev" name="chevron-down" size={17} />
      </div>
      {error ? <div className="fg-field__error">{error}</div> : hint ? <div className="fg-field__hint">{hint}</div> : null}
    </div>
  );
}
