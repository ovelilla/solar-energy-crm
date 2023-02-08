import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import useProtections from "@features/dashboard/installation/protections/hooks/useProtections";

import Table from "@features/dashboard/installation/protections/table";
import Menu from "@features/dashboard/installation/protections/menu";
import Create from "@features/dashboard/installation/protections/create";
import Update from "@features/dashboard/installation/protections/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Protections = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readProtections } = useProtections();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readProtections();

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

export default Protections;
