'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Certification } from '@/data/trust';

interface CertificationBadgesProps {
  badges: Certification[];
  className?: string;
}

/**
 * CertificationBadges Component
 * 
 * Displays certification badges with tooltips on hover showing
 * issuer and date. Links to verification pages when available.
 * 
 * @param badges - Array of certifications to display
 * @param className - Optional additional CSS classes
 */
export function CertificationBadges({
  badges,
  className,
}: CertificationBadgesProps) {
  return (
    <div
      className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2', className)}
      role="region"
      aria-label="Certifications and badges"
    >
      {badges.map((badge, index) => (
        <BadgeItem key={`${badge.name}-${index}`} badge={badge} />
      ))}
    </div>
  );
}

interface BadgeItemProps {
  badge: Certification;
}

function BadgeItem({ badge }: BadgeItemProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const formattedDate = new Date(badge.earnedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  const badgeContent = (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => {
        setShowTooltip(true);
        setIsFocused(true);
      }}
      onBlur={() => {
        setShowTooltip(false);
        setIsFocused(false);
      }}
    >
      <div className="relative h-20 w-20 transition-transform duration-300 hover:scale-110">
        <Image
          src={badge.image}
          alt={`${badge.name} certification badge`}
          fill
          className="object-contain"
          loading="lazy"
        />
      </div>

      {/* Tooltip */}
      {(showTooltip || isFocused) && (
        <div
          className={cn(
            'absolute top-full z-10 mt-2 w-48 rounded-md bg-popover p-3 text-sm shadow-lg',
            'border border-border',
            'animate-in fade-in-0 zoom-in-95'
          )}
          role="tooltip"
          aria-live="polite"
        >
          <div className="font-semibold text-popover-foreground">
            {badge.name}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Issued by {badge.issuer}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Earned: {formattedDate}
          </div>
          {badge.verifyUrl && (
            <div className="mt-2 text-xs text-primary">
              Click to verify →
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (badge.verifyUrl) {
    return (
      <a
        href={badge.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex items-center justify-center rounded-lg p-4',
          'transition-colors duration-200',
          'hover:bg-accent',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        )}
        aria-label={`${badge.name} - Click to verify`}
      >
        {badgeContent}
      </a>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg p-4',
        'transition-colors duration-200',
        'hover:bg-accent'
      )}
      tabIndex={0}
      role="button"
      aria-label={badge.name}
    >
      {badgeContent}
    </div>
  );
}
