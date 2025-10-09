"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utils";
import type { LocalizedServicePackage, ServiceTier } from "@/data/services";
import type { Locale, Messages } from "@/i18n";
import { interpolate } from "@/i18n/interpolate";

function formatCurrency(locale: Locale) {
  const formatter = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (value: number, suffix?: string) => {
    const base = formatter.format(value);
    return suffix ? `${base}${suffix}` : base;
  };
}

type ServiceCardListProps = {
  services: Array<LocalizedServicePackage & { href: string }>;
  locale: Locale;
  messages: Messages["services"]["labels"];
};

export function ServiceCardList({ services, locale, messages }: ServiceCardListProps) {
  const formatTierPrice = formatCurrency(locale);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => {
        const baseId = slugify(service.name);
        const titleId = `${baseId}-title`;
        const deliverablesId = `${baseId}-deliverables`;

        return (
          <Card key={service.id} data-testid="service-card" className="h-full">
            <CardHeader>
              {service.badge ? (
                <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {service.badge}
                </span>
              ) : null}
              <CardTitle className="text-2xl" id={titleId}>
                {service.name}
              </CardTitle>
              <CardDescription className="text-base">
                {service.pitch}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="rounded-md bg-muted/40 px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {interpolate(messages.bestFor, { audience: service.idealFor })}
                </p>
                <section aria-labelledby={deliverablesId}>
                  <h3
                    id={deliverablesId}
                    className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {messages.deliverablesHeading}
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-1 size-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {messages.tiersHeading}
                  </h3>
                  <div className="space-y-2">
                    {service.tiers.map((tier) => (
                      <ServiceTierCard key={`${service.id}-${tier.id}`} tier={tier} formatPrice={formatTierPrice} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {interpolate(messages.timeline, { timeline: service.timeline })}
                  </p>
                </section>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full"
                onClick={() => track("Services: Start", { package: service.name })}
              >
                <Link href={service.href} className="inline-flex h-10 w-full items-center justify-center rounded-md font-semibold">
                  {messages.cta}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

type ServiceTierCardProps = {
  tier: ServiceTier;
  formatPrice: (value: number, suffix?: string) => string;
};

function ServiceTierCard({ tier, formatPrice }: ServiceTierCardProps) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
      <div className="flex items-center justify-between text-sm font-semibold text-foreground">
        <span>{tier.name}</span>
        <span>{formatPrice(tier.price, tier.billingSuffix)}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
    </div>
  );
}

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqListProps = {
  items: FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <FaqDisclosure key={item.id} item={item} />
      ))}
    </div>
  );
}

type FaqDisclosureProps = {
  item: FaqItem;
};

function FaqDisclosure({ item }: FaqDisclosureProps) {
  const [open, setOpen] = useState(false);
  const contentId = `${item.id}-content`;

  return (
    <div className="rounded-lg border bg-card text-card-foreground">
      <button
        id={item.id}
        type="button"
        className="flex w-full items-center justify-between gap-4 rounded-lg px-4 py-3 text-left text-base font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{item.question}</span>
        <span aria-hidden="true" className={cn("transition-transform", open ? "rotate-45" : "rotate-0")}>+</span>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={item.id}
        hidden={!open}
        className="px-4 pb-4 text-sm text-muted-foreground"
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
