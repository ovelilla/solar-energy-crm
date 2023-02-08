import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useStructures from "@features/dashboard/products/structures/hooks/useStructures";
import { FormStyled } from "./styles";

const Form = () => {
    const { values, errors, handleChange } = useStructures();

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

            <FormControl error={errors.type.length > 0}>
                <InputLabel id="type">Tipo</InputLabel>
                <Select
                    labelId="type"
                    label="Tipo"
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                >
                    <MenuItem value={"Coplanar"}>Coplanar</MenuItem>
                    <MenuItem value={"Inclinada"}>Inclinada</MenuItem>
                </Select>
                <FormHelperText>{errors.type}</FormHelperText>
            </FormControl>

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
