import { NextResponse } from 'next/server';
import { LeadMagnetCaptureSchema, type LeadMagnetCaptureInput } from '@/lib/validation/lead-magnet';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { allLeadMagnets } from 'contentlayer/generated';
import { sendLeadMagnetEmail, addSubscriber } from '@/lib/email/resend-client';
import { absoluteUrl } from '@/lib/site';

// In-memory fallback counter when Upstash Redis is not configured in local dev
const memoryDownloadCounts = new Map<string, number>();

function getRedisClient(): Redis | null {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      return Redis.fromEnv();
    } catch {
      return null;
    }
  }
  return null;
}

async function incrementDownloadCount(slug: string, baseCount = 0): Promise<number> {
  const redis = getRedisClient();
  if (redis) {
    try {
      const count = await redis.incr(`lead-magnet:downloads:${slug}`);
      return baseCount + count;
    } catch (err) {
      console.warn('Failed to increment Redis download count:', err);
    }
  }
  const next = (memoryDownloadCounts.get(slug) ?? baseCount) + 1;
  memoryDownloadCounts.set(slug, next);
  return next;
}

async function getDownloadCounts(isKeepalive = false): Promise<Record<string, number>> {
  const counts: Record<string, number> = {};
  const redis = getRedisClient();

  for (const lm of allLeadMagnets) {
    const base = lm.downloadCount ?? 0;
    counts[lm.slug] = memoryDownloadCounts.get(lm.slug) ?? base;
  }

  if (redis && allLeadMagnets.length > 0) {
    try {
      const keys = allLeadMagnets.map((lm) => `lead-magnet:downloads:${lm.slug}`);
      const values = await redis.mget<number[]>(...keys);
      if (isKeepalive) {
        await redis.set('keepalive:last_ping', new Date().toISOString());
      }
      allLeadMagnets.forEach((lm, index) => {
        const redisCount = Number(values?.[index] ?? 0);
        counts[lm.slug] = (lm.downloadCount ?? 0) + (Number.isFinite(redisCount) ? redisCount : 0);
      });
    } catch (err) {
      console.warn('Failed to fetch Redis download counts:', err);
    }
  }

  return counts;
}

export async function GET(request?: Request) {
  let isKeepalive = false;
  if (request?.url) {
    try {
      const { searchParams } = new URL(request.url);
      isKeepalive = searchParams.get('keepalive') === '1';
    } catch {
      isKeepalive = false;
    }
  }
  const counts = await getDownloadCounts(isKeepalive);
  return NextResponse.json({
    success: true,
    counts,
  });
}

export async function POST(request: Request) {
  try {
    // Get the IP address from the request headers
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Check rate limit when Upstash Redis is configured
    const redis = getRedisClient();
    if (redis) {
      try {
        const ratelimit = new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(5, '1 m'),
          analytics: true,
          prefix: '@upstash/ratelimit/lead-magnet',
        });
        const { success, limit, reset, remaining } = await ratelimit.limit(ip);
        if (!success) {
          return new NextResponse(
            JSON.stringify({ 
              success: false, 
              message: 'Too many requests. Please try again later.' 
            }), 
            { 
              status: 429,
              headers: {
                'Content-Type': 'application/json',
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'X-RateLimit-Reset': reset.toString()
              }
            }
          );
        }
      } catch (rateErr) {
        console.warn('Rate limit check skipped:', rateErr);
      }
    }
    
    const body = (await request.json()) as LeadMagnetCaptureInput;
    
    // Validate the request body
    const validation = LeadMagnetCaptureSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false,
          errors: validation.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { name, email, leadMagnetSlug } = validation.data;

    // Find the lead magnet
    const leadMagnet = allLeadMagnets.find(lm => lm.slug === leadMagnetSlug);
    
    if (!leadMagnet) {
      return NextResponse.json(
        { success: false, message: 'Lead magnet not found' },
        { status: 404 }
      );
    }

    // Generate download URL with absolute path
    const downloadUrl = absoluteUrl(leadMagnet.fileUrl);

    // Send email with download link using Resend client
    const { error } = await sendLeadMagnetEmail({
      recipientName: name,
      recipientEmail: email,
      leadMagnetTitle: leadMagnet.title,
      downloadUrl,
      expirationDays: 7,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // Increment real download counter
    const updatedDownloadCount = await incrementDownloadCount(
      leadMagnetSlug,
      leadMagnet.downloadCount ?? 0
    );

    // Add subscriber to email list for future nurture campaigns
    await addSubscriber({
      email,
      name,
      source: 'lead_magnet',
      tags: [leadMagnetSlug, 'lead_magnet_download'],
      metadata: {
        leadMagnetSlug,
        leadMagnetTitle: leadMagnet.title,
        downloadedAt: new Date().toISOString(),
      },
    });

    console.log('Lead magnet download tracked:', {
      event: 'lead_magnet_download',
      leadMagnetSlug,
      leadMagnetTitle: leadMagnet.title,
      email,
      downloadCount: updatedDownloadCount,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true,
      message: 'Check your email for the download link!',
      downloadCount: updatedDownloadCount,
      downloadUrl: leadMagnet.fileUrl,
      leadMagnet: {
        title: leadMagnet.title,
        slug: leadMagnet.slug,
        fileUrl: leadMagnet.fileUrl,
      }
    });
  } catch (error) {
    console.error('Lead magnet capture API error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Add CORS headers for preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
