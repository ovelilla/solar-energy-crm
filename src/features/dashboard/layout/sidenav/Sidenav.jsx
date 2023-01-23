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
    Calculator,
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
    const [selected, setSelected] = useState(0);

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

                            <div>
                                <ItemButton
                                    onClick={() => setSelected(selected === 1 ? 0 : 1)}
                                    open={selected === 1 ? true : false}
                                >
                                    <Calculator />
                                    <Text>
                                        <Primary>Propuesta</Primary>
                                    </Text>
                                    <AngleRight />
                                </ItemButton>

                                <Collapse
                                    in={selected === 1 ? true : false}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <Submenu>
                                        <ItemLink to="/parametros">
                                            <Text>Parámetros</Text>
                                        </ItemLink>

                                        <ItemLink to="/consultas">
                                            <Text>Consultas web</Text>
                                        </ItemLink>

                                        <ItemLink to="/leads">
                                            <Text>Leads</Text>
                                        </ItemLink>

                                        <ItemLink to="/solicitud-diseño">
                                            <Text>Solicitud diseño</Text>
                                        </ItemLink>

                                        <ItemLink to="/aceptadas">
                                            <Text>Aceptadas</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <ItemLink to="/calendario">
                                <Calendar />
                                <Text>
                                    <Primary>Calendario</Primary>
                                    <Secondary>3 próximas citas</Secondary>
                                </Text>
                            </ItemLink>

                            <div>
                                <ItemButton
                                    onClick={() => setSelected(selected === 2 ? 0 : 2)}
                                    open={selected === 2 ? true : false}
                                >
                                    <UsersAlt />
                                    <Text>
                                        <Primary>Registro</Primary>
                                    </Text>
                                    <AngleRight />
                                </ItemButton>

                                <Collapse
                                    in={selected === 2 ? true : false}
                                    timeout="auto"
                                    unmountOnExit
                                >
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
