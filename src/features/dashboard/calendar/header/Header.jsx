import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { StyledHeader, Left, Right, Title, Actions } from "./styles";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import { Calendar, ChevronLeft, ChevronRight, Eye } from "@icons";
import useWindowSize from "@hooks/useWindowSize";
import Menu from "@features/dashboard/calendar/menu";

const Header = () => {
    const [title, setTitle] = useState("");
    const [stateMenu, setStateMenu] = useState({ open: false, anchor: null });

    const { view, setView, calendarRef } = useCalendar();
    const { width } = useWindowSize();

    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            setTitle(calendarApi.view.title);
        }
    }, [calendarRef]);

    const handlePrev = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.prev();
        setTitle(calendarApi.view.title);
    };

    const handleNext = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.next();
        setTitle(calendarApi.view.title);
    };

    const handleToday = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.today();
        setTitle(calendarApi.view.title);
    };

    const handleOpenMenu = (e) => {
        setStateMenu({ open: true, anchor: e.currentTarget });
    };

    const handleChangeView = (e) => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(e.target.value);
        setView(e.target.value);
        setTitle(calendarApi.view.title);
    };

    return (
        <StyledHeader>
            <Left>
                <Actions>
                    <Tooltip title="Anterior">
                        <IconButton onClick={handlePrev} size="large">
                            <ChevronLeft />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Siguiente">
                        <IconButton onClick={handleNext} size="large">
                            <ChevronRight />
                        </IconButton>
                    </Tooltip>
                </Actions>

                <Title>{title}</Title>
            </Left>

            <Right>
                <Tooltip title="Hoy">
                    <IconButton onClick={handleToday} size="large">
                        <Calendar />
                    </IconButton>
                </Tooltip>

                {width < 468 ? (
                    <>
                        <Tooltip title="Vista">
                            <IconButton size="large" onClick={handleOpenMenu}>
                                <Eye />
                            </IconButton>
                        </Tooltip>
                        <Menu stateMenu={stateMenu} setStateMenu={setStateMenu} />
                    </>
                ) : (
                    <FormControl>
                        <Select
                            labelId="views-label"
                            id="views"
                            value={view}
                            onChange={handleChangeView}
                        >
                            <MenuItem value={"dayGridMonth"}>Mes</MenuItem>
                            <MenuItem value={"timeGridWeek"}>Semana</MenuItem>
                            <MenuItem value={"timeGridDay"}>Día</MenuItem>
                            <MenuItem value={"listWeek"}>Agenda</MenuItem>
                        </Select>
                    </FormControl>
                )}
            </Right>
        </StyledHeader>
    );
};

export default Header;
