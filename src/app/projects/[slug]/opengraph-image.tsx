import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/content';

// Route segment config
export const runtime = 'edge';

type Props = {
  params: { slug: string };
};

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return new Response('Not Found', { status: 404 });
  }

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
          {project.title}
        </h1>
        
        {project.summary && (
          <p
            style={{
              fontSize: '1.5rem',
              margin: '0 0 1rem',
              opacity: 0.8,
              maxWidth: '70%',
            }}
          >
            {project.summary}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '1rem',
          }}
        >
          {project.stack?.slice(0, 5).map((tech) => (
            <span
              key={tech}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

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
          {`amilemia.dev/projects/${params.slug}`}
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


