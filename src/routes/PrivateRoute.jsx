import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@features/auth/hooks";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const isAuth = localStorage.getItem("auth") === "true";

        setAuth(isAuth);
    }, []);

    return !auth ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
