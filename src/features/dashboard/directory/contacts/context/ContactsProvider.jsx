import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const ContactsContext = createContext();

export const ContactsProvider = () => {
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
    const [contact, setContact] = useState(null);
    const [contacts, setContacts] = useState([]);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        name: "",
        surname: "",
        email: "",
        phone: "",
    });

    const handleOpenMenu = (e, params) => {
        e.stopPropagation();
        setStateMenu({ open: true, anchor: e.currentTarget });
        setContact(params.row);
        setFormValues(params.row);
    };

    const handleCloseMenu = () => {
        setStateMenu({ open: false, anchor: null });
        setContact(null);
        reset();
    };

    const handleClickMenu = () => {
        setStateMenu({ open: false, anchor: null });
    };

    const handleOpenCreate = () => {
        setContact(null);
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
            setContact(null);
            reset();
        }
    };

    const handleFullscreenDialog = () => {
        setStateCreate({ ...stateCreate, fullscreen: !stateCreate.fullscreen });
        setStateUpdate({ ...stateUpdate, fullscreen: !stateUpdate.fullscreen });
    };

    const readContacts = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/contact", {
                withCredentials: true,
            });
            setContacts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createContact = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        console.log(values);

        try {
            const { data } = await axios.post("/contact", values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Contacto creado!",
                message: "Se ha creado el contacto correctamente.",
                type: "success",
                timeout: 3000,
            });
            setContacts([...contacts, data.contact]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateContact = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/contact/${contact._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Contacto actualizado!",
                message: "Se ha actualizado el contacto correctamente.",
                type: "success",
                timeout: 3000,
            });
            setContacts([...contacts.map((o) => (o._id === data.contact._id ? data.contact : o))]);
            setContact(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteContact = async () => {
        const confirm = await question({
            title: "¿Eliminar contacto?",
            message:
                "¿Estás seguro de que deseas eliminar el contacto? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/contact/${contact._id}`, {
                withCredentials: true,
            });
            await alert({
                title: "¡Contacto eliminado!",
                message: "Se ha eliminado el contacto correctamente.",
                type: "success",
                timeout: 3000,
            });
            setContacts([...contacts.filter((o) => o._id !== contact._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setContact(null);
            reset();
        }
    };

    const deleteContacts = async () => {
        const confirm = await question({
            title: `¿Eliminar ${selected.length > 1 ? "contactos" : "contacto"}?`,
            message: `¿Estás seguro de que deseas eliminar ${
                selected.length > 1 ? "los contactos" : "el contacto"
            }? Los datos no podrán ser recuperados.`,
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/contact`, { data: { ids: selected }, withCredentials: true });
            await alert({
                title: `¡Contacto${selected.length > 1 ? "es" : ""} eliminado${
                    selected.length > 1 ? "s" : ""
                }!`,
                message: `Se ha${selected.length > 1 ? "n" : ""} eliminado lo${
                    selected.length > 1 ? "s" : ""
                } contacto${selected.length > 1 ? "es" : ""} correctamente.`,
                type: "success",
                timeout: 3000,
            });
            setContacts([...contacts.filter((o) => !selected.includes(o._id))]);
        } catch (error) {
            console.log(error);
        } finally {
            setSelected([]);
        }
    };

    return (
        <ContactsContext.Provider
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
                contact,
                setContact,
                contacts,
                setContacts,
                readContacts,
                createContact,
                updateContact,
                deleteContact,
                deleteContacts,
                values,
                errors,
                handleChange,
            }}
        >
            <Outlet />
        </ContactsContext.Provider>
    );
};

export default ContactsContext;
