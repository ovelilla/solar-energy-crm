import { useContext } from "react";
import OrientationsContext from "@features/dashboard/parameters/orientations/context/OrientationsProvider";

const useOrientations = () => {
    return useContext(OrientationsContext);
};

export default useOrientations;
