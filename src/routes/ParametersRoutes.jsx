import { HabitProvider } from "@features/dashboard/parameters/habit/context/HabitProvider";
import { PredefinedProvider } from "@features/dashboard/parameters/predefined/context/PredefinedProvider";
import { OrientationsProvider } from "@features/dashboard/parameters/orientations/context/OrientationsProvider";

import Habit from "@pages/parameters/Habit";
import Orientations from "@pages/parameters/Orientations";
import Predefined from "@pages/parameters/Predefined";

const ParametersRoutes = [
    {
        element: <PredefinedProvider />,
        children: [
            {
                path: "/predefinidos",
                element: <Predefined />,
            },
        ],
    },
    {
        element: <OrientationsProvider />,
        children: [
            {
                path: "/orientaciones",
                element: <Orientations />,
            },
        ],
    },
    {
        element: <HabitProvider />,
        children: [
            {
                path: "/habitos-consumo",
                element: <Habit />,
            },
        ],
    },
];

export default ParametersRoutes;
