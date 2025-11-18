"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { BriefWizard } from "@/components/contact/BriefWizard";
import { AlternativeContact } from "@/components/contact/AlternativeContact";
import { SectionHeading } from "@/components/SectionHeading";
import { getMessages, type Locale } from "@/i18n";
import { fallbackLocale, isLocale } from "@/i18n/locales";

function ContactPageContent() {
  const params = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const rawLocale = params?.locale;
  const locale: Locale = rawLocale && isLocale(rawLocale) ? rawLocale : fallbackLocale;
  const messages = getMessages(locale);
  const contact = messages.contact;
  
  // Get prefilledService from URL params (e.g., ?service=Launch Essentials)
  const prefilledService = searchParams.get('service') || undefined;

  return (
    <Section size="lg">
      <Container className="max-w-6xl space-y-16">
        <SectionHeading
          title={contact.heading.title}
          description={contact.heading.description}
          align="center"
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content - Form */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-2xl border border-border/60 bg-card/60 p-6 text-sm text-muted-foreground shadow-sm backdrop-blur-sm">
              <h2 className="text-base font-semibold text-foreground">{contact.steps.title}</h2>
              <ol className="mt-3 space-y-2">
                {contact.steps.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <BriefWizard locale={locale} messages={contact.form} prefilledService={prefilledService} />
          </div>

          {/* Sidebar - Alternative Contact Methods */}
          <div className="lg:col-span-1">
            <AlternativeContact
              email={contact.info.emailValue}
              socialLinks={{
                github: "https://github.com/amilemia",
                twitter: "https://twitter.com/amilemia",
                linkedin: "https://linkedin.com/in/amilemia",
              }}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageContent />
    </Suspense>
  );
}
