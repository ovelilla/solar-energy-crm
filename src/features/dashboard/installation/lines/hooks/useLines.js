import { useContext } from "react";
import LinesContext from "@features/dashboard/installation/lines/context/LinesProvider";

const useLines = () => {
    return useContext(LinesContext);
};

export default useLines;
