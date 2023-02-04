import { useState, createContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useForm } from "@hooks";
import axios from "@config/axios";

const AuthContext = createContext();

export const AuthProvider = () => {
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(null);

    const { values, errors, handleChange, setFormErrors, reset } = useForm({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const { data } = await axios.post("/user/login", values, {
                withCredentials: true,
            });

            reset();
            setAuth(data);
            navigate("/");
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        const { data } = await axios.post("/user/logout", null, {
            withCredentials: true,
        });
        setAuth(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                loading,
                setLoading,
                auth,
                setAuth,
                values,
                errors,
                handleChange,
                handleLogin,
                handleLogout,
            }}
        >
            <Outlet />
        </AuthContext.Provider>
    );
};

export default AuthContext;
