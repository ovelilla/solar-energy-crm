import { StyledIconButton } from "./styles";

const DayCellContent = (arg) => {
    const handleClick = (e) => {
        const calendarApi = arg.view.calendar;
        calendarApi.changeView("timeGridDay", arg.date);
    };

    return (
        <StyledIconButton size="small" onClick={handleClick}>
            {arg.dayNumberText}
        </StyledIconButton>
    );
};

export default DayCellContent;
