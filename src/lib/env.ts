import { z } from 'zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  CONTACT_TO: z.string().email('CONTACT_TO must be a valid email address'),
});

// Validate environment variables at runtime
function getEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    // Skip strict validation during build or Vercel preview to prevent build failures
    if (
      process.env.npm_lifecycle_event === 'build' ||
      process.env.VERCEL_ENV === 'preview' ||
      process.env.CI === 'true' ||
      process.env.NODE_ENV === 'development'
    ) {
      console.warn('⚠️ Missing environment variables, using dummy values for build/preview');
      return {
        RESEND_API_KEY: process.env.RESEND_API_KEY || 'dummy_key_for_build',
        CONTACT_TO: process.env.CONTACT_TO || 'dummy@example.com',
      };
    }

    if (error instanceof z.ZodError) {
      const { fieldErrors } = error.flatten();
      const errorMessage = Object.entries(fieldErrors)
        .map(([field, errors]) => {
          const errorMessages = Array.isArray(errors) ? errors : [];
          return errorMessages.length > 0 
            ? `${field}: ${errorMessages.join(', ')}` 
            : field;
        })
        .join('\n  ');
      throw new Error(`Missing or invalid environment variables:\n  ${errorMessage}`);
    }
    throw error;
  }
}

export const env = getEnv();
