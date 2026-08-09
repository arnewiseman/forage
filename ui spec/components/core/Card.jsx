import React from "react";

const CSS = `
.fg-card{background:var(--surface-card);border:1px solid var(--border-hairline);border-radius:var(--radius-md);color:var(--text-body)}
.fg-card--pad-sm{padding:var(--space-lg)}
.fg-card--pad-md{padding:var(--space-2xl)}
.fg-card--pad-lg{padding:var(--space-3xl)}
.fg-card--pad-none{padding:0}
.fg-card--raised{box-shadow:var(--shadow-2)}
.fg-card--print{border:var(--border-width-solid) solid var(--border-strong);box-shadow:var(--shadow-print)}
.fg-card--sunken{background:var(--surface-sunken);border-color:var(--paper-300)}
.fg-card--accent{background:var(--surface-accent);border-color:var(--fir-200)}
.fg-card--inverse{background:var(--surface-inverse);border-color:var(--fir-800);color:var(--paper-200)}
.fg-card--interactive{cursor:pointer;transition:var(--transition-control);text-align:left;width:100%;font:inherit;display:block}
.fg-card--interactive:hover{border-color:var(--fir-500);box-shadow:var(--shadow-2)}
.fg-card--interactive:active{transform:translateY(1px)}
.fg-card--print.fg-card--interactive:hover{box-shadow:5px 5px 0 var(--ink-900);transform:translate(-1px,-1px)}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","card");el.textContent=CSS;document.head.appendChild(el)}

export function Card({ variant = "default", padding = "md", interactive = false, as, className = "", children, ...rest }) {
  ensureStyles();
  const Tag = as || (interactive ? "button" : "div");
  const cls = ["fg-card", "fg-card--pad-" + padding, variant !== "default" ? "fg-card--" + variant : "", interactive ? "fg-card--interactive" : "", className].filter(Boolean).join(" ");
  return <Tag className={cls} type={Tag === "button" ? "button" : undefined} {...rest}>{children}</Tag>;
}
