import { PenToSquare, TrashCan } from "@icons";

import useMeters from "@features/dashboard/products/meters/hooks/useMeters";
import { MenuStyled, Item } from "./styles";

const Menu = () => {
    const {
        stateMenu,
        handleCloseMenu,
        handleClickMenu,
        handleOpenUpdate,
        deleteMeter,
    } = useMeters();

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

            <Item type="button" aria-label="eliminar" onClick={deleteMeter}>
                <TrashCan />
                <span>Eliminar</span>
            </Item>
        </MenuStyled>
    );
};

export default Menu;
