# FrogAI — Design System

A high-converting, viral-ready brand system for FrogAI, the AI agency partner for
elite real estate agents. Built **surface-first** (Decide/Learn landing) following the
claude-design methodology, drawing on MagicUI (motion), ShadCN (primitives), and BeUI
(discipline). The previous Codex build was a single 1250-line CSS file; this system is
token-driven, componentized, and animation-led.

## Brand

- **What FrogAI is:** an AI-powered *agency* for real estate — not a SaaS tool the agent
  operates, but a partner that runs listing media + lead response for them.
- **Two hero products:**
  - **Leap** — turns listing photo sets into cinematic 4K listing video (AI camera path,
    luxury color grade, social export).
  - **Ribbit** — AI speed-to-lead concierge that replies in <3s, qualifies intent, and
    hands agents a context-rich booking.
- **Tone:** cinematic, confident, premium, a little playful (the frog). Sell like a media
  company, respond like a machine.

## Visual language

- **The Pond** — deep charcoal-green near-black canvas (not pure black, not blue-violet).
  Layered radial glows + faint grid for depth without clutter.
- **Electric Lime** (`#d4ff3f`) — the *single* accent. Chosen for the brand, not a default.
  Used for CTAs, emphasis, live states, and the only color pop.
- **Glass + elevation** — real depth system: `var(--glass)` surfaces carry a directional
  gradient + `backdrop-blur` + drop shadow. Never unearned blur.

## Tokens (`src/design-system.css`)

| Group | Key values |
|---|---|
| Color | `--pond-950..700`, `--ink`, `--ink-soft/mute/faint`, `--lime`, `--lime-bright/deep/ink/soft/line/glow`, `--glass`, `--line*` |
| Type | `--font-display` Space Grotesk · `--font-body` Inter · `--font-mono` JetBrains Mono |
| Radii | `--r-sm` 10 · `--r-md` 16 · `--r-lg` 22 · `--r-xl` 30 · `--r-pill` 999 |
| Shadow | `--shadow-sm/md/lg`, `--shadow-lime` |
| Motion | `--ease-out` `(.22,1,.36,1)` · `--ease-spring` `(.16,1,.3,1)` · `--t-fast/med/slow` |

## Type scale

- Display headings use **Space Grotesk** (chosen, not Inter) at `clamp()` sizes:
  `.h1` 2.9→6rem, `.h2` 2→3.6rem, `.h3` 1.4→2rem, tight `line-height: 0.98`,
  negative tracking. Body is Inter. Mono (JetBrains) for kickers/eyebrows/labels.

## Motion posture

- Scroll reveals: `opacity + y + blur` easing into view once (`Reveal` in primitives).
- Magnetic buttons: pointer-tracking spring tilt (`MagneticButton`).
- Loops with purpose: drifting pond blob, marquee, scan-line on hero video, typing dots,
  pulse on live status.
- Respect `prefers-reduced-motion` globally.

## Components (`src/components/`)

| Component | File | Notes |
|---|---|---|
| `primitives` | primitives.jsx | `Reveal`, `MagneticButton`, `FrogMark`, `SectionHeading`, motion variants |
| `Nav` | ui.jsx | pill nav, scroll-state, hover underline, magnetic CTA |
| `Hero` | ui.jsx | split layout, animated video mock w/ scan + progress, stats |
| `LogoMarquee` | ui.jsx | infinite brokerage marquee, edge masks |
| `BeforeAfter` | ui.jsx | draggable clip-path before/after (Leap) |
| `RibbitChat` | ui.jsx | in-view typing chat demo + agent handoff panel |
| `BentoFeatures` | ui.jsx | asymmetric bento (wide/tall), stagger reveal |
| `Pricing` | ui.jsx | 2 plans, featured glow, magnetic CTA |
| `Testimonials` | ui.jsx | 3 quote cards, star rating |
| `FAQ` | ui.jsx | accordion w/ height animation |
| `FinalCTA` | ui.jsx | glowing centered CTA |
| `Footer` | ui.jsx | brand + link columns |

## Anti-slop audit (score: 1/10)

Run against the claude-design slop diagnostic:

1. Tech gradient — **no** (lime/pond, not indigo/violet).
2. Generic tech hue — **no** (lime is brand-chosen).
3. Feature-tile grid — **partial** (bento is asymmetric + prioritized, not 3 equal cards).
4. Accent rail — **no** (no left-border callout cards).
5. Unearned blur — **no** (glass carries gradient + elevation system).
6. Monument stat — **no** (stats are small, contextual).
7. Icon topper — **avoided** (bento icons are lead, not centered fillers; hero has no icon row).
8. Center stack — **no** (hero is split, sections alternate alignment).
9. Default type — **no** (Space Grotesk display, chosen).
10. Wrong surface — **no** (Decide/Learn surface → hero + sections correct).

**Result:** 1/10 (only the asymmetric bento edges near tell #3, which is intentional and
re-composed, not a default grid). Ship-ready.

## Stack

React 18 + Vite 6 + Framer Motion 11 + lucide-react. `@vitejs/plugin-react` provides the
JSX automatic runtime (`vite.config.js`). Fonts via Google Fonts. `npm run dev` / `build`.
