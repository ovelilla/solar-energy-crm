import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import useStructures from "@features/dashboard/products/structures/hooks/useStructures";

import Table from "@features/dashboard/products/structures/table";
import Menu from "@features/dashboard/products/structures/menu";
import Create from "@features/dashboard/products/structures/create";
import Update from "@features/dashboard/products/structures/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Structures = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readStructures } = useStructures();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readStructures();

        return () => {
            setHandleCreate(null);
        };
    }, []);

    return (
        <>
            <Table />
            <Menu />
            <Create />
            <Confirm />
            <Update />
            <Alert />
        </>
    );
};

export default Structures;
