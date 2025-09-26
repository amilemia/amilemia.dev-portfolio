export type TestimonialProps = {
  quote: string;
  author: string;
  role?: string;
};

export function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <figure className="rounded-3xl border bg-background/80 p-8 shadow-sm backdrop-blur-sm">
      <blockquote className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{author}</span>
        {role && (
          <>
            <span aria-hidden="true">|</span>
            <span>{role}</span>
          </>
        )}
      </figcaption>
    </figure>
  );
}
