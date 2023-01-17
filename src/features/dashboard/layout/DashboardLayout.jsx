import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@features/dashboard/layout/sidebar";
import { Header } from "@features/dashboard/layout/header";

import { Row, LeftColumn, RightColumn, Main } from "./styles";

const DashboardLayout = () => {
    const [openDrawer, setOpenDrawer] = useState(true);
    const [openSwipeableDrawe, setOpenSwipeableDrawer] = useState(false);

    return (
        <Row>
            <LeftColumn open={openDrawer}>
                <Sidebar
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    openSwipeableDrawer={openSwipeableDrawe}
                    setOpenSwipeableDrawer={setOpenSwipeableDrawer}
                />
            </LeftColumn>
            <RightColumn>
                <Header
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
