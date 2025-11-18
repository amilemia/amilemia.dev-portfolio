"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BriefFormValues } from "./BriefWizard";

interface ExitIntentModalProps {
  formData: Partial<BriefFormValues>;
  isFormDirty: boolean;
  onSaveProgress: () => void;
  onScheduleCall: () => void;
  onClose: () => void;
}

const SESSION_STORAGE_KEY = "exitIntentModalShown";
const LOCAL_STORAGE_KEY = "contactFormProgress";

export function ExitIntentModal({
  formData,
  isFormDirty,
  onSaveProgress,
  onScheduleCall,
  onClose,
}: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);

  // Check if modal has been shown this session
  useEffect(() => {
    const shown = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (shown === "true") {
      setHasShownThisSession(true);
    }
  }, []);

  // Handle mouse leave detection
  const handleMouseLeave = useCallback(
    (event: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the viewport
      // and form has some data entered
      if (
        event.clientY <= 0 &&
        isFormDirty &&
        !hasShownThisSession &&
        !isVisible
      ) {
        setIsVisible(true);
        setHasShownThisSession(true);
        sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      }
    },
    [isFormDirty, hasShownThisSession, isVisible]
  );

  // Add/remove mouse leave listener
  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleSaveProgress = () => {
    // Save form data to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    onSaveProgress();
    setIsVisible(false);
    onClose();
  };

  const handleScheduleCall = () => {
    onScheduleCall();
    setIsVisible(false);
    onClose();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onClose();
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        setIsVisible(false);
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        aria-describedby="exit-intent-description"
      >
        <Card className="relative w-full max-w-md animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <CardHeader>
            <CardTitle id="exit-intent-title">Wait! Don&apos;t lose your progress</CardTitle>
            <CardDescription id="exit-intent-description">
              You&apos;ve started filling out the form. Would you like to save your progress or schedule a quick call instead?
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              onClick={handleSaveProgress}
              className="w-full"
              size="lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save Progress
            </Button>

            <Button
              onClick={handleScheduleCall}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Schedule Quick Call
            </Button>

            <Button
              onClick={handleDismiss}
              variant="ghost"
              className="w-full"
              size="sm"
            >
              Continue Browsing
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Helper function to load saved progress
export function loadSavedProgress(): Partial<BriefFormValues> | null {
  if (typeof window === "undefined") return null;
  
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load saved progress:", error);
  }
  
  return null;
}

// Helper function to clear saved progress
export function clearSavedProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}
