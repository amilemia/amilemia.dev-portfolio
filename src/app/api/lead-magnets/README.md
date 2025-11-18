# Lead Magnet API Endpoints

This directory contains API endpoints for managing lead magnet downloads and email capture.

## Endpoints

### POST `/api/lead-magnets/capture`

Captures user email and name, then sends the requested lead magnet resource via email.

#### Request Body

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "leadMagnetSlug": "web-performance-checklist"
}
```

#### Validation

- `email`: Must be a valid email address
- `name`: Must be at least 2 characters
- `leadMagnetSlug`: Must be a non-empty string matching an existing lead magnet

#### Rate Limiting

- **Limit**: 5 requests per minute per IP address
- **Response Headers** (when rate limited):
  - `X-RateLimit-Limit`: Maximum requests allowed
  - `X-RateLimit-Remaining`: Requests remaining in current window
  - `X-RateLimit-Reset`: Timestamp when the limit resets

#### Success Response

**Status Code**: `200 OK`

```json
{
  "success": true,
  "message": "Check your email for the download link!",
  "leadMagnet": {
    "title": "Web Performance Checklist",
    "slug": "web-performance-checklist"
  }
}
```

#### Error Responses

**Status Code**: `400 Bad Request` - Invalid input

```json
{
  "success": false,
  "errors": {
    "email": ["Please enter a valid email address"],
    "name": ["Name must be at least 2 characters"]
  }
}
```

**Status Code**: `404 Not Found` - Lead magnet not found

```json
{
  "success": false,
  "message": "Lead magnet not found"
}
```

**Status Code**: `429 Too Many Requests` - Rate limit exceeded

```json
{
  "success": false,
  "message": "Too many requests. Please try again later."
}
```

**Status Code**: `500 Internal Server Error` - Server error

```json
{
  "success": false,
  "message": "An unexpected error occurred"
}
```

## Features

### ✅ Email Validation
Uses Zod schema validation to ensure email addresses are valid and names meet minimum length requirements.

### ✅ Rate Limiting
Implements Upstash Redis-based rate limiting to prevent abuse:
- 5 requests per minute per IP address
- Sliding window algorithm for smooth rate limiting
- Analytics tracking enabled

### ✅ Email Delivery
Sends lead magnet download links via Resend:
- HTML and plain text email formats
- Direct download link to the resource
- 7-day link expiration notice
- Professional email template

### ✅ Analytics Tracking
Logs download events for analytics:
- Lead magnet slug
- User email (for internal tracking)
- Timestamp

### ✅ Error Handling
Comprehensive error handling with appropriate HTTP status codes and user-friendly error messages.

## Environment Variables

Required environment variables (configured in `.env.local`):

```env
# Resend API key for email delivery
RESEND_API_KEY=re_xxxxx

# Email address to send contact form submissions to
CONTACT_TO=your-email@example.com

# Upstash Redis credentials (for rate limiting)
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx

# Site URL for email links
NEXT_PUBLIC_SITE_URL=https://amilemia.dev
```

## Usage Example

### Client-Side (React Component)

```typescript
const handleDownload = async (email: string, name: string, slug: string) => {
  try {
    const response = await fetch('/api/lead-magnets/capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        leadMagnetSlug: slug,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send resource');
    }

    const data = await response.json();
    console.log('Success:', data.message);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Testing

Run validation tests:

```bash
npm run test -- src/lib/validation/__tests__/lead-magnet.test.ts
```

## Security Considerations

1. **Rate Limiting**: Prevents abuse and spam by limiting requests per IP
2. **Input Validation**: All inputs are validated using Zod schemas
3. **CORS**: Configured to allow requests from the same origin
4. **Error Messages**: Generic error messages to avoid information leakage
5. **Email Validation**: Ensures only valid email addresses are accepted

## Future Enhancements

- [ ] Add email list integration (e.g., Mailchimp, ConvertKit)
- [ ] Implement download token system with expiration
- [ ] Add A/B testing for email templates
- [ ] Track email open rates and click-through rates
- [ ] Add GDPR consent tracking
- [ ] Implement email verification before sending resource
