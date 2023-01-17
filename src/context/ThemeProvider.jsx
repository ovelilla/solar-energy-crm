import { createContext, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import LightTheme from "@themes/LightTheme";
import DarkTheme from "@themes/DarkTheme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(LightTheme);

    const toggleTheme = () => {
        setTheme(theme.palette.mode === "light" ? DarkTheme : LightTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
