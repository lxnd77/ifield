/**
 * POST /api/contact
 *
 * Validates and forwards the homepage enquiry form to Resend. The only
 * route on the site that isn't prerendered — see astro.config.mjs.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { z } from 'zod';
import { sendEmail } from '../../lib/server/mail';
import { checkFormGuards } from '../../lib/server/formGuards';

const ContactSchema = z.object({
  fullname: z.string().trim().min(1, 'Full name is required.').max(200),
  email: z.email('A valid email address is required.').trim().max(200),
  message: z.string().trim().min(1, 'Project details are required.').max(5000),
  company: z.string().trim().max(200).optional().default(''),
  jobtitle: z.string().trim().max(200).optional().default(''),
  telephone: z.string().trim().max(60).optional().default(''),
  country: z.string().trim().max(120).optional().default(''),
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
    routeKey: 'contact',
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

  const parsed = ContactSchema.safeParse(Object.fromEntries(form.entries()));
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? 'Invalid submission.', 422);
  }
  const data = parsed.data;

  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'website@ifield.ae';
  const toEmail = import.meta.env.CONTACT_TO_EMAIL || 'info@ifield.ae';

  const bodyLines = [
    `Name: ${data.fullname}`,
    `Email: ${data.email}`,
    data.company && `Company: ${data.company}`,
    data.jobtitle && `Title: ${data.jobtitle}`,
    data.telephone && `Phone: ${data.telephone}`,
    data.country && `Country: ${data.country}`,
    '',
    'Project details:',
    data.message,
  ].filter((line): line is string => Boolean(line));

  const result = await sendEmail({
    to: toEmail,
    from: `I-Field Website <${fromEmail}>`,
    replyTo: data.email,
    subject: `New enquiry — ${data.fullname}`,
    text: bodyLines.join('\n'),
  });

  if (!result.ok) {
    console.error('[api/contact] send failed:', result.error);
    return jsonError('Could not send your enquiry right now.', 502);
  }

  return json({ ok: true });
};
