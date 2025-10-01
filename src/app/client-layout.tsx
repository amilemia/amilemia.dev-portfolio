'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SkipLink } from "@/components/a11y/SkipLink";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plausible } from "@/components/analytics/Plausible";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { beforeSend } from "@/lib/analytics-config";
import { Container } from "@/components/Container";
import { Menu, X } from "lucide-react";

// Navigation items
const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

// Navigation link component
function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive = useMemo(() => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  }, [href, pathname]);

  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-sm px-2 py-1',
        isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      {children}
    </Link>
  );
}

// Header component
function Header() {
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

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="rounded-sm px-2 py-1 font-mono font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            amilemia.dev
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button asChild size="sm">
                <Link href="/contact">Hire me</Link>
              </Button>
            </div>
            <ThemeToggle />
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
                onClick={() => setMobileOpen((prev) => !prev)}
              >
                {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
              </Button>
            </div>
          </div>
        </Container>
      </header>
      {/* Mobile CTA */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button
          asChild
          size="lg"
          className="rounded-full w-14 h-14 p-0 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <Link
            href="/contact"
            className="flex items-center justify-center text-lg font-medium"
            aria-label="Hire me"
          >
            <span className="sr-only">Hire me</span>
            <span aria-hidden="true">&#128640;</span>
          </Link>
        </Button>
      </div>
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 h-full w-full bg-background/80 backdrop-blur"
        aria-label="Close navigation"
        onClick={onClose}
      />
      <div className="absolute inset-x-4 top-4 rounded-2xl border bg-card p-6 shadow-xl">
        <nav className="space-y-4">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} className="block px-0 text-lg">
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="mt-6">
          <Button asChild className="w-full">
            <Link href="/contact">Hire me</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Footer component
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-6">
      <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {year} amilemia.dev. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/amilemia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </Container>
    </footer>
  );
}

// Client-side only component for the layout
export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main
        id="main-content"
        className="flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
      <Toaster position="top-center" />
      <Plausible />
      {/* @ts-expect-error - Vercel Analytics types are not properly exported */}
      <Analytics beforeSend={beforeSend} />
      <SpeedInsights />
    </>
  );
}


