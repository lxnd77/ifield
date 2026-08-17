/**
 * ============================================================
 * IMAGE MANIFEST
 * ============================================================
 * Every fixed image on the site resolves through this file.
 *
 * To supply a real image: drop the file into `public/<path>`
 * using EXACTLY the filename below. Nothing else changes — no
 * code edits, no config. Any slot whose file is missing renders
 * the diagonal-hatch placeholder from the original designs with
 * its slot name printed on it, so gaps are always obvious and
 * the site is always presentable.
 *
 * Run `npm run check:images` to list what is still missing.
 *
 * Project and article imagery is NOT listed here — that uploads
 * through the CMS in phase 6/7.
 */

export type Ratio = '1:1' | '3:4' | '4:5' | '4:3' | '16:9' | '16:11' | '21:9' | '9:16';

export interface ImageSlot {
  /** Path relative to `public/`, without a leading slash. */
  readonly path: string;
  /** Intended aspect ratio — drives the placeholder box and CSS. */
  readonly ratio: Ratio;
  /** Minimum pixel width to supply for a crisp result. */
  readonly minWidth: number;
  /** What this image shows and where it appears. */
  readonly description: string;
  /** Default alt text. Override per-usage where context demands. */
  readonly alt: string;
  /** Already supplied from the design bundle. */
  readonly present?: true;
}

// ══════════════════════════════════════════════════════════════
// Reference data — declared before use, drives the descriptions
// ══════════════════════════════════════════════════════════════

const SERVICE_NAMES = [
  'Fit-Outs',
  'Fixed Furniture & Joineries',
  'Metal & Glasswork',
  'Loose Furniture & Case Goods',
  'Window Treatments',
  'Floor Treatments',
  'Decorative Lighting',
  'Artwork & Accessories',
] as const;

const PROCESS_NAMES = [
  'Assess',
  'Design',
  'Procurement',
  'Production',
  'Logistics',
  'Delivery & Installation',
] as const;

const MILESTONES = [
  '2003 — Founded in Hong Kong',
  '2011 — Manufacturing in China',
  '2013 — Daka Import & Export',
  '2019 — Into the Americas',
  '2019 — India operations',
  '2020 — Middle East hub',
  '2021 — Expanding across Africa',
] as const;

const pad = (i: number) => String(i).padStart(2, '0');

/** Homepage services grid card. */
const svc = (i: number): ImageSlot => ({
  path: `images/home/service-${pad(i)}.webp`,
  ratio: '3:4',
  minWidth: 800,
  description: `Services grid card ${i} of 8 — ${SERVICE_NAMES[i - 1]}. Shown grayscale, colour on hover.`,
  alt: SERVICE_NAMES[i - 1]!,
});

/** Homepage featured-projects grid card. */
const hproj = (i: number): ImageSlot => ({
  path: `images/home/project-${pad(i)}.webp`,
  ratio: '16:11',
  minWidth: 700,
  description: `Featured projects grid card ${i} of 6 on the homepage.`,
  alt: 'I-Field project',
});

/** Capabilities page alternating row. */
const cap = (i: number): ImageSlot => ({
  path: `images/capabilities/${pad(i)}.webp`,
  ratio: '4:3',
  minWidth: 1000,
  description: `Capability row ${i} of 8 — ${SERVICE_NAMES[i - 1]}.`,
  alt: SERVICE_NAMES[i - 1]!,
});

/** The Company team grid portrait. */
const team = (i: number): ImageSlot => ({
  path: `images/company/team-${pad(i)}.webp`,
  ratio: '3:4',
  minWidth: 600,
  description: `Team grid portrait ${i} of 15. Grayscale, colour on hover.`,
  alt: 'I-Field team member',
});

/** The Company timeline milestone card. */
const milestone = (i: number): ImageSlot => ({
  path: `images/company/milestone-${pad(i)}.webp`,
  ratio: '16:9',
  minWidth: 800,
  description: `Our Journey timeline card ${i} of 7 — ${MILESTONES[i - 1]}.`,
  alt: `I-Field milestone — ${MILESTONES[i - 1]}`,
});

/** Process page stage image. */
const stage = (i: number): ImageSlot => ({
  path: `images/process/stage-${pad(i)}.webp`,
  ratio: '4:3',
  minWidth: 1000,
  description: `Process stage ${i} of 6 — ${PROCESS_NAMES[i - 1]}.`,
  alt: PROCESS_NAMES[i - 1]!,
});

