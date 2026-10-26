'use client';

import { useEffect, useState } from 'react';
import { Download, Sparkles, Terminal } from 'lucide-react';
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
  const [downloadCount, setDownloadCount] = useState<number>(leadMagnet.downloadCount ?? 0);

  useEffect(() => {
    let active = true;
    fetch('/api/lead-magnets/capture')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.counts && typeof data.counts[leadMagnet.slug] === 'number') {
          setDownloadCount(data.counts[leadMagnet.slug]);
        }
      })
      .catch(() => {
        // Ignore fetch errors and keep initial count
      });
    return () => {
      active = false;
    };
  }, [leadMagnet.slug]);

  const socialProofText = interpolate(messages.socialProof, {
    count: String(downloadCount),
  });

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-7 text-zinc-50 shadow-2xl md:p-12">
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl opacity-60"
          aria-hidden="true"
        />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/20 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-blue-300">
                <Sparkles className="size-3.5" aria-hidden="true" />
                {messages.eyebrow}
              </span>
              {downloadCount > 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-1 font-mono text-xs font-medium text-emerald-400">
                  <Download className="size-3.5" aria-hidden="true" />
                  {socialProofText}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-1 font-mono text-xs font-medium text-emerald-400">
                  <Download className="size-3.5" aria-hidden="true" />
                  PDF Guide • Instant Access
                </span>
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl font-heading">
                {interpolate(messages.title, { title: leadMagnet.title })}
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                {leadMagnet.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button
                size="lg"
                variant="premium"
                className="min-h-[48px] w-full px-8 sm:w-auto"
                onClick={() => setIsModalOpen(true)}
              >
                <Download className="mr-2 size-4" aria-hidden="true" />
                {messages.cta}
              </Button>
            </div>
          </div>

          {/* 3D-Styled Engineering Toolkit Mockup */}
          <div className="mx-auto w-full max-w-[300px] lg:mx-0">
            <div className="group relative rounded-xl border border-zinc-700/80 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-5 shadow-2xl transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-blue-400">
                  NEXT.JS 15+ SERIES
                </span>
                <Terminal className="size-4 text-zinc-400" aria-hidden="true" />
              </div>
              <div className="my-4 space-y-1.5">
                <p className="text-base font-bold leading-snug text-white">
                  {leadMagnet.title}
                </p>
                <p className="text-xs text-zinc-400">
                  Architecture, SSR, CWV &amp; Conversion Checklist
                </p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-black/70 p-3 font-mono text-[11px] leading-relaxed text-zinc-300">
                <div className="text-zinc-500">$ npx amilemia-toolkit@latest</div>
                <div className="mt-1 text-emerald-400">&#10003; 98+ Lighthouse Score</div>
                <div className="text-blue-400">&#10003; WCAG 2.1 AA Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailCaptureModal
        leadMagnetSlug={leadMagnet.slug}
        leadMagnetTitle={leadMagnet.title}
        fileUrl={leadMagnet.fileUrl}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(newCount) => {
          setDownloadCount((prev) => (typeof newCount === 'number' ? newCount : prev + 1));
        }}
      />
    </>
  );
}
