import { createContext, useState } from "react";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
    const [create, setCreate] = useState(false);
    const [search, setSearch] = useState("");

    const onCreate = () => {
        console.log("create");
    };

    return (
        <HeaderContext.Provider value={{ create, setCreate, onCreate, search, setSearch }}>
            {children}
        </HeaderContext.Provider>
    );
};

export default HeaderContext;
