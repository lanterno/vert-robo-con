# Architecture & Design Philosophy

This document explains the technology choices behind the website of Vert Robo Con (VRC), a fictional community used as demo content. Every tool was selected because it represents the **state of the art** in its category — not out of familiarity or convenience.

> All people, organisations, events, statistics and images on the site are fictional and synthetic. See the "Demo content" section of the [README](README.md).

## Core Philosophy

> **Use the best tool for the job, not the most popular one.**

Software ages quickly. A modern non-profit website should showcase both mission and technical excellence. This project prioritizes:

1. **Performance** — Users shouldn't wait
2. **Type Safety** — Catch errors before runtime
3. **Modern Standards** — Native web features over polyfills
4. **Developer Experience** — Fast feedback loops
5. **Simplicity** — Minimal dependencies, maximal capability
6. **Admin Accessibility** — Non-technical admins can edit content

---

## Technology Choices

### Framework: Astro

**Why Astro over Next.js or plain HTML?**

[Astro](https://astro.build) is the state-of-the-art static site generator:
- **Zero JavaScript by default** — Ships only HTML/CSS unless you need interactivity
- **Island Architecture** — Partial hydration for dynamic components
- **Content-first** — Built for content-heavy sites like marketing pages
- **Framework agnostic** — Can use React, Vue, Svelte components if needed
- **Perfect Lighthouse scores** — Out of the box performance

For a marketing website, Astro provides maximum performance with minimum complexity.

### CMS: Tina CMS

**Why Tina over WordPress, Sanity, or Contentful?**

[Tina CMS](https://tina.io) offers unique advantages:
- **Git-based** — Content lives in your repository (version controlled!)
- **Visual editing** — Edit content directly on the page preview
- **Type-safe schemas** — Content structure defined in TypeScript
- **Free tier** — No cost for small teams
- **Local development** — Full CMS experience without cloud dependency

Admins get a WordPress-like editing experience while developers maintain full control over the codebase.

### Runtime: Bun

**Why not Node.js?**

[Bun](https://bun.sh) is a drop-in replacement for Node.js, written in Zig, that's significantly faster for:
- Package installation (10-100x faster than npm)
- Script execution
- TypeScript execution (native, no transpilation step)

Bun serves as the package manager, test runner, and script executor. It's the future of JavaScript runtimes.

### Styling: Tailwind CSS v3

**Why not vanilla CSS, Sass, or CSS-in-JS?**

[Tailwind CSS v3](https://tailwindcss.com) is the proven choice for utility-first CSS:
- **JIT Compiler** — Generates only the classes you use
- **Excellent Astro Integration** — Official `@astrojs/tailwind` plugin
- **Customizable** — Theme extensions for brand colors and fonts
- **Battle-tested** — Stable ecosystem with wide adoption

Tailwind v3 provides the best balance of features and Astro compatibility.

### Type Safety: TypeScript (Strict)

**Configuration philosophy:**

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "noPropertyAccessFromIndexSignature": true
}
```

Every strict flag is enabled. TypeScript should catch errors, not just provide autocomplete.

### Map data: a JSON file in the repo

The `/map` page reads `src/data/organizations.json` at build time. There is no spreadsheet to fetch and no geocoding step (the former `scripts/geocode-orgs.ts` was removed), so the map never depends on a third-party service at build time.

### Hosting: Static Deployment

**Recommended platforms:**
- **Netlify** — Built-in forms, functions, and CDN
- **Vercel** — Excellent DX and preview deployments
- **Cloudflare Pages** — Fastest global CDN

All offer **free tiers** suitable for non-profit usage.

---

## Project Structure

```
site/
├── public/              # Static assets (images, fonts)
│   └── images/
├── src/
│   ├── components/      # Reusable Astro components
│   ├── content/         # Tina CMS content (JSON)
│   │   └── settings/    # Site settings
│   ├── data/            # Fictional map dataset (organizations.json)
│   ├── layouts/         # Page layouts
│   ├── lib/             # Constants, summit data, map loader
│   ├── pages/           # Astro pages (routes)
│   └── styles/          # Global CSS
├── tina/                # Tina CMS configuration
│   └── config.ts        # Content schema definitions
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind theme extensions
└── tsconfig.json        # TypeScript configuration
```

---

## Content Management

### For Admins

1. Run the development server: `bun run dev`
2. Navigate to `/admin` to access Tina CMS
3. Edit pages visually with live preview
4. Changes are saved to Git automatically

### For Developers

Content schemas are defined in `tina/config.ts`:
- **Pages** — MDX files with frontmatter
- **Site Settings** — JSON configuration (navigation, footer, social links)

---

## What's NOT Here

Equally important is what we chose **not** to include:

| Avoided | Reason |
|---------|--------|
| React | Hydration overhead for a static site |
| Next.js | Server complexity not needed |
| WordPress | Database overhead, security concerns |
| CSS Modules | Tailwind is more maintainable |
| Component libraries | Custom design, no bloat |

---

## Performance Targets

The architecture delivers:

- **Lighthouse Performance**: 100
- **First Contentful Paint**: < 0.5s
- **Time to Interactive**: < 0.5s
- **Total JavaScript**: < 10KB (gzipped)
- **Zero layout shift**

---

## Development Commands

```bash
# Start development server with Tina CMS
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

---

## Future Considerations

Technologies we're watching:

- **Astro 5.0** — Server islands, improved DX
- **Bun bundler** — When plugin support matures, could replace Vite
- **CSS native nesting** — Further reduce Tailwind reliance
- **View Transitions API** — Native page transitions

The stack will evolve. The philosophy won't.
