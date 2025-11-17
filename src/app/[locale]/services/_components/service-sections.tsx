"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

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


