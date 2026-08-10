/**
 * ============================================================
 * OPEN ROLES
 * ============================================================
 * No roles were included in the design bundle — this page did not
 * exist in the prototypes. The list below is a working placeholder so
 * the Careers page has real content to render rather than an empty
 * section; replace it with the company's actual open positions before
 * launch.
 *
 * Departments are grouped the same way the Projects directory groups
 * regions, and each role names a real I-Field office from
 * src/data/offices.ts so nothing points somewhere the company doesn't
 * operate.
 */

export type Department = 'design' | 'manufacturing' | 'procurement' | 'projects' | 'commercial';

export const DEPARTMENT_LABELS: Record<Department, string> = {
  design: 'Design',
  manufacturing: 'Manufacturing',
  procurement: 'Procurement',
  projects: 'Project Delivery',
  commercial: 'Commercial',
};

export const DEPARTMENT_ORDER: readonly Department[] = [
  'design',
  'projects',
  'manufacturing',
  'procurement',
  'commercial',
];

export interface Role {
  readonly title: string;
  readonly department: Department;
  readonly location: string;
  readonly type: string;
}

export const roles: readonly Role[] = [
  { title: 'Senior Interior Designer', department: 'design', location: 'Dubai, UAE', type: 'Full-time' },
  { title: 'AutoCAD Draughtsperson', department: 'design', location: 'Guangzhou, China', type: 'Full-time' },

  { title: 'Site Project Manager', department: 'projects', location: 'Lagos, Nigeria', type: 'Full-time' },
  { title: 'Installation Supervisor', department: 'projects', location: 'Jaipur, India', type: 'Full-time' },
  { title: 'Site Project Manager', department: 'projects', location: 'Hargeisa, Somaliland', type: 'Full-time' },

  { title: 'QA / QC Engineer', department: 'manufacturing', location: 'Dongguan, China', type: 'Full-time' },
  { title: 'Production Planner', department: 'manufacturing', location: 'Guangzhou, China', type: 'Full-time' },

  { title: 'Procurement Officer', department: 'procurement', location: 'Hong Kong', type: 'Full-time' },
  { title: 'Logistics Coordinator', department: 'procurement', location: 'Dubai, UAE', type: 'Full-time' },

  { title: 'Business Development Manager', department: 'commercial', location: 'London, UK', type: 'Full-time' },
  { title: 'Account Manager', department: 'commercial', location: 'Hong Kong', type: 'Full-time' },
];

export function rolesByDepartment(department: Department): readonly Role[] {
  return roles.filter((r) => r.department === department);
}
