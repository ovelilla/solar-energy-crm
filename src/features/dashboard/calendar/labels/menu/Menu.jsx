import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import useWindowSize from "@hooks/useWindowSize";
import { breakpoints } from "@styles/sizes";
import { PenToSquare, TrashCan } from "@icons";
import { MenuStyled, Item, ColorGrid, Cell, Color } from "./styles";

const colors = [
    {
        id: 1,
        color: "#f44336",
    },
    {
        id: 2,
        color: "#e91e63",
    },
    {
        id: 3,
        color: "#9c27b0",
    },
    {
        id: 4,
        color: "#673ab7",
    },
    {
        id: 5,
        color: "#3f51b5",
    },
    {
        id: 6,
        color: "#3788d8",
    },
    {
        id: 7,
        color: "#00bcd4",
    },
    {
        id: 8,
        color: "#009688",
    },
    {
        id: 9,
        color: "#4caf50",
    },
    {
        id: 10,
        color: "#8bc34a",
    },
    {
        id: 11,
        color: "#ffc404",
    },
    {
        id: 12,
        color: "#ff6207",
    },
];

const Menu = ({ stateMenu, setStateMenu }) => {
    const {
        stateDialogUpdateLabel,
        setStateDialogUpdateLabel,
        stateDrawer,
        setStateDrawer,
        stateLabel,
        valuesLabel,
        setFormValuesLabel,
        updateLabelColor,
        deleteLabel
    } = useCalendar();
    const { width } = useWindowSize();

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleClickMenu = (e) => {
        setStateMenu({ open: false, anchor: null });

        if (width < breakpoints.xl) {
            setStateDrawer({ ...stateDrawer, open: false });
        }
    };

    const handleUpdate = () => {
        setFormValuesLabel({
            ...valuesLabel,
            name: stateLabel.label.name,
            description: stateLabel.label.description,
            color: stateLabel.label.color,
        });
        setStateDialogUpdateLabel({ ...stateDialogUpdateLabel, open: true });
    };

    const handleDelete = () => {
        deleteLabel();
    };

    const handleClickColor = (e, color) => {
        updateLabelColor(color);
    };

    return (
        <MenuStyled
            anchorEl={stateMenu.anchor}
            open={Boolean(stateMenu.anchor)}
            onClose={handleCloseMenu}
            onClick={handleClickMenu}
            MenuListProps={{
                component: "nav",
            }}
        >
            <Item type="button" aria-label="editar" onClick={handleUpdate}>
                <PenToSquare />
                <span>Actualizar</span>
            </Item>

            <Item type="button" aria-label="eliminar" onClick={handleDelete}>
                <TrashCan />
                <span>Eliminar</span>
            </Item>

            <ColorGrid>
                {colors.map((color) => (
                    <Cell key={color.id}>
                        <Color
                            color={color.color}
                            selected={stateLabel.label && stateLabel.label.color === color.color}
                            onClick={(e) => handleClickColor(e, color.color)}
                        />
                    </Cell>
                ))}
            </ColorGrid>
        </MenuStyled>
    );
};

export default Menu;
