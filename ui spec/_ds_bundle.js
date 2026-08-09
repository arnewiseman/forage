/* @ds-bundle: {"format":4,"namespace":"ForageDesignSystem_98e604","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Callout","sourcePath":"components/core/Callout.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"SkillMeter","sourcePath":"components/data/SkillMeter.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"ToastStack","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Stepper","sourcePath":"components/navigation/Stepper.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"ab8c52bc8947","components/core/Button.jsx":"48fd6ec55232","components/core/Callout.jsx":"855990d55505","components/core/Card.jsx":"8e6cdfdde9e2","components/core/Icon.jsx":"7aa66a584539","components/core/IconButton.jsx":"7566446aa6d8","components/core/Tag.jsx":"5ac56ff4c1ea","components/data/SkillMeter.jsx":"eef452d682dd","components/feedback/Dialog.jsx":"f948a692a24a","components/feedback/EmptyState.jsx":"263e57cb6d5c","components/feedback/Toast.jsx":"161cc81aabb6","components/feedback/Tooltip.jsx":"f380ccaefe50","components/forms/Checkbox.jsx":"534a12a7b2aa","components/forms/Input.jsx":"cef6b5629cb2","components/forms/Radio.jsx":"8984a553c86c","components/forms/Select.jsx":"ad2684feb419","components/forms/Switch.jsx":"831c6a631804","components/forms/Textarea.jsx":"ec75476873e7","components/navigation/Stepper.jsx":"bfdf61a736ad","components/navigation/Tabs.jsx":"3c51f696fbc5","ui_kits/forage-app/App.jsx":"90b3cc4434d3","ui_kits/forage-app/AppShell.jsx":"bf5f5fe4c0f8","ui_kits/forage-app/DescribeScreen.jsx":"5a5ce09d397d","ui_kits/forage-app/GapScreen.jsx":"ce00740b7791","ui_kits/forage-app/MatchScreen.jsx":"3149677ebdc9","ui_kits/forage-app/RolesScreen.jsx":"626b17bc7190","ui_kits/forage-app/data.js":"2a9324867eb5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ForageDesignSystem_98e604 = window.ForageDesignSystem_98e604 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "card");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Card({
  variant = "default",
  padding = "md",
  interactive = false,
  as,
  className = "",
  children,
  ...rest
}) {
  ensureStyles();
  const Tag = as || (interactive ? "button" : "div");
  const cls = ["fg-card", "fg-card--pad-" + padding, variant !== "default" ? "fg-card--" + variant : "", interactive ? "fg-card--interactive" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    type: Tag === "button" ? "button" : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const BASE = "https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/";
function Icon({
  name,
  size = 20,
  color = "currentColor",
  title,
  className = "",
  style = {},
  ...rest
}) {
  const url = 'url("' + BASE + name + '.svg")';
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    role: title ? "img" : "presentation",
    "aria-label": title || undefined,
    "aria-hidden": title ? undefined : "true",
    className: ("fg-icon " + className).trim(),
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "0 0 auto",
      backgroundColor: color,
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.fg-badge{display:inline-flex;align-items:center;gap:var(--space-2xs);font-family:var(--font-body);font-weight:var(--weight-bold);font-size:var(--size-micro);letter-spacing:var(--tracking-label);text-transform:uppercase;padding:3px var(--space-sm);border-radius:var(--radius-xs);border:1px solid transparent;white-space:nowrap}
.fg-badge--neutral{background:var(--paper-200);color:var(--ink-700);border-color:var(--paper-300)}
.fg-badge--brand{background:var(--fir-100);color:var(--fir-700);border-color:var(--fir-200)}
.fg-badge--positive{background:var(--status-positive-surface);color:var(--status-positive);border-color:var(--moss-300)}
.fg-badge--caution{background:var(--status-caution-surface);color:var(--status-caution);border-color:var(--amber-300)}
.fg-badge--critical{background:var(--status-critical-surface);color:var(--status-critical);border-color:var(--rose-300)}
.fg-badge--info{background:var(--status-info-surface);color:var(--status-info);border-color:var(--hood-200)}
.fg-badge--solid{background:var(--fir-700);color:var(--paper-050);border-color:var(--fir-700)}
`;
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "badge");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Badge({
  tone = "neutral",
  icon,
  className = "",
  children,
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["fg-badge", "fg-badge--" + tone, className].filter(Boolean).join(" ")
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 12
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "button");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Button({
  variant = "primary",
  size = "md",
  iconStart,
  iconEnd,
  block = false,
  as = "button",
  className = "",
  children,
  ...rest
}) {
  ensureStyles();
  const Tag = as;
  const cls = ["fg-btn", "fg-btn--" + variant, "fg-btn--" + size, block ? "fg-btn--block" : "", className].filter(Boolean).join(" ");
  const glyph = size === "lg" ? 20 : size === "sm" ? 15 : 17;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), iconStart ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconStart,
    size: glyph
  }) : null, children, iconEnd ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconEnd,
    size: glyph
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.fg-callout{display:flex;gap:var(--space-md);padding:var(--space-lg);border-radius:var(--radius-md);border:1px solid var(--border-hairline);background:var(--surface-sunken);font-size:var(--size-body-sm);line-height:var(--leading-normal)}
.fg-callout__body{display:flex;flex-direction:column;gap:var(--space-2xs);min-width:0}
.fg-callout__title{font-family:var(--font-display);font-weight:var(--weight-bold);font-size:var(--size-body-md);color:var(--text-strong);letter-spacing:var(--tracking-title)}
.fg-callout--info{background:var(--status-info-surface);border-color:var(--hood-200);color:var(--hood-800)}
.fg-callout--positive{background:var(--status-positive-surface);border-color:var(--moss-300);color:var(--moss-700)}
.fg-callout--caution{background:var(--status-caution-surface);border-color:var(--amber-300);color:var(--amber-700)}
.fg-callout--critical{background:var(--status-critical-surface);border-color:var(--rose-300);color:var(--rose-800)}
.fg-callout--disclosure{background:var(--paper-200);border:1px dashed var(--rain-500);color:var(--ink-700);font-family:var(--font-mono);font-size:var(--size-micro);line-height:1.55}
`;
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "callout");
  el.textContent = CSS;
  document.head.appendChild(el);
}
const ICONS = {
  neutral: "info",
  info: "info",
  positive: "circle-check",
  caution: "triangle-alert",
  critical: "octagon-alert",
  disclosure: "scroll-text"
};
function Callout({
  tone = "neutral",
  title,
  icon,
  className = "",
  children,
  ...rest
}) {
  ensureStyles();
  const glyph = icon || ICONS[tone] || "info";
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["fg-callout", tone !== "neutral" ? "fg-callout--" + tone : "", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: glyph,
    size: tone === "disclosure" ? 15 : 18,
    style: {
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fg-callout__body"
  }, title ? /*#__PURE__*/React.createElement("div", {
    className: "fg-callout__title"
  }, title) : null, /*#__PURE__*/React.createElement("div", null, children)));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Callout.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "iconbutton");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  round = false,
  className = "",
  ...rest
}) {
  ensureStyles();
  const cls = ["fg-iconbtn", "fg-iconbtn--" + variant, "fg-iconbtn--" + size, round ? "fg-iconbtn--round" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-label": label,
    title: label
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === "lg" ? 22 : size === "sm" ? 16 : 19
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "tag");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Tag({
  tone = "default",
  selected = false,
  icon,
  onRemove,
  onClick,
  className = "",
  children,
  ...rest
}) {
  ensureStyles();
  const clickable = Boolean(onClick);
  const cls = ["fg-tag", tone !== "default" ? "fg-tag--" + tone : "", clickable ? "fg-tag--clickable" : "", selected ? "fg-tag--selected" : "", className].filter(Boolean).join(" ");
  const Tag_ = clickable ? "button" : "span";
  return /*#__PURE__*/React.createElement(Tag_, _extends({
    className: cls,
    onClick: onClick,
    type: clickable ? "button" : undefined
  }, rest), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }) : null, children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "fg-tag__x",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 13
  })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/SkillMeter.jsx
