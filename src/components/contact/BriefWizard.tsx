'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { postContact } from '@/lib/api/client';
import { track } from '@/lib/analytics/track';

const projectScopeOptions = [
  { value: 'portfolio-site', label: 'Portfolio site' },
  { value: 'marketing-site', label: 'Marketing site' },
  { value: 'app-features', label: 'App features' },
] as const;

type ProjectScopeValue = typeof projectScopeOptions[number]['value'];

const budgetValues = ['under-5k', '5k-10k', '10k-25k', '25k-plus'] as const;

type BudgetValue = typeof budgetValues[number];

const budgetLabels: Record<BudgetValue, string> = {
  'under-5k': 'Under $5k',
  '5k-10k': '$5k - $10k',
  '10k-25k': '$10k - $25k',
  '25k-plus': '$25k+',
};

const budgetOptions = budgetValues.map((value) => ({
  value,
  label: budgetLabels[value],
}));

function getBudgetLabel(value: BudgetValue): string {
  return budgetLabels[value];
}

const stepTitles = ['About you', 'Project scope', 'Budget & timeline', 'Review & submit'] as const;
const stepDescriptions = [
  'Let me know how to reach you.',
  'Select what you need and share your goals.',
  'Clarify budget and schedule expectations.',
  'Double-check everything before sending.',
] as const;

const budgetFieldSchema = z.enum(budgetValues);

const BriefSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  projectScope: z
    .array(
      z.enum(
        projectScopeOptions.map((option) => option.value) as [ProjectScopeValue, ...ProjectScopeValue[]]
      )
    )
    .min(1, 'Select at least one project scope'),
  goals: z
    .string()
    .min(10, 'Please describe your goals in a bit more detail (10+ characters)')
    .max(2000, 'Goals must be less than 2000 characters'),
  budgetRange: budgetFieldSchema,
  startDate: z
    .string()
    .min(1, 'Select a desired start date')
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: 'Select a valid start date',
    }),
  timelineNotes: z
    .string()
    .max(500, 'Please keep timing notes under 500 characters'),
});

export type BriefFormValues = z.infer<typeof BriefSchema>;

type StepIndex = 0 | 1 | 2 | 3;

const TOTAL_STEPS = 3;
const SUMMARY_STEP = 3;

const stepFieldMap: Record<Exclude<StepIndex, 3>, Array<keyof BriefFormValues>> = {
  0: ['name', 'email'],
  1: ['projectScope', 'goals'],
  2: ['budgetRange', 'startDate', 'timelineNotes'],
};

