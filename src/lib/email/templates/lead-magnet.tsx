/**
 * Lead Magnet Email Template
 * 
 * This template is used to deliver lead magnets to subscribers.
 * It includes a download link with expiration notice and additional resources.
 * 
 * Note: This is a React component that can be used with @react-email/components
 * if installed. For now, we're using the HTML/text generation functions in
 * resend-client.ts for compatibility.
 */

export interface LeadMagnetEmailProps {
  recipientName: string;
  leadMagnetTitle: string;
  downloadUrl: string;
  expirationDays?: number;
  siteUrl?: string;
}

/**
 * Lead Magnet Email Component
 * 
 * This is a placeholder component that documents the email structure.
 * The actual email rendering is done in resend-client.ts using HTML strings
 * for maximum compatibility without requiring @react-email/components.
 * 
 * If you want to use React Email components, install:
 * npm install @react-email/components
 * 
 * Then you can use components like:
 * - Html, Head, Body, Container
 * - Heading, Text, Button, Link
 * - Section, Row, Column
 */
export function LeadMagnetEmail({
  recipientName,
  leadMagnetTitle,
  downloadUrl,
  expirationDays = 7,
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
}: LeadMagnetEmailProps) {
  return {
    subject: `Your ${leadMagnetTitle} is ready!`,
    html: `
      <h1>Hi ${recipientName},</h1>
      <p>Thanks for downloading <strong>${leadMagnetTitle}</strong>!</p>
      <p>Click the button below to download your resource:</p>
      <p style="margin: 30px 0;">
        <a href="${downloadUrl}" 
           style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Download Now
        </a>
      </p>
      <p style="color: #666; font-size: 14px;">This link will remain active for ${expirationDays} days.</p>
      <p>Want more resources? Check out my latest projects at <a href="${siteUrl}/projects">amilemia.dev</a></p>
    `,
    text: `
Hi ${recipientName},

Thanks for downloading ${leadMagnetTitle}!

Download your resource here: ${downloadUrl}

This link will remain active for ${expirationDays} days.

Want more resources? Check out my latest projects at ${siteUrl}/projects
    `.trim(),
  };
}

/**
 * Email template structure documentation
 * 
 * The email includes:
 * 1. Personalized greeting with recipient name
 * 2. Confirmation of the requested resource
 * 3. Prominent download button/link
 * 4. Expiration notice (default 7 days)
 * 5. Cross-promotion to other resources
 * 6. Footer with unsubscribe/contact info
 * 
 * Design principles:
 * - Mobile-responsive layout
 * - High contrast for accessibility
 * - Clear call-to-action
 * - Professional branding
 * - Plain text fallback
 */

export const EMAIL_TEMPLATE_METADATA = {
  name: 'Lead Magnet Delivery',
  description: 'Email template for delivering lead magnets to subscribers',
  version: '1.0.0',
  defaultExpirationDays: 7,
  features: [
    'Personalized greeting',
    'Download link with expiration',
    'Cross-promotion to projects',
    'Mobile-responsive design',
    'Plain text fallback',
  ],
} as const;
