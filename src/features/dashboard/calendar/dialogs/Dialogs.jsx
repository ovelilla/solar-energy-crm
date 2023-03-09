import Dialog from "@features/ui/dialog";
import FormEvent from "@features/dashboard/calendar/form";
import FormLabel from "@features/dashboard/calendar/labels/form";
import Preview from "@features/dashboard/calendar/preview";
import Confirm from "@features/ui/confirm";
import Alert from "@features/ui/alert";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";

const Dialogs = () => {
    const {
        stateDialogCreateEvent,
        setStateDialogCreateEvent,
        stateDialogUpdateEvent,
        setStateDialogUpdateEvent,
        stateDialogCreateLabel,
        setStateDialogCreateLabel,
        stateDialogUpdateLabel,
        setStateDialogUpdateLabel,
        stateCalendar,
        setStateCalendar,
        resetFormEvent,
        stateLabel,
        setStateLabel,
        resetFormLabel,
        createEvent,
        updateEvent,
        createLabel,
        updateLabel,
    } = useCalendar();

    const handleCloseDialogEvent = () => {
        setStateCalendar({ ...stateCalendar, event: null });
        resetFormEvent();
    };

    const handleCloseDialogLabel = () => {
        setStateLabel({ ...stateLabel, label: null });
        resetFormLabel();
    };

    return (
        <>
            <Dialog
                state={stateDialogCreateEvent}
                setState={setStateDialogCreateEvent}
                title={"Crear evento"}
                action={"Crear"}
                onClick={createEvent}
                onClose={handleCloseDialogEvent}
            >
                <FormEvent />
            </Dialog>

            <Dialog
                state={stateDialogUpdateEvent}
                setState={setStateDialogUpdateEvent}
                title={"Actualizar evento"}
                action={"Actualizar"}
                onClick={updateEvent}
                onClose={handleCloseDialogEvent}
            >
                <FormEvent />
            </Dialog>

            <Dialog
                state={stateDialogCreateLabel}
                setState={setStateDialogCreateLabel}
                title={"Crear etiqueta"}
                action={"Crear"}
                onClick={createLabel}
                onClose={handleCloseDialogLabel}
            >
                <FormLabel />
            </Dialog>

            <Dialog
                state={stateDialogUpdateLabel}
                setState={setStateDialogUpdateLabel}
                title={"Actualizar etiqueta"}
                action={"Actualizar"}
                onClick={updateLabel}
                onClose={handleCloseDialogLabel}
            >
                <FormLabel />
            </Dialog>

            <Preview />

            <Confirm />

            <Alert />
        </>
    );
};

export default Dialogs;
