# M4U by Makhija Trendz — Project Handoff

**Document purpose:** this file is written so that a future Claude session,
with no access to prior conversation history, can pick up this project and
continue it correctly. Read this document in full before touching any code.

**Status at time of writing:** Phases 2, 3 and 4 are **complete**.
All routes are built and wired; the backend APIs (inquiry via Resend with a
console fallback, chatbot via NVIDIA NIM with a deterministic keyword fallback,
pageview + chat analytics) and the password-protected admin dashboard
(`/admin`) all exist. Remaining work is launch prep only: run
`npm install && npm run build` in a networked environment, replace the
client placeholders (founding year, phone/WhatsApp numbers, legal copy
review), set production env vars (`RESEND_API_KEY`, `ADMIN_PASSWORD`,
`SESSION_SECRET`, optionally `NVIDIA_API_KEY`), and drop in real imagery
via `PlaceholderInner`'s `src`/`videoSrc` props (the `Media` vs
`Placeholder` duplication from §8 is resolved — `Media` was deleted and
`PlaceholderInner` now accepts real media). `motion/react` is now adopted
in `sections/order/Faq.tsx` (accordion open/close), so the pattern exists
for future micro-interactions. Analytics: `components/shared/PageTracker`
beacons to `/api/track`, and the chat route calls `trackChat`. Note:
`lib/db.ts` writes to `/tmp` in production — data is ephemeral on
serverless; swap for a real store (Vercel KV / Postgres) before relying on
the dashboard long-term.

---

## 1. Project Vision

### Business objective
M4U by Makhija Trendz is a B2B garment manufacturer in Ahmedabad, India,
producing designer kurtis, co-ord sets, and premium suit sets. The website's
job is to win **wholesale inquiries** from boutiques, retail chains,
distributors, online sellers, and export buyers — not to sell to individual
consumers. Every page should end in a path toward the contact form.

### Brand identity
- Positioned as a **luxury fashion house that happens to manufacture**, not a
  garment wholesaler. The tone is Aesop/Loro Piana/COS, not a B2B catalog site.
- Signature line: *"We don't manufacture garments. We create collections that
  sell."*
- Heritage marker: Ahmedabad, India's textile heartland. Founding year is
  currently a placeholder (`"2016"` in `config/site.ts`) — **must be confirmed
  with the client before launch.**

### Design philosophy
Established in a Phase 1 design review and treated as **approved and locked**.
Do not redesign it. The governing principle: *luxury is subtraction.*
Concretely this means:
- Generous whitespace, short reveal distances, slow confident motion.
- One signature flourish (the gold thread SVG draw) — everything else stays
  quiet.
- No cursor-follow glow, no dense card grids, no over-tracked type.
- Manufacturing imagery is art-directed toward **hands, detail, and craft**,
  never bare machinery — this was a deliberate correction from an earlier
  draft that leaned too industrial.
- CTA hierarchy is always one primary (filled) + one quiet (text-link), never
  two competing equal-weight buttons.

### User journey
1. **Home** — cinematic hero → brand thesis + stats → factory experience
   (craft, not machines) → collection teasers → campaign imagery → trust
   grid → CTA band.
2. **Manufacturing (`/about`)** — origin story → timeline → process scroller.
3. **Collections (`/collections`)** — filterable portfolio, deep-linkable from
   home cards via `?filter=`.
4. **How to Order (`/how-to-order`)** — numbered process + FAQ accordion.
5. **Contact (`/contact`)** — inquiry form (validated, not yet wired to a
   backend) + channels + map.
6. Legal pages (`/privacy-policy`, `/terms-and-conditions`) are template copy
   pending legal review.

---

## 2. Technology Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | `next.config.ts`, not `.js` |
| UI library | React 19 | |
| Language | TypeScript, strict mode | `noUncheckedIndexedAccess` on |
| Styling | Tailwind CSS 3 (stable) + hand-authored CSS | Tailwind is layout-utility only; all brand values live in `styles/tokens.css`/`globals.css`. Deliberately **not** Tailwind 4 (avoids alpha churn); revisit if the project standardizes on v4 later. |
| Animation (declarative/component) | `motion` (Framer Motion successor) | Installed; not yet used in a component — see Remaining Work |
| Animation (orchestrated/timeline) | GSAP | Used today only in `sections/home/Hero.tsx` |
| Forms | React Hook Form + `@hookform/resolvers` | |
| Validation | Zod | `lib/schemas/inquiry.ts` is the single source of truth, shared by client form today and the future server action |
| Icons | lucide-react | |
| Email (planned, Phase 3) | Resend | Not implemented |
| AI chatbot | NVIDIA NIM (meta/llama-3.3-70b-instruct) | Implemented — deterministic KB fallback if NVIDIA_API_KEY unset |
| Deployment target | Vercel | No deployment config created yet |

