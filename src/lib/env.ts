import { z } from 'zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required'),
  CONTACT_TO: z.string().email('CONTACT_TO must be a valid email address'),
});

type EnvSchema = z.infer<typeof envSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchema {}
  }
}

// Validate environment variables at runtime
function getEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
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
