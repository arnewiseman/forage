import * as React from "react";
export interface SelectOption { value: string; label: string }
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  /** Strings or {value,label} pairs. */
  options?: Array<string | SelectOption>;
  /** Renders a leading empty option. */
  placeholder?: string;
}
export declare function Select(props: SelectProps): JSX.Element;
