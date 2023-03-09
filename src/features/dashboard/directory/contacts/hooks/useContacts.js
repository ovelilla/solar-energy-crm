import { useContext } from "react";
import ContactsContext from "@features/dashboard/directory/contacts/context/ContactsProvider";

const useContacts = () => {
    return useContext(ContactsContext);
};

export default useContacts;
