import { slate } from "@styles/colors";

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
                    padding: "0 24px",
                    fontWeight: "500",
                    boxShadow: "none",
                    "&:hover, &:focus": {
                        boxShadow: "none",
                    },
                },
                outlined: {
                    borderWidth: "2px",
                    "&:hover, &:focus": {
                        borderWidth: "2px",
                        backgroundColor: "transparent",
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
        MuiPopover: {
            styleOverrides: {
                paper: {
                    borderRadius: "8px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    height: "48px",
                    padding: "0 20px",

                    "&:hover": {
                        backgroundColor: slate[50],
                    },
                    "&.Mui-selected": {
                        backgroundColor: slate[100],
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: slate[200],
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "white",
                    padding: "8px 16px",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    borderRadius: "8px",
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                columnHeaders: {
                    borderColor: slate[200],
                    minHeight: "64px",
                },
                columnHeaderCheckbox: {
                    ".MuiSvgIcon-root": {
                        width: "24px",
                        height: "24px",
                    },
                },
                columnHeader: {
                    fontSize: "16px",
                    "&:focus": {
                        outline: "none",
                    },
                    "&:focus-within": {
                        outline: "none",
                    },
                },
                columnHeaderTitle: {
                    fontWeight: "500",
                },
                iconButtonContainer: {
                    button: {
                        width: "40px",
                        height: "40px",
                    },
                },
                iconSeparator: {
                    color: slate[300],
                },
                cell: {
                    borderColor: slate[200],
                    "&:focus": {
                        outline: "none",
                    },
                    "&:focus-within": {
                        outline: "none",
                    },
                },
                cellContent: {
                    fontSize: "16px",
                    fontWeight: "400",
                    color: slate[900],
                },
                row: {
                    "&:hover": {
                        backgroundColor: slate[50],
                    },
                    "&.Mui-selected": {
                        backgroundColor: slate[100],
                        "&:hover": {
                            backgroundColor: slate[200],
                        },
                    },
                },
                footerContainer: {
                    minHeight: "64px",
                    borderColor: slate[200],

                    ".MuiTablePagination-selectLabel": {
                        fontSize: "16px",
                    },

                    ".MuiDataGrid-selectedRowCount": {
                        margin: "0",
                        fontSize: "16px",
                    },

                    ".MuiTablePagination-displayedRows": {
                        fontSize: "16px",
                    },

                    ".MuiTablePagination-select": {
                        fontSize: "16px",
                    },

                    ".MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                    },

                    ".MuiSelect-icon": {
                        top: "4px",
                    },

                    ".MuiTablePagination-actions": {
                        svg: {
                            width: "32px",
                            height: "32px",
                        },
                    },

                    button: {
                        width: "48px",
                        height: "48px",
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    width: "24px",
                    height: "24px",
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    minHeight: "64px",
                },
                flexContainer: {
                    minHeight: "64px",
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: "16px",
                    textTransform: "none",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    svg: {
                        width: "24px",
                        height: "24px",
                    },
                },
            },
        },
    },
};
