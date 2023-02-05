import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import useInverters from "@features/dashboard/products/inverters/hooks/useInverters";

import Table from "@features/dashboard/products/inverters/table";
import Menu from "@features/dashboard/products/inverters/menu";
import Create from "@features/dashboard/products/inverters/create";
import Update from "@features/dashboard/products/inverters/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Inverters = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readInverters } = useInverters();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readInverters();

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

export default Inverters;
