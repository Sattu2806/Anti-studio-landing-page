## Anti-style Animated Landing Page

<img width="1301" height="791" alt="Screenshot 2026-02-24 at 2 05 16 PM" src="https://github.com/user-attachments/assets/af8d0e5c-c8d9-413c-ad64-2f5251542a83" />

A single-page marketing experience built with **Next.js App Router + Tailwind**, inspired by high-end SaaS “anti aesthetic” landing pages. It features:

- **Hero semicircle reveal** with a light sweep animation.
- **Staggered navbar + hero content entrance**.
- **Scroll-triggered sections** (features, how it works, metrics, testimonials, CTA).
- **Animated SVG vertical lines** in sections and “dripping” lines flanking the hero.
- **Space Grotesk typography** and dark neon visual system.

### Tech stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind via the new `@import "tailwindcss"` workflow and custom CSS in `app/globals.css`
- **Fonts**: `next/font` with Space Grotesk

### Local development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

The main layout and animations live in:

- `app/page.tsx` – structure, React logic, scroll-based reveals
- `app/globals.css` – hero semicircle, vertical drip lines, SVG curve animations, global theme
