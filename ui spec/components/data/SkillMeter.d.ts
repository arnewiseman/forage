import * as React from "react";
/**
 * Horizontal bar for skill overlap, importance or gap size.
 */
export interface SkillMeterProps {
  label?: React.ReactNode;
  value?: number;
  /** Denominator. Default 100. */
  max?: number;
  tone?: "brand" | "positive" | "caution" | "critical";
  size?: "sm" | "md" | "lg";
  /** Override the right-hand readout, e.g. "4 of 7". */
  valueLabel?: React.ReactNode;
  /** Small line under the bar. */
  note?: React.ReactNode;
  className?: string;
}
export declare function SkillMeter(props: SkillMeterProps): JSX.Element;
