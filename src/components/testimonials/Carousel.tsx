"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics/track";
import type { Messages } from "@/i18n";
import { interpolate } from "@/i18n/interpolate";
import type { TestimonialItem } from "@/data/testimonials";

type CarouselProps = {
  items: TestimonialItem[];
  messages: Messages["common"]["testimonials"];
};

export function Carousel({ items, messages }: CarouselProps) {
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
    return (
      name
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0]?.toUpperCase())
        .slice(0, 2)
        .join("") || "?"
    );
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

    const container = trackRef.current;
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, totalSlides]);

  const handlePrevious = React.useCallback(() => {
    track("Testimonials: NextPrev", { index: Math.max(0, activeIndex - 1) });
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const handleNext = React.useCallback(() => {
    track("Testimonials: NextPrev", { index: Math.min(totalSlides - 1, activeIndex + 1) });
    scrollToIndex(activeIndex + 1);
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
  const counterLabel = interpolate(messages.counter, {
    current: activeIndex + 1,
    total: totalSlides,
  });

  return (
    <section className="space-y-8" aria-label={messages.ariaLabel} data-testid="testimonial-carousel">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl font-heading">{messages.heading}</h2>
          <p className="text-sm text-muted-foreground lg:sr-only" aria-live="polite" aria-atomic="true">
            {counterLabel}
          </p>
        </div>
        {totalSlides > 1 && (
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={!canGoBack}
              aria-label={messages.previous}
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
              aria-label={messages.next}
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
        className="flex snap-x snap-mandatory scroll-px-4 scroll-smooth gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0"
        onScroll={handleScroll}
        role="list"
      >
        {items.map((item, index) => {
          return (
            <div
              key={[item.fullName, index].join("-")}
              ref={setSlideRef(index)}
              role="listitem"
              tabIndex={0}
              onKeyDown={(event) => handleSlideKeyDown(event, index)}
              aria-roledescription="slide"
              aria-label={[item.fullName, item.role, item.company].filter(Boolean).join(", ")}
              aria-current={activeIndex === index}
              className={cn(
                "snap-center shrink-0 basis-full sm:basis-[420px] md:basis-[460px] lg:basis-auto",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              )}
            >
              <figure className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-border/70 bg-card/80 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    {item.metric ? (
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                        {item.metric}
                      </div>
                    ) : <span />}
                    <div className="flex items-center gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <svg
                          key={starIdx}
                          className="size-4 fill-current"
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-base leading-relaxed text-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="flex items-center gap-3.5 border-t border-border/50 pt-5 text-sm text-muted-foreground">
                  <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-sm font-semibold text-foreground">
                    {item.avatarUrl ? (
                      <Image
                        src={item.avatarUrl}
                        alt=""
                        width={44}
                        height={44}
                        className="size-full object-cover"
                      />
                    ) : (
                      getInitials(item.fullName)
                    )}
                  </span>
                  <div className="flex flex-1 flex-col min-w-0">
                    <span className="truncate text-sm font-semibold text-foreground">{item.fullName}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {[item.role, item.company].filter(Boolean).join(", ")}
                    </span>
                  </div>
                  {item.companyLogo && (
                    <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-background">
                      <Image
                        src={item.companyLogo}
                        alt={`${item.company} logo`}
                        width={36}
                        height={36}
                        className="size-full object-contain p-1"
                      />
                    </div>
                  )}
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
    </section>
  );
}
