import { ProposalProvider } from "@features/dashboard/proposal/context/ProposalProvider";

import Inquiries from "@pages/proposal/Inquiries ";

const ProposalRoutes = [
    {
        element: <ProposalProvider />,
        children: [
            {
                path: "/consultas",
                element: <Inquiries />,
            },
        ],
    },
];

export default ProposalRoutes;
