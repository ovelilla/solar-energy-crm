import { PenToSquare, TrashCan } from "@icons";

import usePanels from "@features/dashboard/products/panels/hooks/usePanels";
import { MenuStyled, Item } from "./styles";

const Menu = () => {
    const {
        stateMenu,
        handleCloseMenu,
        handleClickMenu,
        handleOpenUpdate,
        deletePanel,
    } = usePanels();

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

            <Item type="button" aria-label="eliminar" onClick={deletePanel}>
                <TrashCan />
                <span>Eliminar</span>
            </Item>
        </MenuStyled>
    );
};

export default Menu;
