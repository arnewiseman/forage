import * as React from "react";
/**
 * The Forage action button.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = the one committing action per view. secondary carries the screen-print hover offset. */
  variant?: "primary" | "secondary" | "ghost" | "danger" | "link";
  size?: "sm" | "md" | "lg";
  /** Lucide icon name rendered before the label. */
  iconStart?: string;
  /** Lucide icon name rendered after the label. */
  iconEnd?: string;
  /** Stretch to the container width. */
  block?: boolean;
  /** Render as another element, e.g. "a". */
  as?: "button" | "a";
}
export declare function Button(props: ButtonProps): JSX.Element;
