import dayjs from "dayjs";
import { Container, Dot, Time, Title } from "./styles";

const EventContent = ({ eventInfo, statePreview }) => {
    const view = eventInfo.view.type;

    const start = dayjs(eventInfo.event.start);
    const end = dayjs(eventInfo.event.end);

    const showDot = view === "dayGridMonth" && !eventInfo.event.allDay && start.isSame(end, "day");

    const time = {
        dayGridMonth: start.format("HH:mm"),
        timeGridWeek: start.format("HH:mm") + " - " + end.format("HH:mm"),
        timeGridDay: start.format("HH:mm") + " - " + end.format("HH:mm"),
        listWeek: start.format("HH:mm") + " - " + end.format("HH:mm"),
    };

    return (
        <Container
            view={view}
            onMouseDown={(e) => {
                if (statePreview.open) {
                    e.stopPropagation();
                }
            }}
            onTouchStart={(e) => {
                if (statePreview.open) {
                    e.stopPropagation();
                }
            }}
        >
            {showDot && <Dot color={eventInfo.backgroundColor} />}
            {eventInfo.timeText.length > 0 && <Time view={view}>{time[view]}</Time>}
            <Title view={view}>{eventInfo.event.title}</Title>
        </Container>
    );
};

export default EventContent;
