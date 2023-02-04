import { useContext } from "react";
import BatteriesContext from "@features/dashboard/products/batteries/context/BatteriesProvider";

const useBatteries = () => {
    return useContext(BatteriesContext);
};

export default useBatteries;
