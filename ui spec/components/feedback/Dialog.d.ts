import * as React from "react";
/**
 * Modal overlay with scrim, Escape-to-close and an optional footer action row.
 */
export interface DialogProps {
  open?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  /** Omit to make the dialog non-dismissible (no close button, no scrim click). */
  onClose?: () => void;
  /** Action row, usually two Buttons. */
  footer?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
