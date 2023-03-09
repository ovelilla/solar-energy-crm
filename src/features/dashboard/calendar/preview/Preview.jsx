import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { Transition } from "react-transition-group";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Close, PenToSquare, TrashCan } from "@icons";
import useCalendar from "@features/dashboard/calendar/hooks/useCalendar";
import useWindowSize from "@hooks/useWindowSize";
import useOnClickOutside from "@hooks/useOnClickOutside";
import { StyledPreview, Header, Actions, Body } from "./styles";
import Info from "@features/dashboard/calendar/preview/info";

const Preview = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [positionStyle, setPositionStyle] = useState({
        top: 0,
        left: 0,
        width: "auto",
        height: "auto",
    });

    const previewRef = useRef();
    const {
        stateCalendar,
        setStateCalendar,
        statePreview,
        setStatePreview,
        stateDialogUpdateEvent,
        setStateDialogUpdateEvent,
        setFormValuesEvent,
        deleteEvent,
    } = useCalendar();
    const { isResizing, width, height } = useWindowSize();

    const getTranslate = () => {
        const translate = { x: 0, y: 0 };

        if (!stateCalendar.event) {
            return translate;
        }

        const minWidth = 320;
        const rectEvent = stateCalendar.event.el.getBoundingClientRect();
        const availableWidthLeft = rectEvent.x - 32;
        const availableWidthRight = window.innerWidth - rectEvent.x - rectEvent.width - 32;
        const isAvailableWidthLeft = availableWidthLeft > minWidth;
        const isAvailableWidthRight = availableWidthRight > minWidth;

        if (isAvailableWidthLeft) {
            translate.x = 24;
        } else if (isAvailableWidthRight || stateCalendar.event.view.type === "listWeek") {
            translate.x = -24;
        } else if (stateCalendar.event.view.type === "timeGridDay") {
            translate.y = 24;
        }

        return translate;
    };

    const transitions = {
        entering: { opacity: 1, transform: "translate(0, 0)" },
        entered: { opacity: 1, transform: "translate(0, 0)" },
        exiting: { opacity: 0, transform: "translate(0, 0)" },
        exited: {
            opacity: 0,
            transform: `translate(${getTranslate().x}px, ${getTranslate().y}px)`,
        },
    };

    const setPreviewStyles = () => {
        const rectEvent = stateCalendar.event.el.getBoundingClientRect();
        const rectPreview = previewRef.current.getBoundingClientRect();

        const minWidth = 320;
        const maxWith = 448;

        const fullscreen = window.innerWidth < maxWith + 32;
        if (fullscreen) {
            setPositionStyle({
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
            });
            return;
        }

        const availableWidthLeft = rectEvent.x - 32;
        const availableWidthRight = window.innerWidth - rectEvent.x - rectEvent.width - 32;
        const isAvailableWidthLeft = availableWidthLeft > minWidth;
        const isAvailableWidthRight = availableWidthRight > minWidth;
        const isAvailableWidth = isAvailableWidthLeft || isAvailableWidthRight;

        const availableHeightTop = rectEvent.y - 32;
        const availableHeightBottom = window.innerHeight - rectEvent.y - rectEvent.height - 32;
        const isAvailableHeightTop = availableHeightTop > rectPreview.height;
        const isAvailableHeightBottom = availableHeightBottom > rectPreview.height;
        const isAvailableHeight = isAvailableHeightTop || isAvailableHeightBottom;

        let top, left, width;
        if (
            !isAvailableWidth ||
            stateCalendar.event.view.type === "timeGridDay" ||
            stateCalendar.event.view.type === "listWeek"
        ) {
            left = (window.innerWidth - maxWith) / 2;
            width = maxWith + "px";
        } else if (isAvailableWidthLeft) {
            width = Math.min(availableWidthLeft, maxWith) + "px";
            left = rectEvent.x - Math.min(availableWidthLeft, maxWith) - 16;
        } else {
            width = Math.min(availableWidthRight, maxWith) + "px";
            left = rectEvent.x + rectEvent.width + 16;
        }

        if (
            !isAvailableHeight &&
            stateCalendar.event.view.type !== "timeGridDay" &&
            stateCalendar.event.view.type !== "listWeek"
        ) {
            top = (window.innerHeight - rectPreview.height) / 2;
        } else if (isAvailableHeightBottom) {
            top = rectEvent.y;
        } else {
            top = rectEvent.y + rectEvent.height - rectPreview.height;
        }

        setPositionStyle({ top, left, width, height: "auto" });
    };

    useEffect(() => {
        if (stateCalendar.event && previewRef.current && isMounted) {
            setPreviewStyles();
        }
    }, [stateCalendar.event, width, height]);

    const handleOnEnter = () => {
        setPreviewStyles();
        setStateCalendar({ ...stateCalendar, selectable: false });
    };

    const handleOnEntered = () => {
        setIsMounted(true);
    };

    const handleOnExited = () => {
        setIsMounted(false);
        setStateCalendar({ ...stateCalendar, selectable: true });
        setPositionStyle({
            top: 0,
            left: 0,
            width: "auto",
            height: "auto",
        });
    };

    const handleUpdate = () => {
        setFormValuesEvent({
            id: stateCalendar.event.event.id,
            title: stateCalendar.event.event.title,
            start: dayjs(stateCalendar.event.event.start),
            end: dayjs(stateCalendar.event.event.end),
            allDay: stateCalendar.event.event.allDay,
            labelId: stateCalendar.event.event.extendedProps.labelId,
            description: stateCalendar.event.event.extendedProps.description,
        });
        setStateDialogUpdateEvent({ ...stateDialogUpdateEvent, open: true });
        setStatePreview({ ...statePreview, open: false });
    };

    const handleDelete = async () => {
        deleteEvent();
    };

    const handleClose = (e) => {
        setStatePreview({ ...statePreview, open: false });
    };

    useOnClickOutside(previewRef, handleClose);

    return (
        <Transition
            nodeRef={previewRef}
            in={statePreview.open}
            timeout={300}
            mountOnEnter={true}
            unmountOnExit={true}
            onEnter={handleOnEnter}
            onEntered={handleOnEntered}
            onExited={handleOnExited}
        >
            {(state) => (
                <StyledPreview
                    ref={previewRef}
                    positionStyle={positionStyle}
                    isMounted={isMounted}
                    isResizing={isResizing}
                    style={{ ...transitions[state] }}
                >
                    <Header>
                        <Actions>
                            <Tooltip title="Editar evento">
                                <IconButton size="large" onClick={handleUpdate}>
                                    <PenToSquare />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Eliminar evento">
                                <IconButton size="large" onClick={handleDelete}>
                                    <TrashCan />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Cerrar">
                                <IconButton size="large" onClick={handleClose}>
                                    <Close />
                                </IconButton>
                            </Tooltip>
                        </Actions>
                    </Header>

                    <Body>
                        <Info />
                    </Body>
                </StyledPreview>
            )}
        </Transition>
    );
};

export default Preview;
