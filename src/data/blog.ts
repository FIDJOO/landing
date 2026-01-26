import { Locale } from "@/i18n/config";

export interface IBlogPost {
    slug: string;
    coverImage?: string;
    author: string;
    date: string;
    tags?: string[];
}

export interface ILocalizedBlogPost extends IBlogPost {
    title: string;
    excerpt: string;
    content: string;
    readTime: string;
    ogTitle?: string; // Short title for OG (50-60 chars)
    ogDescription?: string; // Short description for OG (110-160 chars)
}

export interface IBlogPostTranslations {
    en: {
        title: string;
        excerpt: string;
        content: string;
        readTime: string;
        ogTitle?: string;
        ogDescription?: string;
    };
    fr: {
        title: string;
        excerpt: string;
        content: string;
        readTime: string;
        ogTitle?: string;
        ogDescription?: string;
    };
}

export interface IBlogPostWithTranslations extends IBlogPost {
    translations: IBlogPostTranslations;
}

export const blogPosts: IBlogPostWithTranslations[] = [
    {
        slug: "kids-quiet-moments-storytelling",
        coverImage: "/images/blog/kids-quiet-moments-storytelling.jpeg",
        author: "Fidjoo Team",
        date: "2026-01-26",
        tags: ["calm", "storytelling", "parenting", "mindfulness", "screen time"],
        translations: {
            en: {
                title: "Why Kids Need Quiet Moments — And How Storytelling Creates Them",
                excerpt: "Children today are surrounded by noise. For kids aged 5 to 8, learning to enjoy quiet moments is becoming harder, yet more important than ever. Storytelling offers a simple way to reintroduce calm.",
                readTime: "4 min read",
                ogTitle: "Kids Need Quiet: Storytelling Creates Calm",
                ogDescription: "Discover how storytelling creates restorative quiet moments for children ages 5-8, helping them process, relax, and enjoy calm.",
                content: `
Children today are surrounded by noise.

Sounds, notifications, fast images, constant stimulation — even at home.

For kids aged **5 to 8**, learning to enjoy **quiet moments** is becoming harder, yet more important than ever.

Storytelling offers a simple way to reintroduce calm, silence, and mental space into a child's day.

---

## Silence Isn't Empty — It's Restorative

Quiet moments allow children to:

- Process what they've experienced
- Let their thoughts slow down
- Reconnect with their inner world

Without pauses, children stay in a constant state of alert.

Stories gently create those pauses — without forcing silence.

---

## Why Stories Encourage Calm Without Pressure

Unlike games or videos, stories don't demand quick reactions.

They invite children to:

- Listen
- Imagine
- Stay present

The rhythm of a story naturally slows the body and the mind, creating a peaceful mental space.

---

## A Familiar Voice Makes Quiet Feel Safe

Silence can feel uncomfortable for some children — unless it's guided.

With Fidjoo, parents can **record their own voice** and become the **narrator** of their child's stories.

A familiar voice helps children:

- Relax into calm moments
- Feel secure during quiet time
- Associate silence with comfort

The voice acts as a gentle anchor in stillness.

---

## Quiet Screen Time Can Exist

Not all screen time has to be stimulating.

Story-based experiences that focus on listening rather than reacting allow screens to support:

- Calm attention
- Mental rest
- Emotional regulation

The goal isn't more content — it's **less noise**.

---

## Teaching Children to Be at Ease With Calm

Learning to enjoy quiet moments is a lifelong skill.

Through storytelling — especially when guided by a parent's voice — children discover that calm isn't boring or uncomfortable.

It's a place where imagination breathes.

And sometimes, that's exactly what they need.
                `
            },
            fr: {
                title: "Pourquoi les enfants ont besoin de moments calmes — Et comment les histoires les créent",
                excerpt: "Les enfants d'aujourd'hui sont entourés de bruit. Pour les enfants de 5 à 8 ans, apprendre à apprécier les moments de calme devient plus difficile, mais plus important que jamais.",
                readTime: "4 min de lecture",
                ogTitle: "Moments de Calme : Les Histoires Apaisent",
                ogDescription: "Comment les histoires créent des moments de calme réparateurs pour les enfants de 5-8 ans, les aidant à se détendre.",
                content: `
Les enfants d'aujourd'hui sont entourés de bruit.

Sons, notifications, images rapides, stimulation constante — même à la maison.

Pour les enfants de **5 à 8 ans**, apprendre à apprécier les **moments de calme** devient plus difficile, mais plus important que jamais.

Les histoires offrent un moyen simple de réintroduire le calme, le silence et l'espace mental dans la journée d'un enfant.

---

## Le silence n'est pas vide — Il est réparateur

Les moments de calme permettent aux enfants de :

- Traiter ce qu'ils ont vécu
- Laisser leurs pensées ralentir
- Se reconnecter avec leur monde intérieur

Sans pauses, les enfants restent dans un état d'alerte constant.

Les histoires créent doucement ces pauses — sans forcer le silence.

---

## Pourquoi les histoires encouragent le calme sans pression

Contrairement aux jeux ou aux vidéos, les histoires n'exigent pas de réactions rapides.

Elles invitent les enfants à :

- Écouter
- Imaginer
- Rester présents

Le rythme d'une histoire ralentit naturellement le corps et l'esprit, créant un espace mental paisible.

---

## Une voix familière rend le calme rassurant

Le silence peut sembler inconfortable pour certains enfants — sauf s'il est guidé.

Avec Fidjoo, les parents peuvent **enregistrer leur propre voix** et devenir le **narrateur** des histoires de leur enfant.

Une voix familière aide les enfants à :

- Se détendre dans les moments de calme
- Se sentir en sécurité pendant le temps calme
- Associer le silence au confort

La voix agit comme une ancre douce dans l'immobilité.

---

## Le temps d'écran calme peut exister

Tout le temps d'écran ne doit pas être stimulant.

Les expériences basées sur les histoires qui se concentrent sur l'écoute plutôt que sur la réaction permettent aux écrans de soutenir :

- L'attention calme
- Le repos mental
- La régulation émotionnelle

L'objectif n'est pas plus de contenu — c'est **moins de bruit**.

---

## Apprendre aux enfants à être à l'aise avec le calme

Apprendre à apprécier les moments de calme est une compétence pour la vie.

À travers les histoires — surtout quand elles sont guidées par la voix d'un parent — les enfants découvrent que le calme n'est ni ennuyeux ni inconfortable.

C'est un endroit où l'imagination respire.

Et parfois, c'est exactement ce dont ils ont besoin.
                `
            }
        }
    },
    {
        slug: "kids-daily-transitions-storytelling",
        coverImage: "/images/blog/kids-daily-transitions-storytelling.jpeg",
        author: "Fidjoo Team",
        date: "2026-01-19",
        tags: ["transitions", "storytelling", "parenting", "emotional regulation", "routines"],
        translations: {
            en: {
                title: "Helping Kids Handle Daily Transitions Through Storytelling",
                excerpt: "For many families, the hardest moments aren't the big ones — they're the transitions. Learn how storytelling helps children aged 5-8 move smoothly between activities.",
                readTime: "4 min read",
                ogTitle: "Help Kids Handle Transitions via Stories",
                ogDescription: "Storytelling helps children aged 5-8 handle daily transitions like leaving school or bedtime with less resistance.",
                content: `
For many families, the hardest moments of the day aren't the big ones — they're the transitions.

Leaving school, stopping a game, getting ready for dinner or bedtime…

For children aged **5 to 8**, these shifts can feel overwhelming.

Storytelling offers a simple and gentle way to help children move from one moment to another.

---

## Why Transitions Are Hard for Young Children

Children don't switch contexts as easily as adults.

Their emotions often lag behind the schedule.

That's why transitions can trigger:

- Frustration
- Resistance
- Emotional overload

They don't need more rules — they need **help crossing the moment**.

---

## Stories Create a Safe "In-Between" Space

Stories act as a bridge.

They help children:

- Slow down mentally
- Let go of what came before
- Prepare emotionally for what comes next

A short story can transform a tense moment into a calm transition.

---

## Using a Parent's Voice to Guide Transitions

Transitions feel safer when guided by someone familiar.

With Fidjoo, parents can **record their own voice** and become the **narrator** of their child's stories.

Hearing a parent's voice during these moments:

- Reassures children
- Reduces resistance
- Creates emotional continuity

The voice becomes a steady guide through change.

---

## A Thoughtful Use of Screen Time

During transitions, children don't need stimulation — they need grounding.

Story-based experiences encourage:

- Listening
- Emotional regulation
- Calm attention

Used intentionally, screens can support smoother transitions instead of creating friction.

---

## Turning Difficult Moments Into Gentle Rituals

Transitions happen every day.

They don't have to be battles.

With storytelling — and a familiar voice — children learn that change can be calm, predictable, and safe.

Sometimes, a short story is all it takes to move forward.
                `
            },
            fr: {
                title: "Aider les enfants à gérer les transitions quotidiennes grâce aux histoires",
                excerpt: "Pour de nombreuses familles, les moments les plus difficiles ne sont pas les grands événements — ce sont les transitions. Découvrez comment les histoires aident les enfants de 5 à 8 ans.",
                readTime: "4 min de lecture",
                ogTitle: "Aider les Enfants à Gérer les Transitions",
                ogDescription: "Les histoires aident les enfants de 5-8 ans à gérer les transitions quotidiennes avec moins de résistance.",
                content: `
Pour de nombreuses familles, les moments les plus difficiles de la journée ne sont pas les grands événements — ce sont les transitions.

Quitter l'école, arrêter un jeu, se préparer pour le dîner ou le coucher…

Pour les enfants de **5 à 8 ans**, ces changements peuvent sembler accablants.

Les histoires offrent un moyen simple et doux d'aider les enfants à passer d'un moment à l'autre.

---

## Pourquoi les transitions sont difficiles pour les jeunes enfants

Les enfants ne changent pas de contexte aussi facilement que les adultes.

Leurs émotions sont souvent en décalage avec l'emploi du temps.

C'est pourquoi les transitions peuvent déclencher :

- De la frustration
- De la résistance
- Une surcharge émotionnelle

Ils n'ont pas besoin de plus de règles — ils ont besoin **d'aide pour traverser le moment**.

---

## Les histoires créent un espace « entre-deux » sécurisant

Les histoires agissent comme un pont.

Elles aident les enfants à :

- Ralentir mentalement
- Lâcher ce qui précédait
- Se préparer émotionnellement à ce qui vient ensuite

Une courte histoire peut transformer un moment tendu en une transition calme.

---

## Utiliser la voix d'un parent pour guider les transitions

Les transitions semblent plus sûres quand elles sont guidées par quelqu'un de familier.

Avec Fidjoo, les parents peuvent **enregistrer leur propre voix** et devenir le **narrateur** des histoires de leur enfant.

Entendre la voix d'un parent pendant ces moments :

- Rassure les enfants
- Réduit la résistance
- Crée une continuité émotionnelle

La voix devient un guide stable à travers le changement.

---

## Une utilisation réfléchie du temps d'écran

Pendant les transitions, les enfants n'ont pas besoin de stimulation — ils ont besoin d'ancrage.

Les expériences basées sur les histoires encouragent :

- L'écoute
- La régulation émotionnelle
- L'attention calme

Utilisés intentionnellement, les écrans peuvent soutenir des transitions plus douces au lieu de créer des frictions.

---

## Transformer les moments difficiles en rituels doux

Les transitions se produisent chaque jour.

Elles ne doivent pas être des batailles.

Avec les histoires — et une voix familière — les enfants apprennent que le changement peut être calme, prévisible et sûr.

Parfois, une courte histoire suffit pour avancer.
                `
            }
        }
    },
    {
        slug: "storytelling-listening-skills-attention",
        coverImage: "/images/blog/storytelling-listening-skills.jpeg",
        author: "Fidjoo Team",
        date: "2026-01-12",
        tags: ["listening", "attention", "storytelling", "parenting", "child development"],
        translations: {
            en: {
                title: "How Storytelling Improves Kids' Listening Skills and Attention Span (Ages 5–8)",
                excerpt: "Discover how storytelling helps children aged 5-8 develop listening skills and longer attention spans through calm, engaging narratives told in a familiar voice.",
                readTime: "4 min read",
                ogTitle: "How Stories Improve Kids' Listening & Attention",
                ogDescription: "Learn how storytelling helps children aged 5-8 develop listening skills and longer attention spans through calm narratives.",
                content: `
In a world filled with constant stimulation, many parents notice the same challenge:

children struggle to stay focused and listen for more than a few minutes.

For kids aged **5 to 8**, storytelling offers a gentle and effective way to strengthen **listening skills** and **attention**, without pressure or discipline.

## Listening Is a Skill Children Can Learn

Listening doesn't come naturally — it develops over time.

When children follow a story, they learn to:

- Pay attention to details
- Remember sequences
- Anticipate what comes next

Stories train the brain to focus in a calm and enjoyable way.

## Why Stories Hold Attention Better Than Instructions

Unlike direct instructions, stories don't demand attention — they invite it.

Children stay engaged because they want to understand:

- Who the characters are
- What problem they face
- How the story ends

This natural curiosity supports longer attention spans without frustration.

## A Familiar Voice Makes Listening Easier

Attention improves when children feel emotionally safe.

With Fidjoo, parents can **record their own voice** and become the **narrator** of their child's stories.

Hearing a familiar voice helps children:

- Stay focused for longer
- Feel calm and receptive
- Associate listening with comfort

The parent's voice turns listening into a reassuring experience.

## A Healthier Use of Screen Time

Fast-paced content encourages short attention bursts.

Story-based experiences encourage sustained focus.

When screens are used for calm storytelling, they support:

- Active listening
- Patience
- Mental presence

It's not about removing screens — it's about using them wisely.

## Small Stories, Big Impact

Improving attention doesn't require long exercises or strict rules.

Sometimes, all it takes is a story — told slowly, clearly, and in a familiar voice.

Over time, these moments help children learn one of life's most important skills: **how to truly listen**.
                `
            },
            fr: {
                title: "Comment les histoires améliorent l'écoute et l'attention des enfants (5-8 ans)",
                excerpt: "Découvrez comment les histoires aident les enfants de 5 à 8 ans à développer leurs capacités d'écoute et leur attention grâce à des récits apaisants racontés d'une voix familière.",
                readTime: "4 min de lecture",
                ogTitle: "Histoires : Écoute et Attention des Enfants",
                ogDescription: "Comment les histoires aident les enfants de 5 à 8 ans à développer l'écoute et l'attention avec des récits apaisants.",
                content: `
Dans un monde rempli de stimulations constantes, de nombreux parents remarquent le même défi :

les enfants ont du mal à rester concentrés et à écouter plus de quelques minutes.

Pour les enfants de **5 à 8 ans**, les histoires offrent un moyen doux et efficace de renforcer **l'écoute** et **l'attention**, sans pression ni discipline.

## L'écoute est une compétence que les enfants peuvent apprendre

L'écoute ne vient pas naturellement — elle se développe avec le temps.

Quand les enfants suivent une histoire, ils apprennent à :

- Prêter attention aux détails
- Mémoriser les séquences
- Anticiper ce qui va suivre

Les histoires entraînent le cerveau à se concentrer de manière calme et agréable.

## Pourquoi les histoires captent mieux l'attention que les instructions

Contrairement aux instructions directes, les histoires n'exigent pas l'attention — elles l'invitent.

Les enfants restent engagés parce qu'ils veulent comprendre :

- Qui sont les personnages
- Quel problème ils affrontent
- Comment l'histoire se termine

Cette curiosité naturelle soutient une attention plus longue sans frustration.

## Une voix familière facilite l'écoute

L'attention s'améliore quand les enfants se sentent en sécurité émotionnelle.

Avec Fidjoo, les parents peuvent **enregistrer leur propre voix** et devenir le **narrateur** des histoires de leur enfant.

Entendre une voix familière aide les enfants à :

- Rester concentrés plus longtemps
- Se sentir calmes et réceptifs
- Associer l'écoute au confort

La voix du parent transforme l'écoute en une expérience rassurante.

## Une utilisation plus saine du temps d'écran

Le contenu au rythme rapide encourage des pics d'attention courts.

Les expériences basées sur les histoires encouragent une concentration soutenue.

Quand les écrans sont utilisés pour des histoires apaisantes, ils soutiennent :

- L'écoute active
- La patience
- La présence mentale

Il ne s'agit pas de supprimer les écrans — mais de les utiliser intelligemment.

## Petites histoires, grand impact

Améliorer l'attention ne nécessite pas de longs exercices ou de règles strictes.

Parfois, il suffit d'une histoire — racontée lentement, clairement et avec une voix familière.

Avec le temps, ces moments aident les enfants à apprendre l'une des compétences les plus importantes de la vie : **vraiment écouter**.
                `
            }
        }
    },
    {
        slug: "kids-emotions-storytelling",
        coverImage: "/images/blog/kids-emotions-storytelling.jpeg",
        author: "Fidjoo Team",
        date: "2026-01-05",
        tags: ["emotions", "storytelling", "parenting", "child development", "emotional intelligence"],
        translations: {
            en: {
                title: "Helping Kids Understand Their Emotions Through Storytelling (Ages 5–8)",
                excerpt: "Discover how storytelling helps children aged 5-8 name their feelings, build emotional intelligence, and feel safe exploring emotions with a familiar voice.",
                readTime: "4 min read",
                ogTitle: "Help Kids Understand Emotions via Stories",
                ogDescription: "How storytelling helps children aged 5-8 name their feelings and build emotional intelligence in a safe environment.",
                content: `
Children experience many emotions every day — joy, frustration, fear, excitement — but they don't always have the words to express them.

For kids aged **5 to 8**, storytelling is one of the most natural ways to explore emotions in a safe, gentle, and meaningful way.

---

## Stories Help Children Name What They Feel

When children listen to or create stories, they often identify with the characters.

Through those characters, they learn to recognize emotions without feeling judged or exposed.

Stories help children:

- Understand complex feelings
- See that emotions are normal
- Learn that every emotion can be expressed

It's easier to say *"the hero felt scared"* than *"I feel scared"* — and that's exactly why stories work.

---

## Why a Familiar Voice Makes Emotional Learning Easier

Emotions feel safer when they're guided by someone a child trusts.

With Fidjoo, parents can **record their own voice** and become the **narrative voice** of their child's stories.

Hearing a parent's voice while a story unfolds helps children:

- Feel reassured while exploring emotions
- Stay calm and attentive
- Build emotional security

The voice becomes a comforting guide through the story.

---

## A Gentle Alternative to Passive Screen Time

Not all screen time supports emotional development.

Fast, overstimulating content can overwhelm children.

Story-based experiences, especially those focused on emotions and imagination, encourage:

- Listening instead of reacting
- Reflection instead of distraction
- Emotional awareness instead of overload

Used intentionally, screens can support emotional growth.

---

## Stories That Build Emotional Intelligence

Helping children understand their emotions doesn't require long conversations or complex explanations.

Sometimes, all it takes is a story — told calmly, creatively, and in a familiar voice.

When storytelling becomes personal and emotional, children learn something essential:

**their feelings matter, and they are not alone.**
                `
            },
            fr: {
                title: "Aider les enfants à comprendre leurs émotions grâce aux histoires (5-8 ans)",
                excerpt: "Découvrez comment les histoires aident les enfants de 5 à 8 ans à nommer leurs sentiments, développer leur intelligence émotionnelle et explorer leurs émotions en toute sécurité.",
                readTime: "4 min de lecture",
                ogTitle: "Aider les Enfants à Comprendre leurs Émotions",
                ogDescription: "Comment les histoires aident les enfants de 5 à 8 ans à nommer leurs sentiments et développer leur intelligence émotionnelle.",
                content: `
Les enfants vivent de nombreuses émotions chaque jour — joie, frustration, peur, excitation — mais ils n'ont pas toujours les mots pour les exprimer.

Pour les enfants de **5 à 8 ans**, les histoires sont l'un des moyens les plus naturels d'explorer les émotions de manière sûre, douce et significative.

---

## Les histoires aident les enfants à nommer ce qu'ils ressentent

Quand les enfants écoutent ou créent des histoires, ils s'identifient souvent aux personnages.

À travers ces personnages, ils apprennent à reconnaître les émotions sans se sentir jugés ou exposés.

Les histoires aident les enfants à :

- Comprendre des sentiments complexes
- Voir que les émotions sont normales
- Apprendre que chaque émotion peut être exprimée

Il est plus facile de dire *« le héros avait peur »* que *« j'ai peur »* — et c'est exactement pourquoi les histoires fonctionnent.

---

## Pourquoi une voix familière facilite l'apprentissage émotionnel

Les émotions semblent plus sûres quand elles sont guidées par quelqu'un en qui l'enfant a confiance.

Avec Fidjoo, les parents peuvent **enregistrer leur propre voix** et devenir la **voix narrative** des histoires de leur enfant.

Entendre la voix d'un parent pendant qu'une histoire se déroule aide les enfants à :

- Se sentir rassurés en explorant les émotions
- Rester calmes et attentifs
- Construire une sécurité émotionnelle

La voix devient un guide réconfortant tout au long de l'histoire.

---

## Une alternative douce au temps d'écran passif

Tout le temps d'écran ne soutient pas le développement émotionnel.

Le contenu rapide et sur-stimulant peut submerger les enfants.

Les expériences basées sur des histoires, surtout celles axées sur les émotions et l'imagination, encouragent :

- L'écoute plutôt que la réaction
- La réflexion plutôt que la distraction
- La conscience émotionnelle plutôt que la surcharge

Utilisés intentionnellement, les écrans peuvent soutenir la croissance émotionnelle.

---

## Des histoires qui construisent l'intelligence émotionnelle

Aider les enfants à comprendre leurs émotions ne nécessite pas de longues conversations ou d'explications complexes.

Parfois, il suffit d'une histoire — racontée calmement, créativement et avec une voix familière.

Quand la narration devient personnelle et émotionnelle, les enfants apprennent quelque chose d'essentiel :

**leurs sentiments comptent, et ils ne sont pas seuls.**
                `
            }
        }
    },
    {
        slug: "kids-create-stories-builds-confidence",
        coverImage: "/images/blog/kids-confidence-storytelling.jpeg",
        author: "Fidjoo Team",
        date: "2025-12-29",
        tags: ["confidence", "creativity", "parenting", "storytelling", "child development"],
        translations: {
            en: {
                title: "Why Letting Kids Create Their Own Stories Builds Confidence (Ages 5-8)",
                excerpt: "Discover how inventing stories helps children aged 5-8 develop imagination, emotional expression, and confidence - especially when parents become the narrator.",
                readTime: "4 min read",
                ogTitle: "Kids Creating Stories Builds Confidence",
                ogDescription: "How inventing stories helps children aged 5-8 develop imagination, emotional expression, and confidence.",
                content: `
Children love stories.

But something even more powerful happens when they don't just listen — **they create**.

For children aged **5 to 8**, inventing their own stories helps develop imagination, emotional expression, and confidence, especially when a parent is part of the experience.

## Story Creation Helps Children Express Who They Are

When children create stories, they project their thoughts and emotions onto characters.

It's a natural way for them to explore feelings like courage, fear, or pride — without pressure.

Storytelling becomes a safe space where:

- Ideas are valued
- Creativity is encouraged
- There are no "wrong answers"

This freedom builds self-confidence.

## Why Hearing a Parent's Voice Changes Everything

A story feels even more meaningful when it's told in a **familiar voice**.

With Fidjoo, parents can record their own voice and become the **narrator** of the stories their child creates.

For children, this means:

- Feeling supported while expressing ideas
- Hearing encouragement through a trusted voice
- Building confidence in a safe emotional environment

The parent's voice acts as reassurance throughout the story.

## From Passive Screen Time to Creative Time

Unlike passive content, story creation encourages children to think, choose, and imagine.

When screens are used to support creativity and storytelling, they become a tool for:

- Imagination
- Emotional development
- Positive interaction

The difference isn't the screen — it's the intention behind it.

## Creativity Builds Confidence That Lasts

Letting children create their own stories isn't just play.

It helps them believe their ideas matter.

When those stories are narrated with a parent's voice, creativity becomes connection — and confidence grows naturally.
                `
            },
            fr: {
                title: "Pourquoi laisser les enfants créer leurs propres histoires renforce leur confiance (5-8 ans)",
                excerpt: "Découvrez comment inventer des histoires aide les enfants de 5 à 8 ans à développer leur imagination, leur expression émotionnelle et leur confiance - surtout quand les parents deviennent narrateurs.",
                readTime: "4 min de lecture",
                ogTitle: "Créer des Histoires Renforce la Confiance",
                ogDescription: "Comment inventer des histoires aide les enfants de 5 à 8 ans à développer imagination et confiance en soi.",
                content: `
Les enfants adorent les histoires.

Mais quelque chose d'encore plus puissant se produit quand ils ne font pas que les écouter — **ils les créent**.

Pour les enfants de **5 à 8 ans**, inventer leurs propres histoires aide à développer l'imagination, l'expression émotionnelle et la confiance en soi, surtout quand un parent participe à l'expérience.

## La création d'histoires aide les enfants à s'exprimer

Quand les enfants créent des histoires, ils projettent leurs pensées et émotions sur les personnages.

C'est une façon naturelle pour eux d'explorer des sentiments comme le courage, la peur ou la fierté — sans pression.

La narration devient un espace sûr où :

- Les idées sont valorisées
- La créativité est encouragée
- Il n'y a pas de "mauvaises réponses"

Cette liberté construit la confiance en soi.

## Pourquoi entendre la voix d'un parent change tout

Une histoire est encore plus significative quand elle est racontée avec une **voix familière**.

Avec Fidjoo, les parents peuvent enregistrer leur propre voix et devenir le **narrateur** des histoires que leur enfant crée.

Pour les enfants, cela signifie :

- Se sentir soutenu en exprimant ses idées
- Entendre des encouragements d'une voix de confiance
- Construire sa confiance dans un environnement émotionnel sûr

La voix du parent agit comme une assurance tout au long de l'histoire.

## Du temps d'écran passif au temps créatif

Contrairement au contenu passif, la création d'histoires encourage les enfants à réfléchir, choisir et imaginer.

Quand les écrans sont utilisés pour soutenir la créativité et la narration, ils deviennent un outil pour :

- L'imagination
- Le développement émotionnel
- L'interaction positive

La différence n'est pas l'écran — c'est l'intention derrière.

## La créativité construit une confiance durable

Laisser les enfants créer leurs propres histoires n'est pas qu'un jeu.

Cela les aide à croire que leurs idées comptent.

Quand ces histoires sont narrées avec la voix d'un parent, la créativité devient connexion — et la confiance grandit naturellement.
                `
            }
        }
    },
    {
        slug: "bedtime-stories-for-kids-5-8",
        coverImage: "/images/blog/bedtime-stories.jpeg",
        author: "Fidjoo Team",
        date: "2025-12-22",
        tags: ["bedtime", "parenting", "storytelling", "sleep routine"],
        translations: {
            en: {
                title: "Bedtime Stories for Kids (5-8): A Calm Night Routine That Truly Connects",
                excerpt: "Discover how bedtime stories help children aged 5-8 relax, feel safe, and strengthen the bond with their parents through a simple night routine.",
                readTime: "4 min read",
                ogTitle: "Bedtime Stories: A Calm Routine That Connects",
                ogDescription: "How bedtime stories help children aged 5-8 relax, feel safe, and strengthen the bond with parents.",
                content: `
Bedtime can be a challenging moment for families with young children.

After a long day, kids often struggle to slow down, and parents look for simple ways to create calm before sleep.

One habit remains incredibly effective: **bedtime stories**.

For children aged **5 to 8**, stories at night help them relax, feel safe, and gently transition toward sleep.

## Why Bedtime Stories Matter

Listening to a story before sleep helps children:

- Calm their mind and body
- Feel emotionally secure
- Develop imagination and language
- Strengthen the bond with their parent

Stories give children a safe space to process emotions from the day — in a quiet, reassuring way.

## A Simple Bedtime Routine (10-15 Minutes)

A good bedtime routine doesn't need to be complicated:

1. Dim the lights and reduce stimulation
2. Share one calm moment together
3. Listen to one story
4. End with a familiar goodnight ritual

Consistency is more important than duration.

## When the Parent Becomes the Voice of the Story

What makes bedtime stories even more powerful is **who tells them**.

With Fidjoo's new feature, parents can **record their own voice** and become the **narrator** of their child's stories.

For children, hearing a familiar voice brings:

- Comfort and reassurance
- A stronger sense of connection
- Emotional security at bedtime

Even when parents are tired or unavailable, their voice remains present in the story.

## Screens at Night: It's About How They're Used

Not all screen time is equal.

Fast, noisy content can overstimulate children, but **calm, story-based experiences** can support bedtime when they focus on listening, imagination, and emotional connection.

The key isn't removing screens entirely — it's using them **intentionally**.

## A Meaningful Way to End the Day

Bedtime stories aren't just a routine.

They're a moment of connection, reassurance, and imagination that children carry with them into sleep.

When stories are calm, personal, and told in a familiar voice, bedtime becomes something children look forward to — night after night.
                `
            },
            fr: {
                title: "Histoires du soir pour enfants (5-8 ans) : une routine apaisante qui crée du lien",
                excerpt: "Découvrez comment les histoires du soir aident les enfants de 5 à 8 ans à se détendre, se sentir en sécurité et renforcer le lien avec leurs parents.",
                readTime: "4 min de lecture",
                ogTitle: "Histoires du Soir : Routine Apaisante",
                ogDescription: "Comment les histoires du soir aident les enfants de 5 à 8 ans à se détendre et renforcer le lien familial.",
                content: `
Le coucher peut être un moment difficile pour les familles avec de jeunes enfants.

Après une longue journée, les enfants ont souvent du mal à ralentir, et les parents cherchent des moyens simples de créer le calme avant le sommeil.

Une habitude reste incroyablement efficace : **les histoires du soir**.

Pour les enfants de **5 à 8 ans**, les histoires du soir les aident à se détendre, se sentir en sécurité et faire la transition vers le sommeil.

## Pourquoi les histoires du soir sont importantes

Écouter une histoire avant de dormir aide les enfants à :

- Calmer leur esprit et leur corps
- Se sentir émotionnellement en sécurité
- Développer leur imagination et leur langage
- Renforcer le lien avec leur parent

Les histoires offrent aux enfants un espace sûr pour traiter les émotions de la journée — de manière calme et rassurante.

## Une routine du soir simple (10-15 minutes)

Une bonne routine du coucher n'a pas besoin d'être compliquée :

1. Tamisez les lumières et réduisez les stimulations
2. Partagez un moment calme ensemble
3. Écoutez une histoire
4. Terminez par un rituel de bonne nuit familier

La régularité est plus importante que la durée.

## Quand le parent devient la voix de l'histoire

Ce qui rend les histoires du soir encore plus puissantes, c'est **qui les raconte**.

Avec la nouvelle fonctionnalité de Fidjoo, les parents peuvent **enregistrer leur propre voix** et devenir le **narrateur** des histoires de leur enfant.

Pour les enfants, entendre une voix familière apporte :

- Confort et réassurance
- Un sentiment de connexion plus fort
- Une sécurité émotionnelle au moment du coucher

Même quand les parents sont fatigués ou indisponibles, leur voix reste présente dans l'histoire.

## Les écrans le soir : c'est une question d'utilisation

Tout le temps d'écran n'est pas égal.

Le contenu rapide et bruyant peut sur-stimuler les enfants, mais **les expériences calmes basées sur des histoires** peuvent accompagner le coucher quand elles se concentrent sur l'écoute, l'imagination et la connexion émotionnelle.

La clé n'est pas de supprimer totalement les écrans — c'est de les utiliser **intentionnellement**.

## Une façon significative de terminer la journée

Les histoires du soir ne sont pas qu'une routine.

C'est un moment de connexion, de réassurance et d'imagination que les enfants emportent avec eux dans leur sommeil.

Quand les histoires sont calmes, personnelles et racontées avec une voix familière, le coucher devient quelque chose que les enfants attendent avec impatience — soir après soir.
                `
            }
        }
    },
    {
        slug: "meaningful-screen-time-for-kids",
        coverImage: "/images/baseline/black/black.png",
        author: "Fidjoo Team",
        date: "2025-12-05",
        tags: ["parenting", "screen time", "creativity"],
        translations: {
            en: {
                title: "Meaningful Screen Time: How Fidjoo Transforms Passive Viewing into Creative Play",
                excerpt: "Discover how interactive storytelling can turn screen time into a powerful tool for imagination and learning.",
                readTime: "4 min read",
                ogTitle: "Transform Screen Time into Creative Play",
                ogDescription: "How interactive storytelling turns screen time into a powerful tool for imagination and learning.",
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
                `
            },
            fr: {
                title: "Un temps d'écran utile : comment Fidjoo transforme le visionnage passif en jeu créatif",
                excerpt: "Découvrez comment la narration interactive peut transformer le temps d'écran en un outil puissant pour l'imagination et l'apprentissage.",
                readTime: "4 min de lecture",
                ogTitle: "Écran Utile : Du Passif au Créatif",
                ogDescription: "Comment la narration interactive transforme le temps d'écran en outil puissant pour l'imagination.",
                content: `
Le temps d'écran est souvent perçu comme un mal nécessaire par les parents. Mais et si nous pouvions transformer ces moments numériques en opportunités de créativité et de croissance ?

## Le problème de la consommation passive

La plupart des applications et vidéos pour enfants ne demandent guère plus qu'un visionnage passif. Les enfants s'assoient, regardent et absorbent du contenu créé par d'autres. Bien qu'il n'y ait rien de fondamentalement mal à cela, les recherches montrent que les activités interactives et créatives offrent bien plus d'avantages développementaux.

## Place à la narration interactive

Fidjoo adopte une approche différente. Au lieu de regarder des histoires préfabriquées, les enfants deviennent les auteurs de leurs propres aventures. Ils choisissent :

- **Le héros** - Qui mènera l'histoire ?
- **Le monde** - Où se déroulera l'aventure ?
- **Le défi** - Quel obstacle doit être surmonté ?
- **La fin** - Comment l'histoire se terminera-t-elle ?

## Les avantages

Quand les enfants créent leurs propres histoires, ils développent :

1. **L'imagination** - Envisager différents scénarios et résultats
2. **Les compétences décisionnelles** - Peser les options et faire des choix
3. **La compréhension narrative** - Apprendre naturellement la structure des histoires
4. **L'intelligence émotionnelle** - Explorer différents sentiments à travers les personnages

## La qualité plutôt que la quantité

Il ne s'agit pas d'éliminer complètement le temps d'écran. Il s'agit de faire compter ces moments numériques. Une session de 15 minutes à créer une histoire peut être plus précieuse qu'une heure de visionnage passif.

Transformez le temps d'écran de votre famille dès aujourd'hui avec Fidjoo.
                `
            }
        }
    },
    {
        slug: "family-storytelling-traditions",
        coverImage: "/images/mascotte/black/black.png",
        author: "Fidjoo Team",
        date: "2025-11-28",
        tags: ["family", "storytelling", "bonding"],
        translations: {
            en: {
                title: "Building Family Bonds Through Collaborative Storytelling",
                excerpt: "Learn how co-creating stories with your children can strengthen family connections and create lasting memories.",
                readTime: "5 min read",
                ogTitle: "Build Family Bonds Through Storytelling",
                ogDescription: "How co-creating stories with your children strengthens family connections and creates lasting memories.",
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
                `
            },
            fr: {
                title: "Renforcer les liens familiaux grâce à la création d'histoires collaborative",
                excerpt: "Découvrez comment co-créer des histoires avec vos enfants peut renforcer les liens familiaux et créer des souvenirs durables.",
                readTime: "5 min de lecture",
                ogTitle: "Liens Familiaux : Histoires Collaboratives",
                ogDescription: "Comment co-créer des histoires avec vos enfants renforce les liens familiaux et crée des souvenirs durables.",
                content: `
Certains de nos plus beaux souvenirs d'enfance impliquent des histoires. Qu'il s'agisse d'un conte du soir, d'une aventure improvisée farfelue ou d'une légende familiale transmise de génération en génération, les histoires nous connectent.

## Le pouvoir de créer ensemble

Quand parents et enfants créent des histoires ensemble, quelque chose de magique se produit. La dynamique habituelle change - au lieu qu'une personne dirige, les deux collaborent en égaux dans un espace imaginatif.

## Pourquoi la narration collaborative fonctionne

### Une expérience partagée
Créer une histoire ensemble signifie partager une expérience qui appartient uniquement à votre famille. "Tu te souviens quand on a inventé cette histoire du dragon qui adorait la pizza ?" devient une blague privée précieuse.

### Sur un pied d'égalité
Dans la narration, l'idée d'un enfant est tout aussi valide que celle d'un adulte. Cette égalité construit la confiance et montre aux enfants que leur imagination compte.

### Le temps d'écran devient du temps en famille
Avec Fidjoo, la tablette ou le téléphone devient un outil de connexion plutôt que d'isolement. Parents et enfants se penchent ensemble, débattant si le héros devrait prendre le chemin de la forêt ou escalader la montagne.

## Conseils pour les sessions d'histoires en famille

1. **Laissez votre enfant diriger** - Résistez à l'envie de guider. Suivez ses idées, même si elles semblent farfelues.
2. **Posez des questions** - "Que se passe-t-il ensuite ?" ou "Comment se sent le héros ?" encourage un engagement plus profond.
3. **Célébrez l'étrange** - Les meilleures histoires familiales impliquent souvent des rebondissements absurdes qui font rire tout le monde.
4. **Faites-en une routine** - Une soirée histoires hebdomadaire peut devenir une tradition que les enfants attendent avec impatience.

## Créer des souvenirs durables

Les histoires que vous créez ensemble deviennent partie de la culture unique de votre famille. Dans des années, vos enfants se souviendront non seulement des histoires elles-mêmes, mais de la chaleur de les avoir créées avec vous.
                `
            }
        }
    },
    {
        slug: "imagination-development-in-children",
        coverImage: "/images/logo/black/black.png",
        author: "Fidjoo Team",
        date: "2025-11-15",
        tags: ["development", "imagination", "education"],
        translations: {
            en: {
                title: "Why Imagination Matters: The Cognitive Benefits of Creative Play",
                excerpt: "Explore the science behind imaginative play and why it's crucial for your child's development.",
                readTime: "6 min read",
                ogTitle: "Why Imagination Matters for Kids",
                ogDescription: "Explore the science behind imaginative play and why it's crucial for your child's development.",
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
                `
            },
            fr: {
                title: "Pourquoi l'imagination compte : les bienfaits cognitifs du jeu créatif",
                excerpt: "Explorez la science derrière le jeu imaginatif et pourquoi il est crucial pour le développement de votre enfant.",
                readTime: "6 min de lecture",
                ogTitle: "Pourquoi l'Imagination Compte pour les Enfants",
                ogDescription: "La science derrière le jeu imaginatif et pourquoi il est crucial pour le développement de votre enfant.",
                content: `
Dans notre empressement à préparer les enfants pour l'avenir, nous oublions parfois que l'imagination est l'une des compétences les plus précieuses que nous pouvons cultiver. Voici pourquoi le jeu créatif compte plus que jamais.

## La science de l'imagination

Les recherches en psychologie du développement montrent que le jeu imaginatif active simultanément plusieurs zones du cerveau. Quand un enfant imagine un scénario, il pratique :

- **La pensée abstraite** - Représenter une chose par une autre
- **La résolution de problèmes** - Naviguer des défis imaginaires
- **La régulation émotionnelle** - Traiter les sentiments à travers le jeu
- **La compréhension sociale** - Adopter différentes perspectives

## L'imagination et le succès futur

Le Forum économique mondial classe la créativité parmi les compétences les plus importantes pour la main-d'œuvre du futur. Dans un monde où l'IA peut gérer les tâches routinières, la créativité humaine devient notre atout le plus précieux.

## Comment Fidjoo soutient le développement imaginatif

### Choix et autonomie
Chaque histoire dans Fidjoo commence par des choix. Les enfants décident qui est leur héros, où se déroule l'aventure et comment les défis sont résolus. Cette autonomie renforce l'idée que leurs idées comptent.

### Exploration sécurisée
Les histoires offrent un espace sûr pour explorer de grands sentiments et des scénarios effrayants. Un enfant peut affronter un dragon dans une histoire sans aucun danger réel, construisant ainsi courage et résilience.

### Possibilités infinies
Avec d'innombrables combinaisons de personnages, de décors et d'intrigues, les enfants ne manquent jamais de nouvelles histoires à créer. Cette variété garde l'imagination flexible et active.

## Nourrir l'imagination de votre enfant

Au-delà des applications, voici des moyens de soutenir le développement créatif :

1. **Offrez du temps non structuré** - L'ennui stimule la créativité
2. **Proposez des jouets ouverts** - Blocs, fournitures artistiques, costumes
3. **Posez des questions "et si"** - Émerveillez-vous ensemble à voix haute
4. **Valorisez le processus** - Concentrez-vous sur la création, pas seulement le résultat

## Le don de l'imagination

Quand nous nourrissons l'imagination, nous donnons aux enfants des outils qui les serviront toute leur vie. La capacité d'envisager des possibilités, de penser créativement, de voir le monde différemment - ce sont des dons qu'aucune technologie future ne peut remplacer.
                `
            }
        }
    }
];

export const getBlogPost = (slug: string, locale: Locale): ILocalizedBlogPost | undefined => {
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) return undefined;

    const translation = post.translations[locale];
    return {
        slug: post.slug,
        coverImage: post.coverImage,
        author: post.author,
        date: post.date,
        tags: post.tags,
        title: translation.title,
        excerpt: translation.excerpt,
        content: translation.content,
        readTime: translation.readTime,
        ogTitle: translation.ogTitle,
        ogDescription: translation.ogDescription,
    };
};

export const getBlogPosts = (locale: Locale): ILocalizedBlogPost[] => {
    return blogPosts.map(post => {
        const translation = post.translations[locale];
        return {
            slug: post.slug,
            coverImage: post.coverImage,
            author: post.author,
            date: post.date,
            tags: post.tags,
            title: translation.title,
            excerpt: translation.excerpt,
            content: translation.content,
            readTime: translation.readTime,
        };
    });
};
