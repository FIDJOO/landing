# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About Fidjoo

Fidjoo is a creative app where children (ages 5-12) turn simple choices into their own animated storybooks. It transforms passive screen time into meaningful, imaginative play. Key values:

- **Meaningful screen time** - Children build stories through choices (hero, world, challenge, ending)
- **Family co-creation** - Designed for parents and kids to create together
- **Safe & kid-friendly** - No ads, no distractions, all content stays private and age-appropriate
- **Offline support** - Created stories can be enjoyed offline

## Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server on localhost:3000
pnpm build      # Production build
pnpm lint       # Run ESLint
```

## Architecture

### Tech Stack

- Next.js 14 (App Router) with TypeScript
- Tailwind CSS v3 with CSS custom properties for theming
- Framer Motion for animations
- Baloo 2 font (Google Fonts) - playful, kid-friendly typography

### Path Alias

`@/*` maps to `./src/*`

### Key Directories

- `src/app/` - Next.js pages and API routes
- `src/components/` - React components (Hero, Benefits, Pricing, FAQ, etc.)
- `src/data/` - Static content data files (pricing, faq, benefits, hero, etc.)
- `src/types.ts` - TypeScript interfaces for all data structures
- `public/images/` - Brand assets organized by color variant (blue, black, white, yellow, green, red)

## Design System

### Color Palette (defined in `globals.css`)

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--primary` | #49AAFF | same | Main brand blue |
| `--secondary` | #8DD1FF | same | Secondary blue |
| `--tertiary` | #ffb71c | same | Yellow accent |
| `--primary-dark` | #2a7ac7 | same | 3D button shadow |
| `--secondary-dark` | #5ba8d9 | same | 3D button shadow |
| `--background` | #EDEBE5 | #151718 | Page background |
| `--card` | #F4F2EF | #151718 | Card background |
| `--foreground` | #11181C | #FFFFFF | Text color |

### 3D Buttons (`Button3D`, `Link3D`)

Signature playful buttons with press-down shadow effect. Located in `src/components/ui/`.

Variants: `primary`, `secondary`, `outline`, `dark`
Sizes: `sm`, `md`, `lg`
Props: `shadowHeight` controls 3D depth (default: 6px)

Usage:

```tsx
<Button3D variant="primary" size="md">Click me</Button3D>
<Link3D href="/page" variant="secondary">Go somewhere</Link3D>
```

### Brand Assets

Logo and mascot available in multiple colors at `public/images/`:

- `logo/` - Text logo
- `mascotte/` - Character mascot (includes favicon sets)
- `baseline/` - Logo with tagline

## Data-Driven Content

Landing page sections pull content from `src/data/` files:

- `siteDetails.ts` - Site name, URL, meta, analytics ID, logo paths
- `hero.ts` - Hero section heading and subheading
- `benefits.tsx` - Three benefit sections with bullets and icons
- `pricing.ts` - Subscription ($9.99/mo) and credit packs ($7.99-$35.99)
- `faq.ts` - FAQ entries (uses siteDetails.siteName for dynamic text)
- `menuItems.ts` - Navigation menu
- `footer.ts` - Footer content

To modify section content, edit the corresponding data file rather than the component.

## Internationalization (i18n)

The site supports **English (en)** and **French (fr)** with static generation for both languages.

### Architecture

All pages are under `src/app/[lang]/` and statically generated for `/en` and `/fr`:

- Root `/` redirects to `/en` or `/fr` based on geo-location (Vercel headers) or browser language
- Each page has `generateStaticParams()` returning both locales

### Key Files

| File | Purpose |
|------|---------|
| `src/i18n/config.ts` | Locales config (`en`, `fr`), `defaultLocale`, `isValidLocale()` |
| `messages/en.json` | English translations |
| `messages/fr.json` | French translations |
| `src/components/LocaleProvider.tsx` | Wraps pages with `NextIntlClientProvider` |
| `src/hooks/useLocalizedPath.ts` | Hook to prefix paths with current locale |

### Translations Structure

Translations are organized by section in `messages/*.json`:

```json
{
  "metadata": { "title": "...", "description": "..." },
  "header": { "features": "...", "pricing": "...", ... },
  "hero": { "heading": "...", "subheading": "..." },
  "benefits": { "section1": { ... }, "section2": { ... }, ... },
  "pricing": { ... },
  "faq": { ... },
  "blog": { "title": "...", "pageDescription": "...", "backToBlog": "...", ... },
  "footer": { ... },
  "contact": { ... },
  "download": { ... },
  ...
}
```

### Using Translations in Components

**Client Components** - Use `useTranslations` hook:

```tsx
'use client';
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('section');
  return <h1>{t('title')}</h1>;
}
```

**Server Components** - Import messages directly:

```tsx
import enMessages from '../../../messages/en.json';
import frMessages from '../../../messages/fr.json';

const messages = { en: enMessages, fr: frMessages };

export default async function Page({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const t = messages[lang];
  return <h1>{t.section.title}</h1>;
}
```

### Localized Links

Use `useLocalizedPath` hook in client components:

```tsx
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

function Nav() {
  const localizedPath = useLocalizedPath();
  return <Link href={localizedPath('/blog')}>Blog</Link>;
  // Renders /en/blog or /fr/blog based on current locale
}
```

### Blog Translations

Blog posts are stored in `src/data/blog.ts` with translations per post:

```ts
export const blogPosts: IBlogPostWithTranslations[] = [
  {
    slug: "my-post",
    coverImage: "/images/blog/post.png",
    author: "Fidjoo Team",
    date: "2025-01-01",
    tags: ["parenting"],
    translations: {
      en: {
        title: "English Title",
        excerpt: "English excerpt...",
        content: "English content...",
        readTime: "4 min read"
      },
      fr: {
        title: "Titre Français",
        excerpt: "Extrait français...",
        content: "Contenu français...",
        readTime: "4 min de lecture"
      }
    }
  }
];
```

Use helper functions:

- `getBlogPost(slug, locale)` - Get single post with localized content
- `getBlogPosts(locale)` - Get all posts with localized content

### Adding a New Language

1. Add locale to `src/i18n/config.ts`:

   ```ts
   export const locales = ['en', 'fr', 'es'] as const;
   ```

2. Create `messages/es.json` with all translations
3. Update `LocaleProvider.tsx` to import new messages
4. Add translations to `blog.ts` for each post

always run pnpm build at the end of each run

each page should have a cannonical url a metadata tag and everything related to seo
