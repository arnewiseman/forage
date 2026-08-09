import * as React from "react";
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  /** When set alongside a controlled `value`, a monospaced counter appears bottom-right. */
  maxLength?: number;
}
export declare function Textarea(props: TextareaProps): JSX.Element;
