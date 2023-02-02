import { createContext, useState } from "react";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const PredefinedContext = createContext();

export const PredefinedProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [predefined, setPredefined] = useState(null);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        lastInvoiceEnergyCost: "",
        kWhConsumedLastBill: "",
        MonthlyEnergyConsumption: "",
        contractedPowerInKW: "",
        avgPriceKWContractedPowerAnnual: "",
        ivaRate: "",
        estimatedCoverage: "",
        roofOrientation: "",
        installationType: "",
        potentialRadiationPerkWYear: "",
        consumptionHabit: "",
        battery: "",
    });

    const readPredefined = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/predefined", {
                withCredentials: true,
            });
            setPredefined(data);
            setFormValues(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createPredefined = async () => {
        setStateCreate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.post("/predefined", values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Orientación creada!",
                message: "Se ha creado la orientación correctamente.",
                type: "success",
                timeout: 3000,
            });
            setPredefined([...predefineds, data.predefined]);
            setStateCreate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateCreate((prev) => ({ ...prev, loading: false }));
        }
    };

    const updatePredefined = async () => {
        setStateUpdate((prev) => ({ ...prev, loading: true }));

        try {
            const { data } = await axios.put(`/predefined/${predefined._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Orientación actualizada!",
                message: "Se ha actualizado la orientación correctamente.",
                type: "success",
                timeout: 3000,
            });
            setPredefined([
                ...predefineds.map((o) => (o._id === data.predefined._id ? data.predefined : o)),
            ]);
            setPredefined(null);
            setStateUpdate({ open: false, fullscreen: false, loading: false });
            reset();
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setStateUpdate((prev) => ({ ...prev, loading: false }));
        }
    };

    const deletePredefined = async (id) => {
        const confirm = await question({
            title: "¿Eliminar orientacion?",
            message:
                "¿Estás seguro de que deseas eliminar la orientación? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/predefined/${predefined._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "¡Orientación eliminada!",
                message: "Se ha eliminado la orientación correctamente.",
                type: "success",
                timeout: 3000,
            });
            setPredefined([...predefineds.filter((o) => o._id !== predefined._id)]);
        } catch (error) {
            console.log(error);
        } finally {
            setPredefined(null);
            reset();
        }
    };

    return (
        <PredefinedContext.Provider
            value={{
                loading,
                setLoading,
                predefined,
                setPredefined,
                values,
                errors,
                handleChange,
                readPredefined,
                createPredefined,
                updatePredefined,
                deletePredefined,
            }}
        >
            {children}
        </PredefinedContext.Provider>
    );
};

export default PredefinedContext;
