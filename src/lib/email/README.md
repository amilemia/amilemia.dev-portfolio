# Email System

This directory contains the email delivery system using Resend.

## Overview

The email system handles:
- Lead magnet delivery with download links
- Email subscriber management
- Future: Welcome emails and nurture sequences

## Files

### `resend-client.ts`
Core Resend integration with email sending functions.

**Key Functions:**
- `sendLeadMagnetEmail(data)` - Send lead magnet with download link
- `addSubscriber(subscriber)` - Add subscriber to email list (placeholder for future implementation)

**Usage:**
```typescript
import { sendLeadMagnetEmail } from '@/lib/email/resend-client';

await sendLeadMagnetEmail({
  recipientName: 'John Doe',
  recipientEmail: 'john@example.com',
  leadMagnetTitle: 'Web Performance Checklist',
  downloadUrl: 'https://amilemia.dev/resources/checklist.pdf',
  expirationDays: 7,
});
```

### `templates/lead-magnet.tsx`
Email template documentation and structure for lead magnet delivery.

**Features:**
- Personalized greeting
- Download button with clear CTA
- Expiration notice (default 7 days)
- Cross-promotion to other resources
- Mobile-responsive HTML
- Plain text fallback

## Configuration

### Environment Variables

Required in `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://amilemia.dev
```

### Email Sender

Currently using: `Portfolio <onboarding@resend.dev>`

For production, update to your verified domain:
```typescript
from: 'Your Name <hello@yourdomain.com>'
```

## Email Delivery

### Timing
- Emails are sent immediately upon API call
- Target: Within 2 minutes of capture (typically <10 seconds)

### Expiration
- Download links expire after 7 days (configurable)
- Expiration is communicated clearly in the email

### Tracking
- Email sends are logged to console
- Subscriber information is captured for future nurture campaigns
- Integration with analytics for conversion tracking

## Future Enhancements

### Planned Features
1. **Welcome Email Sequence**
   - Automated welcome email on subscription
   - Resource library introduction
   - Expectation setting for future emails

2. **Nurture Campaign**
   - 6-email sequence over 30 days
   - Case studies and tips
   - Special offers for non-converters

3. **Email Engagement Tracking**
   - Open rate tracking with 1x1 pixel
   - Click tracking with redirect URLs
   - Engagement-based personalization

4. **Audience Management**
   - Resend Audiences API integration (requires paid plan)
   - Subscriber segmentation by tags
   - Automated list management

### Integration Points

**Current:**
- `/api/lead-magnets/capture` - Lead magnet email delivery

**Future:**
- `/api/subscribe` - Newsletter subscription
- `/api/email/track` - Engagement tracking
- Webhook handlers for email events

## Testing

Run tests:
```bash
npm run test -- src/lib/email/__tests__/resend-client.test.ts
```

### Test Coverage
- Data structure validation
- Email template generation
- URL construction
- Expiration date calculation

### Manual Testing
1. Set up Resend API key in `.env.local`
2. Create a test lead magnet in Contentlayer
3. Submit email capture form
4. Verify email delivery and formatting

## Troubleshooting

### Email Not Sending
1. Check `RESEND_API_KEY` is set correctly
2. Verify Resend account is active
3. Check console logs for error messages
4. Ensure rate limits are not exceeded

### Email Formatting Issues
1. Test in multiple email clients (Gmail, Outlook, Apple Mail)
2. Verify HTML is valid and tables are used for layout
3. Check plain text fallback is readable
4. Test on mobile devices

### Download Links Not Working
1. Verify `NEXT_PUBLIC_SITE_URL` is set correctly
2. Check file exists at specified path
3. Ensure file is in `/public` directory
4. Test absolute URL generation

## Best Practices

1. **Always provide plain text fallback** - Some email clients don't support HTML
2. **Use absolute URLs** - Relative URLs don't work in emails
3. **Test across email clients** - Rendering varies significantly
4. **Keep HTML simple** - Use tables for layout, inline CSS
5. **Include unsubscribe link** - Required for compliance (future)
6. **Monitor deliverability** - Check spam rates and bounces
7. **Respect rate limits** - Implement proper rate limiting
8. **Log all sends** - For debugging and analytics

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Email Design Best Practices](https://www.campaignmonitor.com/dev-resources/guides/design/)
- [HTML Email Templates](https://github.com/leemunroe/responsive-html-email-template)
- [React Email Components](https://react.email/) (optional enhancement)
