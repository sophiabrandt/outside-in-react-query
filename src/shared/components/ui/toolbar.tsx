import * as React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/shared/lib/utils";

const toolbarVariants = cva("flex w-full items-center justify-between bg-muted/60", {
  variants: {
    size: {
      sm: "px-1 py-0.5",
      md: "px-2 py-1",
      lg: "px-3 py-1.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const toolbarButtonVariants = cva(
  "inline-flex items-center justify-center rounded-sm px-2 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-muted/60 text-foreground",
        subtle: "bg-muted/30 hover:bg-muted/50 text-foreground",
      },
      size: {
        sm: "text-xs px-1.5 py-0.5",
        md: "text-sm px-2 py-1",
        lg: "text-base px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

/**
 * A small, shadcn-style toolbar primitive.
 *
 * Exports:
 * - `Toolbar` (root)
 * - `ToolbarButton` (interactive button)
 * - `ToolbarSeparator` (visual separator)
 *
 * Usage:
 * <Toolbar>
 *   <ToolbarButton>Opinion Ate</ToolbarButton>
 * </Toolbar>
 */

export const Toolbar = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root> &
    VariantProps<typeof toolbarVariants>
>(({ className, size, ...props }, ref) => {
  return (
    <ToolbarPrimitive.Root
      ref={ref}
      className={cn(toolbarVariants({ size }), className)}
      {...props}
    />
  );
});
Toolbar.displayName = "Toolbar";

export const ToolbarButton = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button> &
    VariantProps<typeof toolbarButtonVariants> & { asChild?: boolean }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp: any = asChild ? Slot.Root : ToolbarPrimitive.Button;
  // When using `asChild`, pass component via Slot.Root. Otherwise use Radix Button directly.
  if (asChild) {
    return (
      <ToolbarPrimitive.Button asChild>
        <Comp
          ref={ref}
          className={cn(toolbarButtonVariants({ variant, size }), className)}
          {...props}
        />
      </ToolbarPrimitive.Button>
    );
  }

  return (
    <ToolbarPrimitive.Button
      ref={ref}
      className={cn(toolbarButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
});
ToolbarButton.displayName = "ToolbarButton";

export const ToolbarSeparator = React.forwardRef<
  React.ElementRef<typeof ToolbarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, ...props }, ref) => {
  return (
    <ToolbarPrimitive.Separator
      ref={ref}
      className={cn("mx-1 h-4 w-px bg-border", className)}
      {...props}
    />
  );
});
ToolbarSeparator.displayName = "ToolbarSeparator";

export default Toolbar;
