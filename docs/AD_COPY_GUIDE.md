# Ad-Optimized Copy Guide

This document explains how to use the ad-optimized copy variants added to the portfolio website for client acquisition campaigns.

## Overview

Ad-optimized copy has been added to both English and French translation files (`src/i18n/messages/en.ts` and `src/i18n/messages/fr.ts`) under the `ads` section. This copy is designed for:

- Google Ads campaigns
- Facebook/Instagram Ads
- LinkedIn Ads
- Social media posts
- Email marketing
- Landing page optimization

## Available Copy Variants

### 1. Headlines (Under 30 Characters)

Perfect for ad headlines with character limits:

```typescript
messages.ads.headlines.primary      // "Launch Your Site in 3 Weeks"
messages.ads.headlines.secondary    // "Fast, Accessible Web Dev"
messages.ads.headlines.tertiary     // "Sites That Convert"
messages.ads.headlines.conversion   // "28% More Conversions"
messages.ads.headlines.speed        // "Ship in Weeks, Not Months"
messages.ads.headlines.quality      // "Launch-Ready Quality"
```

### 2. Descriptions

Benefit-focused descriptions in various lengths:

```typescript
messages.ads.descriptions.short     // ~100 characters
messages.ads.descriptions.medium    // ~150 characters
messages.ads.descriptions.long      // ~200 characters
messages.ads.descriptions.conversion // Conversion-focused
messages.ads.descriptions.speed     // Speed-focused
```

### 3. Social Proof Elements

Build trust with specific metrics:

```typescript
messages.ads.socialProof.clientCount        // "Trusted by 15+ startups"
messages.ads.socialProof.projectCount       // "30+ sites launched"
messages.ads.socialProof.conversionStat     // "Average 28% conversion lift"
messages.ads.socialProof.speedStat          // "Average 3-week launch"
messages.ads.socialProof.satisfactionStat   // "100% client satisfaction"
messages.ads.socialProof.clients            // Array of client names
```

### 4. Enhanced Testimonials

Testimonials now include specific metrics:

```typescript
messages.shared.testimonials[0].metric  // "28% conversion increase"
messages.shared.testimonials[1].metric  // "3-week launch, 74% faster"
messages.shared.testimonials[2].metric  // "42% more leads"
```

The metrics are automatically displayed in the testimonial carousel as badges.

### 5. Urgency Elements

Create urgency for conversions:

```typescript
messages.ads.urgency.availability      // "1 project slot open for {{period}}"
messages.ads.urgency.limitedSlots      // "Only 2 projects per month"
messages.ads.urgency.bookingSoon       // "Next availability: {{date}}"
messages.ads.urgency.responseTime      // "Respond within 1 business day"
messages.ads.urgency.fastStart         // "Start in 2-3 weeks"
```

### 6. Meta Descriptions (SEO & Paid Ads)

Optimized for both organic and paid search:

```typescript
messages.ads.metaDescriptions.home      // Home page
messages.ads.metaDescriptions.services  // Services page
messages.ads.metaDescriptions.projects  // Projects page
messages.ads.metaDescriptions.about     // About page
messages.ads.metaDescriptions.contact   // Contact page
```

These are automatically used in page metadata for better SEO and ad relevance scores.

### 7. Callouts

Quick benefit statements for ads or landing pages:

```typescript
messages.ads.callouts.fastDelivery          // "Most projects launch in 2-3 weeks"
messages.ads.callouts.noHandoffs            // "One developer, start to finish"
messages.ads.callouts.weeklyUpdates         // "Weekly progress updates included"
messages.ads.callouts.accessibilityFirst    // "WCAG AA compliance guaranteed"
messages.ads.callouts.performanceOptimized  // "Lighthouse 90+ scores"
messages.ads.callouts.seoReady              // "SEO setup and analytics included"
messages.ads.callouts.postLaunchSupport     // "14 days post-launch support"
messages.ads.callouts.transparentPricing    // "Fixed pricing, no surprises"
```

### 8. Value Propositions

Structured value props with headlines and body copy:

```typescript
messages.ads.valueProps.speed        // Fast delivery
messages.ads.valueProps.quality      // Launch-ready quality
messages.ads.valueProps.results      // Measurable results
messages.ads.valueProps.transparency // Always informed
messages.ads.valueProps.expertise    // Full-stack expertise
messages.ads.valueProps.support      // Ongoing support
```

Each value prop has:
- `headline`: Short, punchy title
- `body`: Supporting detail with specific metrics

## Usage Examples

### Google Ads Campaign

**Headline 1:** `messages.ads.headlines.primary` (Launch Your Site in 3 Weeks)  
**Headline 2:** `messages.ads.headlines.conversion` (28% More Conversions)  
**Headline 3:** `messages.ads.headlines.quality` (Launch-Ready Quality)  
**Description:** `messages.ads.descriptions.long`  
**Callouts:** Use `messages.ads.callouts.*` for ad extensions

### Facebook/Instagram Ad

