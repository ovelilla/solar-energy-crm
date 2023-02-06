import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const PriceSimulatorContext = createContext();

export const PriceSimulatorProvider = () => {
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(true);

    const [panels, setPanels] = useState([]);
    const [inverters, setInverters] = useState([]);

    const { question, alert } = useUI();
    const {
        values,
        setValue,
        errors,
        setError,
        handleChange,
        setFormValues,
        setFormErrors,
        reset,
    } = useForm({
        modules: "",
        rate: "",
        string: "",
        current: "",
        structure: "",
        panel: "",
        inverter: "",
    });

    const readPanels = async () => {
        console.log("readPanels");
        setLoading(true);

        try {
            const { data } = await axios.get("/panel", {
                withCredentials: true,
            });
            console.log(data);
            setPanels(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
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
        <PriceSimulatorContext.Provider
            value={{
                loading,
                setLoading,
                disabled,
                setDisabled,
                values,
                setValue,
                errors,
                handleChange,
                panels,
                readPanels,
                inverters,
                readInverters,
                checkChanges,
            }}
        >
            <Outlet />
        </PriceSimulatorContext.Provider>
    );
};

export default PriceSimulatorContext;
