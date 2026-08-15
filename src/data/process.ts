/**
 * The six process stages, shared by the homepage flow and /process.
 *
 * `desc` is the short homepage copy; `longDesc`, `tag` and `output` are
 * the fuller Process-page copy. Both verbatim from their design sources.
 */
import type { ImageKey } from "./images";

export interface ProcessStep {
  readonly no: string;
  readonly name: string;
  /** Short blurb, homepage flow. */
  readonly desc: string;
  /** Playfair-italic line, Process page. */
  readonly tag: string;
  /** Fuller description, Process page. */
  readonly longDesc: string;
  /** The "You receive" deliverable, Process page. */
  readonly output: string;
  readonly image: ImageKey;
}

export const processSteps: readonly ProcessStep[] = [
  {
    no: "01",
    name: "Assess",
    desc: "We assess the site and business for clarity on scope and budget, with cost-engineering to maximise value.",
    tag: "Clarity on scope & budget.",
    longDesc:
      "We study the site and the business behind it, defining scope and budget with the detail needed to price accurately — then cost-engineer options to protect value from day one.",
    output: "Scope brief & cost-engineered budget",
    image: "processStage01",
  },
  {
    no: "02",
    name: "Technical Design",
    desc: "We turn approved designs into precise, consistent AutoCAD drawings before fabrication begins.",
    tag: "Precise, in-house technical drawings.",
    longDesc:
      "Our in-house technical team translates the approved design into precise AutoCAD drawings and specifications, holding accuracy and consistency across every discipline before a single item is made.",
    output: "Coordinated drawings & specification set",
    image: "processStage02",
  },
  {
    no: "03",
    name: "Procurement",
    desc: "We identify and source the ideal materials for your project, with samples until you're fully satisfied.",
    tag: "Sourced, sampled, approved.",
    longDesc:
      "We identify and source the ideal materials for the project, presenting physical samples and refining them with you until every finish is signed off — once, and for good.",
    output: "Approved material & finish samples",
    image: "processStage03",
  },
  {
    no: "04",
    name: "Production",
    desc: "We source the highest-quality raw materials and custom-manufacture all FF&E in our own facilities.",
    tag: "Custom-made in our facilities.",
    longDesc:
      "We source the highest-quality raw materials and custom-manufacture all FF&E in our own facilities — so quality control, tolerances and timeline stay entirely in our hands.",
    output: "Manufactured, QC-passed FF&E",
    image: "processStage04",
  },
  {
    no: "05",
    name: "Logistics",
    desc: "We navigate international regulations and provide full logistical support for seamless transportation.",
    tag: "Across borders, fully handled.",
    longDesc:
      "We navigate international regulations and provide full logistical support — consolidation, freight and documentation — for seamless transportation to any destination market.",
    output: "Cleared, tracked shipment to site",
    image: "processStage05",
  },
  {
    no: "06",
    name: "Delivery & Installation",
    desc: "We deliver on time and in perfect condition, then our trained teams install — including wetwork and fit-out.",
    tag: "Handed over, ready to open.",
    longDesc:
      "We deliver on time and in perfect condition, then our trained teams install everything on site — including wetwork and fit-out — and hand over a space ready to open its doors.",
    output: "Turnkey space, snagged & complete",
    image: "processStage06",
  },
];
