import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Form, Group, Title, Field, Label } from "./styles";

const Consumption = () => {
    return (
        <Form>
            <Group>
                <Title>Extracción de datos</Title>

                <Field>
                    <Label>€/ última factua</Label>
                    <OutlinedInput id="consumption" placeholder="Consumo" />
                </Field>

                <Field>
                    <Label>Kwh consumidos ultima factura</Label>
                    <OutlinedInput id="kWhConsumed" placeholder=" kWh consumidos" />
                </Field>

                <Field>
                    <Label>Consumo mensual (dividir en 12)</Label>
                    <OutlinedInput id="monthlyConsumption" placeholder="Consumo mensual" />
                </Field>

                <Field>
                    <Label>Potencia contratada en kW</Label>
                    <OutlinedInput id="contractedPower" placeholder="Potencia contratada" />
                </Field>

                <Field>
                    <Label>Precio medio kW potencia contratada (anual)</Label>
                    <OutlinedInput id="kWhPrice" placeholder="Precio kWh" />
                </Field>

                <Field>
                    <Label>IVA aplicado en facturas</Label>
                    <OutlinedInput id="iva" placeholder="IVA" />
                </Field>
            </Group>
        </Form>
    );
};

export default Consumption;
