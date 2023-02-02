import { createContext, useState } from "react";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
    const [pageSize, setPageSize] = useState(20);
    const [selected, setSelected] = useState([]);
    const [stateMenu, setStateMenu] = useState({ open: false, anchor: null });
    const [stateCreate, setStateCreate] = useState({
        open: false,
        fullscreen: false,
        loading: false,
    });
    const [stateUpdate, setStateUpdate] = useState({
        open: false,
        fullscreen: false,
        loading: false,
    });
    const [loading, setLoading] = useState(false);
    const [habit, setHabit] = useState(null);
    const [habits, setHabits] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        battery: "",
        habit: "",
        selfConsumption: "",
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setHabit(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setHabit(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setHabit(null);
        reset();
        setStateCreate({ ...stateCreate, open: true });
    };

    const handleOpenUpdate = () => {
        setStateUpdate({ ...stateUpdate, open: true });
    };

    const handleCloseDialog = async () => {
        const confirm = await question({
            title: "¿Cerrar ventana?",
            message:
                "¿Estás seguro de que deseas cerrar? Los datos que no hayan sido guardados se perderán.",
            confirm: "Cerrar",
            cancel: "Cancelar",
            action: null,
        });

        if (confirm) {
            setStateCreate({ open: false, fullscreen: false, loading: false });
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            setHabit(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readHabits = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/habit", {
                withCredentials: true,
            });
            setHabits(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createHabit = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/habit", values, {
                withCredentials: true,
            });

            await alert({
                title: "¡Hábito de consumo creado!",
                message: "Se ha creado el hábito de consumo correctamente.",
                type: "success",
                timeout: 3000,
            });
            setHabits([...habits, data.habit]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateHabit = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/habit/${habit._id}`, values, {
                withCredentials: true,
            });

            await alert({
                title: "¡Hábito de consumo actualizado!",
                message: "Se ha actualizado el hábito de consumo correctamente.",
                type: "success",
                timeout: 3000,
            });
            setHabits([...habits.map((o) => (o._id === data.habit._id ? data.habit : o))]);
            setHabit(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteHabit = async (id) => {
        const confirm = await question({
            title: "¿Eliminar hábito de consumo?",
            message:
                "¿Estás seguro de que deseas eliminar el hábito de consumo? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/habit/${habit._id}`, values, {
                withCredentials: true,
            });

            await alert({
                title: "¡Hábito de consumo eliminado!",
                message: "Se ha eliminado el hábito de consumo correctamente.",
                type: "success",
                timeout: 3000,
            });
            setHabits([...habits.filter((o) => o._id !== habit._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setHabit(null);
            reset();
        }
    };

    const deleteHabits = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "hábitos" : "hábito"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "los hábitos" : "el hábito"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/habit`, { data: { ids: selected } }, {
                withCredentials: true,
            });
            await alert({
                title: `¡Habito${selected.length > 1 ? "s" : ""} eliminado${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado ${
                    selected.length > 1 ? "los" : "el"
                } hábito${selected.length > 1 ? "s" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setHabits([...habits.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <HabitContext.Provider
            value={{
                pageSize,
                setPageSize,
                selected,
                setSelected,
                stateMenu,
                handleOpenMenu,
                handleCloseMenu,
                handleClickMenu,
                stateCreate,
                stateUpdate,
                handleOpenCreate,
                handleOpenUpdate,
                handleCloseDialog,
                handleFullscreenDialog,
                loading,
                setLoading,
                habit,
                setHabit,
                habits,
                setHabits,
                readHabits,
                createHabit,
                updateHabit,
                deleteHabit,
                deleteHabits,
                values,
                errors,
                handleChange,
            }}
        >
            {children}
        </HabitContext.Provider>
    );
};

export default HabitContext;
