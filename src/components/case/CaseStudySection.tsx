'use client';

import React, { useState } from 'react';
import type { ReactNode } from 'react';

export type CaseStudyData = {
  problem: string;
  solution: string;
  implementation: string;
  results: string[];
};

type CaseStudySectionProps = {
  caseStudy: CaseStudyData;
};

type TabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function Tab({ label, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-lg px-4 py-2 text-sm font-medium transition-colors
        ${isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        }
      `}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}

type ContentPanelProps = {
  children: ReactNode;
  isActive: boolean;
};

function ContentPanel({ children, isActive }: ContentPanelProps) {
  if (!isActive) return null;
  
  return (
    <div className="animate-in fade-in-50 duration-200">
      {children}
    </div>
  );
}

export function CaseStudySection({ caseStudy }: CaseStudySectionProps) {
  const [activeTab, setActiveTab] = React.useState<'problem' | 'solution' | 'results'>('problem');

  return (
    <section className="rounded-3xl border bg-background shadow-sm">
      <div className="space-y-6 p-8 sm:p-10 lg:p-12">
        <header>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Case Study
          </h2>
        </header>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b pb-4">
          <Tab
            label="The Problem"
            isActive={activeTab === 'problem'}
            onClick={() => setActiveTab('problem')}
          />
          <Tab
            label="The Solution"
            isActive={activeTab === 'solution'}
            onClick={() => setActiveTab('solution')}
          />
          <Tab
            label="The Results"
            isActive={activeTab === 'results'}
            onClick={() => setActiveTab('results')}
          />
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          <ContentPanel isActive={activeTab === 'problem'}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                The Challenge
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {caseStudy.problem}
              </p>
            </div>
          </ContentPanel>

          <ContentPanel isActive={activeTab === 'solution'}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Our Approach
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {caseStudy.solution}
              </p>
              <div className="mt-6 rounded-lg border bg-muted/50 p-6">
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Implementation
                </h4>
                <p className="leading-relaxed text-muted-foreground">
                  {caseStudy.implementation}
                </p>
              </div>
            </div>
          </ContentPanel>

          <ContentPanel isActive={activeTab === 'results'}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Impact & Outcomes
              </h3>
              <ul className="space-y-3">
                {caseStudy.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="mt-1 size-5 shrink-0 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="flex-1 leading-relaxed text-muted-foreground">
                      {result}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ContentPanel>
        </div>
      </div>
    </section>
  );
}
