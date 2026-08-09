import * as React from "react";
export interface TagProps {
  /** `have` = moss green (skill already held), `missing` = rose (the gap). */
  tone?: "default" | "have" | "missing";
  selected?: boolean;
  icon?: string;
  onClick?: (e: React.MouseEvent) => void;
  onRemove?: (e: React.MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): JSX.Element;
