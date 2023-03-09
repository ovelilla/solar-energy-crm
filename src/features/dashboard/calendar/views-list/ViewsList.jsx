import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import { Nav } from "./styles";

const ViewsList = () => {
    const { stateCalendar, setStateCalendar, setStateDrawer, calendarRef } = useCalendar();

    const handleClickMenu = (view) => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(view);
        setStateCalendar({ ...stateCalendar, view });
        setStateDrawer({ ...stateCalendar, open: false });
    };

    return (
        <Nav>
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => handleClickMenu("dayGridMonth")}
                        sx={{ padding: "8px 24px" }}
                    >
                        <ListItemText primary="Mes" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => handleClickMenu("timeGridWeek")}
                        sx={{ padding: "8px 24px" }}
                    >
                        <ListItemText primary="Semana" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => handleClickMenu("timeGridDay")}
                        sx={{ padding: "8px 24px" }}
                    >
                        <ListItemText primary="Día" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => handleClickMenu("listWeek")}
                        sx={{ padding: "8px 24px" }}
                    >
                        <ListItemText primary="Agenda" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Nav>
    );
};

export default ViewsList;
