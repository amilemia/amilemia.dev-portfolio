import type { components, paths } from './types/contact';

type ContactRequest = components['schemas']['ContactRequest'];
type ContactResponse = paths['/api/contact']['post']['responses']['200']['content']['application/json'];
type ErrorResponse = components['schemas']['ErrorResponse'];

export type ApiResult<T> = 
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function postContact(body: ContactRequest): Promise<ApiResult<ContactResponse>> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json() as ContactResponse | ErrorResponse;

    if (!response.ok) {
      const errorData = data as ErrorResponse;
      if (response.status === 400) {
        return {
          ok: false,
          error: errorData.error || 'Validation failed',
          fieldErrors: errorData.fieldErrors || undefined,
        };
      }
      return {
        ok: false,
        error: errorData.error || 'Failed to send message',
      };
    }

    return { ok: true, data: data as ContactResponse };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}
