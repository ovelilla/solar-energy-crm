import { useTimeout } from "@hooks";
import useAuth from "@features/auth/hooks/useAuth";

import { Container, Icon, StyledLogout, Text, Title } from "./styles";

const Logout = () => {
    const { handleLogout } = useAuth();

    useTimeout(handleLogout, 3000);

    return (
        <StyledLogout>
            <Container>
                <Icon>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                    </svg>
                </Icon>
                <Title>Has cerrado la sesión</Title>
                <Text>Esperamos verte pronto</Text>
            </Container>
        </StyledLogout>
    );
};

export default Logout;
