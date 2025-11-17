'use client';

import Link from "next/link";
import { useState } from "react";

import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./card";
import { track } from "@/lib/analytics/track";
import { cn } from "@/lib/utils";
import type { LocalizedServicePackage, ServiceTier } from "@/data/services";
import type { Locale, Messages } from "@/i18n";
import { interpolate } from "@/i18n/interpolate";

type ServiceCardProps = {
  service: LocalizedServicePackage & { href: string };
  locale: Locale;
  messages: Messages["services"]["labels"];
};

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

export function ServiceCard({ service, locale, messages }: ServiceCardProps) {
  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(null);
  const formatTierPrice = formatCurrency(locale);
  
  const baseId = slugify(service.name);
  const titleId = `${baseId}-title`;
  const deliverablesId = `${baseId}-deliverables`;
  const tiersId = `${baseId}-tiers`;

  return (
    <Card
      className="group flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      data-testid="service-card"
    >
      <CardHeader>
        <div className="flex flex-col gap-3">
          {service.badge && (
            <Badge 
              variant="secondary" 
              className="w-fit text-xs font-semibold uppercase tracking-wider"
            >
              {service.badge}
            </Badge>
          )}
          <CardTitle className="text-2xl" id={titleId}>
            {service.name}
          </CardTitle>
          <CardDescription className="text-base">
            {service.pitch}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        <div className="rounded-lg bg-muted/40 px-4 py-3">
          <p className="text-sm font-medium text-muted-foreground">
            {interpolate(messages.bestFor, { audience: service.idealFor })}
          </p>
        </div>

        <section aria-labelledby={deliverablesId}>
          <h3
            id={deliverablesId}
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {messages.deliverablesHeading}
          </h3>
          <ul className="space-y-2.5">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span 
                  aria-hidden="true" 
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary transition-colors group-hover:bg-primary/80" 
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={tiersId} className="space-y-3">
          <h3 
            id={tiersId}
            className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {messages.tiersHeading}
          </h3>
          <div className="space-y-2">
            {service.tiers.map((tier) => (
              <button
                key={`${service.id}-${tier.id}`}
                type="button"
                onClick={() => setSelectedTier(tier.id === selectedTier?.id ? null : tier)}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition-all duration-200",
                  "hover:border-primary/40 hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  selectedTier?.id === tier.id
                    ? "border-primary bg-accent/10"
                    : "border-border/70 bg-background/70"
                )}
                aria-pressed={selectedTier?.id === tier.id}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{tier.name}</span>
                  <span className="text-sm font-semibold text-foreground">
                    {formatTierPrice(tier.price, tier.billingSuffix)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {interpolate(messages.timeline, { timeline: service.timeline })}
          </p>
        </section>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button
          asChild
          className="w-full transition-transform duration-300 group-hover:scale-[1.02]"
          onClick={() => track("Services: Start", { package: service.name, tier: selectedTier?.name })}
        >
          <Link href={service.href}>
            {messages.cta}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
