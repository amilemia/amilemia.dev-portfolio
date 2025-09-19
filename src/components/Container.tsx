import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, forwardRef } from "react";

interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  as?: React.ElementType;
  className?: string;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ as: Component = "div", className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
