"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { Button } from "@/components/ui/button";

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface SwipeableGalleryProps {
  images: GalleryImage[];
  className?: string;
  showControls?: boolean;
  autoHeight?: boolean;
}

/**
 * SwipeableGallery - A touch-friendly image gallery with swipe gestures
 * Optimized for mobile devices with lazy loading and pagination
 */
export function SwipeableGallery({
  images,
  className,
  showControls = true,
  autoHeight = false,
}: SwipeableGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [images.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [images.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning]);

  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    threshold: 50,
    minVelocity: 0.3,
  });

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div
      className={cn("relative w-full", className)}
      role="region"
      aria-label="Image gallery"
      aria-live="polite"
    >
      {/* Main Image Container */}
      <div
        className={cn(
          "relative overflow-hidden rounded-lg bg-muted",
          autoHeight ? "h-auto" : "aspect-[16/9]"
        )}
        {...swipeHandlers}
      >
        {/* Images */}
        <div className="relative h-full w-full">
          {images.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Navigation Controls - Desktop/Tablet */}
        {showControls && images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2",
                "hidden sm:flex",
                "bg-background/80 backdrop-blur-sm hover:bg-background/90",
                "transition-opacity duration-200",
                isTransitioning && "opacity-50 pointer-events-none"
              )}
              onClick={goToPrevious}
              aria-label="Previous image"
              disabled={isTransitioning}
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2",
                "hidden sm:flex",
                "bg-background/80 backdrop-blur-sm hover:bg-background/90",
                "transition-opacity duration-200",
                isTransitioning && "opacity-50 pointer-events-none"
              )}
              onClick={goToNext}
              aria-label="Next image"
              disabled={isTransitioning}
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </Button>
          </>
        )}

        {/* Image Counter - Mobile */}
        {images.length > 1 && (
          <div
            className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur-sm sm:hidden"
            aria-label={`Image ${currentIndex + 1} of ${images.length}`}
          >
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {currentImage.caption}
        </p>
      )}

      {/* Pagination Dots */}
      {images.length > 1 && (
        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Gallery navigation"
        >
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-label={`Go to image ${index + 1}`}
              aria-selected={index === currentIndex}
              aria-controls={`gallery-image-${index}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {/* Screen Reader Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing image {currentIndex + 1} of {images.length}
        {currentImage.caption && `: ${currentImage.caption}`}
      </div>
    </div>
  );
}
