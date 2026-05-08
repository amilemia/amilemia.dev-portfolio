# Email System Integration Guide

This guide shows how the Resend email delivery system integrates with the lead magnet capture flow.

## Architecture Overview

```
User submits email
       ↓
EmailCaptureModal (Component)
       ↓
POST /api/lead-magnets/capture (API Route)
       ↓
sendLeadMagnetEmail() (Resend Client)
       ↓
Resend API
       ↓
Email delivered to user
```

## Complete Flow

### 1. User Interaction

User clicks "Download" on a lead magnet card:

```tsx
// src/components/lead-magnets/LeadMagnetCard.tsx
<Button onClick={() => setShowModal(true)}>
  Download Free Guide
</Button>

<EmailCaptureModal
  leadMagnetSlug={leadMagnet.slug}
  isOpen={showModal}
  onClose={() => setShowModal(false)}
/>
```

### 2. Email Capture

User enters their information:

```tsx
// src/components/lead-magnets/EmailCaptureModal.tsx
const onSubmit = async (data: { name: string; email: string }) => {
  const response = await fetch('/api/lead-magnets/capture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      leadMagnetSlug: leadMagnetSlug,
    }),
  });
  
  if (response.ok) {
    toast.success('Check your email for the download link!');
  }
};
```

### 3. API Processing

The API route handles the request:

```typescript
// src/app/api/lead-magnets/capture/route.ts
export async function POST(request: Request) {
  // 1. Rate limiting check
  const { success } = await ratelimit.limit(ip);
  if (!success) return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
  
  // 2. Validate input
  const validation = LeadMagnetCaptureSchema.safeParse(body);
  if (!validation.success) return Response.json({ errors: validation.error }, { status: 400 });
  
  // 3. Find lead magnet
  const leadMagnet = allLeadMagnets.find(lm => lm.slug === leadMagnetSlug);
  if (!leadMagnet) return Response.json({ error: 'Not found' }, { status: 404 });
  
  // 4. Send email
  const { error } = await sendLeadMagnetEmail({
    recipientName: name,
    recipientEmail: email,
    leadMagnetTitle: leadMagnet.title,
    downloadUrl: absoluteUrl(leadMagnet.fileUrl),
    expirationDays: 7,
  });
  
  // 5. Add to subscriber list
  await addSubscriber({
    email,
    name,
    source: 'lead_magnet',
    tags: [leadMagnetSlug],
  });
  
  return Response.json({ success: true });
}
```

### 4. Email Delivery

The Resend client sends the email:

```typescript
// src/lib/email/resend-client.ts
export async function sendLeadMagnetEmail(data: LeadMagnetEmailData) {
  const result = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: data.recipientEmail,
    subject: `Your ${data.leadMagnetTitle} is ready!`,
    html: generateLeadMagnetEmailHTML(data),
    text: generateLeadMagnetEmailText(data),
  });
  
  return result;
}
```

### 5. User Receives Email

The user receives a professionally formatted email with:
- Personalized greeting
- Download button
- Expiration notice (7 days)
- Cross-promotion to other resources

## Email Template Structure

### HTML Version

```html
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background-color: #f5f5f5;">
  <table style="width: 600px; background-color: #ffffff;">
    <tr>
      <td style="padding: 40px;">
        <h1>Hi {{recipientName}},</h1>
        <p>Thanks for downloading <strong>{{leadMagnetTitle}}</strong>!</p>
        <a href="{{downloadUrl}}" style="background-color: #000; color: #fff; padding: 14px 32px;">
          Download Now
        </a>
        <p style="color: #888;">This link will remain active for {{expirationDays}} days.</p>
      </td>
    </tr>
  </table>
</body>
</html>
```

### Plain Text Version

```
Hi {{recipientName}},

Thanks for downloading {{leadMagnetTitle}}!

Download your resource here:
{{downloadUrl}}

This link will remain active for {{expirationDays}} days.

Want more resources? Check out my latest projects at https://amilemia.dev/projects
```

## Configuration

### Environment Variables

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://amilemia.dev
CONTACT_TO=hello@amilemia.dev
```

### Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Verify your sending domain (optional, for production)
4. Add API key to `.env.local`

## Testing

### Manual Testing

1. Start the development server:
```bash
npm run dev
```

2. Navigate to a page with a lead magnet
3. Click "Download" and enter your email
4. Check your inbox for the email

### Automated Testing

```bash
# Run all tests
npm run test

# Run email-specific tests
npm run test -- src/lib/email/__tests__/resend-client.test.ts
npm run test -- src/lib/validation/__tests__/lead-magnet.test.ts
```

## Monitoring

### Success Metrics

Track these metrics to ensure the system is working:

1. **Email Delivery Rate**: % of emails successfully sent
2. **Email Open Rate**: % of emails opened (requires tracking pixel)
3. **Download Click Rate**: % of recipients who click download
4. **Time to Delivery**: Time from capture to email receipt (target: <2 minutes)

### Logging

The system logs important events:

```typescript
// Email sent successfully
console.log('Lead magnet download tracked:', {
  event: 'lead_magnet_download',
  leadMagnetSlug,
  leadMagnetTitle,
  email,
  timestamp: new Date().toISOString(),
});

// Subscriber added
console.log('New subscriber:', {
  email,
  name,
  source: 'lead_magnet',
  tags,
  timestamp: new Date().toISOString(),
});
```

### Error Handling

Common errors and solutions:

| Error | Cause | Solution |
|-------|-------|----------|
| `RESEND_API_KEY is required` | Missing API key | Add to `.env.local` |
| `Rate limit exceeded` | Too many requests | Wait 1 minute |
| `Lead magnet not found` | Invalid slug | Check Contentlayer data |
| `Failed to send email` | Resend API error | Check API key and logs |

## Performance

### Timing Benchmarks

- **API Response Time**: <500ms
- **Email Delivery**: <10 seconds (typically 2-5 seconds)
- **Total User Wait**: <15 seconds from submit to email receipt

### Rate Limiting

- **Limit**: 5 requests per minute per IP
- **Window**: Sliding window (Upstash)
- **Response**: 429 status with retry headers

## Security

### Data Protection

1. **Email Validation**: Zod schema validation
2. **Rate Limiting**: Prevents abuse
3. **No Storage**: Emails not stored in database (privacy-first)
4. **HTTPS Only**: All communications encrypted

### Best Practices

- Never log sensitive data (full emails, names)
- Use environment variables for secrets
- Implement proper error handling
- Monitor for suspicious activity

## Future Enhancements

### Planned Features

1. **Email Engagement Tracking**
   - Open tracking with 1x1 pixel
   - Click tracking with redirect URLs
   - Engagement-based personalization

2. **Automated Nurture Sequence**
   - Welcome email on subscription
   - 6-email sequence over 30 days
   - Special offers for non-converters

3. **Advanced Subscriber Management**
   - Resend Audiences API integration
   - Segmentation by tags and behavior
   - Automated list cleanup

4. **A/B Testing**
   - Test subject lines
   - Test email designs
   - Test send times

## Support

For issues or questions:

1. Check the [Resend Documentation](https://resend.com/docs)
2. Review error logs in console
3. Test with Resend's test mode
4. Contact support if needed

## Resources

- [Resend API Reference](https://resend.com/docs/api-reference)
- [Email Best Practices](https://www.campaignmonitor.com/resources/guides/)
- [HTML Email Guide](https://www.smashingmagazine.com/2021/04/complete-guide-html-email-templates-tools/)
- [React Email](https://react.email/) (optional enhancement)
