import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import AllDayContent from "@features/dashboard/calendar/all-day-content";
import getTitleFormat from "@features/dashboard/calendar/utils/getTitleFormat";

const Calendar = () => {
    const {
        view,
        events,
        calendarRef,
        handleDateSelect,
        handleEventClick,
        handleEventDrop,
        handleEventResize,
        renderEventContent,
        renderAllDayContent,
    } = useCalendar();

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView={view}
            headerToolbar={false}
            views={{
                dayGridMonth: {
                    titleFormat: getTitleFormat,
                    dayMaxEventRows: 3,
                },
                timeGridWeek: {
                    titleFormat: getTitleFormat,
                },
                timeGridDay: {
                    titleFormat: getTitleFormat,
                },
            }}
            locale={esLocale}
            height="100%"
            events={events}
            // eventContent={renderEventContent}
            allDayContent={AllDayContent}
            slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                omitZeroMinute: false,
                meridiem: "short",
            }}
            selectable={true}
            editable={true}
            // selectMirror={true}
            unselectAuto={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
        />
    );
};

export default Calendar;
