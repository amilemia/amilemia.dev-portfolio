export type ServiceTier = {
  name: string;
  price: number;
  description: string;
  billingSuffix?: string;
};

export type BaseServicePackage = {
  name: string;
  pitch: string;
  deliverables: string[];
  timeline: string;
  idealFor: string;
  tiers: ServiceTier[];
  badge?: string;
};

export const servicePackages: BaseServicePackage[] = [
  {
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
    tiers: [
      {
        name: "Starter",
        price: 1800,
        description: "Single-page site covering your offer, proof, and clear contact path.",
      },
      {
        name: "Plus",
        price: 2300,
        description: "Up to five sections with lead capture, scheduling integration, and CMS-ready content slots.",
      },
    ],
    badge: "Starter-friendly",
  },
  {
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
    tiers: [
      {
        name: "Starter",
        price: 2500,
        description: "Conversion-focused refresh for three key sections plus copy updates.",
      },
      {
        name: "Plus",
        price: 3200,
        description: "Includes component upgrades, page speed fixes, analytics event revamp, and QA support for launch.",
      },
    ],
    badge: "Most popular",
  },
  {
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
    tiers: [
      {
        name: "Starter",
        price: 700,
        billingSuffix: " / month",
        description: "Up to 10 hours for quick iterations, landing page edits, or bug fixes.",
      },
      {
        name: "Plus",
        price: 1200,
        billingSuffix: " / month",
        description: "Up to 20 hours with priority responses, experiment support, and rollover buffer.",
      },
    ],
    badge: "Best value",
  },
];
