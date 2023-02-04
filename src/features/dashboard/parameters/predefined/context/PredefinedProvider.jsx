import { createContext, useState } from "react";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const PredefinedContext = createContext();

export const PredefinedProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [predefined, setPredefined] = useState(null);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        lastInvoiceEnergyCost: "",
        kWhConsumedLastBill: "",
        monthlyEnergyConsumption: "",
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
        setLoading(true);

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
            setPredefined(data.predefined);
            setFormValues(data.predefined);
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setLoading(false);
        }
    };

    const updatePredefined = async () => {
        setLoading(true);

        try {
            const { data } = await axios.put(`/predefined/${predefined._id}`, values, {
                withCredentials: true,
            });
            console.log(data);
            await alert({
                title: "¡Orientación actualizada!",
                message: "Se ha actualizado la orientación correctamente.",
                type: "success",
                timeout: 3000,
            });
            setPredefined(data.predefined);
            setFormValues(data.predefined);
        } catch (error) {
            console.log(error);
            setFormErrors(error.response.data.errors);
        } finally {
            setLoading(false);
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
            setPredefined(null);
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    const checkChanges = () => {
        if (!predefined) {
            return;
        }

        const isDifferent = Object.keys(values).some((key) => {
            let value = values[key];
            let predef = predefined[key];

            if (!isNaN(value) && !isNaN(predef)) {
                value = Number(value);
                predef = Number(predef);
            }

            return value !== predef;
        });

        setDisabled(!isDifferent);
    };

    return (
        <PredefinedContext.Provider
            value={{
                loading,
                setLoading,
                disabled,
                setDisabled,
                predefined,
                setPredefined,
                values,
                errors,
                handleChange,
                readPredefined,
                createPredefined,
                updatePredefined,
                deletePredefined,
                checkChanges,
            }}
        >
            {children}
        </PredefinedContext.Provider>
    );
};

export default PredefinedContext;