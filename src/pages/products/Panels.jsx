import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import usePanels from "@features/dashboard/products/panels/hooks/usePanels";

import Table from "@features/dashboard/products/panels/table";
import Menu from "@features/dashboard/products/panels/menu";
import Create from "@features/dashboard/products/panels/create";
import Update from "@features/dashboard/products/panels/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Panels = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readPanels } = usePanels();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readPanels();

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

export default Panels;
