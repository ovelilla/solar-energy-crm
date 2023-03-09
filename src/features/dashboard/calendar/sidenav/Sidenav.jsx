import { useState, useEffect } from "react";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import dayjs from "dayjs";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import Labels from "@features/dashboard/calendar/labels";
import { Container, Title, CalendarContainer } from "./styles";
import useWindowSize from "@hooks/useWindowSize";
import { breakpoints } from "@styles/sizes";
import ViewsList from "@features/dashboard/calendar/views-list";

const Sidenav = () => {
    const [date, setDate] = useState(dayjs());

    const { stateCalendar, setStateCalendar, calendarRef } = useCalendar();
    const { width } = useWindowSize();

    const handleChange = (newValue) => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(newValue.toDate());
        calendarApi.changeView("timeGridDay");
        setStateCalendar({ ...stateCalendar, view: "timeGridDay", start: newValue });
    };

    useEffect(() => {
        if (!stateCalendar.start || !stateCalendar.end) {
            return;
        }

        if (stateCalendar.view === "timeGridDay") {
            setDate(stateCalendar.start);
        } else {
            setDate(dayjs());
        }
    }, [stateCalendar]);

    return (
        <Container>
            <Title>Calendario</Title>

            {width < breakpoints.xl ? (
                <ViewsList />
            ) : (
                <CalendarContainer>
                    <CalendarPicker date={date} views={["day"]} onChange={handleChange} />
                </CalendarContainer>
            )}

            <Labels />
        </Container>
    );
};

export default Sidenav;
