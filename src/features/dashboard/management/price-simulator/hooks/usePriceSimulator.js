import { useContext } from "react";
import PriceSimulatorContext from "@features/dashboard/management/price-simulator/context/PriceSimulatorProvider";

const usePriceSimulator = () => {
    return useContext(PriceSimulatorContext);
};

export default usePriceSimulator;
