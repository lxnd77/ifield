/**
 * ============================================================
 * COOKIE CONSENT + GOOGLE ANALYTICS GATING
 * ============================================================
 * Strict model: no Google request of any kind is made until the
 * visitor actively grants analytics consent. gtag.js is injected
 * on grant, not on page load, so a visitor who ignores or dismisses
 * the banner is never contacted by Google.
 *
 * Google Consent Mode v2 signals are still set, so that if the
 * marketing team later adds Ads tags they inherit the right state.
 *
 * Only two categories exist because only two things are true:
 *   essential  — always on, no tracking cookies (nothing to opt out of)
 *   analytics  — Google Analytics 4
 * Do not add a category here without adding a real cookie behind it.
 */

export const CONSENT_STORAGE_KEY = 'ifield.consent';

/**
 * Bump when the cookie policy materially changes. Visitors whose
 * stored choice predates the current version get re-prompted.
 */
export const CONSENT_VERSION = 1;

export interface ConsentState {
  version: number;
  /** Always true — recorded for auditability. */
  essential: true;
  analytics: boolean;
  /** ISO timestamp of the decision. */
  decidedAt: string;
}

type ConsentListener = (state: ConsentState) => void;

const listeners = new Set<ConsentListener>();

/** Fired on the document whenever consent is decided or changed. */
export const CONSENT_EVENT = 'ifield:consent-change';

// ── Storage ───────────────────────────────────────────────────

export function getConsent(): ConsentState | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (typeof parsed.analytics !== 'boolean') return null;
    return {
      version: CONSENT_VERSION,
      essential: true,
      analytics: parsed.analytics,
      decidedAt: parsed.decidedAt ?? new Date().toISOString(),
    };
  } catch {
    // Private mode, disabled storage, or corrupt value — re-prompt.
    return null;
  }
}

export function setConsent(analytics: boolean): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    essential: true,
    analytics,
    decidedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable: honour the choice for this page view only.
  }

  applyConsent(state);
  listeners.forEach((fn) => fn(state));
  document.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
  return state;
}

export function onConsentChange(fn: ConsentListener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// ── Google Analytics ──────────────────────────────────────────

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    /** Opens the cookie preferences dialog. Bound by CookieConsent.astro. */
    openCookiePreferences?: () => void;
  }
}

let gtagLoaded = false;

function measurementId(): string | undefined {
  const id = import.meta.env.PUBLIC_GA_MEASUREMENT_ID;
  return typeof id === 'string' && id.trim() !== '' ? id.trim() : undefined;
}

function ensureGtagStub(): void {
  window.dataLayer = window.dataLayer ?? [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // Must push `arguments` itself — gtag.js reads the arguments object.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
}

function loadGtag(id: string): void {
  if (gtagLoaded) return;
  gtagLoaded = true;

  ensureGtagStub();

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.gtag!('js', new Date());
  window.gtag!('config', id, {
    // No cookie is written until consent is granted, and we never
    // want the full IP retained.
    anonymize_ip: true,
  });
}

/** Delete the GA first-party cookies after a withdrawal of consent. */
function clearAnalyticsCookies(): void {
  const domains = [location.hostname, `.${location.hostname}`];
  document.cookie
    .split(';')
    .map((c) => c.split('=')[0]?.trim())
    .filter((name): name is string => !!name && (name.startsWith('_ga') || name === '_gid'))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      });
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
}

/**
 * Apply a consent state to the analytics layer. Safe to call repeatedly.
 */
export function applyConsent(state: ConsentState): void {
  const id = measurementId();

  if (state.analytics && id) {
    loadGtag(id);
    ensureGtagStub();
    window.gtag!('consent', 'update', {
      analytics_storage: 'granted',
      // Ads signals stay denied — the site runs no advertising tags.
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    return;
  }

  // Denied, or no measurement ID configured.
  if (gtagLoaded) {
    window.gtag!('consent', 'update', { analytics_storage: 'denied' });
  }
  clearAnalyticsCookies();
}

/**
 * Re-apply a previously stored decision on page load.
 * Returns null when no valid decision exists (banner should show).
 */
export function restoreConsent(): ConsentState | null {
  const state = getConsent();
  if (state) {
    applyConsent(state);
    return state;
  }
  // No valid decision on record — but GA cookies can outlive one, after a
  // CONSENT_VERSION bump or if the visitor cleared local storage only.
  // Sweep them so "undecided" really means untracked.
  clearAnalyticsCookies();
  return null;
}

/** True when a measurement ID is configured for this build. */
export function analyticsConfigured(): boolean {
  return measurementId() !== undefined;
}
