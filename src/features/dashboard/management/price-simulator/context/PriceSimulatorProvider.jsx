import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const PriceSimulatorContext = createContext();

export const PriceSimulatorProvider = () => {
    const [loading, setLoading] = useState(true);
    const [panels, setPanels] = useState([]);
    const [batteries, setBatteries] = useState([]);
    const [rate, setRate] = useState(null);

    const { question, alert } = useUI();
    const { values, errors, setFormErrors, setValue, handleChange } = useForm({
        modules: "",
        installationType: "",
        current: "",
        structureType: "",
        panelId: "",
        hasBattery: false,
        batteryId: "",
    });

    const getRate = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post("/rate", values, {
                withCredentials: true,
            });
            setRate(data);

            if (values.panelId === "") {
                setValue("panelId", data.equipment.panel.id);
            }
        } catch (error) {
            setRate(null);
            setFormErrors(error.response.data.errors);
        } finally {
            setLoading(false);
        }
    };

    const readPanels = async () => {
        try {
            const { data } = await axios.get("/panel", {
                withCredentials: true,
            });
            setPanels(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readBatteries = async () => {
        try {
            const { data } = await axios.get("/battery", {
                withCredentials: true,
            });
            setBatteries(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readData = async () => {
        setLoading(true);
        await Promise.all([readPanels(), readBatteries()]);
        setLoading(false);
    };

    return (
        <PriceSimulatorContext.Provider
            value={{
                loading,
                setLoading,
                values,
                errors,
                handleChange,
                panels,
                batteries,
                readData,
                rate,
                getRate,
            }}
        >
            <Outlet />
        </PriceSimulatorContext.Provider>
    );
};

export default PriceSimulatorContext;
