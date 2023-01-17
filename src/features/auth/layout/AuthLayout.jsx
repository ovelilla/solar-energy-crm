import { Outlet } from "react-router-dom";

import {
    Main,
    ColumnLeft,
    ContainerLeft,
    ColumnRight,
    ContainerRight,
    Title,
    Text,
} from "./styles";

import { AuthCircles } from "@icons";

const AuthLayout = () => {
    return (
        <Main>
            <ColumnLeft>
                <ContainerLeft>
                    <Outlet />
                </ContainerLeft>
            </ColumnLeft>

            <ColumnRight>
                <AuthCircles />

                <ContainerRight>
                    <Title>
                        <span>Welcome to</span>
                        <span>our Libergy CRM</span>
                    </Title>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus vel leo
                        ut aliquam. Class aptent taciti sociosqu ad litora torquent per conubia
                        nostra.
                    </Text>
                </ContainerRight>
            </ColumnRight>
        </Main>
    );
};

export default AuthLayout;
