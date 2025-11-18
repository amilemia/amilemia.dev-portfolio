"use client";

import * as React from "react";
import { Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics/track";

interface TapToCallProps {
  phoneNumber: string;
  label?: string;
  className?: string;
  showIcon?: boolean;
  variant?: "default" | "button" | "inline";
}

interface TapToEmailProps {
  email: string;
  label?: string;
  className?: string;
  showIcon?: boolean;
  variant?: "default" | "button" | "inline";
  subject?: string;
}

/**
 * TapToCall component for mobile-friendly phone number links
 * Only triggers native dialer on mobile devices
 */
export function TapToCall({
  phoneNumber,
  label,
  className,
  showIcon = true,
  variant = "default",
}: TapToCallProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent.toLowerCase()
        );
      setIsMobile(isMobileDevice);
    };

    checkMobile();
  }, []);

  const handleClick = () => {
    track("Tap to Call: Click", {
      phoneNumber,
      isMobile,
    });
  };

  // Format phone number for display (remove non-numeric characters)
  const displayNumber = label || phoneNumber;
  
  // Format phone number for tel: link (keep only digits, +, and -)
  const telLink = `tel:${phoneNumber.replace(/[^\d+\-]/g, "")}`;

  // On desktop, show as plain text or styled element without tel: link
  if (!isMobile) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2",
          variant === "button" &&
            "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          variant === "inline" && "text-foreground",
          className
        )}
        aria-label={`Phone number: ${displayNumber}`}
      >
        {showIcon && <Phone className="size-4" aria-hidden="true" />}
        <span>{displayNumber}</span>
      </span>
    );
  }

  // On mobile, render as clickable link that triggers native dialer
  return (
    <a
      href={telLink}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2 transition-colors",
        variant === "default" &&
          "text-primary hover:text-primary/80 hover:underline",
        variant === "button" &&
          "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        variant === "inline" && "text-foreground hover:underline",
        className
      )}
      aria-label={`Call ${displayNumber}`}
    >
      {showIcon && <Phone className="size-4" aria-hidden="true" />}
      <span>{displayNumber}</span>
    </a>
  );
}

/**
 * TapToEmail component for mobile-friendly email links
 * Only triggers native email client on mobile devices
 */
export function TapToEmail({
  email,
  label,
  className,
  showIcon = true,
  variant = "default",
  subject,
}: TapToEmailProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent.toLowerCase()
        );
      setIsMobile(isMobileDevice);
    };

    checkMobile();
  }, []);

  const handleClick = () => {
    track("Tap to Email: Click", {
      email,
      isMobile,
      subject,
    });
  };

  const displayText = label || email;
  
  // Build mailto link with optional subject
  const mailtoLink = subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;

  // On desktop, show as plain text or styled element without mailto: link
  if (!isMobile) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2",
          variant === "button" &&
            "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          variant === "inline" && "text-foreground",
          className
        )}
        aria-label={`Email address: ${displayText}`}
      >
        {showIcon && <Mail className="size-4" aria-hidden="true" />}
        <span>{displayText}</span>
      </span>
    );
  }

  // On mobile, render as clickable link that triggers native email client
  return (
    <a
      href={mailtoLink}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2 transition-colors",
        variant === "default" &&
          "text-primary hover:text-primary/80 hover:underline",
        variant === "button" &&
          "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        variant === "inline" && "text-foreground hover:underline",
        className
      )}
      aria-label={`Email ${displayText}`}
    >
      {showIcon && <Mail className="size-4" aria-hidden="true" />}
      <span>{displayText}</span>
    </a>
  );
}
