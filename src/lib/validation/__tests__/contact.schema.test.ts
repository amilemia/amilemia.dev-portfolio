import { describe, expect, it } from 'vitest';
import { ContactSchema } from '../contact';

describe('ContactSchema', () => {
  it('accepts valid contact data', () => {
    const payload = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello there! This message is definitely long enough.',
    };

    expect(ContactSchema.parse(payload)).toEqual(payload);
  });

  it('rejects invalid contact data', () => {
    const payload = {
      name: 'J',
      email: 'not-an-email',
      message: 'Too short',
    };

    const result = ContactSchema.safeParse(payload);

    expect(result.success).toBe(false);
    if (!result.success) {
      const issues = result.error.issues.map((issue) => issue.message);
      expect(issues).toEqual(
        expect.arrayContaining([
          'Name must be at least 2 characters',
          'Please enter a valid email address',
          'Message must be at least 10 characters',
        ]),
      );
    }
  });
});
