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
import { Form, Group, Row } from "./styles";

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
    const panelsPower = parseInt(values.modules) * panel.power;
    const panelsPrice = parseInt(values.modules) * panel.price;
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
    console.log(installationPrice);
    const ACProtection =
        protections.find((protection) => {
            return protection.protectionType === "AC" && protection.current === values.current;
        }) || {};
    const ACProtectionPrice = ACProtection.price;
    console.log(ACProtectionPrice);
    const DCProtection = protections.find((protection) => protection.protectionType === "DC") || {};
    const DCProtectionPrice = values.rate === "String" ? DCProtection.price * strings : 0;
    console.log(DCProtectionPrice);
    const protectionsPrice = ACProtectionPrice + DCProtectionPrice;
    const additionalString =
        values.rate === "String" && values.modules > 11 ? fixedCosts.additionalString : 0;
    const PMCost = fixedCosts.PMCost * values.modules;
    const transportCost = fixedCosts.transports * values.modules;
    const legalizationCost = fixedCosts.legalization;
    const feesCost = fixedCosts.fees;
    const technicalVisitCost = fixedCosts.technicalVisit;
    const acquisitionCosts = fixedCosts.acquisitionCosts;
    const operatingCosts = fixedCosts.operatingCosts;
    const maintenanceCost = fixedCosts.maintenanceCost;
    const totalCosts =
        equipmentPrice +
        installationPrice +
        protectionsPrice +
        additionalString +
        PMCost +
        transportCost +
        legalizationCost +
        feesCost +
        technicalVisitCost +
        acquisitionCosts +
        operatingCosts +
        maintenanceCost;
    const index = equipmentPrice / fixedCosts.index;
    const netPrice = totalCosts / fixedCosts.netPrice;
    const supplementAdjustment = netPrice - index;
    const pvp = netPrice + (netPrice * fixedCosts.ivaRate) / 100;
    const profit = netPrice - totalCosts;

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

                <Row>
                    <FormControl error={errors.rate.length > 0} sx={{ flex: "1 1 50%" }}>
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
                        <TextField
                            name="strings"
                            label="Strings"
                            value={strings}
                            disabled
                            sx={{ flex: "1 1 50%" }}
                        />
                    )}
                </Row>

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

                <div>
                    <span>{totalCosts || 0}</span>
                    <br />
                    <span>{pvp || 0}</span>
                    <br />
                    <span>{profit || 0}</span>
                </div>
            </Group>
        </Form>
    );
};

export default FixedCosts;
