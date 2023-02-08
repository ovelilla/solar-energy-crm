import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const ProtectionsContext = createContext();

export const ProtectionsProvider = () => {
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
    const [protection, setProtection] = useState(null);
    const [protections, setProtections] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        description: "",
        protectionType: "",
        installationType: "",
        current: "",
        price: "",
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setProtection(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setProtection(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setProtection(null);
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
            setProtection(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readProtections = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/protection", { withCredentials: true });
            console.log(data);
            setProtections(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createProtection = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/protection", values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Protección creada!",
                message: "Se ha creado la protección correctamente.",
                type: "success",
                timeout: 3000,
            });
            setProtections([...protections, data.protection]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateProtection = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/protection/${protection._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Protección actualizada!",
                message: "Se ha actualizado la protección correctamente.",
                type: "success",
                timeout: 3000,
            });
            setProtections([
                ...protections.map((o) => (o._id === data.protection._id ? data.protection : o)),
            ]);
            setProtection(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteProtection = async () => {
        const confirm = await question({
            title: "¿Eliminar protección?",
            message:
                "¿Estás seguro de que deseas eliminar la protección? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/protection/${protection._id}`, { withCredentials: true });
            await alert({
                title: "¡Protección eliminada!",
                message: "Se ha eliminado la protección correctamente.",
                type: "success",
                timeout: 3000,
            });
            setProtections([...protections.filter((o) => o._id !== protection._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setProtection(null);
            reset();
        }
    };

    const deleteProtections = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "protecciones" : "protección"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "las protecciones" : "la protección"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/protection`, { data: { ids: selected }, withCredentials: true });
            await alert({
                title: `¡Protección${selected.length > 1 ? "es" : ""} eliminada${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado la${
                    selected.length > 1 ? "s" : ""
                } protección${selected.length > 1 ? "es" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setProtections([...protections.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <ProtectionsContext.Provider
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
                protection,
                setProtection,
                protections,
                setProtections,
                readProtections,
                createProtection,
                updateProtection,
                deleteProtection,
                deleteProtections,
                values,
                errors,
                handleChange,
            }}
        >
            <Outlet />
        </ProtectionsContext.Provider>
    );
};

export default ProtectionsContext;