No other libraries are installed. Do not add a UI kit, a CSS-in-JS library,
or a second animation library without a strong reason — the brief explicitly
warns against over-engineering.

---

## 3. Folder Structure

```
m4u/
├─ app/                      # App Router routes — ALL DONE
│  ├─ layout.tsx             # root layout: fonts, metadata, JSON-LD, chrome
│  ├─ page.tsx               # home route — DONE
│  ├─ providers.tsx          # client boundary wrapping LightboxProvider
│  ├─ not-found.tsx          # branded 404 — DONE
│  ├─ sitemap.ts             # dynamic sitemap — DONE
│  ├─ robots.ts              # robots.txt — DONE
│  ├─ about/page.tsx         # manufacturing page — DONE
│  ├─ collections/page.tsx   # portfolio page — DONE
│  ├─ how-to-order/page.tsx  # wholesale process — DONE
│  ├─ contact/page.tsx       # inquiry + channels — DONE
│  ├─ privacy-policy/page.tsx    # legal — DONE
│  └─ terms-and-conditions/page.tsx  # legal — DONE
├─ components/
│  ├─ ui/                    # pure, presentational primitives
│  ├─ layout/                # Navbar, Footer
│  └─ shared/                # cross-page composites with client state (Lightbox, Chatbot, Loader, ProgressBar, CtaBand, PageHero)
├─ sections/                 # page-specific composition, one folder per page/domain
│  ├─ home/
│  ├─ about/
│  ├─ collections/
│  ├─ order/
│  └─ contact/
├─ content/                  # typed copy + data, decoupled from components
├─ config/                   # site.ts — brand facts, nav, channels
├─ types/                    # shared domain types (content.ts + index.ts barrel)
├─ hooks/                    # animation & utility hooks
├─ lib/                      # cn(), zod schemas (lib/schemas/)
├─ utils/                    # format.ts (Indian number formatting)
├─ styles/                   # tokens.css, globals.css, motion.ts
├─ actions/                  # EMPTY — reserved for Phase 3 server actions
├─ public/                   # EMPTY — no real assets yet
├─ next.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ package.json
└─ .env.example
```

**Rule that governs this structure:** `components/` is presentation-only and
must not import from `content/`. `sections/` is where content and components
meet. `app/page.tsx` files should be thin — they compose sections and pass no
props beyond what routing provides (e.g. `searchParams`).

---

## 4. Design System

### Design tokens (`styles/tokens.css`)
Every brand value is a CSS custom property on `:root`. **Nothing brand-specific
should ever be hardcoded outside this file** (a hex code typed directly into a
component is a bug). Current tokens:

```
--bg          #faf8f5   page background (warm ivory-white)
--ivory       #f3efe7   alternating section background
--ink         #161310   primary text / dark surfaces
--ink-soft    #4a443c   secondary text
--gold        #b08d57   accent (the signature color)
--gold-deep   #96733f   accent hover/deep variant
--beige       #e9e1d2   (reserved, lightly used)
--taupe       #8a7e6e   tertiary/muted text (labels, captions)
--line        rgba(22,19,16,.10)   hairline borders

--shadow      0 24px 60px -24px rgba(22,19,16,.18)
--ease        cubic-bezier(.22,1,.36,1)   THE signature easing curve

--serif       var(--font-serif), "Cormorant Garamond", Georgia, serif
--sans        var(--font-sans), "Jost", "Helvetica Neue", Arial, sans-serif

--rhythm      clamp(3rem,7vw,5.5rem)   headline-to-content gap, used everywhere
--measure     38rem                    editorial reading measure cap
--gutter      clamp(1.7rem,5vw,4rem)   horizontal page padding (mobile floor raised from 1.25rem in Phase 1 review)
--section-y   clamp(5rem,11vw,9.5rem) vertical section padding
```

`--font-serif` / `--font-sans` are injected by `next/font` in `app/layout.tsx`
(Cormorant Garamond + Jost, self-hosted, `display: swap`). The tokens file
falls back to the literal family name if those variables are ever absent.

### Tailwind's role
`tailwind.config.ts` maps its theme extension (`colors`, `fontFamily`,
`boxShadow`, `maxWidth`) straight to these CSS variables. Tailwind utilities
(`flex`, `grid`, `gap-4`, etc.) are fine to use for one-off layout in new
components, but **any component carrying real brand detail (buttons,
placeholders, cards, nav, etc.) should reuse the existing hand-authored
classes in `globals.css`** rather than rebuild it in Tailwind utilities. This
keeps the visual identity centralized.

