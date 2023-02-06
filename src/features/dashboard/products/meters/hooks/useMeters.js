import { useContext } from "react";
import MetersContext from "@features/dashboard/products/meters/context/MetersProvider";

const useMeters = () => {
    return useContext(MetersContext);
};

export default useMeters;
