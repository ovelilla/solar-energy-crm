import { useEffect } from "react";
import useHeader from "@hooks/useHeader";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import Wrapper from "@features/dashboard/calendar/wrapper";
import Header from "@features/dashboard/calendar/header";
import Body from "@features/dashboard/calendar/body";
import CalendarComponent from "@features/dashboard/calendar/calendar";

const Calendar = () => {
    const { setHandleResize, setHandleCreate } = useHeader();
    const { handleResize, handleCreate } = useCalendar();

    useEffect(() => {
        setHandleResize(() => handleResize);
        setHandleCreate(() => handleCreate);

        return () => {
            setHandleResize(null);
            setHandleCreate(null);
        };
    }, []);

    return (
        <Wrapper>
            <Header />
            <Body>
                <CalendarComponent />
            </Body>
        </Wrapper>
    );
};

export default Calendar;
