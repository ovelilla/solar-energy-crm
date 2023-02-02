import { useState } from "react";

const useForm = (state = {}) => {
    const [values, setValues] = useState(state);
    const [errors, setErrors] = useState(state);

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const setFormValues = (newValues) => {
        setValues({ ...values, ...newValues });
    };

    const setFormErrors = (newErrors) => {
        setErrors({ ...errors, ...newErrors });
    };

    const reset = () => {
        setValues(state);
        setErrors(state);
    };

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleChange,
        setFormValues,
        setFormErrors,
        reset,
    };
};

export default useForm;
