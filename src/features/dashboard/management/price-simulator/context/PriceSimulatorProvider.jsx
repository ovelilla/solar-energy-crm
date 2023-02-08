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
    const [meters, setMeters] = useState([]);
    const [structures, setStructures] = useState([]);
    const [lines, setLines] = useState([]);
    const [protections, setProtections] = useState([]);
    const [fixedCosts, setFixedCosts] = useState([]);

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
        current: "",
        structure: "",
        panel: "",
    });

    const readPanels = async () => {
        try {
            const { data } = await axios.get("/panel", {
                withCredentials: true,
            });
            console.log(data);
            setPanels(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readInverters = async () => {
        try {
            const { data } = await axios.get("/inverter", {
                withCredentials: true,
            });
            setInverters(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readMeters = async () => {
        try {
            const { data } = await axios.get("/meter", {
                withCredentials: true,
            });
            setMeters(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readStructures = async () => {
        try {
            const { data } = await axios.get("/structure", {
                withCredentials: true,
            });
            setMeters(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readLines = async () => {
        try {
            const { data } = await axios.get("/line", {
                withCredentials: true,
            });
            setLines(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readProtections = async () => {
        try {
            const { data } = await axios.get("/protection", {
                withCredentials: true,
            });
            setProtections(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readFixedCosts = async () => {
        try {
            const { data } = await axios.get("/fixed-costs", {
                withCredentials: true,
            });
            setFixedCosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readData = async () => {
        setLoading(true);
        await Promise.all([
            readPanels(),
            readInverters(),
            readMeters(),
            readStructures(),
            readLines(),
            readProtections(),
            readFixedCosts(),
        ]);
        setLoading(false);
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
                inverters,
                meters,
                structures,
                lines,
                protections,
                fixedCosts,
                readData,
                checkChanges,
            }}
        >
            <Outlet />
        </PriceSimulatorContext.Provider>
    );
};

export default PriceSimulatorContext;
