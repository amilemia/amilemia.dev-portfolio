'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, Download, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { LeadMagnet } from 'contentlayer/generated';
import { getMessages, type Locale } from '@/i18n';
import { interpolate } from '@/i18n/interpolate';
import { track } from '@/lib/analytics/track';

interface LeadMagnetCardProps {
  leadMagnet: LeadMagnet;
  onDownloadClick: (slug: string) => void;
  locale?: Locale;
}

export function LeadMagnetCard({ leadMagnet, onDownloadClick, locale = 'en' }: LeadMagnetCardProps) {
  const [imageError, setImageError] = useState(false);
  const copy = getMessages(locale).resources.card;

  const handleDownloadClick = () => {
    onDownloadClick(leadMagnet.slug);
  };

  return (
    <Card className="flex flex-col overflow-hidden py-0 transition-shadow hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {!imageError ? (
          <Image
            src={leadMagnet.thumbnail}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <Download className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute left-3 top-3">
          <Badge variant="secondary" className="capitalize">
            {copy.category[leadMagnet.category]}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle><h3 className="leading-snug">{leadMagnet.title}</h3></CardTitle>
        <CardDescription>
          {leadMagnet.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{copy.audience}: </span>
          {leadMagnet.audience}
        </p>
        <ul className="space-y-2 text-sm">
          {leadMagnet.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {outcome}
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {interpolate(copy.pages, { count: String(leadMagnet.pageCount) })}
          {' · '}
          {interpolate(copy.firstPass, { minutes: String(leadMagnet.reviewMinutes) })}
          <span className="block mt-1">{copy.format}</span>
        </p>
        {/* Resource Metadata & Live Download Count */}
        {leadMagnet.downloadCount !== undefined && leadMagnet.downloadCount > 0 && (
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>
                {interpolate(copy.downloadCount, { count: leadMagnet.downloadCount.toLocaleString(locale) })}
              </span>
            </div>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-3 pb-6">
        <Button asChild variant="outline" className="min-h-11 w-full">
          <a href={leadMagnet.previewUrl} target="_blank" rel="noopener noreferrer"
            aria-label={`${copy.preview}: ${leadMagnet.title}`}
            onClick={() => track('Resource: Preview', { slug: leadMagnet.slug, location: 'resource-card' })}>
            <Eye className="mr-2 size-4" aria-hidden="true" />
            {copy.preview}
          </a>
        </Button>
        <Button 
          onClick={handleDownloadClick} 
          className="min-h-11 w-full"
          aria-label={`${copy.download}: ${leadMagnet.title}`}
        >
          <Download className="mr-2 h-4 w-4" aria-hidden="true" />
          {copy.download}
        </Button>
      </CardFooter>
    </Card>
  );
}