try { (() => {
const CSS = `
.fg-meter{display:flex;flex-direction:column;gap:var(--space-xs);width:100%}
.fg-meter__top{display:flex;align-items:baseline;justify-content:space-between;gap:var(--space-md)}
.fg-meter__label{font-family:var(--font-body);font-weight:var(--weight-semibold);font-size:var(--size-body-md);color:var(--text-strong)}
.fg-meter__value{font-family:var(--font-mono);font-size:var(--size-body-sm);color:var(--text-muted)}
.fg-meter__track{position:relative;height:10px;border-radius:var(--radius-pill);background:var(--paper-200);border:1px solid var(--paper-300);overflow:hidden}
.fg-meter__fill{position:absolute;inset:0 auto 0 0;border-radius:var(--radius-pill);background:var(--fir-600);transition:width var(--duration-slow) var(--ease-entrance)}
.fg-meter--positive .fg-meter__fill{background:var(--moss-500)}
.fg-meter--caution .fg-meter__fill{background:var(--amber-500)}
.fg-meter--critical .fg-meter__fill{background:var(--rose-600)}
.fg-meter__note{font-size:var(--size-body-sm);color:var(--text-muted)}
.fg-meter--lg .fg-meter__track{height:16px}
.fg-meter--sm .fg-meter__track{height:6px}
`;
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "skillmeter");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function SkillMeter({
  label,
  value = 0,
  max = 100,
  tone = "brand",
  size = "md",
  valueLabel,
  note,
  className = ""
}) {
  ensureStyles();
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", {
    className: ["fg-meter", "fg-meter--" + tone, "fg-meter--" + size, className].filter(Boolean).join(" ")
  }, label || valueLabel ? /*#__PURE__*/React.createElement("div", {
    className: "fg-meter__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fg-meter__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "fg-meter__value"
  }, valueLabel != null ? valueLabel : Math.round(pct) + "%")) : null, /*#__PURE__*/React.createElement("div", {
    className: "fg-meter__track",
    role: "meter",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": max,
    "aria-label": typeof label === "string" ? label : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-meter__fill",
    style: {
      width: pct + "%"
    }
  })), note ? /*#__PURE__*/React.createElement("div", {
    className: "fg-meter__note"
  }, note) : null);
}
Object.assign(__ds_scope, { SkillMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SkillMeter.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
const CSS = `
@keyframes fg-dialog-in{from{opacity:0;transform:translateY(8px) scale(.985)}to{opacity:1;transform:none}}
@keyframes fg-scrim-in{from{opacity:0}to{opacity:1}}
.fg-scrim{position:fixed;inset:0;background:var(--surface-overlay);display:flex;align-items:center;justify-content:center;padding:var(--space-2xl);z-index:60;animation:fg-scrim-in var(--duration-fast) var(--ease-standard)}
.fg-dialog{background:var(--surface-card);border:var(--border-width-solid) solid var(--border-strong);border-radius:var(--radius-md);box-shadow:var(--shadow-3);width:100%;max-height:86vh;display:flex;flex-direction:column;animation:fg-dialog-in var(--duration-base) var(--ease-entrance)}
.fg-dialog--sm{max-width:420px}.fg-dialog--md{max-width:560px}.fg-dialog--lg{max-width:760px}
.fg-dialog__head{display:flex;align-items:flex-start;gap:var(--space-lg);padding:var(--space-2xl) var(--space-2xl) var(--space-md)}
.fg-dialog__title{font-family:var(--font-display);font-weight:var(--weight-bold);font-size:var(--size-title-md);letter-spacing:var(--tracking-title);color:var(--text-strong);flex:1 1 auto}
.fg-dialog__desc{font-size:var(--size-body-sm);color:var(--text-muted);margin-top:var(--space-2xs)}
.fg-dialog__body{padding:0 var(--space-2xl) var(--space-2xl);overflow:auto}
.fg-dialog__foot{display:flex;justify-content:flex-end;gap:var(--space-md);padding:var(--space-lg) var(--space-2xl);border-top:1px solid var(--border-hairline);background:var(--paper-050);border-radius:0 0 6px 6px}
`;
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "dialog");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Dialog({
  open = true,
  title,
  description,
  size = "md",
  onClose,
  footer,
  children
}) {
  ensureStyles();
  React.useEffect(() => {
    if (!open || !onClose) return;
    const h = e => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fg-scrim",
    onMouseDown: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-dialog fg-dialog--" + size,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": typeof title === "string" ? title : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-dialog__head"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-dialog__title"
  }, title), description ? /*#__PURE__*/React.createElement("div", {
    className: "fg-dialog__desc"
  }, description) : null), onClose ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    onClick: onClose,
    size: "sm"
  }) : null), /*#__PURE__*/React.createElement("div", {
    className: "fg-dialog__body"
  }, children), footer ? /*#__PURE__*/React.createElement("div", {
    className: "fg-dialog__foot"
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
const CSS = `
.fg-empty{display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--space-md);padding:var(--space-5xl) var(--space-2xl);border:1px dashed var(--border-default);border-radius:var(--radius-md);background:var(--paper-050)}
.fg-empty__mark{width:52px;height:52px;border-radius:var(--radius-pill);background:var(--fir-050);border:1px solid var(--fir-200);display:flex;align-items:center;justify-content:center;color:var(--fir-600)}
.fg-empty__title{font-family:var(--font-display);font-weight:var(--weight-bold);font-size:var(--size-title-sm);letter-spacing:var(--tracking-title);color:var(--text-strong)}
.fg-empty__body{font-size:var(--size-body-md);color:var(--text-muted);max-width:44ch;line-height:var(--leading-relaxed)}
.fg-empty__actions{display:flex;gap:var(--space-md);margin-top:var(--space-2xs)}
`;
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "emptystate");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function EmptyState({
  icon = "compass",
  title,
  children,
  actions,
  className = ""
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", {
    className: ["fg-empty", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("span", {
    className: "fg-empty__mark"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24
  })), title ? /*#__PURE__*/React.createElement("div", {
    className: "fg-empty__title"
  }, title) : null, children ? /*#__PURE__*/React.createElement("div", {
    className: "fg-empty__body"
  }, children) : null, actions ? /*#__PURE__*/React.createElement("div", {
    className: "fg-empty__actions"
  }, actions) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const CSS = `
@keyframes fg-toast-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.fg-toast{display:flex;align-items:flex-start;gap:var(--space-md);background:var(--fir-800);color:var(--paper-100);border-radius:var(--radius-md);padding:var(--space-md) var(--space-md) var(--space-md) var(--space-lg);box-shadow:var(--shadow-3);font-size:var(--size-body-sm);line-height:var(--leading-normal);max-width:420px;animation:fg-toast-in var(--duration-base) var(--ease-entrance)}
.fg-toast__title{font-family:var(--font-display);font-weight:var(--weight-bold);font-size:var(--size-body-md);color:var(--paper-000)}
.fg-toast__body{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}
.fg-toast--positive .fg-toast__mark{color:var(--moss-300)}
.fg-toast--critical{background:var(--rose-800)}
.fg-toast--caution{background:var(--amber-700)}
.fg-toast__action{background:transparent;border:0;color:var(--paper-000);font:inherit;font-weight:var(--weight-bold);text-decoration:underline;text-underline-offset:3px;cursor:pointer;padding:0;align-self:flex-start;margin-top:2px}
.fg-toast-stack{position:fixed;bottom:var(--space-2xl);right:var(--space-2xl);display:flex;flex-direction:column;gap:var(--space-md);z-index:70}
`;
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "toast");
  el.textContent = CSS;
  document.head.appendChild(el);
}
const ICONS = {
  neutral: "info",
  positive: "circle-check",
  caution: "triangle-alert",
  critical: "octagon-alert"
};
function Toast({
  tone = "neutral",
  title,
  actionLabel,
  onAction,
  onClose,
  className = "",
  children
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    className: ["fg-toast", "fg-toast--" + tone, className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    className: "fg-toast__mark",
    name: ICONS[tone] || "info",
    size: 18,
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fg-toast__body"
  }, title ? /*#__PURE__*/React.createElement("div", {
    className: "fg-toast__title"
  }, title) : null, children ? /*#__PURE__*/React.createElement("div", null, children) : null, actionLabel ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "fg-toast__action",
    onClick: onAction
  }, actionLabel) : null), onClose ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Dismiss",
    size: "sm",
    onClick: onClose,
    style: {
      color: "inherit"
    }
  }) : null);
}
function ToastStack({
  children
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", {
    className: "fg-toast-stack"
  }, children);
}
Object.assign(__ds_scope, { Toast, ToastStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const CSS = `
.fg-tip{position:relative;display:inline-flex}
.fg-tip__bubble{position:absolute;z-index:50;background:var(--ink-900);color:var(--paper-050);font-family:var(--font-body);font-size:var(--size-body-sm);line-height:1.4;padding:var(--space-sm) var(--space-md);border-radius:var(--radius-sm);white-space:normal;width:max-content;max-width:240px;box-shadow:var(--shadow-2);opacity:0;pointer-events:none;transition:opacity var(--duration-fast) var(--ease-standard)}
.fg-tip__bubble--visible{opacity:1}
.fg-tip__bubble--top{bottom:calc(100% + 8px);left:50%;transform:translateX(-50%)}
.fg-tip__bubble--bottom{top:calc(100% + 8px);left:50%;transform:translateX(-50%)}
.fg-tip__bubble--left{right:calc(100% + 8px);top:50%;transform:translateY(-50%)}
.fg-tip__bubble--right{left:calc(100% + 8px);top:50%;transform:translateY(-50%)}
`;
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "tooltip");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Tooltip({
  content,
  placement = "top",
  className = "",
  children
}) {
  ensureStyles();
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    className: ["fg-tip", className].filter(Boolean).join(" "),
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false)
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    className: ["fg-tip__bubble", "fg-tip__bubble--" + placement, open ? "fg-tip__bubble--visible" : ""].join(" ")
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "checkbox");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Checkbox({
  label,
  description,
  indeterminate = false,
  disabled = false,
  className = "",
  ...rest
}) {
  ensureStyles();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return /*#__PURE__*/React.createElement("label", {
    className: ["fg-check", disabled ? "fg-check--disabled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: ref,
    type: "checkbox",
    className: "fg-check__input",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "fg-check__box"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: indeterminate ? "minus" : "check",
    size: 14
  })), /*#__PURE__*/React.createElement("span", null, label, description ? /*#__PURE__*/React.createElement("span", {
    className: "fg-check__desc"
  }, description) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.fg-field{display:flex;flex-direction:column;gap:var(--space-xs)}
.fg-field__label{font-family:var(--font-body);font-weight:var(--weight-bold);font-size:var(--size-label);letter-spacing:var(--tracking-label);text-transform:uppercase;color:var(--text-muted)}
.fg-field__hint{font-size:var(--size-body-sm);color:var(--text-muted)}
.fg-field__error{font-size:var(--size-body-sm);color:var(--status-critical);font-weight:var(--weight-medium)}
.fg-field__req{color:var(--rose-600)}
.fg-input__wrap{position:relative;display:flex;align-items:center}
.fg-input{width:100%;font-family:var(--font-body);font-size:var(--size-body-md);color:var(--text-strong);background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-sm);height:var(--control-height-md);padding:0 var(--space-md);transition:var(--transition-control);box-shadow:var(--shadow-inset-well)}
.fg-input::placeholder{color:var(--rain-400)}
.fg-input:hover:not(:disabled){border-color:var(--rain-500)}
.fg-input:focus{outline:none;border-color:var(--border-focus);box-shadow:var(--focus-ring)}
.fg-input:disabled{background:var(--paper-200);color:var(--rain-400);cursor:not-allowed;box-shadow:none}
.fg-input--lg{height:var(--control-height-lg);font-size:var(--size-body-lg);padding:0 var(--space-lg)}
.fg-input--sm{height:var(--control-height-sm);font-size:var(--size-body-sm)}
.fg-input--has-start{padding-left:38px}
.fg-input--has-end{padding-right:38px}
.fg-input--invalid{border-color:var(--rose-600)}
.fg-input--invalid:focus{box-shadow:0 0 0 3px var(--rose-100)}
.fg-input__icon{position:absolute;color:var(--rain-500);pointer-events:none}
.fg-input__icon--start{left:var(--space-md)}
.fg-input__icon--end{right:var(--space-md)}
`;
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "input");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Input({
  label,
  hint,
  error,
  required = false,
  size = "md",
  iconStart,
  iconEnd,
  id,
  className = "",
  ...rest
}) {
  ensureStyles();
  const autoId = React.useId ? React.useId() : "fg-input";
  const inputId = id || autoId;
  return /*#__PURE__*/React.createElement("div", {
    className: ["fg-field", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "fg-field__label",
    htmlFor: inputId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "fg-field__req"
  }, " *") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "fg-input__wrap"
  }, iconStart ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    className: "fg-input__icon fg-input__icon--start",
    name: iconStart,
    size: 17
  }) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    "aria-invalid": error ? "true" : undefined,
    className: ["fg-input", "fg-input--" + size, iconStart ? "fg-input--has-start" : "", iconEnd ? "fg-input--has-end" : "", error ? "fg-input--invalid" : ""].filter(Boolean).join(" ")
  }, rest)), iconEnd ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    className: "fg-input__icon fg-input__icon--end",
    name: iconEnd,
    size: 17
  }) : null), error ? /*#__PURE__*/React.createElement("div", {
    className: "fg-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("div", {
    className: "fg-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "radio");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Radio({
  label,
  description,
  disabled = false,
  className = "",
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: ["fg-radio", disabled ? "fg-radio--disabled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    className: "fg-radio__input",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "fg-radio__dot"
  }), /*#__PURE__*/React.createElement("span", null, label, description ? /*#__PURE__*/React.createElement("span", {
    className: "fg-radio__desc"
  }, description) : null));
}
function RadioGroup({
  legend,
  direction = "vertical",
  className = "",
  children
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("fieldset", {
    style: {
      border: 0,
      padding: 0,
      margin: 0
    },
    className: className
  }, legend ? /*#__PURE__*/React.createElement("legend", {
    className: "fg-radio-group__legend"
  }, legend) : null, /*#__PURE__*/React.createElement("div", {
    className: ["fg-radio-group", direction === "vertical" ? "fg-radio-group--vertical" : ""].filter(Boolean).join(" ")
  }, children));
}
Object.assign(__ds_scope, { Radio, RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "select");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Select({
  label,
  hint,
  error,
  required = false,
  size = "md",
  options = [],
  placeholder,
  id,
  className = "",
  children,
  ...rest
}) {
  ensureStyles();
  const autoId = React.useId ? React.useId() : "fg-select";
  const selId = id || autoId;
  return /*#__PURE__*/React.createElement("div", {
    className: ["fg-field", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "fg-field__label",
    htmlFor: selId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "fg-field__req"
  }, " *") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "fg-select__wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    className: ["fg-select", "fg-select--" + size].join(" ")
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder) : null, options.map(o => typeof o === "string" ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)), children), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    className: "fg-select__chev",
    name: "chevron-down",
    size: 17
  })), error ? /*#__PURE__*/React.createElement("div", {
    className: "fg-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("div", {
    className: "fg-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "switch");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Switch({
  label,
  labelPosition = "end",
  disabled = false,
  className = "",
  ...rest
}) {
  ensureStyles();
  const control = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    className: "fg-switch__input",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "fg-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "fg-switch__knob"
  })));
  return /*#__PURE__*/React.createElement("label", {
    className: ["fg-switch", disabled ? "fg-switch--disabled" : "", className].filter(Boolean).join(" ")
  }, labelPosition === "start" ? /*#__PURE__*/React.createElement("span", null, label) : null, control, labelPosition === "end" ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.fg-field{display:flex;flex-direction:column;gap:var(--space-xs)}
.fg-field__label{font-family:var(--font-body);font-weight:var(--weight-bold);font-size:var(--size-label);letter-spacing:var(--tracking-label);text-transform:uppercase;color:var(--text-muted)}
.fg-field__hint{font-size:var(--size-body-sm);color:var(--text-muted)}
.fg-field__error{font-size:var(--size-body-sm);color:var(--status-critical);font-weight:var(--weight-medium)}
.fg-field__req{color:var(--rose-600)}
.fg-textarea{width:100%;font-family:var(--font-body);font-size:var(--size-body-md);line-height:var(--leading-relaxed);color:var(--text-strong);background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-sm);padding:var(--space-md);resize:vertical;transition:var(--transition-control);box-shadow:var(--shadow-inset-well)}
.fg-textarea::placeholder{color:var(--rain-400)}
.fg-textarea:hover:not(:disabled){border-color:var(--rain-500)}
.fg-textarea:focus{outline:none;border-color:var(--border-focus);box-shadow:var(--focus-ring)}
.fg-textarea:disabled{background:var(--paper-200);color:var(--rain-400);cursor:not-allowed}
.fg-textarea--invalid{border-color:var(--rose-600)}
.fg-textarea__foot{display:flex;justify-content:space-between;gap:var(--space-md)}
.fg-textarea__count{font-family:var(--font-mono);font-size:var(--size-micro);color:var(--text-muted)}
`;
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "textarea");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Textarea({
  label,
  hint,
  error,
  required = false,
  rows = 4,
  maxLength,
  value,
  id,
  className = "",
  ...rest
}) {
  ensureStyles();
  const autoId = React.useId ? React.useId() : "fg-textarea";
  const taId = id || autoId;
  const len = typeof value === "string" ? value.length : null;
  return /*#__PURE__*/React.createElement("div", {
    className: ["fg-field", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "fg-field__label",
    htmlFor: taId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "fg-field__req"
  }, " *") : null) : null, /*#__PURE__*/React.createElement("textarea", _extends({
    id: taId,
    rows: rows,
    maxLength: maxLength,
    value: value,
    "aria-invalid": error ? "true" : undefined,
    className: ["fg-textarea", error ? "fg-textarea--invalid" : ""].filter(Boolean).join(" ")
  }, rest)), /*#__PURE__*/React.createElement("div", {
    className: "fg-textarea__foot"
  }, error ? /*#__PURE__*/React.createElement("div", {
    className: "fg-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("div", {
    className: "fg-field__hint"
  }, hint) : /*#__PURE__*/React.createElement("span", null), maxLength && len !== null ? /*#__PURE__*/React.createElement("div", {
    className: "fg-textarea__count"
  }, len, "/", maxLength) : null));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Stepper.jsx
