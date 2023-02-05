import { useContext } from "react";
import InvertersContext from "@features/dashboard/products/inverters/context/InvertersProvider";

const useInverters = () => {
    return useContext(InvertersContext);
};

export default useInverters;
