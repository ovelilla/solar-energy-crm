import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "@features/auth/hooks/useAuth";
import axios from "@config/axios";
import styled from "@emotion/styled";

const Loading = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
`;

const PrivateRoute = () => {
    const [loading, setLoading] = useState(true);
    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const getAuth = async () => {
            try {
                const { data } = await axios.get("/user/auth", {
                    withCredentials: true,
                });
                setAuth(data);
            } catch (error) {
                setAuth(null);
            } finally {
                setLoading(false);
            }
        };

        getAuth();
    }, [navigate]);

    if (loading) {
        return <Loading />;
    }

    if (!auth) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
