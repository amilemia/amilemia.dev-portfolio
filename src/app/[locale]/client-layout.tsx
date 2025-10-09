'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Toaster } from "sonner";

import { SkipLink } from "@/components/a11y/SkipLink";
import { Plausible } from "@/components/analytics/Plausible";
import { Container } from "@/components/Container";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { beforeSend } from "@/lib/analytics-config";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Locale, Messages } from "@/i18n";
import { stripLocaleFromPathname } from "@/i18n/routing";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  locale: Locale;
};

function NavLink({ href, children, className, locale }: NavLinkProps) {
  const pathname = usePathname();
  const normalizedPath = useMemo(() => stripLocaleFromPathname(pathname ?? "/", locale), [pathname, locale]);

  const isActive = useMemo(() => {
    if (href === "/") {
      return normalizedPath === "/";
    }
    return normalizedPath.startsWith(href);
  }, [href, normalizedPath]);

  const localizedHref = href === "/" ? `/${locale}` : `/${locale}${href}`;

  return (
    <Link
      href={localizedHref}
      className={cn(
        "text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-sm px-2 py-1",
        isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}

type HeaderProps = {
  locale: Locale;
  messages: Messages["common"];
};

function Header({ locale, messages }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = messages.nav.items;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            className="rounded-sm px-2 py-1 font-mono font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {messages.brand}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.key} href={item.href} locale={locale}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageToggle locale={locale} messages={messages.languageToggle} />
            <ThemeToggle messages={messages.themeToggle} />
            <div className="hidden md:block">
              <Button asChild size="sm">
                <Link href={`/${locale}/contact`}>{messages.actions.bookIntro}</Link>
              </Button>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label={mobileOpen ? messages.nav.close : messages.nav.open}
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
              </Button>
            </div>
          </div>
        </Container>
      </header>
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button
          asChild
          size="lg"
          className="h-14 w-14 rounded-full p-0 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <Link href={`/${locale}/contact`} className="flex items-center justify-center text-lg font-medium" aria-label={messages.nav.mobileCtaLabel}>
            <span className="sr-only">{messages.nav.mobileCtaLabel}</span>
            <span aria-hidden="true">&#128640;</span>
          </Link>
        </Button>
      </div>
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} locale={locale} messages={messages} />
    </>
  );
}

type MobileNavigationProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  messages: Messages["common"];
};

function MobileNavigation({ open, onClose, locale, messages }: MobileNavigationProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-background/80 backdrop-blur"
        aria-label={messages.nav.close}
        onClick={onClose}
      />
      <div className="absolute inset-x-4 top-4 space-y-6 rounded-2xl border bg-card p-6 shadow-xl">
        <nav className="space-y-4">
          {messages.nav.items.map((item) => (
            <NavLink key={item.key} href={item.href} locale={locale} className="block px-0 text-lg">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center justify-between gap-3">
          <LanguageToggle locale={locale} messages={messages.languageToggle} />
          <ThemeToggle messages={messages.themeToggle} />
        </div>
        <div>
          <Button asChild className="w-full">
            <Link href={`/${locale}/contact`}>{messages.actions.bookIntro}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

type FooterProps = {
  messages: Messages["common"];
};

function Footer({ messages }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-6">
      <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">&copy; {year} {messages.brand}. {messages.footer.rights}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="https://github.com/amilemia"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {messages.footer.social.github}
          </a>
          <a
            href="https://linkedin.com/in/amilemia"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {messages.footer.social.linkedin}
          </a>
          <a href="mailto:hi@amilemia.dev" className="transition-colors hover:text-foreground">
            {messages.footer.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}

type ClientLayoutProps = {
  children: ReactNode;
  locale: Locale;
  messages: Messages;
};

export function ClientLayout({ children, locale, messages }: ClientLayoutProps) {
  return (
    <>
      <SkipLink label={messages.common.skipLink} />
      <Header locale={locale} messages={messages.common} />
      <main
        id="main-content"
        className="flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer messages={messages.common} />
      <Toaster position="top-center" />
      <Plausible />
      {/* @ts-expect-error - Vercel Analytics types are not properly exported */}
      <Analytics beforeSend={beforeSend} />
      <SpeedInsights />
    </>
  );
}
