import { useEffect } from "react";
import useHeader from "@hooks/useHeader";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import Container from "@features/dashboard/calendar/container";
import Sidebar from "@features/dashboard/calendar/sidebar";
import Wrapper from "@features/dashboard/calendar/wrapper";
import Header from "@features/dashboard/calendar/header";
import Body from "@features/dashboard/calendar/body";
import CalendarComponent from "@features/dashboard/calendar/calendar";
import Dialogs from "@features/dashboard/calendar/dialogs";

const Calendar = () => {
    const { setHandleResize, setHandleCreate } = useHeader();
    const {
        stateDialogCreateEvent,
        setStateDialogCreateEvent,
        statePreview,
        setStatePreview,
        calendarRef,
        resetFormEvent,
        readEvents,
        readLabels,
    } = useCalendar();

    useEffect(() => {
        setHandleResize(() => handleResize);
        setHandleCreate(() => handleCreate);

        readEvents();
        readLabels();

        return () => {
            setHandleResize(null);
            setHandleCreate(null);
        };
    }, []);

    const handleResize = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.updateSize();
    };

    const handleCreate = () => {
        resetFormEvent();
        setStateDialogCreateEvent({ ...stateDialogCreateEvent, open: true });
        setStatePreview({ ...statePreview, open: false });
    };

    return (
        <>
            <Dialogs />

            <Container>
                <Sidebar />
                <Wrapper>
                    <Header />
                    <Body>
                        <CalendarComponent />
                    </Body>
                </Wrapper>
            </Container>
        </>
    );
};

export default Calendar;
