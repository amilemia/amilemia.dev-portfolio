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
import { MobileBottomBar } from "@/components/mobile";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ClientLogos } from "@/components/trust/ClientLogos";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { beforeSend } from "@/lib/analytics-config";
import { getClientLogos } from "@/data/trust";
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
  locale: Locale;
};

function Footer({ messages, locale }: FooterProps) {
  const year = new Date().getFullYear();
  const clientLogos = getClientLogos();

  return (
    <footer className="border-t bg-muted/30 py-12">
      <Container>
        {/* Client Logos Section */}
        <div className="mb-12 pb-12 border-b border-border/60">
          <div className="text-center mb-8">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Trusted by
            </h3>
          </div>
          <ClientLogos logos={clientLogos} />
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_auto_auto] md:gap-12">
          <div className="space-y-4">
            <Link href="/" className="inline-block font-mono text-lg font-semibold">
              {messages.brand}
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {messages.footer.tagline}
            </p>
            <p className="text-xs text-muted-foreground">&copy; {year} {messages.brand}. {messages.footer.rights}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{messages.footer.connectLabel}</h3>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://github.com/amilemia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                {messages.footer.social.github}
              </a>
              <a
                href="https://linkedin.com/in/amilemia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                {messages.footer.social.linkedin}
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">{messages.footer.contactLabel}</h3>
            <div className="flex flex-col gap-3 text-sm">
              <Link
                href={`/${locale}/contact`}
                className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {messages.footer.email}
              </Link>
              <div className="text-muted-foreground flex items-center gap-2">
                <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>
                  <span className="font-medium text-foreground">{messages.footer.locationLabel}:</span> {messages.footer.locationValue}
                </span>
              </div>
            </div>
          </div>
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
      <Footer messages={messages.common} locale={locale} />
      <MobileBottomBar
        bookCallLabel={messages.common.actions.bookIntro}
        bookCallHref={`/${locale}/contact`}
        viewServicesLabel={messages.common.actions.viewAllServices}
        viewServicesHref={`/${locale}/services`}
      />
      <Toaster position="top-center" />
      <Plausible />
      {/* @ts-expect-error - Vercel Analytics types are not properly exported */}
      <Analytics beforeSend={beforeSend} />
      <SpeedInsights />
    </>
  );
}