**Primary Text:** `messages.ads.descriptions.medium`  
**Headline:** `messages.ads.headlines.primary`  
**Social Proof:** `messages.ads.socialProof.conversionStat`  
**CTA:** "Book intro call"

### Landing Page Hero

**Headline:** `messages.ads.headlines.primary`  
**Subheadline:** `messages.ads.descriptions.long`  
**Social Proof:** Display `messages.ads.socialProof.clients` as logos  
**Urgency:** `messages.ads.urgency.availability`  
**Testimonials:** Use enhanced testimonials with metrics

### Email Campaign

**Subject Line:** `messages.ads.headlines.speed`  
**Preview Text:** `messages.ads.socialProof.conversionStat`  
**Body:** Combine `messages.ads.descriptions.*` with `messages.ads.valueProps.*`

## Implementation Notes

1. **Automatic Meta Descriptions**: All pages now use ad-optimized meta descriptions automatically. No additional implementation needed.

2. **Testimonial Metrics**: Metrics are automatically displayed in the testimonial carousel as badges below the quote.

3. **Interpolation**: Some copy uses interpolation (e.g., `{{period}}`, `{{date}}`). Use the `interpolate()` function:

```typescript
import { interpolate } from "@/i18n/interpolate";

const copy = interpolate(messages.ads.urgency.availability, {
  period: "December 2024"
});
```

4. **Locale Support**: All ad copy is available in both English and French with culturally adapted phrasing.

## A/B Testing Recommendations

Test these variants to optimize conversion rates:

1. **Headlines**: Test conversion-focused vs. speed-focused headlines
2. **Social Proof**: Test specific metrics vs. client names
3. **Urgency**: Test availability indicators vs. response time promises
4. **Descriptions**: Test short vs. long descriptions for different platforms

## Tracking

Use the existing analytics tracking to measure:
- Click-through rates from ads to landing pages
- Conversion rates by ad copy variant
- Time to contact form submission
- Bounce rates by traffic source

## Updates

To update ad copy:
1. Edit `src/i18n/messages/en.ts` for English
2. Edit `src/i18n/messages/fr.ts` for French (maintain equivalent meaning)
3. Run `npm run build` to verify TypeScript types
4. Deploy changes via Vercel

## Step-by-Step Guide to Test and Use Copy Variants

### Testing Copy Variants Locally

#### Step 1: Start the Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

#### Step 2: Access Copy Variants in Your Code

In any React component, import and use the messages:

```typescript
import { getMessages } from "@/i18n";

// In a server component
const messages = getMessages("en"); // or "fr" for French

// Access ad copy
const headline = messages.ads.headlines.primary;
// Output: "Launch Your Site in 3 Weeks"

const description = messages.ads.descriptions.short;
// Output: "Next.js developer. Fast launches, accessible sites, measurable results. Book intro call."
```

#### Step 3: Test in Browser Console

Open browser DevTools (F12) and test copy access:

```javascript
// This won't work directly in console, but you can inspect the rendered HTML
// Look for meta tags with the new descriptions:
document.querySelector('meta[name="description"]').content
```

#### Step 4: Verify Meta Descriptions

Check that pages are using the new ad-optimized meta descriptions:

1. Visit `http://localhost:3000/en` (Home page)
2. View page source (Ctrl+U or Cmd+U)
3. Search for `<meta name="description"` 
4. Verify it shows: "Freelance Next.js developer building fast, accessible sites that convert..."

Repeat for other pages:
- `/en/services` - Should show services meta description
- `/en/projects` - Should show projects meta description
- `/en/about` - Should show about meta description
- `/en/contact` - Should show contact meta description

#### Step 5: Test Testimonial Metrics

1. Navigate to home page: `http://localhost:3000/en`
2. Scroll to testimonials section
3. Verify each testimonial shows a metric badge:
   - "28% conversion increase"
   - "3-week launch, 74% faster"
   - "42% more leads"

### Using Copy Variants in Components

#### Example 1: Create a Custom Hero Section

```typescript
// app/[locale]/landing/page.tsx
import { getMessages } from "@/i18n";
import { interpolate } from "@/i18n/interpolate";

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = getMessages(locale);
  
  // Get availability with current date
  const availabilityDate = new Date();
  availabilityDate.setMonth(availabilityDate.getMonth() + 1);
  const period = availabilityDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  
  const urgencyMessage = interpolate(messages.ads.urgency.availability, { period });

  return (
    <section>
      <div className="urgency-badge">{urgencyMessage}</div>
      <h1>{messages.ads.headlines.primary}</h1>
      <p>{messages.ads.descriptions.long}</p>
      
      {/* Social proof */}
      <div className="social-proof">
        <span>{messages.ads.socialProof.conversionStat}</span>
        <span>{messages.ads.socialProof.speedStat}</span>
      </div>
      
      {/* Value props */}
      <div className="value-props">
        {Object.values(messages.ads.valueProps).map((prop) => (
          <div key={prop.headline}>
            <h3>{prop.headline}</h3>
            <p>{prop.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

#### Example 2: Create Ad Copy Export for Marketing Team

```typescript
// scripts/export-ad-copy.ts
import { getMessages } from "@/i18n";
import fs from "fs";

