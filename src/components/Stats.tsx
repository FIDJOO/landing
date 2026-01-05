'use client';

import { useTranslations } from 'next-intl';
import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";

const Stats: React.FC = () => {
    const t = useTranslations('stats');

    const statsData = [
        {
            key: 'stories',
            icon: <BsBarChartFill size={34} className="text-blue-500" />,
        },
        {
            key: 'rating',
            icon: <BsFillStarFill size={34} className="text-yellow-500" />,
        },
        {
            key: 'countries',
            icon: <PiGlobeFill size={34} className="text-green-600" />,
        },
    ];

    return (
        <section id="stats" className="py-10 lg:py-20">
            <div className="grid sm:grid-cols-3 gap-8">
                {statsData.map(stat => (
                    <div key={stat.key} className="text-center sm:text-left max-w-md sm:max-w-full mx-auto">
                        <p className="mb-5 flex items-center gap-2 text-3xl font-semibold justify-center sm:justify-start">
                            {stat.icon}
                            {t(`${stat.key}.title`)}
                        </p>
                        <p className="text-foreground-accent">{t(`${stat.key}.description`)}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Stats