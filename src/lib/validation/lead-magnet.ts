import { z } from 'zod';

export const LeadMagnetCaptureSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  leadMagnetSlug: z.string().min(1, 'Lead magnet slug is required'),
});

export type LeadMagnetCaptureInput = z.infer<typeof LeadMagnetCaptureSchema>;
