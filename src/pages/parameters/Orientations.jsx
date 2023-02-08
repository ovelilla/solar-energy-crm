import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import useOrientations from "@features/dashboard/parameters/orientations/hooks/useOrientations";

import Table from "@features/dashboard/parameters/orientations/table";
import Menu from "@features/dashboard/parameters/orientations/menu";
import Create from "@features/dashboard/parameters/orientations/create";
import Update from "@features/dashboard/parameters/orientations/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Orientations = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readOrientations } = useOrientations();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readOrientations();

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

export default Orientations;
