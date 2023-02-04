import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import useOrientation from "@features/dashboard/parameters/orientation/hooks/useOrientation";
import { FormStyled } from "./styles";

const Form = () => {
    const { values, errors, handleChange } = useOrientation();

    return (
        <FormStyled>
            <FormControl error={errors.orientation.length > 0}>
                <InputLabel id="orientation-label">Orientación</InputLabel>
                <Select
                    labelId="orientation-label"
                    id="orientation"
                    name="orientation"
                    value={values.orientation}
                    label="Orientación"
                    onChange={handleChange}
                >
                    <MenuItem value={"Sur"}>Sur</MenuItem>
                    <MenuItem value={"Este"}>Este</MenuItem>
                    <MenuItem value={"Oeste"}>Oeste</MenuItem>
                    <MenuItem value={"Este + Oeste"}>Este + Oeste</MenuItem>
                </Select>
                {errors.orientation.length > 0 && (
                    <FormHelperText>{errors.orientation}</FormHelperText>
                )}
            </FormControl>

            <FormControl error={errors.type.length > 0}>
                <InputLabel id="type-label">Tipo</InputLabel>
                <Select
                    labelId="type-label"
                    id="type"
                    name="type"
                    value={values.type}
                    label="Tipo"
                    onChange={handleChange}
                >
                    <MenuItem value={"String"}>String</MenuItem>
                    <MenuItem value={"Microinversor"}>Microinversor</MenuItem>
                </Select>
                {errors.type.length > 0 && <FormHelperText>{errors.type}</FormHelperText>}
            </FormControl>

            <TextField
                id="performance"
                label="Rendimiento"
                name="performance"
                type="text"
                value={values.performance}
                error={errors.performance.length > 0}
                helperText={errors.performance}
                onChange={handleChange}
            />
        </FormStyled>
    );
};

export default Form;
