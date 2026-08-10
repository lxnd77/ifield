/**
 * Homepage testimonials.
 *
 * Featured projects (ProjectsGrid) and the journal carousel
 * (JournalCarousel) both read live from the CMS collections instead —
 * see src/lib/projects.ts and src/lib/posts.ts. Testimonials stay
 * hand-curated data since there is no CMS collection for them.
 */

// ── TESTIMONIALS (two slides of three) ────────────────────────

export interface Testimonial {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly brand: string;
}

export const testimonials: readonly Testimonial[] = [
  {
    quote: "I-Field's end-to-end execution of our 320-room renovation was flawless. Their understanding of the hospitality environment meant zero disruption to our operational floors — a genuinely rare capability in this market.",
    name: 'Ahmed Al-Rashidi', role: 'VP Development, MENA', brand: 'InterContinental Hotels Group',
  },
  {
    quote: 'From furniture procurement to final installation, I-Field maintained exceptional quality control at every stage. Their factory capacity and regional reach are unmatched for projects of our scale.',
    name: 'Sandra Müller', role: 'Director of Procurement, Europe', brand: 'Sofitel Luxury Hotels',
  },
  {
    quote: 'Working with a team that has actually operated hotels makes all the difference. I-Field anticipates problems before they become issues, and they deliver on timeline — every time.',
    name: 'James Okafor', role: 'General Manager', brand: 'Hyatt Regency, Riyadh',
  },
  {
    quote: 'I-Field brought a level of craftsmanship and attention to detail that perfectly matched the Crowne Plaza brand standards. Their team was professional, responsive, and thorough throughout.',
    name: 'Lena Harrington', role: 'Head of Capital Projects', brand: 'Crowne Plaza Hotels',
  },
  {
    quote: 'Rarely do you find a contractor that understands both the design intent and the operational realities of a hotel environment. I-Field bridged that gap seamlessly on our Nairobi project.',
    name: 'David Mwangi', role: 'Regional Director, Africa', brand: 'Radisson Hotel Group',
  },
  {
    quote: 'The I-Field team managed a complex multi-floor renovation on an occupied property with exceptional care. Guest feedback on the new rooms has been overwhelmingly positive.',
    name: 'Yasmine Al Sayed', role: 'Owner Representative', brand: 'Fairfield by Marriott, Dubai',
  },
];

/** Three cards per slide, as designed. */
export const TESTIMONIALS_PER_SLIDE = 3;
