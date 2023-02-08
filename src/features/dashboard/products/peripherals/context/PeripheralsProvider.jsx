import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const PeripheralsContext = createContext();

export const PeripheralsProvider = () => {
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
    const [peripheral, setPeripheral] = useState(null);
    const [peripherals, setPeripherals] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        description: "",
        type: "",
        current: "",
        price: "",
        active: false,
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setPeripheral(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setPeripheral(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setPeripheral(null);
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
            setPeripheral(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readPeripherals = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/peripheral", {
                withCredentials: true,
            });
            setPeripherals(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createPeripheral = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/peripheral", values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Periférico creado!",
                message: "Se ha creado el periférico correctamente.",
                type: "success",
                timeout: 3000,
            });
            setPeripherals([...peripherals, data.peripheral]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updatePeripheral = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/peripheral/${peripheral._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Periférico actualizado!",
                message: "Se ha actualizado el periférico correctamente.",
                type: "success",
                timeout: 3000,
            });
            setPeripherals([...peripherals.map((o) => (o._id === data.peripheral._id ? data.peripheral : o))]);
            setPeripheral(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateActive = async (id) => {
        try {
            const { data } = await axios.put(`/peripheral/${id}/active`, {}, { withCredentials: true });
            setPeripherals(data.peripherals);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePeripheral = async () => {
        const confirm = await question({
            title: "¿Eliminar periférico?",
            message:
                "¿Estás seguro de que deseas eliminar el periférico? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/peripheral/${peripheral._id}`, { withCredentials: true });
            await alert({
                title: "¡Periférico eliminado!",
                message: "Se ha eliminado el periférico correctamente.",
                type: "success",
                timeout: 3000,
            });
            setPeripherals([...peripherals.filter((o) => o._id !== peripheral._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setPeripheral(null);
            reset();
        }
    };

    const deletePeripherals = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "periféricos" : "periférico"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "los periféricos" : "el periférico"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/peripheral`, { data: { ids: selected }, withCredentials: true });
            await alert({
                title: `¡Periférico${selected.length > 1 ? "s" : ""} eliminado${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado lo${
                    selected.length > 1 ? "s" : ""
                } periférico${selected.length > 1 ? "s" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setPeripherals([...peripherals.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <PeripheralsContext.Provider
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
                peripheral,
                setPeripheral,
                peripherals,
                setPeripherals,
                readPeripherals,
                createPeripheral,
                updatePeripheral,
                updateActive,
                deletePeripheral,
                deletePeripherals,
                values,
                errors,
                handleChange,
            }}
        >
            <Outlet />
        </PeripheralsContext.Provider>
    );
};

export default PeripheralsContext;
