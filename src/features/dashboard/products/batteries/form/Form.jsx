import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import useBatteries from "@features/dashboard/products/batteries/hooks/useBatteries";
import { FormStyled } from "./styles";

const Form = () => {
    const { values, errors, handleChange } = useBatteries();

    return (
        <FormStyled>
            <TextField
                id="description"
                label="Descripción"
                name="description"
                type="text"
                value={values.description}
                error={errors.description.length > 0}
                helperText={errors.description}
                onChange={handleChange}
            />

            <TextField
                id="capacity"
                label="Capacidad"
                name="capacity"
                type="text"
                value={values.capacity}
                error={errors.capacity.length > 0}
                helperText={errors.capacity}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">kWh</InputAdornment>,
                }}
            />

            <TextField
                id="modules"
                label="Módulos"
                name="modules"
                type="text"
                value={values.modules}
                error={errors.modules.length > 0}
                helperText={errors.modules}
                onChange={handleChange}
            />

            <TextField
                id="price"
                label="Precio"
                name="price"
                type="text"
                value={values.price}
                error={errors.price.length > 0}
                helperText={errors.price}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">€</InputAdornment>,
                }}
            />
        </FormStyled>
    );
};

export default Form;
