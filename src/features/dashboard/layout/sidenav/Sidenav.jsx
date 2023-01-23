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

const Sidenav = ({ setOpenSwipeableDrawer }) => {
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
                            <ItemLink to="/" onClick={() => setOpenSwipeableDrawer(false)}>
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
                                        <ItemLink to="/parametros" onClick={() => setOpenSwipeableDrawer(false)}>
                                            <Text>Parámetros</Text>
                                        </ItemLink>

                                        <ItemLink to="/consultas" onClick={() => setOpenSwipeableDrawer(false)}>
                                            <Text>Consultas web</Text>
                                        </ItemLink>

                                        <ItemLink to="/leads" onClick={() => setOpenSwipeableDrawer(false)}>
                                            <Text>Leads</Text>
                                        </ItemLink>

                                        <ItemLink to="/solicitud-diseño" onClick={() => setOpenSwipeableDrawer(false)}>
                                            <Text>Solicitud diseño</Text>
                                        </ItemLink>

                                        <ItemLink to="/aceptadas" onClick={() => setOpenSwipeableDrawer(false)}>
                                            <Text>Aceptadas</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <ItemLink to="/calendario" onClick={() => setOpenSwipeableDrawer(false)}>
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
                                        <ItemLink to="/clientes" onClick={() => setOpenSwipeableDrawer(false)}>
                                            <Text>Clientes</Text>
                                        </ItemLink>

                                        <ItemLink to="/usuarios" onClick={() => setOpenSwipeableDrawer(false)}>
                                            <Text>Usuarios</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <ItemLink to="/administracion" onClick={() => setOpenSwipeableDrawer(false)}>
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
                            <ItemLink to="/cuenta" onClick={() => setOpenSwipeableDrawer(false)}>
                                <UserCircle />
                                <Text>
                                    <Primary>Cuenta</Primary>
                                </Text>
                            </ItemLink>

                            <ItemLink to="/ajustes" onClick={() => setOpenSwipeableDrawer(false)}>
                                <Setting />
                                <Text>
                                    <Primary>Ajustes</Primary>
                                </Text>
                            </ItemLink>

                            <ItemLink to="/ayuda" onClick={() => setOpenSwipeableDrawer(false)}>
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
