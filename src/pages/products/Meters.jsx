import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import useMeters from "@features/dashboard/products/meters/hooks/useMeters";

import Table from "@features/dashboard/products/meters/table";
import Menu from "@features/dashboard/products/meters/menu";
import Create from "@features/dashboard/products/meters/create";
import Update from "@features/dashboard/products/meters/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Meters = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readMeters } = useMeters();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readMeters();

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

export default Meters;
