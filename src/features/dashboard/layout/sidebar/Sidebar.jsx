import useHeader from "@hooks/useHeader";
import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Sidenav from "@features/dashboard/layout/sidenav";
import { breakpoints } from "@styles/sizes";

const Sidebar = () => {
    const {
        width,
        openDrawer,
        openSwipeableDrawer,
        handleOpenSwipeableDrawer,
        handleCloseSwipeableDrawer,
        handleResize,
    } = useHeader();

    if (width < breakpoints.xl) {
        return (
            <SwipeableDrawer
                anchor="left"
                open={openSwipeableDrawer}
                onClose={handleCloseSwipeableDrawer}
                onOpen={handleOpenSwipeableDrawer}
                PaperProps={{
                    sx: {
                        width: {
                            xs: "280px",
                            lg: "320px",
                        },
                        backgroundColor: "#0f172a",
                        borderRight: "none",
                        boxShadow:
                            "rgb(0 0 0 / 20%) 0px 8px 10px -5px, rgb(0 0 0 / 14%) 0px 16px 24px 2px, rgb(0 0 0 / 12%) 0px 6px 30px 5px",
                    },
                }}
                sx={{
                    zIndex: 100,
                    flexShrink: 0,
                }}
            >
                <Sidenav />
            </SwipeableDrawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            variant="persistent"
            open={openDrawer}
            sx={{
                flexShrink: 0,
            }}
            PaperProps={{
                sx: {
                    width: "320px",
                    backgroundColor: "#0f172a",
                    borderRight: "none",
                    boxShadow:
                        "rgb(0 0 0 / 20%) 0px 8px 10px -5px, rgb(0 0 0 / 14%) 0px 16px 24px 2px, rgb(0 0 0 / 12%) 0px 6px 30px 5px",
                },
            }}
            SlideProps={{
                onEntered: () => {
                    if (handleResize) {
                        handleResize();
                    }
                },

                onExited: () => {
                    if (handleResize) {
                        handleResize();
                    }
                },
            }}
        >
            <Sidenav />
        </Drawer>
    );
};

export default Sidebar;
