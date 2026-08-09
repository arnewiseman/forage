import React from "react";
import { Icon } from "./Icon.jsx";

const CSS = `
.fg-tag{display:inline-flex;align-items:center;gap:var(--space-xs);font-family:var(--font-body);font-weight:var(--weight-medium);font-size:var(--size-body-sm);padding:5px var(--space-md);border-radius:var(--radius-pill);border:1px solid var(--border-default);background:var(--surface-card);color:var(--text-body);transition:var(--transition-control)}
.fg-tag--clickable{cursor:pointer}
.fg-tag--clickable:hover{border-color:var(--fir-500);color:var(--fir-700);background:var(--fir-050)}
.fg-tag--selected{background:var(--fir-700);border-color:var(--fir-700);color:var(--paper-050)}
.fg-tag--selected:hover{background:var(--fir-800);border-color:var(--fir-800);color:var(--paper-050)}
.fg-tag--missing{background:var(--rose-100);border-color:var(--rose-300);color:var(--rose-800)}
.fg-tag--have{background:var(--moss-100);border-color:var(--moss-300);color:var(--moss-700)}
.fg-tag__x{display:inline-flex;border:0;background:transparent;padding:0;margin-right:-2px;cursor:pointer;color:inherit;opacity:.6}
.fg-tag__x:hover{opacity:1}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","tag");el.textContent=CSS;document.head.appendChild(el)}

export function Tag({ tone = "default", selected = false, icon, onRemove, onClick, className = "", children, ...rest }) {
  ensureStyles();
  const clickable = Boolean(onClick);
  const cls = ["fg-tag", tone !== "default" ? "fg-tag--" + tone : "", clickable ? "fg-tag--clickable" : "", selected ? "fg-tag--selected" : "", className].filter(Boolean).join(" ");
  const Tag_ = clickable ? "button" : "span";
  return (
    <Tag_ className={cls} onClick={onClick} type={clickable ? "button" : undefined} {...rest}>
      {icon ? <Icon name={icon} size={14} /> : null}
      {children}
      {onRemove ? (
        <button type="button" className="fg-tag__x" aria-label="Remove" onClick={(e) => { e.stopPropagation(); onRemove(e); }}>
          <Icon name="x" size={13} />
        </button>
      ) : null}
    </Tag_>
  );
}
