'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

export type VideoTestimonialData = {
  url: string;
  thumbnail?: string;
  duration?: number;
};

type VideoTestimonialProps = {
  video: VideoTestimonialData;
  fallbackTestimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
};

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getVideoEmbedUrl(url: string): string {
  // Convert YouTube watch URLs to embed URLs
  if (url.includes('youtube.com/watch')) {
    const videoId = new URL(url).searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Convert YouTube short URLs to embed URLs
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Convert Vimeo URLs to embed URLs
  if (url.includes('vimeo.com/')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  
  // Return as-is if already an embed URL or direct video file
  return url;
}

export function VideoTestimonial({ video, fallbackTestimonial }: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedUrl = getVideoEmbedUrl(video.url);
  const isEmbedVideo = embedUrl.includes('youtube.com/embed') || embedUrl.includes('player.vimeo.com');

  if (!video.url) {
    // Fallback to text testimonial if no video
    if (fallbackTestimonial) {
      return (
        <section className="rounded-3xl border bg-background shadow-sm">
          <div className="p-8 sm:p-10 lg:p-12">
            <header className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Client Testimonial
              </h2>
            </header>
            <figure>
              <blockquote className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                &ldquo;{fallbackTestimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {fallbackTestimonial.author}
                </span>
                {fallbackTestimonial.role && (
                  <>
                    <span aria-hidden="true">|</span>
                    <span>{fallbackTestimonial.role}</span>
                  </>
                )}
              </figcaption>
            </figure>
          </div>
        </section>
      );
    }
    return null;
  }

  return (
    <section className="rounded-3xl border bg-background shadow-sm">
      <div className="space-y-6 p-8 sm:p-10 lg:p-12">
        <header>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Video Testimonial
          </h2>
          <p className="mt-2 text-muted-foreground">
            Hear directly from the client
          </p>
        </header>

        <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
          {!isPlaying && video.thumbnail ? (
            // Thumbnail with play button overlay
            <button
              onClick={() => setIsPlaying(true)}
              className="group relative size-full"
              aria-label="Play video testimonial"
            >
              <Image
                src={video.thumbnail}
                alt="Video testimonial thumbnail"
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                <div className="flex size-20 items-center justify-center rounded-full bg-primary shadow-lg transition-transform group-hover:scale-110">
                  <Play className="ml-1 size-8 fill-primary-foreground text-primary-foreground" />
                </div>
              </div>

              {/* Duration badge */}
              {video.duration && (
                <div className="absolute bottom-4 right-4 rounded bg-black/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {formatDuration(video.duration)}
                </div>
              )}
            </button>
          ) : isEmbedVideo ? (
            // Embedded video player (YouTube/Vimeo)
            <iframe
              src={`${embedUrl}?autoplay=${isPlaying ? '1' : '0'}`}
              title="Video testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="size-full"
            />
          ) : (
            // Direct video file
            <video
              src={embedUrl}
              controls
              autoPlay={isPlaying}
              className="size-full object-cover"
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Fallback text testimonial below video */}
        {fallbackTestimonial && (
          <figure className="rounded-lg border bg-muted/50 p-6">
            <blockquote className="text-base leading-relaxed text-muted-foreground">
              &ldquo;{fallbackTestimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {fallbackTestimonial.author}
              </span>
              {fallbackTestimonial.role && (
                <>
                  <span aria-hidden="true">|</span>
                  <span>{fallbackTestimonial.role}</span>
                </>
              )}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
