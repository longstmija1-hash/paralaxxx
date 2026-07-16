# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/parallax/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** PARALLAX
**Generated:** 2026-07-16 (ui-ux-pro-max + project overrides)
**Category:** EdTech Landing (Umschool Soft Blue)

---

## Global Rules

### Color Palette (OVERRIDE — use these, not skill defaults)

| Role | Hex | Token |
|------|-----|-------|
| Primary / Accent | `#7c91f9` | `ums.accent` |
| Tint background | `#eef1ff` | `ums.tint` |
| Form CTA / Social proof | `#ff6b5b` | `ums.coral` |
| Page background | `#f7f7f7` | `ums.bg` |
| Card / Surface | `#ffffff` | `ums.card` |
| Border | `#ececec` | `ums.border` |
| Text | `#111111` | `ums.text` |
| Muted text | `#6b7280` | `ums.muted` |
| Nav / Pricing CTA | `#111111` | black pill |

**Do not use** skill defaults `#0EA5E9` / `#F97316` / Comic Neue / Baloo 2.

### Typography (OVERRIDE)

- **Heading:** Unbounded (`font-display`)
- **Body:** Manrope (`font-sans`)
- **Mood:** modern EdTech, clean, geometric

### Spacing / Shadows

Keep Umschool card language: `rounded-[28px]`, soft shadow `0 4px 24px rgba(0,0,0,0.04)`, hover lift `-2px` + blue-tinted shadow.

---

## Style Guidelines

**Base:** Umschool Soft Blue (80% neutral / 15% tint / 5% accent)

**Pattern focus from ui-ux-pro-max:**
- Social Proof-Focused (testimonials, avatars, metrics, count-up)
- Scroll storytelling rhythm (progress bar + one-shot fade-up)
- Conversion: social proof → mini CTA → pricing → final form

**Key effects:**
- Stat count-up on scroll (once)
- Testimonial carousel + amber stars
- Scroll progress indicator (`ums.accent`)
- Form coral CTA only; site CTAs stay black pills

### Anti-Patterns (Do NOT Use)

- Neon / cyber / purple glow
- Infinite decorative animations (float loops)
- Emojis as icons — Lucide only
- Missing `cursor-pointer` on clickables
- Layout-shifting scale hovers
- Ignoring `prefers-reduced-motion`
- Sticky full-page form (nav CTA is enough)

---

## Pre-Delivery Checklist

- [ ] No emojis as icons
- [ ] `cursor-pointer` on clickables
- [ ] Transitions 150–300ms
- [ ] Contrast 4.5:1
- [ ] Focus states visible
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive 375 / 768 / 1024 / 1440
- [ ] No content under fixed nav + marquee
