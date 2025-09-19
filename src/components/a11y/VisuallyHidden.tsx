import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";

type VisuallyHiddenProps = ComponentPropsWithoutRef<"span"> & {
  as?: ElementType;
};

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ as: Component = "span", className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "sr-only",
          className
        )}
        {...props}
      />
    );
  }
);

VisuallyHidden.displayName = "VisuallyHidden";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
