# The UV Observer — Design System

The UV Observer is a satirical local newspaper covering the Upper Valley (the Vermont/New Hampshire region around Hanover, Norwich, White River Junction, and Lebanon). It publishes on Substack at [uvobserver.com](https://www.uvobserver.com), plus an occasional print edition. Its own tagline: "Unreal Coverage of the Upper Valley, Published Occasionally."

**Sources used to build this system:**
- `uploads/UVO logo subhead.png` — full logotype + tagline lockup
- `uploads/row.png` — bare wordmark (no tagline), used as a compact masthead row
- `uploads/FengardoNeue_Black.otf` — the real display face used in the print edition's masthead
- User notes: the Canva templates (social/newsletter graphics) use Helvetica World Bold for headlines and Minion Pro Regular for subheads/body — both commercial fonts we don't have files for (see Font substitutions below)
- theuvobserver.com (fetched via search, not scraped in full) — confirmed it's Substack-hosted; sampled headline/dateline style from a published post ("City Determines How To Use Common Sense")

No codebase or Figma file was attached, so components and the homepage below are an original construction sized to the brand, not a copy of a real product.

## Font substitutions

Fengardo Neue Black is embedded from the real file and reserved for the masthead logotype only. Helvetica World Bold and Minion Pro Regular aren't available as files or web fonts, so per your picks this system substitutes:
- **Libre Franklin** (weight 700–900) for Helvetica World Bold — display headlines
- **Lora** for Minion Pro Regular — subheads and body copy

If you get the real Helvetica World Bold / Minion Pro files (or web-font licenses), swap the `@font-face`/`font-family` in `tokens/typography.css` and drop the substitution note above.

## Content fundamentals

Deadpan satirical local news, styled as straight journalism — the joke is in treating a trivial local matter (a committee, a diner's hash browns, a rediscovered pamphlet) with the full gravity of hard news.

- **Voice:** third person, AP-style reporting. No "you," no direct address, no exclamation points, no emoji.
- **Headlines:** declarative, matter-of-fact, absurd only in content: "City Determines How To Use Common Sense," "Selectboard Tables Motion, Again."
- **Structure:** dateline lead-in ("CITY HALL —"), invented quotes attributed to vague authorities ("one expert noted," "the City's archivist"), escalating bureaucratic logic played completely straight.
- **Subjects:** hyper-local, low-stakes municipal/small-town topics (selectboard meetings, diners, weather, schools) — never national politics or real named individuals.
- The tagline itself sets the tone: "Unreal Coverage... Published Occasionally" — self-deprecating about its own irregular publishing schedule.

## Visual foundations

- **Colors:** masthead red (`--red-500` `#B71C1C`) and dateline blue (`--blue-500` `#225695`) sampled directly from the logo, on plain white/off-white newsprint neutrals. Two-color system, used sparingly as accents (kickers, rules, links) — body copy stays ink-on-paper.
- **Type:** three-tier system. Fengardo Neue Black for the masthead logotype only; Libre Franklin (bold/black) for all headlines and UI labels/buttons; Lora (serif) for body copy, deks, and pull-quotes.
- **Layout:** classic broadsheet rhythm — flat hairline rules (`--hairline`) separate articles, thick rules (`--rule-thick`) mark mastheads/major sections. No cards, no shadows, no gradients anywhere.
- **Corners:** sharp. `--radius-sm` (2px) is the only rounding, used on buttons and inputs — nothing is pill-shaped.
- **Backgrounds:** flat white/cream only. No photography, illustration, or texture in the assets provided.
- **Motion:** none observed or implied — this is a static, print-descended brand. Buttons get a flat color-swap on hover, no scale/shadow/press effects.
- **Kickers/datelines:** uppercase, letter-spaced, alternating red/blue by section — the one place color does real work.

## Iconography

No icon system, icon font, or SVG set was found in the provided materials. This brand relies entirely on typography and rules, not icons — don't introduce one. If a UI genuinely needs a glyph (e.g. a share icon), use a plain-text label instead ("Share") before reaching for an icon font.

## Intentional additions

No component source was attached, so the component set below is an original set sized to an editorial/newspaper brand (not a generic app-UI set): masthead, kicker, headline, byline, rule, article card, pull-quote, subscribe button, email capture. These are invented to fit the brand's real content (Substack posts, homepage feed) rather than copied from a source.

## Index

- `styles.css` — root stylesheet; imports everything under `tokens/`
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` — design tokens
- `assets/` — logo lockups (`logo-with-subhead.png`, `logo-wordmark.png`) and `fonts/FengardoNeue_Black.otf`
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand/logo, rules)
- `components/editorial/` — Masthead, Kicker, Headline, Byline, Rule, ArticleCard, PullQuote
- `components/forms/` — SubscribeButton, EmailCapture
- `ui_kits/website/` — Homepage.jsx + index.html, a recreation of the Substack-hosted homepage
- `SKILL.md` — portable skill file for use in Claude Code
