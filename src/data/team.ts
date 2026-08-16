/**
 * The Company — timeline milestones and team roster.
 * Both verbatim from The Company.dc.html → renderVals().
 */
import type { ImageKey } from "./images";

// ── OUR JOURNEY ───────────────────────────────────────────────

export interface Milestone {
  readonly year: string;
  readonly month: string;
  readonly title: string;
  readonly text: string;
  readonly image: ImageKey;
}

export const milestones: readonly Milestone[] = [
  {
    year: "2003",
    month: "May",
    title: "Founded in Hong Kong",
    text: "I-Field is established as a turnkey hospitality contractor, building the supply and execution systems that still define us today.",
    image: "companyMilestone01",
  },
  {
    year: "2011",
    month: "June",
    title: "Manufacturing in China",
    text: "A joint-venture factory opens in Dongguan, bringing bespoke FF&E production fully in-house.",
    image: "companyMilestone02",
  },
  {
    year: "2013",
    month: "October",
    title: "Daka Import & Export",
    text: "Established in Guangzhou, making our supply chain entirely self-reliant from end to end.",
    image: "companyMilestone03",
  },
  {
    year: "2019",
    month: "February",
    title: "Into the Americas",
    text: "I-Field USA is established in Houston, Texas.",
    image: "companyMilestone04",
  },
  {
    year: "2019",
    month: "December",
    title: "India operations",
    text: "I-Field International Pvt. Ltd. opens in Jaipur to support our growing workforce.",
    image: "companyMilestone05",
  },
  {
    year: "2020",
    month: "December",
    title: "Middle East hub",
    text: "I-Field Furnishing Trading L.L.C is established in Dubai as our control hub for the Middle East and East Africa.",
    image: "companyMilestone06",
  },
  {
    year: "2021",
    month: "November",
    title: "Expanding across Africa",
    text: "I-Field Interiors opens in Lagos, Nigeria, extending our reach across the continent.",
    image: "companyMilestone07",
  },
];

// ── OUR TEAM ──────────────────────────────────────────────────

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly image: ImageKey;
  /**
   * True where the source copy still reads "Full Name". These render with
   * the role and location only, so the grid stays complete without
   * printing a placeholder name on the live site.
   */
  readonly unnamed?: true;
}

export const team: readonly TeamMember[] = [
  {
    name: "Abhay Bhargava",
    role: "Founder & Managing Director",
    location: "Dubai",
    image: "companyTeam01",
  },
  // {
  //   name: "Crystal",
  //   role: "General Manager, China",
  //   location: "Shenzhen",
  //   image: "companyTeam02",
  // },
  {
    name: "Tony",
    role: "Project Manager, Manufacturing",
    location: "Guangzhou",
    image: "companyTeam03",
  },
  {
    name: "Vicki",
    role: "Project Manager, Manufacturing",
    location: "Guangzhou",
    image: "companyTeam04",
  },
  {
    name: "Carol",
    role: "Project Manager, Manufacturing",
    location: "Guangzhou",
    image: "companyTeam05",
  },
  {
    name: "David",
    role: "Project Manager, Manufacturing",
    location: "Guangzhou",
    image: "companyTeam06",
  },
  {
    name: "Tiger",
    role: "Executive, Design",
    location: "Guangzhou",
    image: "companyTeam07",
  },

  {
    name: "Ating",
    role: "Executive, Procurement",
    location: "Guangzhou",
    image: "companyTeam08",
  },
  {
    name: "Harper",
    role: "Executive, Procurement",
    location: "Guangzhou",
    image: "companyTeam09",
  },
  // {
  //   name: "Saugat",
  //   role: "Project Manager, Execution",
  //   location: "Nigeria",
  //   image: "companyTeam10",
  // },
  {
    name: "Akash",
    role: "Project Manager, Execution",
    location: "Dubai",
    image: "companyTeam11",
  },
  {
    name: "Shamnaz",
    role: "Project Manager, Execution",
    location: "KSA",
    image: "companyTeam12",
  },
  {
    name: "Qureshi",
    role: "General Manager, Accounts & Finance",
    location: "Dubai",
    image: "companyTeam13",
  },
  {
    name: "Jay",
    role: "Manager, Accounts & Finance",
    location: "Dubai",
    image: "companyTeam14",
  },
];
