import { createContext, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const CalendarContext = createContext();

const initialDialogState = {
    open: false,
    fullscreen: false,
    loading: false,
};

export const CalendarProvider = () => {
    const [stateCalendar, setStateCalendar] = useState({
        loading: true,
        view: "dayGridMonth",
        showDayHeaders: true,
        selectable: true,
        start: null,
        end: null,
        event: null,
        events: [],
    });
    const [stateDialogCreateEvent, setStateDialogCreateEvent] = useState(initialDialogState);
    const [stateDialogUpdateEvent, setStateDialogUpdateEvent] = useState(initialDialogState);
    const [stateDrawer, setStateDrawer] = useState({ open: true });
    const [stateSwipeableDrawer, setStateSwipeableDrawer] = useState({ open: false });
    const [statePreview, setStatePreview] = useState({ open: false });
    const [stateLabel, setStateLabel] = useState({
        loading: true,
        label: null,
        labels: [],
        selectedLabels: [],
    });
    const [stateDialogCreateLabel, setStateDialogCreateLabel] = useState(initialDialogState);
    const [stateDialogUpdateLabel, setStateDialogUpdateLabel] = useState(initialDialogState);

    const calendarRef = useRef();

    const { question, alert } = useUI();
    const {
        values: valuesEvent,
        errors: errorsEvent,
        handleChange: handleChangeEvent,
        setValue: setValueEvent,
        setFormValues: setFormValuesEvent,
        setFormErrors: setFormErrorsEvent,
        reset: resetFormEvent,
    } = useForm({
        title: "",
        start: null,
        end: null,
        allDay: false,
        labelId: "",
        description: "",
    });
    const {
        values: valuesLabel,
        errors: errorsLabel,
        handleChange: handleChangeLabel,
        setValue: setValueLabel,
        setFormValues: setFormValuesLabel,
        setFormErrors: setFormErrorsLabel,
        reset: resetFormLabel,
    } = useForm({
        name: "",
        description: "",
        color: "#3788d8",
    });

    dayjs.extend(duration);

    const readEvents = async () => {
        setStateCalendar((prev) => ({ ...prev, loading: true }));
        try {
            const { data } = await axios.get("/event", {
                withCredentials: true,
            });
            setStateCalendar((prev) => ({ ...prev, events: data }));
        } catch (error) {
            console.log(error);
        } finally {
            setStateCalendar((prev) => ({ ...prev, loading: false }));
        }
    };

    const createEvent = async () => {
        setStateDialogCreateEvent((prev) => ({ ...prev, loading: true }));
        try {
            const { data } = await axios.post("/event", valuesEvent, {
                withCredentials: true,
            });
            await alert({
                title: "Evento creado!",
                message: "Se ha creado el evento correctamente.",
                type: "success",
                timeout: 3000,
            });
            setStateCalendar((prev) => ({
                ...prev,
                event: null,
                events: [...prev.events, data.event],
            }));
            setStateDialogCreateEvent((prev) => ({ ...prev, open: false }));
            resetFormEvent();
        } catch (error) {
            setFormErrorsEvent(error.response.data.errors);
        } finally {
            setStateDialogCreateEvent((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateEvent = async () => {
        setStateDialogUpdateEvent((prev) => ({ ...prev, loading: true }));
        try {
            const { data } = await axios.put(
                `/event/${stateCalendar.event.event.id}`,
                valuesEvent,
                {
                    withCredentials: true,
                }
            );
            await alert({
                title: "Evento actualizado!",
                message: "Se ha actualizado el evento correctamente.",
                type: "success",
                timeout: 3000,
            });
            setStateCalendar((prev) => ({
                ...prev,
                event: null,
                events: [
                    ...stateCalendar.events.map((item) =>
                        item.id === data.event.id ? data.event : item
                    ),
                ],
            }));
            setStateDialogUpdateEvent((prev) => ({ ...prev, open: false }));
            resetFormEvent();
        } catch (error) {
            setFormErrorsEvent(error.response.data.errors);
        } finally {
            setStateDialogUpdateEvent((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateEventDrop = async (eventInfo) => {
        const { id, start, end } = eventInfo.event;

        try {
            const { data } = await axios.patch(
                `/event/${id}/drop`,
                { start, end },
                { withCredentials: true }
            );

            setStateCalendar((prev) => ({
                ...prev,
                events: [
                    ...stateCalendar.events.map((item) =>
                        item.id === data.event.id ? data.event : item
                    ),
                ],
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const updateEventResize = async (eventInfo) => {
        const { id, end } = eventInfo.event;

        try {
            const { data } = await axios.patch(
                `/event/${id}/resize`,
                { end },
                { withCredentials: true }
            );

            setStateCalendar((prev) => ({
                ...prev,
                events: [
                    ...stateCalendar.events.map((item) =>
                        item.id === data.event.id ? data.event : item
                    ),
                ],
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const deleteEvent = async () => {
        setStatePreview({ ...statePreview, open: false });

        const confirm = await question({
            title: "¿Eliminar evento?",
            message:
                "¿Estás seguro de que deseas eliminar el evento? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/event/${stateCalendar.event.event.id}`, { withCredentials: true });
            setStateCalendar((prev) => ({
                ...prev,
                events: [
                    ...prev.events.filter((item) => item._id !== stateCalendar.event.event.id),
                ],
            }));
            await alert({
                title: "Evento eliminado!",
                message: "Se ha eliminado el evento correctamente.",
                type: "success",
                timeout: 3000,
            });
            readEvents();
        } catch (error) {
            console.log(error);
        }
    };

    const readLabels = async () => {
        setStateLabel((prev) => ({ ...prev, loading: true }));
        try {
            const { data } = await axios.get("/label", { withCredentials: true });
            setStateLabel((prev) => ({ ...prev, labels: data }));
        } catch (error) {
            console.log(error);
        } finally {
            setStateLabel((prev) => ({ ...prev, loading: false }));
        }
    };

    const createLabel = async () => {
        setStateDialogCreateLabel((prev) => ({ ...prev, loading: true }));
        try {
            const { data } = await axios.post("/label", valuesLabel, {
                withCredentials: true,
            });
            await alert({
                title: "¡Etiqueta creada!",
                message: "Se ha creado la etiqueta correctamente.",
                type: "success",
                timeout: 3000,
            });
            setStateLabel((prev) => ({
                ...prev,
                label: null,
                labels: [...prev.labels, data.label],
            }));
            setStateDialogCreateLabel((prev) => ({ ...prev, open: false }));
        } catch (error) {
            setFormErrorsLabel(error.response.data.errors);
        } finally {
            setStateDialogCreateLabel((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateLabel = async () => {
        setStateDialogUpdateLabel((prev) => ({ ...prev, loading: true }));
        try {
            const { data } = await axios.put(`/label/${stateLabel.label._id}`, valuesLabel, {
                withCredentials: true,
            });
            await alert({
                title: "¡Etiqueta actualizada!",
                message: "Se ha actualizado la etiqueta correctamente.",
                type: "success",
                timeout: 3000,
            });
            setStateLabel((prev) => ({
                ...prev,
                label: null,
                labels: [
                    ...prev.labels.map((item) => (item._id === data.label._id ? data.label : item)),
                ],
            }));
            setStateDialogUpdateLabel((prev) => ({ ...prev, open: false }));
            readEvents();
        } catch (error) {
            setFormErrorsLabel(error.response.data.errors);
        } finally {
            setStateDialogUpdateLabel((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateLabelEnabled = async (id, enabled) => {
        try {
            const { data } = await axios.patch(
                `/label/${id}/enabled`,
                { enabled },
                { withCredentials: true }
            );
            setStateLabel((prev) => ({
                ...prev,
                labels: [
                    ...prev.labels.map((item) => (item._id === data.label._id ? data.label : item)),
                ],
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const updateLabelColor = async (color) => {
        try {
            const { data } = await axios.patch(
                `/label/${stateLabel.label._id}/color`,
                { color },
                { withCredentials: true }
            );
            setStateLabel((prev) => ({
                ...prev,
                labels: [
                    ...prev.labels.map((item) => (item._id === data.label._id ? data.label : item)),
                ],
            }));
            readEvents();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteLabel = async () => {
        const confirm = await question({
            title: "¿Eliminar etiqueta?",
            message:
                "¿Estás seguro de que deseas eliminar la etiqueta? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/label/${stateLabel.label._id}`, { withCredentials: true });
            setStateLabel((prev) => ({
                ...prev,
                labels: [...prev.labels.filter((item) => item._id !== stateLabel.label._id)],
            }));
            await alert({
                title: "Etiqueta eliminada!",
                message: "Se ha eliminado la etiqueta correctamente.",
                type: "success",
                timeout: 3000,
            });
            readEvents();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CalendarContext.Provider
            value={{
                stateCalendar,
                setStateCalendar,

                stateDialogCreateEvent,
                setStateDialogCreateEvent,
                stateDialogUpdateEvent,
                setStateDialogUpdateEvent,
                stateDialogCreateLabel,
                setStateDialogCreateLabel,
                stateDialogUpdateLabel,
                setStateDialogUpdateLabel,

                stateLabel,
                setStateLabel,

                statePreview,
                setStatePreview,
                stateDrawer,
                setStateDrawer,
                stateSwipeableDrawer,
                setStateSwipeableDrawer,

                calendarRef,

                valuesEvent,
                errorsEvent,
                handleChangeEvent,
                setValueEvent,
                setFormValuesEvent,
                setFormErrorsEvent,
                resetFormEvent,

                valuesLabel,
                errorsLabel,
                handleChangeLabel,
                setValueLabel,
                setFormValuesLabel,
                setFormErrorsLabel,
                resetFormLabel,

                readEvents,
                createEvent,
                updateEvent,
                updateEventDrop,
                updateEventResize,
                deleteEvent,
                readLabels,
                createLabel,
                updateLabel,
                updateLabelEnabled,
                updateLabelColor,
                deleteLabel,
            }}
        >
            <Outlet />
        </CalendarContext.Provider>
    );
};

export default CalendarContext;
