import * as React from "react";
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  /** Which side the label sits on. Default "end". */
  labelPosition?: "start" | "end";
}
export declare function Switch(props: SwitchProps): JSX.Element;
