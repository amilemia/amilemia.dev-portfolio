import { cn } from "@/lib/utils";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";

const spacingVariants = {
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16",
  lg: "py-16 sm:py-24",
  xl: "py-20 sm:py-32",
} satisfies Record<string, string>;

type SectionSize = keyof typeof spacingVariants;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  as?: ElementType;
  size?: SectionSize;
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Component = "section",
      className,
      size = "md",
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(spacingVariants[size] ?? spacingVariants.md, className)}
        {...props}
      />
    );
  }
);

Section.displayName = "Section";
