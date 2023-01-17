import { useState } from "react";

import {
    Container,
    Header,
    Logo,
    Body,
    Nav,
    Group,
    Subheader,
    Title,
    Subtitle,
    Subbody,
    ItemLink,
    ItemButton,
    Text,
    Primary,
    Secondary,
    Submenu,
} from "./styles";

import Collapse from "@mui/material/Collapse";

import {
    AngleRight,
    Calendar,
    Cloud,
    Comparison,
    QuestionCircle,
    Setting,
    Sliders,
    UserCircle,
    UsersAlt,
} from "@icons";

const Sidenav = () => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Container>
            <Header>
                <Logo>
                    <Cloud />
                    <span>LibergyCRM</span>
                </Logo>
            </Header>

            <Body>
                <Nav>
                    <Group>
                        <Subheader>
                            <Title>Secciones</Title>
                            <Subtitle>Acceso a las secciones</Subtitle>
                        </Subheader>

                        <Subbody>
                            <ItemLink to="/">
                                <Sliders />
                                <Text>
                                    <Primary>Dashboard</Primary>
                                </Text>
                            </ItemLink>

                            <ItemLink to="/calendario">
                                <Calendar />
                                <Text>
                                    <Primary>Calendario</Primary>
                                    <Secondary>3 próximas citas</Secondary>
                                </Text>
                            </ItemLink>

                            <div>
                                <ItemButton onClick={handleClick} open={open}>
                                    <UsersAlt />
                                    <Text>
                                        <Primary>Registro</Primary>
                                    </Text>
                                    <AngleRight />
                                </ItemButton>

                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Submenu>
                                        <ItemLink to="/clientes">
                                            <Text>Clientes</Text>
                                        </ItemLink>

                                        <ItemLink to="/usuarios">
                                            <Text>Usuarios</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <ItemLink to="/administracion">
                                <Comparison />
                                <Text>
                                    <Primary>Administración</Primary>
                                </Text>
                            </ItemLink>
                        </Subbody>
                    </Group>

                    <Group>
                        <Subheader>
                            <Title>Configuración</Title>
                            <Subtitle>Acceso a los ajustes</Subtitle>
                        </Subheader>

                        <Subbody>
                            <ItemLink to="/cuenta">
                                <UserCircle />
                                <Text>
                                    <Primary>Cuenta</Primary>
                                </Text>
                            </ItemLink>

                            <ItemLink to="/ajustes">
                                <Setting />
                                <Text>
                                    <Primary>Ajustes</Primary>
                                </Text>
                            </ItemLink>

                            <ItemLink to="/ayuda">
                                <QuestionCircle />
                                <Text>
                                    <Primary>Ayuda</Primary>
                                </Text>
                            </ItemLink>
                        </Subbody>
                    </Group>
                </Nav>
            </Body>
        </Container>
    );
};

export default Sidenav;
