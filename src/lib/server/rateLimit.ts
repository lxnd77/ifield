/**
 * In-memory sliding-window rate limiter.
 *
 * Deliberately simple, per the brief: a Map keyed by `${route}:${ip}`,
 * holding recent request timestamps. This is per-process state — it
 * resets on restart and does not share state across multiple server
 * instances. Fine for a single Node process (the deployment target
 * this project is built for); if this ever moves behind a
 * horizontally-scaled/serverless host, replace with a shared store
 * (Redis, Upstash, a KV binding) so limits apply across instances.
 */

const buckets = new Map<string, number[]>();

/** Hard cap on tracked keys so an attacker spoofing many distinct IPs
 *  cannot grow this map without bound. Oldest key is evicted first. */
const MAX_TRACKED_KEYS = 5000;

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const existing = buckets.get(key) ?? [];
  const recent = existing.filter((t) => now - t < windowMs);
  recent.push(now);
  buckets.set(key, recent);

  if (buckets.size > MAX_TRACKED_KEYS) {
    const oldestKey = buckets.keys().next().value;
    if (oldestKey !== undefined) buckets.delete(oldestKey);
  }

  return recent.length > limit;
}
