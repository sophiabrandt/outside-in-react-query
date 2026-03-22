import * as React from "react";
import { cn } from "@/shared/lib/utils";

/**
 * A small utility component for inserting space between elements.
 *
 * Props:
 * - `axis` ("horizontal" | "vertical") — which axis the spacer should apply to.
 *   - `vertical` (default) renders a block spacer that affects height.
 *   - `horizontal` renders an inline spacer that affects width.
 * - `size` — one of the predefined size tokens: none, xs, sm, md, lg, xl, 2xl.
 *
 * Accessibility:
 * - Renders a presentational element (`aria-hidden`) so it does not interfere with
 *   assistive technologies.
 *
 * Examples:
 * - Horizontal:
 *   <div className="flex items-center">
 *     <Button>Left</Button>
 *     <Spacer size="md" />       // horizontal gap (width)
 *     <Button>Right</Button>
 *   </div>
 *
 * - Vertical:
 *   <div>
 *     <Card />
 *     <Spacer axis="vertical" size="lg" /> // vertical gap (height)
 *     <Card />
 *   </div>
 */

export type SpacerSize = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type SpacerAxis = "horizontal" | "vertical";

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpacerSize;
  axis?: SpacerAxis;
}

const HORIZONTAL_SIZES: Record<SpacerSize, string> = {
  none: "w-0",
  xs: "w-1", // 0.25rem
  sm: "w-2", // 0.5rem
  md: "w-4", // 1rem
  lg: "w-6", // 1.5rem
  xl: "w-8", // 2rem
  "2xl": "w-10", // 2.5rem
};

const VERTICAL_SIZES: Record<SpacerSize, string> = {
  none: "h-0",
  xs: "h-1",
  sm: "h-2",
  md: "h-4",
  lg: "h-6",
  xl: "h-8",
  "2xl": "h-10",
};

/**
 * Spacer component
 *
 * Default: vertical axis with `md` size.
 */
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ axis = "vertical", size = "md", className, ...props }, ref) => {
    // Choose base display for axis:
    // - horizontal: inline-block so it sits inline with text/flex children
    // - vertical: block so it creates vertical spacing between block siblings
    const axisBase = axis === "horizontal" ? "inline-block" : "block";

    const axisSizeClass =
      axis === "horizontal"
        ? HORIZONTAL_SIZES[size]
        : VERTICAL_SIZES[size];

    return (
      <div
        ref={ref}
        role="presentation"
        aria-hidden
        className={cn("flex-shrink-0", axisBase, axisSizeClass, className)}
        {...props}
      />
    );
  }
);

Spacer.displayName = "Spacer";

export default Spacer;