'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Download, Eye, Sparkles } from 'lucide-react';
import type { LeadMagnet } from 'contentlayer/generated';

import { Button } from '@/components/ui/button';
import { EmailCaptureModal } from './EmailCaptureModal';
import { interpolate } from '@/i18n/interpolate';
import { getMessages, type Locale } from '@/i18n';
import { track } from '@/lib/analytics/track';

type FeaturedLeadMagnetProps = {
  leadMagnet: LeadMagnet;
  locale?: Locale;
  messages: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    socialProof: string;
    browse: string;
    delivery: string;
  };
};

export function FeaturedLeadMagnet({ leadMagnet, messages, locale = 'en' }: FeaturedLeadMagnetProps) {
  const copy = getMessages(locale).resources.card;
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
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
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
                  {copy.format}
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

            <ul className="space-y-2 text-sm text-zinc-200">
              {leadMagnet.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-blue-300" aria-hidden="true" />
                  {outcome}
                </li>
              ))}
            </ul>
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
              <Link href={`/${locale}/resources`} className="rounded text-sm font-semibold text-blue-200 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4">
                {messages.browse}
              </Link>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">{messages.delivery}</p>
          </div>

          <div className="space-y-4">
            <a href={leadMagnet.previewUrl} target="_blank" rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl border border-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-4"
              aria-label={`${copy.preview}: ${leadMagnet.title}`}
              onClick={() => track('Resource: Preview', { slug: leadMagnet.slug, location: 'homepage' })}>
              <Image src={leadMagnet.thumbnail} alt="" width={1200} height={675}
                sizes="(min-width: 1024px) 360px, 100vw" className="h-auto w-full" />
              <span className="flex items-center justify-center gap-2 bg-zinc-900 px-4 py-3 text-sm font-medium text-blue-200">
                <Eye className="size-4" aria-hidden="true" />{copy.preview}
              </span>
            </a>
            <p className="text-center text-xs text-zinc-400">
              {interpolate(copy.pages, { count: String(leadMagnet.pageCount) })}
              {' · '}{interpolate(copy.firstPass, { minutes: String(leadMagnet.reviewMinutes) })}
            </p>
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
