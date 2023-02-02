import useHeader from "@hooks/useHeader";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Hamburguer from "@features/dashboard/layout/hamburguer";
import Profile from "@features/dashboard/layout/profile";
import Search from "@features/dashboard/layout/search";
import { Container, Nav, Items } from "./styles";
import { breakpoints } from "@styles/sizes";
import { ExpandArrowsAlt, Plus, Search as SearchIcon, UserCircle } from "@icons";

const Sidenav = () => {
    const {
        width,
        openHamburguer,
        handleToggleDrawer,
        setAnchorProfile,
        openSearch,
        handleOpenSearch,
        handleCreate,
        handleFullScreen,
    } = useHeader();

    return (
        <Container>
            {openSearch ? (
                <Search />
            ) : (
                <Nav>
                    <IconButton size="large" onClick={handleToggleDrawer}>
                        <Hamburguer
                            open={width < breakpoints.xl ? !openHamburguer : openHamburguer}
                        />
                    </IconButton>

                    <Items>
                        {handleCreate && (
                            <Tooltip title="Crear">
                                <IconButton size="large" onClick={handleCreate}>
                                    <Plus />
                                </IconButton>
                            </Tooltip>
                        )}

                        <Tooltip title="Buscar">
                            <IconButton size="large" onClick={handleOpenSearch}>
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Pantalla completa">
                            <IconButton size="large" onClick={handleFullScreen}>
                                <ExpandArrowsAlt />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Ajustes de cuenta">
                            <IconButton
                                size="large"
                                aria-controls={open ? "profile-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={(e) => setAnchorProfile(e.currentTarget)}
                            >
                                <UserCircle />
                            </IconButton>
                        </Tooltip>

                        <Profile />
                    </Items>
                </Nav>
            )}
        </Container>
    );
};

export default Sidenav;
