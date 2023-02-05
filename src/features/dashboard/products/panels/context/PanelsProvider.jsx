import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const PanelsContext = createContext();

export const PanelsProvider = () => {
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
    const [panel, setPanel] = useState(null);
    const [panels, setPanels] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        description: "",
        power: "",
        warranty: "",
        efficiency: "",
        price: "",
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setPanel(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setPanel(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setPanel(null);
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
            setPanel(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readPanels = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/panel", {
                withCredentials: true,
            });
            setPanels(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createPanel = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/panel", values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Panel creado!",
                message: "Se ha creado el panel correctamente.",
                type: "success",
                timeout: 3000,
            });
            setPanels([...panels, data.panel]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updatePanel = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/panel/${panel._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Panel actualizado!",
                message: "Se ha actualizado el panel correctamente.",
                type: "success",
                timeout: 3000,
            });
            setPanels([
                ...panels.map((o) => (o._id === data.panel._id ? data.panel : o)),
            ]);
            setPanel(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deletePanel = async (id) => {
        const confirm = await question({
            title: "¿Eliminar panel?",
            message:
                "¿Estás seguro de que deseas eliminar el panel? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/panel/${panel._id}`, {
                withCredentials: true,
            });
            await alert({
                title: "¡Panel eliminado!",
                message: "Se ha eliminado el panel correctamente.",
                type: "success",
                timeout: 3000,
            });
            setPanels([...panels.filter((o) => o._id !== panel._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setPanel(null);
            reset();
        }
    };

    const deletePanels = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "paneles" : "panel"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "los paneles" : "el panel"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(
                `/panel`,
                { data: { ids: selected } },
                {
                    withCredentials: true,
                }
            );
            await alert({
                title: `¡Panel${selected.length > 1 ? "es" : ""} eliminado${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado lo${
                    selected.length > 1 ? "s" : ""
                } panel${selected.length > 1 ? "es" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setPanels([...panels.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <PanelsContext.Provider
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
                panel,
                setPanel,
                panels,
                setPanels,
                readPanels,
                createPanel,
                updatePanel,
                deletePanel,
                deletePanels,
                values,
                errors,
                handleChange,
            }}
        >
            <Outlet />
        </PanelsContext.Provider>
    );
};

export default PanelsContext;
