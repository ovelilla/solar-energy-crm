import { useContext } from "react";
import MicroinvertersContext from "@features/dashboard/products/microinverters/context/MicroinvertersProvider";

const useMicroinverters = () => {
    return useContext(MicroinvertersContext);
};

export default useMicroinverters;
