'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Download, Star } from 'lucide-react';

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

interface LeadMagnetCardProps {
  leadMagnet: LeadMagnet;
  onDownloadClick: (slug: string) => void;
}

export function LeadMagnetCard({ leadMagnet, onDownloadClick }: LeadMagnetCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleDownloadClick = () => {
    onDownloadClick(leadMagnet.slug);
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {!imageError ? (
          <Image
            src={leadMagnet.thumbnail}
            alt={leadMagnet.title}
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
            {leadMagnet.category}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2">{leadMagnet.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {leadMagnet.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Social Proof */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {leadMagnet.downloadCount !== undefined && leadMagnet.downloadCount > 0 && (
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" aria-hidden="true" />
              <span>
                {leadMagnet.downloadCount.toLocaleString()} download
                {leadMagnet.downloadCount !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          
          {leadMagnet.rating !== undefined && leadMagnet.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-yellow-500" aria-hidden="true" />
              <span>{leadMagnet.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={handleDownloadClick} 
          className="w-full"
          aria-label={`Download ${leadMagnet.title}`}
        >
          <Download className="mr-2 h-4 w-4" aria-hidden="true" />
          Download Free Guide
        </Button>
      </CardFooter>
    </Card>
  );
}
