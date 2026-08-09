import * as React from "react";
export interface ToastProps {
  tone?: "neutral" | "positive" | "caution" | "critical";
  title?: React.ReactNode;
  /** Text of the single inline action link. */
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}
export interface ToastStackProps { children?: React.ReactNode }
export declare function Toast(props: ToastProps): JSX.Element;
export declare function ToastStack(props: ToastStackProps): JSX.Element;
