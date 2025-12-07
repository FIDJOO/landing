import { FiBarChart2, FiBriefcase, FiDollarSign, FiLock, FiPieChart, FiShield, FiTarget, FiTrendingUp, FiUser } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Meaningful Screen Time",
        description: "Turn passive screen time into a creative experience. With Fidjoo, children build their own animated storybooks step by step.",
        bullets: [
            {
                title: "Build-Your-Own Stories",
                description: "Kids shape their story through simple choices — hero, world, challenge, ending.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Creativity First",
                description: "Fidjoo encourages imagination, decision-making, and storytelling skills.",
                icon: <FiTarget size={26} />
            },
            {
                title: "See Their Ideas Come Alive",
                description: "Every choice transforms the story, helping children understand cause and effect.",
                icon: <FiTrendingUp size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.webp"
    },
    {
        title: "A Shared Family Moment",
        description: "Fidjoo creates a safe and fun space where parents and kids imagine, build, and enjoy stories together.",
        bullets: [
            {
                title: "Co-Creation",
                description: "Designed to strengthen the bond between children and parents through shared play.",
                icon: <FiDollarSign size={26} />
            },
            {
                title: "Helpful Story Prompts",
                description: "Simple suggestions guide children when they don't know how to begin.",
                icon: <FiBriefcase size={26} />
            },
            {
                title: "Listen & Share",
                description: "Children can listen to their completed story or share it with their family.",
                icon: <FiPieChart size={26} />
            }
        ],
        imageSrc: "/images/mockup-2.webp"
    },
    {
        title: "Safe & Kid-Friendly",
        description: "Fidjoo replaces endless scrolling with safe, purposeful, and positive screen time — no ads, no distractions.",
        bullets: [
            {
                title: "Protected Space",
                description: "All creations stay private and under parental supervision.",
                icon: <FiLock size={26} />
            },
            {
                title: "Parent Controls",
                description: "Easily manage profiles, permissions, and visibility settings.",
                icon: <FiUser size={26} />
            },
            {
                title: "Designed for Kids",
                description: "Every story stays positive, age-appropriate, and aligned with healthy digital habits.",
                icon: <FiShield size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.webp"
    },
]
