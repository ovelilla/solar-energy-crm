import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const BatteriesContext = createContext();

export const BatteriesProvider = () => {
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
    const [battery, setBattery] = useState(null);
    const [batteries, setBatteries] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        description: "",
        capacity: "",
        modules: "",
        price: "",
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setBattery(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setBattery(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setBattery(null);
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
            setBattery(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readBatteries = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/battery", {
                withCredentials: true,
            });
            setBatteries(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createBattery = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/battery", values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Batería creada!",
                message: "Se ha creado la batería correctamente.",
                type: "success",
                timeout: 3000,
            });
            setBatteries([...batteries, data.battery]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateBattery = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/battery/${battery._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Batería actualizada!",
                message: "Se ha actualizado la batería correctamente.",
                type: "success",
                timeout: 3000,
            });
            setBatteries([
                ...batteries.map((o) => (o._id === data.battery._id ? data.battery : o)),
            ]);
            setBattery(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteBattery = async (id) => {
        const confirm = await question({
            title: "¿Eliminar batería?",
            message:
                "¿Estás seguro de que deseas eliminar la batería? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/battery/${battery._id}`, {
                withCredentials: true,
            });
            await alert({
                title: "¡Batería eliminada!",
                message: "Se ha eliminado la batería correctamente.",
                type: "success",
                timeout: 3000,
            });
            setBatteries([...batteries.filter((o) => o._id !== battery._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setBattery(null);
            reset();
        }
    };

    const deleteBatteries = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "baterías" : "batería"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "las baterías" : "la batería"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(
                `/battery`,
                { data: { ids: selected } },
                {
                    withCredentials: true,
                }
            );
            await alert({
                title: `¡Batería${selected.length > 1 ? "es" : ""} eliminada${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado la${
                    selected.length > 1 ? "s" : ""
                } batería${selected.length > 1 ? "es" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setBatteries([...batteries.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <BatteriesContext.Provider
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
                battery,
                setBattery,
                batteries,
                setBatteries,
                readBatteries,
                createBattery,
                updateBattery,
                deleteBattery,
                deleteBatteries,
                values,
                errors,
                handleChange,
            }}
        >
            <Outlet />
        </BatteriesContext.Provider>
    );
};

export default BatteriesContext;
