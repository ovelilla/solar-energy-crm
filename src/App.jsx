import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@context/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@features/auth/context/AuthProvider";

import AuthRoutes from "@routes/AuthRoutes";
import DashboardRoutes from "@routes/DashboardRoutes";

function App() {
    return (
        <ThemeProvider>
            <CssBaseline />
            <RouterProvider router={router} />
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
