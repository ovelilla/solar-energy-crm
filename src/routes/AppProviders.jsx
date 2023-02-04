import { Outlet } from "react-router-dom";
import { HeaderProvider } from "@context/HeaderProvider";
import { UIProvider } from "@context/UIProvider";

const AppProviders = () => {
    return (
        <HeaderProvider>
            <UIProvider>
                <Outlet />
            </UIProvider>
        </HeaderProvider>
    );
};

export default AppProviders;
