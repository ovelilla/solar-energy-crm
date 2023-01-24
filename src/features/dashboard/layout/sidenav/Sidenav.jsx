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
    SolarPanel,
    UserCircle,
    UsersAlt,
    Wallet,
} from "@icons";

const Sidenav = ({ onClick }) => {
    const [selected, setSelected] = useState(0);

    return (
        <Container>
            <Header>
                <Logo to="/" onClick={onClick}>
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
                            <ItemLink to="/" onClick={onClick}>
                                <Comparison />
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
                                        <Primary>Propuestas</Primary>
                                    </Text>
                                    <AngleRight />
                                </ItemButton>

                                <Collapse
                                    in={selected === 1 ? true : false}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <Submenu>
                                        <ItemLink to="/consultas" onClick={onClick}>
                                            <Text>Consultas web</Text>
                                        </ItemLink>

                                        <ItemLink to="/leads" onClick={onClick}>
                                            <Text>Leads</Text>
                                        </ItemLink>

                                        <ItemLink to="/solicitud-diseño" onClick={onClick}>
                                            <Text>Solicitud diseño</Text>
                                        </ItemLink>

                                        <ItemLink to="/aceptadas" onClick={onClick}>
                                            <Text>Aceptadas</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <div>
                                <ItemButton
                                    onClick={() => setSelected(selected === 2 ? 0 : 2)}
                                    open={selected === 2 ? true : false}
                                >
                                    <SolarPanel />
                                    <Text>
                                        <Primary>Productos</Primary>
                                    </Text>
                                    <AngleRight />
                                </ItemButton>

                                <Collapse
                                    in={selected === 2 ? true : false}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <Submenu>
                                        <ItemLink to="/paneles-solares" onClick={onClick}>
                                            <Text>Paneles solares</Text>
                                        </ItemLink>

                                        <ItemLink to="/baterias" onClick={onClick}>
                                            <Text>Baterías</Text>
                                        </ItemLink>

                                        <ItemLink to="/inversores" onClick={onClick}>
                                            <Text>Inversores</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <div>
                                <ItemButton
                                    onClick={() => setSelected(selected === 3 ? 0 : 3)}
                                    open={selected === 3 ? true : false}
                                >
                                    <Sliders />
                                    <Text>
                                        <Primary>Parámetros</Primary>
                                    </Text>
                                    <AngleRight />
                                </ItemButton>

                                <Collapse
                                    in={selected === 3 ? true : false}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <Submenu>
                                        <ItemLink to="/predefinidos" onClick={onClick}>
                                            <Text>Predefinidos</Text>
                                        </ItemLink>

                                        <ItemLink to="/orientacion" onClick={onClick}>
                                            <Text>Orientación</Text>
                                        </ItemLink>

                                        <ItemLink to="/habitos-consumo" onClick={onClick}>
                                            <Text>Habitos consumo</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <ItemLink to="/calendario" onClick={onClick}>
                                <Calendar />
                                <Text>
                                    <Primary>Calendario</Primary>
                                    <Secondary>3 próximas citas</Secondary>
                                </Text>
                            </ItemLink>

                            <div>
                                <ItemButton
                                    onClick={() => setSelected(selected === 4 ? 0 : 4)}
                                    open={selected === 4 ? true : false}
                                >
                                    <UsersAlt />
                                    <Text>
                                        <Primary>Registro</Primary>
                                    </Text>
                                    <AngleRight />
                                </ItemButton>

                                <Collapse
                                    in={selected === 4 ? true : false}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <Submenu>
                                        <ItemLink to="/clientes" onClick={onClick}>
                                            <Text>Clientes</Text>
                                        </ItemLink>

                                        <ItemLink to="/usuarios" onClick={onClick}>
                                            <Text>Usuarios</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <ItemLink to="/administracion" onClick={onClick}>
                                <Wallet />
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
                            <ItemLink to="/cuenta" onClick={onClick}>
                                <UserCircle />
                                <Text>
                                    <Primary>Cuenta</Primary>
                                </Text>
                            </ItemLink>

                            <ItemLink to="/ajustes" onClick={onClick}>
                                <Setting />
                                <Text>
                                    <Primary>Ajustes</Primary>
                                </Text>
                            </ItemLink>

                            <ItemLink to="/ayuda" onClick={onClick}>
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
