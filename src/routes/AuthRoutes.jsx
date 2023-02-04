import PublicRoute from "@routes/PublicRoute";
import PrivateRoute from "@routes/PrivateRoute";
import AuthLayout from "@features/auth/layout";
import Login from "@pages/auth/Login";
import Logout from "@pages/auth/Logout";

const AuthRoutes = [
    {
        element: <PublicRoute />,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    {
                        path: "/login",
                        element: <Login />,
                    },
                ],
            },
        ],
    },
    {
        element: <PrivateRoute />,
        children: [
            {
                path: "/logout",
                element: <Logout />,
            },
        ],
    },
];

export default AuthRoutes;
