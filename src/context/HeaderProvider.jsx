import { createContext, useState, useEffect } from "react";
import useWindowSize from "@hooks/useWindowSize";
import { breakpoints } from "@styles/sizes";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
    const [openHamburguer, setOpenHamburguer] = useState(true);
    const [openDrawer, setOpenDrawer] = useState(true);
    const [handleResize, setHandleResize] = useState(null);
    const [openSwipeableDrawer, setOpenSwipeableDrawer] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [handleCreate, setHandleCreate] = useState(null);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [anchorProfile, setAnchorProfile] = useState(null);

    const { width } = useWindowSize();

    useEffect(() => {
        if (width < breakpoints.xl) {
            setOpenHamburguer(false);
            setOpenDrawer(true);
            setOpenSwipeableDrawer(false);
        } else {
            setOpenHamburguer(true);
            setOpenDrawer(true);
            setOpenSwipeableDrawer(false);
        }
    }, [width]);

    const handleToggleDrawer = () => {
        setOpenHamburguer(!openHamburguer);
        setOpenDrawer(!openDrawer);
        setOpenSwipeableDrawer(!openSwipeableDrawer);
    };

    const handleOpenSwipeableDrawer = () => {
        setOpenHamburguer(true);
        setOpenSwipeableDrawer(true);
    };

    const handleCloseSwipeableDrawer = () => {
        if (width < breakpoints.xl) {
            setOpenHamburguer(false);
            setOpenSwipeableDrawer(false);
        }
    };

    const handleSelectedMenu = (index) => {
        setSelectedMenu(index === selectedMenu ? 0 : index);
    };

    const handleFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    };

    const handleChangeSearchText = (e) => {
        setSearchText(e.target.value);
    };

    const handleOpenSearch = () => {
        setOpenSearch(true);
    };

    const handleCloseSearch = () => {
        setOpenSearch(false);
        setSearchText("");
    };

    return (
        <HeaderContext.Provider
            value={{
                width,
                openHamburguer,
                setOpenHamburguer,
                openDrawer,
                setOpenDrawer,
                handleResize,
                setHandleResize,
                handleToggleDrawer,
                openSwipeableDrawer,
                setOpenSwipeableDrawer,
                handleOpenSwipeableDrawer,
                handleCloseSwipeableDrawer,
                selectedMenu,
                setSelectedMenu,
                handleSelectedMenu,
                handleCreate,
                setHandleCreate,
                openSearch,
                setOpenSearch,
                searchText,
                setSearchText,
                handleChangeSearchText,
                handleOpenSearch,
                handleCloseSearch,
                handleFullScreen,
                anchorProfile,
                setAnchorProfile,
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

export default HeaderContext;
