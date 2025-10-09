import type { Messages } from "@/i18n";

export type ServiceTierId = "starter" | "plus";

export type ServiceTierBase = {
  id: ServiceTierId;
  price: number;
};

export type ServicePackageBase = {
  id: keyof Messages["services"]["packages"];
  tiers: ServiceTierBase[];
};

const servicePackagesBase: ServicePackageBase[] = [
  {
    id: "launchEssentials",
    tiers: [
      { id: "starter", price: 1800 },
      { id: "plus", price: 2300 },
    ],
  },
  {
    id: "conversionRefresh",
    tiers: [
      { id: "starter", price: 2500 },
      { id: "plus", price: 3200 },
    ],
  },
  {
    id: "growthSupport",
    tiers: [
      { id: "starter", price: 700 },
      { id: "plus", price: 1200 },
    ],
  },
];

export type ServiceTier = {
  id: ServiceTierId;
  name: string;
  price: number;
  description: string;
  billingSuffix?: string;
};

export type LocalizedServicePackage = {
  id: string;
  name: string;
  pitch: string;
  deliverables: string[];
  timeline: string;
  idealFor: string;
  tiers: ServiceTier[];
  badge?: string;
};

export function getLocalizedServicePackages(
  copy: Messages["services"]["packages"]
): LocalizedServicePackage[] {
  return servicePackagesBase.map((base) => {
    const packageCopy = copy[base.id];
    if (!packageCopy) {
      throw new Error(`Missing localized copy for service package: ${base.id}`);
    }

    const tiers = base.tiers.map((tier) => {
      const tierCopy = packageCopy.tiers[tier.id as keyof typeof packageCopy.tiers];
      if (!tierCopy) {
        throw new Error(`Missing localized copy for service tier: ${base.id}.${tier.id}`);
      }

      const { name, description, billingSuffix } = tierCopy as {
        name: string;
        description: string;
        billingSuffix?: string;
      };

      return {
        id: tier.id,
        name,
        price: tier.price,
        description,
        billingSuffix,
      } satisfies ServiceTier;
    });

    return {
      id: base.id,
      name: packageCopy.name,
      pitch: packageCopy.pitch,
      deliverables: [...packageCopy.deliverables],
      timeline: packageCopy.timeline,
      idealFor: packageCopy.idealFor,
      badge: packageCopy.badge,
      tiers,
    } satisfies LocalizedServicePackage;
  });
}
