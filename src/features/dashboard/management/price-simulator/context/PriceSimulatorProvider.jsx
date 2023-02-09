import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "@config/axios";
import useUI from "@hooks/useUI";
import useForm from "@hooks/useForm";

const PriceSimulatorContext = createContext();

export const PriceSimulatorProvider = () => {
    const [loading, setLoading] = useState(true);
    const [panels, setPanels] = useState([]);
    const [rate, setRate] = useState(null);

    const { question, alert } = useUI();
    const { values, errors, setFormErrors, handleChange } = useForm({
        modules: "",
        installationType: "",
        current: "",
        structureType: "",
        panelId: "",
    });

    const getRate = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post("/rate", values, {
                withCredentials: true,
            });
            console.log(data);
            setRate(data);
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

    return (
        <PriceSimulatorContext.Provider
            value={{
                loading,
                setLoading,
                values,
                errors,
                handleChange,
                panels,
                readPanels,
                rate,
                getRate,
            }}
        >
            <Outlet />
        </PriceSimulatorContext.Provider>
    );
};

export default PriceSimulatorContext;
