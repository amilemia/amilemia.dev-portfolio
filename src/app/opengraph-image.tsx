import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = site.title;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
// biome-ignore lint/style/noDefaultExport: This is a Next.js page
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '4rem',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 900,
            lineHeight: 1.1,
            margin: '0 0 1rem',
            maxWidth: '80%',
          }}
        >
          {site.title}
        </h1>
        <p
          style={{
            fontSize: '1.5rem',
            margin: 0,
            opacity: 0.8,
            maxWidth: '70%',
          }}
        >
          {site.description}
        </p>
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            fontSize: '1.25rem',
            opacity: 0.6,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {site.url.replace(/^https?:\/\//, '')}
        </div>
      </div>
    ),
    {
      ...size,
      // Using system fonts for better performance
      // No need to specify fonts array when using system fonts
    }
  );
}

