import { useContext } from "react";
import HeaderContext from "@context/HeaderProvider";

const useHeader = () => {
    return useContext(HeaderContext);
};

export default useHeader;
