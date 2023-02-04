import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import usePredefined from "@features/dashboard/parameters/predefined/hooks/usePredefined";
import { Form, Group, Title, Field, Label } from "./styles";

const Requirements = () => {
    const { loading, disabled, values, errors, handleChange, updatePredefined } = usePredefined();

    return (
        <Form>
            <Group>
                <Title>Necesidades del cliente</Title>

                <Field>
                    <Label>Cobertura estimada (cantidad de energia)</Label>
                    <TextField
                        name="estimatedCoverage"
                        placeholder="Cobertura estimada"
                        value={values.estimatedCoverage}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        error={errors.estimatedCoverage.length > 0}
                        helperText={errors.estimatedCoverage}
                    />
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

export default Requirements;
