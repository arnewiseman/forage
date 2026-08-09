import * as React from "react";
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `disclosure` is the monospaced dashed-border variant used for data-provenance notices. */
  tone?: "neutral" | "info" | "positive" | "caution" | "critical" | "disclosure";
  title?: React.ReactNode;
  /** Override the tone's default Lucide icon. */
  icon?: string;
}
export declare function Callout(props: CalloutProps): JSX.Element;
