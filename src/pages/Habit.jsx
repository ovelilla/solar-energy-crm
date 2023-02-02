import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import useHabit from "@features/dashboard/parameters/habit/hooks/useHabit";

import Table from "@features/dashboard/parameters/habit/table";
import Menu from "@features/dashboard/parameters/habit/menu";
import Create from "@features/dashboard/parameters/habit/create";
import Update from "@features/dashboard/parameters/habit/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Habit = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readHabits } = useHabit();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readHabits();

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

export default Habit;
