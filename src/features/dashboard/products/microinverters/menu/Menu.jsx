import { PenToSquare, TrashCan } from "@icons";

import useMicroinverters from "@features/dashboard/products/microinverters/hooks/useMicroinverters";
import { MenuStyled, Item } from "./styles";

const Menu = () => {
    const {
        stateMenu,
        handleCloseMenu,
        handleClickMenu,
        handleOpenUpdate,
        deleteMicroinverter,
    } = useMicroinverters();

    return (
        <MenuStyled
            anchorEl={stateMenu.anchor}
            id="actions-menu"
            open={Boolean(stateMenu.anchor)}
            onClose={handleCloseMenu}
            onClick={handleClickMenu}
            MenuListProps={{
                component: "nav",
            }}
        >
            <Item type="button" aria-label="editar" onClick={handleOpenUpdate}>
                <PenToSquare />
                <span>Actualizar</span>
            </Item>

            <Item type="button" aria-label="eliminar" onClick={deleteMicroinverter}>
                <TrashCan />
                <span>Eliminar</span>
            </Item>
        </MenuStyled>
    );
};

export default Menu;
