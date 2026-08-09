import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.fg-check{display:inline-flex;gap:var(--space-md);align-items:flex-start;cursor:pointer;font-family:var(--font-body);font-size:var(--size-body-md);color:var(--text-body);line-height:1.35}
.fg-check--disabled{cursor:not-allowed;color:var(--rain-400)}
.fg-check__box{position:relative;flex:0 0 auto;width:20px;height:20px;border:var(--border-width-solid) solid var(--border-default);border-radius:var(--radius-xs);background:var(--surface-card);display:inline-flex;align-items:center;justify-content:center;color:transparent;transition:var(--transition-control);margin-top:1px}
.fg-check:hover .fg-check__box{border-color:var(--fir-500)}
.fg-check__input{position:absolute;opacity:0;width:0;height:0}
.fg-check__input:checked + .fg-check__box{background:var(--fir-700);border-color:var(--fir-700);color:var(--paper-050)}
.fg-check__input:indeterminate + .fg-check__box{background:var(--fir-400);border-color:var(--fir-400);color:var(--paper-050)}
.fg-check__input:focus-visible + .fg-check__box{outline:2px solid var(--border-focus);outline-offset:2px}
.fg-check__input:disabled + .fg-check__box{background:var(--paper-200);border-color:var(--paper-300)}
.fg-check__desc{display:block;font-size:var(--size-body-sm);color:var(--text-muted);margin-top:2px}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","checkbox");el.textContent=CSS;document.head.appendChild(el)}

export function Checkbox({ label, description, indeterminate = false, disabled = false, className = "", ...rest }) {
  ensureStyles();
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  return (
    <label className={["fg-check", disabled ? "fg-check--disabled" : "", className].filter(Boolean).join(" ")}>
      <input ref={ref} type="checkbox" className="fg-check__input" disabled={disabled} {...rest} />
      <span className="fg-check__box"><Icon name={indeterminate ? "minus" : "check"} size={14} /></span>
      <span>{label}{description ? <span className="fg-check__desc">{description}</span> : null}</span>
    </label>
  );
}
