import "server-only";

/**
 * Best-effort in-memory rate limiter for AI Planner Server Actions.
 *
 * IMPORTANT: this is per-instance, in-memory state. It is fine for a
 * single long-lived server (or local dev) but on Vercel's serverless
 * runtime each instance has its own memory, so it does not enforce a
 * global limit across instances. Before real launch traffic, swap the
 * implementation below for a durable store (e.g. Upstash Redis with
 * `@upstash/ratelimit`) behind this same `checkRateLimit` signature —
 * no caller changes required.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 20;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string): { success: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const timestamps = (hits.get(key) ?? []).filter((t) => t > windowStart);
  timestamps.push(now);
  hits.set(key, timestamps);

  return {
    success: timestamps.length <= MAX_REQUESTS,
    remaining: Math.max(0, MAX_REQUESTS - timestamps.length),
  };
}
