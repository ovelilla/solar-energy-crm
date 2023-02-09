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
import currencyFormat from "@utils/currencyFormat";

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
        microinverters,
        meters,
        structures,
        peripherals,
        lines,
        protections,
        fixedCosts,
    } = usePriceSimulator();

    const strings = values.modules > 11 ? 2 : 1;
    const panel = panels.find((panel) => panel._id === values.panel) || {};
    const panelsPower = values.modules * panel.power || 0;
    const panelsPrice = values.modules * panel.price || 0;
    const inverter =
        inverters.find((inverter) => {
            return (
                inverter.minCC <= panelsPower &&
                inverter.maxCC >= panelsPower &&
                inverter.current === values.current
            );
        }) || {};
    const inverterPrice = values.rate === "String" ? inverter.price : 0;
    const microinverter =
        microinverters.find((microinverter) => {
            return (
                microinverter.minCC <= panel.power &&
                microinverter.maxCC >= panel.power &&
                microinverter.current === values.current
            );
        }) || {};
    const microinverterPrice =
        values.rate === "Microinversor" ? microinverter.price * values.modules : 0;
    const meter =
        meters.find((meter) => {
            return (
                meter.minPanels <= values.modules &&
                meter.maxPanels >= values.modules &&
                meter.type === values.rate &&
                meter.current === values.current
            );
        }) || {};
    const meterPrice = meter.price || 0;
    const structure = structures.find((structure) => structure.type === values.structure) || {};
    const structurePrice = panelsPower * structure.price || 0;
    const activePeripherals = peripherals.filter((peripheral) => {
        return peripheral.active && peripheral.type === values.rate;
    });
    const peripheralsPrice = activePeripherals.reduce((acc, peripheral) => {
        return acc + peripheral.price;
    }, 0);
    const equipmentPrice =
        panelsPrice +
            inverterPrice +
            microinverterPrice +
            meterPrice +
            structurePrice +
            peripheralsPrice || 0;
    const line =
        lines.find((line) => {
            return line.minPower <= panelsPower && line.maxPower >= panelsPower;
        }) || {};
    const linePrice = line.price || 0;
    const installationPrice = linePrice * panelsPower || 0;
    const protectionAC =
        protections.find((protection) => {
            return protection.protectionType === "AC" && protection.current === values.current;
        }) || {};
    const protectionACPrice = protectionAC.price || 0;
    const protectionDC =
        protections.find((protection) => {
            return (
                protection.installationType === values.rate && protection.protectionType === "DC"
            );
        }) || {};
    const protectionDCPrice = values.rate === "String" ? protectionDC.price * strings : 0;
    const protectionsPrice = protectionACPrice + protectionDCPrice;
    const additionalString =
        values.rate === "String" && values.modules > 11 ? fixedCosts.additionalString : 0;
    const PMCost = fixedCosts.PMCost * values.modules || 0;
    const transportCost = fixedCosts.transports * values.modules || 0;
    const legalizationCost = fixedCosts.legalization || 0;
    const feesCost = fixedCosts.fees || 0;
    const technicalVisitCost = fixedCosts.technicalVisit || 0;
    const acquisitionCosts = fixedCosts.acquisitionCosts || 0;
    const operatingCosts = fixedCosts.operatingCosts || 0;
    const maintenanceCost = fixedCosts.maintenanceCost || 0;
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
            maintenanceCost || 0;
    const index = equipmentPrice / fixedCosts.index || 0;
    const netPrice = totalCosts / fixedCosts.netPrice || 0;
    const supplementAdjustment = netPrice - index || 0;
    const pvp = netPrice + (netPrice * fixedCosts.ivaRate) / 100 || 0;
    const profit = netPrice - totalCosts || 0;

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

                <div>
                    <p>
                        <b>Tarifa</b>
                    </p>

                    <ul>
                        {values.modules &&
                            values.rate &&
                            values.current &&
                            values.structure &&
                            values.panel && (
                                <>
                                    {totalCosts !== 0 && (
                                        <li>
                                            <b>Coste total - {currencyFormat(totalCosts)}</b>
                                        </li>
                                    )}
                                    {index !== 0 && <li>Index - {currencyFormat(index)}</li>}
                                    {netPrice !== 0 && (
                                        <li>Precio neto - {currencyFormat(netPrice)}</li>
                                    )}
                                    {supplementAdjustment !== 0 && (
                                        <li>
                                            Supl. Ajuste - {currencyFormat(supplementAdjustment)}
                                        </li>
                                    )}
                                    {pvp !== 0 && (
                                        <li>
                                            <b>PVP IVA - {currencyFormat(pvp)}</b>
                                        </li>
                                    )}
                                    {profit !== 0 && <li>Margen - {currencyFormat(profit)}</li>}
                                </>
                            )}
                    </ul>

                    <p>
                        <b>Resumen equipamiento</b>
                    </p>
                    <ul>
                        {values.modules && (
                            <li>
                                <b>Módulos - {values.modules}</b>
                            </li>
                        )}
                        {values.rate && <li>Tarifa - {values.rate}</li>}
                        {values.modules && values.rate === "String" && <li>Strings - {strings}</li>}
                        {values.current && <li>Corriente - {values.current}</li>}
                        {values.structure && (
                            <li>
                                Estuctura - {values.structure}
                                {structure.description && (
                                    <ul>
                                        <li>€/wp - {structure.price} €</li>
                                        {structurePrice !== 0 && (
                                            <li>
                                                <b>
                                                    Coste estructura -{" "}
                                                    {currencyFormat(structurePrice)}
                                                </b>
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </li>
                        )}
                        {panel.description && (
                            <li>
                                Panel - {panel.description}
                                <ul>
                                    <li>Potencia - {panel.power} W</li>
                                    <li>Precio - {currencyFormat(panel.price)}</li>
                                    {panelsPower !== 0 && (
                                        <li>
                                            <b>Potencia paneles - {panelsPower} W</b>
                                        </li>
                                    )}
                                    {panelsPrice !== 0 && (
                                        <li>
                                            <b>Coste paneles - {currencyFormat(panelsPrice)}</b>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        )}
                        {values.rate === "String" && inverter.description && (
                            <li>
                                Inversor - {inverter.description}
                                <ul>
                                    <li>Potencia - {inverter.power} W</li>
                                    <li>
                                        <b>Precio - {currencyFormat(inverter.price)}</b>
                                    </li>
                                </ul>
                            </li>
                        )}
                        {values.rate === "Microinversor" && microinverter.description && (
                            <li>
                                Microinversor - {microinverter.description}
                                <ul>
                                    <li>Potencia - {microinverter.power} W</li>
                                    <li>Precio - {microinverter.price} €</li>
                                    {microinverterPrice !== 0 && (
                                        <li>
                                            <b>
                                                Coste microinversores -{" "}
                                                {currencyFormat(microinverterPrice)}
                                            </b>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        )}
                        {meter.description && (
                            <li>
                                Meter - {meter.description}
                                <ul>
                                    <li>
                                        Rango - {meter.minPanels} a {meter.maxPanels} paneles
                                    </li>
                                    <li>
                                        <b>Coste - {currencyFormat(meter.price)}</b>
                                    </li>
                                </ul>
                            </li>
                        )}
                        {activePeripherals.length > 0 && (
                            <li>
                                Periféricos:
                                {activePeripherals.map((peripheral) => (
                                    <ul key={peripheral._id}>
                                        <li>
                                            {peripheral.description}
                                            <ul>
                                                <li>
                                                    <b>Coste - {currencyFormat(peripheral.price)}</b>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                ))}
                            </li>
                        )}
                        {equipmentPrice !== 0 && (
                            <li>
                                <b>Coste total equipamiento - {currencyFormat(equipmentPrice)}</b>
                            </li>
                        )}
                    </ul>

                    <p>
                        <b>Resumen instalación</b>
                    </p>
                    <ul>
                        {line.description && (
                            <li>
                                Partida - {line.description}
                                <ul>
                                    <li>
                                        Rango - {line.minPower} a {line.maxPower} W
                                    </li>
                                    <li>Coste {currencyFormat(line.price)}</li>
                                    <li>
                                        <b>Coste instalación {currencyFormat(installationPrice)}</b>
                                    </li>
                                </ul>
                            </li>
                        )}
                        {(protectionDC.description || protectionAC.description) && (
                            <li>
                                Protecciones:
                                <ul>
                                    {protectionDC.description && (
                                        <li>
                                            {protectionDC.description}:
                                            <ul>
                                                <li>Corriente {protectionDC.current}</li>
                                                <li>
                                                    <b>Coste {currencyFormat(protectionDC.price)}</b>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
                                    {protectionAC.description && (
                                        <li>
                                            {protectionAC.description}:
                                            <ul>
                                                <li>Corriente {protectionAC.current}</li>
                                                <li>
                                                    <b>Coste {currencyFormat(protectionAC.price)}</b>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
                                </ul>
                            </li>
                        )}
                        {additionalString !== 0 && (
                            <li>
                                <b>String adicional: {additionalString}</b>
                            </li>
                        )}
                        {values.modules &&
                            values.rate &&
                            values.current &&
                            values.structure &&
                            values.panel && (
                                <li>
                                    Costes fijos:
                                    <ul>
                                        <li>Costes PM - {currencyFormat(PMCost)}</li>
                                        <li>Transporte - {currencyFormat(transportCost)}</li>
                                        <li>Legalización - {currencyFormat(legalizationCost)}</li>
                                        <li>Tasas - {currencyFormat(feesCost)}</li>
                                        <li>Visita técnica - {currencyFormat(technicalVisitCost)}</li>
                                        <li>Costes captación - {currencyFormat(acquisitionCosts)}</li>
                                        <li>Costes operaciones - {currencyFormat(operatingCosts)}</li>
                                        <li>
                                            Costes mantenimiento - {currencyFormat(maintenanceCost)}
                                        </li>
                                    </ul>
                                </li>
                            )}
                    </ul>
                </div>
            </Group>
        </Form>
    );
};

export default FixedCosts;
