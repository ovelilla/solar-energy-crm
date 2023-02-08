import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import useProtections from "@features/dashboard/installation/protections/hooks/useProtections";
import { FormStyled } from "./styles";

const Form = () => {
    const { values, errors, handleChange } = useProtections();

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

            <FormControl error={errors.protectionType.length > 0}>
                <InputLabel id="protectionType">Tipo protección</InputLabel>
                <Select
                    labelId="protectionType"
                    label="Tipo protección"
                    id="protectionType"
                    name="protectionType"
                    value={values.protectionType}
                    onChange={handleChange}
                >
                    <MenuItem value={"AC"}>AC</MenuItem>
                    <MenuItem value={"DC"}>DC</MenuItem>
                </Select>
                <FormHelperText>{errors.protectionType}</FormHelperText>
            </FormControl>

            <FormControl error={errors.installationType.length > 0}>
                <InputLabel id="installationType">Tipo instalación</InputLabel>
                <Select
                    labelId="installationType"
                    label="Tipo instalación"
                    id="installationType"
                    name="installationType"
                    value={values.installationType}
                    onChange={handleChange}
                >
                    <MenuItem value={"Todo"}>Todo</MenuItem>
                    <MenuItem value={"String"}>String</MenuItem>
                    <MenuItem value={"Microinversor"}>Microinversor</MenuItem>
                </Select>
                <FormHelperText>{errors.installationType}</FormHelperText>
            </FormControl>

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
                    <MenuItem value={"Todo"}>Todo</MenuItem>
                    <MenuItem value={"Monofásico"}>Monofásico</MenuItem>
                    <MenuItem value={"Trifásico"}>Trifásico</MenuItem>
                </Select>
                <FormHelperText>{errors.current}</FormHelperText>
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