try { (() => {
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
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "stepper");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Stepper({
  steps = [],
  current = 0,
  compact = false,
  className = ""
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", {
    className: ["fg-stepper", compact ? "fg-stepper--compact" : "", className].filter(Boolean).join(" ")
  }, steps.map((s, i) => {
    const state = i < current ? "done" : i === current ? "current" : "todo";
    const label = typeof s === "string" ? s : s.label;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "fg-stepper__step fg-stepper__step--" + state,
      "aria-current": state === "current" ? "step" : undefined
    }, /*#__PURE__*/React.createElement("span", {
      className: "fg-stepper__mark"
    }, state === "done" ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 15
    }) : i + 1), /*#__PURE__*/React.createElement("span", {
      className: "fg-stepper__text"
    }, /*#__PURE__*/React.createElement("span", {
      className: "fg-stepper__label"
    }, label))), i < steps.length - 1 ? /*#__PURE__*/React.createElement("span", {
      className: "fg-stepper__line"
    }) : null);
  }));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const CSS = `
.fg-tabs{display:flex;gap:var(--space-2xl);border-bottom:1px solid var(--border-hairline)}
.fg-tabs__tab{position:relative;display:inline-flex;align-items:center;gap:var(--space-sm);border:0;background:transparent;cursor:pointer;font-family:var(--font-display);font-weight:var(--weight-semibold);font-size:var(--size-body-md);letter-spacing:var(--tracking-title);color:var(--text-muted);padding:var(--space-md) 0;transition:color var(--duration-fast) var(--ease-standard)}
.fg-tabs__tab::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:3px;background:transparent;transition:background var(--duration-fast) var(--ease-standard)}
.fg-tabs__tab:hover{color:var(--text-strong)}
.fg-tabs__tab[aria-selected="true"]{color:var(--text-brand)}
.fg-tabs__tab[aria-selected="true"]::after{background:var(--rose-600)}
.fg-tabs__tab:disabled{color:var(--rain-400);cursor:not-allowed}
.fg-tabs__count{font-family:var(--font-mono);font-size:var(--size-micro);background:var(--paper-200);color:var(--ink-700);border-radius:var(--radius-xs);padding:1px 5px}
.fg-tabs--pill{border-bottom:0;gap:var(--space-2xs);background:var(--surface-sunken);padding:var(--space-2xs);border-radius:var(--radius-md);display:inline-flex}
.fg-tabs--pill .fg-tabs__tab{padding:var(--space-sm) var(--space-lg);border-radius:var(--radius-sm)}
.fg-tabs--pill .fg-tabs__tab::after{display:none}
.fg-tabs--pill .fg-tabs__tab[aria-selected="true"]{background:var(--surface-card);color:var(--text-strong);box-shadow:var(--shadow-1)}
`;
let __s = false;
function ensureStyles() {
  if (__s || typeof document === "undefined") return;
  __s = true;
  const el = document.createElement("style");
  el.setAttribute("data-forage", "tabs");
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Tabs({
  items = [],
  value,
  onChange,
  variant = "underline",
  className = ""
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    className: ["fg-tabs", variant === "pill" ? "fg-tabs--pill" : "", className].filter(Boolean).join(" ")
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    role: "tab",
    type: "button",
    disabled: it.disabled,
    "aria-selected": value === it.id,
    className: "fg-tabs__tab",
    onClick: () => onChange && onChange(it.id)
  }, it.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: it.icon,
    size: 16
  }) : null, it.label, it.count != null ? /*#__PURE__*/React.createElement("span", {
    className: "fg-tabs__count"
  }, it.count) : null)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/forage-app/App.jsx
