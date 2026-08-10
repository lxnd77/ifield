/**
 * Homepage services grid — the eight capabilities in teaser form.
 * Names and blurbs are verbatim from the homepage design source; each
 * card links through to its row on /capabilities.
 */
import type { ImageKey } from './images';
import { capabilities } from './capabilities';

export interface Service {
  readonly name: string;
  readonly desc: string;
  readonly href: string;
  readonly image: ImageKey;
}

const blurbs: readonly string[] = [
  'Complete interior fit-out from concept to handover',
  'Bespoke joinery, built-ins & fixed millwork',
  'Architectural metalwork, balustrades & glazing',
  'Custom seating, casegoods & contract furniture',
  'Drapery, sheers, blinds & blackout systems',
  'Carpets, rugs, stone & specialist flooring',
  'Feature, architectural & decorative lighting',
  'Curated art programmes & decorative accessories',
];

const homeImages: readonly ImageKey[] = [
  'homeService01',
  'homeService02',
  'homeService03',
  'homeService04',
  'homeService05',
  'homeService06',
  'homeService07',
  'homeService08',
];

export const services: readonly Service[] = capabilities.map((cap, i) => ({
  name: cap.name,
  desc: blurbs[i]!,
  href: `/capabilities#${cap.slug}`,
  image: homeImages[i]!,
}));
