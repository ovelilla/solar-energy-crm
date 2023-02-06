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
                    <Label>IVA</Label>
                    <TextField
                        name="ivaRate"
                        placeholder="IVA"
                        value={values.ivaRate}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        error={errors.ivaRate.length > 0}
                        helperText={errors.ivaRate}
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
