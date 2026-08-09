import * as React from "react";
export interface TooltipProps {
  /** Short clarifying text. Never put an action in here. */
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
  children?: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
