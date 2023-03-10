import AppProviders from "@routes/AppProviders";
import DashboardLayout from "@features/dashboard/layout";
import PrivateRoute from "@routes/PrivateRoute";

import { CalendarProvider } from "@features/dashboard/calendar/context/CalendarProvider";

import ProposalRoutes from "@routes/ProposalRoutes";
import ParametersRoutes from "@routes/ParametersRoutes";
import ProductsRoutes from "@routes/ProductsRoutes";
import InstallationRoutes from "@routes/InstallationRoutes";
import ManagementRoutes from "@routes/ManagementRoutes";
import DirectoryRoutes from "@routes/DirectoryRoutes";

import Account from "@pages/Account";
import Calendar from "@pages/Calendar";
import Dashboard from "@pages/Dashboard";
import Error404 from "@pages/Error404";
import Help from "@pages/Help";
import Management from "@pages/Management";
import Settings from "@pages/Settings";

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
                                path: "/*",
                                element: <Error404 />,
                            },
                            {
                                path: "/cuenta",
                                element: <Account />,
                            },

                            {
                                element: <CalendarProvider />,
                                children: [
                                    {
                                        path: "/calendario",
                                        element: <Calendar />,
                                    },
                                ],
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
                            ...ProposalRoutes,
                            ...ProductsRoutes,
                            ...ParametersRoutes,
                            ...InstallationRoutes,
                            ...ManagementRoutes,
                            ...DirectoryRoutes,
                        ],
                    },
                ],
            },
        ],
    },
];

export default DashboardRoutes;
