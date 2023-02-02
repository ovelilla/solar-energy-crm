import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import useHabit from "@features/dashboard/parameters/habit/hooks/useHabit";
import { FormStyled } from "./styles";

const Form = () => {
    const { values, errors, handleChange } = useHabit();

    return (
        <FormStyled>
            <FormControl error={errors.battery.length > 0}>
                <InputLabel id="battery-label">Batería</InputLabel>
                <Select
                    labelId="battery-label"
                    id="battery"
                    name="battery"
                    value={values.battery}
                    label="Batería"
                    onChange={handleChange}
                >
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
                {errors.battery.length > 0 && <FormHelperText>{errors.battery}</FormHelperText>}
            </FormControl>

            <FormControl error={errors.habit.length > 0}>
                <InputLabel id="habit-label">Hábito de consumo</InputLabel>
                <Select
                    labelId="habit-label"
                    id="habit"
                    name="habit"
                    value={values.habit}
                    label="Hábito de consumo"
                    onChange={handleChange}
                >
                    <MenuItem value={"Mañana"}>Mañanas</MenuItem>
                    <MenuItem value={"Mediodía"}>Mediodía</MenuItem>
                    <MenuItem value={"Tarde-noche"}>Tarde-noche</MenuItem>
                </Select>
                {errors.habit.length > 0 && <FormHelperText>{errors.habit}</FormHelperText>}
            </FormControl>
            
            <TextField
                id="selfConsumption"
                label="Rendimiento"
                name="selfConsumption"
                type="text"
                value={values.selfConsumption}
                error={errors.selfConsumption.length > 0}
                helperText={errors.selfConsumption}
                onChange={handleChange}
            />
        </FormStyled>
    );
};

export default Form;
