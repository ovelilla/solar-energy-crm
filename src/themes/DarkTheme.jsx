import { createTheme } from "@mui/material/styles";
import { darkText } from "@styles/colors";
import { options } from "./options";


const DarkTheme = createTheme({
    ...options,
    palette: {
        mode: "dark",
        divider: "rgba(241,245,249,.12)",
        text: darkText,
        common: {
            black: "rgb(17, 24, 39)",
            white: "rgb(255, 255, 255)",
        },
        primary: {
            light: "#64748b",
            main: "#334155",
            dark: "#0f172a",
            contrastText: darkText.primary,
        },
        secondary: {
            light: "#818cf8",
            main: "#4f46e5",
            dark: "#3730a3",
            contrastText: darkText.primary,
        },
        background: {
            paper: "#1e293b",
            default: "#111827",
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

export default DarkTheme;
