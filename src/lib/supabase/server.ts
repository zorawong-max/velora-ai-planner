import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

/**
 * Server-side Supabase client using the public anon key. There is no
 * authentication in this app — this relies entirely on the RLS policy in
 * `supabase/migrations` (anonymous INSERT-only on `rfq_submissions`).
 *
 * Call this inside Server Actions only — never import it into a Client
 * Component.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // No response to write to from a Server Component context.
            // Not applicable until auth is introduced.
          }
        },
      },
    },
  );
}
