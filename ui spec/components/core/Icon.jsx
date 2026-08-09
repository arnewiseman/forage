import React from "react";

const BASE = "https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/";

export function Icon({ name, size = 20, color = "currentColor", title, className = "", style = {}, ...rest }) {
  const url = 'url("' + BASE + name + '.svg")';
  return (
    <span
      {...rest}
      role={title ? "img" : "presentation"}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : "true"}
      className={("fg-icon " + className).trim()}
      style={{
        display: "inline-block", width: size, height: size, flex: "0 0 auto",
        backgroundColor: color,
        WebkitMaskImage: url, maskImage: url,
        WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
        WebkitMaskSize: "contain", maskSize: "contain",
        WebkitMaskPosition: "center", maskPosition: "center",
        ...style
      }}
    />
  );
}