### Global stylesheet (`styles/globals.css`)
Contains every approved component class, organized in commented sections:
reset/base, typography, layout, gold thread, buttons (`.btn`, `.btn-quiet` +
variants `.solid/.light/.gold-b`), media placeholders (`.ph` + tone
modifiers), reveal utilities (`.rv`, `.mask-line`), stats, factory bento grid
(`.fgrid`), collection cards (`.ccards`/`.ccard`), campaign grid
(`.campaign`), why-cards (`.why`), CTA band (`.cta-band`), page hero
(`.page-hero`), timeline, horizontal scroller (`.hscroll`), filters/masonry,
order steps (`.steps`), FAQ accordion (`.faq`), contact form fields, legal
typography, footer, loader, progress bar, nav (desktop + mobile menu),
hero-specific rules, lightbox, and chatbot widget. This file is large by
design — it is the single visual truth for the whole site. When adding a new
component, check here first for an existing class before inventing new CSS.

**Do not visually restyle anything in this file** without being asked; Phase
1's review is the last word on the look, and Phase 2's job is architecture,
not redesign.

---

## 5. Animation System

Philosophy (from the Phase 1 review, binding): **luxury motion is slow,
travels a short distance, and is used once as a signature — not scattered.**

### `styles/motion.ts` — shared JS timing tokens
Mirrors the CSS `--ease` value so Motion/GSAP and CSS transitions never drift
out of sync:
```
EASE_LUXE = [0.22, 1, 0.36, 1]
DURATION.fast = 0.4      // micro-interactions
DURATION.base = 0.6      // standard component transitions
DURATION.reveal = 1.2    // default scroll-in reveal
DURATION.slow = 2        // cinematic moments (loader, page transitions)
REVEAL.distance = 32     // px — deliberately short; slower-per-pixel reads as expensive
REVEAL.stagger = 0.07
REVEAL.amount = 0.16     // IntersectionObserver threshold
```
`revealVariants` and `staggerContainer` are pre-built Motion variant objects
using these tokens, ready for any component that adopts `motion/react` — **not
yet used anywhere; see Remaining Work.**

### Three animation mechanisms, used deliberately for different jobs
1. **CSS reveal (`.rv` / `.inview`), driven by `useReveal`** — the default for
   almost everything. Cheap, respects reduced motion via a global media query
   in `globals.css`, and is what `components/ui/Reveal.tsx` wraps.
2. **GSAP timeline** — reserved for genuinely orchestrated multi-element
   sequences. Currently used only in `sections/home/Hero.tsx` (wordmark mask
   reveal → kicker → sub → CTA stagger) and gated behind
   `useReducedMotion()`.
3. **Motion (`motion/react`)** — installed, tokens prepared
   (`revealVariants`), but **not wired into any component yet**. Intended for
   component-level micro-interactions (hover/tap states, layout animations)
   where declarative variants are cleaner than manual CSS classes.

### Animation-related hooks (all in `hooks/`)
- `useReducedMotion()` — reactive `matchMedia` wrapper; every custom animation
  hook in the app gates on this.
- `useReveal<T>({ amount, once })` — attaches an `IntersectionObserver`, adds
  `.inview` to the ref'd element. Returns `{ ref, inView }`. This is the
  primitive `components/ui/Reveal.tsx` and `Stats` are built on.
- `useCountUp({ to, active, duration })` — animates a number up with a quartic
  ease-out, formatted with `formatIndianNumber`. Jumps straight to the target
  under reduced motion.
- `useMagnetic<T>()` — subtle magnetic pull for CTAs (`.12`/`.18` factors per
  the Phase 1 review, down from an original `.18`/`.28` that felt gimmicky).
  Gated to `(hover:hover) and (pointer:fine)` so it never leaves a stuck
  transform on touch devices, and disabled entirely under reduced motion.
- `useScrollProgress()` — powers `ProgressBar`.

### Things explicitly removed/rejected in Phase 1 and must not be reintroduced
- A cursor-follow radial glow (`#glow`) — judged as non-luxury, agency-cliché.
  There is no glow component in this codebase; do not add one.
- Equal-weight dual CTAs — always pick one primary, one quiet.
- Dense 4-across/8-item card grids — trimmed to airy 3-across, 6 items (see
  `content/home.ts` `whyCards`).

---

## 6. Typography

Two families, paired deliberately:
- **Cormorant Garamond** (serif, `--serif`) — all headings (`h1/h2/h3/.serif`),
  italics for accent phrases (`.it`), gold thread captions.
- **Jost** (sans, `--sans`) — body copy, labels, nav, buttons, eyebrows.

Type scale (all via `clamp()` for fluid responsiveness):
```
.d1   clamp(3.4rem, 9vw, 8.5rem)   line-height 1.02   — hero-level display
.d2   clamp(2.4rem, 5.5vw, 4.8rem) line-height 1.06   — section headings
.d3   clamp(1.7rem, 3.2vw, 2.6rem) line-height 1.18   — sub-headings, opened up in Phase 1 review for breathing room
```
- `.eyebrow` — `.72rem`, `500` weight, uppercase, `.34em` tracking (eased down
  from `.42em` in the Phase 1 review — over-tracked labels read as
  "tech startup", not "maison").
