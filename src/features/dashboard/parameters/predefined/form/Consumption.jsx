import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import usePredefined from "@features/dashboard/parameters/predefined/hooks/usePredefined";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Form, Group, Title, Field, Label } from "./styles";

const Consumption = () => {
    const { loading, disabled, values, errors, handleChange, updatePredefined } = usePredefined();

    return (
        <Form>
            <Group>
                <Title>Extracción de datos</Title>

                <Field>
                    <Label>€/ última factua</Label>
                    <TextField
                        name="lastInvoiceEnergyCost"
                        placeholder="Consumo"
                        value={values.lastInvoiceEnergyCost}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.lastInvoiceEnergyCost.length > 0}
                        helperText={errors.lastInvoiceEnergyCost}
                    />
                </Field>

                <Field>
                    <Label>kWh consumidos ultima factura</Label>
                    <TextField
                        name="kWhConsumedLastBill"
                        placeholder="kWh consumidos"
                        value={values.kWhConsumedLastBill}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kWh</InputAdornment>,
                        }}
                        error={errors.kWhConsumedLastBill.length > 0}
                        helperText={errors.kWhConsumedLastBill}
                    />
                </Field>

                <Field>
                    <Label>Consumo mensual (dividir en 12)</Label>
                    <TextField
                        name="monthlyEnergyConsumption"
                        placeholder="Consumo mensual"
                        value={values.monthlyEnergyConsumption}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kWh</InputAdornment>,
                        }}
                        error={errors.monthlyEnergyConsumption.length > 0}
                        helperText={errors.monthlyEnergyConsumption}
                    />
                </Field>

                <Field>
                    <Label>Potencia contratada en kW</Label>
                    <FormControl error={errors.contractedPowerInKW.length > 0}>
                        <Select
                            value={values.contractedPowerInKW}
                            name="contractedPowerInKW"
                            placeholder="Potencia contratada"
                            onChange={handleChange}
                            MenuProps={{
                                style: {
                                    maxHeight: 300,
                                },
                            }}
                        >
                            <ListSubheader>Monofásica</ListSubheader>
                            <MenuItem value={1.15}>Monofásica - 1.15 kW</MenuItem>
                            <MenuItem value={2.3}>Monofásica - 2.3 kW</MenuItem>
                            <MenuItem value={3.45}>Monofásica - 3.45 kW</MenuItem>
                            <MenuItem value={4.6}>Monofásica - 4.6 kW</MenuItem>
                            <MenuItem value={5.75}>Monofásica - 5.75 kW</MenuItem>
                            <MenuItem value={6.9}>Monofásica - 6.9 kW</MenuItem>
                            <MenuItem value={8.05}>Monofásica - 8.05 kW</MenuItem>
                            <MenuItem value={9.2}>Monofásica - 9.2 kW</MenuItem>
                            <MenuItem value={10.35}>Monofásica - 10.35 kW</MenuItem>
                            <MenuItem value={11.5}>Monofásica - 11.5 kW</MenuItem>
                            <MenuItem value={14.49}>Monofásica - 14.49 kW</MenuItem>
                            <ListSubheader>Trifásica</ListSubheader>
                            <MenuItem value={3.464}>Trifásica - 3.464 kW</MenuItem>
                            <MenuItem value={6.928}>Trifásica - 6.928 kW</MenuItem>
                            <MenuItem value={10.392}>Trifásica - 10.392 kW</MenuItem>
                            <MenuItem value={13.856}>Trifásica - 13.856 kW</MenuItem>
                            <MenuItem value={17.321}>Trifásica - 17.321 kW</MenuItem>
                            <MenuItem value={20.785}>Trifásica - 20.785 kW</MenuItem>
                            <MenuItem value={24.249}>Trifásica - 24.249 kW</MenuItem>
                            <MenuItem value={27.713}>Trifásica - 27.713 kW</MenuItem>
                            <MenuItem value={31.177}>Trifásica - 31.177 kW</MenuItem>
                            <MenuItem value={34.641}>Trifásica - 34.641 kW</MenuItem>
                            <MenuItem value={43.648}>Trifásica - 43.648 kW</MenuItem>
                        </Select>
                        <FormHelperText>{errors.contractedPowerInKW}</FormHelperText>
                    </FormControl>
                </Field>

                <Field>
                    <Label>Precio medio kW potencia contratada (anual)</Label>
                    <TextField
                        name="avgPriceKWContractedPowerAnnual"
                        placeholder="Precio kWh"
                        value={values.avgPriceKWContractedPowerAnnual}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kW</InputAdornment>,
                        }}
                        error={errors.avgPriceKWContractedPowerAnnual.length > 0}
                        helperText={errors.avgPriceKWContractedPowerAnnual}
                    />
                </Field>

                <Field>
                    <Label>IVA aplicado en facturas</Label>
                    <FormControl error={errors.ivaRate.length > 0}>
                        <Select
                            name="ivaRate"
                            placeholder="IVA"
                            value={values.ivaRate}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>10%</MenuItem>
                            <MenuItem value={21}>21%</MenuItem>
                        </Select>
                        <FormHelperText>{errors.ivaRate}</FormHelperText>
                    </FormControl>
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

export default Consumption;
