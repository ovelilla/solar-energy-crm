import { useState } from "react";

const useForm = (state = {}) => {
    const [values, setValues] = useState(state);
    const [errors, setErrors] = useState(Object.fromEntries(Object.keys(state).map(key => [key, ""])));


    const handleChange = ({ target }) => {
        const { name, value } = target;

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const setValue = (name, value) => {
        setValues({ ...values, [name]: value });
    };

    const setError = (name, value) => {
        setErrors({ ...errors, [name]: value });
    };

    const setFormValues = (newValues) => {
        setValues({ ...values, ...newValues });
    };

    const setFormErrors = (newErrors) => {
        setErrors({ ...errors, ...newErrors });
    };

    const reset = () => {
        setValues(state);
        setErrors(Object.fromEntries(Object.keys(state).map(key => [key, ""])));
    };

    return {
        values,
        setValue,
        setValues,
        errors,
        setError,
        setErrors,
        handleChange,
        setFormValues,
        setFormErrors,
        reset,
    };
};

export default useForm;
