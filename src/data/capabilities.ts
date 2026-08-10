/**
 * ============================================================
 * CAPABILITIES
 * ============================================================
 * The eight disciplines, verbatim from the design source
 * (Capabilities.dc.html → renderVals().caps).
 *
 * `slug` drives the anchor id on each row. The footer's Services
 * column links to these, so changing one breaks a footer link —
 * see footerServiceLinks in src/data/site.ts.
 */
import type { ImageKey } from './images';

export interface Capability {
  readonly no: string;
  readonly slug: string;
  readonly name: string;
  /** Playfair-italic line under the heading. */
  readonly tag: string;
  readonly desc: string;
  /** Exactly four — the cascade animation is timed for four items. */
  readonly scope: readonly [string, string, string, string];
  readonly image: ImageKey;
}

export const capabilities: readonly Capability[] = [
  {
    no: '01',
    slug: 'fit-outs',
    name: 'Fit-Outs',
    tag: 'Concept to handover.',
    desc: 'Complete interior fit-out delivered as a single turnkey package. We coordinate ceilings, partitions, wall finishes and wet areas, manage the site, and hand over a space ready to open.',
    scope: [
      'Ceilings & partitions',
      'Wall finishes & cladding',
      'Wet areas & MEP coordination',
      'Site management & snagging',
    ],
    image: 'capability01',
  },
  {
    no: '02',
    slug: 'fixed-furniture-joineries',
    name: 'Fixed Furniture & Joineries',
    tag: 'Bespoke built-ins & millwork.',
    desc: 'Custom joinery and fixed millwork manufactured in our own facilities — engineered to the drawing and finished to the standard the brand demands.',
    scope: [
      'Reception & BOH joinery',
      'Wardrobes & vanities',
      'Headboards & feature walls',
      'Veneer & laminate finishes',
    ],
    image: 'capability02',
  },
  {
    no: '03',
    slug: 'metal-glasswork',
    name: 'Metal & Glasswork',
    tag: 'Architectural metal & glazing.',
    desc: 'Architectural metalwork and feature glazing, from balustrades and decorative screens to mirrors and partitions — fabricated, finished and installed in-house.',
    scope: [
      'Balustrades & handrails',
      'Decorative screens',
      'Feature glazing & mirrors',
      'Powder-coat & PVD finishes',
    ],
    image: 'capability03',
  },
  {
    no: '04',
    slug: 'loose-furniture-case-goods',
    name: 'Loose Furniture & Case Goods',
    tag: 'Custom seating & casegoods.',
    desc: 'Contract-grade loose furniture built for hospitality use — lounge and lobby seating, guestroom casegoods and restaurant furniture, upholstered to specification.',
    scope: [
      'Lounge & lobby seating',
      'Guestroom casegoods',
      'Restaurant & banquet seating',
      'Upholstery & fabrics',
    ],
    image: 'capability04',
  },
  {
    no: '05',
    slug: 'window-treatments',
    name: 'Window Treatments',
    tag: 'Drapery, sheers & blackout.',
    desc: 'Soft window treatments fabricated and installed to suit each space — from sheers and decorative drapery to motorised blackout systems and concealed hardware.',
    scope: [
      'Drapery & sheers',
      'Blackout & dimout linings',
      'Motorised tracks',
      'Pelmets & hardware',
    ],
    image: 'capability05',
  },
  {
    no: '06',
    slug: 'floor-treatments',
    name: 'Floor Treatments',
    tag: 'Carpets, rugs & stone.',
    desc: 'Specialist flooring across the property — bespoke carpets and rugs, stone and tile — supplied, fitted and protected through to handover.',
    scope: [
      'Axminster & tufted carpets',
      'Bespoke rugs',
      'Stone & tile',
      'Underlay & installation',
    ],
    image: 'capability06',
  },
  {
    no: '07',
    slug: 'decorative-lighting',
    name: 'Decorative Lighting',
    tag: 'Feature & architectural light.',
    desc: 'Decorative and feature lighting custom-fabricated to the design — chandeliers, bedside and task fittings — fully tested and compliant for the destination market.',
    scope: [
      'Chandeliers & feature pieces',
      'Bedside & task lighting',
      'Custom fabrication',
      'Controls & compliance',
    ],
    image: 'capability07',
  },
  {
    no: '08',
    slug: 'artwork-accessories',
    name: 'Artwork & Accessories',
    tag: 'Curated art & styling.',
    desc: 'The final layer that brings a space to life — curated art programmes, sculpture, decorative accessories and styling, framed and installed on site.',
    scope: [
      'Curated art programmes',
      'Sculpture & wall art',
      'Styling & accessories',
      'Framing & installation',
    ],
    image: 'capability08',
  },
];
