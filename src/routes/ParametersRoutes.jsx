import { HabitProvider } from "@features/dashboard/parameters/habit/context/HabitProvider";
import { PredefinedProvider } from "@features/dashboard/parameters/predefined/context/PredefinedProvider";
import { OrientationProvider } from "@features/dashboard/parameters/orientation/context/OrientationProvider";

import Habit from "@pages/parameters/Habit";
import Orientation from "@pages/parameters/Orientation";
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
        element: <OrientationProvider />,
        children: [
            {
                path: "/orientacion",
                element: <Orientation />,
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
