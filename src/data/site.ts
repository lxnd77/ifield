/**
 * ============================================================
 * SITE CONFIGURATION
 * ============================================================
 * Navigation, footer and the contact details that appear in more
 * than one place. Single source of truth — no component should
 * hard-code a route, phone number or address.
 */

export const site = {
  name: "I-Field",
  tagline:
    "Delivering the epitome of luxury to hospitality environments worldwide.",
  /**
   * Homepage-only <title>. Passed to BaseLayout as-is (it already
   * contains the brand name, so BaseLayout won't append it again) —
   * every other page instead passes just its own segment and lets
   * BaseLayout add " — I-Field".
   */
  homeTitle: "I-Field | Luxury Hospitality Fit-Out & FF&E Company",
  description:
    "I-Field designs, manufactures and installs turnkey fit-out and FF&E for luxury hotels worldwide — one accountable team, nine offices, four continents.",
  /** Rendered in the footer copyright line. */
  copyrightYear: 2026,
} as const;

export const contact = {
  phonePrimary: { label: "+971 54 589 7890", href: "tel:+971545897890" },
  phoneSecondary: { label: "+971 55 674 9865", href: "tel:+971556749865" },
  email: { label: "info@ifield.ae", href: "mailto:info@ifield.ae" },
} as const;

/** Footer office roll-call, in the homepage footer's order. */
export const officeSummary =
  "Hong Kong (HQ) · China · UAE · Saudi Arabia · India · Bangladesh · Nigeria · United Kingdom · Somaliland";

// ══════════════════════════════════════════════════════════════
// NAVIGATION
// Points at standalone pages, per the agreed structure. Only the
// "Get in Touch" CTA remains an anchor, onto the homepage form.
// ══════════════════════════════════════════════════════════════

export interface NavLink {
  readonly label: string;
  readonly href: string;
  /** Marks this link active for any URL beginning with this prefix. */
  readonly match: string;
}

export const navLinks: readonly NavLink[] = [
  { label: "The Company", href: "/the-company", match: "/the-company" },
  { label: "Capabilities", href: "/capabilities", match: "/capabilities" },
  { label: "Process", href: "/process", match: "/process" },
  { label: "Projects", href: "/projects", match: "/projects" },
  { label: "Journal", href: "/journal", match: "/journal" },
];

export const navCta = { label: "Get in Touch", href: "/#contact" } as const;

// ══════════════════════════════════════════════════════════════
// FOOTER
// Copy is the homepage footer's, verbatim — the inner-page footers
// are discarded. Only the hrefs are new, since the prototypes
// pointed everything at "#".
// ══════════════════════════════════════════════════════════════

export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

export const footerCompanyLinks: readonly FooterLink[] = [
  { label: "The Company", href: "/the-company" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Process", href: "/process" },
  { label: "Projects", href: "/projects" },
  { label: "Journal", href: "/journal" },
];

/**
 * The homepage footer's Services column does not map one-to-one onto the
 * eight Capabilities rows — it lists "Draperies" and "Wet Finishing",
 * neither of which is a capability, and omits Metal & Glasswork.
 * The labels are kept exactly as written and pointed at the nearest
 * capability anchor. Flagged for a content decision.
 */
export const footerServiceLinks: readonly FooterLink[] = [
  { label: "Fit Out Works", href: "/capabilities#fit-outs" },
  {
    label: "Fixed Furniture & Joineries",
    href: "/capabilities#fixed-furniture-joineries",
  },
  { label: "Decorative Lighting", href: "/capabilities#decorative-lighting" },
  {
    label: "Window & Floor Treatments",
    href: "/capabilities#window-treatments",
  },
  { label: "Draperies", href: "/capabilities#window-treatments" },
  { label: "Wet Finishing", href: "/capabilities#fit-outs" },
  {
    label: "Loose Furniture",
    href: "/capabilities#loose-furniture-case-goods",
  },
  { label: "Artwork & Accessories", href: "/capabilities#artwork-accessories" },
];

export const footerLegalLinks: readonly FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  // Handled by the consent script — opens the preferences dialog.
  { label: "Cookie Settings", href: "/cookie-policy" },
];

export interface SocialLink {
  readonly label: string;
  readonly short: string;
  readonly href: string;
}

export const socialLinks: readonly SocialLink[] = [
  { label: "Instagram", short: "ig", href: "https://www.instagram.com/ifield_ltd/" },
  { label: "LinkedIn", short: "in", href: "https://www.linkedin.com/company/i-field-limited/" },
];

// ══════════════════════════════════════════════════════════════
// STATS
// The homepage figures are authoritative; the Projects page hero
// is reconciled to these.
// ══════════════════════════════════════════════════════════════

export interface Stat {
  /** Numeric target for the count-up, or null for a static value. */
  readonly target: number | null;
  readonly display: string;
  readonly sup?: string;
  readonly label: string;
}

export const stats: readonly Stat[] = [
  { target: 70, display: "100", sup: "+", label: "Projects Completed" },
  { target: 20, display: "20", sup: "+", label: "Years of Experience" },
  { target: 9, display: "9", label: "Global Offices" },
  { target: 20, display: "20", sup: "+", label: "Countries Served" },
  { target: null, display: "40K", sup: "m²", label: "Factory Capacity" },
];
