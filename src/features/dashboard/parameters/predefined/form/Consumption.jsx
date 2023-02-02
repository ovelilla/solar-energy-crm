import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import usePredefined from "@features/dashboard/parameters/predefined/hooks/usePredefined";
import { Form, Group, Title, Field, Label } from "./styles";

const Consumption = () => {
    const { values, handleChange } = usePredefined();

    return (
        <Form>
            <Group>
                <Title>Extracción de datos</Title>

                <Field>
                    <Label>€/ última factua</Label>
                    <OutlinedInput
                        id="lastInvoiceEnergyCost"
                        placeholder="Consumo"
                        value={values.lastInvoiceEnergyCost}
                        onChange={handleChange}
                    />
                </Field>

                <Field>
                    <Label>Kwh consumidos ultima factura</Label>
                    <OutlinedInput
                        id="kWhConsumedLastBill"
                        placeholder="kWh consumidos"
                        value={values.kWhConsumedLastBill}
                        onChange={handleChange}
                    />
                </Field>

                <Field>
                    <Label>Consumo mensual (dividir en 12)</Label>
                    <OutlinedInput
                        id="MonthlyEnergyConsumption"
                        placeholder="Consumo mensual"
                        value={values.MonthlyEnergyConsumption}
                        onChange={handleChange}
                    />
                </Field>

                <Field>
                    <Label>Potencia contratada en kW</Label>
                    <OutlinedInput
                        id="contractedPowerInKW"
                        placeholder="Potencia contratada"
                        value={values.contractedPowerInKW}
                        onChange={handleChange}
                    />
                </Field>

                <Field>
                    <Label>Precio medio kW potencia contratada (anual)</Label>
                    <OutlinedInput
                        id="avgPriceKWContractedPowerAnnual"
                        placeholder="Precio kWh"
                        value={values.avgPriceKWContractedPowerAnnual}
                        onChange={handleChange}
                    />
                </Field>

                <Field>
                    <Label>IVA aplicado en facturas</Label>
                    <OutlinedInput
                        id="ivaRate"
                        placeholder="IVA"
                        value={values.ivaRate}
                        onChange={handleChange}
                    />
                </Field>
            </Group>

            <Button
                variant="contained"
                type="button"
                disabled={true}
                sx={{
                    alignSelf: "flex-end",
                }}
            >
                Guardar
            </Button>
        </Form>
    );
};

export default Consumption;










// const Consumption = () => {
//     const { values, errors, handleChange, setFormValues, setFormErrors, reset } = useForm({
//         lastInvoiceEnergyCost: "",
//         kWhConsumedLastBill: "",
//     });
//     const { values, handleChange } = usePredefined();

//     return (
//         <Form>
//             <Group>
//                 <Title>Extracción de datos</Title>

//                 <Field>
//                     <Label>€/ última factua</Label>
//                     <OutlinedInput
//                         id="lastInvoiceEnergyCost"
//                         placeholder="Consumo"
//                         value={values.lastInvoiceEnergyCost}
//                         onChange={handleChange}
//                     />
//                 </Field>

//                 <Field>
//                     <Label>Kwh consumidos ultima factura</Label>
//                     <OutlinedInput
//                         id="kWhConsumedLastBill"
//                         placeholder="kWh consumidos"
//                         value={values.kWhConsumedLastBill}
//                         onChange={handleChange}
//                     />
//                 </Field>
//             </Group>

//             <Button
//                 variant="contained"
//                 type="button"
//                 disabled={true}
//                 sx={{
//                     alignSelf: "flex-end",
//                 }}
//             >
//                 Guardar
//             </Button>
//         </Form>
//     );
// };