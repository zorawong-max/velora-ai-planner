# VELORA AI Planner (V1)

AI-assisted planning workspace: describe your infrastructure needs in a conversation,
get a generated blueprint, and turn it into a real RFQ sent to the VELORA supplier
network.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · OpenAI · Supabase · Zustand · ESLint · Prettier

## Getting started

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable                        | Required to run the real flow? | Notes                                                                                           |
| ------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| `AI_PROVIDER`                   | No                             | Defaults to `openai`. Selects the backend in `src/lib/ai/index.ts`.                             |
| `OPENAI_API_KEY`                | Yes                            | Without it, Conversation/Blueprint return a clear error instead of crashing.                    |
| `OPENAI_MODEL`                  | No                             | Defaults to `gpt-4o-mini`.                                                                      |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes, for RFQ to save           | From your Supabase project settings. This is a separate project from the VELORA corporate site. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes, for RFQ to save           | From your Supabase project settings.                                                            |

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Marketing pages work with zero
config; Conversation/Blueprint need `OPENAI_API_KEY`, RFQ needs the Supabase vars.

### Database

Apply `supabase/migrations/0001_rfq_submissions.sql` against your Supabase project
(Supabase CLI `supabase db push`, or paste it into the SQL editor) before testing RFQ
submissions.

## Scripts

| Script                 | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the dev server                     |
| `npm run build`        | Production build                         |
| `npm run start`        | Serve the production build               |
| `npm run lint`         | ESLint                                   |
| `npm run format`       | Format the project with Prettier         |
| `npm run format:check` | Check formatting without writing changes |

## Adding shadcn/ui components

```bash
npx shadcn@latest add <component>
```

Components are written to `src/components/ui`.

## Adding a new AI provider

1. Implement the `AIProvider` interface (`src/lib/ai/types.ts`) in
   `src/lib/ai/providers/<name>.ts`.
2. Add a case for it in the factory switch in `src/lib/ai/index.ts`.
3. Set `AI_PROVIDER=<name>` — no other application code changes.

## Folder structure

```
src/
  app/                    Routes (App Router)
    layout.tsx             Root layout — wraps every page with Header/Footer
    page.tsx                /  (landing)
    conversation/            /conversation
    blueprint/                /blueprint
    rfq/                        /rfq
  components/
    layout/                 Header, Footer — shared page chrome
    conversation/            ChatInterface (client, real AI backend)
    blueprint/               BlueprintView (client, reads generated blueprint)
    rfq/                     RfqForm (client, real Supabase submission)
    ui/                      shadcn/ui components
  actions/                 Server Actions — one per real capability
    conversation.ts          continueConversation()
    blueprint.ts             generateBlueprint()
    rfq.ts                   submitRfq()
  lib/
    ai/                     Provider-agnostic AI abstraction
      types.ts                AIProvider interface + shared types
      schemas.ts               Zod schemas for structured AI output
      prompts.ts               System prompts
      providers/openai.ts      OpenAI implementation
      index.ts                 Factory — reads AI_PROVIDER
    supabase/server.ts       Server-side Supabase client (anon key + RLS)
    rate-limit.ts            Best-effort in-memory rate limiter
    utils.ts                 shadcn's `cn()` class-merging helper
  schemas/rfq.ts           Zod validation for the RFQ form
  store/planner-store.ts   Zustand store — conversation + blueprint, persisted client-side
  config/site.ts           Site name/description + nav item list
  types/                   Shared types (database.ts, actions.ts)
supabase/migrations/       SQL migrations (schema + RLS)
```

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected.
3. Add the environment variables from the table above in the Vercel project settings.
4. Apply the Supabase migration (see Database, above) before RFQ submissions will work.
5. Deploy.

Without the environment variables, the site still deploys and all marketing/UI renders
correctly — Conversation and Blueprint return a clear in-app error instead of crashing,
and RFQ submission fails with a clear error until Supabase is configured.
