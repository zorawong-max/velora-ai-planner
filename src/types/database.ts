/**
 * Hand-written mirror of the Supabase schema defined in `supabase/migrations`.
 * Once the Supabase project is provisioned, replace this file by running:
 *   npx supabase gen types typescript --project-id <project-id> > src/types/database.ts
 *
 * Note: Row/Insert/Update must be declared with `type`, not `interface` —
 * interfaces don't get TypeScript's implicit index signature, which breaks
 * supabase-js's generic constraints and silently collapses query builder
 * types to `never`.
 */

export type RfqSubmissionRow = {
  id: string;
  created_at: string;
  status: string;
  company_name: string;
  contact_email: string;
  notes: string | null;
  blueprint: Record<string, unknown>;
  // Historically a chat transcript (array); now the flat planning-wizard
  // answers object. Column name retained to avoid a schema migration.
  conversation: Record<string, unknown>;
};

export type RfqSubmissionInsert = Omit<RfqSubmissionRow, "id" | "created_at" | "status"> &
  Partial<Pick<RfqSubmissionRow, "status">>;

export type Database = {
  public: {
    Tables: {
      rfq_submissions: {
        Row: RfqSubmissionRow;
        Insert: RfqSubmissionInsert;
        Update: Partial<RfqSubmissionInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
