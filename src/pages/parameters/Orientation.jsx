import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import useOrientation from "@features/dashboard/parameters/orientation/hooks/useOrientation";

import Table from "@features/dashboard/parameters/orientation/table";
import Menu from "@features/dashboard/parameters/orientation/menu";
import Create from "@features/dashboard/parameters/orientation/create";
import Update from "@features/dashboard/parameters/orientation/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Orientation = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readOrientations } = useOrientation();

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

export default Orientation;
