import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const FixedCostsContext = createContext();

export const FixedCostsProvider = () => {
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [predefined, setFixedCosts] = useState(null);

    const { question, alert } = useUI();
    const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
        additionalString: "",
        PMCost: "",
        transports: "",
        legalization: "",
        fees: "",
        technicalVisit: "",
        acquisitionCosts: "",
        operatingCosts: "",
        maintenanceCost: "",
        index: "",
        netPrice: "",
        ivaRate: "",
    });

    const readFixedCosts = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get("/fixed-costs", {
                withCredentials: true,
            });
            setFixedCosts(data);
            setFormValues(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const createFixedCosts = async () => {
        setLoading(true);

        try {
            const { data } = await axios.post("/fixed-costs", values, {
                withCredentials: true,
            });
            await alert({
                title: "Costes fijos creados!",
                message: "Se han creado los costes fijos correctamente.",
                type: "success",
                timeout: 3000,
            });
            setFixedCosts(data.predefined);
            setFormValues(data.predefined);
        } catch (error) {
            setFormErrors(error.response.data.errors);
        } finally {
            setLoading(false);
        }
    };

    const updateFixedCosts = async () => {
        setLoading(true);

        try {
            const { data } = await axios.put(`/fixed-costs/${predefined._id}`, values, {
                withCredentials: true,
            });
            await alert({
                title: "Costes fijos actualizados!",
                message: "Se han actualizado los costes fijos correctamente.",
                type: "success",
                timeout: 3000,
            });
            setFixedCosts(data.predefined);
            setFormValues(data.predefined);
        } catch (error) {
            console.log(error);
            setFormErrors(error.response.data.errors);
        } finally {
            setLoading(false);
        }
    };

    const deleteFixedCosts = async () => {
        const confirm = await question({
            title: "¿Eliminar costes fijos?",
            message:
                "¿Estás seguro de que deseas eliminar los costes fijos? Los datos no podrán ser recuperados.",
            confirm: "Eliminar",
            cancel: "Cancelar",
        });

        if (!confirm) {
            return;
        }

        try {
            await axios.delete(`/fixed-costs/${predefined._id}`, { withCredentials: true });
            await alert({
                title: "Costes fijos eliminados!",
                message: "Se han eliminado los costes fijos correctamente.",
                type: "success",
                timeout: 3000,
            });
            setFixedCosts(null);
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
        <FixedCostsContext.Provider
            value={{
                loading,
                setLoading,
                disabled,
                setDisabled,
                predefined,
                setFixedCosts,
                values,
                errors,
                handleChange,
                readFixedCosts,
                createFixedCosts,
                updateFixedCosts,
                deleteFixedCosts,
                checkChanges,
            }}
        >
            <Outlet />
        </FixedCostsContext.Provider>
    );
};

export default FixedCostsContext;
