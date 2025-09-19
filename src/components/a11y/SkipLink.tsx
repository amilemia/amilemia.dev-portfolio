import { cn } from "@/lib/utils";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        // Base styles
        "absolute left-4 top-4 z-50 px-4 py-2 font-medium rounded-md",
        // Visual styles
        "bg-primary text-primary-foreground",
        // Position off-screen by default
        "-translate-y-16 transform",
        // Show on focus
        "focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        // Smooth transition
        "transition-transform duration-200 ease-in-out"
      )}
    >
      Skip to main content
    </a>
  );
}
