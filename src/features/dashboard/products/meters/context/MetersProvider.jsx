import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const MetersContext = createContext();

export const MetersProvider = () => {
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
    const [meter, setMeter] = useState(null);
    const [meters, setMeters] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        description: "",
        minPanels: "",
        maxPanels: "",
        current: "",
        type: "",
        price: "",
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setMeter(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setMeter(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setMeter(null);
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
            setMeter(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readMeters = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/meter", {
                withCredentials: true,
            });
            setMeters(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createMeter = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/meter", values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Meter creado!",
                message: "Se ha creado el meter correctamente.",
                type: "success",
                timeout: 3000,
            });
            setMeters([...meters, data.meter]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateMeter = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/meter/${meter._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Meter actualizado!",
                message: "Se ha actualizado el meter correctamente.",
                type: "success",
                timeout: 3000,
            });
            setMeters([
                ...meters.map((o) => (o._id === data.meter._id ? data.meter : o)),
            ]);
            setMeter(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteMeter = async () => {
        const confirm = await question({
            title: "¿Eliminar meter?",
            message:
                "¿Estás seguro de que deseas eliminar el meter? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/meter/${meter._id}`, {
                withCredentials: true,
            });
            await alert({
                title: "¡Meter eliminado!",
                message: "Se ha eliminado el meter correctamente.",
                type: "success",
                timeout: 3000,
            });
            setMeters([...meters.filter((o) => o._id !== meter._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setMeter(null);
            reset();
        }
    };

    const deleteMeters = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "meters" : "meter"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "los meters" : "el meter"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/meter`, { data: { ids: selected }, withCredentials: true });
            await alert({
                title: `¡Meter${selected.length > 1 ? "es" : ""} eliminado${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado lo${
                    selected.length > 1 ? "s" : ""
                } meter${selected.length > 1 ? "es" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setMeters([...meters.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <MetersContext.Provider
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
                meter,
                setMeter,
                meters,
                setMeters,
                readMeters,
                createMeter,
                updateMeter,
                deleteMeter,
                deleteMeters,
                values,
                errors,
                handleChange,
            }}
        >
            <Outlet />
        </MetersContext.Provider>
    );
};

export default MetersContext;
