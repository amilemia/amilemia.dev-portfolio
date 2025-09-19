import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/ThemeProvider";
import { SkipLink } from "@/components/a11y/SkipLink";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amilemia - Portfolio",
  description: "Personal portfolio showcasing my projects and skills",
};

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link 
          href="/" 
          className="font-mono font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-sm px-2 py-1"
        >
          amilemia.dev
        </Link>
        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-sm px-2 py-1"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

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

// Suppress hydration warnings for the body element
const suppressHydrationWarning = {
  suppressHydrationWarning: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
        {...suppressHydrationWarning}
      >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
