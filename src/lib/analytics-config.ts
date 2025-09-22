/**
 * Type definition for Vercel Analytics events
 * This is a best-effort type definition since the exact types aren't exported from the package
 */
type VercelAnalyticsEvent = {
  /** The URL of the page where the event occurred */
  url: string;
  /** The type of analytics event */
  type: string;
  /** Event name (for custom events) */
  event?: string;
  /** Event properties */
  [key: string]: string | number | boolean | undefined;
};

/**
 * Callback function type for the beforeSend prop
 */
type BeforeSendCallback = (event: VercelAnalyticsEvent) => VercelAnalyticsEvent | null;

/**
 * Filters out sensitive routes from analytics
 */
export const beforeSend: BeforeSendCallback = (event) => {
  // Skip analytics for sensitive routes
  if (
    event.url.includes('/admin') ||
    event.url.includes('?token=') ||
    event.url.includes('&token=')
  ) {
    return null;
  }
  return event;
};
