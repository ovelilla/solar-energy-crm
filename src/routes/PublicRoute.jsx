import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@features/auth/hooks/useAuth";
import axios from "@config/axios";
import styled from "@emotion/styled";

const Loading = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
`;

const PublicRoute = () => {
    const [loading, setLoading] = useState(true);
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const getAuth = async () => {
            try {
                const { data } = await axios.get("/user/auth", {
                    withCredentials: true,
                });
                console.log(data);
                setAuth(data);
            } catch (error) {
                console.log(error);
                setAuth(null);
            } finally {
                setLoading(false);
            }
        };

        getAuth();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (auth) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PublicRoute;