function formatDateForDisplay(value: string) {
  if (!value) return 'Not specified';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function buildMessage(values: BriefFormValues) {
  const scopeList = values.projectScope
    .map((scope) => {
      const option = projectScopeOptions.find((item) => item.value === scope);
      return option ? option.label : scope;
    })
    .join(', ');

  const budgetLabel = getBudgetLabel(values.budgetRange);

  const lines = [
    'New project brief submitted via contact wizard:',
    '',
    'Project scope: ' + scopeList,
    'Goals: ' + values.goals,
    'Budget range: ' + budgetLabel,
    'Desired start date: ' + formatDateForDisplay(values.startDate),
    'Timing notes: ' + (values.timelineNotes ? values.timelineNotes : 'Not provided'),
  ];

  return lines.join('\n');
}

export function BriefWizard() {
  const [step, setStep] = useState<StepIndex>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const projectScopeLabelId = useId();

  const form = useForm<BriefFormValues>({
    resolver: zodResolver(BriefSchema),
    defaultValues: {
      name: '',
      email: '',
      projectScope: [],
      goals: '',
      budgetRange: 'under-5k',
      startDate: '',
      timelineNotes: '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  async function handleNext() {
    const fields = stepFieldMap[step as Exclude<StepIndex, 3>];

    if (!fields) {
      setStep((prev) => (prev < SUMMARY_STEP ? ((prev + 1) as StepIndex) : prev));
      return;
    }

    const isValid = await form.trigger(fields, { shouldFocus: true });
    if (!isValid) {
      return;
    }

    setStep((prev) => ((prev + 1) as StepIndex));
  }

  function handleBack() {
    setStep((prev) => (prev > 0 ? ((prev - 1) as StepIndex) : prev));
  }

  const onSubmit: SubmitHandler<BriefFormValues> = async (values) => {
    try {
      setIsSubmitting(true);

      const message = buildMessage(values);
      const result = await postContact({
        name: values.name,
        email: values.email,
        message,
      });

      if (!result.ok) {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            const fieldName = field as keyof BriefFormValues;
            form.setError(fieldName, {
              type: 'manual',
              message: messages.join(', '),
            });
          });
          const firstField = Object.keys(result.fieldErrors)[0] as keyof BriefFormValues;
          if (firstField) {
            form.setFocus(firstField);
          }
          setStep(0);
          return;
        }
        throw new Error(result.error || 'Failed to send message');
      }

      toast.success('Brief sent!');
      track('Contact: Brief Submitted', {
        budget: values.budgetRange,
        timeline: values.startDate,
      });
      form.reset();
      setStep(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Brief submission error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showBack = step > 0;
  const displayStep = Math.min(step, SUMMARY_STEP - 1) + 1;
  const summaryValues = form.getValues();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" aria-live="polite">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground" data-testid="brief-step-13">
            Step {displayStep} of {TOTAL_STEPS}
          </p>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-2xl font-semibold tracking-tight focus:outline-none"
          >
            {stepTitles[step]}
          </h2>
          <p className="text-muted-foreground">{stepDescriptions[step]}</p>
        </div>

        {step === 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField<BriefFormValues>
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contact-name">Name</FormLabel>
                  <FormControl>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      data-testid="name-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage aria-live="polite" />
                </FormItem>
              )}
            />

            <FormField<BriefFormValues>
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contact-email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your.email@example.com"
                      data-testid="email-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage aria-live="polite" />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <FormField<BriefFormValues>
              control={form.control}
              name="projectScope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel id={projectScopeLabelId}>Project scope</FormLabel>
                  <FormControl>
                    <div className="space-y-3" role="group" aria-labelledby={projectScopeLabelId}>
                      {projectScopeOptions.map((option) => {
                        const selected: ProjectScopeValue[] = Array.isArray(field.value)
                          ? field.value
                          : [];
                        const checked = selected.includes(option.value);
                        return (
                          <label
                            key={option.value}
                            className="flex items-start gap-3 rounded border border-border p-3 text-sm hover:border-primary focus-within:border-primary"
                          >
                            <input
                              type="checkbox"
                              className="mt-1 h-4 w-4"
                              checked={checked}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  field.onChange([...selected, option.value]);
                                } else {
                                  field.onChange(selected.filter((item) => item !== option.value));
                                }
                              }}
                              onBlur={field.onBlur}
                              value={option.value}
                            />
                            <span className="leading-6 text-foreground">{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage aria-live="polite" />
                </FormItem>
              )}
            />

            <FormField<BriefFormValues>
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="project-goals">Project goals</FormLabel>
                  <FormControl>
                    <Textarea
                      id="project-goals"
                      placeholder="Share objectives, success metrics, audience, or other helpful context."
                      className="min-h-[150px]"
                      data-testid="message-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage aria-live="polite" />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <FormField<BriefFormValues>
              control={form.control}
              name="budgetRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="budget-range">Budget range</FormLabel>
                  <FormControl>
                    <select
                      id="budget-range"
                      className="h-11 rounded border border-input bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      data-testid="budget-select"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      <option value="" disabled>
                        Select budget
                      </option>
                      {budgetOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage aria-live="polite" />
                </FormItem>
              )}
            />

            <FormField<BriefFormValues>
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="start-date">Desired start date</FormLabel>
                  <FormControl>
                    <Input
                      id="start-date"
                      type="date"
                      data-testid="start-date-input"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage aria-live="polite" />
                </FormItem>
              )}
            />

            <FormField<BriefFormValues>
              control={form.control}
              name="timelineNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="timeline-notes">Timing notes</FormLabel>
                  <FormControl>
                    <Textarea
                      id="timeline-notes"
                      placeholder="Share milestone deadlines, launch targets, or other timing context."
                      className="min-h-[120px]"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage aria-live="polite" />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6" role="region" aria-live="polite">
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">About you</h3>
                <Button type="button" variant="ghost" size="sm" onClick={() => setStep(0)}>
                  Edit
                </Button>
              </div>
              <dl className="mt-2 space-y-1 text-sm">
                <div>
                  <dt className="font-medium text-muted-foreground">Name</dt>
                  <dd>{summaryValues.name}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Email</dt>
                  <dd>{summaryValues.email}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Project scope</h3>
                <Button type="button" variant="ghost" size="sm" onClick={() => setStep(1)}>
                  Edit
                </Button>
              </div>
              <dl className="mt-2 space-y-1 text-sm">
                <div>
                  <dt className="font-medium text-muted-foreground">Scope</dt>
                  <dd>
                    {summaryValues.projectScope
                      .map((scope) => projectScopeOptions.find((option) => option.value === scope)?.label ?? scope)
                      .join(', ')}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Goals</dt>
                  <dd className="whitespace-pre-line">{summaryValues.goals}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Budget & timeline</h3>
                <Button type="button" variant="ghost" size="sm" onClick={() => setStep(2)}>
                  Edit
                </Button>
              </div>
              <dl className="mt-2 space-y-1 text-sm">
                <div>
                  <dt className="font-medium text-muted-foreground">Budget</dt>
                  <dd>{getBudgetLabel(summaryValues.budgetRange)}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Desired start</dt>
                  <dd>{formatDateForDisplay(summaryValues.startDate)}</dd>
                </div>
                <div>
                  <dt className="font-medium text-muted-foreground">Timing notes</dt>
                  <dd className="whitespace-pre-line">{summaryValues.timelineNotes || 'Not provided'}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          {showBack && (
            <Button type="button" variant="outline" onClick={handleBack} data-testid="brief-back">
              Back
            </Button>
          )}

          {step < SUMMARY_STEP ? (
            <Button type="button" onClick={handleNext} data-testid="brief-next">
              Next
            </Button>
          ) : (
            <div data-testid="brief-submit" className="sm:ml-auto">
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                data-testid="submit-button"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send brief'}
              </Button>
            </div>
          )}
        </div>

        <div role="status" aria-live="polite" className="sr-only">
          {isSubmitting ? 'Sending your brief...' : 'Step ' + displayStep + ' of ' + TOTAL_STEPS}
        </div>
      </form>
    </Form>
  );
}

export default BriefWizard;