const enMessages = getMessages("en");
const frMessages = getMessages("fr");

const adCopy = {
  english: {
    headlines: enMessages.ads.headlines,
    descriptions: enMessages.ads.descriptions,
    socialProof: enMessages.ads.socialProof,
    callouts: enMessages.ads.callouts,
  },
  french: {
    headlines: frMessages.ads.headlines,
    descriptions: frMessages.ads.descriptions,
    socialProof: frMessages.ads.socialProof,
    callouts: frMessages.ads.callouts,
  }
};

// Export as JSON for marketing team
fs.writeFileSync(
  "ad-copy-export.json",
  JSON.stringify(adCopy, null, 2)
);

console.log("Ad copy exported to ad-copy-export.json");
```

Run with: `npx tsx scripts/export-ad-copy.ts`

#### Example 3: A/B Test Different Headlines

```typescript
// components/hero-ab-test.tsx
"use client";

import { useState, useEffect } from "react";
import type { Messages } from "@/i18n";

type Props = {
  headlines: Messages["ads"]["headlines"];
};

export function HeroABTest({ headlines }: Props) {
  const [variant, setVariant] = useState<"primary" | "conversion" | "speed">("primary");
  
  useEffect(() => {
    // Randomly assign variant
    const variants = ["primary", "conversion", "speed"] as const;
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    setVariant(randomVariant);
    
    // Track which variant was shown
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ab_test_view", {
        experiment_name: "hero_headline",
        variant: randomVariant,
      });
    }
  }, []);
  
  return (
    <h1 className="text-4xl font-bold">
      {headlines[variant]}
    </h1>
  );
}
```

### Creating Ad Campaigns

#### Google Ads Setup

1. **Create Responsive Search Ad**
   - Headline 1: Copy `messages.ads.headlines.primary`
   - Headline 2: Copy `messages.ads.headlines.conversion`
   - Headline 3: Copy `messages.ads.headlines.quality`
   - Description 1: Copy `messages.ads.descriptions.long`
   - Description 2: Copy `messages.ads.descriptions.conversion`

2. **Add Callout Extensions**
   - Use all 8 callouts from `messages.ads.callouts.*`
   - Example: "Most projects launch in 2-3 weeks"

3. **Add Structured Snippets**
   - Header: "Services"
   - Values: Extract from service packages

#### Facebook/Instagram Ads Setup

1. **Create Ad Copy Document**
   ```bash
   # Export ad copy for easy copying
   npx tsx scripts/export-ad-copy.ts
   ```

2. **Primary Text**: Use `messages.ads.descriptions.medium`
3. **Headline**: Use `messages.ads.headlines.primary`
4. **Description**: Use `messages.ads.socialProof.conversionStat`

#### LinkedIn Ads Setup

1. **Sponsored Content**
   - Intro Text: `messages.ads.descriptions.long`
   - Headline: `messages.ads.headlines.secondary`
   - CTA: "Learn More" → Link to `/services`

2. **Message Ads**
   - Subject: `messages.ads.headlines.speed`
   - Body: Combine description with urgency element

### Verifying Changes in Production

#### Step 1: Build and Preview

```bash
npm run build
npm run start
```

Visit `http://localhost:3000` to test production build locally.

#### Step 2: Check Meta Tags

Use browser DevTools or online tools:
- [Meta Tags Checker](https://metatags.io/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

#### Step 3: Verify SEO Impact

After deployment, use:
- Google Search Console to monitor impressions/clicks
- Google Analytics to track traffic sources
- Lighthouse to verify performance scores

### Monitoring and Optimization

#### Track Ad Performance

```typescript
// Track which ad copy variant led to conversion
import { track } from "@/lib/analytics/track";

track("Ad Conversion", {
  source: "google_ads",
  headline: "primary", // or "conversion", "speed"
  description: "long",
  campaign_id: "campaign_123"
});
```

#### Update Copy Based on Performance

1. Review analytics weekly
2. Identify best-performing variants
3. Update `src/i18n/messages/en.ts` with winning copy
4. Deploy changes
5. Continue testing new variants

## Best Practices

1. **Keep Headlines Under 30 Characters**: Ensures they display fully on all platforms
2. **Lead with Benefits**: Focus on outcomes (conversions, speed) not features
3. **Use Specific Metrics**: "28% increase" is more compelling than "better results"
4. **Create Urgency**: Limited slots and fast response times encourage action
5. **Match Ad to Landing Page**: Use consistent messaging from ad to page
6. **Test Regularly**: A/B test copy variants to optimize performance
7. **Update Metrics**: Keep social proof current with latest project results
8. **Export for Marketing**: Use the export script to share copy with your marketing team
9. **Track Everything**: Use analytics to measure which variants perform best
10. **Iterate Quickly**: Update underperforming copy within 1-2 weeks
