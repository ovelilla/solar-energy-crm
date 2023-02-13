import { Eye, Globe, TrashCan } from "@icons";
import useProposal from "@features/dashboard/proposal/hooks/useProposal";
import { MenuStyled, Item } from "./styles";

const Menu = () => {
    const {
        stateMenu,
        handleCloseMenu,
        handleClickMenu,
        handleViewProposal,
        handleConsultProposal,
    } = useProposal();

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
            <Item type="button" aria-label="detalles" onClick={handleViewProposal}>
                <Eye />
                <span>Ver detalles</span>
            </Item>

            <Item type="button" aria-label="consultar" onClick={handleConsultProposal}>
                <Globe />
                <span>Consultar propuesta</span>
            </Item>

            <Item type="button" aria-label="eliminar">
                <TrashCan />
                <span>Eliminar</span>
            </Item>
        </MenuStyled>
    );
};

export default Menu;
