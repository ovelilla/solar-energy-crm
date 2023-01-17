import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@context/ThemeProvider";
import { PublicRoute, PrivateRoute } from "@routes";

import { AuthProvider } from "@features/auth/context/AuthProvider";

import { AuthLayout } from "@features/auth/layout";
import { DashboardLayout } from "@features/dashboard/layout";

import { Account, Calendar, Customers, Dashboard, Help, Login, Management, Settings, Users } from "@pages";

function App() {
    return (
        <ThemeProvider>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route element={<PublicRoute />}>
                            <Route element={<AuthLayout />}>
                                <Route path="/login" element={<Login />} />
                            </Route>
                        </Route>

                        <Route element={<PrivateRoute />}>
                            <Route element={<DashboardLayout />}>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/cuenta" element={<Account />} />
                                <Route path="/calendario" element={<Calendar />} />
                                <Route path="/clientes" element={<Customers />} />
                                <Route path="/ayuda" element={<Help />} />
                                <Route path="/administracion" element={<Management />} />
                                <Route path="/ajustes" element={<Settings />} />
                                <Route path="/usuarios" element={<Users />} />
                            </Route>
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;