import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const OrientationContext = createContext();

export const OrientationProvider = () => {
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
    const [orientation, setOrientation] = useState(null);
    const [orientations, setOrientations] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        orientation: "",
        type: "",
        performance: "",
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setOrientation(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setOrientation(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setOrientation(null);
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
            setOrientation(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readOrientations = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/orientation", {
                withCredentials: true,
            });
            setOrientations(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createOrientation = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/orientation", values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Orientación creada!",
                message: "Se ha creado la orientación correctamente.",
                type: "success",
                timeout: 3000,
            });
            setOrientations([...orientations, data.orientation]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateOrientation = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/orientation/${orientation._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Orientación actualizada!",
                message: "Se ha actualizado la orientación correctamente.",
                type: "success",
                timeout: 3000,
            });
            setOrientations([
                ...orientations.map((o) => (o._id === data.orientation._id ? data.orientation : o)),
            ]);
            setOrientation(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteOrientation = async (id) => {
        const confirm = await question({
            title: "¿Eliminar orientación?",
            message:
                "¿Estás seguro de que deseas eliminar la orientación? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/orientation/${orientation._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Orientación eliminada!",
                message: "Se ha eliminado la orientación correctamente.",
                type: "success",
                timeout: 3000,
            });
            setOrientations([...orientations.filter((o) => o._id !== orientation._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setOrientation(null);
            reset();
        }
    };

    const deleteOrientations = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "orientaciones" : "orientación"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "las orientaciones" : "la orientación"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(
                `/orientation`,
                { data: { ids: selected } },
                {
                    withCredentials: true,
                }
            );
            await alert({
                title: `¡Orientación${selected.length > 1 ? "es" : ""} eliminada${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado la${
                    selected.length > 1 ? "s" : ""
                } orientación${selected.length > 1 ? "es" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setOrientations([...orientations.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <OrientationContext.Provider
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
                orientation,
                setOrientation,
                orientations,
                setOrientations,
                readOrientations,
                createOrientation,
                updateOrientation,
                deleteOrientation,
                deleteOrientations,
                values,
                errors,
                handleChange,
            }}
        >
            <Outlet />
        </OrientationContext.Provider>
    );
};

export default OrientationContext;
