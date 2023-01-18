import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { breakpoints } from "@styles/sizes";
import Sidenav from "@features/dashboard/layout/sidenav";

const Sidebar = ({
    width,
    openHamburguer,
    setOpenHamburguer,
    openDrawer,
    openSwipeableDrawer,
    setOpenSwipeableDrawer,
}) => {
    const handleClose = () => {
        setOpenHamburguer(false);
        setOpenSwipeableDrawer(false);
    };

    const handleOpen = () => {
        setOpenHamburguer(true);
        setOpenSwipeableDrawer(true);
    };

    return (
        <>
            {width < breakpoints.xl ? (
                <SwipeableDrawer
                    anchor="left"
                    open={openSwipeableDrawer}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    sx={{
                        zIndex: 100,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
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
                >
                    <Sidenav />
                </SwipeableDrawer>
            ) : (
                <Drawer
                    anchor="left"
                    variant="persistent"
                    open={openDrawer}
                    sx={{
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: "320px",
                            backgroundColor: "#0f172a",
                            borderRight: "none",
                            boxShadow:
                                "rgb(0 0 0 / 20%) 0px 8px 10px -5px, rgb(0 0 0 / 14%) 0px 16px 24px 2px, rgb(0 0 0 / 12%) 0px 6px 30px 5px",
                        },
                    }}
                >
                    <Sidenav />
                </Drawer>
            )}
        </>
    );
};

export default Sidebar;
