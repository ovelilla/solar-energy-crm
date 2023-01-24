import TextField from "@mui/material/TextField";
import OutlinedInput from '@mui/material/OutlinedInput';
import { Form, Group, Title, Field, Label } from "./styles";

const Requirements = () => {
    return (
        <Form>
            <Group>
                <Title>Necesidades del cliente</Title>

                <Field>
                    <Label>Cobertura estimada (cantidad de energia)</Label>
                    <OutlinedInput id="estimatedCoverage" placeholder="Cobertura estimada" />
                </Field>
            </Group>
        </Form>
    );
};

export default Requirements;
