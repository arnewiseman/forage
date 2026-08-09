import * as React from "react";
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** `print` adds the 2px ink border + 3px hard offset shadow — Forage's signature surface. */
  variant?: "default" | "raised" | "print" | "sunken" | "accent" | "inverse";
  padding?: "none" | "sm" | "md" | "lg";
  /** Renders as a button with hover/active affordances. */
  interactive?: boolean;
  as?: keyof JSX.IntrinsicElements;
}
export declare function Card(props: CardProps): JSX.Element;
