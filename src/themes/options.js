import { slate, gray } from "@styles/colors";

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
                    flexShrink: 0,
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
                },
                shrink: {
                    transform: "translate(20px, -9px) scale(0.75)",
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    display: "flex",
                    alignItems: "center",
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    gap: "8px",
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    flexShrink: 0,
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
                selectedRowCount: {
                    margin: "0",
                    fontSize: "16px",
                },
                footerContainer: {
                    minHeight: "64px",
                    borderColor: slate[200],
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                selectLabel: {
                    fontSize: "16px",
                },
                displayedRows: {
                    fontSize: "16px",
                },
                select: {
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                },
                actions: {
                    button: {
                        width: "48px",
                        height: "48px",
                    },
                    svg: {
                        width: "32px",
                        height: "32px",
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
                    padding: "0",
                    fontSize: "16px",
                    fontFamily: "inherit",
                    color: gray[600],
                    "&:hover": {
                        color: gray[700],
                    },
                    svg: {
                        width: "24px",
                        height: "24px",
                    },
                },
                sizeSmall: {
                    width: "32px",
                    height: "32px",
                },
                sizeMedium: {
                    width: "40px",
                    height: "40px",
                },
                sizeLarge: {
                    width: "48px",
                    height: "48px",
                },
            },
        },
        MuiCalendarOrClockPicker: {
            styleOverrides: {
                root: {
                    "& > div": {
                        width: "340px",
                        maxHeight: "430px",
                    },
                },
            },
        },
        MuiCalendarPicker: {
            styleOverrides: {
                root: {
                    width: "340px",
                    maxHeight: "430px",
                },
                viewTransitionContainer: {
                    overflow: "hidden",
                },
            },
        },
        MuiPickersCalendarHeader: {
            styleOverrides: {
                root: {
                    maxHeight: "40px",
                    minHeight: "40px",
                    paddingLeft: "24px",
                    paddingRight: "8px",
                },
                labelContainer: {
                    maxHeight: "40px",
                },
                switchViewButton: {
                    width: "40px",
                    height: "40px",
                },
            },
        },
        MuiPickersArrowSwitcher: {
            styleOverrides: {
                button: {
                    width: "40px",
                    height: "40px",
                },
            },
        },
        MuiDayPicker: {
            styleOverrides: {
                slideTransition: {
                    minHeight: "280px",
                },
                weekContainer: {
                    margin: "0",
                },
                weekDayLabel: {
                    width: "40px",
                    height: "40px",
                    margin: "2px",
                    fontSize: "14px",
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    width: "40px",
                    height: "40px",
                    margin: "2px",
                    fontSize: "14px",
                    fontWeight: "300",
                },
            },
        },
        PrivatePickersYear: {
            styleOverrides: {
                button: {
                    height: "48px",
                    width: "72px",
                    margin: "4px 2px",
                    borderRadius: "48px",
                },
            },
        },
        MuiClockPicker: {
            styleOverrides: {
                root: {
                    position: "relative",
                },
            },
        },
        MuiClock: {
            styleOverrides: {
                root: {
                    margin: "24px",
                    marginTop: "48px",
                },
            },
        },
        MuiDateTimePickerTabs: {
            styleOverrides: {
                root: {
                    order: 0,
                    minHeight: "56px",
                    ".MuiTabs-indicator": {
                        bottom: "0",
                        top: "auto",
                    },
                    ".MuiTabs-flexContainer": {
                        minHeight: "56px",
                    },
                },
            },
        },
    },
};
