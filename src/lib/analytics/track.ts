/**
 * Track a custom event with Plausible
 * @param name - The name of the event
 * @param props - Optional properties to include with the event
 */
export function track(name: string, props?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(name, props ? { props } : undefined);
  }
}

// Common event names
export const EVENTS = {
  CLICK: 'click',
  NAVIGATE: 'navigate',
  SUBMIT: 'submit',
  DOWNLOAD: 'download',
  COPY: 'copy',
  SCROLL: 'scroll',
  VIEW: 'view',
  HOVER: 'hover',
  SHARE: 'share',
  SUBSCRIBE: 'subscribe',
} as const;
