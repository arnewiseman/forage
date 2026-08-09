import * as React from "react";
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon name in kebab-case, e.g. "compass", "sprout", "map-pin". */
  name: string;
  /** Rendered square size in px. Default 20. */
  size?: number;
  /** Any CSS colour. Defaults to currentColor so icons inherit text colour. */
  color?: string;
  /** Accessible label. Omit for decorative icons (they are aria-hidden). */
  title?: string;
}
export declare function Icon(props: IconProps): JSX.Element;
