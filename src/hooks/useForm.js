import { useState } from "react";

export const useForm = ({
    validate,
    initialState,
    eventSubmit,
    navigate = null,
}) => {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        ...initialState,
    });

    const [errorsValidation, setErrorsValidation] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorsValidation(validate(values));
        if (Object.keys(validate(values)).length === 0) {
            eventSubmit(values, navigate, setLoading);
        }
    };

    return {
        handleChange,
        values,
        handleSubmit,
        errorsValidation,
        loading,
        setValues,
        setErrorsValidation,
    };
};