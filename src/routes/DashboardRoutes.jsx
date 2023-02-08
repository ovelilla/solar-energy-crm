import AppProviders from "@routes/AppProviders";
import DashboardLayout from "@features/dashboard/layout";
import PrivateRoute from "@routes/PrivateRoute";

import ProposalRoutes from "@routes/ProposalRoutes";
import ParametersRoutes from "@routes/ParametersRoutes";
import ProductsRoutes from "@routes/ProductsRoutes";
import InstallationRoutes from "@routes/InstallationRoutes";
import ManagementRoutes from "@routes/ManagementRoutes";

import Account from "@pages/Account";
import Calendar from "@pages/Calendar";
import Customers from "@pages/Customers";
import Dashboard from "@pages/Dashboard";
import Help from "@pages/Help";
import Management from "@pages/Management";
import Settings from "@pages/Settings";
import Users from "@pages/Users";

const DashboardRoutes = [
    {
        element: <AppProviders />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        element: <PrivateRoute />,
                        children: [
                            {
                                path: "/",
                                element: <Dashboard />,
                            },
                            {
                                path: "/cuenta",
                                element: <Account />,
                            },
                            {
                                path: "/calendario",
                                element: <Calendar />,
                            },
                            {
                                path: "/clientes",
                                element: <Customers />,
                            },
                            {
                                path: "/ayuda",
                                element: <Help />,
                            },
                            {
                                path: "/administracion",
                                element: <Management />,
                            },
                            {
                                path: "/ajustes",
                                element: <Settings />,
                            },
                            {
                                path: "/usuarios",
                                element: <Users />,
                            },
                            ...ProposalRoutes,
                            ...ProductsRoutes,
                            ...ParametersRoutes,
                            ...InstallationRoutes,
                            ...ManagementRoutes,
                        ],
                    },
                ],
            },
        ],
    },
];

export default DashboardRoutes;
