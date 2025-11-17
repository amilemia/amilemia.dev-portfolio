'use client';

import { useMDXComponent } from "next-contentlayer2/hooks";
import type { ReactNode } from 'react';

type CaseStudyContentProps = {
  code: string;
};

// Custom MDX components with card styling
const components = {
  h1: ({ children, ...props }: { children: ReactNode }) => (
    <h1 className="sr-only" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: { children: ReactNode }) => (
    <div className="rounded-2xl border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
      <h2 className="mb-6 text-2xl font-bold tracking-tight" {...props}>
        {children}
      </h2>
    </div>
  ),
  h3: ({ children, ...props }: { children: ReactNode }) => (
    <h3 className="mb-4 mt-8 text-xl font-semibold tracking-tight first:mt-0" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: { children: ReactNode }) => (
    <p className="mb-4 leading-relaxed text-muted-foreground last:mb-0" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: { children: ReactNode }) => (
    <ul className="mb-6 space-y-3 last:mb-0" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }: { children: ReactNode }) => (
    <li className="flex items-start gap-3 text-muted-foreground" {...props}>
      <svg
        className="mt-1.5 size-5 shrink-0 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span className="flex-1">{children}</span>
    </li>
  ),
  ol: ({ children, ...props }: { children: ReactNode }) => (
    <ol className="mb-6 space-y-3 last:mb-0 [counter-reset:item]" {...props}>
      {children}
    </ol>
  ),
  strong: ({ children, ...props }: { children: ReactNode }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }: { children: ReactNode }) => (
    <blockquote
      className="my-6 rounded-lg border-l-4 border-primary bg-muted/50 p-4 italic text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: { children: ReactNode }) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  // Wrapper for content after h2
  wrapper: ({ children, ...props }: { children: ReactNode }) => (
    <div className="space-y-6" {...props}>
      {children}
    </div>
  ),
};

export function CaseStudyContent({ code }: CaseStudyContentProps) {
  const MDXContent = useMDXComponent(code);
  
  return (
    <div className="space-y-6">
      <MDXContent components={components} />
    </div>
  );
}
