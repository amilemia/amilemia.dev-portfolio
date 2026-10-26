'use client';

import { useEffect, useState, useMemo } from 'react';

import type { LeadMagnet } from 'contentlayer/generated';
import { LeadMagnetCard } from './LeadMagnetCard';
import { EmailCaptureModal } from './EmailCaptureModal';
import { cn } from '@/lib/utils';
import { getMessages, type Locale } from '@/i18n';
import { interpolate } from '@/i18n/interpolate';

interface LeadMagnetGridProps {
  magnets: LeadMagnet[];
  showFilters?: boolean;
  className?: string;
  locale?: Locale;
}

type CategoryFilter = LeadMagnet['category'] | 'all';

export function LeadMagnetGrid({
  magnets,
  showFilters = true,
  className,
  locale = 'en',
}: LeadMagnetGridProps) {
  const copy = getMessages(locale).resources;
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedMagnet, setSelectedMagnet] = useState<LeadMagnet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [liveCounts, setLiveCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let active = true;
    fetch('/api/lead-magnets/capture')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.counts) {
          setLiveCounts(data.counts);
        }
      })
      .catch(() => {
        // Ignore fetch errors
      });
    return () => {
      active = false;
    };
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(magnets.map((m) => m.category)));
    return ['all', ...uniqueCategories] as CategoryFilter[];
  }, [magnets]);

  // Filter magnets by category
  const filteredMagnets = useMemo(() => {
    if (selectedCategory === 'all') {
      return magnets;
    }
    return magnets.filter((magnet) => magnet.category === selectedCategory);
  }, [magnets, selectedCategory]);

  const handleDownloadClick = (slug: string) => {
    const magnet = magnets.find((m) => m.slug === slug);
    if (magnet) {
      setSelectedMagnet(magnet);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMagnet(null);
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* Category Filters */}
      {showFilters && categories.length > 2 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label={copy.filters.label}>
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
                aria-pressed={isActive}
              >
                {category === 'all' ? copy.filters.all : copy.card.category[category]}
              </button>
            );
          })}
        </div>
      )}

      {/* Results Count */}
      {showFilters && (
        <p className="text-sm text-muted-foreground" role="status">
          {interpolate(copy.filters.results, { count: String(filteredMagnets.length) })}
        </p>
      )}

      {/* Grid */}
      {filteredMagnets.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMagnets.map((magnet) => {
            const magnetWithLiveCount =
              typeof liveCounts[magnet.slug] === 'number'
                ? { ...magnet, downloadCount: liveCounts[magnet.slug] }
                : magnet;
            return (
              <LeadMagnetCard
                key={magnet.slug}
                leadMagnet={magnetWithLiveCount}
                onDownloadClick={handleDownloadClick}
                locale={locale}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-lg border border-dashed border-border bg-muted/50 p-12 text-center">
          <p className="text-muted-foreground">
            {copy.filters.empty}
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="mt-4 text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {copy.filters.all}
          </button>
        </div>
      )}

      {/* Email Capture Modal */}
      {selectedMagnet && (
        <EmailCaptureModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          leadMagnetSlug={selectedMagnet.slug}
          leadMagnetTitle={selectedMagnet.title}
          fileUrl={selectedMagnet.fileUrl}
          onSuccess={(newCount) => {
            setLiveCounts((prev) => ({
              ...prev,
              [selectedMagnet.slug]:
                typeof newCount === 'number'
                  ? newCount
                  : (prev[selectedMagnet.slug] ?? selectedMagnet.downloadCount ?? 0) + 1,
            }));
          }}
        />
      )}
    </div>
  );
}
