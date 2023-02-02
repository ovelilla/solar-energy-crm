import { Outlet } from "react-router-dom";
import useHeader from "@hooks/useHeader";
import Sidebar from "@features/dashboard/layout/sidebar";
import Header from "@features/dashboard/layout/header";
import { Row, LeftColumn, RightColumn, Main } from "./styles";

const DashboardLayout = () => {
    const { openDrawer } = useHeader();

    return (
        <Row>
            <LeftColumn open={openDrawer}>
                <Sidebar />
            </LeftColumn>
            <RightColumn>
                <Header />
                <Main>
                    <Outlet />
                </Main>
            </RightColumn>
        </Row>
    );
};

export default DashboardLayout;
