import useHeader from "@hooks/useHeader";
import Collapse from "@mui/material/Collapse";
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

const Sidenav = () => {
    const { handleCloseSwipeableDrawer, selectedMenu, handleSelectedMenu } = useHeader();

    return (
        <Container>
            <Header>
                <Logo to="/" onClick={handleCloseSwipeableDrawer}>
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
                            <ItemLink to="/" onClick={handleCloseSwipeableDrawer}>
                                <Comparison />
                                <Text>
                                    <Primary>Dashboard</Primary>
                                </Text>
                            </ItemLink>

                            <div>
                                <ItemButton
                                    onClick={() => handleSelectedMenu(1)}
                                    open={selectedMenu === 1}
                                >
                                    <Calculator />
                                    <Text>
                                        <Primary>Propuestas</Primary>
                                    </Text>
                                    <AngleRight />
                                </ItemButton>

                                <Collapse in={selectedMenu === 1} timeout="auto" unmountOnExit>
                                    <Submenu>
                                        <ItemLink
                                            to="/consultas"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Consultas web</Text>
                                        </ItemLink>

                                        <ItemLink to="/leads" onClick={handleCloseSwipeableDrawer}>
                                            <Text>Leads</Text>
                                        </ItemLink>

                                        <ItemLink
                                            to="/solicitud-diseño"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Solicitud diseño</Text>
                                        </ItemLink>

                                        <ItemLink
                                            to="/aceptadas"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Aceptadas</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <div>
                                <ItemButton
                                    onClick={() => handleSelectedMenu(2)}
                                    open={selectedMenu === 2}
                                >
                                    <SolarPanel />
                                    <Text>
                                        <Primary>Productos</Primary>
                                    </Text>
                                    <AngleRight />
                                </ItemButton>

                                <Collapse in={selectedMenu === 2} timeout="auto" unmountOnExit>
                                    <Submenu>
                                        <ItemLink
                                            to="/paneles-solares"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Paneles solares</Text>
                                        </ItemLink>

                                        <ItemLink
                                            to="/baterias"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Baterías</Text>
                                        </ItemLink>

                                        <ItemLink
                                            to="/inversores"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Inversores</Text>
                                        </ItemLink>

                                        <ItemLink
                                            to="/meters"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Meters</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <div>
                                <ItemButton
                                    onClick={() => handleSelectedMenu(3)}
                                    open={selectedMenu === 3}
                                >
                                    <Sliders />
                                    <Text>
                                        <Primary>Parámetros</Primary>
                                    </Text>
                                    <AngleRight />
                                </ItemButton>

                                <Collapse in={selectedMenu === 3} timeout="auto" unmountOnExit>
                                    <Submenu>
                                        <ItemLink
                                            to="/predefinidos"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Predefinidos</Text>
                                        </ItemLink>

                                        <ItemLink
                                            to="/orientacion"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Orientación</Text>
                                        </ItemLink>

                                        <ItemLink
                                            to="/habitos-consumo"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Habitos consumo</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <ItemLink to="/calendario" onClick={handleCloseSwipeableDrawer}>
                                <Calendar />
                                <Text>
                                    <Primary>Calendario</Primary>
                                    <Secondary>3 próximas citas</Secondary>
                                </Text>
                            </ItemLink>

                            <div>
                                <ItemButton
                                    onClick={() => handleSelectedMenu(4)}
                                    open={selectedMenu === 4}
                                >
                                    <UsersAlt />
                                    <Text>
                                        <Primary>Registro</Primary>
                                    </Text>
                                    <AngleRight />
                                </ItemButton>

                                <Collapse in={selectedMenu === 4} timeout="auto" unmountOnExit>
                                    <Submenu>
                                        <ItemLink
                                            to="/clientes"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Clientes</Text>
                                        </ItemLink>

                                        <ItemLink
                                            to="/usuarios"
                                            onClick={handleCloseSwipeableDrawer}
                                        >
                                            <Text>Usuarios</Text>
                                        </ItemLink>
                                    </Submenu>
                                </Collapse>
                            </div>

                            <ItemLink to="/administracion" onClick={handleCloseSwipeableDrawer}>
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
                            <ItemLink to="/cuenta" onClick={handleCloseSwipeableDrawer}>
                                <UserCircle />
                                <Text>
                                    <Primary>Cuenta</Primary>
                                </Text>
                            </ItemLink>

                            <ItemLink to="/ajustes" onClick={handleCloseSwipeableDrawer}>
                                <Setting />
                                <Text>
                                    <Primary>Ajustes</Primary>
                                </Text>
                            </ItemLink>

                            <ItemLink to="/ayuda" onClick={handleCloseSwipeableDrawer}>
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
