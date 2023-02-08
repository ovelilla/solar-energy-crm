import { useContext } from "react";
import PeripheralsContext from "@features/dashboard/products/peripherals/context/PeripheralsProvider";

const usePeripherals = () => {
    return useContext(PeripheralsContext);
};

export default usePeripherals;
