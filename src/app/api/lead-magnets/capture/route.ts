import { NextResponse } from 'next/server';
import { LeadMagnetCaptureSchema, type LeadMagnetCaptureInput } from '@/lib/validation/lead-magnet';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { allLeadMagnets } from 'contentlayer/generated';
import { sendLeadMagnetEmail, addSubscriber } from '@/lib/email/resend-client';
import { absoluteUrl } from '@/lib/site';

// Create a new ratelimiter, that allows 5 requests per 1 minute for lead magnet downloads
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
  prefix: '@upstash/ratelimit/lead-magnet',
});

export async function POST(request: Request) {
  try {
    // Get the IP address from the request headers
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Check rate limit
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    
    // If rate limit is exceeded, return 429
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

    // Track download event with analytics
    // Server-side tracking for internal analytics
    // Client-side tracking should also be implemented in the component that calls this API
    // to track with Plausible/Vercel Analytics and retargeting pixels
    console.log('Lead magnet download tracked:', {
      event: 'lead_magnet_download',
      leadMagnetSlug,
      leadMagnetTitle: leadMagnet.title,
      email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true,
      message: 'Check your email for the download link!',
      leadMagnet: {
        title: leadMagnet.title,
        slug: leadMagnet.slug,
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