try { (() => {
const {
  Toast,
  ToastStack
} = window.ForageDesignSystem_98e604;
function App() {
  const D = window.FORAGE_DATA;
  const [step, setStep] = React.useState(0);
  const [text, setText] = React.useState("");
  const [target, setTarget] = React.useState(null);
  const [saved, setSaved] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const save = job => {
    const on = saved.indexOf(job.id) > -1;
    setSaved(on ? saved.filter(i => i !== job.id) : saved.concat(job.id));
    setToast(on ? null : {
      title: "Saved " + job.role,
      body: job.org
    });
  };
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(AppHeader, {
    step: step,
    onHome: () => setStep(0)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 0 auto"
    }
  }, step === 0 ? /*#__PURE__*/React.createElement(DescribeScreen, {
    text: text,
    setText: setText,
    onSubmit: () => setStep(1)
  }) : null, step === 1 ? /*#__PURE__*/React.createElement(MatchScreen, {
    text: text,
    target: target,
    onPick: setTarget,
    onBack: () => setStep(0),
    onNext: () => setStep(3)
  }) : null, step === 3 ? /*#__PURE__*/React.createElement(GapScreen, {
    target: target,
    onBack: () => setStep(1),
    onNext: () => setStep(4)
  }) : null, step === 4 ? /*#__PURE__*/React.createElement(RolesScreen, {
    target: target,
    savedIds: saved,
    onSave: save,
    onBack: () => setStep(3)
  }) : null), /*#__PURE__*/React.createElement(AppFooter, null), toast ? /*#__PURE__*/React.createElement(ToastStack, null, /*#__PURE__*/React.createElement(Toast, {
    tone: "positive",
    title: toast.title,
    onClose: () => setToast(null)
  }, toast.body)) : null);
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/forage-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/forage-app/AppShell.jsx
try { (() => {
const {
  Badge,
  Icon,
  Button,
  Stepper
} = window.ForageDesignSystem_98e604;
function Wordmark({
  size = 22,
  onClick
}) {
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: size,
      letterSpacing: "-.03em",
      color: "var(--fir-700)",
      cursor: onClick ? "pointer" : "default",
      lineHeight: 1
    }
  }, "Forage", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--rose-600)"
    }
  }, "."));
}
function AppHeader({
  step,
  onHome
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: "var(--paper-000)",
      borderBottom: "1px solid var(--border-hairline)",
      position: "sticky",
      top: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "0 24px",
      height: 64,
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    onClick: onHome
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 22,
      background: "var(--border-hairline)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-muted)"
    }
  }, "Skills Bridge PDX"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    icon: "map-pin"
  }, "Portland metro"), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    iconStart: "scroll-text"
  }, "About the data")), step >= 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-hairline)",
      background: "var(--paper-050)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "12px 24px"
    }
  }, /*#__PURE__*/React.createElement(Stepper, {
    current: step,
    steps: ["Describe", "Match", "Target", "Gap", "Roles"]
  }))) : null);
}
function AppFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--border-hairline)",
      background: "var(--paper-000)",
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1080,
      margin: "0 auto",
      padding: "28px 24px",
      display: "flex",
      gap: 24,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 17
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, "Built for Portlanders between jobs. Free, no account, nothing saved."), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 13
    }
  }, "WorkSource Oregon"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 13
    }
  }, "O*NET"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontSize: 13
    }
  }, "QualityInfo")));
}
function Page({
  children,
  width = 1080
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: width,
      margin: "0 auto",
      padding: "40px 24px 0"
    }
  }, children);
}
function SectionHead({
  eyebrow,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      marginBottom: 24
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 12,
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: "var(--rose-600)"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "var(--weight-bold) 36px/1.06 var(--font-display)",
      letterSpacing: "-.024em"
    }
  }, title), children ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: "var(--text-muted)",
      maxWidth: "60ch",
      lineHeight: 1.55
    }
  }, children) : null);
}
Object.assign(window, {
  Wordmark,
  AppHeader,
  AppFooter,
  Page,
  SectionHead
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/forage-app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/forage-app/DescribeScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Textarea,
  Tag,
  Callout,
  Icon,
  SkillMeter
} = window.ForageDesignSystem_98e604;
function DescribeScreen({
  text,
  setText,
  onSubmit
}) {
  const D = window.FORAGE_DATA;
  return /*#__PURE__*/React.createElement(Page, {
    width: 880
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      alignItems: "center",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 12,
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: "var(--rose-600)"
    }
  }, "Portland, Oregon"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "var(--weight-bold) 56px/1.02 var(--font-display)",
      letterSpacing: "-.028em",
      maxWidth: "17ch"
    }
  }, "Your job already transfers. Here is where."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      color: "var(--text-muted)",
      maxWidth: "52ch",
      lineHeight: 1.5
    }
  }, "Type what you did in plain English. We will name the occupations it maps to, the one gap to close, and the roles open in Portland right now.")), /*#__PURE__*/React.createElement(Card, {
    variant: "print",
    padding: "lg"
  }, /*#__PURE__*/React.createElement(Textarea, {
    label: "What did you do?",
    rows: 4,
    maxLength: 600,
    value: text,
    onChange: e => setText(e.target.value),
    placeholder: "I managed ad campaigns and client relationships for 4 years"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginTop: 18,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconEnd: "arrow-right",
    onClick: onSubmit,
    disabled: text.trim().length < 8
  }, "Find what transfers"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, "No account. Nothing is saved."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
      margin: "20px 0 28px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Try one"), D.examples.map(e => /*#__PURE__*/React.createElement(Tag, {
    key: e,
    onClick: () => setText(e)
  }, e))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 16,
      marginBottom: 28
    }
  }, [["search", "Match", "Your words become an O*NET occupation code."], ["git-compare-arrows", "Compare", "Adjacent occupations, with the overlap explained."], ["map-pinned", "Apply", "Open Portland-area roles that fit the target."]].map(([icon, t, b]) => /*#__PURE__*/React.createElement(Card, {
    key: t,
    padding: "md"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 22,
    color: "var(--fir-600)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-subtitle)",
      marginTop: 10
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-muted)",
      marginTop: 4,
      lineHeight: 1.5
    }
  }, b)))), /*#__PURE__*/React.createElement(Callout, {
    tone: "disclosure"
  }, "Occupation matching and skill gaps are live O*NET / CareerOneStop calls. The Portland job listings are a dataset assembled by hand from local employers' public job boards \u2014 not a live feed."));
}
Object.assign(window, {
  DescribeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/forage-app/DescribeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/forage-app/GapScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Badge,
  Tag,
  SkillMeter,
  Callout,
  Icon,
  Tabs
} = window.ForageDesignSystem_98e604;
function GapScreen({
  target,
  onBack,
  onNext
}) {
  const D = window.FORAGE_DATA;
  const [tab, setTab] = React.useState("gap");
  const total = D.gap.have.length + D.gap.missing.length;
  const shown = tab === "have" ? D.gap.have : tab === "gap" ? D.gap.missing : D.gap.have.concat(D.gap.missing);
  return /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Step 4 \u2014 the gap",
    title: "Ad ops \u2192 " + target.title
  }, "CareerOneStop compares the two occupations. Four of seven core skills are already yours."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gap: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    value: tab,
    onChange: setTab,
    items: [{
      id: "gap",
      label: "The gap"
    }, {
      id: "have",
      label: "What transfers"
    }, {
      id: "all",
      label: "All skills"
    }]
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-muted)"
    }
  }, shown.length, " of ", total)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10
    }
  }, shown.map(s => {
    const have = D.gap.have.indexOf(s) > -1;
    return /*#__PURE__*/React.createElement(Tag, {
      key: s,
      tone: have ? "have" : "missing",
      icon: have ? "check" : "plus"
    }, s);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      marginTop: 26,
      paddingTop: 20,
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement(SkillMeter, {
    label: "Skills you already have",
    value: D.gap.have.length,
    max: total,
    valueLabel: D.gap.have.length + " of " + total,
    tone: "positive",
    size: "lg"
  }), /*#__PURE__*/React.createElement(SkillMeter, {
    label: "Gap to close",
    value: D.gap.missing.length,
    max: total,
    valueLabel: D.gap.missing.length + " of " + total,
    tone: "caution"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "inverse",
    padding: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 12,
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: "var(--fir-300)"
    }
  }, "Start here"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--weight-bold) 22px/1.2 var(--font-display)",
      color: "var(--paper-000)",
      letterSpacing: "-.014em",
      margin: "8px 0 8px"
    }
  }, "SQL and data querying"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: "var(--fir-200)"
    }
  }, "It shows up in every posting for this role and it is the shortest course on the list \u2014 PCC runs an 8-week evening section."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconEnd: "arrow-up-right",
    as: "a",
    href: "#"
  }, "PCC Career Pathways"))), D.resources.slice(0, 2).map(r => /*#__PURE__*/React.createElement(Card, {
    key: r.name,
    padding: "sm"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "life-buoy",
    size: 18,
    color: "var(--hood-700)",
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: "var(--text-strong)"
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      lineHeight: 1.45,
      marginTop: 2
    }
  }, r.what))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconStart: "arrow-left",
    onClick: onBack
  }, "Pick a different target"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconEnd: "arrow-right",
    onClick: onNext
  }, "See open Portland roles")));
}
Object.assign(window, {
  GapScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/forage-app/GapScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/forage-app/MatchScreen.jsx
try { (() => {
const {
  Card,
  Button,
  Badge,
  Tag,
  SkillMeter,
  Tooltip,
  Icon,
  Callout
} = window.ForageDesignSystem_98e604;
function MatchScreen({
  text,
  target,
  onPick,
  onBack,
  onNext
}) {
  const D = window.FORAGE_DATA;
  return /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Step 2 \u2014 your match",
    title: "You described an ad-ops account manager."
  }, "We matched your description to one O*NET occupation, then pulled the occupations closest to it."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "380px 1fr",
      gap: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "print",
    padding: "md"
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "Closest match"), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--weight-bold) 22px/1.2 var(--font-display)",
      letterSpacing: "-.014em",
      margin: "10px 0 6px"
    }
  }, D.match.title), /*#__PURE__*/React.createElement(Tooltip, {
    content: "O*NET Standard Occupational Classification code"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono)",
      color: "var(--text-muted)",
      borderBottom: "1px dashed var(--rain-500)"
    }
  }, D.match.code)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-body)",
      lineHeight: 1.55,
      margin: "12px 0 18px"
    }
  }, D.match.summary), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: 10
    }
  }, "Top skills O*NET lists"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, D.match.skills.map(s => /*#__PURE__*/React.createElement(SkillMeter, {
    key: s.name,
    size: "sm",
    label: s.name,
    value: s.importance,
    tone: "brand"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      paddingTop: 14,
      borderTop: "1px solid var(--border-hairline)",
      fontSize: 13,
      color: "var(--text-muted)"
    }
  }, "From your words: \u201C", text.length > 84 ? text.slice(0, 84) + "…" : text, "\u201D")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-subtitle)"
    }
  }, "Where it transfers"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-muted)"
    }
  }, "Pick one to see the gap.")), D.related.map(r => {
    const on = target && target.code === r.code;
    return /*#__PURE__*/React.createElement(Card, {
      key: r.code,
      interactive: true,
      padding: "md",
      onClick: () => onPick(r),
      style: on ? {
        borderColor: "var(--fir-600)",
        background: "var(--fir-050)",
        boxShadow: "var(--shadow-2)"
      } : undefined
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 20,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "1 1 auto",
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--type-subtitle)",
        color: "var(--text-strong)"
      }
    }, r.title), on ? /*#__PURE__*/React.createElement(Badge, {
      tone: "positive",
      icon: "check"
    }, "Target") : null), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--type-mono)",
        color: "var(--text-muted)",
        margin: "3px 0 8px"
      }
    }, r.code), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "var(--text-body)",
        lineHeight: 1.5
      }
    }, r.why)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: "0 0 168px"
      }
    }, /*#__PURE__*/React.createElement(SkillMeter, {
      size: "sm",
      label: "Overlap",
      value: r.overlap,
      tone: r.overlap >= 60 ? "positive" : "caution"
    }))));
  }), /*#__PURE__*/React.createElement(Callout, {
    tone: "neutral",
    icon: "info"
  }, "Overlap is computed from shared O*NET skills and work activities. It is a starting point for a conversation, not a score of you."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconStart: "arrow-left",
    onClick: onBack
  }, "Change my description"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconEnd: "arrow-right",
    disabled: !target,
    onClick: onNext
  }, target ? "See the gap to " + target.title : "Pick a target occupation")));
}
Object.assign(window, {
  MatchScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/forage-app/MatchScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/forage-app/RolesScreen.jsx
try { (() => {
const {
  Card,
  Button,
  IconButton,
  Badge,
  Tag,
  SkillMeter,
  Callout,
  Icon,
  Tabs,
  Select,
  Switch,
  Input,
  EmptyState,
  Dialog
} = window.ForageDesignSystem_98e604;
function JobRow({
  job,
  onOpen,
  onSave,
  saved
}) {
  return /*#__PURE__*/React.createElement(Card, {
    padding: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-subtitle)",
      color: "var(--text-strong)"
    }
  }, job.role), /*#__PURE__*/React.createElement(Badge, {
    tone: job.mode === "Remote" ? "info" : job.mode === "Hybrid" ? "brand" : "neutral"
  }, job.mode), job.type !== "Full-time" ? /*#__PURE__*/React.createElement(Badge, {
    tone: "caution"
  }, job.type) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-body)",
      marginTop: 4
    }
  }, job.org, " \xB7 ", job.place), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      marginTop: 10,
      font: "var(--type-mono)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, job.pay), /*#__PURE__*/React.createElement("span", null, job.posted), /*#__PURE__*/React.createElement("span", null, "via ", job.board))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 150px",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(SkillMeter, {
    size: "sm",
    label: "Fit",
    value: job.match,
    tone: job.match >= 70 ? "positive" : "caution"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "secondary",
    onClick: () => onOpen(job)
  }, "View"), /*#__PURE__*/React.createElement(IconButton, {
    size: "sm",
    variant: "ghost",
    icon: saved ? "bookmark-check" : "bookmark",
    label: "Save this role",
    onClick: () => onSave(job)
  })))));
}
function RolesScreen({
  target,
  onBack,
  onSave,
  savedIds
}) {
  const D = window.FORAGE_DATA;
  const [tab, setTab] = React.useState("roles");
  const [q, setQ] = React.useState("");
  const [remote, setRemote] = React.useState(false);
  const [sort, setSort] = React.useState("Best fit");
  const [open, setOpen] = React.useState(null);
  let jobs = D.jobs.filter(j => (!remote || j.mode !== "On-site") && (q === "" || (j.role + j.org).toLowerCase().indexOf(q.toLowerCase()) > -1));
  if (sort === "Newest posting") jobs = jobs.slice().reverse();
  return /*#__PURE__*/React.createElement(Page, null, /*#__PURE__*/React.createElement(SectionHead, {
    eyebrow: "Step 5 \u2014 open roles",
    title: "Portland roles for " + target.title
  }, "Six roles in our dataset line up with this target. Fit is the overlap between the posting and the skills you already have."), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      id: "roles",
      label: "Open roles",
      count: D.jobs.length
    }, {
      id: "sectors",
      label: "Growth sectors",
      icon: "sprout"
    }]
  }), tab === "roles" ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      alignItems: "flex-end",
      marginBottom: 18,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    className: "grow",
    style: {
      minWidth: 280
    },
    label: "Search",
    iconStart: "search",
    placeholder: "Role or employer",
    value: q,
    onChange: e => setQ(e.target.value)
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Sort by",
    value: sort,
    onChange: e => setSort(e.target.value),
    options: ["Best fit", "Newest posting"]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Not on-site only",
    checked: remote,
    onChange: e => setRemote(e.target.checked)
  }))), jobs.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, jobs.map(j => /*#__PURE__*/React.createElement(JobRow, {
    key: j.id,
    job: j,
    onOpen: setOpen,
    onSave: onSave,
    saved: savedIds.indexOf(j.id) > -1
  }))) : /*#__PURE__*/React.createElement(EmptyState, {
    icon: "map-pinned",
    title: "No open Portland roles match those filters",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => {
        setQ("");
        setRemote(false);
      }
    }, "Clear filters")
  }, "Our dataset has ", D.jobs.length, " roles from local employers, pulled this morning. None of them match right now \u2014 that is the dataset being honest, not a bug."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Callout, {
    tone: "disclosure"
  }, "These listings are a hand-assembled dataset from local employers' public job boards, captured 8 Aug 2026. Always confirm on the employer's own site before applying."))) : /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, D.sectors.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.name,
    padding: "md"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-subtitle)",
      color: "var(--text-strong)"
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-muted)",
      marginTop: 3
    }
  }, s.note)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 90px",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-mono)",
      fontSize: 20,
      color: s.growth >= 7 ? "var(--moss-700)" : "var(--text-body)"
    }
  }, "+", s.growth, "%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, "10-yr growth")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 90px",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-mono)",
      fontSize: 20,
      color: "var(--text-strong)"
    }
  }, s.openings), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, "annual openings"))))), /*#__PURE__*/React.createElement(Callout, {
    tone: "disclosure"
  }, "Portland metro sector figures transcribed by hand from QualityInfo.org (Oregon Employment Department).")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconStart: "arrow-left",
    onClick: onBack
  }, "Back to the gap")), /*#__PURE__*/React.createElement(Dialog, {
    open: !!open,
    title: open ? open.role : "",
    description: open ? open.org + " · " + open.place : "",
    onClose: () => setOpen(null),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setOpen(null)
    }, "Close"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconEnd: "arrow-up-right",
      as: "a",
      href: "#"
    }, "Apply on ", open ? open.board : ""))
  }, open ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, open.mode), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, open.type), /*#__PURE__*/React.createElement(Badge, {
    tone: "info"
  }, open.pay), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, open.posted)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.6
    }
  }, open.desc), /*#__PURE__*/React.createElement(SkillMeter, {
    label: "Fit with your transferable skills",
    value: open.match,
    tone: open.match >= 70 ? "positive" : "caution"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: 8
    }
  }, "Against this posting"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8
    }
  }, D.gap.have.map(s => /*#__PURE__*/React.createElement(Tag, {
    key: s,
    tone: "have",
    icon: "check"
  }, s)), D.gap.missing.slice(0, 2).map(s => /*#__PURE__*/React.createElement(Tag, {
    key: s,
    tone: "missing",
    icon: "plus"
  }, s))))) : null));
}
Object.assign(window, {
  RolesScreen,
  JobRow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/forage-app/RolesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/forage-app/data.js
try { (() => {
// Sample dataset for the Forage UI kit. Structure mirrors the PRD's
// portland-jobs.json / growth-sectors.json. Values here are illustrative.
window.FORAGE_DATA = {
  examples: ["I managed ad campaigns and client relationships for 4 years", "Line cook, 6 years, ran prep and ordering", "Warehouse lead — scheduling, safety, inventory", "Bank teller, then small-business loan support"],
  match: {
    title: "Advertising and Promotions Managers",
    code: "11-2011.00",
    summary: "Plan, direct, or coordinate advertising policies and programs, or produce collateral materials to create extra interest in a product or service.",
    skills: [{
      name: "Client relationship management",
      importance: 88
    }, {
      name: "Campaign planning",
      importance: 84
    }, {
      name: "Budget management",
      importance: 76
    }, {
      name: "Vendor negotiation",
      importance: 71
    }, {
      name: "Performance reporting",
      importance: 66
    }]
  },
  related: [{
    title: "Marketing Managers",
    code: "11-2021.00",
    overlap: 68,
    why: "Same planning, budget and vendor work — swaps ad buying for product positioning."
  }, {
    title: "Public Relations Managers",
    code: "11-2032.00",
    overlap: 61,
    why: "Keeps the client and press relationships; adds message and crisis handling."
  }, {
    title: "Customer Success Managers",
    code: "13-1161.01",
    overlap: 57,
    why: "Account management transfers almost whole; adds product and renewal metrics."
  }, {
    title: "Market Research Analysts",
    code: "13-1161.00",
    overlap: 49,
    why: "Reporting transfers; needs survey design and more statistics."
  }],
  gap: {
    have: ["Client relationship management", "Campaign planning", "Budget management", "Performance reporting"],
    missing: ["SQL and data querying", "Product positioning", "Pricing strategy"]
  },
  jobs: [{
    id: 1,
    role: "Marketing Manager, Retail",
    org: "Columbia Sportswear",
    place: "Portland, OR",
    mode: "Hybrid",
    type: "Full-time",
    posted: "3 days ago",
    pay: "$92k–$118k",
    match: 82,
    board: "Greenhouse",
    desc: "Own seasonal campaign planning across retail channels, manage agency partners and a $2M media budget."
  }, {
    id: 2,
    role: "Senior Marketing Manager",
    org: "New Relic",
    place: "Portland, OR",
    mode: "Remote",
    type: "Full-time",
    posted: "6 days ago",
    pay: "$120k–$145k",
    match: 74,
    board: "Greenhouse",
    desc: "Lead demand-generation programs; partner with product marketing on positioning and pricing tests."
  }, {
    id: 3,
    role: "Marketing Program Manager",
    org: "OHSU",
    place: "Portland, OR",
    mode: "On-site",
    type: "Full-time",
    posted: "1 week ago",
    pay: "$78k–$96k",
    match: 69,
    board: "Workday",
    desc: "Coordinate outreach programs for clinical service lines. Heavy stakeholder and vendor coordination."
  }, {
    id: 4,
    role: "Customer Success Manager",
    org: "Puppet",
    place: "Portland, OR",
    mode: "Hybrid",
    type: "Full-time",
    posted: "2 days ago",
    pay: "$85k–$105k",
    match: 64,
    board: "Greenhouse",
    desc: "Own a book of mid-market accounts through onboarding, adoption and renewal."
  }, {
    id: 5,
    role: "Communications Manager",
    org: "Portland Parks & Recreation",
    place: "Portland, OR",
    mode: "On-site",
    type: "Full-time",
    posted: "2 weeks ago",
    pay: "$74k–$88k",
    match: 58,
    board: "NEOGOV",
    desc: "Public-facing communications for park programs, events and capital projects."
  }, {
    id: 6,
    role: "Marketing Coordinator",
    org: "Dutch Bros",
    place: "Beaverton, OR",
    mode: "Hybrid",
    type: "Contract",
    posted: "5 days ago",
    pay: "$32/hr",
    match: 51,
    board: "Greenhouse",
    desc: "Support regional campaign execution, asset trafficking and reporting."
  }],
  sectors: [{
    name: "Health care & social assistance",
    growth: 14,
    openings: "4,100",
    note: "Largest absolute growth in the Portland metro."
  }, {
    name: "Professional & technical services",
    growth: 9,
    openings: "2,350",
    note: "Marketing, analytics and consulting roles."
  }, {
    name: "Construction",
    growth: 7,
    openings: "1,480",
    note: "Driven by infrastructure and housing starts."
  }, {
    name: "Transportation & warehousing",
    growth: 5,
    openings: "1,120",
    note: "Steady demand for coordination and lead roles."
  }, {
    name: "Manufacturing",
    growth: 2,
    openings: "860",
    note: "Flat overall; semiconductor supply chain is the exception."
  }],
  resources: [{
    name: "WorkSource Oregon",
    what: "Free career counseling, iMatchSkills, and training funds",
    url: "https://www.worksourceoregon.org"
  }, {
    name: "PCC Career Pathways",
    what: "Short-term certificates, most under 12 months",
    url: "https://www.pcc.edu"
  }, {
    name: "QualityInfo (Oregon Employment Dept.)",
    what: "Portland metro occupation and wage data",
    url: "https://www.qualityinfo.org"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/forage-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.SkillMeter = __ds_scope.SkillMeter;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.ToastStack = __ds_scope.ToastStack;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
