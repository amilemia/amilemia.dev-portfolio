import type { Messages } from "@/i18n";

export interface TestimonialItem {
  quote: string;
  author: string;
  fullName: string;
  role: string;
  company: string;
  companyLogo?: string;
  avatarUrl?: string;
  metric: string;
}

export function getTestimonials(copy: Messages["shared"]["testimonials"]): TestimonialItem[] {
  return copy.map((item) => ({ ...item }));
}
