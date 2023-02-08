import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import useMicroinverters from "@features/dashboard/products/microinverters/hooks/useMicroinverters";

import Table from "@features/dashboard/products/microinverters/table";
import Menu from "@features/dashboard/products/microinverters/menu";
import Create from "@features/dashboard/products/microinverters/create";
import Update from "@features/dashboard/products/microinverters/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Microinverters = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readMicroinverters } = useMicroinverters();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readMicroinverters();

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

export default Microinverters;
