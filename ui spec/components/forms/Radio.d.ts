import * as React from "react";
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}
export interface RadioGroupProps {
  legend?: React.ReactNode;
  direction?: "vertical" | "horizontal";
  className?: string;
  children?: React.ReactNode;
}
export declare function Radio(props: RadioProps): JSX.Element;
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
