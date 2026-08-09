import React from "react";
import { Icon } from "../core/Icon.jsx";

const CSS = `
.fg-stepper{display:flex;align-items:flex-start;gap:0;width:100%}
.fg-stepper__step{display:flex;align-items:flex-start;gap:var(--space-md);flex:1 1 0;min-width:0}
.fg-stepper__step:last-child{flex:0 0 auto}
.fg-stepper__mark{flex:0 0 auto;width:28px;height:28px;border-radius:var(--radius-pill);display:inline-flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:var(--size-body-sm);font-weight:var(--weight-bold);border:var(--border-width-solid) solid var(--border-default);background:var(--surface-card);color:var(--text-muted)}
.fg-stepper__text{min-width:0;padding-top:3px}
.fg-stepper__label{font-family:var(--font-display);font-weight:var(--weight-semibold);font-size:var(--size-body-sm);color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fg-stepper__line{flex:1 1 auto;height:1px;background:var(--border-hairline);margin:14px var(--space-md) 0}
.fg-stepper__step--current .fg-stepper__mark{background:var(--fir-700);border-color:var(--fir-700);color:var(--paper-050)}
.fg-stepper__step--current .fg-stepper__label{color:var(--text-strong)}
.fg-stepper__step--done .fg-stepper__mark{background:var(--moss-100);border-color:var(--moss-300);color:var(--moss-700)}
.fg-stepper__step--done .fg-stepper__label{color:var(--text-body)}
.fg-stepper--compact .fg-stepper__label{display:none}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","stepper");el.textContent=CSS;document.head.appendChild(el)}

export function Stepper({ steps = [], current = 0, compact = false, className = "" }) {
  ensureStyles();
  return (
    <div className={["fg-stepper", compact ? "fg-stepper--compact" : "", className].filter(Boolean).join(" ")}>
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "current" : "todo";
        const label = typeof s === "string" ? s : s.label;
        return (
          <React.Fragment key={i}>
            <div className={"fg-stepper__step fg-stepper__step--" + state} aria-current={state === "current" ? "step" : undefined}>
              <span className="fg-stepper__mark">{state === "done" ? <Icon name="check" size={15} /> : i + 1}</span>
              <span className="fg-stepper__text"><span className="fg-stepper__label">{label}</span></span>
            </div>
            {i < steps.length - 1 ? <span className="fg-stepper__line" /> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}
