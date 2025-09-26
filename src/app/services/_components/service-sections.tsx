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

export type ServicePackage = {
  name: string;
  pitch: string;
  deliverables: string[];
  timeline: string;
  priceRange: string;
  href: string;
};

type ServiceCardListProps = {
  services: ServicePackage[];
};

export function ServiceCardList({ services }: ServiceCardListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => {
        const baseId = slugify(service.name);
        const titleId = `${baseId}-title`;
        const deliverablesId = `${baseId}-deliverables`;

        return (
          <Card key={service.name} data-testid="service-card" className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl" id={titleId}>
                {service.name}
              </CardTitle>
              <CardDescription className="text-base">
                {service.pitch}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <section aria-labelledby={deliverablesId}>
                  <h3
                    id={deliverablesId}
                    className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    What you get
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
                <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-foreground">Timeline</dt>
                    <dd className="text-muted-foreground">{service.timeline}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Typical budget</dt>
                    <dd className="text-muted-foreground">{service.priceRange}</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full"
                onClick={() => track("Services: Start", { package: service.name })}
              >
                <Link
                  href={service.href}
                  className={cn(
                    "inline-flex h-10 w-full items-center justify-center rounded-md font-semibold"
                  )}
                >
                  Start a project
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
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
        <span
          aria-hidden="true"
          className={cn(
            "transition-transform",
            open ? "rotate-45" : "rotate-0"
          )}
        >
          +
        </span>
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