- `.lead`, `.legal p/li`, `.cta-band p`, `.hero-sub` are capped to
  `var(--measure)` (38rem) or `44ch` for the CTA band — never let body prose
  run edge-to-edge.
- Letter-spacing on the hero kicker was eased from `.5em` to `.4em` for the
  same reason.

---

## 7. Color Tokens
See §4 above — the full token list lives in `styles/tokens.css` and is not
duplicated here to avoid drift. **When in doubt, read that file; it is
authoritative.**

---

## 8. Shared Components

### `components/ui/` — pure, presentational, no page-specific content
| Component | Responsibility |
|---|---|
| `Button` | Polymorphic CTA (Link or button). Variants: `solid`, `light`, `gold`, `outline`, `quiet`. Optional trailing arrow, optional magnetic pull. |
| `Eyebrow` | Gold uppercase label with leading rule. |
| `GoldThread` | The signature SVG thread-draw. `drawn` prop forces the drawn state for above-the-fold interior page heroes (bypasses scroll-reveal gating). |
| `Reveal` | Wraps children in the `.rv`/`.inview` scroll reveal via `useReveal`. Accepts `delay` (1–4, maps to `.d1`–`.d4`), `as` (polymorphic tag), `once`. |
| `SectionHeader` | Eyebrow + display heading, pre-wrapped in `Reveal`. The standard section-opening block. |
| `Media` | **Placeholder-to-real-asset abstraction.** Renders a styled gradient placeholder today; accepts `src` (→ optimized `next/image`) or `videoSrc` (→ `<video>`) so real assets can be dropped in later via content-file data changes only — no component/layout changes required. **Not yet used by any gallery** — see §8 caveat below. |
| `Placeholder` (`phClass`, `PlaceholderInner`) | Lower-level than `Media`. Used by every gallery/card that needs a custom `<figure>` (with `figcaption`, `onClick`, `data-lb`, etc.) that `Media`'s fixed `<figure>` wrapper doesn't allow. `phClass(tone, extra)` returns the `.ph …` class string; `PlaceholderInner` renders the zoom layer + tag. |

**Caveat to flag for the next session:** `Media.tsx` and
`Placeholder.tsx` currently overlap in responsibility. `Media` was built
first as the general placeholder-to-real-media abstraction, but every actual
gallery (`FactoryGallery`, `CampaignGallery`, `CollectionGrid`,
`CollectionPortfolio`, `Story`, `Process`) ended up using `phClass` +
`PlaceholderInner` directly instead, because they need custom figure markup
`Media` doesn't expose (captions, click handlers, data attributes). **`Media`
is currently unused dead code.** Before Phase 4 (real assets), decide: either
(a) extend `Placeholder`'s pattern to support real `src`/`videoSrc` the same
way `Media` does, and delete `Media`, or (b) refactor `Media` to accept the
custom-children pattern and delete `Placeholder`. Don't maintain both.

