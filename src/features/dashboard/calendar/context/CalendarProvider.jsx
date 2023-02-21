import { createContext, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const CalendarContext = createContext();

const today = new Date();

export const CalendarProvider = () => {
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("dayGridMonth");
    const [event, setEvent] = useState(null);
    const [events, setEvents] = useState([
        { title: "Evento 1", start: new Date() },
        { title: "Evento 2", start: new Date(today.getTime() + 3600000) },
        { title: "Evento 3", start: new Date(today.getTime() + 7200000) },
        { title: "Evento 4", start: new Date(today.getTime() + 10800000) },
    ]);

    const calendarRef = useRef();
    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        title: "",
    });

    const handleResize = () => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.updateSize();
    };
    const handleDateSelect = (eventInfo) => {
        const title = prompt("Por favor ingrese el título del evento");
        const calendarApi = calendarRef.current.getApi();

        if (title) {
            calendarApi.addEvent({
                title,
                start: eventInfo.startStr,
                end: eventInfo.endStr,
                allDay: eventInfo.allDay,
            });
        }
    };

    const handleEventClick = (eventInfo) => {
        const title = prompt("Por favor ingrese el nuevo título del evento");
        const calendarApi = calendarRef.current.getApi();

        if (title) {
            eventInfo.event.setProp("title", title);
        }
    };

    const handleEventDrop = (eventInfo) => {
        console.log(eventInfo.event);
    };

    const handleEventResize = (eventInfo) => {
        console.log(eventInfo.event);
    };

    const handleCreate = () => {};

    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <span>{eventInfo.event.title}</span>
            </>
        );
    };

    return (
        <CalendarContext.Provider
            value={{
                loading,
                setLoading,
                view,
                setView,
                event,
                setEvent,
                events,
                setEvents,
                calendarRef,
                values,
                errors,
                handleChange,
                handleResize,
                handleDateSelect,
                handleEventClick,
                handleEventDrop,
                handleEventResize,
                handleCreate,
                renderEventContent,
            }}
        >
            <Outlet />
        </CalendarContext.Provider>
    );
};

export default CalendarContext;
