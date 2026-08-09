import * as React from "react";
/**
 * Single-line text field with the Forage label / hint / error stack.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Uppercase micro-label above the control. */
  label?: React.ReactNode;
  /** Helper text below. Hidden when `error` is set. */
  hint?: React.ReactNode;
  /** Error message; also turns the border rose. */
  error?: React.ReactNode;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  iconStart?: string;
  iconEnd?: string;
}
export declare function Input(props: InputProps): JSX.Element;
