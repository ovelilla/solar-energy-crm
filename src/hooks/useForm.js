import { useState } from "react";

const useForm = (state = {}) => {
    const [values, setValues] = useState(state);
    const [errors, setErrors] = useState(state);

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const reset = () => {
        setValues(state);
    };

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleChange,
        reset,
    };
};

export default useForm;
