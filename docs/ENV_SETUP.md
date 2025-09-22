# Environment Variables Setup

Create a `.env.local` file in the root of your project with the following variables:

```env
# Required for sending emails through Resend
RESEND_API_KEY=your_resend_api_key_here

# The email address where contact form submissions will be sent
CONTACT_TO=your_verified_email@example.com

# Analytics (leave empty to disable)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your_domain.com
```

## Development Notes

- For development, you can use the Resend test domain `onboarding@resend.dev` as the `from` address without additional setup.
- For production, make sure to:
  1. Verify your domain with Resend
  2. Use a verified `from` email address
  3. Set up proper SPF, DKIM, and DMARC records for better email deliverability

## Testing

To test the contact form locally:

1. Sign up at [Resend](https://resend.com) and get an API key
2. Add the required environment variables to `.env.local`
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Navigate to `/contact` and submit the form
5. Check your email inbox for the test message

## Deployment

Make sure to set the environment variables in your hosting provider's settings. For Vercel, you can add them in the project settings under "Environment Variables".
