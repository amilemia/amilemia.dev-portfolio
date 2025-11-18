'use client';

import { useState, useMemo } from 'react';

import type { LeadMagnet } from 'contentlayer/generated';
import { LeadMagnetCard } from './LeadMagnetCard';
import { EmailCaptureModal } from './EmailCaptureModal';
import { cn } from '@/lib/utils';

interface LeadMagnetGridProps {
  magnets: LeadMagnet[];
  showFilters?: boolean;
  className?: string;
}

type CategoryFilter = LeadMagnet['category'] | 'all';

export function LeadMagnetGrid({
  magnets,
  showFilters = true,
  className,
}: LeadMagnetGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedMagnet, setSelectedMagnet] = useState<LeadMagnet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
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
                {category === 'all' ? 'All Resources' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            );
          })}
        </div>
      )}

      {/* Results Count */}
      {showFilters && (
        <p className="text-sm text-muted-foreground">
          Showing {filteredMagnets.length} {filteredMagnets.length === 1 ? 'resource' : 'resources'}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
        </p>
      )}

      {/* Grid */}
      {filteredMagnets.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMagnets.map((magnet) => (
            <LeadMagnetCard
              key={magnet.slug}
              leadMagnet={magnet}
              onDownloadClick={handleDownloadClick}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-lg border border-dashed border-border bg-muted/50 p-12 text-center">
          <p className="text-muted-foreground">
            No resources found in this category.
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="mt-4 text-sm font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            View all resources
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
        />
      )}
    </div>
  );
}
