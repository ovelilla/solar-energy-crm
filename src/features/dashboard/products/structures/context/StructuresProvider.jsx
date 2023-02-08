import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const StructuresContext = createContext();

export const StructuresProvider = () => {
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
    const [structure, setStructure] = useState(null);
    const [structures, setStructures] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        description: "",
        type: "",
        price: "",
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setStructure(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setStructure(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setStructure(null);
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
            setStructure(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readStructures = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/structure", { withCredentials: true });
            setStructures(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createStructure = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/structure", values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Estructura creada!",
                message: "Se ha creado la estructura correctamente.",
                type: "success",
                timeout: 3000,
            });
            setStructures([...structures, data.structure]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateStructure = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/structure/${structure._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Estructura actualizada!",
                message: "Se ha actualizado la estructura correctamente.",
                type: "success",
                timeout: 3000,
            });
            setStructures([
                ...structures.map((o) => (o._id === data.structure._id ? data.structure : o)),
            ]);
            setStructure(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteStructure = async () => {
        const confirm = await question({
            title: "¿Eliminar estructura?",
            message:
                "¿Estás seguro de que deseas eliminar la estructura? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/structure/${structure._id}`, { withCredentials: true });
            await alert({
                title: "¡Estructura eliminada!",
                message: "Se ha eliminado la estructura correctamente.",
                type: "success",
                timeout: 3000,
            });
            setStructures([...structures.filter((o) => o._id !== structure._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setStructure(null);
            reset();
        }
    };

    const deleteStructures = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "estructuras" : "estructura"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "las estructuras" : "la estructura"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/structure`, { data: { ids: selected }, withCredentials: true });
            await alert({
                title: `¡Estructura${selected.length > 1 ? "es" : ""} eliminada${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado la${
                    selected.length > 1 ? "s" : ""
                } estructura${selected.length > 1 ? "es" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setStructures([...structures.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <StructuresContext.Provider
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
                structure,
                setStructure,
                structures,
                setStructures,
                readStructures,
                createStructure,
                updateStructure,
                deleteStructure,
                deleteStructures,
                values,
                errors,
                handleChange,
            }}
        >
            <Outlet />
        </StructuresContext.Provider>
    );
};

export default StructuresContext;
