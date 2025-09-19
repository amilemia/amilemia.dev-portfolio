import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, forwardRef } from "react";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  as?: React.ElementType;
  className?: string;
}

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
