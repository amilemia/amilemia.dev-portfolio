"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postContact } from "@/lib/api/client";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n";
import { interpolate } from "@/i18n/interpolate";
import { ExitIntentModal, loadSavedProgress, clearSavedProgress } from "./ExitIntentModal";

export type ContactFormMessages = {
  steps: {
    titles: string[];
    descriptions: string[];
  };
  fields: {
    name: {
      label: string;
      placeholder: string;
      errors: { minLength: string };
    };
    email: {
      label: string;
      placeholder: string;
      errors: { invalid: string };
    };
    projectScope: {
      label: string;
      options: Array<{ value: string; label: string }>;
      errors: { min: string };
    };
    goals: {
      label: string;
      placeholder: string;
      errors: { min: string; max: string };
    };
    budgetRange: {
      label: string;
      placeholder: string;
      options: Array<{ value: string; label: string }>;
    };
    startDate: {
      label: string;
      placeholder: string;
      errors: { required: string; invalid: string };
    };
    timelineNotes: {
      label: string;
      placeholder: string;
      errors: { max: string };
    };
  };
  review: {
    sectionTitles: {
      about: string;
      scope: string;
      budget: string;
    };
    edit: string;
    fields: {
      name: string;
      email: string;
      scope: string;
      goals: string;
      budget: string;
      startDate: string;
      notes: string;
    };
    notProvided: string;
  };
  buttons: {
    back: string;
    next: string;
    submit: string;
    submitting: string;
  };
  status: {
    sending: string;
    step: string;
  };
  notifications: {
    success: string;
    error: string;
  };
  messageTemplate: {
    intro: string;
    scope: string;
    goals: string;
    budget: string;
    desiredStart: string;
    timingNotes: string;
    fallbackNotes: string;
  };
  formatting: {
    dateNotSpecified: string;
  };
  successStep: {
    title: string;
    description: string;
    bookingTitle: string;
    bookingDescription: string;
    button: string;
    fallback: string;
  };
};

type BriefWizardProps = {
  locale: Locale;
  messages: ContactFormMessages;
  prefilledService?: string;
};

const TOTAL_STEPS = 3;
const SUMMARY_STEP = 3;
const SUCCESS_STEP = 4;

type StepIndex = 0 | 1 | 2 | 3 | 4;

export type BriefFormValues = {
  name: string;
  email: string;
  projectScope: string[];
  goals: string;
  budgetRange: string;
  startDate: string;
  timelineNotes: string;
};

