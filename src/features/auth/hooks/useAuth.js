import { useContext } from "react";
import AuthContext from "@features/auth/context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
