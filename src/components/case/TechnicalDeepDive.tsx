'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export type TechnicalDeepDiveData = {
  architecture?: string;
  challenges?: string[];
  decisions?: string[];
};

type TechnicalDeepDiveProps = {
  deepDive: TechnicalDeepDiveData;
};

export function TechnicalDeepDive({ deepDive }: TechnicalDeepDiveProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasContent = deepDive.architecture || 
                     (deepDive.challenges && deepDive.challenges.length > 0) || 
                     (deepDive.decisions && deepDive.decisions.length > 0);

  if (!hasContent) {
    return null;
  }

  return (
    <section className="rounded-3xl border bg-background shadow-sm">
      <div className="p-8 sm:p-10 lg:p-12">
        {/* Header with Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between text-left transition-colors hover:text-primary"
          aria-expanded={isExpanded}
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Technical Deep Dive
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isExpanded ? 'Click to collapse' : 'Click to expand technical details'}
            </p>
          </div>
          <div className="ml-4 shrink-0">
            {isExpanded ? (
              <ChevronUp className="size-6 text-muted-foreground" />
            ) : (
              <ChevronDown className="size-6 text-muted-foreground" />
            )}
          </div>
        </button>

        {/* Collapsible Content */}
        {isExpanded && (
          <div className="mt-8 animate-in fade-in-50 slide-in-from-top-4 duration-300">
            <div className="space-y-8">
              {/* Architecture Section */}
              {deepDive.architecture && (
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <svg
                      className="size-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Architecture
                  </h3>
                  <div className="rounded-lg border bg-muted/50 p-6">
                    <p className="leading-relaxed text-muted-foreground">
                      {deepDive.architecture}
                    </p>
                  </div>
                </div>
              )}

              {/* Challenges Section */}
              {deepDive.challenges && deepDive.challenges.length > 0 && (
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <svg
                      className="size-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Challenges Overcome
                  </h3>
                  <ul className="space-y-3">
                    {deepDive.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                        <span className="flex-1 leading-relaxed text-muted-foreground">
                          {challenge}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Decisions Section */}
              {deepDive.decisions && deepDive.decisions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <svg
                      className="size-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Technical Decisions
                  </h3>
                  <ul className="space-y-3">
                    {deepDive.decisions.map((decision, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg
                          className="mt-1 size-5 shrink-0 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="flex-1 leading-relaxed text-muted-foreground">
                          {decision}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
