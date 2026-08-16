/**
 * The nine global offices, plus their positions on the world map.
 *
 * Pin coordinates are percentages of the map image and come straight
 * from the design source — they are calibrated to worldmap.png and will
 * drift if that image is ever replaced or re-cropped.
 */

export interface Office {
  /** Stable slug — anchors the card and links map pins to it. */
  readonly id: string;
  readonly name: string;
  readonly address: string;
  /** Rendered as HTML — contains <br> and tel:/mailto: links. */
  readonly contact?: string;
  readonly isHq?: true;
  /** Shown as a pill beside the name. */
  readonly tag?: string;
}

export const offices: readonly Office[] = [
  {
    id: 'hq',
    name: 'Head Office',
    address: '1408, 13/F, CEO Tower, 77 Wing Hong Street, Cheung Sha Wan, Hong Kong',
    isHq: true,
    tag: 'HQ',
  },
  {
    id: 'china',
    name: 'China Office',
    address:
      '315, 3rd Floor, DeWei Tower, No.626 Shibai Industrial Road, Panyu District, Guangzhou, P.R. China',
    contact:
      'Tel: <a href="tel:+862039232167">+86 20 39232167</a> / 39232577 / 39232657<br>Fax: +86 20 34337465',
  },
  {
    id: 'uae',
    name: 'UAE Office',
    address:
      'Office 214, Floor 2, European Business Centre Bldg, Dubai Investment Park, Jebel Ali, Dubai, UAE · P.O. Box 451970',
    contact:
      'Tel: <a href="tel:+97143540227">+971 04 354 0227</a> | <a href="tel:+971501382847">+971 50 138 2847</a>',
  },
  {
    id: 'nigeria',
    name: 'Nigeria Office',
    address: 'Block 13, Plot 2, Palace Road, VI, Lagos, Nigeria',
    contact: 'M: <a href="tel:+2349037572893">+234 903 757 2893</a>',
  },
  {
    id: 'india',
    name: 'India Office',
    address:
      'Office No. 201, Second Floor, Plot No. 81, Patel Colony, Sardar Patel Marg, C-Scheme, Jaipur, Rajasthan, India',
    contact:
      'M: <a href="tel:+919887514715">+91 98875 14715</a><br><a href="mailto:hariram@ifield.co.in">hariram@ifield.co.in</a>',
  },
  {
    id: 'uk',
    name: 'UK Office',
    address: '103 Vanbrugh Park, London, SE3 7AL',
    contact:
      'Tel: <a href="tel:+442082692189">0208 2692189</a> / 07740 308634<br><a href="mailto:david.bell@i-field.co.uk">david.bell@i-field.co.uk</a>',
  },
  {
    id: 'somaliland',
    name: 'Somaliland Office',
    address: 'Airport Road, Masala, next to Police Station, Hargeisa',
    contact:
      'Tel: <a href="tel:+2630639000009">063 9000009</a><br><a href="mailto:info@ifield.ae">info@ifield.ae</a>',
  },
  {
    id: 'ksa',
    name: 'KSA Office',
    address: 'Riyadh, Kingdom of Saudi Arabia <em>(details to follow)</em>',
  },
  {
    id: 'bangladesh',
    name: 'Bangladesh Office',
    address: 'Dhaka, Bangladesh <em>(details to follow)</em>',
  },
];

/** Label placement relative to the pin. */
export type PinLabelPos = 'l' | 'r' | 't' | 'b' | 'tl' | 'tr' | 'bl' | 'br';

export interface MapPin {
  readonly label: string;
  /** Matches an Office.id — clicking the pin scrolls to that card. */
  readonly officeId: string;
  /** Percentage across the map image. */
  readonly left: number;
  /** Percentage down the map image. */
  readonly top: number;
  readonly pos: PinLabelPos;
  readonly isHq?: true;
}

export const mapPins: readonly MapPin[] = [
  { label: 'UK', officeId: 'uk', left: 47.75, top: 34.46, pos: 'l' },
  { label: 'Saudi Arabia', officeId: 'ksa', left: 59.68, top: 45.88, pos: 'tl' },
  { label: 'UAE', officeId: 'uae', left: 61.87, top: 45.66, pos: 'br' },
  { label: 'Somaliland', officeId: 'somaliland', left: 59.02, top: 52.31, pos: 'b' },
  { label: 'Nigeria', officeId: 'nigeria', left: 48.65, top: 53.63, pos: 'bl' },
  { label: 'India', officeId: 'india', left: 67.09, top: 44.94, pos: 't' },
  { label: 'Bangladesh', officeId: 'bangladesh', left: 70.81, top: 46.26, pos: 'b' },
  { label: 'China', officeId: 'china', left: 76.05, top: 45.96, pos: 'tr' },
  { label: 'Hong Kong', officeId: 'hq', left: 76.84, top: 46.9, pos: 'br', isHq: true },
];
