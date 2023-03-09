import { useEffect } from "react";

import useHeader from "@hooks/useHeader";
import useContacts from "@features/dashboard/directory/contacts/hooks/useContacts";

import Table from "@features/dashboard/directory/contacts/table";
import Menu from "@features/dashboard/directory/contacts/menu";
import Create from "@features/dashboard/directory/contacts/create";
import Update from "@features/dashboard/directory/contacts/update";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";

const Contacts = () => {
    const { setHandleCreate } = useHeader();
    const { handleOpenCreate, readContacts } = useContacts();

    useEffect(() => {
        setHandleCreate(() => handleOpenCreate);
        readContacts();

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

export default Contacts;
