import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import useLines from "@features/dashboard/installation/lines/hooks/useLines";

import Table from "@features/dashboard/installation/lines/table";
import Menu from "@features/dashboard/installation/lines/menu";
import Create from "@features/dashboard/installation/lines/create";
import Update from "@features/dashboard/installation/lines/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Lines = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readLines } = useLines();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readLines();

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

export default Lines;
