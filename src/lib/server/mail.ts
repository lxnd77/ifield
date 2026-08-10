/**
 * Thin wrapper over Resend's REST API — plain `fetch`, no SDK
 * dependency, so the whole send path is readable in one place.
 *
 * Requires RESEND_API_KEY and a sending domain verified with Resend
 * (see README-EMAIL.md). Without a key configured, `sendEmail` returns
 * a clear failure rather than throwing, so a route handler can log it
 * and return the honest error state the frontend already expects.
 */

export interface SendEmailInput {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo?: string;
}

export type SendEmailResult = { ok: true } | { ok: false; error: string };

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY is not configured' };
  }

  let response: Response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: input.from,
        to: [input.to],
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
      }),
    });
  } catch (err) {
    return { ok: false, error: `Network error calling Resend: ${(err as Error).message}` };
  }

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    return { ok: false, error: `Resend responded ${response.status}: ${body.slice(0, 300)}` };
  }

  return { ok: true };
}
