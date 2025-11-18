'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { TrustMetric } from '@/data/trust';

interface TrustMetricsProps {
  metrics: TrustMetric[];
  className?: string;
}

/**
 * TrustMetrics Component
 * 
 * Displays trust metrics with animated counters on scroll into view.
 * Responsive: 2x2 grid on mobile, 4x1 on desktop.
 * 
 * @param metrics - Array of trust metrics to display
 * @param className - Optional additional CSS classes
 */
export function TrustMetrics({ metrics, className }: TrustMetricsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8',
        className
      )}
      role="region"
      aria-label="Trust metrics"
    >
      {metrics.map((metric, index) => (
        <MetricCard
          key={`${metric.label}-${index}`}
          metric={metric}
          isVisible={isVisible}
          delay={index * 100}
        />
      ))}
    </div>
  );
}

interface MetricCardProps {
  metric: TrustMetric;
  isVisible: boolean;
  delay: number;
}

function MetricCard({ metric, isVisible, delay }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isVisible) return;

    // Extract numeric value for animation
    const numericMatch = metric.value.match(/[\d.]+/);
    if (!numericMatch) {
      // If no numeric value, just display the value directly
      setTimeout(() => setDisplayValue(metric.value), delay);
      return;
    }

    const targetValue = parseFloat(numericMatch[0]);
    const suffix = metric.value.replace(numericMatch[0], '');
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    const stepDuration = duration / steps;

    let currentValue = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          setDisplayValue(metric.value);
          clearInterval(interval);
        } else {
          setDisplayValue(`${Math.floor(currentValue)}${suffix}`);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, metric.value, delay]);

  return (
    <div
      className={cn(
        'flex flex-col items-center text-center transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="text-3xl font-bold text-primary md:text-4xl"
        aria-label={`${metric.label}: ${metric.value}`}
      >
        {displayValue}
      </div>
      <div className="mt-2 text-sm font-medium text-foreground">
        {metric.label}
      </div>
      {metric.context && (
        <div className="mt-1 text-xs text-muted-foreground">
          {metric.context}
        </div>
      )}
    </div>
  );
}
