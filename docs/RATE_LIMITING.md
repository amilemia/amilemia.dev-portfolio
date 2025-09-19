# Rate Limiting Setup

This project uses Upstash Redis for rate limiting the contact form API. Here's how to set it up:

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Upstash Redis Configuration (for rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token

# Resend Configuration
RESEND_API_KEY=your_resend_api_key
CONTACT_TO=your_verified_email@example.com
```

## Getting Upstash Redis Credentials

1. Sign up at [Upstash](https://upstash.com/) if you haven't already
2. Create a new Redis database
3. In the database settings, find your REST URL and token
4. Add them to your `.env.local` file

## Rate Limit Settings

Current rate limiting is configured as follows:
- **Requests**: 3 per minute per IP address
- **Window**: 1 minute sliding window
- **Storage**: Upstash Redis

## Testing Rate Limiting

You can test the rate limiting using cURL:

```bash
# Test with multiple requests
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User", "email":"test@example.com", "message":"Test message '${i}'"}'
  echo "\n---"
done
```

After 3 requests, you should receive a 429 Too Many Requests response.

## Monitoring

You can monitor your rate limits and analytics in the Upstash dashboard.
