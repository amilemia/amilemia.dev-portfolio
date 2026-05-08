'use client';

import { useState } from 'react';
import Image from 'next/image';

export type BeforeAfterItem = {
  type: 'screenshot' | 'metric' | 'video';
  before: string;
  after: string;
  caption?: string;
};

type BeforeAfterComparisonProps = {
  comparisons: BeforeAfterItem[];
};

type ScreenshotSliderProps = {
  before: string;
  after: string;
  caption?: string;
};

function ScreenshotSlider({ before, after, caption }: ScreenshotSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
        {/* After Image (Full) */}
        <div className="absolute inset-0">
          <Image
            src={after}
            alt="After"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={before}
            alt="Before"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute inset-y-0 w-1 bg-primary"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow-lg">
            <svg
              className="size-full p-1.5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute left-4 top-4 rounded bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
          Before
        </div>
        <div className="absolute right-4 top-4 rounded bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
          After
        </div>
      </div>

      {/* Slider Control */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="w-full cursor-pointer"
        aria-label="Adjust before/after comparison slider"
      />

      {caption && (
        <p className="text-center text-sm text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  );
}

type MetricComparisonProps = {
  before: string;
  after: string;
  caption?: string;
};

function MetricComparison({ before, after, caption }: MetricComparisonProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-muted/50 p-6 text-center">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Before
          </div>
          <div className="text-3xl font-bold text-foreground">
            {before}
          </div>
        </div>
        <div className="rounded-lg border bg-primary/10 p-6 text-center">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            After
          </div>
          <div className="text-3xl font-bold text-primary">
            {after}
          </div>
        </div>
      </div>
      {caption && (
        <p className="text-center text-sm text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  );
}

type VideoComparisonProps = {
  before: string;
  after: string;
  caption?: string;
};

function VideoComparison({ before, after, caption }: VideoComparisonProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Before
          </div>
          <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
            <video
              src={before}
              controls
              className="size-full object-cover"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            After
          </div>
          <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
            <video
              src={after}
              controls
              className="size-full object-cover"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      {caption && (
        <p className="text-center text-sm text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  );
}

export function BeforeAfterComparison({ comparisons }: BeforeAfterComparisonProps) {
  if (!comparisons || comparisons.length === 0) {
    return null;
  }

  return (
    <section className="rounded-3xl border bg-background shadow-sm">
      <div className="space-y-8 p-8 sm:p-10 lg:p-12">
        <header>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Before & After
          </h2>
          <p className="mt-2 text-muted-foreground">
            See the transformation in action
          </p>
        </header>

        <div className="space-y-8">
          {comparisons.map((comparison, index) => (
            <div key={index}>
              {comparison.type === 'screenshot' && (
                <ScreenshotSlider
                  before={comparison.before}
                  after={comparison.after}
                  caption={comparison.caption}
                />
              )}
              {comparison.type === 'metric' && (
                <MetricComparison
                  before={comparison.before}
                  after={comparison.after}
                  caption={comparison.caption}
                />
              )}
              {comparison.type === 'video' && (
                <VideoComparison
                  before={comparison.before}
                  after={comparison.after}
                  caption={comparison.caption}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
