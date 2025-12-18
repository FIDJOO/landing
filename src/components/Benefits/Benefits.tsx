'use client';

import { useTranslations } from 'next-intl';
import { FiBook, FiEdit3, FiEye, FiHeart, FiHelpCircle, FiLock, FiShare2, FiShield, FiUser } from "react-icons/fi";
import BenefitSection from "./BenefitSection"
import { IBenefit } from "@/types";

const Benefits: React.FC = () => {
    const t = useTranslations('benefits');

    const benefits: IBenefit[] = [
        {
            title: t('section1.title'),
            description: t('section1.description'),
            bullets: [
                {
                    title: t('section1.bullet1.title'),
                    description: t('section1.bullet1.description'),
                    icon: <FiBook size={26} />
                },
                {
                    title: t('section1.bullet2.title'),
                    description: t('section1.bullet2.description'),
                    icon: <FiEdit3 size={26} />
                },
                {
                    title: t('section1.bullet3.title'),
                    description: t('section1.bullet3.description'),
                    icon: <FiEye size={26} />
                }
            ],
            imageSrc: "/images/mockups/mckp_1.png"
        },
        {
            title: t('section2.title'),
            description: t('section2.description'),
            bullets: [
                {
                    title: t('section2.bullet1.title'),
                    description: t('section2.bullet1.description'),
                    icon: <FiHeart size={26} />
                },
                {
                    title: t('section2.bullet2.title'),
                    description: t('section2.bullet2.description'),
                    icon: <FiHelpCircle size={26} />
                },
                {
                    title: t('section2.bullet3.title'),
                    description: t('section2.bullet3.description'),
                    icon: <FiShare2 size={26} />
                }
            ],
            imageSrc: "/images/mockups/mckp_2.png"
        },
        {
            title: t('section3.title'),
            description: t('section3.description'),
            bullets: [
                {
                    title: t('section3.bullet1.title'),
                    description: t('section3.bullet1.description'),
                    icon: <FiLock size={26} />
                },
                {
                    title: t('section3.bullet2.title'),
                    description: t('section3.bullet2.description'),
                    icon: <FiUser size={26} />
                },
                {
                    title: t('section3.bullet3.title'),
                    description: t('section3.bullet3.description'),
                    icon: <FiShield size={26} />
                }
            ],
            imageSrc: "/images/mockups/mckp_3.png"
        },
    ];

    return (
        <div id="features">
            <h2 className="sr-only">Features</h2>
            {benefits.map((item, index) => {
                return <BenefitSection key={index} benefit={item} imageAtRight={index % 2 !== 0} isLast={index === benefits.length - 1} />
            })}
        </div>
    )
}

export default Benefits