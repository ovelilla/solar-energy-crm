import { useContext } from "react";
import OrientationContext from "@features/dashboard/parameters/orientation/context/OrientationProvider";

const useOrientation = () => {
    return useContext(OrientationContext);
};

export default useOrientation;
