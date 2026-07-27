# M4U by Makhija Trendz — Website

Premium B2B ethnic-wear manufacturing website for **M4U by Makhija Trendz**,
Ahmedabad. A wholesale-facing marketing site with a bilingual interface, an
AI concierge chatbot, a GST-assisted wholesale inquiry form, a lightweight
admin dashboard, and an immersive video/audio hero experience.

Built with **Next.js 16** (App Router), **React 19**, and **TypeScript**.

---

## Features

- **Bilingual (English / हिन्दी)** — full site translation with an instant
  in-navbar toggle; the choice persists across pages and reloads. Hindi
  renders in Noto Sans Devanagari.
- **AI concierge chatbot** — answers visitor questions using the site's own
  content as grounding, and hands off to WhatsApp when a human is needed.
  Powered by OpenAI, with a built-in offline keyword fallback.
- **Wholesale inquiry form with GST auto-fill** — enter a GSTIN and click
  "Fetch Details" to auto-populate business name, address, city, state and
  PIN from a GST verification provider.
- **Immersive hero** — looping muted brand video with a poster fallback, plus
  optional site-wide background music with a mute toggle.
- **Collections** — filterable product portfolio with a lightbox and an
  auto-scrolling home marquee.
- **Admin dashboard** (`/admin`) — password-protected view of pageviews,
  inquiries and chat activity.
- **Contact delivery** — inquiries emailed via Resend (falls back to server
  logs when unconfigured).
- Fully responsive, accessibility-minded, motion-respecting (honors
  `prefers-reduced-motion`).

---

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | CSS (design tokens in `styles/tokens.css`) + Tailwind utilities |
| Animation | GSAP, Motion |
| Forms & validation | React Hook Form + Zod |
| Icons | lucide-react |
| Email | Resend |
| AI chatbot | OpenAI Chat Completions |
| GST lookup | gstincheck.co.in (swappable) |

---

## Getting Started

### Prerequisites
- **Node.js 20.18.1+** (an `.nvmrc` is included — run `nvm use` if you use nvm)
- npm

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy the example file and fill in your own values:
```bash
cp .env.example .env.local
```
Then edit `.env.local` (see [Environment Variables](#environment-variables)).
None are required just to view the site — features degrade gracefully when a
key is absent (the chatbot uses its offline fallback, the contact form logs to
the console, the GST button reports it's unavailable).

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Other scripts
```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
```

---

## Environment Variables

All configured in `.env.local` (never committed). See `.env.example` for the
template.

| Variable | Required | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | For AI chatbot | OpenAI key ([platform.openai.com](https://platform.openai.com/api-keys)). Without it, the chatbot uses an offline keyword fallback. |
| `OPENAI_MODEL` | Optional | Chat model. Defaults to `gpt-4o-mini`. |
| `GST_API_KEY` | For GST auto-fill | Key from [gstincheck.co.in](https://gstincheck.co.in/) (free tier available). Without it, the "Fetch Details" button reports it's unavailable and the form still works manually. |
| `RESEND_API_KEY` | For email delivery | [Resend](https://resend.com) key. Without it, inquiries are logged to the server console instead of emailed. |
| `CONTACT_TO_EMAIL` | Optional | Inbox that receives inquiries. |
| `CONTACT_FROM_EMAIL` | Optional | From-address for inquiry emails. |
| `ADMIN_PASSWORD` | **Yes, in production** | Password for `/admin`. A public dev fallback is used if unset — **always set this before deploying.** |
| `SESSION_SECRET` | **Yes, in production** | Long random string used to sign the admin session cookie. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical site URL for metadata / Open Graph / sitemap. |

> **Security:** `.env.local` is git-ignored. Never commit real keys. Rotate any
> key that is ever exposed.

---

## Project Structure

```
app/                 App Router pages + API routes
  api/               chat, inquiry, gst, track, admin endpoints
  admin/             password-protected dashboard
components/          layout, shared, and UI components
config/              site configuration (brand, contact, nav)
content/             all page copy + translations + chatbot knowledge
context/             React context (language provider)
hooks/               custom hooks
lib/                 db (file store), schemas, helpers
sections/            page sections (home, about, collections, contact, order)
styles/              global styles + design tokens
public/              images, hero video, background audio
```

Content is deliberately separated from components: page copy lives in
`content/`, brand/contact facts in `config/site.ts`, and colors/spacing in
`styles/tokens.css` — so most edits don't require touching component code.

---

## Notes

- **Data storage:** the admin dashboard uses a lightweight file-based store
  (`/.data`, git-ignored). It's suitable for low volume; for production scale,
  swap in a hosted database.
- **GST provider:** the lookup is isolated to a single normalization function
  in `app/api/gst/route.ts` — switching providers only means rewriting that one
  function.
- **Deployment:** optimized for [Vercel](https://vercel.com). Add the same
  environment variables in your host's dashboard. Ensure `ADMIN_PASSWORD` and
  `SESSION_SECRET` are set.

---

## License

© Makhija Trendz. All rights reserved. This codebase is proprietary and not
licensed for redistribution.