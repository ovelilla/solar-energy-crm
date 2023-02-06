import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import useFixedCosts from "@features/dashboard/management/fixed-costs/hooks/useFixedCosts";
import { Form, Group, Title, Field, Label } from "./styles";

const Factors = () => {
    const { loading, disabled, values, errors, handleChange, updateFixedCosts } = useFixedCosts();

    return (
        <Form>
            <Group>
                <Title>Coeficientes</Title>

                <Field>
                    <Label>Index</Label>
                    <TextField
                        name="index"
                        value={values.index}
                        onChange={handleChange}
                        placeholder="Index"
                        error={errors.index.length > 0}
                        helperText={errors.index}
                    />
                </Field>

                <Field>
                    <Label>Precio neto</Label>
                    <TextField
                        name="netPrice"
                        value={values.netPrice}
                        onChange={handleChange}
                        placeholder="Precio neto"
                        error={errors.netPrice.length > 0}
                        helperText={errors.netPrice}
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

export default Factors;
