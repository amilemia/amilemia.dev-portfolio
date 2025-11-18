'use client';

import { useState } from 'react';
import { Download, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LeadMagnet } from 'contentlayer/generated';
import { EmailCaptureModal } from './EmailCaptureModal';

interface ContentUpgradeCalloutProps {
  relatedMagnet: LeadMagnet;
  className?: string;
  variant?: 'default' | 'compact';
}

export function ContentUpgradeCallout({
  relatedMagnet,
  className,
  variant = 'default',
}: ContentUpgradeCalloutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (variant === 'compact') {
    return (
      <>
        <div
          className={cn(
            'my-8 rounded-lg border-2 border-primary/20 bg-primary/5 p-4',
            className
          )}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Download className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{relatedMagnet.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{relatedMagnet.description}</p>
              <Button
                onClick={handleDownloadClick}
                variant="link"
                className="mt-2 h-auto p-0 text-primary"
              >
                Download free <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        <EmailCaptureModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          leadMagnetSlug={relatedMagnet.slug}
          leadMagnetTitle={relatedMagnet.title}
        />
      </>
    );
  }

  return (
    <>
      <div
        className={cn(
          'my-12 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8',
          className
        )}
      >
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Download className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>

          {/* Content */}
          <div className="mb-6 max-w-2xl">
            <h3 className="mb-2 text-2xl font-bold text-foreground">{relatedMagnet.title}</h3>
            <p className="text-muted-foreground">{relatedMagnet.description}</p>
          </div>

          {/* CTA */}
          <Button onClick={handleDownloadClick} size="lg" className="min-w-[200px]">
            <Download className="mr-2 h-5 w-5" aria-hidden="true" />
            Get Free Resource
          </Button>

          {/* Social Proof */}
          {(relatedMagnet.downloadCount !== undefined && relatedMagnet.downloadCount > 0) && (
            <p className="mt-4 text-sm text-muted-foreground">
              Join {relatedMagnet.downloadCount.toLocaleString()}+ others who downloaded this
              resource
            </p>
          )}
        </div>
      </div>

      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        leadMagnetSlug={relatedMagnet.slug}
        leadMagnetTitle={relatedMagnet.title}
      />
    </>
  );
}
