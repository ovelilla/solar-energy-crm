import { useContext } from "react";
import UIContext from "@context/UIProvider";

const useUI = () => {
    return useContext(UIContext);
};

export default useUI;
