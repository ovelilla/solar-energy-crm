import { useContext } from "react";
import PanelsContext from "@features/dashboard/products/panels/context/PanelsProvider";

const usePanels = () => {
    return useContext(PanelsContext);
};

export default usePanels;
