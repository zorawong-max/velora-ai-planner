-- VELORA AI Planner — rfq_submissions: real RFQ submissions from the
-- Conversation -> Blueprint -> RFQ flow.

create extension if not exists pgcrypto;

create table rfq_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new',

  company_name text not null,
  contact_email text not null,
  notes text,

  -- Full structured blueprint and conversation transcript at time of
  -- submission, stored as-is for traceability.
  blueprint jsonb not null,
  conversation jsonb not null,

  constraint rfq_submissions_contact_email_check
    check (contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

create index rfq_submissions_status_idx on rfq_submissions (status);
create index rfq_submissions_created_at_idx on rfq_submissions (created_at desc);

-- RLS: anon/authenticated may INSERT only. No SELECT/UPDATE/DELETE policy
-- exists for those roles, so reads are denied by default. Admin review
-- happens via the service_role key from a trusted server context only
-- (Supabase Studio, or a future internal tool) — never shipped to the
-- browser.
alter table rfq_submissions enable row level security;

create policy "Anyone can submit an RFQ"
  on rfq_submissions
  for insert
  to anon, authenticated
  with check (true);
