import { useNavigate } from "react-router-dom";
import { useState, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);

    const navigate = useNavigate();

    const login = () => {
        setAuth(true);
        localStorage.setItem("auth", auth);
        navigate("/");
    };

    const logout = () => {
        setAuth(false);
        localStorage.removeItem("auth");
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
