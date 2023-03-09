import { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { StyledHeader, Left, Right, Title, Actions, Hamburguer, Bar } from "./styles";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import { Calendar, ChevronLeft, ChevronRight } from "@icons";
import useWindowSize from "@hooks/useWindowSize";
import { breakpoints } from "@styles/sizes";

const Header = () => {
    const [title, setTitle] = useState("");

    const {
        stateCalendar,
        setStateCalendar,
        calendarRef,
        stateDrawer,
        setStateDrawer,
        stateSwipeableDrawer,
        setStateSwipeableDrawer,
    } = useCalendar();
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

    const handleChangeView = (e) => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(e.target.value);
        setStateCalendar({ ...stateCalendar, view: e.target.value });
        setTitle(calendarApi.view.title);
    };

    const handleOpenDrawer = () => {
        setStateDrawer({ ...stateDrawer, open: !stateDrawer.open });
        setStateSwipeableDrawer({ ...stateSwipeableDrawer, open: !stateSwipeableDrawer.open });
    };

    return (
        <StyledHeader>
            <Left>
                <Actions>
                    <Tooltip title="Menu">
                        <IconButton onClick={handleOpenDrawer} size="large">
                            <Hamburguer>
                                <Bar />
                                <Bar />
                                <Bar />
                            </Hamburguer>
                        </IconButton>
                    </Tooltip>

                    <Title>{title}</Title>

                    <Tooltip title="Anterior">
                        <IconButton
                            onClick={handlePrev}
                            size="large"
                            sx={{ svg: { width: "20px", height: "20px" } }}
                        >
                            <ChevronLeft />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Siguiente">
                        <IconButton
                            onClick={handleNext}
                            size="large"
                            sx={{ svg: { width: "20px", height: "20px" } }}
                        >
                            <ChevronRight />
                        </IconButton>
                    </Tooltip>
                </Actions>
            </Left>

            <Right>
                <Tooltip title="Hoy">
                    <IconButton onClick={handleToday} size="large">
                        <Calendar />
                    </IconButton>
                </Tooltip>

                {width >= breakpoints.md && (
                    <FormControl>
                        <Select
                            labelId="views-label"
                            id="views"
                            value={stateCalendar.view}
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
