import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import useInverters from "@features/dashboard/products/inverters/hooks/useInverters";
import { FormStyled, Row } from "./styles";

const Form = () => {
    const { values, errors, handleChange } = useInverters();

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

            <Row>
                <TextField
                    label="CC Mínima"
                    name="minCC"
                    type="text"
                    value={values.minCC}
                    error={errors.minCC.length > 0}
                    helperText={errors.minCC}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Wp</InputAdornment>,
                    }}
                />

                <TextField
                    label="CC Máxima"
                    name="maxCC"
                    type="text"
                    value={values.maxCC}
                    error={errors.maxCC.length > 0}
                    helperText={errors.maxCC}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Wp</InputAdornment>,
                    }}
                />
            </Row>

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

            <FormControl error={errors.type.length > 0}>
                <InputLabel id="type">Tipo de conexión</InputLabel>
                <Select
                    labelId="type"
                    label="Tipo de conexión"
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                >
                    <MenuItem value={"Monofásico"}>Monofásico</MenuItem>
                    <MenuItem value={"Trifásico"}>Trifásico</MenuItem>
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
