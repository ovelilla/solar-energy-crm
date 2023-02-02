import { useContext } from "react";
import PredefinedContext from "@features/dashboard/parameters/predefined/context/PredefinedProvider";

const usePredefined = () => {
    return useContext(PredefinedContext);
};

export default usePredefined;
