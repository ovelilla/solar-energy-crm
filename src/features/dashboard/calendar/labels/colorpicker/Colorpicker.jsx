import { useState } from "react";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import { Button } from "@mui/material";
import { MenuStyled, ColorPicker, Footer } from "./styles";

const Colorpicker = ({ stateMenu, setStateMenu }) => {
    const [hex, setHex] = useState("#000000");

    const { valuesLabel, setValueLabel } = useCalendar();

    const handleCloseMenu = () => {
        setStateMenu({ ...stateMenu, open: false, anchor: null });
    };

    const handleClickMenu = (e) => {};

    const handleChange = (color) => {
        setHex(color);
    };

    const handleClickCancel = () => {
        setStateMenu({ ...stateMenu, open: false, anchor: null });
    };

    const handleClickAccept = () => {
        setValueLabel("color", hex);
        setStateMenu({ ...stateMenu, open: false, anchor: null });
    };

    return (
        <MenuStyled
            anchorEl={stateMenu.anchor}
            open={Boolean(stateMenu.anchor)}
            onClose={handleCloseMenu}
            onClick={handleClickMenu}
            MenuListProps={{
                component: "div",
                style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    padding: 0,
                },
            }}
        >
            <ColorPicker color={valuesLabel.color} onChange={handleChange} />
            <Footer>
                <Button variant="text" onClick={handleClickCancel}>
                    Cancelar
                </Button>
                <Button variant="text" onClick={handleClickAccept}>
                    Aceptar
                </Button>
            </Footer>
        </MenuStyled>
    );
};

export default Colorpicker;
