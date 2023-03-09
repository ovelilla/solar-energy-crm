import { Column, Weekday, Day, DayButton } from "../all-day-content/styles";

const AllDayContent = (arg) => {
    const date = arg.view.calendar.getDate();

    const weekday = date.toLocaleString("es-ES", { weekday: "short" });
    const day = date.toLocaleString("es-ES", { day: "numeric" });

    if (arg.view.type === "timeGridDay") {
        return (
            <Column>
                <Weekday>{weekday}</Weekday>
                <DayButton
                    size="medium"
                    selected={arg.isToday}
                    onClick={() => {
                        arg.view.calendar.changeView("listWeek", arg.date);
                    }}
                >
                    {day}
                </DayButton>
            </Column>
        );
    }

    if (arg.view.type === "listWeek") {
        return <>Todo el día</>;
    }
};

export default AllDayContent;
