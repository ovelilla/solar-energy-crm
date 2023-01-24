import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Form, Group, Title, Field, Label } from "./styles";

const Installation = () => {
    return (
        <Form>
            <Group>
                <Title>Parametros de la instalalción</Title>

                <Field>
                    <Label>Orientación cubierta</Label>
                    <OutlinedInput id="orientation" placeholder="Orientación" />
                </Field>

                <Field>
                    <Label>Tipología instalación</Label>
                    <OutlinedInput id="installationType" placeholder="Tipología instalación" />
                </Field>

                <Field>
                    <Label>Zona instalación</Label>
                    <OutlinedInput id="installationZone" placeholder="Zona instalación" />
                </Field>

                <Field>
                    <Label>Hábitos de consumo</Label>
                    <OutlinedInput id="consumptionHabits" placeholder="Hábitos de consumo" />
                </Field>

                <Field>
                    <Label>Almacenamiento</Label>
                    <OutlinedInput id="storage" placeholder="Almacenamiento" />
                </Field>
            </Group>
        </Form>
    );
};

export default Installation;
