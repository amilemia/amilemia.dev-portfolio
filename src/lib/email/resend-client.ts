import { Resend } from 'resend';
import { Redis } from '@upstash/redis';
import { env } from '@/lib/env';

/**
 * Resend client for email delivery
 * Configured with API key from environment variables
 */
export const resend = new Resend(env.RESEND_API_KEY);

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

/**
 * Email subscriber information
 */
export interface EmailSubscriber {
  email: string;
  name?: string;
  source: 'lead_magnet' | 'newsletter' | 'contact_form';
  tags?: string[];
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Lead magnet email data
 */
export interface LeadMagnetEmailData {
  recipientName: string;
  recipientEmail: string;
  leadMagnetTitle: string;
  downloadUrl: string;
  expirationDays?: number;
}

/**
 * Send a lead magnet email with download link
 * 
 * @param data - Email data including recipient info and download link
 * @returns Promise with email send result
 */
export async function sendLeadMagnetEmail(data: LeadMagnetEmailData) {
  const {
    recipientName,
    recipientEmail,
    leadMagnetTitle,
    downloadUrl,
    expirationDays = 7,
  } = data;

  const result = await resend.emails.send({
    from: 'Mohammed-Amine Madah <contact@amilemia.dev>',
    to: recipientEmail,
    replyTo: env.CONTACT_TO,
    subject: `Your ${leadMagnetTitle} is ready!`,
    html: generateLeadMagnetEmailHTML({
      recipientName,
      leadMagnetTitle,
      downloadUrl,
      expirationDays,
    }),
    text: generateLeadMagnetEmailText({
      recipientName,
      leadMagnetTitle,
      downloadUrl,
      expirationDays,
    }),
  });

  return result;
}

/**
 * Generate HTML email template for lead magnet delivery
 */
function generateLeadMagnetEmailHTML(data: {
  recipientName: string;
  leadMagnetTitle: string;
  downloadUrl: string;
  expirationDays: number;
}): string {
  const { recipientName, leadMagnetTitle, downloadUrl, expirationDays } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ${leadMagnetTitle} is ready!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">
                Hi ${recipientName},
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 0 40px 20px 40px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Thanks for downloading <strong>${leadMagnetTitle}</strong>!
              </p>
              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Click the button below to download your resource:
              </p>
            </td>
          </tr>
          
          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 0 40px 30px 40px;">
              <a href="${downloadUrl}" 
                 style="display: inline-block; background-color: #000000; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 600; transition: background-color 0.2s;">
                Download Now
              </a>
            </td>
          </tr>
          
          <!-- Expiration Notice -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #888888; text-align: center;">
                This link will remain active for ${expirationDays} days.
              </p>
            </td>
          </tr>
          
          <!-- Additional Resources -->
          <tr>
            <td style="padding: 0 40px 40px 40px; border-top: 1px solid #e5e5e5;">
              <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 1.6; color: #4a4a4a;">
                Want more resources? Check out my latest projects at 
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/projects" 
                   style="color: #000000; text-decoration: underline;">
                  amilemia.dev
                </a>
              </p>
            </td>
          </tr>
        </table>
        
        <!-- Footer -->
        <table role="presentation" style="width: 600px; max-width: 100%; margin-top: 20px;">
          <tr>
            <td style="padding: 20px; text-align: center;">
              <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #888888;">
                You're receiving this email because you requested a resource from amilemia.dev
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email template for lead magnet delivery
 */
function generateLeadMagnetEmailText(data: {
  recipientName: string;
  leadMagnetTitle: string;
  downloadUrl: string;
  expirationDays: number;
}): string {
  const { recipientName, leadMagnetTitle, downloadUrl, expirationDays } = data;

  return `
Hi ${recipientName},

Thanks for downloading ${leadMagnetTitle}!

Download your resource here:
${downloadUrl}

This link will remain active for ${expirationDays} days.

Want more resources? Check out my latest projects at ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/projects

---
You're receiving this email because you requested a resource from amilemia.dev
  `.trim();
}

/**
 * Add a subscriber to the email list
 * 
 * @param subscriber - Subscriber information
 * @returns Promise with result
 */
export async function addSubscriber(subscriber: EmailSubscriber) {
  const normalizedEmail = subscriber.email.trim().toLowerCase();
  const timestamp = new Date().toISOString();
  const resourceSlug = String(subscriber.metadata?.leadMagnetSlug ?? subscriber.tags?.[0] ?? 'unknown');
  const resourceTitle = String(subscriber.metadata?.leadMagnetTitle ?? resourceSlug);

  // 1. Persist subscriber in Upstash Redis when configured
  const redis = getRedisClient();
  if (redis) {
    try {
      const subscriberKey = `lead-magnet:subscriber:${normalizedEmail}`;
      await Promise.all([
        redis.sadd('lead-magnet:subscribers', normalizedEmail),
        redis.hset(subscriberKey, {
          email: normalizedEmail,
          name: subscriber.name ?? '',
          source: subscriber.source,
          lastResourceSlug: resourceSlug,
          lastResourceTitle: resourceTitle,
          updatedAt: timestamp,
        }),
        redis.sadd(`${subscriberKey}:resources`, resourceSlug),
        redis.lpush(
          'lead-magnet:downloads:log',
          JSON.stringify({
            email: normalizedEmail,
            name: subscriber.name ?? '',
            resourceSlug,
            resourceTitle,
            timestamp,
          })
        ),
      ]);
    } catch (redisErr) {
      console.warn('Failed to persist subscriber in Upstash Redis:', redisErr);
    }
  }

  // 2. Send a non-blocking lead notification to CONTACT_TO when Resend is configured
  if (
    process.env.RESEND_API_KEY &&
    process.env.RESEND_API_KEY !== 're_dummy_key_for_ci_builds' &&
    process.env.NODE_ENV !== 'test'
  ) {
    try {
      await resend.emails.send({
        from: 'Portfolio Leads <contact@amilemia.dev>',
        to: env.CONTACT_TO,
        replyTo: normalizedEmail,
        subject: `New Lead Magnet Download: ${subscriber.name || normalizedEmail} (${resourceTitle})`,
        text: [
          `A visitor just downloaded a free workbook on amilemia.dev:`,
          ``,
          `Name: ${subscriber.name || 'Not provided'}`,
          `Email: ${normalizedEmail}`,
          `Resource: ${resourceTitle} (${resourceSlug})`,
          `Time: ${timestamp}`,
          ``,
          `Tip: You can reply directly to this email in 2–3 days to offer a quick audit related to "${resourceTitle}".`,
        ].join('\n'),
      });
    } catch (notifyErr) {
      console.warn('Failed to send lead notification email:', notifyErr);
    }
  }

  console.log('New subscriber recorded:', {
    email: normalizedEmail,
    name: subscriber.name,
    source: subscriber.source,
    tags: subscriber.tags,
    timestamp,
  });

  return { success: true };
}
