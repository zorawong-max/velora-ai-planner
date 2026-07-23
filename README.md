# VELORA AI Planner (V1)

Foundation project for the VELORA AI Planner. This is a structural scaffold only —
no business logic and no designed UI yet. Placeholder routes exist so navigation
and deployment can be verified end-to-end before feature work begins.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · ESLint · Prettier

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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

## Folder structure

```
src/
  app/                Routes (App Router)
    layout.tsx         Root layout — wraps every page with Header/Footer
    page.tsx            /
    conversation/        /conversation
    blueprint/            /blueprint
    rfq/                   /rfq
  components/
    layout/            Header, Footer, PagePlaceholder — shared page chrome
    ui/                  shadcn/ui components
  config/
    site.ts             Site name/description + nav item list (single source of truth for nav)
  lib/
    utils.ts             shadcn's `cn()` class-merging helper
  hooks/                 Reserved for shared React hooks (empty for now)
  types/                 Reserved for shared TypeScript types (empty for now)
```

## Deployment (Vercel)

No environment variables are required for this foundation — it builds and
serves with zero configuration. To deploy:

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected, no
   build settings need to change.
3. Deploy.

Environment variables will be introduced alongside the business logic that needs them
(conversation/blueprint/RFQ features) in a later phase — none exist yet.
