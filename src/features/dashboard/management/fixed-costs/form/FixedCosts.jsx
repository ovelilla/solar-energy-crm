import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import useFixedCosts from "@features/dashboard/management/fixed-costs/hooks/useFixedCosts";
import { Form, Group, Title, Field, Label } from "./styles";

const FixedCosts = () => {
    const { loading, disabled, values, errors, handleChange, updateFixedCosts } = useFixedCosts();

    return (
        <Form>
            <Group>
                <Title>Gastos fijos</Title>

                <Field>
                    <Label>Coste PM</Label>
                    <TextField
                        name="PMCost"
                        placeholder="Coste PM"
                        value={values.PMCost}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.PMCost.length > 0}
                        helperText={errors.PMCost}
                    />
                </Field>

                <Field>
                    <Label>Transportes</Label>
                    <TextField
                        name="transports"
                        placeholder="Transportes"
                        value={values.transports}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.transports.length > 0}
                        helperText={errors.transports}
                    />
                </Field>

                <Field>
                    <Label>Legalización</Label>
                    <TextField
                        name="legalization"
                        placeholder="Legalización"
                        value={values.legalization}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.legalization.length > 0}
                        helperText={errors.legalization}
                    />
                </Field>

                <Field>
                    <Label>Tasas</Label>
                    <TextField
                        name="fees"
                        placeholder="Tasas"
                        value={values.fees}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.fees.length > 0}
                        helperText={errors.fees}
                    />
                </Field>

                <Field>
                    <Label>Visita técnica</Label>
                    <TextField
                        name="technicalVisit"
                        placeholder="Visita técnica"
                        value={values.technicalVisit}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.technicalVisit.length > 0}
                        helperText={errors.technicalVisit}
                    />
                </Field>

                <Field>
                    <Label>Costes captación</Label>
                    <TextField
                        name="acquisitionCosts"
                        placeholder="Costes captación"
                        value={values.acquisitionCosts}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.acquisitionCosts.length > 0}
                        helperText={errors.acquisitionCosts}
                    />
                </Field>

                <Field>
                    <Label>Costes operaciones</Label>
                    <TextField
                        name="operatingCosts"
                        placeholder="Costes operaciones"
                        value={values.operatingCosts}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.operatingCosts.length > 0}
                        helperText={errors.operatingCosts}
                    />
                </Field>

                <Field>
                    <Label>Coste mantenimiento</Label>
                    <TextField
                        name="maintenanceCost"
                        placeholder="Coste mantenimiento"
                        value={values.maintenanceCost}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.maintenanceCost.length > 0}
                        helperText={errors.maintenanceCost}
                    />
                </Field>
            </Group>

            <LoadingButton
                variant="contained"
                type="button"
                disabled={disabled}
                loading={loading}
                onClick={updateFixedCosts}
                sx={{
                    alignSelf: "flex-end",
                }}
            >
                Guardar
            </LoadingButton>
        </Form>
    );
};

export default FixedCosts;
