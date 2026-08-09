import React from "react";

const CSS = `
.fg-tip{position:relative;display:inline-flex}
.fg-tip__bubble{position:absolute;z-index:50;background:var(--ink-900);color:var(--paper-050);font-family:var(--font-body);font-size:var(--size-body-sm);line-height:1.4;padding:var(--space-sm) var(--space-md);border-radius:var(--radius-sm);white-space:normal;width:max-content;max-width:240px;box-shadow:var(--shadow-2);opacity:0;pointer-events:none;transition:opacity var(--duration-fast) var(--ease-standard)}
.fg-tip__bubble--visible{opacity:1}
.fg-tip__bubble--top{bottom:calc(100% + 8px);left:50%;transform:translateX(-50%)}
.fg-tip__bubble--bottom{top:calc(100% + 8px);left:50%;transform:translateX(-50%)}
.fg-tip__bubble--left{right:calc(100% + 8px);top:50%;transform:translateY(-50%)}
.fg-tip__bubble--right{left:calc(100% + 8px);top:50%;transform:translateY(-50%)}
`;
let __s=false;function ensureStyles(){if(__s||typeof document==="undefined")return;__s=true;const el=document.createElement("style");el.setAttribute("data-forage","tooltip");el.textContent=CSS;document.head.appendChild(el)}

export function Tooltip({ content, placement = "top", className = "", children }) {
  ensureStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <span className={["fg-tip", className].filter(Boolean).join(" ")}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {children}
      <span role="tooltip" className={["fg-tip__bubble", "fg-tip__bubble--" + placement, open ? "fg-tip__bubble--visible" : ""].join(" ")}>{content}</span>
    </span>
  );
}
