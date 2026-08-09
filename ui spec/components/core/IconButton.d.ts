import * as React from "react";
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name. */
  icon: string;
  /** Required accessible label — also used as the tooltip title. */
  label: string;
  variant?: "ghost" | "outline" | "solid";
  size?: "sm" | "md" | "lg";
  round?: boolean;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
