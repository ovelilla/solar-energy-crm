import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import usePredefined from "@features/dashboard/parameters/predefined/hooks/usePredefined";
import { Form, Group, Title, Field, Label } from "./styles";

const Installation = () => {
    const { loading, disabled, values, errors, handleChange, updatePredefined } = usePredefined();

    return (
        <Form>
            <Group>
                <Title>Parametros de la instalalción</Title>

                <Field>
                    <Label>Orientación cubierta</Label>
                    <FormControl error={errors.roofOrientation.length > 0}>
                        <Select
                            name="roofOrientation"
                            placeholder="Orientación"
                            value={values.roofOrientation}
                            onChange={handleChange}
                        >
                            <MenuItem value={"Sur"}>Sur</MenuItem>
                            <MenuItem value={"Este"}>Este</MenuItem>
                            <MenuItem value={"Oeste"}>Oeste</MenuItem>
                            <MenuItem value={"Este-Oeste"}>Este-Oeste</MenuItem>
                        </Select>
                        <FormHelperText>{errors.roofOrientation}</FormHelperText>
                    </FormControl>
                </Field>

                <Field>
                    <Label>Inclinación</Label>
                    <TextField
                        name="slope"
                        value={values.slope}
                        onChange={handleChange}
                        placeholder="Inclinación"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">º</InputAdornment>,
                        }}
                        error={errors.slope.length > 0}
                        helperText={errors.slope}
                    />
                </Field>

                <Field>
                    <Label>Tipología instalación</Label>
                    <FormControl error={errors.installationType.length > 0}>
                        <Select
                            name="installationType"
                            placeholder="Tipología instalación"
                            value={values.installationType}
                            onChange={handleChange}
                        >
                            <MenuItem value={"String"}>String</MenuItem>
                            <MenuItem value={"Microinversor"}>Microinversor</MenuItem>
                        </Select>
                        <FormHelperText>{errors.installationType}</FormHelperText>
                    </FormControl>
                </Field>

                <Field>
                    <Label>Radiación potencial por kW/anual</Label>
                    <TextField
                        name="potentialRadiationPerkWYear"
                        value={values.potentialRadiationPerkWYear}
                        onChange={handleChange}
                        placeholder="Radiación potencial"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kW</InputAdornment>,
                        }}
                        error={errors.potentialRadiationPerkWYear.length > 0}
                        helperText={errors.potentialRadiationPerkWYear}
                    />
                </Field>

                <Field>
                    <Label>Pérdidas del sistema</Label>
                    <TextField
                        name="systemLoss"
                        value={values.systemLoss}
                        onChange={handleChange}
                        placeholder="Pérdidas del sistema"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        error={errors.systemLoss.length > 0}
                        helperText={errors.systemLoss}
                    />
                </Field>

                <Field>
                    <Label>Hábitos de consumo</Label>
                    <FormControl error={errors.consumptionHabit.length > 0}>
                        <Select
                            name="consumptionHabit"
                            placeholder="Hábitos de consumo"
                            value={values.consumptionHabit}
                            onChange={handleChange}
                        >
                            <MenuItem value={"Mañana"}>Mañana</MenuItem>
                            <MenuItem value={"Mediodía"}>Mediodía</MenuItem>
                            <MenuItem value={"Tarde-noche"}>Tarde-noche</MenuItem>
                        </Select>
                        <FormHelperText>{errors.consumptionHabit}</FormHelperText>
                    </FormControl>
                </Field>

                <Field>
                    <Label>Almacenamiento</Label>
                    <FormControl error={errors.battery.length > 0}>
                        <Select
                            name="battery"
                            placeholder="Almacenamiento"
                            value={values.battery}
                            onChange={handleChange}
                        >
                            <MenuItem value={true}>Sí</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                        <FormHelperText>{errors.battery}</FormHelperText>
                    </FormControl>
                </Field>
            </Group>

            <LoadingButton
                variant="contained"
                type="button"
                disabled={disabled}
                loading={loading}
                onClick={updatePredefined}
                sx={{
                    alignSelf: "flex-end",
                }}
            >
                Guardar
            </LoadingButton>
        </Form>
    );
};

export default Installation;
