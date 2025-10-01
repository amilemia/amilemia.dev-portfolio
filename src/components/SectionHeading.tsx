import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={cn("space-y-4", alignment, className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" id={id}>
          {title}
        </h2>
        {description ? (
          <p className="text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
