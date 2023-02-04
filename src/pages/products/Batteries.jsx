import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import useBatteries from "@features/dashboard/products/batteries/hooks/useBatteries";

import Table from "@features/dashboard/products/batteries/table";
import Menu from "@features/dashboard/products/batteries/menu";
import Create from "@features/dashboard/products/batteries/create";
import Update from "@features/dashboard/products/batteries/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Batteries = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readBatteries } = useBatteries();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readBatteries();

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

export default Batteries;
