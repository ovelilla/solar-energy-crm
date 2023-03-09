import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@context/ThemeProvider";
import { LocalizationProvider, esES } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@features/auth/context/AuthProvider";

import AuthRoutes from "@routes/AuthRoutes";
import DashboardRoutes from "@routes/DashboardRoutes";

function App() {
    return (
        <ThemeProvider>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={"es"}
                localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <CssBaseline />
                <RouterProvider router={router} />
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;

const router = createBrowserRouter([
    {
        element: <AuthProvider />,
        children: [...AuthRoutes, ...DashboardRoutes],
    },
]);
