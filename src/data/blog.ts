import { IBlogPost } from "@/types";

export const blogPosts: IBlogPost[] = [
    {
        slug: "meaningful-screen-time-for-kids",
        title: "Meaningful Screen Time: How Fidjoo Transforms Passive Viewing into Creative Play",
        excerpt: "Discover how interactive storytelling can turn screen time into a powerful tool for imagination and learning.",
        coverImage: "/images/baseline/black/black.png",
        content: `
Screen time is often viewed as a necessary evil by parents. But what if we could transform those digital moments into opportunities for creativity and growth?

## The Problem with Passive Consumption

Most children's apps and videos require little more than passive watching. Kids sit, stare, and absorb content created by others. While there's nothing inherently wrong with this, research shows that interactive, creative activities offer far more developmental benefits.

## Enter Interactive Storytelling

Fidjoo takes a different approach. Instead of watching pre-made stories, children become the authors of their own adventures. They choose:

- **The hero** - Who will lead the story?
- **The world** - Where will the adventure take place?
- **The challenge** - What obstacle must be overcome?
- **The ending** - How will the story conclude?

## The Benefits

When children create their own stories, they develop:

1. **Imagination** - Envisioning different scenarios and outcomes
2. **Decision-making skills** - Weighing options and making choices
3. **Narrative understanding** - Learning story structure naturally
4. **Emotional intelligence** - Exploring different feelings through characters

## Quality Over Quantity

It's not about eliminating screen time entirely. It's about making those digital moments count. A 15-minute session creating a story can be more valuable than an hour of passive viewing.

Transform your family's screen time today with Fidjoo.
        `,
        author: "Fidjoo Team",
        date: "2024-12-05",
        readTime: "4 min read",
        tags: ["parenting", "screen time", "creativity"]
    },
    {
        slug: "family-storytelling-traditions",
        title: "Building Family Bonds Through Collaborative Storytelling",
        excerpt: "Learn how co-creating stories with your children can strengthen family connections and create lasting memories.",
        coverImage: "/images/mascotte/black/black.png",
        content: `
Some of our fondest childhood memories involve stories. Whether it was a bedtime tale, a silly improvised adventure, or a family legend passed down through generations, stories connect us.

## The Power of Creating Together

When parents and children create stories together, something magical happens. The usual dynamic shifts - instead of one person leading, both collaborate as equals in an imaginative space.

## Why Collaborative Storytelling Works

### Shared Experience
Creating a story together means sharing an experience that belongs uniquely to your family. "Remember when we made that story about the dragon who loved pizza?" becomes a cherished inside joke.

### Equal Footing
In storytelling, a child's idea is just as valid as an adult's. This equality builds confidence and shows children that their imagination matters.

### Screen Time Becomes Family Time
With Fidjoo, the tablet or phone becomes a tool for connection rather than isolation. Parents and children lean in together, debating whether the hero should take the forest path or climb the mountain.

## Tips for Family Story Sessions

1. **Let your child lead** - Resist the urge to direct. Follow their ideas, even if they seem silly.
2. **Ask questions** - "What happens next?" or "How does the hero feel?" encourages deeper engagement.
3. **Celebrate the weird** - The best family stories often involve absurd twists that make everyone laugh.
4. **Make it routine** - A weekly story night can become a tradition children look forward to.

## Creating Memories That Last

The stories you create together become part of your family's unique culture. Years from now, your children will remember not just the stories themselves, but the warmth of creating them with you.
        `,
        author: "Fidjoo Team",
        date: "2024-11-28",
        readTime: "5 min read",
        tags: ["family", "storytelling", "bonding"]
    },
    {
        slug: "imagination-development-in-children",
        title: "Why Imagination Matters: The Cognitive Benefits of Creative Play",
        excerpt: "Explore the science behind imaginative play and why it's crucial for your child's development.",
        coverImage: "/images/logo/black/black.png",
        content: `
In our rush to prepare children for the future, we sometimes forget that imagination is one of the most valuable skills we can nurture. Here's why creative play matters more than ever.

## The Science of Imagination

Research in developmental psychology shows that imaginative play activates multiple areas of the brain simultaneously. When a child imagines a scenario, they're practicing:

- **Abstract thinking** - Representing one thing as another
- **Problem-solving** - Navigating imaginary challenges
- **Emotional regulation** - Processing feelings through play
- **Social understanding** - Taking different perspectives

## Imagination and Future Success

The World Economic Forum lists creativity as one of the top skills needed for the future workforce. In a world where AI can handle routine tasks, human creativity becomes our most valuable asset.

## How Fidjoo Supports Imaginative Development

### Choice and Agency
Every story in Fidjoo begins with choices. Children decide who their hero is, where the adventure takes place, and how challenges are resolved. This agency reinforces that their ideas matter.

### Safe Exploration
Stories provide a safe space to explore big feelings and scary scenarios. A child can face a dragon in a story without any real danger, building courage and resilience.

### Infinite Possibilities
With countless combinations of characters, settings, and plot points, children never run out of new stories to create. This variety keeps imagination flexible and active.

## Nurturing Your Child's Imagination

Beyond apps, here are ways to support creative development:

1. **Provide unstructured time** - Boredom sparks creativity
2. **Offer open-ended toys** - Blocks, art supplies, costumes
3. **Ask "what if" questions** - Wonder aloud together
4. **Value the process** - Focus on creating, not just the result

## The Gift of Imagination

When we nurture imagination, we give children tools that will serve them for life. The ability to envision possibilities, to think creatively, to see the world differently - these are gifts that no future technology can replace.
        `,
        author: "Fidjoo Team",
        date: "2024-11-15",
        readTime: "6 min read",
        tags: ["development", "imagination", "education"]
    }
];

export const getBlogPost = (slug: string): IBlogPost | undefined => {
    return blogPosts.find(post => post.slug === slug);
};
