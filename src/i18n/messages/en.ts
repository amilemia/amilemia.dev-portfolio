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
      cta: "Get started",
      mobileCtaLabel: "Get started",
      open: "Open navigation",
      close: "Close navigation",
    },
    footer: {
      rights: "All rights reserved.",
      tagline: "Building fast, accessible sites that convert. Available for new projects.",
      email: "hi@amilemia.dev",
      emailLabel: "Email",
      locationLabel: "Location",
      locationValue: "Remote (UTC+1)",
      connectLabel: "Connect",
      contactLabel: "Contact",
      social: {
        github: "GitHub",
        twitter: "Twitter",
        linkedin: "LinkedIn",
      },
    },
    actions: {
      bookIntro: "Book intro call",
      viewWork: "See my work",
      viewAllServices: "Explore services",
      viewAllProjects: "View all projects",
      viewCaseStudies: "See case studies",
      exploreServices: "View service packages",
      startProject: "Get started",
      emailDirect: "Send an email",
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
      headline: "Ship faster with a developer who handles strategy, design, and code.",
      description:
        "I help founders and small teams launch high-converting sites in weeks, not months. From discovery to deployment, you work with one person who understands your goals and delivers launch-ready quality.",
      bulletPoints: [
        "Strategy, design, and Next.js development—no handoffs between specialists.",
        "Weekly progress updates with staging previews so you see results as we build.",
        "Accessibility, performance, and SEO built in from day one, not bolted on later.",
      ],
      pricingPrompt: "View service packages",
      clientsIntro: "Trusted by teams at",
      clients: ["Relay CRM", "Launchpad Studio", "Stellar Labs"],
      trustIndicators: {
        wcagCompliant: "WCAG AA Compliant",
        lighthouse90Plus: "Lighthouse 90+ Scores",
        postLaunchSupport: "14-Day Post-Launch Support",
      },
      insights: {
        title: "How we work together",
        description:
          "We start with your business goal, map the user experience, and ship on schedule. You stay focused on strategy while I handle design and development.",
        items: [
          {
            title: "Fast delivery",
            description: "Most projects launch in 2-6 weeks with clear milestones and no surprises.",
          },
          {
            title: "Launch-ready quality",
            description: "Every release passes accessibility audits, performance checks, and QA testing before going live.",
          },
          {
            title: "Transparent progress",
            description: "Weekly async updates, video walkthroughs, and a shared task board keep you informed without meetings.",
          },
        ],
      },
    },
    servicesPreview: {
      heading: {
        title: "Services that ship results",
        description: "Fixed-scope packages designed to launch fast with clear deliverables, timelines, and outcomes.",
      },
      viewAll: "Explore services",
    },
    recentProjects: {
      heading: {
        title: "Recent work",
        description: "Real projects with measurable results—from 28% conversion lifts to sites that launched in 3 weeks.",
      },
      viewAll: "View all projects",
    },
    finalCta: {
      headline: "Ready to launch your next project?",
      description: "Share your goals and timeline. I'll review your brief and respond within one business day with next steps and availability.",
      responseTime: "Response within 1 business day • Start in 2-3 weeks",
    },
  },
  services: {
    labels: {
      bestFor: "Best for {{audience}}",
      deliverablesHeading: "What's included",
      tiersHeading: "Choose your scope",
      timeline: "Timeline: {{timeline}}",
      cta: "Get started",
      startingAt: "Starting at",
    },
    packages: {
      launchEssentials: {
        name: "Launch Essentials",
        pitch: "Go from concept to conversion-ready marketing presence in 3 weeks. A focused process that handles strategy, design, and code so you can stay focused on your business.",
        deliverables: [
          "Discovery call to define your offer, audience, and success metrics",
          "Responsive homepage, services page, and contact form built in Next.js",
          "SEO setup, analytics integration, and accessibility compliance",
          "Content migration and copy refinement for up to 5 sections",
          "Launch checklist, video walkthrough, and handoff documentation",
        ],
        timeline: "2-3 weeks from kickoff",
        idealFor: "founders and small teams launching their first professional site",
        badge: "Most popular",
        tiers: {
          starter: {
            name: "Starter",
            description: "Single-page site with your offer, social proof, and a clear path to contact you.",
          },
          plus: {
            name: "Plus",
            description: "Multi-page site with lead capture, CMS-ready content, and automated calendar booking.",
          },
        },
      },
      conversionRefresh: {
        name: "Conversion Refresh",
        pitch: "Turn your underperforming site into a high-revenue asset. We audit your funnel, optimize your performance, and rewrite your messaging for maximum impact.",
        deliverables: [
          "Full audit of performance, accessibility, and messaging effectiveness",
          "Redesigned hero, services, and social proof sections optimized for conversions",
          "Reusable component library for consistent, maintainable design",
          "Performance optimization with before/after metrics report",
          "Analytics review with event tracking recommendations",
        ],
        timeline: "3-4 weeks including revisions",
        idealFor: "growing businesses that need their site to generate more leads",
        badge: "Best value",
        tiers: {
          starter: {
            name: "Starter",
            description: "Refresh 3 key sections with conversion-focused copy and design updates.",
          },
          plus: {
            name: "Plus",
            description: "Full refresh with component library, speed optimization, analytics setup, and QA.",
          },
        },
      },
      growthSupport: {
        name: "Growth Support",
        pitch: "Keep shipping experiments, landing pages, and product improvements without hiring full-time.",
        deliverables: [
          "Monthly planning call to prioritize experiments and technical improvements",
          "Up to 20 hours of design and development work per month",
          "Landing page builds, feature iterations, or technical debt cleanup",
          "Weekly async updates, video walkthroughs, and shared task board",
          "Unused hours roll over for one month—no wasted budget",
        ],
        timeline: "Month-to-month, cancel anytime",
        idealFor: "teams that need ongoing development support without a full-time hire",
        badge: "Flexible",
        tiers: {
          starter: {
            name: "Starter",
            billingSuffix: " / month",
            description: "10 hours per month for quick iterations, landing pages, or bug fixes.",
          },
          plus: {
            name: "Plus",
            billingSuffix: " / month",
            description: "20 hours per month with priority support, experiment builds, and hour rollover.",
          },
        },
      },
    },
    page: {
      meta: {
        title: "Services",
        description:
          "Fixed-scope packages for launching sites, improving conversions, or ongoing development support. Clear deliverables, timelines, and pricing—start in weeks, not months.",
      },
      hero: {
        eyebrow: "Services",
        title: "Launch faster, convert better.",
        description:
          "Fixed-scope packages for launching new sites, refreshing what you have, or booking ongoing support. Pick a package, share your goals, and start in weeks.",
        highlights: [
          "Every project includes accessibility audits, performance optimization, and QA testing.",
          "Weekly progress updates with video walkthroughs—no guessing what's happening.",
          "Clear pricing and timelines so you can get internal approval quickly.",
        ],
      },
      packages: {
        title: "Choose your package",
        description: "Every package includes accessibility compliance, analytics setup, and post-launch support.",
      },
      differentiators: {
        title: "Why teams choose to work with me",
        items: [
          {
            title: "Results-focused",
            body: "We start with your business goal—more leads, better conversions, faster load times—and build the solution around that outcome.",
          },
          {
            title: "One partner, start to finish",
            body: "Work with one person from discovery to launch. No handoffs, no context loss, and direct access to progress.",
          },
          {
            title: "Always in the loop",
            body: "Weekly updates, video walkthroughs, and a shared task board mean you always know what's done and what's next.",
          },
        ],
      },
      process: {
        title: "How it works",
        steps: [
          {
            title: "Discover",
            description:
              "We start with a kickoff call to clarify your audience, goals, and success metrics. You get a clear brief and timeline.",
          },
          {
            title: "Plan",
            description:
              "I map out page structures, user flows, and delivery milestones. You approve the scope and launch requirements before we build.",
          },
          {
            title: "Build",
            description:
              "Design and development happen together. You get weekly updates, staging previews, and checklists for SEO, analytics, and accessibility.",
          },
          {
            title: "Launch",
            description:
              "We deploy, verify tracking, and hand off documentation. You get 14 days of post-launch support for fixes and questions.",
          },
        ],
      },
      faq: {
        title: "Common questions",
        items: [
          {
            id: "start",
            question: "How quickly can we start?",
            answer:
              "Most projects kick off within 2-3 weeks. Share your timeline when you reach out, and I'll confirm availability within one business day.",
          },
          {
            id: "brand-guidelines",
            question: "Can you work with our existing brand?",
            answer:
              "Yes. I'll work within your brand guidelines and extend them only where needed. If you don't have guidelines yet, I'll create lightweight patterns that fit your vision.",
          },
          {
            id: "scope",
            question: "What if we need changes after launch?",
            answer:
              "Everything is built modular and documented for easy updates. You can continue working with me through Growth Support or hand off to your internal team.",
          },
          {
            id: "tools",
            question: "How do we stay in sync?",
            answer:
              "You'll get weekly async updates via email or Slack, video walkthroughs for major milestones, and a shared task board. No surprises, no guessing.",
          },
          {
            id: "post-launch",
            question: "Do you provide support after launch?",
            answer:
              "Yes. Every project includes 14 days of post-launch support for bug fixes and questions. Ongoing work can continue through the Growth Support package.",
          },
        ],
      },
      cta: {
        title: "Ready to get started?",
        description:
          "Share your goals and timeline. I'll review your brief and respond within one business day with next steps and availability.",
      },
    },
  },
  about: {
    heading: {
      title: "Building sites that convert, not just look good",
      description: "I'm Amilemia—a full-stack developer who helps founders and small teams ship high-performing web experiences that drive real business results.",
    },
    introduction:
      "From discovery to deployment, I focus on what moves your business forward. That means combining thoughtful UX with solid engineering, running accessibility and performance checks before launch, and delivering documentation your team can actually use.",
    focusAreas: {
      title: "What I specialize in",
      items: [
        "Conversion-focused flows: onboarding, pricing pages, checkout, and lead capture",
        "Marketing sites: landing pages and content hubs built to generate leads",
        "Design systems: reusable component libraries that scale with your team",
        "Launch-ready quality: accessibility, performance, and testing built in from day one",
      ],
    },
    toolset: {
      title: "Tech stack",
      items: [
        "React, Next.js, TypeScript, and Vercel Edge",
        "Contentlayer, MDX, and headless CMS integrations",
        "Playwright, Vitest, and automated testing pipelines",
        "Upstash, Resend, and analytics tools like Plausible",
      ],
    },
    experience: {
      title: "Background",
      roles: [
        {
          title: "Senior Frontend Developer",
          place: "Relay CRM",
          timeframe: "2022 - Present",
          summary:
            "Built revenue-critical onboarding and pricing flows that increased trial-to-paid conversions by 28% while establishing accessibility and testing standards.",
        },
        {
          title: "Product Engineer",
          place: "Launchpad Studio",
          timeframe: "2019 - 2022",
          summary:
            "Shipped rapid marketing experiments and landing pages, reducing campaign launch time from weeks to days through reusable components and streamlined workflows.",
        },
      ],
    },
  },
  projects: {
    heading: {
      title: "Projects",
      description:
        "Real work with real results. Each project includes measurable outcomes, thorough QA, and complete documentation.",
    },
  },
  contact: {
    heading: {
      title: "Let's talk about your project",
      description:
        "Share your goals, timeline, and what you're looking to build. I'll review your brief and respond within one business day with next steps.",
    },
    steps: {
      title: "What happens next",
      items: [
        "I'll review your brief and confirm if we're a good fit for your timeline and goals.",
        "We'll schedule a 30-minute intro call to discuss scope, metrics, and approach.",
        "You'll receive a proposal with deliverables, pricing, and a suggested start date.",
      ],
    },
    form: {
      steps: {
        titles: ["About you", "Project details", "Budget & timeline", "Review & submit"],
        descriptions: [
          "How should I reach you?",
          "What are you looking to build?",
          "What's your budget and timeline?",
          "Review before sending.",
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
          label: "What do you need?",
          options: [
            { value: "launch-site", label: "New Site Launch" },
            { value: "conversion-refresh", label: "Conversion Optimization" },
            { value: "growth-support", label: "Ongoing Growth Support" },
            { value: "custom-app", label: "Custom Feature / App" },
          ],
          errors: { min: "Select at least one option" },
        },
        goals: {
          label: "Tell me about your project",
          placeholder: "What are you trying to achieve? Who's your audience? What does success look like?",
          errors: {
            min: "Please share a bit more detail (at least 10 characters)",
            max: "Please keep this under 2000 characters",
          },
        },
        budgetRange: {
          label: "Budget range",
          placeholder: "Select budget",
          options: [
            { value: "momentum", label: "$1,500 - $3,000 (Standard)" },
            { value: "growth", label: "$3,000 - $6,000 (Full Launch)" },
            { value: "custom", label: "$6,000+ (Custom / Complex)" },
            { value: "consult", label: "Under $1,500 (Consultation only)" },
          ],
        },
        startDate: {
          label: "When do you want to start?",
          placeholder: "Pick a date",
          errors: {
            required: "Please select a start date",
            invalid: "Please select a valid date",
          },
        },
        timelineNotes: {
          label: "Any timing constraints?",
          placeholder: "Launch deadlines, event dates, or other time-sensitive details.",
          errors: { max: "Please keep this under 500 characters" },
        },
      },
      review: {
        sectionTitles: {
          about: "Contact info",
          scope: "Project details",
          budget: "Budget & timeline",
        },
        edit: "Edit",
        fields: {
          name: "Name",
          email: "Email",
          scope: "Type",
          goals: "Details",
          budget: "Budget",
          startDate: "Start date",
          notes: "Timeline notes",
        },
        notProvided: "Not provided",
      },
      buttons: {
        back: "Back",
        next: "Continue",
        submit: "Send message",
        submitting: "Sending...",
      },
      status: {
        sending: "Sending...",
        step: "Step {{current}} of {{total}}",
      },
      notifications: {
        success: "Message sent! I'll respond within 1 business day.",
        error: "Something went wrong. Please try again or email hi@amilemia.dev",
      },
      messageTemplate: {
        intro: "New project inquiry from contact form:",
        scope: "Project type: {{scope}}",
        goals: "Project details: {{goals}}",
        budget: "Budget: {{budget}}",
        desiredStart: "Start date: {{start}}",
        timingNotes: "Timeline notes: {{notes}}",
        fallbackNotes: "Not provided",
      },
      formatting: {
        dateNotSpecified: "Not specified",
      },
      successStep: {
        title: "Brief received!",
        description: "Your project details are in my inbox. To speed things up, let's lock in a time for our intro call.",
        bookingTitle: "Book your intro call",
        bookingDescription: "Pick a time that works for you. I've already got your brief, so we can dive straight into strategy.",
        button: "Schedule on Cal.com",
        fallback: "Or wait for my email—I'll respond within 1 business day.",
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
    cta: {
      heading: "Start Your Project",
      description: "Ready to achieve similar results? Let's discuss how I can help bring your vision to life.",
      button: "Get in Touch",
    },
  },
  resources: {
    meta: {
      title: "Free Resources",
      description: "Free guides, checklists, and templates to help you build better websites. Download instantly, no strings attached.",
    },
    hero: {
      eyebrow: "Free Resources",
      title: "Guides and tools to help you ship better sites",
      description: "Practical resources for founders and developers. Download instantly—no strings attached.",
    },
    grid: {
      title: "Available Resources",
      description: "Everything you need to build faster, more accessible, and higher-converting websites.",
    },
    card: {
      downloadCount: "{{count}} downloads",
      rating: "{{rating}}/5 rating",
      download: "Download Free",
      category: {
        checklist: "Checklist",
        guide: "Guide",
        template: "Template",
        toolkit: "Toolkit",
      },
    },
    contentUpgrade: {
      eyebrow: "Free Resource",
      title: "Want the detailed guide?",
      description: "Get the complete {{title}} with step-by-step instructions and code examples.",
      cta: "Download Free Guide",
    },
    featured: {
      eyebrow: "Free Resource",
      title: "Get the {{title}}",
      description: "{{description}}",
      cta: "Download Free",
      socialProof: "{{count}}+ downloads",
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
        quote: "Amina turned vague product requirements into a polished release. Her accessibility audits caught issues that would have cost us weeks in QA. We saw a 28% increase in trial-to-paid conversions after launch.",
        author: "Lisa Dunn",
        fullName: "Lisa Dunn",
        role: "Head of Product",
        company: "Relay CRM",
        companyLogo: "/images/clients/relay-crm-logo.svg",
        metric: "28% conversion increase",
      },
      {
        quote: "Our marketing site launched in 3 weeks with analytics, documentation, and zero post-launch fires. Best freelance experience we've had. Page load time dropped from 4.2s to 1.1s.",
        author: "Carlos Mendes",
        fullName: "Carlos Mendes",
        role: "Founder",
        company: "Launchpad Studio",
        companyLogo: "/images/clients/launchpad-studio-logo.svg",
        metric: "3-week launch, 74% faster",
      },
      {
        quote: "The Laravel-based scheduling system completely eliminated our booking conflicts, simplified patient payments, and streamlined prescription generation. A game-changer for our clinic.",
        author: "Dr. Jean Martin",
        fullName: "Dr. Jean Martin",
        role: "Lead Practitioner",
        company: "Clinic Martin",
        companyLogo: "/images/clients/stellar-labs-logo.svg",
        metric: "0 calendar conflicts",
      },
    ],
  },
  ads: {
    headlines: {
      primary: "Launch Your Site in 3 Weeks",
      secondary: "Fast, Accessible Web Dev",
      tertiary: "Sites That Convert",
      conversion: "28% More Conversions",
      speed: "Ship in Weeks, Not Months",
      quality: "Launch-Ready Quality",
    },
    descriptions: {
      short: "Next.js developer. Fast launches, accessible sites, measurable results. Book intro call.",
      medium: "Launch your marketing site in 2-3 weeks. Accessibility, performance, and SEO built in. One developer, start to finish.",
      long: "I help founders launch high-converting sites fast. Strategy, design, and Next.js development with one partner. Weekly updates, staging previews, and launch-ready quality. Book intro call.",
      conversion: "Increase conversions with faster sites. Accessibility audits, performance optimization, and conversion-focused design. 3-week launches.",
      speed: "Ship your site in weeks with a developer who handles strategy, design, and code. No handoffs, no delays. Book intro.",
    },
    socialProof: {
      clientCount: "Trusted by 15+ startups",
      projectCount: "30+ sites launched",
      conversionStat: "Average 28% conversion lift",
      speedStat: "Average 3-week launch",
      satisfactionStat: "100% client satisfaction",
      clients: ["Relay CRM", "Launchpad Studio", "Stellar Labs", "Quantum Analytics", "Bright Path"],
    },
    urgency: {
      availability: "1 project slot open for {{period}}",
      limitedSlots: "Only 2 projects per month",
      bookingSoon: "Next availability: {{date}}",
      responseTime: "Respond within 1 business day",
      fastStart: "Start in 2-3 weeks",
    },
    metaDescriptions: {
      home: "Freelance Next.js developer building fast, accessible sites that convert. Launch in 3 weeks with strategy, design, and development from one partner. Book intro call.",
      services: "Fixed-scope web development packages. Launch sites in 2-3 weeks, refresh for conversions, or book ongoing support. Clear pricing, fast delivery, measurable results.",
      projects: "Real projects with real results. See case studies with conversion lifts, performance improvements, and 3-week launches. Next.js, accessibility, and SEO expertise.",
      about: "Full-stack developer specializing in conversion-focused sites. 28% average conversion increase, 3-week launches, accessibility and performance built in. View work.",
      contact: "Book a project intro call. Share your goals and timeline. Get a proposal with deliverables, pricing, and start date within 1 business day.",
    },
    callouts: {
      fastDelivery: "Most projects launch in 2-3 weeks",
      noHandoffs: "One developer, start to finish",
      weeklyUpdates: "Weekly progress updates included",
      accessibilityFirst: "WCAG AA compliance guaranteed",
      performanceOptimized: "Lighthouse 90+ scores",
      seoReady: "SEO setup and analytics included",
      postLaunchSupport: "14 days post-launch support",
      transparentPricing: "Fixed pricing, no surprises",
    },
    valueProps: {
      speed: {
        headline: "Ship in Weeks",
        body: "Most projects launch in 2-3 weeks with clear milestones and no delays.",
      },
      quality: {
        headline: "Launch-Ready Quality",
        body: "Accessibility audits, performance optimization, and QA testing before every release.",
      },
      results: {
        headline: "Measurable Results",
        body: "Average 28% conversion increase and 74% faster page loads across client projects.",
      },
      transparency: {
        headline: "Always Informed",
        body: "Weekly updates, staging previews, and shared task board—no guessing what's happening.",
      },
      expertise: {
        headline: "Full-Stack Expertise",
        body: "Strategy, design, and Next.js development from one partner who understands your goals.",
      },
      support: {
        headline: "Ongoing Support",
        body: "14 days post-launch support included. Continue with flexible monthly packages.",
      },
    },
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
