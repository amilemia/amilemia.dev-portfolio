import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactSchema, type ContactInput } from '@/lib/validation/contact';
import { env } from '@/lib/env';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

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

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Get the IP address from the request headers
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Check rate limit safely so an inactive Redis DB never blocks contact inquiries
    const redis = getRedisClient();
    if (redis) {
      try {
        const ratelimit = new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(3, '1 m'),
          analytics: true,
          prefix: '@upstash/ratelimit',
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
        console.warn('Contact rate limit check skipped (Redis unavailable):', rateErr);
      }
    }
    
    const body = (await request.json()) as ContactInput;
    
    // Validate the request body
    const validation = ContactSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false,
          errors: validation.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validation.data;

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: 'Portfolio <contact@amilemia.dev>',
      to: env.CONTACT_TO,
      replyTo: email,
      subject: `${name} sent a message from amilemia.dev`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
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
