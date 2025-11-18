'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ClientLogo } from '@/data/trust';

interface ClientLogosProps {
  logos: ClientLogo[];
  className?: string;
}

/**
 * ClientLogos Component
 * 
 * Displays client logos with infinite scroll animation on desktop
 * and grid layout on mobile. All images are lazy-loaded.
 * 
 * @param logos - Array of client logos to display
 * @param className - Optional additional CSS classes
 */
export function ClientLogos({ logos, className }: ClientLogosProps) {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      className={cn('w-full overflow-hidden', className)}
      role="region"
      aria-label="Client logos"
    >
      {/* Mobile: Grid layout */}
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:hidden">
        {logos.map((logo, index) => (
          <LogoItem key={`${logo.name}-${index}`} logo={logo} />
        ))}
      </div>

      {/* Desktop: Infinite scroll animation */}
      <div className="relative hidden md:block">
        <div className="flex animate-scroll space-x-12">
          {duplicatedLogos.map((logo, index) => (
            <LogoItem
              key={`${logo.name}-${index}`}
              logo={logo}
              className="flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

interface LogoItemProps {
  logo: ClientLogo;
  className?: string;
}

function LogoItem({ logo, className }: LogoItemProps) {
  const content = (
    <div
      className={cn(
        'flex items-center justify-center grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100',
        className
      )}
    >
      <div className="relative h-12 w-32">
        <Image
          src={logo.src}
          alt={`${logo.name} logo`}
          fill
          className="object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );

  if (logo.url) {
    return (
      <a
        href={logo.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded', className)}
        aria-label={`Visit ${logo.name} website`}
      >
        {content}
      </a>
    );
  }

  return content;
}
