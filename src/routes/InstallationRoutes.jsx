import { ProtectionsProvider } from "@features/dashboard/installation/protections/context/ProtectionsProvider";
import { LinesProvider } from "@features/dashboard/installation/lines/context/LinesProvider";

import Protections from "@pages/installation/Protections";
import Lines from "@pages/installation/Lines";

const InstallationRoutes = [
    {
        element: <ProtectionsProvider />,
        children: [
            {
                path: "/protecciones",
                element: <Protections />,
            },
        ],
    },
    {
        element: <LinesProvider />,
        children: [
            {
                path: "/partidas",
                element: <Lines />,
            },
        ],
    },
];

export default InstallationRoutes;
