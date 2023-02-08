import { useContext } from "react";
import StructuresContext from "@features/dashboard/products/structures/context/StructuresProvider";

const useStructures = () => {
    return useContext(StructuresContext);
};

export default useStructures;
