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
