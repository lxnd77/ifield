/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** GA4 Measurement ID (G-XXXXXXXXXX). Public — ships to the browser. Blank disables analytics. */
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;

  /** Resend API key. Server-only — never prefix with PUBLIC_. */
  readonly RESEND_API_KEY?: string;
  /** Verified sending address on the ifield.ae domain. */
  readonly CONTACT_FROM_EMAIL?: string;
  /** Where contact-form enquiries and newsletter sign-up notifications are delivered. */
  readonly CONTACT_TO_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
