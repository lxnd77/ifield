# Contact form and newsletter emails

Two routes send mail through [Resend](https://resend.com): `/api/contact` (the homepage
enquiry form) and `/api/newsletter` (the Journal subscribe form). Both are documented here
since they share the same setup and the same limitations.

## Setting up Resend

1. Create a Resend account and add `ifield.ae` (or the subdomain you want mail to come
   from) as a sending domain.
2. Resend gives you a small set of DNS records to add — typically an SPF `TXT` record, a
   `DKIM` `CNAME`, and optionally a `DMARC` record. Add these wherever `ifield.ae`'s DNS is
   managed. Verification is usually near-instant once the records propagate.
3. Create an API key in the Resend dashboard.
4. Copy `.env.example` to `.env` and fill in:

   ```bash
   RESEND_API_KEY=re_your_key_here
   CONTACT_FROM_EMAIL=website@ifield.ae
   CONTACT_TO_EMAIL=info@ifield.ae
   ```

   `CONTACT_FROM_EMAIL` must be on the verified domain — Resend will reject sends from an
   address it hasn't confirmed.

Free tier is 3,000 emails/month, 100/day, comfortably above what a contact form and a
newsletter sign-up notification will generate.

**Without `RESEND_API_KEY` set** (e.g. running the dev server without a `.env`), both
endpoints still work — they validate and run every spam check exactly as normal, then fail
at the send step and return the site's honest error state. Nothing throws, nothing is
silently swallowed; the failure just gets logged server-side (`console.error`) instead of
reaching an inbox.

## What each request goes through

1. **Honeypot** — a field named `website`, hidden from real visitors with CSS and
   `tabindex="-1"`, invisible to assistive tech. A filled-in value means a bot.
2. **Timestamp** — the form records when it finished loading (client-side, since the pages
   are prerendered once at build time — a server-rendered timestamp would be identical for
   every visitor). The server checks that at least 2 seconds passed before submission,
   which no human fills a form in.
3. **Origin** — if the request carries an `Origin` header that doesn't match the site's own
   origin, it's rejected. A same-origin browser submission never trips this.
4. **Rate limit** — 5 submissions per 10 minutes, per IP, per endpoint.

The honeypot and timestamp checks respond with a **fake success** rather than an error —
a bot that gets told "invalid" learns to fix itself; one that gets told "sent" does not.
Origin mismatches and rate limits return a real error, since no genuine visitor can trigger
either.

## A known limitation: rate limiting is per-process

The limiter is an in-memory `Map`, deliberately simple per the brief. It works correctly for
a single long-running Node process — the deployment target this project is built for
(`@astrojs/node`, standalone mode). It does **not** share state across multiple instances.

If this ever moves to a horizontally-scaled or serverless host (multiple concurrent
instances, or cold starts that reset memory), the limiter effectively resets per-instance
and the real ceiling becomes "5 requests × however many instances are running." At that
point, swap `src/lib/server/rateLimit.ts` for a shared store (Redis, Upstash, a platform KV
binding) — the `isRateLimited(key, limit, windowMs)` interface is the only thing callers
depend on, so the swap is contained to that one file.

## The newsletter form doesn't add anyone to a real list yet

No mailing-list provider (Mailchimp, Resend Audiences, etc.) has been chosen. Right now,
`/api/newsletter` sends a **notification email** to `CONTACT_TO_EMAIL` for every sign-up, so
an address is never silently lost — but nobody is actually subscribed to anything
automatically. Someone has to read that notification and add the address by hand until a
real provider is wired in.

When a provider is chosen, replace the body of `src/pages/api/newsletter.ts` — the
honeypot/timestamp/origin/rate-limit guards and the form-side UI stay exactly as they are.
