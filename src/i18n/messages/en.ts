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
        { key: "resources", label: "Free resources", href: "/resources" },
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
      email: "contact@amilemia.dev",
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
      clientsIntro: "Featured project partners",
      clients: ["Clinique Santé Plus"],
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
        description: "Production web applications and bilingual platforms engineered with Laravel, Next.js, and automated QA.",
      },
      viewAll: "View all projects",
    },
    coverage: {
      eyebrow: "Positioning & Service Zones",
      title: "Who I help and where I work",
      summary:
        "amilemia.dev is an independent full-stack web development studio led by Mohammed-Amine Madah, based in Morocco (UTC+1). I help founders, healthcare clinics, and service businesses build fast, AI-visible (SEO/GEO) websites, custom Laravel & Next.js web applications, and conversion-focused landing pages. Contact me to scope a fixed-price build or schedule an intro call.",
      zonesLabel: "Regions & markets served",
      zones: [
        "Morocco (Kenitra, Rabat, Casablanca)",
        "France",
        "Belgium & Switzerland",
        "International Remote (EN / FR)",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common questions before we start",
      description: "Clear answers on timelines, Google & AI search visibility (SEO/GEO), pricing, and post-launch support.",
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
          "Discovery call to define your offer, target audience, and conversion metrics",
          "Mobile-first scroll homepage, dedicated service pages, and intake form built in Next.js",
          "Technical SEO, Schema.org structured data for AI visibility (GEO), and WCAG AA accessibility",
          "Content structure and concrete copy refinement for up to 5 core sections",
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
          "Full audit of Core Web Vitals, accessibility, and offer-to-inquiry clarity",
          "Redesigned hero, services, and social proof sections optimized for mobile & social traffic",
          "Schema.org structured data, semantic HTML hierarchy, and AI search optimization (GEO/AEO)",
          "Performance optimization with before/after metrics report",
          "Analytics review with conversion funnel event tracking",
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
          {
            id: "ai-seo-visibility",
            question: "How do you make sites visible to Google and AI assistants (ChatGPT, Perplexity)?",
            answer:
              "Every build includes clean semantic HTML headings, fast server-rendered pages, XML sitemaps, Schema.org JSON-LD structured data (Organization, Service, FAQ), and concrete entity positioning so both search engines and generative AI systems can accurately index and cite your business.",
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
      description: "I'm Mohammed-Amine Madah (Amilemia)—a full-stack web developer combining software engineering rigor, multimedia design, and conversion-focused UX.",
    },
    introduction:
      "With a Bachelor's degree in Multimedia & Web Technologies and intensive software engineering training, I approach every build with both architectural precision and user-centric design. From database architecture and role-based backends in Laravel to high-speed bilingual frontends in Next.js, I deliver production-ready applications with automated testing and clear documentation.",
    focusAreas: {
      title: "What I specialize in",
      items: [
        "Full-stack web applications: role-based dashboards, scheduling systems, and PDF reporting workflows",
        "Conversion-focused web platforms: bilingual (EN/FR) marketing sites, service catalogs, and intake funnels",
        "UI/UX & Multimedia craft: clean component systems, responsive interfaces, and brand-ready visual assets",
        "Launch-ready quality: WCAG AA accessibility, static/SSR performance, and automated E2E/unit testing",
      ],
    },
    toolset: {
      title: "Tech stack",
      items: [
        "Frontend & UI: React, Next.js 15, TypeScript, JavaScript (ES6+), Tailwind CSS, Alpine.js, HTML5 & CSS3",
        "Backend & Databases: Laravel, PHP 8+, Node.js, REST APIs, PostgreSQL, MySQL, SQLite & Upstash Redis",
        "Testing & DevOps: Playwright (E2E), Vitest, Pest / PHPUnit, Git & GitHub Actions CI/CD, Linux/Bash, Vercel & Cloudflare",
        "Design & Multimedia: Figma, Adobe Photoshop, Adobe Illustrator, UI/UX Prototyping & Responsive Design",
      ],
    },
    experience: {
      title: "Education & Training",
      roles: [
        {
          title: "Bachelor's Degree in Multimedia & Web Technologies",
          place: "International Federation of Vocational Training Institutions (FIEFP) • Kenitra",
          timeframe: "2021 - 2024",
          summary:
            "Specialized in full-stack web development, interactive multimedia, UI/UX design, and modern web application architecture.",
        },
        {
          title: "Software Engineering Program",
          place: "ALX Africa",
          timeframe: "2023 - 2024",
          summary:
            "Intensive project-based software engineering curriculum covering systems programming, Linux/Bash environments, backend engineering, algorithms, and collaborative Git workflows.",
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
        error: "Something went wrong. Please try again or email contact@amilemia.dev",
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
      emailValue: "contact@amilemia.dev",
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
      description: "Three free, fillable PDF workbooks for clearer offers, faster websites and Next.js launches. Preview a page, then get your copy by email.",
    },
    hero: {
      eyebrow: "Free Resources",
      title: "A practical next step for your website",
      description: "Three focused workbooks for founders and developers. Preview a page, choose the problem you want to solve, then get the PDF by email.",
    },
    grid: {
      title: "Available Resources",
      description: "Each four-page workbook includes a practical checklist and fillable action plan. All PDFs are in English.",
    },
    filters: {
      all: "All resources",
      label: "Filter by category",
      results: "{{count}} resources",
      empty: "No resources found in this category.",
    },
    card: {
      downloadCount: "{{count}} downloads",
      rating: "{{rating}}/5 rating",
      download: "Email me the free PDF",
      preview: "Preview a page",
      audience: "Best for",
      pages: "{{count}} pages",
      firstPass: "{{minutes}}-min first pass",
      format: "Fillable PDF · English",
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
      description: "Use the {{title}} to review your site and plan a focused next step.",
      cta: "Download Free Guide",
    },
    featured: {
      eyebrow: "Free Resource",
      title: "Get the {{title}}",
      description: "{{description}}",
      cta: "Email me the free PDF",
      browse: "Explore all 3 resources",
      delivery: "Free PDF by email. Preview a page before signing up.",
      socialProof: "{{count}}+ downloads",
    },
  },
  notFound: {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
    cta: "Return Home",
  },
  linksPage: {
    meta: {
      title: "Quick Links",
      description:
        "Direct mobile links for amilemia.dev: start a project, view verified case studies, explore service packages, or download free PDF workbooks.",
    },
    bio: {
      role: "Full-Stack Web Developer • Next.js & Laravel",
      location: "Based in Morocco (UTC+1) • Serving EN & FR clients",
      tagline:
        "AI-visible (SEO/GEO) websites and custom web applications that turn visitors into qualified inquiries.",
    },
    actions: {
      quote: {
        title: "Request a project quote",
        subtitle: "Share your goals & timeline — response within 1 business day",
      },
      services: {
        title: "Service packages & pricing ($800–$2,800)",
        subtitle: "Launch Essentials, Conversion Refresh & Growth Support",
      },
      projects: {
        title: "View verified case studies",
        subtitle: "Clinic Management System & Bilingual Lead Engine",
      },
      resources: {
        title: "Free fillable PDF workbooks",
        subtitle: "Conversion Guide, Performance Checklist & Next.js Toolkit",
      },
      email: {
        title: "Email me directly",
        subtitle: "contact@amilemia.dev",
      },
    },
  },
  shared: {
    testimonials: [
      {
        quote: "The Laravel-based scheduling system completely eliminated our booking conflicts, simplified patient payments, and streamlined prescription generation. A game-changer for our clinic.",
        author: "Dr. Jean Martin",
        fullName: "Dr. Jean Martin",
        role: "Lead Practitioner",
        company: "Clinique Santé Plus",
        companyLogo: "/images/clients/clinic-sante-plus-logo.png",
        avatarUrl: "/images/testimonials/dr-jean-martin.png",
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
      clientCount: "Built for founders & small teams",
      projectCount: "Full-stack Next.js & Laravel delivery",
      conversionStat: "95+ Lighthouse performance target",
      speedStat: "Average 2-4 week launch",
      satisfactionStat: "14-day post-launch QA included",
      clients: ["Clinique Santé Plus"],
    },
    urgency: {
      availability: "1 project slot open for {{period}}",
      limitedSlots: "Only 2 projects per month",
      bookingSoon: "Next availability: {{date}}",
      responseTime: "Respond within 1 business day",
      fastStart: "Start in 2-3 weeks",
    },
    metaDescriptions: {
      home: "Full-stack web developer (Next.js, TypeScript, Laravel) building fast, accessible sites and web apps that convert. Launch in weeks with strategy, design, and code.",
      services: "Fixed-scope web development packages. Launch sites in 2-3 weeks, refresh for conversions, or book ongoing support. Clear pricing, fast delivery, measurable results.",
      projects: "Production web applications and case studies built with Laravel, Next.js 15, TypeScript, and PostgreSQL. Full-stack engineering, accessibility, and automated QA.",
      about: "Mohammed-Amine Madah (Amilemia)—full-stack web developer with a Bachelor's Degree in Multimedia & Web Technologies and ALX Software Engineering training.",
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
