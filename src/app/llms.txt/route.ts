import { NextResponse } from "next/server";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const content = `# ${site.name} — Mohammed-Amine Madah (Full-Stack Web Developer)

> ${site.name} is an independent full-stack web development studio led by Mohammed-Amine Madah (Amilemia), based in Morocco (UTC+1). I help founders, healthcare clinics, and service businesses build fast, AI-visible (SEO/GEO) websites, custom Laravel and Next.js web applications, and conversion-focused landing pages in English and French.

## Entity & Positioning Summary
- **Developer:** Mohammed-Amine Madah (Amilemia)
- **Role:** Full-Stack Web Developer (Next.js 15, TypeScript, Laravel, PHP 8+, Tailwind CSS, PostgreSQL, MySQL)
- **Education:** Bachelor's Degree in Multimedia & Web Technologies (FIEFP, Kenitra) & ALX Africa Software Engineering Program
- **Languages:** English (EN) and French (FR)
- **Service Regions:** Morocco (Kenitra, Rabat, Casablanca), France, Belgium, Switzerland, and Worldwide Remote (UTC+1)
- **Contact Email:** contact@amilemia.dev
- **GitHub:** https://github.com/amilemia
- **LinkedIn:** https://www.linkedin.com/in/aminemadah/

## Service Packages & Fixed-Scope Pricing
- **Launch Essentials ($1,500 – $2,200 | 2–3 weeks):** Mobile-first scroll homepage, dedicated service pages, intake form in Next.js, technical SEO, Schema.org structured data (GEO/AEO), and WCAG AA accessibility.
  - Starter ($1,500): Single-page conversion site with offer, social proof, and contact path.
  - Plus ($2,200): Multi-page site with lead capture, CMS-ready content, and automated calendar booking.
- **Conversion Refresh ($1,800 – $2,800 | 3–4 weeks):** Full audit of Core Web Vitals, accessibility, and offer-to-inquiry clarity; redesigned hero, services, and proof sections; Schema.org + AI search optimization; before/after performance report.
  - Starter ($1,800): Refresh 3 key sections with conversion-focused copy and design updates.
  - Plus ($2,800): Full refresh with component library, speed optimization, analytics setup, and QA.
- **Growth Support ($800 – $1,500 / month | Ongoing):** Monthly engineering and design retainer (10 to 20 hours/month with rollover) for landing pages, experiments, and feature iterations.

## Verified Case Studies (Problem → Method → Result)
- [Clinic Management System](${absoluteUrl("/en/projects/clinic-booking-system")}): Full-stack healthcare platform built with Laravel 12, Blade, Tailwind CSS, and Alpine.js. Role-based dashboards (Admin, Doctor, Secretary, Patient), conflict-free appointment scheduling (0 calendar conflicts), automated PDF prescriptions (400+ generated), and billing tracking.
  - French version: ${absoluteUrl("/fr/projects/clinic-booking-system")}
- [Bilingual Portfolio & Lead Engine (amilemia.dev)](${absoluteUrl("/en/projects/amilemia-portfolio")}): Conversion-engineered bilingual (EN/FR) web platform built with Next.js 15 App Router, TypeScript, Contentlayer2 MDX, Upstash Redis rate-limiting, Resend email delivery, and Playwright E2E verification.
  - French version: ${absoluteUrl("/fr/projects/amilemia-portfolio")}

## Free Fillable PDF Workbooks
- [Conversion Optimization Guide](${absoluteUrl("/resources/conversion-optimization-guide.pdf")}): 4-page fillable PDF with 7-point offer-to-inquiry audit, before/after copy examples, and experiment brief.
- [Next.js Best Practices Toolkit](${absoluteUrl("/resources/nextjs-best-practices.pdf")}): 4-page fillable PDF with 8 App Router architecture & release checks, Suspense/caching patterns, and go/no-go release planner.
- [Web Performance Checklist](${absoluteUrl("/resources/web-performance-checklist.pdf")}): 4-page fillable PDF with 8 loading/interaction checks, symptom-to-investigation guide, and baseline/fix planner.

## Key Pages
- English Home: ${absoluteUrl("/en")}
- French Home: ${absoluteUrl("/fr")}
- Services & Pricing (EN): ${absoluteUrl("/en/services")}
- Services & Pricing (FR): ${absoluteUrl("/fr/services")}
- Projects & Case Studies (EN): ${absoluteUrl("/en/projects")}
- Projects & Case Studies (FR): ${absoluteUrl("/fr/projects")}
- Free Resources (EN): ${absoluteUrl("/en/resources")}
- Free Resources (FR): ${absoluteUrl("/fr/resources")}
- About & Education (EN): ${absoluteUrl("/en/about")}
- About & Education (FR): ${absoluteUrl("/fr/about")}
- Contact & Project Brief (EN): ${absoluteUrl("/en/contact")}
- Contact & Project Brief (FR): ${absoluteUrl("/fr/contact")}
- Mobile Quick Links / Instagram Bio Hub (EN): ${absoluteUrl("/en/links")}
- Mobile Quick Links / Instagram Bio Hub (FR): ${absoluteUrl("/fr/links")}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
