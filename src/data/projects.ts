/**
 * ============================================================
 * PORTFOLIO DIRECTORY
 * ============================================================
 * The full list of delivered projects, verbatim from
 * Projects.dc.html → renderVals().raw. 102 entries across four
 * regions.
 *
 * This is the roll-call, deliberately kept as data rather than CMS
 * content: it is a flat list of names and locations that changes
 * only when a project completes.
 *
 * A row becomes a link automatically when a Keystatic project entry
 * exists with the same name and location — see `directoryKey`. No
 * code change is needed to promote a row to a full case study.
 */

export type RegionKey = 'usa' | 'mea' | 'india' | 'china';

export const REGION_LABELS: Record<RegionKey, string> = {
  usa: 'United States',
  mea: 'Middle East & Africa',
  india: 'India & S.E. Asia',
  china: 'China',
};

/** Display order of the region groups. */
export const REGION_ORDER: readonly RegionKey[] = ['usa', 'mea', 'india', 'china'];

export interface DirectoryEntry {
  readonly name: string;
  readonly location: string;
  readonly region: RegionKey;
}

/**
 * Normalised lookup key. Used to match a directory row against a CMS
 * entry; case and spacing differences must not break the link.
 */
export function directoryKey(name: string, location: string): string {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  return `${norm(name)}|${norm(location)}`;
}

