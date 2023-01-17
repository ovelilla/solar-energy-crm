import { createTheme } from "@mui/material/styles";
import { darkText, lightText } from "@styles/colors";
import { options } from "./options";

const LightTheme = createTheme({
    ...options,
    palette: {
        mode: "light",
        divider: "#e2e8f0",
        text: lightText,
        common: {
            black: "rgb(17, 24, 39)",
            white: "rgb(255, 255, 255)",
        },
        primary: {
            light: "#64748b",
            main: "#324475",
            dark: "#28365e",
            contrastText: darkText.primary,
        },
        secondary: {
            light: "#818cf8",
            main: "#4f46e5",
            dark: "#3730a3",
            contrastText: darkText.primary,
        },
        background: {
            paper: "#ffffff",
            default: "#f1f5f9",
        },
        error: {
            light: "#ffcdd2",
            main: "#dc2626",
            dark: "#b71c1c",
        },
    },
    status: {
        danger: "orange",
    },
});

export default LightTheme;
