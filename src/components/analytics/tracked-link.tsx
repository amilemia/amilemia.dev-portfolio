'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';

import { track } from '@/lib/analytics/track';

type LinkProps = ComponentProps<typeof Link>;
type TrackedLinkProps = LinkProps & {
  eventName: string;
  eventData?: Record<string, unknown>;
};

export function TrackedLink({
  eventName,
  eventData,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        track(eventName, eventData);
        onClick?.(event);
      }}
    />
  );
}