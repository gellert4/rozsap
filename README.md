# ALTER AI

Creator-first AI image studio MVP. It includes a polished landing page, generation dashboard, credits/pricing UI, Stripe checkout/webhook wiring, PostgreSQL/Supabase schema, pluggable AI provider adapter, Docker build and a working demo mode.

## Safety scope
ALTER AI is designed for consensual creator workflows, fictional/synthetic characters, outfit edits and normal portrait generation. It intentionally blocks non-consensual sexual deepfakes, nudification and sexual content involving minors.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

With `DEMO_MODE=true`, the Generate button works without external services and returns a generated branded preview. For real inference set `AI_IMAGE_ENDPOINT` to your GPU/API endpoint. It should accept JSON `{ "prompt": "...", "mode": "..." }` and return `{ "imageUrl": "https://..." }`.

## Production wiring
1. Create a Supabase project and run `db/schema.sql`.
2. Configure Supabase keys and add auth UI/middleware for your preferred login flow.
3. Create Creator and Pro recurring Stripe prices, then fill the Stripe env vars.
4. Point Stripe webhooks to `/api/webhook` and persist subscription/credit updates in that route.
5. Connect a safe image-generation backend through `AI_IMAGE_ENDPOINT`.
6. Deploy to Vercel or build the included Docker image.

## Suggested next milestones
- Supabase login/signup screens and protected dashboard
- Direct-to-storage image uploads
- Real per-user credit debiting with idempotent jobs
- Async generation queue for long GPU jobs
- Identity-profile enrollment with explicit consent confirmation
- Reference image / outfit workflow
- History gallery and delete controls
- Rate limiting, abuse monitoring and stronger image moderation

## API
`POST /api/generate`

```json
{ "prompt": "editorial streetwear portrait", "mode": "photoshoot" }
```

Modes: `photoshoot`, `recreate`, `outfit`, `portrait`.
