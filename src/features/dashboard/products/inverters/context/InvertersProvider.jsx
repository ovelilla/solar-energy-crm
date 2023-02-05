import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const InvertersContext = createContext();

export const InvertersProvider = () => {
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
    const [inverter, setInverter] = useState(null);
    const [inverters, setInverters] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        description: "",
        power: "",
        minCC: "",
        maxCC: "",
        warranty: "",
        type: "",
        price: "",
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setInverter(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setInverter(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setInverter(null);
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
            setInverter(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readInverters = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/inverter", {
                withCredentials: true,
            });
            setInverters(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createInverter = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/inverter", values, {
                withCredentials: true,
            });
            await alert({
                title: "Inversor creado!",
                message: "Se ha creado el inversor correctamente.",
                type: "success",
                timeout: 3000,
            });
            setInverters([...inverters, data.inverter]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateInverter = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/inverter/${inverter._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "Inversor actualizado!",
                message: "Se ha actualizado el inversor correctamente.",
                type: "success",
                timeout: 3000,
            });
            setInverters([
                ...inverters.map((o) => (o._id === data.inverter._id ? data.inverter : o)),
            ]);
            setInverter(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteInverter = async (id) => {
        const confirm = await question({
            title: "¿Eliminar inversor?",
            message:
                "¿Estás seguro de que deseas eliminar el inversor? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/inverter/${inverter._id}`, {
                withCredentials: true,
            });
            await alert({
                title: "Inversor eliminado!",
                message: "Se ha eliminado el inversor correctamente.",
                type: "success",
                timeout: 3000,
            });
            setInverters([...inverters.filter((o) => o._id !== inverter._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setInverter(null);
            reset();
        }
    };

    const deleteInverters = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "inversores" : "inversor"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "los inversores" : "el inversor"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(
                `/inverter`,
                { data: { ids: selected } },
                {
                    withCredentials: true,
                }
            );
            await alert({
                title: `¡Inversor${selected.length > 1 ? "es" : ""} eliminado${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado lo${
                    selected.length > 1 ? "s" : ""
                } inversor${selected.length > 1 ? "es" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setInverters([...inverters.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <InvertersContext.Provider
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
                inverter,
                setInverter,
                inverters,
                setInverters,
                readInverters,
                createInverter,
                updateInverter,
                deleteInverter,
                deleteInverters,
                values,
                errors,
                handleChange,
            }}
        >
            <Outlet />
        </InvertersContext.Provider>
    );
};

export default InvertersContext;
