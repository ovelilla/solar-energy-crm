import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import useFixedCosts from "@features/dashboard/management/fixed-costs/hooks/useFixedCosts";
import { Form, Group, Title, Field, Label } from "./styles";

const Taxes = () => {
    const { loading, disabled, values, errors, handleChange, updateFixedCosts } = useFixedCosts();

    return (
        <Form>
            <Group>
                <Title>Necesidades del cliente</Title>

                <Field>
                    <Label>IVA instalacion solar</Label>
                    <TextField
                        name="ivaInstallation"
                        placeholder="IVA"
                        value={values.ivaInstallation}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        error={errors.ivaInstallation.length > 0}
                        helperText={errors.ivaInstallation}
                    />
                </Field>

                <Field>
                    <Label>IVA baterías</Label>
                    <TextField
                        name="ivaBatteries"
                        placeholder="IVA"
                        value={values.ivaBatteries}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        error={errors.ivaBatteries.length > 0}
                        helperText={errors.ivaBatteries}
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

export default Taxes;
