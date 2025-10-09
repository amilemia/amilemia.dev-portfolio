import type { Messages } from "@/i18n";
import type { TestimonialItem } from "@/components/testimonials/Carousel";

export function getTestimonials(copy: Messages["shared"]["testimonials"]): TestimonialItem[] {
  return copy.map((item) => ({ ...item }));
}
