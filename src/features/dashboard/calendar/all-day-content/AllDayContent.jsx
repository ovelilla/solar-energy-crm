import { Column, Weekday, Day } from "../all-day-content/styles";

const Body = (arg) => {
    const date = arg.view.calendar.getDate();

    const weekday = date.toLocaleString("es-ES", { weekday: "short" });
    const day = date.toLocaleString("es-ES", { day: "numeric" });

    return (
        <Column>
            <Weekday>{weekday}</Weekday>
            <Day>{day}</Day>
        </Column>
    );
};

export default Body;
