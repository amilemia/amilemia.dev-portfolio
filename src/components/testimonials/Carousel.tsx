"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics/track";

export type TestimonialItem = {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
};

type CarouselProps = {
  items: TestimonialItem[];
};

export function Carousel({ items }: CarouselProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const slideRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const scrollFrame = React.useRef<number | null>(null);
  const hasTrackedView = React.useRef(false);
  const carouselId = React.useId();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const totalSlides = items.length;
  const trackId = [carouselId, "track"].join("-");

  React.useEffect(() => {
    return () => {
      if (scrollFrame.current !== null) {
        cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (totalSlides) {
      setActiveIndex(0);
    }
  }, [totalSlides]);

  React.useEffect(() => {
    if (!hasTrackedView.current && totalSlides > 0) {
      track("Testimonials: View");
      hasTrackedView.current = true;
    }
  }, [totalSlides]);

  const setSlideRef = React.useCallback((index: number) => {
    return (node: HTMLDivElement | null) => {
      slideRefs.current[index] = node;
    };
  }, []);

  const getInitials = React.useCallback((name: string) => {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join("") || "?";
  }, []);

  const scrollToIndex = React.useCallback(
    (index: number, { focus }: { focus?: boolean } = {}) => {
      if (!totalSlides) return;
      const boundedIndex = Math.max(0, Math.min(index, totalSlides - 1));
      const target = slideRefs.current[boundedIndex];

      if (!target) return;

      setActiveIndex((current) => (current === boundedIndex ? current : boundedIndex));
      target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });

      if (focus) {
        target.focus({ preventScroll: true });
      }
    },
    [totalSlides]
  );

  const handleScroll = React.useCallback(() => {
    if (!trackRef.current || !totalSlides) {
      return;
    }

    if (scrollFrame.current !== null) {
      cancelAnimationFrame(scrollFrame.current);
    }

    scrollFrame.current = requestAnimationFrame(() => {
      const container = trackRef.current;
      if (!container) {
        scrollFrame.current = null;
        return;
      }

      const center = container.scrollLeft + container.offsetWidth / 2;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (let i = 0; i < slideRefs.current.length; i += 1) {
        const slide = slideRefs.current[i];
        if (!slide) continue;

        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(center - slideCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      setActiveIndex((current) => (current === closestIndex ? current : closestIndex));
      scrollFrame.current = null;
    });
  }, [totalSlides]);

  React.useEffect(() => {
    if (!trackRef.current || !totalSlides) return;

    handleScroll();
  }, [handleScroll, totalSlides]);

  const handlePrevious = React.useCallback(() => {
    const nextIndex = Math.max(0, activeIndex - 1);

    if (nextIndex === activeIndex) return;

    track("Testimonials: NextPrev", { index: nextIndex });
    scrollToIndex(nextIndex, { focus: true });
  }, [activeIndex, scrollToIndex]);

  const handleNext = React.useCallback(() => {
    const nextIndex = Math.min(totalSlides - 1, activeIndex + 1);

    if (nextIndex === activeIndex) return;

    track("Testimonials: NextPrev", { index: nextIndex });
    scrollToIndex(nextIndex, { focus: true });
  }, [activeIndex, scrollToIndex, totalSlides]);

  const handleSlideKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
      if (event.defaultPrevented) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const nextIndex = Math.max(0, index - 1);

        if (nextIndex === index) return;

        track("Testimonials: NextPrev", { index: nextIndex });
        scrollToIndex(nextIndex, { focus: true });
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = Math.min(totalSlides - 1, index + 1);

        if (nextIndex === index) return;

        track("Testimonials: NextPrev", { index: nextIndex });
        scrollToIndex(nextIndex, { focus: true });
      }
    },
    [scrollToIndex, totalSlides]
  );

  if (totalSlides === 0) {
    return null;
  }

  const canGoBack = activeIndex > 0;
  const canGoForward = activeIndex < totalSlides - 1;

  return (
    <section
      className="space-y-6"
      aria-label="Testimonials"
      data-testid="testimonial-carousel"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Testimonials</h2>
          <p className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
            Testimonial {activeIndex + 1} of {totalSlides}
          </p>
        </div>
        {totalSlides > 1 && (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={!canGoBack}
              aria-label="View previous testimonial"
              aria-controls={trackId}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={!canGoForward}
              aria-label="View next testimonial"
              aria-controls={trackId}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>

      <div
        id={trackId}
        ref={trackRef}
        className="flex snap-x snap-mandatory scroll-px-4 scroll-smooth gap-6 overflow-x-auto pb-2"
        onScroll={handleScroll}
        role="list"
      >
        {items.map((item, index) => {
          return (
            <div
              key={[item.author, index].join("-")}
              ref={setSlideRef(index)}
              role="listitem"
              tabIndex={0}
              onKeyDown={(event) => handleSlideKeyDown(event, index)}
              aria-roledescription="slide"
              aria-label={[item.author, item.role].filter(Boolean).join(", ")}
              aria-current={activeIndex === index}
              className={cn(
                "snap-center shrink-0 basis-full sm:basis-[420px] md:basis-[480px]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              )}
            >
              <figure className="flex h-full flex-col justify-between gap-6 rounded-3xl border bg-background/80 p-8 shadow-sm backdrop-blur-sm">
                <blockquote className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex size-12 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-base font-semibold text-foreground">
                    {item.avatarUrl ? (
                      <Image
                        src={item.avatarUrl}
                        alt=""
                        width={48}
                        height={48}
                        className="size-full object-cover"
                      />
                    ) : (
                      getInitials(item.author)
                    )}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{item.author}</span>
                    {item.role && <span>{item.role}</span>}
                  </span>
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
    </section>
  );
}