/** Projects page Flagship Work card. */
const feat = (i: number): ImageSlot => ({
  path: `images/projects/featured-${pad(i)}.webp`,
  ratio: '4:3',
  minWidth: 1000,
  description: `Flagship Work card ${i} of 8 on the Projects page.`,
  alt: 'I-Field flagship project',
});

/** Full-bleed page hero. */
const hero = (name: string, file: string, note: string): ImageSlot => ({
  path: `images/hero/${file}.webp`,
  ratio: '21:9',
  minWidth: 1900,
  description: `${name} page hero. ${note}`,
  alt: '',
});

// ══════════════════════════════════════════════════════════════
// THE MANIFEST
// ══════════════════════════════════════════════════════════════

export const images = {
  // ── BRAND — supplied with the design bundle ──
  logoDark: {
    path: 'images/brand/logo-dark.webp',
    ratio: '16:9',
    minWidth: 400,
    description: 'I-Field wordmark, dark. Nav in scrolled state.',
    alt: 'I-Field',
    present: true,
  },
  logoWhite: {
    path: 'images/brand/logo-white.webp',
    ratio: '16:9',
    minWidth: 400,
    description: 'I-Field wordmark, white. Nav over dark heroes, and the footer.',
    alt: 'I-Field',
    present: true,
  },
  element01: {
    path: 'images/brand/element-01.webp',
    ratio: '1:1',
    minWidth: 800,
    description: 'Decorative arch mark. Hero overlays and the Services watermark.',
    alt: '',
    present: true,
  },
  element02: {
    path: 'images/brand/element-02.webp',
    ratio: '1:1',
    minWidth: 800,
    description: 'Decorative arch mark. Global Presence left, Projects top-left.',
    alt: '',
    present: true,
  },
  element03: {
    path: 'images/brand/element-03.webp',
    ratio: '1:1',
    minWidth: 800,
    description: 'Decorative arch mark. Company section and Process bottom-right.',
    alt: '',
    present: true,
  },
  worldmap: {
    path: 'images/brand/worldmap.webp',
    ratio: '16:9',
    minWidth: 1400,
    description: 'World map behind the nine office pins in the Contact section.',
    alt: 'Map of I-Field global offices',
    present: true,
  },

  // ── PAGE HEROES — full-bleed, rendered B&W at ~40% brightness ──
  heroHomePoster: {
    path: 'video/home-hero-poster.jpg',
    ratio: '16:9',
    minWidth: 1440,
    description: 'Homepage hero video poster frame. Replace only if the video changes.',
    alt: '',
    present: true,
  },
  heroCapabilities: hero('Capabilities', 'capabilities', 'Interior detail or workshop craft.'),
  heroCompany: hero('The Company', 'company', 'Team, factory floor or flagship lobby.'),
  heroProcess: hero('Process', 'process', 'Drawings, samples or a site in progress.'),
  heroProjects: hero('Projects', 'projects', 'A signature completed property.'),
  heroJournal: hero('Journal', 'journal', 'Editorial, atmospheric interior.'),
  heroCareers: hero('Careers', 'careers', 'People at work — factory, studio or site.'),

  // ── HOMEPAGE ──
  homeCompanyPortrait: {
    path: 'images/home/company-portrait.webp',
    ratio: '4:5',
    minWidth: 900,
    description: 'The Company section image, with the offset red accent square.',
    alt: 'The I-Field team',
  },
  homeService01: svc(1),
  homeService02: svc(2),
  homeService03: svc(3),
  homeService04: svc(4),
  homeService05: svc(5),
  homeService06: svc(6),
  homeService07: svc(7),
  homeService08: svc(8),
  homeProject01: hproj(1),
  homeProject02: hproj(2),
  homeProject03: hproj(3),
  homeProject04: hproj(4),
  homeProject05: hproj(5),
  homeProject06: hproj(6),

  // ── CAPABILITIES — the eight alternating rows ──
  capability01: cap(1),
  capability02: cap(2),
  capability03: cap(3),
  capability04: cap(4),
  capability05: cap(5),
  capability06: cap(6),
  capability07: cap(7),
  capability08: cap(8),

  // ── THE COMPANY ──
  companyStory: {
    path: 'images/company/story.webp',
    ratio: '16:9',
    minWidth: 1600,
    description: 'Wide image below the Our Story two-column block.',
    alt: 'An I-Field hospitality project',
  },
  companyApproach: {
    path: 'images/company/approach.webp',
    ratio: '4:5',
    minWidth: 900,
    description: 'Our Approach section image — craftsmanship detail.',
    alt: 'I-Field craftsmanship',
  },
  companyFounder: {
    path: 'images/company/founder.webp',
    ratio: '4:5',
    minWidth: 900,
    description: 'Portrait of Abhay Bhargava, Founder & Managing Director.',
    alt: 'Abhay Bhargava, Founder and Managing Director',
  },
  companyTeam01: team(1),
  companyTeam02: team(2),
  companyTeam03: team(3),
  companyTeam04: team(4),
  companyTeam05: team(5),
  companyTeam06: team(6),
  companyTeam07: team(7),
  companyTeam08: team(8),
  companyTeam09: team(9),
  companyTeam10: team(10),
  companyTeam11: team(11),
  companyTeam12: team(12),
  companyTeam13: team(13),
  companyTeam14: team(14),
  companyTeam15: team(15),
  companyMilestone01: milestone(1),
  companyMilestone02: milestone(2),
  companyMilestone03: milestone(3),
  companyMilestone04: milestone(4),
  companyMilestone05: milestone(5),
  companyMilestone06: milestone(6),
  companyMilestone07: milestone(7),

  // ── PROCESS — the six stages ──
  processStage01: stage(1),
  processStage02: stage(2),
  processStage03: stage(3),
  processStage04: stage(4),
  processStage05: stage(5),
  processStage06: stage(6),

  // ── PROJECTS ──
  projectsFeatured01: feat(1),
  projectsFeatured02: feat(2),
  projectsFeatured03: feat(3),
  projectsFeatured04: feat(4),
  projectsFeatured05: feat(5),
  projectsFeatured06: feat(6),
  projectsFeatured07: feat(7),
  projectsFeatured08: feat(8),
  projectsRegionUsa: {
    path: 'images/projects/region-usa.webp',
    ratio: '21:9',
    minWidth: 1800,
    description: 'Full-bleed banner for the United States portfolio group.',
    alt: 'United States projects',
  },
  projectsRegionMea: {
    path: 'images/projects/region-mea.webp',
    ratio: '21:9',
    minWidth: 1800,
    description: 'Full-bleed banner for the Middle East & Africa portfolio group.',
    alt: 'Middle East and Africa projects',
  },
  projectsRegionIndia: {
    path: 'images/projects/region-india.webp',
    ratio: '21:9',
    minWidth: 1800,
    description: 'Full-bleed banner for the India & S.E. Asia portfolio group.',
    alt: 'India and South East Asia projects',
  },
  projectsRegionChina: {
    path: 'images/projects/region-china.webp',
    ratio: '21:9',
    minWidth: 1800,
    description: 'Full-bleed banner for the China portfolio group.',
    alt: 'China projects',
  },

  // ── SOCIAL / SEO ──
  ogDefault: {
    path: 'images/og-default.jpg',
    ratio: '16:9',
    minWidth: 1200,
    description: 'Fallback social share card (1200×630). Used where a page has no image of its own.',
    alt: 'I-Field — Luxury Hospitality Fit-Out & FF&E',
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;

/** Client logo ticker — 24 files, all supplied with the bundle. */
export const clientLogos: ReadonlyArray<{ path: string; alt: string }> = [
  'Crowne Plaza',
  'Sofitel',
  'Park Inn by Radisson',
  'Fortune Hotels',
  'Fairfield by Marriott',
  'Hyatt',
  'Hilton',
  'JW Marriott',
  'Four Points by Sheraton',
  'Shangri-La',
  'Sheraton',
  'Ramada Plaza',
  'Pullman',
  'Courtyard by Marriott',
  'Taj',
  'Westin',
  'Novotel',
  'St. Regis',
  'Renaissance',
  'ibis',
  'InterContinental',
  'Sarovar',
  'Marriott',
  'Radisson',
].map((alt, i) => ({ path: `images/clients/${pad(i + 1)}.webp`, alt }));

/** Aspect ratio as a CSS `aspect-ratio` value. */
export function ratioToCss(ratio: Ratio): string {
  return ratio.replace(':', ' / ');
}
