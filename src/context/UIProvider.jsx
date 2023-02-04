import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

const UIContext = createContext();

export const UIProvider = () => {
    const [stateConfirm, setStateConfirm] = useState({
        open: false,
        title: "",
        message: "",
        confirm: "",
        cancel: "",
        resolver: null,
    });

    const [stateAlert, setStateAlert] = useState({
        open: false,
        title: "Operación exitosa",
        message: "La operación se realizó correctamente",
        type: "success",
        timeout: 3000,
    });

    const promiseConfirm = () => {
        return new Promise((resolve) => {
            setStateConfirm((state) => ({ ...state, resolver: { resolve } }));
        });
    };

    const question = async ({ title, message, confirm, cancel }) => {
        setStateConfirm((state) => ({
            ...state,
            open: true,
            title,
            message,
            confirm,
            cancel,
        }));

        const promise = await promiseConfirm();

        return promise;
    };

    const handleClickConfirm = async (status) => {
        setStateConfirm((state) => ({ ...state, open: false }));
        stateConfirm.resolver.resolve(status);
    };

    const alert = async ({ title, message, type, timeout }) => {
        setStateAlert((state) => ({
            ...state,
            open: true,
            title,
            message,
            type,
            timeout,
        }));

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
                setStateAlert((state) => ({ ...state, open: false }));
            }, timeout);
        });
    };

    return (
        <UIContext.Provider
            value={{
                stateConfirm,
                question,
                handleClickConfirm,
                stateAlert,
                alert,
            }}
        >
            <Outlet />
        </UIContext.Provider>
    );
};

export default UIContext;
