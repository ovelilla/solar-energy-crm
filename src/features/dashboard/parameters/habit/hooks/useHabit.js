import { useContext } from "react";
import HabitContext from "@features/dashboard/parameters/habit/context/HabitProvider";

const useHabit = () => {
    return useContext(HabitContext);
};

export default useHabit;
