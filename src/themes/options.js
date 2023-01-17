export const options = {
    typography: {
        fontFamily: "Poppins, sans-serif",
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 1024,
            xl: 1200,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: "inherit",
                    textTransform: "none",
                    borderRadius: "48px",
                    height: "48px",
                    fontWeight: "500",
                    boxShadow: "none",
                    "&:hover, &:focus": {
                        boxShadow: "none",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                },
                input: {
                    padding: "16.5px 20px",
                },
                notchedOutline: {
                    padding: "0 12px",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    transform: "translate(20px, 16px) scale(1)",
                    "&.Mui-focused": {
                        transform: "translate(20px, -9px) scale(0.75)",
                    },
                    "&.MuiInputLabel-shrink": {
                        transform: "translate(20px, -9px) scale(0.75)",
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    width: "48px",
                    height: "48px",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
    },
};
