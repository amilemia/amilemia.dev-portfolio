'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// Import components
import { ThemeProvider } from "@/components/ThemeProvider";
import { SkipLink } from "@/components/a11y/SkipLink";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plausible } from "@/components/analytics/Plausible";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { beforeSend } from "@/lib/analytics-config";

// Navigation items
const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

// Navigation link component
function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-sm px-2 py-1',
        isActive ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      {children}
    </Link>
  );
}

// Header component
function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="font-mono font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-sm px-2 py-1"
          >
            amilemia.dev
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="md:hidden">
            <Button asChild size="sm">
              <Link href="/contact">Hire me</Link>
            </Button>
          </div>
        </div>
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
            <span aria-hidden="true">👋</span>
          </Link>
        </Button>
      </div>
    </>
  );
}

// Footer component
function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} amilemia.dev. All rights reserved.
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
      </div>
    </footer>
  );
}

// Client-side only component for the layout
export function ClientLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a simple loading state on the server and during hydration
  if (!mounted) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
        <SkipLink />
        <div className="flex-1">
          {children}
        </div>
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
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
    </ThemeProvider>
  );
}
