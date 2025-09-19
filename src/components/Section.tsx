import { cn } from "@/lib/utils";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  as?: ElementType;
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ as: Component = "section", className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn("py-12 sm:py-16", className)}
        {...props}
      />
    );
  }
);

Section.displayName = "Section";
