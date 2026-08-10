/**
 * POST /api/newsletter
 *
 * No mailing-list provider has been chosen yet (Mailchimp, Resend
 * Audiences, etc.), so this does not add anyone to a real list — it
 * sends a notification email so a sign-up is never silently lost, and
 * is meant to be replaced once a provider is picked. See
 * README-EMAIL.md.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { sendEmail } from '../../lib/server/mail';
import { checkFormGuards } from '../../lib/server/formGuards';

const NewsletterSchema = z.object({
  email: z.email('A valid email address is required.').trim().max(200),
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function jsonError(message: string, status: number): Response {
  return json({ ok: false, error: message }, status);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const form = await request.formData().catch(() => null);
  if (!form) return jsonError('Could not read the submitted form.', 400);

  const guard = checkFormGuards(form, request, clientAddress, {
    routeKey: 'newsletter',
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!guard.ok) {
    if (guard.blockSilently) return json({ ok: true });
    if (guard.reason === 'rate-limited') {
      return jsonError('Too many requests — please try again shortly.', 429);
    }
    return jsonError('Request rejected.', 403);
  }

  const parsed = NewsletterSchema.safeParse(Object.fromEntries(form.entries()));
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? 'Invalid submission.', 422);
  }
  const { email } = parsed.data;

  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'website@ifield.ae';
  const toEmail = import.meta.env.CONTACT_TO_EMAIL || 'info@ifield.ae';

  const result = await sendEmail({
    to: toEmail,
    from: `I-Field Website <${fromEmail}>`,
    replyTo: email,
    subject: 'New Journal newsletter sign-up',
    text: `${email} subscribed to the Journal newsletter via the website.\n\nThis is a notification only — no mailing-list provider is wired up yet, so this address has not been added anywhere automatically. See README-EMAIL.md.`,
  });

  if (!result.ok) {
    console.error('[api/newsletter] send failed:', result.error);
    return jsonError('Could not process your subscription right now.', 502);
  }

  return json({ ok: true });
};
