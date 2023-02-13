import { ProposalProvider } from "@features/dashboard/proposal/context/ProposalProvider";

import Inquiries from "@pages/proposal/Inquiries";
import Inquirie from "@pages/proposal/Inquirie";

const ProposalRoutes = [
    {
        element: <ProposalProvider />,
        children: [
            {
                path: "/consultas",
                element: <Inquiries />,
            },
            {
                path: "/consultas/:id",
                element: <Inquirie />,
            },
        ],
    },
];

export default ProposalRoutes;
