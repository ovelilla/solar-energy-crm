import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import dayjs from "dayjs";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import useHeader from "@hooks/useHeader";
import AllDayContent from "@features/dashboard/calendar/all-day-content";
import DayHeaderContent from "@features/dashboard/calendar/day-header-content";
import EventContent from "@features/dashboard/calendar/event-content";
import DayCellContent from "@features/dashboard/calendar/day-cell-content";
import getTitleFormat from "@features/dashboard/calendar/utils/getTitleFormat";

const Calendar = () => {
    const {
        stateCalendar,
        setStateCalendar,
        calendarRef,
        stateLabel,
        stateDialogCreateEvent,
        setStateDialogCreateEvent,
        statePreview,
        setStatePreview,
        valuesEvent,
        setFormValuesEvent,
        updateEventDrop,
        updateEventResize,
    } = useCalendar();
    const { searchText } = useHeader();

    const handleDatesSet = (arg) => {
        setStateCalendar({
            ...stateCalendar,
            view: arg.view.type,
            showDayHeaders: arg.view.type !== "timeGridDay" && arg.view.type !== "listWeek",
            start: dayjs(arg.start),
            end: dayjs(arg.end),
        });
        setStatePreview({ ...statePreview, open: false });
    };

    const handleLoading = (isLoading) => {};

    const handleDateSelect = (eventInfo) => {
        setStateCalendar({ ...stateCalendar, event: null });
        setStateDialogCreateEvent({ ...stateDialogCreateEvent, open: true });
        setFormValuesEvent({
            ...valuesEvent,
            start: dayjs(eventInfo.start),
            end: dayjs(eventInfo.end),
            allDay: eventInfo.allDay,
        });
    };

    const handleEventClick = (eventInfo) => {
        setStateCalendar({ ...stateCalendar, event: eventInfo });
        if (!statePreview.open) {
            setStatePreview({ ...statePreview, open: true });
        }
    };

    const handleEventDrop = (eventInfo) => {
        updateEventDrop(eventInfo);
    };

    const handleEventResize = (eventInfo) => {
        updateEventResize(eventInfo);
    };

    const filteredEvents = stateCalendar.events.filter((event) => {
        const matchingLabel = stateLabel.labels.find((label) => label._id === event.labelId);
        const titleMatches = event.title.toLowerCase().includes(searchText.toLowerCase());
        const descriptionMatches = event.description
            .toLowerCase()
            .includes(searchText.toLowerCase());
        return matchingLabel && matchingLabel.isEnabled && (titleMatches || descriptionMatches);
    });

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[rrulePlugin, dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView={stateCalendar.view}
            headerToolbar={false}
            views={{
                dayGridMonth: {
                    titleFormat: getTitleFormat,
                    dayMaxEventRows: true,
                },
                timeGridWeek: {
                    titleFormat: getTitleFormat,
                },
                timeGridDay: {
                    titleFormat: getTitleFormat,
                },
                listWeek: {
                    titleFormat: getTitleFormat,
                },
            }}
            locale={esLocale}
            height="100%"
            eventColor={"#3788d8"}
            events={filteredEvents}
            dayHeaders={stateCalendar.showDayHeaders}
            navLinks={true}
            navLinkDayClick={"timeGridDay"}
            eventContent={(eventInfo) => (
                <EventContent eventInfo={eventInfo} statePreview={statePreview} />
            )}
            allDayContent={AllDayContent}
            dayHeaderContent={DayHeaderContent}
            dayCellContent={DayCellContent}
            slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                omitZeroMinute: false,
                meridiem: "short",
            }}
            scrollTime="08:00:00"
            nowIndicator={true}
            selectable={stateCalendar.selectable}
            editable={true}
            selectMirror={true}
            unselectAuto={true}
            forceEventDuration={true}
            datesSet={handleDatesSet}
            loading={handleLoading}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
        />
    );
};

export default Calendar;
