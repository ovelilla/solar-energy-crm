import { ContactsProvider } from "@features/dashboard/directory/contacts/context/ContactsProvider";
// import { OrientationsProvider } from "@features/dashboard/parameters/orientations/context/OrientationsProvider";

import Contacts from "@pages/directory/Contacts";
import Users from "@pages/directory/Users";

const DirectoryRoutes = [
    {
        element: <ContactsProvider />,
        children: [
            {
                path: "/contactos",
                element: <Contacts />,
            },
        ],
    },
    // {
    //     element: <OrientationsProvider />,
    //     children: [
    {
        path: "/usuarios",
        element: <Users />,
    },
    //     ],
    // },
];

export default DirectoryRoutes;
