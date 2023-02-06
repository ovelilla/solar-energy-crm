import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import useMeters from "@features/dashboard/products/meters/hooks/useMeters";
import { FormStyled, Row } from "./styles";

const Form = () => {
    const { values, errors, handleChange } = useMeters();

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

            <Row>
                <TextField
                    label="Paneles mínimos"
                    name="minPanels"
                    type="text"
                    value={values.minPanels}
                    error={errors.minPanels.length > 0}
                    helperText={errors.minPanels}
                    onChange={handleChange}
                />

                <TextField
                    label="Paneles máximos"
                    name="maxPanels"
                    type="text"
                    value={values.maxPanels}
                    error={errors.maxPanels.length > 0}
                    helperText={errors.maxPanels}
                    onChange={handleChange}
                />
            </Row>

            <FormControl error={errors.current.length > 0}>
                <InputLabel id="current">Corriente</InputLabel>
                <Select
                    labelId="current"
                    label="Corriente"
                    id="current"
                    name="current"
                    value={values.current}
                    onChange={handleChange}
                >
                    <MenuItem value={"Monofásico"}>Monofásico</MenuItem>
                    <MenuItem value={"Trifásico"}>Trifásico</MenuItem>
                </Select>
                <FormHelperText>{errors.current}</FormHelperText>
            </FormControl>

            <FormControl error={errors.type.length > 0}>
                <InputLabel id="type">Tipo de instalación</InputLabel>
                <Select
                    labelId="type"
                    label="Tipo de instalación"
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                >
                    <MenuItem value={"String"}>String</MenuItem>
                    <MenuItem value={"Microinversor"}>Microinversor</MenuItem>
                </Select>
                <FormHelperText>{errors.tytypepe}</FormHelperText>
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
