import React from "react";

const CSS = `
.fg-radio{display:inline-flex;gap:var(--space-md);align-items:flex-start;cursor:pointer;font-family:var(--font-body);font-size:var(--size-body-md);color:var(--text-body);line-height:1.35}
.fg-radio--disabled{cursor:not-allowed;color:var(--rain-400)}
.fg-radio__input{position:absolute;opacity:0;width:0;height:0}
.fg-radio__dot{position:relative;flex:0 0 auto;width:20px;height:20px;border:var(--border-width-solid) solid var(--border-default);border-radius:var(--radius-pill);background:var(--surface-card);transition:var(--transition-control);margin-top:1px}
.fg-radio:hover .fg-radio__dot{border-color:var(--fir-500)}
.fg-radio__input:checked + .fg-radio__dot{border-color:var(--fir-700);border-width:6px}
.fg-radio__input:focus-visible + .fg-radio__dot{outline:2px solid var(--border-focus);outline-offset:2px}
.fg-radio__input:disabled + .fg-radio__dot{background:var(--paper-200);border-color:var(--paper-300)}
.fg-radio__desc{display:block;font-size:var(--size-body-sm);color:var(--text-muted);margin-top:2px}
.fg-radio-group{display:flex;gap:var(--space-md)}
.fg-radio-group--vertical{flex-direction:column}
.fg-radio-group__legend{font-family:var(--font-body);font-weight:var(--weight-bold);font-size:var(--size-label);letter-spacing:var(--tracking-label);text-transform:uppercase;color:var(--text-muted);margin-bottom:var(--space-sm)}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","radio");el.textContent=CSS;document.head.appendChild(el)}

export function Radio({ label, description, disabled = false, className = "", ...rest }) {
  ensureStyles();
  return (
    <label className={["fg-radio", disabled ? "fg-radio--disabled" : "", className].filter(Boolean).join(" ")}>
      <input type="radio" className="fg-radio__input" disabled={disabled} {...rest} />
      <span className="fg-radio__dot" />
      <span>{label}{description ? <span className="fg-radio__desc">{description}</span> : null}</span>
    </label>
  );
}

export function RadioGroup({ legend, direction = "vertical", className = "", children }) {
  ensureStyles();
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0 }} className={className}>
      {legend ? <legend className="fg-radio-group__legend">{legend}</legend> : null}
      <div className={["fg-radio-group", direction === "vertical" ? "fg-radio-group--vertical" : ""].filter(Boolean).join(" ")}>{children}</div>
    </fieldset>
  );
}
