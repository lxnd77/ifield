/**
 * Shared spam/abuse guards for the contact and newsletter endpoints.
 *
 * Four checks, in order:
 *  1. Honeypot — a field real visitors never see or fill.
 *  2. Timestamp — rejects a submission faster than a human could type
 *     one, using a client-reported page-load time the server verifies
 *     the elapsed duration against (never a client-computed elapsed
 *     value, which would be trivial to fake).
 *  3. Origin — a present-but-mismatched Origin header means the POST
 *     did not come from this site.
 *  4. Rate limit — a per-IP, per-route sliding window.
 *
 * The honeypot and timestamp checks resolve to `blockSilently: true`.
 * Bots that trip them get a fake success response rather than an error
 * — an error teaches a scripted submitter what to fix; silence does
 * not. A mismatched origin or a rate limit is surfaced honestly, since
 * no legitimate same-origin visitor can trigger either.
 */
import { isRateLimited } from './rateLimit';

export type GuardReason = 'honeypot' | 'missing-timestamp' | 'too-fast' | 'bad-origin' | 'rate-limited';

export interface GuardResult {
  ok: boolean;
  /** When true, the route should respond as if the submission succeeded. */
  blockSilently?: boolean;
  reason?: GuardReason;
}

export interface GuardOptions {
  /** Distinguishes routes sharing the rate-limit map, e.g. 'contact'. */
  routeKey: string;
  /** Max requests per window, per IP, per routeKey. */
  limit: number;
  windowMs: number;
  /** Minimum time a human needs to have had the form open. Default 2000ms. */
  minElapsedMs?: number;
}

export function checkFormGuards(
  form: FormData,
  request: Request,
  clientAddress: string,
  opts: GuardOptions,
): GuardResult {
  const honeypot = String(form.get('website') ?? '').trim();
  if (honeypot !== '') {
    return { ok: false, blockSilently: true, reason: 'honeypot' };
  }

  const originHeader = request.headers.get('origin');
  if (originHeader) {
    const requestOrigin = new URL(request.url).origin;
    if (originHeader !== requestOrigin) {
      return { ok: false, reason: 'bad-origin' };
    }
  }

  const loadedAtRaw = form.get('loadedAt');
  const loadedAt = Number(loadedAtRaw);
  if (!loadedAtRaw || !Number.isFinite(loadedAt)) {
    return { ok: false, blockSilently: true, reason: 'missing-timestamp' };
  }

  const elapsed = Date.now() - loadedAt;
  const minElapsed = opts.minElapsedMs ?? 2000;
  // Covers both a submission faster than a human could type, and a
  // `loadedAt` forged far into the future — either way, `elapsed`
  // comes out below the threshold.
  if (elapsed < minElapsed) {
    return { ok: false, blockSilently: true, reason: 'too-fast' };
  }

  const ipKey = `${opts.routeKey}:${clientAddress || 'unknown'}`;
  if (isRateLimited(ipKey, opts.limit, opts.windowMs)) {
    return { ok: false, reason: 'rate-limited' };
  }

  return { ok: true };
}
