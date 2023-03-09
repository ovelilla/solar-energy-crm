import { Column, Weekday, Day, DayButton, Row } from "./styles";

const DayHeaderContent = (arg) => {
    if (arg.view.type === "dayGridMonth") {
        return <Weekday>{arg.text}</Weekday>;
    }

    if (arg.view.type === "timeGridWeek") {
        const weekday = arg.date.toLocaleString("es-ES", { weekday: "short" });
        const day = arg.date.toLocaleString("es-ES", { day: "numeric" });

        return (
            <Column>
                <Weekday>{weekday}</Weekday>
                <DayButton
                    size="medium"
                    selected={arg.isToday}
                    onClick={() => {
                        arg.view.calendar.changeView("timeGridDay", arg.date);
                    }}
                >
                    {day}
                </DayButton>
            </Column>
        );
    }

    if (arg.view.type === "listWeek") {
        const weekday = arg.date.toLocaleString("es-ES", { weekday: "short" });
        const day = arg.date.toLocaleString("es-ES", { day: "numeric" });

        console.log(arg);
        return (
            <Row>
                <Weekday>{arg.text}</Weekday>
                <Day>{day}</Day>
            </Row>
        );
    }
};

export default DayHeaderContent;
