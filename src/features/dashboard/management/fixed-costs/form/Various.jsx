import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import useFixedCosts from "@features/dashboard/management/fixed-costs/hooks/useFixedCosts";
import { Form, Group, Title, Field, Label } from "./styles";

const Various = () => {
    const { loading, disabled, values, errors, handleChange, updateFixedCosts } = useFixedCosts();

    return (
        <Form>
            <Group>
                <Title>Varios</Title>

                <Field>
                    <Label>Varios unitario</Label>
                    <TextField
                        name="variousUnit"
                        placeholder="Varios unitario"
                        value={values.variousUnit}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.variousUnit.length > 0}
                        helperText={errors.variousUnit}
                    />
                </Field>

                <Field>
                    <Label>Varios potencia total</Label>
                    <TextField
                        name="variousPower"
                        placeholder="Varios potencia total"
                        value={values.variousPower}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.variousPower.length > 0}
                        helperText={errors.variousPower}
                    />
                </Field>

                <Field>
                    <Label>Varios número de modulos</Label>
                    <TextField
                        name="variousModules"
                        placeholder="Varios número de modulos"
                        value={values.variousModules}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.variousModules.length > 0}
                        helperText={errors.variousModules}
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

export default Various;
