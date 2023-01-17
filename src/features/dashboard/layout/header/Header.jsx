import { useState } from "react";

import { Container, Nav, Items } from "./styles";

import IconButton from "@mui/material/IconButton";
import Hamburguer from "./Hamburguer";

import { ExpandArrowsAlt, Search, UserCircle } from "@icons";

const Sidenav = ({ openDrawer, setOpenDrawer, openSwipeableDrawer, setOpenSwipeableDrawer }) => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
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

    return (
        <Container>
            <Nav>
                <IconButton size="large" onClick={handleClick}>
                    <Hamburguer open={open} />
                </IconButton>

                <Items>
                    <IconButton size="large" onClick={handleFullScreen}>
                        <ExpandArrowsAlt />
                    </IconButton>
                    <IconButton size="large">
                        <Search />
                    </IconButton>
                    <IconButton size="large">
                        <UserCircle />
                    </IconButton>
                </Items>
            </Nav>
        </Container>
    );
};

export default Sidenav;
