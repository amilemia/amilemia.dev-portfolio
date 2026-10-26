import type { Project } from "contentlayer/generated";
import { getLocalizedServicePackages } from "@/data/services";
import type { Locale, Messages } from "@/i18n";
import { absoluteUrl, jsonLd, site } from "./site";

export function buildProfessionalServiceJsonLd(locale: Locale, messages: Messages): string {
  const packages = getLocalizedServicePackages(messages.services.packages);
  const homeUrl = absoluteUrl(`/${locale}`);
  const personId = `${site.url}/#person`;
  const serviceId = `${site.url}/#organization`;

  return jsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Mohammed-Amine Madah",
        alternateName: "Amilemia",
        jobTitle: messages.common.site.jobTitle,
        url: homeUrl,
        email: "mailto:contact@amilemia.dev",
        sameAs: [
          "https://github.com/amilemia",
          "https://www.linkedin.com/in/aminemadah/",
        ],
        knowsLanguage: ["en", "fr"],
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "Fédération Internationale des Établissements de Formation Professionnelle (FIEFP)",
          },
          {
            "@type": "EducationalOrganization",
            name: "ALX Africa",
          },
        ],
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Laravel",
          "PHP",
          "Tailwind CSS",
          "PostgreSQL",
          "MySQL",
          "Technical SEO",
          "Generative Engine Optimization (GEO)",
          "Web Accessibility (WCAG AA)",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: site.name,
        description: messages.home.coverage.summary,
        url: homeUrl,
        email: "contact@amilemia.dev",
        founder: { "@id": personId },
        priceRange: "$800 - $2,800",
        currenciesAccepted: "USD, EUR, MAD",
        availableLanguage: ["English", "French"],
        areaServed: [
          { "@type": "Country", name: "Morocco" },
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Belgium" },
          { "@type": "Country", name: "Switzerland" },
          { "@type": "Place", name: "Worldwide (Remote)" },
        ],
        sameAs: [
          "https://github.com/amilemia",
          "https://www.linkedin.com/in/aminemadah/",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: messages.services.page.meta.title,
          itemListElement: packages.map((pkg) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: pkg.name,
              description: pkg.pitch,
              provider: { "@id": serviceId },
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              minPrice: pkg.tiers[0]?.price ?? 800,
              maxPrice: pkg.tiers[pkg.tiers.length - 1]?.price ?? 2800,
            },
            url: absoluteUrl(`/${locale}/services`),
          })),
        },
      },
    ],
  });
}

export function buildFaqJsonLd(
  items: ReadonlyArray<{ question: string; answer: string }>
): string {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
}

export function buildBreadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; url: string }>
): string {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

export function buildProjectJsonLd(project: Project, locale: Locale): string {
  const projectUrl = absoluteUrl(`/${locale}/projects/${project.slug}`);
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.summary,
    url: projectUrl,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: "Mohammed-Amine Madah",
      url: absoluteUrl(`/${locale}/about`),
    },
    keywords: [...(project.tags ?? []), ...(project.stack ?? [])].join(", "),
    ...(project.cover ? { image: absoluteUrl(project.cover) } : {}),
  });
}
