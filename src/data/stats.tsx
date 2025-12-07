import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";

import { IStats } from "@/types";

export const stats: IStats[] = [
    {
        title: "500K+",
        icon: <BsBarChartFill size={34} className="text-blue-500" />,
        description: "Stories created and enjoyed by families turning screen time into creativity."
    },
    {
        title: "5.0",
        icon: <BsFillStarFill size={34} className="text-yellow-500" />,
        description: "Average rating from parents who value meaningful and positive screen time."
    },
    {
        title: "30+",
        icon: <PiGlobeFill size={34} className="text-green-600" />,
        description: "Countries where families use Fidjoo to build stories and share magical moments."
    }
];