export function BriefWizard({ locale, messages, prefilledService }: BriefWizardProps) {
  const projectScopeOptions = messages.fields.projectScope.options;
  const projectScopeValues = projectScopeOptions.map((option) => option.value) as [string, ...string[]];

  const budgetOptions = messages.fields.budgetRange.options;
  const budgetValues = budgetOptions.map((option) => option.value) as [string, ...string[]];

  const budgetFieldSchema = z.enum(budgetValues);

  const BriefSchema = z.object({
    name: z.string().min(2, messages.fields.name.errors.minLength),
    email: z.string().email(messages.fields.email.errors.invalid),
    projectScope: z.array(z.enum(projectScopeValues)).min(1, messages.fields.projectScope.errors.min),
    goals: z
      .string()
      .min(10, messages.fields.goals.errors.min)
      .max(2000, messages.fields.goals.errors.max),
    budgetRange: budgetFieldSchema,
    startDate: z
      .string()
      .min(1, messages.fields.startDate.errors.required)
      .refine((value) => !Number.isNaN(Date.parse(value)), {
        message: messages.fields.startDate.errors.invalid,
      }),
    timelineNotes: z.string().max(500, messages.fields.timelineNotes.errors.max),
  });

  // Map service names to project scope values
  const mapServiceToScope = (serviceName: string): string[] => {
    const lowerService = serviceName.toLowerCase();
    if (lowerService.includes('launch') || lowerService.includes('essentials')) {
      return ['launch-site'];
    }
    if (lowerService.includes('conversion') || lowerService.includes('refresh')) {
      return ['conversion-refresh'];
    }
    if (lowerService.includes('growth') || lowerService.includes('support')) {
      return ['growth-support'];
    }
    // Default: try to match directly if it's already a valid scope value
    return projectScopeValues.includes(serviceName) ? [serviceName] : [];
  };

  const initialProjectScope = prefilledService ? mapServiceToScope(prefilledService) : [];

  const form = useForm<BriefFormValues>({
    resolver: zodResolver(BriefSchema),
    defaultValues: {
      name: '',
      email: '',
      projectScope: initialProjectScope,
      goals: prefilledService ? `I'm interested in ${prefilledService}. ` : '',
      budgetRange: budgetValues[0],
      startDate: '',
      timelineNotes: '',
    },
    mode: 'onTouched',
  });

  const [step, setStep] = useState<StepIndex>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const projectScopeLabelId = useId();

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = loadSavedProgress();
    if (savedProgress) {
      // Ask user if they want to restore progress
      const restore = window.confirm("We found your saved progress. Would you like to continue where you left off?");
      if (restore) {
        form.reset(savedProgress as BriefFormValues);
        toast.info("Your progress has been restored!");
      } else {
        clearSavedProgress();
      }
    }
  }, [form]);

  // Focus heading on step change, but only on desktop to prevent unwanted keyboard pop-ups on mobile
  useEffect(() => {
    // Check if device is likely mobile (screen width < 768px)
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (!isMobile) {
      headingRef.current?.focus();
    }
  }, [step]);

  const stepFieldMap: Record<Exclude<StepIndex, 3 | 4>, Array<keyof BriefFormValues>> = {
    0: ['name', 'email'],
    1: ['projectScope', 'goals'],
    2: ['budgetRange', 'startDate', 'timelineNotes'],
  };

  const handleNext = async () => {
    const fields = stepFieldMap[step as Exclude<StepIndex, 3 | 4>];

    if (!fields) {
      setStep((prev) => (prev < SUMMARY_STEP ? ((prev + 1) as StepIndex) : prev));
      return;
    }

    const isValid = await form.trigger(fields, { shouldFocus: true });
    if (!isValid) {
      return;
    }

    setStep((prev) => ((prev + 1) as StepIndex));
  };

  const handleBack = () => {
    setStep((prev) => (prev > 0 ? ((prev - 1) as StepIndex) : prev));
  };

  const formatDateForDisplay = (value: string) => {
    if (!value) return messages.formatting.dateNotSpecified;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const buildMessage = (values: BriefFormValues) => {
    const scopeList = values.projectScope
      .map((scope) => projectScopeOptions.find((item) => item.value === scope)?.label ?? scope)
      .join(', ');

    const budgetLabel = budgetOptions.find((option) => option.value === values.budgetRange)?.label ?? values.budgetRange;

    return [
      messages.messageTemplate.intro,
      '',
      interpolate(messages.messageTemplate.scope, { scope: scopeList }),
      interpolate(messages.messageTemplate.goals, { goals: values.goals }),
      interpolate(messages.messageTemplate.budget, { budget: budgetLabel }),
      interpolate(messages.messageTemplate.desiredStart, { start: formatDateForDisplay(values.startDate) }),
      interpolate(messages.messageTemplate.timingNotes, {
        notes: values.timelineNotes ? values.timelineNotes : messages.messageTemplate.fallbackNotes,
      }),
    ].join('\n');
  };

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
          Object.entries(result.fieldErrors).forEach(([field, errorMessages]) => {
            const fieldName = field as keyof BriefFormValues;
            form.setError(fieldName, {
              type: 'manual',
              message: errorMessages.join(', '),
            });
          });
          const firstField = Object.keys(result.fieldErrors)[0] as keyof BriefFormValues;
          if (firstField) {
            form.setFocus(firstField);
          }
          setStep(0);
          return;
        }
        throw new Error(result.error || messages.notifications.error);
      }

      toast.success(messages.notifications.success);
      track('Contact: Brief Submitted', {
        budget: values.budgetRange,
        timeline: values.startDate,
      });
      
      // Clear saved progress on successful submission
      clearSavedProgress();
      
      setStep(SUCCESS_STEP);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Brief submission error:', error);
      const fallback = messages.notifications.error;
      toast.error(error instanceof Error ? error.message : fallback);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Exit intent modal handlers
  const handleSaveProgress = () => {
    toast.success("Your progress has been saved! We'll be here when you're ready.");
    track('Contact: Progress Saved', {
      step: step,
    });
  };

  const handleScheduleCall = () => {
    // In a real implementation, this would open a calendar booking widget
    // For now, we'll scroll to the alternative contact section
    toast.info("Scroll down to see alternative contact methods including calendar booking.");
    track('Contact: Schedule Call Clicked', {
      step: step,
    });
  };

  const showBack = step > 0 && step < SUCCESS_STEP;
  const displayStep = Math.min(step, SUMMARY_STEP - 1) + 1;
  const summaryValues = form.getValues();

  return (
    <div className="space-y-8">
      {/* Response Time Banner */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4" role="status">
        <div className="flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 flex-shrink-0 text-primary"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1">
            <p className="font-medium text-foreground">We respond within 24 hours</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Usually much faster. I&apos;ll review your brief and get back to you with next steps.
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" aria-live="polite">
        {step < SUCCESS_STEP && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground" data-testid="step-indicator">
              {interpolate(messages.status.step, { current: displayStep, total: TOTAL_STEPS })}
            </p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-2xl font-semibold tracking-tight focus:outline-none"
            >
              {messages.steps.titles[step]}
            </h2>
            <p className="text-muted-foreground">{messages.steps.descriptions[step]}</p>
          </div>
        )}

        {step === 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField<BriefFormValues>
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="contact-name">{messages.fields.name.label}</FormLabel>
                  <FormControl>
                    <Input
                      id="contact-name"
                      type="text"
                      inputMode="text"
                      autoComplete="name"
                      placeholder={messages.fields.name.placeholder}
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
                  <FormLabel htmlFor="contact-email">{messages.fields.email.label}</FormLabel>
                  <FormControl>
                    <Input
                      id="contact-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder={messages.fields.email.placeholder}
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
                  <FormLabel id={projectScopeLabelId}>{messages.fields.projectScope.label}</FormLabel>
                  <FormControl>
                    <div className="space-y-3" role="group" aria-labelledby={projectScopeLabelId}>
                      {projectScopeOptions.map((option) => {
                        const selected: string[] = Array.isArray(field.value) ? field.value : [];
                        const checked = selected.includes(option.value);
                        return (
                          <label
                            key={option.value}
                            className="flex items-start gap-3 rounded border border-border p-4 text-base hover:border-primary focus-within:border-primary cursor-pointer min-h-[44px] md:text-sm"
                          >
                            <input
                              type="checkbox"
                              className="mt-1 h-5 w-5 min-h-[20px] min-w-[20px] cursor-pointer"
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
                            <span className="leading-6 text-foreground flex-1">{option.label}</span>
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
                  <FormLabel htmlFor="project-goals">{messages.fields.goals.label}</FormLabel>
                  <FormControl>
                    <Textarea
                      id="project-goals"
                      placeholder={messages.fields.goals.placeholder}
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
                  <FormLabel htmlFor="budget-range">{messages.fields.budgetRange.label}</FormLabel>
                  <FormControl>
                    <select
                      id="budget-range"
                      className="min-h-[44px] h-11 w-full rounded-md border border-input bg-background px-3 text-base shadow-xs transition-[color,box-shadow] outline-none focus:border-primary focus:ring-[3px] focus:ring-ring/50 md:text-sm"
                      data-testid="budget-select"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    >
                      <option value="" disabled>
                        {messages.fields.budgetRange.placeholder}
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
                  <FormLabel htmlFor="start-date">{messages.fields.startDate.label}</FormLabel>
                  <FormControl>
                    <Input
                      id="start-date"
                      type="date"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      data-testid="start-date-input"
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
                  <FormLabel htmlFor="timeline-notes">{messages.fields.timelineNotes.label}</FormLabel>
                  <FormControl>
                    <Textarea
                      id="timeline-notes"
                      placeholder={messages.fields.timelineNotes.placeholder}
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

        {step === SUMMARY_STEP && (
          <div className="space-y-6" role="region" aria-live="polite">
            <SummarySection
              title={messages.review.sectionTitles.about}
              onEdit={() => setStep(0)}
              editLabel={messages.review.edit}
            >
              <dl className="mt-2 space-y-1 text-sm">
                <SummaryRow label={messages.review.fields.name} value={summaryValues.name} />
                <SummaryRow label={messages.review.fields.email} value={summaryValues.email} />
              </dl>
            </SummarySection>

            <SummarySection
              title={messages.review.sectionTitles.scope}
              onEdit={() => setStep(1)}
              editLabel={messages.review.edit}
            >
              <dl className="mt-2 space-y-1 text-sm">
                <SummaryRow
                  label={messages.review.fields.scope}
                  value={summaryValues.projectScope
                    .map((scope) => projectScopeOptions.find((option) => option.value === scope)?.label ?? scope)
                    .join(', ')}
                />
                <SummaryRow label={messages.review.fields.goals} value={summaryValues.goals} multiline />
              </dl>
            </SummarySection>

            <SummarySection
              title={messages.review.sectionTitles.budget}
              onEdit={() => setStep(2)}
              editLabel={messages.review.edit}
            >
              <dl className="mt-2 space-y-1 text-sm">
                <SummaryRow
                  label={messages.review.fields.budget}
                  value={budgetOptions.find((option) => option.value === summaryValues.budgetRange)?.label ?? summaryValues.budgetRange}
                />
                <SummaryRow
                  label={messages.review.fields.startDate}
                  value={formatDateForDisplay(summaryValues.startDate)}
                />
                <SummaryRow
                  label={messages.review.fields.notes}
                  value={summaryValues.timelineNotes || messages.review.notProvided}
                  multiline
                />
              </dl>
            </SummarySection>
          </div>
        )}
        
        {step === SUCCESS_STEP && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" role="region" aria-live="polite">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  {messages.successStep.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  {messages.successStep.description}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm space-y-6">
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-semibold">{messages.successStep.bookingTitle}</h3>
                <p className="text-muted-foreground">
                  {messages.successStep.bookingDescription}
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto h-12 px-8 text-lg"
                  asChild
                >
                  <a 
                    href="https://cal.com/amilemia/intro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {messages.successStep.button}
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground italic">
                  {messages.successStep.fallback}
                </p>
              </div>
            </div>
          </div>
        )}

        {step < SUCCESS_STEP && (
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {showBack && (
              <Button type="button" variant="outline" onClick={handleBack} data-testid="brief-back">
                {messages.buttons.back}
              </Button>
            )}

            {step < SUMMARY_STEP ? (
              <Button type="button" onClick={handleNext} data-testid="brief-next">
                {messages.buttons.next}
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
                  {isSubmitting ? messages.buttons.submitting : messages.buttons.submit}
                </Button>
              </div>
            )}
          </div>
        )}

        {step < SUCCESS_STEP && (
          <div role="status" aria-live="polite" className="sr-only">
            {isSubmitting
              ? messages.status.sending
              : interpolate(messages.status.step, { current: displayStep, total: TOTAL_STEPS })}
          </div>
        )}
      </form>
    </Form>

      {/* What Happens Next Timeline */}
      <div className="rounded-lg border border-border bg-card/50 p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">What happens next</h3>
        <ol className="space-y-4">
          <li className="flex gap-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              1
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm text-foreground">
                I&apos;ll review your brief and confirm if we&apos;re a good fit for your timeline and goals.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              2
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm text-foreground">
                We&apos;ll schedule a 30-minute intro call to discuss scope, metrics, and approach.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              3
            </div>
            <div className="flex-1 pt-1">
              <p className="text-sm text-foreground">
                You&apos;ll receive a proposal with deliverables, pricing, and a suggested start date.
              </p>
            </div>
          </li>
        </ol>
      </div>

      {/* Exit Intent Modal */}
      <ExitIntentModal
        formData={form.getValues()}
        isFormDirty={form.formState.isDirty}
        onSaveProgress={handleSaveProgress}
        onScheduleCall={handleScheduleCall}
        onClose={() => {}}
      />
    </div>
  );
}

type SummarySectionProps = {
  title: string;
  onEdit: () => void;
  editLabel: string;
  children: ReactNode;
};

function SummarySection({ title, onEdit, editLabel, children }: SummarySectionProps) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <Button type="button" variant="ghost" size="sm" onClick={onEdit}>
          {editLabel}
        </Button>
      </div>
      {children}
    </div>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  multiline?: boolean;
};

function SummaryRow({ label, value, multiline }: SummaryRowProps) {
  return (
    <div>
      <dt className="font-medium text-muted-foreground">{label}</dt>
      <dd className={cn(multiline ? 'whitespace-pre-line' : undefined)}>{value}</dd>
    </div>
  );
}
