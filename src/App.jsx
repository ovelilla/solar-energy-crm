import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { PublicRoute, PrivateRoute } from "@routes";

import { ThemeProvider } from "@context/ThemeProvider";
import { HeaderProvider } from "@context/HeaderProvider";
import { UIProvider } from "@context/UIProvider";
import { AuthProvider } from "@features/auth/context/AuthProvider";

import { AuthLayout } from "@features/auth/layout";
import { DashboardLayout } from "@features/dashboard/layout";
import { ProposalProvider } from "@features/dashboard/proposal/context/ProposalProvider";
import { PredefinedProvider } from "@features/dashboard/parameters/predefined/context/PredefinedProvider";
import { OrientationProvider } from "@features/dashboard/parameters/orientation/context/OrientationProvider";
import { HabitProvider } from "@features/dashboard/parameters/habit/context/HabitProvider";

import Account from "@pages/Account";
import Calendar from "@pages/Calendar";
import Customers from "@pages/Customers";
import Dashboard from "@pages/Dashboard";
import Habit from "@pages/Habit";
import Help from "@pages/Help";
import Inquiries from "@pages/Inquiries";
import Login from "@pages/Login";
import Logout from "@pages/Logout";
import Management from "@pages/Management";
import Orientation from "@pages/Orientation";
import Predefined from "@pages/Predefined";
import Settings from "@pages/Settings";
import Users from "@pages/Users";

function App() {
    return (
        <ThemeProvider>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <HeaderProvider>
                        <UIProvider>
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
                                        <Route
                                            path="/consultas"
                                            element={
                                                <ProposalProvider>
                                                    <Inquiries />
                                                </ProposalProvider>
                                            }
                                        />
                                        <Route
                                            path="/predefinidos"
                                            element={
                                                <PredefinedProvider>
                                                    <Predefined />
                                                </PredefinedProvider>
                                            }
                                        />
                                        <Route
                                            path="/orientacion"
                                            element={
                                                <OrientationProvider>
                                                    <Orientation />
                                                </OrientationProvider>
                                            }
                                        />
                                        <Route
                                            path="/habitos-consumo"
                                            element={
                                                <HabitProvider>
                                                    <Habit />
                                                </HabitProvider>
                                            }
                                        />
                                        <Route path="/cuenta" element={<Account />} />
                                        <Route path="/calendario" element={<Calendar />} />
                                        <Route path="/clientes" element={<Customers />} />
                                        <Route path="/ayuda" element={<Help />} />
                                        <Route path="/administracion" element={<Management />} />
                                        <Route path="/ajustes" element={<Settings />} />
                                        <Route path="/usuarios" element={<Users />} />
                                    </Route>

                                    <Route path="/logout" element={<Logout />} />
                                </Route>
                            </Routes>
                        </UIProvider>
                    </HeaderProvider>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
