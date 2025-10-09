import { locales, fallbackLocale, type Locale } from "./locales";
import { enMessages, type Messages } from "./messages/en";
import { frMessages } from "./messages/fr";

const messageMap: Record<Locale, Messages> = {
  en: enMessages as unknown as Messages,
  fr: frMessages as unknown as Messages,
};

export { locales, fallbackLocale };
export type { Locale, Messages };

export function getMessages(locale: Locale): Messages {
  return messageMap[locale] ?? (enMessages as unknown as Messages);
}
