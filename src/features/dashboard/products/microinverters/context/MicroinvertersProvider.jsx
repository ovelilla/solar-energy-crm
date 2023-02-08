import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const MicroinvertersContext = createContext();

export const MicroinvertersProvider = () => {
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
    const [microinverter, setMicroinverter] = useState(null);
    const [microinverters, setMicroinverters] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        description: "",
        power: "",
        minCC: "",
        maxCC: "",
        warranty: "",
        current: "",
        price: "",
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setMicroinverter(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setMicroinverter(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setMicroinverter(null);
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
            setMicroinverter(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readMicroinverters = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/microinverter", {
                withCredentials: true,
            });
            setMicroinverters(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createMicroinverter = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/microinverter", values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Microinversor creado!",
                message: "Se ha creado el microinversor correctamente.",
                type: "success",
                timeout: 3000,
            });
            setMicroinverters([...microinverters, data.microinverter]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateMicroinverter = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/microinverter/${microinverter._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Microinversor actualizado!",
                message: "Se ha actualizado el microinversor correctamente.",
                type: "success",
                timeout: 3000,
            });
            setMicroinverters([
                ...microinverters.map((o) => (o._id === data.microinverter._id ? data.microinverter : o)),
            ]);
            setMicroinverter(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteMicroinverter = async () => {
        const confirm = await question({
            title: "¿Eliminar microinversor?",
            message:
                "¿Estás seguro de que deseas eliminar el microinversor? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/microinverter/${microinverter._id}`, {
                withCredentials: true,
            });
            await alert({
                title: "¡Microinversor eliminado!",
                message: "Se ha eliminado el microinversor correctamente.",
                type: "success",
                timeout: 3000,
            });
            setMicroinverters([...microinverters.filter((o) => o._id !== microinverter._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setMicroinverter(null);
            reset();
        }
    };

    const deleteMicroinverters = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "microinversores" : "microinversor"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "los microinversores" : "el microinversor"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/microinverter`, { data: { ids: selected }, withCredentials: true });
            await alert({
                title: `¡Microinversor${selected.length > 1 ? "es" : ""} eliminado${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado lo${
                    selected.length > 1 ? "s" : ""
                } microinversor${selected.length > 1 ? "es" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setMicroinverters([...microinverters.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <MicroinvertersContext.Provider
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
                microinverter,
                setMicroinverter,
                microinverters,
                setMicroinverters,
                readMicroinverters,
                createMicroinverter,
                updateMicroinverter,
                deleteMicroinverter,
                deleteMicroinverters,
                values,
                errors,
                handleChange,
            }}
        >
            <Outlet />
        </MicroinvertersContext.Provider>
    );
};

export default MicroinvertersContext;
