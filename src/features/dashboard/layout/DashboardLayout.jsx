import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import useWindowSize from "@hooks/useWindowSize";
import { breakpoints } from "@styles/sizes";

import Sidebar from "@features/dashboard/layout/sidebar";
import Header from "@features/dashboard/layout/header";

import { Row, LeftColumn, RightColumn, Main } from "./styles";

const DashboardLayout = () => {
    const [openHamburguer, setOpenHamburguer] = useState(true);
    const [openDrawer, setOpenDrawer] = useState(true);
    const [openSwipeableDrawe, setOpenSwipeableDrawer] = useState(false);

    const { width } = useWindowSize();

    useEffect(() => {
        if (width < breakpoints.xl) {
            setOpenHamburguer(false);
            setOpenDrawer(true);
            setOpenSwipeableDrawer(false);
        } else {
            setOpenHamburguer(true);
            setOpenDrawer(true);
            setOpenSwipeableDrawer(false);
        }
    }, [width]);

    return (
        <Row>
            <LeftColumn open={openDrawer}>
                <Sidebar
                    width={width}
                    openHamburguer={openHamburguer}
                    setOpenHamburguer={setOpenHamburguer}
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    openSwipeableDrawer={openSwipeableDrawe}
                    setOpenSwipeableDrawer={setOpenSwipeableDrawer}
                />
            </LeftColumn>
            <RightColumn>
                <Header
                    width={width}
                    openHamburguer={openHamburguer}
                    setOpenHamburguer={setOpenHamburguer}
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    openSwipeableDrawer={openSwipeableDrawe}
                    setOpenSwipeableDrawer={setOpenSwipeableDrawer}
                />
                <Main>
                    <Outlet />
                </Main>
            </RightColumn>
        </Row>
    );
};

export default DashboardLayout;
