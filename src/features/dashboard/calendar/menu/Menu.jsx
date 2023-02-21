import { useState } from "react";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import { MenuStyled, Item } from "./styles";

const Menu = ({ stateMenu, setStateMenu }) => {
    const { view, setView, calendarRef } = useCalendar();

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleClickMenu = (e) => {
        if (e.target.value) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.changeView(e.target.value);
            setView(e.target.value);
        }
        setStateMenu({ open: false, anchor: null });
    };

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
            <Item value={"dayGridMonth"} selected={view === "dayGridMonth"}>
                Mes
            </Item>
            <Item value={"timeGridWeek"} selected={view === "timeGridWeek"}>
                Semana
            </Item>
            <Item value={"timeGridDay"} selected={view === "timeGridDay"}>
                Día
            </Item>
            <Item value={"listWeek"} selected={view === "listWeek"}>
                Agenda
            </Item>
        </MenuStyled>
    );
};

export default Menu;
