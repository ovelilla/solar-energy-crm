import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import usePanels from "@features/dashboard/products/panels/hooks/usePanels";
import { FormStyled } from "./styles";

const Form = () => {
    const { values, errors, handleChange } = usePanels();

    return (
        <FormStyled>
            <TextField
                label="Descripción"
                name="description"
                type="text"
                value={values.description}
                error={errors.description.length > 0}
                helperText={errors.description}
                onChange={handleChange}
            />

            <TextField
                label="Potencia"
                name="power"
                type="text"
                value={values.power}
                error={errors.power.length > 0}
                helperText={errors.power}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">W</InputAdornment>,
                }}
            />

            <TextField
                label="Garantía"
                name="warranty"
                type="text"
                value={values.warranty}
                error={errors.warranty.length > 0}
                helperText={errors.warranty}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">años</InputAdornment>,
                }}
            />

            <TextField
                label="Eficiencia"
                name="efficiency"
                type="text"
                value={values.efficiency}
                error={errors.efficiency.length > 0}
                helperText={errors.efficiency}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
            />

            <TextField
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
