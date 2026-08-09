import React from "react";
import { Icon } from "./Icon.jsx";

const CSS = `
.fg-iconbtn{display:inline-flex;align-items:center;justify-content:center;border:var(--border-width-solid) solid transparent;border-radius:var(--radius-sm);cursor:pointer;background:transparent;color:var(--text-body);transition:var(--transition-control)}
.fg-iconbtn:disabled{cursor:not-allowed;color:var(--action-disabled-fg);background:transparent}
.fg-iconbtn--sm{width:var(--control-height-sm);height:var(--control-height-sm)}
.fg-iconbtn--md{width:var(--control-height-md);height:var(--control-height-md)}
.fg-iconbtn--lg{width:var(--control-height-lg);height:var(--control-height-lg)}
.fg-iconbtn--ghost:hover:not(:disabled){background:var(--fir-050);color:var(--text-brand)}
.fg-iconbtn--ghost:active:not(:disabled){background:var(--fir-100)}
.fg-iconbtn--outline{border-color:var(--border-strong);background:var(--surface-card)}
.fg-iconbtn--outline:hover:not(:disabled){box-shadow:var(--shadow-print);transform:translate(-1px,-1px)}
.fg-iconbtn--outline:active:not(:disabled){box-shadow:none;transform:translate(1px,1px)}
.fg-iconbtn--solid{background:var(--action-primary-bg);color:var(--action-primary-fg)}
.fg-iconbtn--solid:hover:not(:disabled){background:var(--action-primary-bg-hover)}
.fg-iconbtn--round{border-radius:var(--radius-pill)}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","iconbutton");el.textContent=CSS;document.head.appendChild(el)}

export function IconButton({ icon, label, variant = "ghost", size = "md", round = false, className = "", ...rest }) {
  ensureStyles();
  const cls = ["fg-iconbtn", "fg-iconbtn--" + variant, "fg-iconbtn--" + size, round ? "fg-iconbtn--round" : "", className].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} aria-label={label} title={label} {...rest}>
      <Icon name={icon} size={size === "lg" ? 22 : size === "sm" ? 16 : 19} />
    </button>
  );
}
