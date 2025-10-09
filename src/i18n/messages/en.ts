import type { Locale } from "../locales";

export const enMessages = {
  locale: "en",
  common: {
    site: {
      name: "amilemia.dev",
      title: "Amilemia – Web Developer",
      description: "Freelance web developer building fast, accessible web apps.",
      jobTitle: "Web Developer",
      openGraphLocale: "en_US",
    },
    brand: "amilemia.dev",
    skipLink: "Skip to main content",
    nav: {
      items: [
        { key: "home", label: "Home", href: "/" },
        { key: "projects", label: "Projects", href: "/projects" },
        { key: "services", label: "Services", href: "/services" },
        { key: "about", label: "About", href: "/about" },
        { key: "contact", label: "Contact", href: "/contact" },
      ],
      cta: "Book intro",
      mobileCtaLabel: "Book project intro",
      open: "Open navigation",
      close: "Close navigation",
    },
    footer: {
      rights: "All rights reserved.",
      email: "hi@amilemia.dev",
      emailLabel: "Email",
      locationLabel: "Location",
      locationValue: "Remote",
      connectLabel: "Connect",
      social: {
        github: "GitHub",
        twitter: "Twitter",
        linkedin: "LinkedIn",
      },
    },
    actions: {
      bookIntro: "Book project intro",
      viewWork: "View work",
      viewAllServices: "View all services",
      viewAllProjects: "View all projects",
      viewCaseStudies: "View case studies",
      exploreServices: "Explore services packages",
      startProject: "Start a project",
      emailDirect: "Email hi@amilemia.dev",
    },
    themeToggle: {
      ariaLabel: "Toggle theme",
      options: {
        light: "Light",
        dark: "Dark",
        system: "System",
      },
    },
    languageToggle: {
      label: "Language",
      english: "English",
      french: "Français",
    },
    testimonials: {
      heading: "Testimonials",
      ariaLabel: "Testimonials",
      counter: "Testimonial {{current}} of {{total}}",
      previous: "View previous testimonial",
      next: "View next testimonial",
    },
    caseStudy: {
      label: "Case Study",
      impactMetrics: "Impact metrics",
      visitSite: "Visit live site",
      viewSource: "View source",
      roleLabel: "Role: {{role}}",
      stackLabel: "Stack: {{item}}",
    },
    projectCard: {
      viewCaseStudy: "View case study",
      coverAlt: "{{title}} cover image",
    },
    tagFilter: {
      all: "All",
    },
  },
  home: {
    hero: {
      availability: {
        srLabel: "Current availability:",
        template: "1 project slot open for {{period}} – Remote (UTC+1)",
      },
      headline: "Launch and improve your site with a dependable one-person partner.",
      description:
        "I help founders and small teams plan, design, and ship fast, accessible web experiences—without slowing you down or handing off context.",
      bulletPoints: [
        "Strategy, design, and Next.js development handled end to end by one person.",
        "Weekly async updates, staging previews, and clear goals every sprint.",
        "Accessibility, performance, and testing considered before launch.",
      ],
      pricingPrompt: "Want to see pricing?",
      clientsIntro: "Trusted by teams at",
      clients: ["Relay CRM", "Launchpad Studio", "Stellar Labs"],
      insights: {
        title: "What working together looks like",
        description:
          "We align on the metric, map the experience, and deliver on a schedule with zero handoffs. You stay focused on strategy while I handle execution.",
        items: [
          {
            title: "Delivery window",
            description: "Pilot launches in 2-6 weeks based on scope readiness.",
          },
          {
            title: "Launch scorecard",
            description: "Accessibility, performance, QA, and analytics verified before go-live.",
          },
          {
            title: "Collaboration",
            description: "Weekly async updates, Loom walkthroughs, and a shared backlog keep everyone aligned.",
          },
        ],
      },
    },
    servicesPreview: {
      heading: {
        title: "Services designed to launch",
        description: "Productized engagements built to move from kickoff to launch without surprises.",
      },
      viewAll: "View all services",
    },
    recentProjects: {
      heading: {
        title: "Recent projects",
        description: "Case studies that pair thoughtful UX with measurable lifts in conversion, activation, and retention.",
      },
      viewAll: "View all projects",
    },
  },
  services: {
    labels: {
      bestFor: "Best for {{audience}}",
      deliverablesHeading: "What you get",
      tiersHeading: "Starter & plus options",
      timeline: "Typical project timeline: {{timeline}}",
      cta: "Start a project",
    },
    packages: {
      launchEssentials: {
        name: "Launch Essentials",
        pitch: "Design and ship a polished marketing site that earns trust from day one.",
        deliverables: [
          "Discovery session to clarify offer, audience, and success metric",
          "Responsive homepage, services, and contact flow built in Next.js",
          "Foundational SEO, analytics, and accessibility checks",
          "Content entry and copy polish for up to five sections",
          "Launch checklist, Loom walkthrough, and handover notes",
        ],
        timeline: "2-3 weeks from kickoff",
        idealFor: "Independent founders or small teams launching their first site",
        badge: "Starter-friendly",
        tiers: {
          starter: {
            name: "Starter",
            description: "Single-page site covering your offer, proof, and clear contact path.",
          },
          plus: {
            name: "Plus",
            description: "Up to five sections with lead capture, scheduling integration, and CMS-ready content slots.",
          },
        },
      },
      conversionRefresh: {
        name: "Conversion Refresh",
        pitch: "Level-up an existing site with clearer messaging, faster load times, and stronger CTAs.",
        deliverables: [
          "Audit of current site performance, accessibility, and content",
          "Updated hero, services, and proof sections focused on conversions",
          "Lightweight component library for reusable sections",
          "Performance and accessibility improvements with before/after report",
          "Analytics event review and recommendations",
        ],
        timeline: "3-4 weeks including revisions",
        idealFor: "Growing small businesses that need their site to work harder",
        badge: "Most popular",
        tiers: {
          starter: {
            name: "Starter",
            description: "Conversion-focused refresh for three key sections plus copy updates.",
          },
          plus: {
            name: "Plus",
            description: "Includes component upgrades, page speed fixes, analytics event revamp, and QA support for launch.",
          },
        },
      },
      growthSupport: {
        name: "Growth Support",
        pitch: "Ongoing design and development help to keep shipping pages and product tweaks.",
        deliverables: [
          "Monthly planning session to prioritise experiments and fixes",
          "Up to 20 hours of design + development support per month",
          "Landing page iterations, feature polish, or technical cleanup",
          "Async status updates, Loom walkthroughs, and shared backlog",
          "Unused hours roll over for one month so nothing is wasted",
        ],
        timeline: "Booked month-to-month",
        idealFor: "Small teams that need flexible help without a full-time hire",
        badge: "Best value",
        tiers: {
          starter: {
            name: "Starter",
            billingSuffix: " / month",
            description: "Up to 10 hours for quick iterations, landing page edits, or bug fixes.",
          },
          plus: {
            name: "Plus",
            billingSuffix: " / month",
            description: "Up to 20 hours with priority responses, experiment support, and rollover buffer.",
          },
        },
      },
    },
    page: {
      meta: {
        title: "Services",
        description:
          "Straightforward packages for launching a new site, refreshing what you have, or booking ongoing help. Share your goals, pick a fit, and we start quickly.",
      },
      hero: {
        eyebrow: "Services",
        title: "Work that ships.",
        description:
          "Straightforward packages for launching a new site, refreshing what you have, or booking ongoing help. Share your goals, pick a fit, and we start quickly.",
        highlights: [
          "Launch-ready assets delivered with accessibility, performance, and testing baked in.",
          "Async-first collaboration: weekly Loom walkthroughs and a shared backlog for stakeholders.",
          "Clear pricing, timelines, and next steps so you can secure approvals fast.",
        ],
      },
      packages: {
        title: "Packages built for momentum",
        description: "Every engagement includes accessibility, analytics, and launch support.",
      },
      differentiators: {
        title: "Why teams hire me",
        items: [
          {
            title: "Outcome first",
            body: "We start by defining the result you need—more enquiries, clearer messaging, or faster load times—and plan the work around that goal.",
          },
          {
            title: "Hands-on partner",
            body: "You work with one person from discovery through launch. Less overhead, no information loss, and a direct line to progress.",
          },
          {
            title: "Transparent delivery",
            body: "Weekly async updates, Loom walkthroughs, and a shared backlog keep everyone aligned. You always know what shipped and what is next.",
          },
        ],
      },
      process: {
        title: "The process",
        steps: [
          {
            title: "Discover",
            description:
              "Kickoff workshops clarify audience, messaging, and the metric we are aiming to move. You leave with a concrete brief and success criteria.",
          },
          {
            title: "Plan",
            description:
              "I translate discovery into page outlines, UX flows, and a delivery schedule. You approve scope, checkpoints, and go-live requirements.",
          },
          {
            title: "Build",
            description:
              "Design and engineering happen in tandem. Expect async walkthroughs, staging previews, and checklists for analytics, SEO, and accessibility.",
          },
          {
            title: "Launch",
            description:
              "We deploy, verify tracking, and document how to maintain momentum. Post-launch support covers fixes, experiments, and next sprint planning.",
          },
        ],
      },
      faq: {
        title: "Frequently asked",
        items: [
          {
            id: "start",
            question: "How quickly can we kick off?",
            answer:
              "Most projects start within two to three weeks. Share your timeline in the brief and I will confirm the first available kickoff date within one business day.",
          },
          {
            id: "brand-guidelines",
            question: "Can you work within our brand and component library?",
            answer:
              "Yes. I audit your existing guidelines and extend them only where needed. If you are missing pieces, I supply lightweight patterns that slot into your design system.",
          },
          {
            id: "scope",
            question: "What if we need more pages or iterations after launch?",
            answer:
              "Everything ships modular, documented, and ready for future iterations. You can extend with me through the retainer or hand updates to your internal team.",
          },
          {
            id: "tools",
            question: "How do we collaborate day to day?",
            answer:
              "Expect async status updates in Notion, Loom walkthroughs for major milestones, and shared Slack or email threads for quick decisions. You are never guessing what is happening.",
          },
          {
            id: "post-launch",
            question: "Do you offer support after launch?",
            answer:
              "Yes. Each project includes 14 days of post-launch support for fixes and questions. Ongoing experiments and improvements roll into the Product Partner Retainer.",
          },
        ],
      },
      cta: {
        title: "Ready to land the next release?",
        description:
          "Tell me about your timeline and goals. I will reply within one business day with next steps and a suggested kickoff date.",
      },
    },
  },
  about: {
    heading: {
      title: "Intentional builds, measurable outcomes",
      description: "I am Amilemia — a full-stack product partner who helps teams translate strategy into launches that move the right metrics.",
    },
    introduction:
      "From the first discovery call through launch, I focus on what success looks like for your business. That means pairing thoughtful UX with pragmatic engineering, running accessibility and performance sweeps before we ship, and leaving behind the documentation your team needs to iterate.",
    focusAreas: {
      title: "What I focus on",
      items: [
        "Revenue-focused UX: onboarding, pricing, lifecycle, and checkout flows",
        "Marketing systems: conversion-first landing pages and modular content hubs",
        "Design systems and component libraries that scale across teams",
        "Accessibility, performance, and testing baked into every release",
      ],
    },
    toolset: {
      title: "Tooling that keeps momentum",
      items: [
        "React, Next.js, TypeScript, and Edge runtimes",
        "Contentlayer, MDX, and modern CMS integrations",
        "Playwright, Vitest, and automated QA pipelines",
        "Upstash, Resend, and analytics platforms like Plausible",
      ],
    },
    experience: {
      title: "Experience",
      roles: [
        {
          title: "Senior Frontend Developer",
          place: "Relay CRM",
          timeframe: "2022 - Present",
          summary:
            "Led revenue-critical onboarding, pricing, and reporting flows that increased trial-to-paid conversions by 28 percent while standardising accessibility and testing.",
        },
        {
          title: "Product Engineer",
          place: "Launchpad Studio",
          timeframe: "2019 - 2022",
          summary:
            "Partnered with marketing and product leads to ship high-volume experimentation, reducing time-to-launch for campaigns from weeks to days.",
        },
      ],
    },
  },
  projects: {
    heading: {
      title: "Projects",
      description:
        "Selected launches across product, marketing, and experimentation. Each project shipped with measurable outcomes, rigorous QA, and a clear handoff.",
    },
  },
  contact: {
    heading: {
      title: "Get in touch",
      description:
        "Share the goals, audience, and deadline for your next launch. I will review your brief within one business day and reply with availability, next steps, and a suggested kickoff date.",
    },
    steps: {
      title: "What happens after you submit",
      items: [
        "I review your brief and confirm fit, timeline, and any open questions.",
        "We schedule a 30-minute intro call to align on metrics, stakeholders, and scope.",
        "You receive a proposal outlining deliverables, investment, and kickoff date.",
      ],
    },
    form: {
      steps: {
        titles: ["About you", "Project scope", "Budget & timeline", "Review & submit"],
        descriptions: [
          "Let me know how to reach you.",
          "Select what you need and share your goals.",
          "Clarify budget and schedule expectations.",
          "Double-check everything before sending.",
        ],
      },
      fields: {
        name: {
          label: "Name",
          placeholder: "Your name",
          errors: { minLength: "Name must be at least 2 characters" },
        },
        email: {
          label: "Email",
          placeholder: "your.email@example.com",
          errors: { invalid: "Please enter a valid email address" },
        },
        projectScope: {
          label: "Project scope",
          options: [
            { value: "portfolio-site", label: "Portfolio site" },
            { value: "marketing-site", label: "Marketing site" },
            { value: "app-features", label: "App features" },
          ],
          errors: { min: "Select at least one project scope" },
        },
        goals: {
          label: "Project goals",
          placeholder: "Share objectives, success metrics, audience, or other helpful context.",
          errors: {
            min: "Please describe your goals in a bit more detail (10+ characters)",
            max: "Goals must be less than 2000 characters",
          },
        },
        budgetRange: {
          label: "Budget range",
          placeholder: "Select budget",
          options: [
            { value: "under-5k", label: "Under $5k" },
            { value: "5k-10k", label: "$5k - $10k" },
            { value: "10k-25k", label: "$10k - $25k" },
            { value: "25k-plus", label: "$25k+" },
          ],
        },
        startDate: {
          label: "Desired start date",
          placeholder: "Pick a date",
          errors: {
            required: "Select a desired start date",
            invalid: "Select a valid start date",
          },
        },
        timelineNotes: {
          label: "Timing notes",
          placeholder: "Share milestone deadlines, launch targets, or other timing context.",
          errors: { max: "Please keep timing notes under 500 characters" },
        },
      },
      review: {
        sectionTitles: {
          about: "About you",
          scope: "Project scope",
          budget: "Budget & timeline",
        },
        edit: "Edit",
        fields: {
          name: "Name",
          email: "Email",
          scope: "Scope",
          goals: "Goals",
          budget: "Budget",
          startDate: "Desired start",
          notes: "Timing notes",
        },
        notProvided: "Not provided",
      },
      buttons: {
        back: "Back",
        next: "Next",
        submit: "Send brief",
        submitting: "Sending...",
      },
      status: {
        sending: "Sending your brief...",
        step: "Step {{current}} of {{total}}",
      },
      notifications: {
        success: "Brief sent!",
        error: "Failed to send message. Please try again.",
      },
      messageTemplate: {
        intro: "New project brief submitted via contact wizard:",
        scope: "Project scope: {{scope}}",
        goals: "Goals: {{goals}}",
        budget: "Budget range: {{budget}}",
        desiredStart: "Desired start date: {{start}}",
        timingNotes: "Timing notes: {{notes}}",
        fallbackNotes: "Not provided",
      },
      formatting: {
        dateNotSpecified: "Not specified",
      },
    },
    info: {
      title: "Contact Information",
      emailLabel: "Email",
      emailValue: "hi@amilemia.dev",
      locationLabel: "Location",
      locationValue: "Remote",
      connectTitle: "Connect With Me",
      social: {
        github: "GitHub",
        twitter: "Twitter",
        linkedin: "LinkedIn",
      },
    },
  },
  project: {
    backToProjects: "Back to projects",
    timeline: {
      present: "Present",
    },
  },
  notFound: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    cta: "Return Home",
  },
  shared: {
    testimonials: [
      {
        quote: "Amina translated messy product asks into a polished release, and her accessibility sweeps saved us multiple rounds of QA.",
        author: "Lisa Dunn",
        role: "Head of Product, Relay CRM",
      },
      {
        quote: "She shipped our marketing site in three weeks with analytics wired up and documentation the team still relies on.",
        author: "Carlos Mendes",
        role: "Founder, Launchpad Studio",
      },
      {
        quote: "Expect thoughtful questions, pragmatic decisions, and progress updates before you need to ask for them.",
        author: "Naomi Chen",
        role: "COO, Stellar Labs",
      },
    ],
  },
} as const;

type DeepMutable<T> = T extends ReadonlyArray<infer U>
  ? DeepMutable<U>[]
  : T extends object
    ? { -readonly [K in keyof T]: DeepMutable<T[K]> }
    : T;

type DeepLocalized<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends Array<infer U>
        ? DeepLocalized<U>[]
        : T extends object
          ? { [K in keyof T]: DeepLocalized<T[K]> }
          : T;

type BaseMessages = DeepLocalized<DeepMutable<typeof enMessages>>;

export type Messages = Omit<BaseMessages, "locale"> & { locale: Locale };
