import { useEffect } from "react";
import { SwipeableDrawer } from "@mui/material";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import useWindowSize from "@hooks/useWindowSize";
import Sidenav from "@features/dashboard/calendar/sidenav";
import { breakpoints } from "@styles/sizes";
import { StyledSidebar } from "./styles";

const Sidebar = () => {
    const {
        calendarRef,
        stateDrawer,
        setStateDrawer,
        stateSwipeableDrawer,
        setStateSwipeableDrawer,
    } = useCalendar();
    const { width } = useWindowSize();

    useEffect(() => {
        if (width < breakpoints.xl) {
            setStateDrawer({ ...stateDrawer, open: true });
            setStateSwipeableDrawer({ ...stateSwipeableDrawer, open: false });
        } else {
            setStateDrawer({ ...stateDrawer, open: true });
            setStateSwipeableDrawer({ ...stateSwipeableDrawer, open: false });
        }
    }, [width]);

    const handleTransitionEnd = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.updateSize();
    };

    if (width < breakpoints.xl) {
        return (
            <SwipeableDrawer
                anchor="left"
                open={stateSwipeableDrawer.open}
                onClose={() => {
                    setStateSwipeableDrawer({ ...stateSwipeableDrawer, open: false });
                }}
                onOpen={() => {
                    setStateSwipeableDrawer({ ...stateSwipeableDrawer, open: true });
                }}
                BackdropProps={{
                    sx: {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                    },
                }}
                PaperProps={{
                    sx: {
                        width: "280px",
                        boxShadow:
                            "0px 3px 5px -1px rgba(0,0,0,.1),0px 5px 8px 0px rgba(0,0,0,.06),0px 1px 14px 0px rgba(0,0,0,.06)",
                    },
                }}
                sx={{
                    zIndex: 200,
                    flexShrink: 0,
                }}
            >
                <Sidenav />
            </SwipeableDrawer>
        );
    }

    return (
        <StyledSidebar open={stateDrawer.open} onTransitionEnd={handleTransitionEnd}>
            <Sidenav />
        </StyledSidebar>
    );
};

export default Sidebar;
