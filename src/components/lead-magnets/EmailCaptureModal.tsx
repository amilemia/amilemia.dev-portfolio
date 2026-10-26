'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Mail, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { track, EVENTS } from '@/lib/analytics/track';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const emailCaptureSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
});

type EmailCaptureFormData = z.infer<typeof emailCaptureSchema>;

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadMagnetSlug: string;
  leadMagnetTitle: string;
  fileUrl?: string;
  onSuccess?: (newDownloadCount?: number) => void;
}

export function EmailCaptureModal({
  isOpen,
  onClose,
  leadMagnetSlug,
  leadMagnetTitle,
  fileUrl,
  onSuccess,
}: EmailCaptureModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [directDownloadUrl, setDirectDownloadUrl] = useState<string | undefined>(fileUrl);

  const form = useForm<EmailCaptureFormData>({
    resolver: zodResolver(emailCaptureSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const handleSubmit = async (data: EmailCaptureFormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch('/api/lead-magnets/capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          leadMagnetSlug,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Failed to send resource');
      }

      if (payload.downloadUrl) {
        setDirectDownloadUrl(payload.downloadUrl);
      }

      setIsSuccess(true);
      toast.success('Check your email! Your resource is ready.');
      
      // Track download event for analytics and retargeting
      track(EVENTS.DOWNLOAD, {
        type: 'lead_magnet',
        slug: leadMagnetSlug,
        title: leadMagnetTitle,
      });
      
      if (onSuccess) {
        onSuccess(typeof payload.downloadCount === 'number' ? payload.downloadCount : undefined);
      }
    } catch (error) {
      console.error('Email capture error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to send resource. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-6 shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-capture-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h2 id="email-capture-title" className="text-2xl font-semibold tracking-tight">
                Get Your Free Resource
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your email and we&apos;ll send you <strong>{leadMagnetTitle}</strong> right
                away.
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="lead-magnet-name">Name</FormLabel>
                      <FormControl>
                        <Input
                          id="lead-magnet-name"
                          type="text"
                          inputMode="text"
                          autoComplete="name"
                          placeholder="Your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="lead-magnet-email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="lead-magnet-email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Me the Resource'}
                </Button>
              </form>
            </Form>

            {/* Privacy Notice */}
            <p className="mt-4 text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time. By submitting, you agree to receive
              occasional emails with helpful resources and updates.
            </p>
          </>
        ) : (
          /* Success State */
          <div className="py-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Resource Ready!</h3>
              <p className="text-sm text-muted-foreground">
                We&apos;ve sent <strong>{leadMagnetTitle}</strong> to your inbox, and you can also download the PDF directly below:
              </p>
            </div>
            {(directDownloadUrl || fileUrl) && (
              <div className="pt-2">
                <Button asChild className="w-full" variant="premium">
                  <a
                    href={directDownloadUrl || fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF Now
                  </a>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
