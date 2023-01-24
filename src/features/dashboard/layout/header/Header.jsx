import { useState } from "react";
import { Container, Nav, Items } from "./styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Hamburguer from "@features/dashboard/layout/hamburguer";
import Profile from "@features/dashboard/layout/profile";
import Search from "@features/dashboard/layout/search";
import { useHeader } from "@hooks";
import { breakpoints } from "@styles/sizes";
import { ExpandArrowsAlt, Plus, Search as SearchIcon, UserCircle } from "@icons";

const Sidenav = ({
    width,
    openHamburguer,
    setOpenHamburguer,
    openDrawer,
    setOpenDrawer,
    openSwipeableDrawer,
    setOpenSwipeableDrawer,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openSearch, setOpenSearch] = useState(false);

    const { create, onCreate } = useHeader();

    const handleToggleDrawer = () => {
        setOpenHamburguer(!openHamburguer);
        setOpenDrawer(!openDrawer);
        setOpenSwipeableDrawer(!openSwipeableDrawer);
    };

    const handleFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };

    const handleOpenProfile = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCloseProfile = () => {
        setAnchorEl(null);
    };

    return (
        <Container>
            {openSearch ? (
                <Search setOpenSearch={setOpenSearch} />
            ) : (
                <Nav>
                    <IconButton size="large" onClick={handleToggleDrawer}>
                        <Hamburguer
                            open={width < breakpoints.xl ? !openHamburguer : openHamburguer}
                        />
                    </IconButton>

                    <Items>
                        {create && (
                            <Tooltip title="Crear">
                                <IconButton size="large" onClick={onCreate}>
                                    <Plus />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title="Buscar">
                            <IconButton size="large" onClick={() => setOpenSearch(true)}>
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
                                onClick={handleOpenProfile}
                            >
                                <UserCircle />
                            </IconButton>
                        </Tooltip>

                        <Profile
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseProfile}
                        />
                    </Items>
                </Nav>
            )}
        </Container>
    );
};

export default Sidenav;
