"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics/track";

interface MobileBottomBarProps {
  bookCallLabel?: string;
  bookCallHref?: string;
  viewServicesLabel?: string;
  viewServicesHref?: string;
}

export function MobileBottomBar({
  bookCallLabel = "Book Call",
  bookCallHref = "/contact",
  viewServicesLabel = "View Services",
  viewServicesHref = "/services",
}: MobileBottomBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show bar when scrolling up, hide when scrolling down
      // Only hide if scrolled down more than 100px to avoid flickering at top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [lastScrollY]);

  const handleBookCallClick = () => {
    track("Mobile Bottom Bar: Book Call Click", {
      href: bookCallHref,
    });
  };

  const handleViewServicesClick = () => {
    track("Mobile Bottom Bar: View Services Click", {
      href: viewServicesHref,
    });
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
      role="navigation"
      aria-label="Mobile bottom navigation"
    >
      <div className="container flex items-center justify-between gap-3 px-4 py-3">
        {/* Primary CTA - Book Call */}
        <Button
          asChild
          size="default"
          className="flex-1"
          onClick={handleBookCallClick}
        >
          <Link href={bookCallHref}>
            <Phone className="size-4" aria-hidden="true" />
            <span>{bookCallLabel}</span>
          </Link>
        </Button>

        {/* Secondary Action - View Services */}
        <Button
          asChild
          variant="outline"
          size="default"
          className="flex-1"
          onClick={handleViewServicesClick}
        >
          <Link href={viewServicesHref}>
            <span>{viewServicesLabel}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
