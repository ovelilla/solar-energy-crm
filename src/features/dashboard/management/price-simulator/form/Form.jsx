import { useEffect } from "react";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import usePriceSimulator from "@features/dashboard/management/price-simulator/hooks/usePriceSimulator";
import { Form, Group } from "./styles";

const FixedCosts = () => {
    const {
        loading,
        disabled,
        values,
        setValue,
        errors,
        handleChange,
        panels,
        inverters,
        meters,
        structures,
        lines,
        protections,
        fixedCosts,
    } = usePriceSimulator();

    const strings = values.modules > 11 ? 2 : 1;
    const panel = panels.find((panel) => panel._id === values.panel) || {};
    const panelsPower = values.modules * panel.power;
    const panelsPrice = values.modules * panel.price;
    const inverter =
        inverters.find((inverter) => {
            return (
                inverter.minCC <= panelsPower &&
                inverter.maxCC >= panelsPower &&
                inverter.current === values.current
            );
        }) || {};
    const inverterPrice = inverter.price;
    const meter =
        meters.find((meter) => {
            return (
                meter.minPanels <= values.modules &&
                meter.maxPanels >= values.modules &&
                meter.type === values.rate &&
                meter.current === values.current
            );
        }) || {};
    const meterPrice = meter.price;
    const structure = structures.find((structure) => structure.type === values.structure) || {};
    const structurePrice = panelsPower * structure.price;
    const equipmentPrice = panelsPrice + inverterPrice + meterPrice + structurePrice;
    const line =
        lines.find((line) => {
            return line.minPower <= panelsPower && line.maxPower >= panelsPower;
        }) || {};
    const linePrice = line.price;
    const installationPrice = linePrice * panelsPower;
    const protectionsArray = protections.filter((protection) => {
        return protection.current === values.current && protection.type === values.rate;
    });

    console.log(fixedCosts);
    const propsToSum = [
        "PMCost",
        "transports",
        "legalization",
        "fees",
        "technicalVisit",
        "acquisitionCosts",
        "operatingCosts",
        "maintenanceCost",
        "index",
        "netPrice",
        "ivaRate",
    ];

    const sum =
        Object.entries(fixedCosts).reduce((acc, [key, value]) => {
            if (propsToSum.includes(key)) {
                acc += value;
            }
            return acc;
        }, 0) || 0;

    console.log(sum);

    return (
        <Form>
            <Group>
                <TextField
                    name="modules"
                    label="Número de Módulos"
                    value={values.modules}
                    onChange={handleChange}
                    error={errors.modules.length > 0}
                    helperText={errors.modules}
                />

                <FormControl error={errors.rate.length > 0}>
                    <InputLabel id="rate-label">Tarifa</InputLabel>
                    <Select
                        labelId="rate-label"
                        id="rate"
                        value={values.rate}
                        name="rate"
                        label="Tarifa"
                        onChange={handleChange}
                    >
                        <MenuItem value={"String"}>String</MenuItem>
                        <MenuItem value={"Microinversor"}>Microinversor</MenuItem>
                    </Select>
                    <FormHelperText>{errors.rate}</FormHelperText>
                </FormControl>

                {values.rate === "String" && (
                    <TextField name="strings" label="Strings" value={strings} disabled />
                )}

                <FormControl error={errors.current.length > 0}>
                    <InputLabel id="current-label">Corriente</InputLabel>
                    <Select
                        labelId="current-label"
                        id="current"
                        value={values.current}
                        name="current"
                        label="Corriente"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Monofásico"}>Monofásico</MenuItem>
                        <MenuItem value={"Trifásico"}>Trifásico</MenuItem>
                    </Select>
                    <FormHelperText>{errors.current}</FormHelperText>
                </FormControl>

                <FormControl error={errors.structure.length > 0}>
                    <InputLabel id="structure-label">Estructura</InputLabel>
                    <Select
                        labelId="structure-label"
                        id="structure"
                        value={values.structure}
                        name="structure"
                        label="Estructura"
                        onChange={handleChange}
                    >
                        <MenuItem value={"Coplanar"}>Coplanar</MenuItem>
                        <MenuItem value={"Inclinada"}>Inclinada</MenuItem>
                    </Select>
                    <FormHelperText>{errors.structure}</FormHelperText>
                </FormControl>

                <FormControl error={errors.panel.length > 0}>
                    <InputLabel id="panel-label">Panel</InputLabel>
                    <Select
                        labelId="panel-label"
                        id="panel"
                        value={values.panel}
                        name="panel"
                        label="Panel"
                        onChange={handleChange}
                    >
                        {panels.map((panel) => (
                            <MenuItem key={panel._id} value={panel._id}>
                                {panel.description}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.panel}</FormHelperText>
                </FormControl>

                <TextField
                    name="inverter"
                    label="Inversor"
                    value={inverter.description || ""}
                    disabled
                />

                {/* 
                <Field>
                    <Label>Transportes</Label>
                    <TextField
                        name="transports"
                        placeholder="Transportes"
                        value={values.transports}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.transports.length > 0}
                        helperText={errors.transports}
                    />
                </Field>

                <Field>
                    <Label>Legalización</Label>
                    <TextField
                        name="legalization"
                        placeholder="Legalización"
                        value={values.legalization}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.legalization.length > 0}
                        helperText={errors.legalization}
                    />
                </Field>

                <Field>
                    <Label>Tasas</Label>
                    <TextField
                        name="fees"
                        placeholder="Tasas"
                        value={values.fees}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.fees.length > 0}
                        helperText={errors.fees}
                    />
                </Field>

                <Field>
                    <Label>Visita técnica</Label>
                    <TextField
                        name="technicalVisit"
                        placeholder="Visita técnica"
                        value={values.technicalVisit}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.technicalVisit.length > 0}
                        helperText={errors.technicalVisit}
                    />
                </Field>

                <Field>
                    <Label>Costes captación</Label>
                    <TextField
                        name="acquisitionCosts"
                        placeholder="Costes captación"
                        value={values.acquisitionCosts}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.acquisitionCosts.length > 0}
                        helperText={errors.acquisitionCosts}
                    />
                </Field>

                <Field>
                    <Label>Costes operaciones</Label>
                    <TextField
                        name="operatingCosts"
                        placeholder="Costes operaciones"
                        value={values.operatingCosts}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.operatingCosts.length > 0}
                        helperText={errors.operatingCosts}
                    />
                </Field>

                <Field>
                    <Label>Coste mantenimiento</Label>
                    <TextField
                        name="maintenanceCost"
                        placeholder="Coste mantenimiento"
                        value={values.maintenanceCost}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                        error={errors.maintenanceCost.length > 0}
                        helperText={errors.maintenanceCost}
                    />
                </Field> */}
            </Group>

            {/* <LoadingButton
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
            </LoadingButton> */}
        </Form>
    );
};

export default FixedCosts;
