# Fidjoo Landing Page

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer)
![pnpm](https://img.shields.io/badge/pnpm-10.20-F69220?style=for-the-badge&logo=pnpm)
![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)

<p align="center">
  <img src="public/images/mascotte/blue/blue.png" alt="Fidjoo Mascot" width="120">
</p>

<p align="center">
  <strong>Storytelling App for Kids | Create Animated Stories</strong>
</p>

<p align="center">
  <a href="https://apps.apple.com/fr/app/fidjoo/id6753658765">
    <img src="https://img.shields.io/badge/App_Store-Download-0D96F6?style=for-the-badge&logo=app-store&logoColor=white" alt="Download on App Store">
  </a>
  <a href="https://play.google.com/store/apps/details?id=com.fidjoo.app">
    <img src="https://img.shields.io/badge/Google_Play-Download-414141?style=for-the-badge&logo=google-play&logoColor=white" alt="Get it on Google Play">
  </a>
</p>

---

## About Fidjoo

Fidjoo is a creative app where children (ages 5-12) turn simple choices into their own animated storybooks. It transforms passive screen time into meaningful, imaginative play.

- **Meaningful screen time** — Children build stories through choices (hero, world, challenge, ending)
- **Family co-creation** — Designed for parents and kids to create together
- **Safe & kid-friendly** — No ads, no distractions, all content stays private and age-appropriate
- **Offline support** — Created stories can be enjoyed offline

## Tech Stack

| Technology | Purpose |
|------------|---------|
| ![Next.js](https://img.shields.io/badge/-Next.js_14-000?style=for-the-badge&logo=next.js) | React framework with App Router |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) | Type safety |
| ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | Utility-first styling |
| ![Framer](https://img.shields.io/badge/-Framer_Motion-FF0055?style=for-the-badge&logo=framer&logoColor=white) | Animations |
| ![next-intl](https://img.shields.io/badge/-next--intl-000?style=for-the-badge&logo=next.js) | Internationalization |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/FIDJOO/landing.git
cd landing

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Production build
pnpm build

# Start production server
pnpm start
```

### Linting

```bash
pnpm lint
```

## Project Structure

```bash
src/
├── app/           # Next.js pages and API routes
├── components/    # React components (Hero, Benefits, Pricing, FAQ, etc.)
├── data/          # Static content data files
└── types.ts       # TypeScript interfaces

public/
└── images/        # Brand assets (logo, mascot) in multiple color variants
```

## Content Management

Landing page sections are data-driven. To modify content, edit the corresponding file in `src/data/`:

| File | Content |
|------|---------|
| `siteDetails.ts` | Site metadata, URLs, analytics |
| `hero.ts` | Hero section |
| `benefits.tsx` | Feature benefits |
| `pricing.ts` | Subscription plans |
| `faq.ts` | FAQ entries |
| `menuItems.ts` | Navigation |
| `footer.ts` | Footer content |

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | ![#49AAFF](https://img.shields.io/badge/-%2349AAFF-49AAFF?style=for-the-badge) | Main brand blue |
| `--secondary` | ![#8DD1FF](https://img.shields.io/badge/-%238DD1FF-8DD1FF?style=for-the-badge) | Secondary blue |
| `--tertiary` | ![#FFB71C](https://img.shields.io/badge/-%23FFB71C-FFB71C?style=for-the-badge) | Yellow accent |

### Typography

Uses **Baloo 2** font — a playful, kid-friendly typeface from Google Fonts.

---

<p align="center">
  Made with ❤️ for kids and families
</p>
