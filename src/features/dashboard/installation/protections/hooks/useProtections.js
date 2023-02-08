import { useContext } from "react";
import ProtectionsContext from "@features/dashboard/installation/protections/context/ProtectionsProvider";

const useProtections = () => {
    return useContext(ProtectionsContext);
};

export default useProtections;
