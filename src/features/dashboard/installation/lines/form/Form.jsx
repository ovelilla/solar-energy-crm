import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import useLines from "@features/dashboard/installation/lines/hooks/useLines";
import { FormStyled } from "./styles";

const Form = () => {
    const { values, errors, handleChange } = useLines();

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
                label="Potencia mínima"
                name="minPower"
                type="text"
                value={values.minPower}
                error={errors.minPower.length > 0}
                helperText={errors.minPower}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">W</InputAdornment>,
                }}
            />

            <TextField
                label="Potencia máxima"
                name="maxPower"
                type="text"
                value={values.maxPower}
                error={errors.maxPower.length > 0}
                helperText={errors.maxPower}
                onChange={handleChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">W</InputAdornment>,
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
