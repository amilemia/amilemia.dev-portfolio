import { enUS, fr } from "date-fns/locale";

import type { Locale } from "./locales";

export function getDateFnsLocale(locale: Locale) {
  switch (locale) {
    case "fr":
      return fr;
    case "en":
    default:
      return enUS;
  }
}
