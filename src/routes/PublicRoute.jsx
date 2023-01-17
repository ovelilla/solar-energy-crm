import { Navigate } from "react-router-dom";
import { useAuth } from "@features/auth/hooks";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
    const { auth } = useAuth();

    return auth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
