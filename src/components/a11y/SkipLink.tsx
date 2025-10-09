import { cn } from "@/lib/utils";

type SkipLinkProps = {
  label: string;
};

export function SkipLink({ label }: SkipLinkProps) {
  return (
    <a
      href="#main-content"
      className={cn(
        "absolute left-4 top-4 z-50 px-4 py-2 font-medium rounded-md",
        "bg-primary text-primary-foreground",
        "-translate-y-16 transform",
        "focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        "transition-transform duration-200 ease-in-out"
      )}
    >
      {label}
    </a>
  );
}
