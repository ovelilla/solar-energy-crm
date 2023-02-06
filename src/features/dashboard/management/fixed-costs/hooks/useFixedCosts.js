import { useContext } from "react";
import FixedCostsContext from "@features/dashboard/management/fixed-costs/context/FixedCostsProvider";

const useFixedCosts = () => {
    return useContext(FixedCostsContext);
};

export default useFixedCosts;
