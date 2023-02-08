import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const LinesContext = createContext();

export const LinesProvider = () => {
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
    const [line, setLine] = useState(null);
    const [lines, setLines] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        description: "",
        minPower: "",
        maxPower: "",
        price: "",
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setLine(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setLine(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setLine(null);
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
            setLine(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readLines = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/line", { withCredentials: true });
            console.log(data);
            setLines(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createLine = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/line", values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Partida creada!",
                message: "Se ha creado la partida correctamente.",
                type: "success",
                timeout: 3000,
            });
            setLines([...lines, data.line]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateLine = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/line/${line._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Partida actualizada!",
                message: "Se ha actualizado la partida correctamente.",
                type: "success",
                timeout: 3000,
            });
            setLines([
                ...lines.map((o) => (o._id === data.line._id ? data.line : o)),
            ]);
            setLine(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteLine = async () => {
        const confirm = await question({
            title: "¿Eliminar partida?",
            message:
                "¿Estás seguro de que deseas eliminar la partida? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/line/${line._id}`, { withCredentials: true });
            await alert({
                title: "¡Partida eliminada!",
                message: "Se ha eliminado la partida correctamente.",
                type: "success",
                timeout: 3000,
            });
            setLines([...lines.filter((o) => o._id !== line._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setLine(null);
            reset();
        }
    };

    const deleteLines = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "partidas" : "partida"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "las partidas" : "la partida"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/line`, { data: { ids: selected }, withCredentials: true });
            await alert({
                title: `¡Partida${selected.length > 1 ? "es" : ""} eliminada${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado la${
                    selected.length > 1 ? "s" : ""
                } partida${selected.length > 1 ? "es" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setLines([...lines.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <LinesContext.Provider
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
                line,
                setLine,
                lines,
                setLines,
                readLines,
                createLine,
                updateLine,
                deleteLine,
                deleteLines,
                values,
                errors,
                handleChange,
            }}
        >
            <Outlet />
        </LinesContext.Provider>
    );
};

export default LinesContext;
