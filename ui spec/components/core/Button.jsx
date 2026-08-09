import React from "react";
import { Icon } from "./Icon.jsx";

const CSS = `
.fg-btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--space-sm);font-family:var(--font-body);font-weight:var(--weight-bold);border:var(--border-width-solid) solid transparent;border-radius:var(--radius-sm);cursor:pointer;text-decoration:none;white-space:nowrap;transition:var(--transition-control)}
.fg-btn:disabled,.fg-btn[aria-disabled="true"]{cursor:not-allowed;background:var(--action-disabled-bg);color:var(--action-disabled-fg);border-color:transparent;box-shadow:none;transform:none}
.fg-btn--sm{height:var(--control-height-sm);padding:0 var(--space-md);font-size:var(--size-body-sm)}
.fg-btn--md{height:var(--control-height-md);padding:0 var(--space-lg);font-size:var(--size-body-md)}
.fg-btn--lg{height:var(--control-height-lg);padding:0 var(--space-2xl);font-size:var(--size-body-lg)}
.fg-btn--primary{background:var(--action-primary-bg);color:var(--action-primary-fg);border-color:var(--action-primary-bg)}
.fg-btn--primary:hover:not(:disabled){background:var(--action-primary-bg-hover);border-color:var(--action-primary-bg-hover)}
.fg-btn--primary:active:not(:disabled){background:var(--action-primary-bg-active);transform:translateY(1px)}
.fg-btn--secondary{background:var(--action-secondary-bg);color:var(--action-secondary-fg);border-color:var(--border-strong)}
.fg-btn--secondary:hover:not(:disabled){box-shadow:var(--shadow-print);transform:translate(-1px,-1px)}
.fg-btn--secondary:active:not(:disabled){box-shadow:0 0 0 var(--ink-900);transform:translate(1px,1px)}
.fg-btn--ghost{background:transparent;color:var(--text-brand)}
.fg-btn--ghost:hover:not(:disabled){background:var(--fir-050)}
.fg-btn--ghost:active:not(:disabled){background:var(--fir-100)}
.fg-btn--danger{background:var(--action-danger-bg);color:var(--action-danger-fg);border-color:var(--action-danger-bg)}
.fg-btn--danger:hover:not(:disabled){background:var(--rose-700);border-color:var(--rose-700)}
.fg-btn--danger:active:not(:disabled){background:var(--rose-800);transform:translateY(1px)}
.fg-btn--link{background:transparent;color:var(--text-link);height:auto;padding:0;border-color:transparent;text-decoration:underline;text-underline-offset:3px}
.fg-btn--link:hover:not(:disabled){color:var(--text-link-hover);text-decoration-thickness:2px}
.fg-btn--block{width:100%}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","button");el.textContent=CSS;document.head.appendChild(el)}

export function Button({ variant = "primary", size = "md", iconStart, iconEnd, block = false, as = "button", className = "", children, ...rest }) {
  ensureStyles();
  const Tag = as;
  const cls = ["fg-btn", "fg-btn--" + variant, "fg-btn--" + size, block ? "fg-btn--block" : "", className].filter(Boolean).join(" ");
  const glyph = size === "lg" ? 20 : size === "sm" ? 15 : 17;
  return (
    <Tag className={cls} {...rest}>
      {iconStart ? <Icon name={iconStart} size={glyph} /> : null}
      {children}
      {iconEnd ? <Icon name={iconEnd} size={glyph} /> : null}
    </Tag>
  );
}
