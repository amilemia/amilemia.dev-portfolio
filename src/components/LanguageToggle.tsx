"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Locale, Messages } from "@/i18n";
import { locales } from "@/i18n/locales";
import { replaceLocaleInPathname } from "@/i18n/routing";

const localeOrder: Locale[] = [...locales];

type LanguageToggleProps = {
  locale: Locale;
  messages: Messages["common"]["languageToggle"];
};

export function LanguageToggle({ locale, messages }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();

  const handleChange = (nextLocale: string) => {
    if (!localeOrder.includes(nextLocale as Locale)) {
      return;
    }
    const targetLocale = nextLocale as Locale;
    if (targetLocale === locale) {
      return;
    }

    const basePath = replaceLocaleInPathname(pathname, targetLocale, locale);
    const queryString = searchParams.toString();
    const url = queryString ? `${basePath}?${queryString}` : basePath;

    router.push(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-9" aria-label={messages.label}>
          <span className="text-sm font-semibold uppercase">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuRadioGroup value={locale} onValueChange={handleChange}>
          {localeOrder.map((value) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {value === 'en' ? messages.english : messages.french}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
