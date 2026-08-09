import * as React from "react";
export interface EmptyStateProps {
  /** Lucide icon name shown in the circular mark. */
  icon?: string;
  title?: React.ReactNode;
  /** Explanatory sentence — say plainly what is missing and why. */
  children?: React.ReactNode;
  /** One or two Buttons. */
  actions?: React.ReactNode;
  className?: string;
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