const raw: Record<RegionKey, ReadonlyArray<readonly [string, string]>> = {
  usa: [
    ['AC Hotel by Marriott', 'Greenville, SC'],
    ['Fidelis Grand Central', 'Conroe, TX'],
    ['Hyatt Place', 'Houston, TX'],
    ['Hampton Inn', 'Houston, TX'],
    ['JW Marriott', 'Greenville, SC'],
    ['LaQuinta', 'Houston, TX'],
    ['Lenox Hill', 'Spring, TX'],
    ['Marriott', 'Charleston, SC'],
    ['Residence Inn', 'Lenox Park, CA'],
    ['Westin', 'Dulles, PA'],
  ],
  mea: [
    ['Spring Hills 1', 'Bahrain'],
    ['Spring Hills 2', 'Bahrain'],
    ['Spring Hills 3 & 4', 'Bahrain'],
    ['Fontana Gardens', 'Bahrain'],
    ['Fontana Towers', 'Bahrain'],
    ['Fontana Infinity', 'Bahrain'],
    ['Juffair Towers', 'Bahrain'],
    ['Fraser Suites', 'Bahrain'],
    ['Narcissus Obhur Resort & Spa', 'Jeddah'],
    ['Al Yamam Village', 'Riyadh'],
    ['ARAMAK Compound', 'Riyadh'],
    ['Four Points by Sheraton', 'Riyadh'],
    ['Marbella Residency', 'Riyadh'],
    ['Narcissus Al Hamra Hotel', 'Riyadh'],
    ['Hilton', "N'Djamena, Chad"],
    ['Marriott Ikeja', 'Lagos, Nigeria'],
    ['Courtyard by Marriott', 'Nairobi, Kenya'],
    ['Crowne Plaza', 'Nairobi, Kenya'],
    ['M120', 'Lagos, Nigeria'],
    ['Radisson Blu', 'Benin State, Nigeria'],
    ['Stratongate Kofo Abayomi', 'Lagos, Nigeria'],
    ['Novotel', 'Lagos, Nigeria'],
    ['Data Center', 'Berbera, Somaliland'],
    ['SOLTELCO Tower', 'Hargeisa, Somaliland'],
    ['SOMGAS', 'Berbera, Somaliland'],
    ['Sarovar Premiere', 'Hargeisa, Somaliland'],
    ['Sarovar Premier', 'Lusaka, Zambia'],
    ['Golden Tulip Resort', 'Zanzibar, Tanzania'],
  ],
  india: [
    ['Aaron Regina', 'Goa'],
    ['Aqua Resorts', 'Goa'],
    ['BM Hotels', 'Mudra Port'],
    ['Chomugarh Palace', 'Jaipur'],
    ['Courtyard by Marriott', 'Bhopal'],
    ['Courtyard by Marriott', 'Bilaspur'],
    ['Courtyard by Marriott', 'Chittagong, Bangladesh'],
    ['Courtyard by Marriott', 'Shillong'],
    ['Courtyard by Marriott', 'Surat'],
    ['Days Inn', 'Neemrana'],
    ['Fairfield by Marriott', 'Lucknow'],
    ['Four Points Sheraton', 'Agra'],
    ['Gateway by Taj', 'Surat'],
    ['Gold Leaf', 'Udaipur'],
    ['IBIS', 'Jaipur'],
    ['IBIS', 'Mumbai Airport'],
    ['IBIS', 'ORR, Bangalore'],
    ['Lords Inn', 'Jodhpur'],
    ['Le Meridien', 'Hyderabad'],
    ['Marriott', 'Surat'],
    ['Marriott', 'Jaipur'],
    ['Novotel', 'Kolkata'],
    ['Novotel', 'ORR, Bangalore'],
    ['Park Inn', 'Badrinath'],
    ['Park Plaza', 'Jodhpur'],
    ['Park Plaza', 'Mussoorie'],
    ['Park Plaza', 'Zirakpur'],
    ['Park Prime', 'Jaipur'],
    ['Pullman', 'Delhi Aerocity'],
    ['Radisson', 'Rudrapur'],
    ['Ramada Plaza', 'Jaipur'],
    ['Renaissance', 'Lucknow'],
    ['The Leaf Resort', 'Nepal'],
    ['Taj', 'Dhaka, Bangladesh'],
  ],
  china: [
    ['Club Zilan', 'Chengdu'],
    ['Central Park', 'Beijing'],
    ['City Plaza', 'Guangzhou'],
    ['Crowne Plaza', 'Suzhou'],
    ['Fu Hotel', 'Zhuzhou'],
    ['Gehua New Century', 'Beijing'],
    ['Hangcheng Hotel', 'Lijiang'],
    ['Howard Johnson', 'Chongqing'],
    ['Intercontinental', 'Huizhou'],
    ['Jincheng Hotel', 'Guangzhou'],
    ['Juda Hotel', 'Wuhan'],
    ['JW Marriott', 'Wuhan'],
    ['JW Marriott', 'Beijing'],
    ['JW Marriott', 'Shenzhen'],
    ['New Century Grand', 'Changchun'],
    ['New Century Grand', 'Kaifeng'],
    ['New Century Grand', 'Shaoxing'],
    ['Renaissance', 'Chengdu'],
    ['Ruiwan Hotel', 'Tianjin'],
    ['Shangri-La', "Xi'an"],
    ['Sheraton', 'Dalian'],
    ['Sheraton Resort', 'Shenzhen'],
    ['Sheraton', 'Suzhou'],
    ['Sheraton', 'Shenzhen'],
    ['Sofitel Wanda', 'Chengdu'],
    ['St. Regis', 'Shenzhen'],
    ['The Plaza', 'Jiuzhai'],
    ['The Westin', 'Beijing'],
    ['Wanda Vista', 'Kunming'],
    ['Regal Palace Resort', 'Guangzhou'],
  ],
};

export const directory: readonly DirectoryEntry[] = REGION_ORDER.flatMap((region) =>
  raw[region].map(([name, location]) => ({ name, location, region })),
);

export function directoryByRegion(region: RegionKey): readonly DirectoryEntry[] {
  return directory.filter((entry) => entry.region === region);
}

/** Banner image slot for each region group. */
export const REGION_IMAGE = {
  usa: 'projectsRegionUsa',
  mea: 'projectsRegionMea',
  india: 'projectsRegionIndia',
  china: 'projectsRegionChina',
} as const;
