import React from "react";

const CSS = `
.fg-switch{display:inline-flex;align-items:center;gap:var(--space-md);cursor:pointer;font-family:var(--font-body);font-size:var(--size-body-md);color:var(--text-body)}
.fg-switch--disabled{cursor:not-allowed;color:var(--rain-400)}
.fg-switch__input{position:absolute;opacity:0;width:0;height:0}
.fg-switch__track{position:relative;flex:0 0 auto;width:42px;height:24px;border-radius:var(--radius-pill);background:var(--paper-300);border:1px solid var(--border-default);transition:var(--transition-control)}
.fg-switch__knob{position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:var(--radius-pill);background:var(--surface-card);box-shadow:var(--shadow-1);transition:transform var(--duration-fast) var(--ease-standard)}
.fg-switch__input:checked + .fg-switch__track{background:var(--fir-600);border-color:var(--fir-600)}
.fg-switch__input:checked + .fg-switch__track .fg-switch__knob{transform:translateX(18px)}
.fg-switch__input:focus-visible + .fg-switch__track{outline:2px solid var(--border-focus);outline-offset:2px}
.fg-switch__input:disabled + .fg-switch__track{background:var(--paper-200);border-color:var(--paper-300)}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","switch");el.textContent=CSS;document.head.appendChild(el)}

export function Switch({ label, labelPosition = "end", disabled = false, className = "", ...rest }) {
  ensureStyles();
  const control = (
    <>
      <input type="checkbox" role="switch" className="fg-switch__input" disabled={disabled} {...rest} />
      <span className="fg-switch__track"><span className="fg-switch__knob" /></span>
    </>
  );
  return (
    <label className={["fg-switch", disabled ? "fg-switch--disabled" : "", className].filter(Boolean).join(" ")}>
      {labelPosition === "start" ? <span>{label}</span> : null}
      {control}
      {labelPosition === "end" ? <span>{label}</span> : null}
    </label>
  );
}
