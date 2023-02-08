import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import usePeripherals from "@features/dashboard/products/peripherals/hooks/usePeripherals";

import Table from "@features/dashboard/products/peripherals/table";
import Menu from "@features/dashboard/products/peripherals/menu";
import Create from "@features/dashboard/products/peripherals/create";
import Update from "@features/dashboard/products/peripherals/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Peripherals = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readPeripherals } = usePeripherals();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readPeripherals();

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

export default Peripherals;
