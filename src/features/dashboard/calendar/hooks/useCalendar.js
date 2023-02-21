import { useContext } from "react";
import CalendarContext from "@features/dashboard/calendar/context/CalendarProvider";

const useCalendar = () => {
    return useContext(CalendarContext);
};

export default useCalendar;