### `components/shared/` — composite, often client-stateful, cross-page
| Component | Responsibility |
|---|---|
| `Loader` | Full-screen intro sequence. Shows once per browser session via `sessionStorage` key `m4u-loaded`. Respects reduced motion (skips the hold delay). |
| `ProgressBar` | Top scroll-progress indicator, driven by `useScrollProgress`. |
| `LightboxProvider` / `useLightbox` | App-wide lightbox context. Call `open(items, index)` with an ordered `LightboxItem[]` (`{ caption, tone }`) from any gallery; handles Esc/arrow keys and body scroll-lock centrally. Mounted once in `app/layout.tsx` via `Providers`. **Currently only renders the placeholder tone/caption, not real media** — matches the current placeholder-only state of the site. |
| `Chatbot` | Floating concierge widget. Deterministic keyword matcher over `content/chatbot.ts`'s `knowledgeBase` — instant, offline, zero API cost. Visually quieted per Phase 1 review (52px FAB, ink→gold-deep hover, no glow/shadow-heavy styling). |
| `CtaBand` | Reusable dark CTA section, used at the end of Home (wired) and intended for About/Collections/Order (not yet wired — those pages don't exist). |
| `PageHero` | Interior-page header block (eyebrow + `.d1` heading + optional lead + optional gold thread). Renders with `rv inview` already applied (not scroll-gated) since it's above the fold on every interior page. |

### `components/layout/`
| Component | Responsibility |
|---|---|
| `Navbar` | Fixed nav. Scrolled state (opacity/blur after 60px), `on-dark` white-text mode on `/` only, active-route highlighting via `usePathname()`, staggered full-screen mobile menu under 1000px. |
| `Footer` | 3-column footer (brand statement / Explore links / Connect links), trimmed from 4 columns in the Phase 1 review. |

---

## 9. Shared Hooks
All in `hooks/`, barrel-exported from `hooks/index.ts`:
- `useReducedMotion()` — see §5.
- `useReveal<T>(options)` — see §5.
- `useCountUp(options)` — see §5.
- `useMagnetic<T>()` — see §5.
- `useScrollProgress()` — see §5.

No data-fetching hooks exist yet (no backend to fetch from — see §12).

---

## 10. Utility Functions
- `lib/cn.ts` — `cn(...parts)`: trivial classname joiner (filters
  falsy values). Deliberately not `clsx`/`tailwind-merge` — not needed at this
  project's scale; revisit only if class-conflict bugs actually appear.
- `utils/format.ts` — `formatIndianNumber(value)`: formats with Indian digit
  grouping (`en-IN` locale) for the stats counters (e.g. `2,50,000`).
- `lib/schemas/inquiry.ts` — `inquirySchema` (Zod) + `InquiryInput` type +
  `businessTypes` const array. **This is the single source of truth for
  wholesale-inquiry validation**, used today by `ContactForm` and intended to
  be reused unchanged by the Phase 3 server action/API route so client and
  server can never validate differently. Includes a honeypot field
  (`website`, must stay empty) for basic bot resistance ahead of real
  spam-protection infrastructure.

---

## 11. Layout System

- **Root layout** (`app/layout.tsx`, Server Component): loads
  `Cormorant_Garamond` and `Jost` via `next/font/google`, sets metadata
  (title template, OG, Twitter card, robots) from `config/site.ts`, injects
  an `Organization` JSON-LD script, and renders the persistent chrome
  (`Loader`, `ProgressBar`, `Navbar`, `main`, `Footer`, `Chatbot`) around
  `children`.
- **`app/providers.tsx`** (Client Component boundary): exists solely to host
  `LightboxProvider` without forcing the whole root layout to be a Client
  Component. Add future client-only providers (analytics, theme) here rather
  than making `layout.tsx` itself `"use client"`.
- **No nested route-group layouts exist yet** — every interior page will need
  to compose its own `PageHero` + sections directly in its `page.tsx` (see
  Remaining Work). There is no shared "interior page" layout wrapper; decide
  during Phase 2 completion whether one is worth adding (e.g. a
  `(marketing)` route group layout) versus keeping pages self-contained. The
  brief's instruction to "use layouts to avoid duplication" has **not** been
  acted on beyond the root layout — this is a gap.

---

## 12. Routing Structure

Target routes (from the original brief) and their current status:

| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | **Done** — composes `Hero`, `Standard`, `FactoryGallery`, `CollectionGrid`, `CampaignGallery`, `WhyGrid`, `CtaBand` |
| `/about` | `app/about/page.tsx` | **Done** — `PageHero` + `Story` + `Timeline` + `Process` + `CtaBand` |
| `/collections` | `app/collections/page.tsx` | **Done** — `PageHero` + `CollectionPortfolio` (wrapped in `<Suspense>`) + `CtaBand` |
| `/how-to-order` | `app/how-to-order/page.tsx` | **Done** — `PageHero` + `OrderSteps` + `Faq` + `CtaBand` |
| `/contact` | `app/contact/page.tsx` | **Done** — `PageHero` + `ContactDetails` |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | **Done** — `.legal` page rendering `privacyPolicy` |
| `/terms-and-conditions` | `app/terms-and-conditions/page.tsx` | **Done** — `.legal` page rendering `termsAndConditions` |
| 404 | `app/not-found.tsx` | **Done** — branded with `PageHero` + Button |
| Sitemap | `app/sitemap.ts` | **Done** — dynamic, all routes |
| Robots | `app/robots.ts` | **Done** — allows all crawlers |

`app/api/` will be created in Phase 3 (M8–M9) for contact and chatbot
endpoints.

---

## 13. Content Architecture

All copy and structured data live in `content/*.ts`, typed against
`types/content.ts`, deliberately decoupled from presentation so a future CMS
can populate the same shapes without touching components.

| File | Exports | Consumed by |
|---|---|---|
| `content/home.ts` | `homeStats`, `factoryMedia`, `homeCollections`, `campaignMedia`, `whyCards` | `sections/home/*` |
| `content/about.ts` | `aboutIntro`, `timeline`, `process` | `sections/about/*` |
| `content/collections.ts` | `collectionFilters`, `collectionPieces` | `sections/collections/CollectionPortfolio.tsx` |
| `content/order.ts` | `orderSteps`, `faqs` | `sections/order/*` |
| `content/legal.ts` | `privacyPolicy`, `termsAndConditions` | **not yet consumed** (pages don't exist) |
| `content/chatbot.ts` | `knowledgeBase`, `chatSuggestions`, `chatGreeting`, `chatFallback` | `components/shared/Chatbot.tsx` |

`config/site.ts` holds brand facts (`siteConfig`), external channels
(`channels` — WhatsApp/phone/Instagram/map, **all placeholder values,
`910000000000`**), `navLinks`, and `footerLinks`. `types/content.ts` defines
`MediaTone`, `MediaItem`, `FactoryMediaItem`, `CampaignMediaItem`, `Stat`,
`CollectionCard`, `TimelineEntry`, `ProcessStep`, `WhyCard`, `OrderStep`,
`FaqEntry`, `CollectionFilter`, `CollectionPiece`.

**Rule:** never inline copy strings directly into a `sections/*` component.
If new copy is needed, add it to the relevant `content/*.ts` file first.

---

## 14. Current Progress

### Completed Components
All of `components/ui/`, `components/layout/`, and `components/shared/` as
listed in §8 exist and are internally consistent with the design system. All
hooks (§9) and utilities (§10) are done.

### Completed Sections (all routed)
- `sections/home/*` — all 7 files (incl. `Stats`), **routed** via `/`.
- `sections/about/*` — `Story`, `Timeline`, `Process`, **routed** via `/about`.
- `sections/collections/CollectionPortfolio.tsx` — **routed** via `/collections`.
- `sections/order/OrderSteps.tsx`, `Faq.tsx` — **routed** via `/how-to-order`.
- `sections/contact/ContactForm.tsx`, `ContactDetails.tsx` — **routed** via `/contact`.

### Completed Pages
All Phase 2 routes: `/`, `/about`, `/collections`, `/how-to-order`, `/contact`,
`/privacy-policy`, `/terms-and-conditions`, 404, sitemap, robots.

### Remaining Work (Phase 3 — backend)
1. **M8: Contact API** — `app/api/inquiry/route.ts` + wire `ContactForm` to it.
2. **M9: AI Chatbot** — **Done.** `app/api/chat/route.ts` calls NVIDIA NIM
   (`meta/llama-3.3-70b-instruct`); see §16.
3. **M10: Admin Dashboard** — lightweight monitoring (visitors, inquiries, chats).
4. **M11: Final Production Review** — type safety, accessibility, performance,
   dead code cleanup.
5. **Resolve the `Media` vs `Placeholder` duplication** flagged in §8 (M11).
6. **`public/` is empty** — add favicon before deployment.

---

## 15. Planned Backend (Phase 3 — not started)

- **Contact/inquiry endpoint**: a Server Action or `app/api/inquiry/route.ts`
  that parses `inquirySchema` (already defined, reuse as-is) and sends via
  Resend (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` are
  already stubbed in `.env.example`). `ContactForm.tsx`'s `onSubmit` has a
  `// TODO (Phase 3)` marker showing exactly where the fetch/action call
  replaces the current stubbed `setTimeout`.
- **Basic analytics**: not designed yet. No schema, no events defined. Keep
  it lightweight per the brief ("not an ERP/SaaS") — likely a simple events
  table plus a Vercel Analytics or self-hosted pageview counter, not a full
  analytics platform.
- Do not add a database, ORM, or auth system speculatively — wait for Phase 3
  scope to be explicitly requested.

## 16. AI Chatbot — Implemented (NVIDIA NIM)

`components/shared/Chatbot.tsx` calls `POST /api/chat`. That route:

- If `NVIDIA_API_KEY` is set: calls NVIDIA's OpenAI-compatible NIM endpoint
  (`https://integrate.api.nvidia.com/v1/chat/completions`) with model
  `meta/llama-3.3-70b-instruct` (override via `NVIDIA_MODEL`). The system
  prompt (`content/chatbot-prompt.ts`) is assembled at import time from
  `content/home.ts`, `content/about.ts`, `content/collections.ts`,
  `content/order.ts`, `config/site.ts`, and `content/chatbot.ts`'s
  `knowledgeBase` — so the assistant's knowledge of the site is always
  current with zero duplication. Editing any of those content files updates
  the chatbot automatically; `content/chatbot-prompt.ts` itself should not
  need further edits for routine content changes.
- If `NVIDIA_API_KEY` is not set, or the NVIDIA call fails: falls back to
  `resolveLocal()`, the same deterministic keyword matcher as before, which
  also does keyword-based handoff detection via `handoffKeywords`.

**Human handoff:** the system prompt defines a handoff protocol — the model
appends a `[[HANDOFF]]` token to its own reply when a visitor should talk to
a person (exact pricing, wants to order, asks for a human, frustration,
out-of-scope questions, factory-visit scheduling). `app/api/chat/route.ts`
strips that token and returns `{ answer, handoff: true }`; `Chatbot.tsx`
then renders a "Continue on WhatsApp" button under that message, linking to
`channels.whatsapp` in `config/site.ts`. The model never sees or states the
actual phone number — this avoids any risk of it inventing or misreading
contact details, and means the number only needs to be correct in one place.

**Keep in mind:** `channels.whatsapp` in `config/site.ts` is still the
placeholder `https://wa.me/910000000000` — replace it with the real number
before launch (see the existing TODO on that line). Once updated, both the
footer/contact-page WhatsApp links and the chatbot's handoff button pick up
the real number automatically.

## 17. Planned Admin Dashboard (Phase 4 — not started, not designed)

No schema, no auth, no routes exist. The brief mentions this only as a future
phase ("lightweight admin dashboard" — explicitly not ERP-grade). When this
phase starts: the `content/*.ts` files are the natural shape for whatever a
CMS would edit — a sensible approach is to keep the same TypeScript shapes as
the database schema, so admin-edited content and hardcoded content are
interchangeable at the type level. Do not start this work speculatively.

---

## 18. Coding Standards

### Component Guidelines
- **Server Components by default.** Only add `"use client"` when a component
  genuinely needs browser APIs, state, effects, or event handlers. Every
  current client component (`Navbar`, `Chatbot`, `Lightbox`, `Loader`,
  `ProgressBar`, `ContactForm`, `CollectionPortfolio`, `Reveal`, `Button`,
  hooks) has a real reason to be one — don't add the directive defensively.
- **One responsibility per component.** `sections/` compose `components/`;
  `components/ui` never imports from `content/`; `content/` never imports
  from `components/`.
- **Reuse existing CSS classes** (`globals.css`) before writing new ones.
  Reach for a `cn()`-joined combination of existing classes first.
- **Barrel exports**: every folder under `components/`, `sections/`, `hooks/`,
  `types/` has an `index.ts` re-exporting its public members. Import from the
  barrel (`@/components/ui`), not the individual file, unless there's a
  circular-import reason not to.
- **Path alias**: `@/*` maps to the project root (see `tsconfig.json`).
  Always use it instead of relative `../../..` chains.

### Animation Guidelines
- Gate all custom animation on `useReducedMotion()` or the global
  `prefers-reduced-motion` CSS block in `globals.css` — never animate
  unconditionally.
- Default to the CSS `Reveal`/`useReveal` mechanism. Reach for GSAP only for
  genuinely orchestrated, multi-element timelines (the hero is the reference
  example). Reach for Motion (`motion/react`) for component-level
  micro-interactions once it's actually adopted (see Remaining Work #9).
  Don't introduce a fourth animation approach.
- Keep new reveal distances short (~32px) and durations slow (~1.2s+) per the
  tokens in `styles/motion.ts` — do not invent new timing values inline.
- Magnetic/hover effects must be gated to `(hover:hover) and (pointer:fine)`.

### Accessibility Standards
- Every interactive placeholder figure (gallery tiles that aren't real `<a>`/
  `<button>` elements) must have `role="button"`, `tabIndex={0}`, an
  `aria-label`, and an `onKeyDown` handler for Enter/Space — this pattern is
  already established in `FactoryGallery`, `CampaignGallery`, and
  `CollectionPortfolio`; copy it for any new gallery.
- `:focus-visible` is styled globally (gold outline) — don't suppress it.
- Respect `prefers-reduced-motion` (see Animation Guidelines).
- Use semantic HTML (`<nav>`, `<main>`, `<footer>`, `<figure>`/`<figcaption>`,
  proper heading hierarchy) — already the pattern throughout; maintain it in
  new pages.
- Form fields have associated `<label htmlFor>` — maintain this in any new
  form field.

### Performance Standards
- Keep Server Components as the default (see above) — this is a performance
  decision, not just a style preference.
- Real media (when wired in) must go through `next/image` (already the plan
  in `Media.tsx`) — never a raw `<img>`.
- No additional animation or UI libraries without checking whether an
  existing one already covers the need.
- Fonts are self-hosted via `next/font` — do not switch to a `<link>` to
  Google Fonts CDN.

---

## 19. Known TODOs (grep-able markers left in code)

- `config/site.ts` — `// TODO: confirm real founding year with the client.`
  (currently `"2016"`, a placeholder guess, not a fact).
- `config/site.ts` — `// TODO: replace placeholder numbers before launch.`
  (WhatsApp/phone are `910000000000`).
- `config/site.ts` — `// TODO: set the real inbox once Resend is wired
  (Phase 3).`
- `sections/contact/ContactForm.tsx` — `// TODO (Phase 3): POST to
  /api/inquiry (Resend).`
- `content/legal.ts` docblock — both legal documents are template copy and
  must be reviewed by a legal advisor before publishing (inherited verbatim
  from the Phase 1 HTML prototype's own disclaimer).
- `.env.example` — all Phase 3+ env vars are placeholders, none are wired to
  real services yet.

---

## 20. Next Recommended Milestone

**M8: Contact API (Backend).** Phase 2 frontend is complete. Next:

1. Build `app/api/inquiry/route.ts` — POST handler with Zod validation
   (reuse `inquirySchema`), Resend email delivery, honeypot check, rate limiting.
2. Wire `ContactForm.tsx` to the new endpoint (replace the `setTimeout` stub).
3. Then M9 (AI chatbot), M10 (admin dashboard), M11 (final review).

---

## 21. Milestone Log

*Append-only. Each entry records what changed and why, so future sessions
get an honest history rather than a static snapshot.*

### M1 — Homepage (composition + routing)
- Wired `app/page.tsx` composing all home sections.
- Fixed duplicated inline styles → Tailwind tokens.

### M2 — About/Manufacturing page
- Created `app/about/page.tsx` composing `PageHero` + `Story` + `Timeline` +
  `Process` + `CtaBand`.
- Fixed same duplicated inline-style pattern in `Timeline.tsx`.

### M3 — Manufacturing-page audit
- Applied brand rule ("never bare machinery") to `content/about.ts` tags:
  `"Cutting Floor"` → `"Cutting by Hand"`, `"Stitching Lines"` → `"Hands on
  the Machine"`.

### M4–M7 — Full Phase 2 completion (structure + all remaining pages)
- **Restructured entire project** from flat-file layout into proper Next.js
  folder hierarchy per §3 (60+ files moved into `app/`, `components/`,
  `sections/`, `content/`, `config/`, `types/`, `hooks/`, `lib/`, `utils/`,
  `styles/`).
- Created all barrel `index.ts` exports.
- Built all missing route pages:
  - `/about` — `PageHero` + `Story` + `Timeline` + `Process` + `CtaBand`
  - `/collections` — `PageHero` + `CollectionPortfolio` (Suspense-wrapped) + `CtaBand`
  - `/how-to-order` — `PageHero` + `OrderSteps` + `Faq` + `CtaBand`
  - `/contact` — `PageHero` + `ContactDetails`
  - `/privacy-policy` — legal page rendering `privacyPolicy`
  - `/terms-and-conditions` — legal page rendering `termsAndConditions`
  - `not-found.tsx` — branded 404
- Created `app/sitemap.ts` and `app/robots.ts`.
- Applied M3 brand-rule fix to `content/about.ts`.
- Cleaned up old flat files and `mnt/` skeleton directory.
- Brought `HANDOFF.md` fully current.

### M9 — AI Chatbot (NVIDIA NIM integration)
- Replaced the planned OpenAI integration with NVIDIA NIM
  (`meta/llama-3.3-70b-instruct`, OpenAI-compatible endpoint at
  `https://integrate.api.nvidia.com/v1/chat/completions`). Chose a plain
  instruct model over NVIDIA's Nemotron reasoning models deliberately: the
  reasoning models run "thinking" mode on by default, which both emits
  `<think>` tokens that would leak into the chat UI and has been observed to
  partially ignore custom system prompts — unacceptable for a
  brand-voice-and-guardrails-driven concierge.
- Rewrote `content/chatbot-prompt.ts` to assemble the system prompt from
  every content file (`content/home.ts`, `about.ts`, `collections.ts`,
  `order.ts`, `config/site.ts`, `content/chatbot.ts`) instead of only
  `knowledgeBase`, so the assistant has complete, always-current knowledge
  of the site with no hardcoded duplication.
- Added a human-handoff protocol to the system prompt: the model appends a
  `[[HANDOFF]]` sentinel to its reply when a visitor should talk to a
  person; `app/api/chat/route.ts` strips it and returns `{ handoff: true }`.
  The model is explicitly instructed never to state a phone number/link
  itself — `Chatbot.tsx` renders the WhatsApp CTA from `config/site.ts`'s
  `channels.whatsapp` instead, so the number only needs to be correct in
  one place.
- Added `handoffKeywords` to `content/chatbot.ts`, used by the offline
  fallback matcher so handoff detection still works with no API key
  configured.
- Simplified `app/api/chat/route.ts` from a streaming response to a plain
  JSON `{ answer, handoff }` response — NVIDIA NIM responses for this use
  case are short (300 tokens) and non-streaming makes handoff-token
  detection reliable; the previous OpenAI-streaming branch is removed.
- Updated `components/shared/Chatbot.tsx` to match: removed the
  streaming-reader branch, added a pending/typing indicator, and renders a
  "Continue on WhatsApp" button under any bot message flagged `handoff`.
- Env vars: `.env.example` now documents `NVIDIA_API_KEY` and
  `NVIDIA_MODEL`; `OPENAI_API_KEY`/`OPENAI_MODEL` removed (chatbot no
  longer uses OpenAI at all).
- `channels.whatsapp` in `config/site.ts` is still the placeholder number —
  unchanged by this milestone, still must be replaced before launch.
