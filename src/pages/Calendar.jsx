import { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';
import esLocale from "@fullcalendar/core/locales/es";
import useHeader from "@hooks/useHeader";

const events = [{ title: "Evento", start: new Date() }];

const Calendar = () => {
    const calendarRef = useRef();
    const { setHandleResize } = useHeader();

    const handleResize = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.updateSize();
    };

    useEffect(() => {
        setHandleResize(() => handleResize);

        return () => {
            setHandleResize(null);
        };
    }, []);

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            views={{
                dayGridMonth: {
                    titleFormat: { year: "numeric", month: "long" },
                },
                timeGridWeek: {
                    titleFormat: { year: "numeric", month: "long", day: "numeric" },
                },
                timeGridDay: {
                    titleFormat: { year: "numeric", month: "long", day: "numeric" },
                },
            }}
            locale={esLocale}
            height="100%"
            events={events}
            eventContent={renderEventContent}
        />
    );
};

export default Calendar;

const renderEventContent = (eventInfo) => {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
};
