'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { LeadMagnet } from 'contentlayer/generated';

import { Button } from '@/components/ui/button';
import { EmailCaptureModal } from './EmailCaptureModal';
import { interpolate } from '@/i18n/interpolate';

type FeaturedLeadMagnetProps = {
  leadMagnet: LeadMagnet;
  messages: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    socialProof: string;
  };
};

export function FeaturedLeadMagnet({ leadMagnet, messages }: FeaturedLeadMagnetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const socialProofText = interpolate(messages.socialProof, {
    count: String(leadMagnet.downloadCount ?? 0),
  });

  return (
    <>
      <div className="rounded-3xl border bg-gradient-to-br from-primary/5 via-background to-background p-8 md:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {messages.eyebrow}
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {interpolate(messages.title, { title: leadMagnet.title })}
              </h2>
              <p className="text-base text-muted-foreground sm:text-lg">
                {leadMagnet.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={() => setIsModalOpen(true)}>
                {messages.cta}
              </Button>
              {leadMagnet.downloadCount && leadMagnet.downloadCount > 0 && (
                <p className="text-sm text-muted-foreground">{socialProofText}</p>
              )}
            </div>
          </div>

          {leadMagnet.thumbnail && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted lg:aspect-[3/4]">
              <Image
                src={leadMagnet.thumbnail}
                alt={leadMagnet.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 300px"
              />
            </div>
          )}
        </div>
      </div>

      <EmailCaptureModal
        leadMagnetSlug={leadMagnet.slug}
        leadMagnetTitle={leadMagnet.title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
