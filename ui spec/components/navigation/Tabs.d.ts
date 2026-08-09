import * as React from "react";
export interface TabItem { id: string; label: React.ReactNode; icon?: string; count?: number; disabled?: boolean }
/**
 * Horizontal view switcher.
 */
export interface TabsProps {
  items: TabItem[];
  /** Id of the active tab. */
  value: string;
  onChange?: (id: string) => void;
  /** `underline` uses a rose 3px rule; `pill` is a sunken segmented control. */
  variant?: "underline" | "pill";
  className?: string;
}
export declare function Tabs(props: TabsProps): JSX.Element;
