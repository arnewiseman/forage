import * as React from "react";
export interface StepperStep { label: React.ReactNode }
export interface StepperProps {
  /** Plain strings or { label } objects. */
  steps: Array<string | StepperStep>;
  /** Zero-based index of the active step. Earlier steps render as done. */
  current?: number;
  /** Hide labels, show numbers only — for narrow columns. */
  compact?: boolean;
  className?: string;
}
export declare function Stepper(props: StepperProps): JSX.Element;
