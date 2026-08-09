import * as React from "react";
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic colour. */
  tone?: "neutral" | "brand" | "positive" | "caution" | "critical" | "info" | "solid";
  /** Optional leading Lucide icon. */
  icon?: string;
}
export declare function Badge(props: BadgeProps): JSX.Element;
