import { useEffect } from "react";

import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import usePriceSimulator from "@features/dashboard/management/price-simulator/hooks/usePriceSimulator";
import {
    Container,
    Form,
    Group,
    Summary,
    Section,
    Title,
    UlPrimary,
    Ul,
    Li,
    LiBold,
} from "./styles";
import currencyFormat from "@utils/currencyFormat";

const FixedCosts = () => {
    const { loading, values, errors, handleChange, rate, getRate, panels } = usePriceSimulator();

    const { summary, equipment, installation, general } = rate || {};
    const { panel, inverter, microinverter, structure, meter, peripherals } = equipment || {};
    const { fixedCosts, line, protections, strings } = installation || {};

    useEffect(() => {
        getRate();
    }, [values]);

    return (
        <Container>
            <Form>
                <Group>
                    <TextField
                        name="modules"
                        label="Número de Módulos"
                        value={values.modules}
                        onChange={handleChange}
                        helperText={errors.modules}
                    />

                    <FormControl sx={{ flex: "1 1 50%" }}>
                        <InputLabel id="installationType-label">Tipo instalación</InputLabel>
                        <Select
                            labelId="installationType-label"
                            id="installationType"
                            value={values.installationType}
                            name="installationType"
                            label="Tipo instalación"
                            onChange={handleChange}
                        >
                            <MenuItem value={"String"}>String</MenuItem>
                            <MenuItem value={"Microinversor"}>Microinversor</MenuItem>
                        </Select>
                        <FormHelperText>{errors.installationType}</FormHelperText>
                    </FormControl>

                    <FormControl>
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

                    <FormControl>
                        <InputLabel id="structureType-label">Estructura</InputLabel>
                        <Select
                            labelId="structureType-label"
                            id="structureType"
                            value={values.structureType}
                            name="structureType"
                            label="Estructura"
                            onChange={handleChange}
                        >
                            <MenuItem value={"Coplanar"}>Coplanar</MenuItem>
                            <MenuItem value={"Inclinada"}>Inclinada</MenuItem>
                        </Select>
                        <FormHelperText>{errors.structureType}</FormHelperText>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="panelId-label">Panel</InputLabel>
                        <Select
                            labelId="panelId-label"
                            id="panelId"
                            value={values.panelId}
                            name="panelId"
                            label="Panel"
                            onChange={handleChange}
                        >
                            {panels.map((panel) => (
                                <MenuItem key={panel._id} value={panel._id}>
                                    {panel.description}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.panelId}</FormHelperText>
                    </FormControl>
                </Group>
            </Form>

            {rate && (
                <Summary>
                    <Section>
                        <Title>Resumen tarifa</Title>
                        <Ul>
                            <LiBold>Coste total - {currencyFormat(summary.totalCost)}</LiBold>
                            <Li>
                                Coste total con margen -{" "}
                                {currencyFormat(summary.totalCostWithMargin)}
                            </Li>
                            <Li>Coste total index - {currencyFormat(summary.index)}</Li>
                            <Li>Margen - {currencyFormat(summary.margin)}</Li>
                            <Li>Rentabilidad - {summary.profitability.toFixed(2)} %</Li>
                            <Li>Precio neto - {currencyFormat(summary.netPrice)}</Li>
                            <LiBold>PVP IVA - {currencyFormat(summary.pvp)}</LiBold>
                            <Li>Margen - {currencyFormat(summary.profit)}</Li>
                            <Li>Porcentage margen - {summary.percentageProfit.toFixed(2)} %</Li>
                            <Li>Euros por vatio - {currencyFormat(summary.eurosPerWatt)}/W</Li>
                        </Ul>
                    </Section>

                    <Section>
                        <Title>Resumen equipamiento</Title>
                        <UlPrimary>
                            <Li>
                                Panel:
                                <Ul>
                                    <Li>Descripción - {panel.description}</Li>
                                    <Li>Potencia - {panel.power} W</Li>
                                    <Li>Precio - {currencyFormat(panel.price)}</Li>
                                    <LiBold>Módulos - {panel.modules}</LiBold>
                                    <LiBold>Potencia total - {panel.totalPower} W</LiBold>
                                    <LiBold>
                                        Coste total - {currencyFormat(panel.totalPrice)}
                                    </LiBold>
                                </Ul>
                            </Li>

                            {inverter.hasInverter && (
                                <Li>
                                    Inversor:
                                    <Ul>
                                        <Li>Descripción - {inverter.description}</Li>
                                        <Li>Potencia - {inverter.power} W</Li>
                                        <Li>Rango - {inverter.range} W</Li>
                                        <LiBold>Precio - {currencyFormat(inverter.price)}</LiBold>
                                    </Ul>
                                </Li>
                            )}

                            {microinverter.hasMicroinverter && (
                                <Li>
                                    Micronversores:
                                    <Ul>
                                        <Li>Descripción - {microinverter.description}</Li>
                                        <Li>Potencia - {microinverter.power} W</Li>
                                        <Li>Rango - {microinverter.range} W</Li>
                                        <Li>
                                            Precio - {currencyFormat(microinverter.price)}
                                            /u
                                        </Li>
                                        <LiBold>Modulos - {microinverter.modules}</LiBold>
                                        <LiBold>
                                            Coste total - {currencyFormat(microinverter.totalPrice)}
                                        </LiBold>
                                    </Ul>
                                </Li>
                            )}

                            <Li>
                                Estructura:
                                <Ul>
                                    <Li>Descripción - {structure.description}</Li>
                                    <Li>Precio - {currencyFormat(structure.price)}/W</Li>
                                    <LiBold>
                                        Coste total - {currencyFormat(structure.totalPrice)}
                                    </LiBold>
                                </Ul>
                            </Li>

                            {meter.hasMeter && (
                                <Li>
                                    Meter:
                                    <Ul>
                                        <Li>Descripción - {meter.description}</Li>
                                        <Li>Rango - {meter.range} paneles</Li>
                                        <LiBold>Precio - {currencyFormat(meter.price)}/W</LiBold>
                                    </Ul>
                                </Li>
                            )}

                            {peripherals.activePeripherals.length > 0 && (
                                <Li>
                                    Periféricos:
                                    <Ul>
                                        {peripherals.activePeripherals.map((peripheral) => (
                                            <Li key={peripheral._id}>
                                                {peripheral.description}:
                                                <Ul>
                                                    <LiBold>
                                                        Coste - {currencyFormat(peripheral.price)}
                                                    </LiBold>
                                                </Ul>
                                            </Li>
                                        ))}

                                        <LiBold>
                                            Coste total - {currencyFormat(peripherals.totalPrice)}
                                        </LiBold>
                                    </Ul>
                                </Li>
                            )}

                            <LiBold>
                                Coste total equipamiento - {currencyFormat(equipment.total)}
                            </LiBold>
                        </UlPrimary>
                    </Section>

                    <Section>
                        <Title>Resumen instalación</Title>
                        <UlPrimary>
                            <Li>
                                Strings:
                                <Ul>
                                    <LiBold>Número de strings - {strings.stringsNumber}</LiBold>
                                    {strings.additionalStringNumber > 0 && (
                                        <>
                                            <Li>
                                                Strings adicionales -{" "}
                                                {strings.additionalStringNumber}
                                            </Li>
                                            <LiBold>
                                                Precio strings adicionales -{" "}
                                                {currencyFormat(strings.additionalStringPrice)}
                                            </LiBold>
                                        </>
                                    )}
                                </Ul>
                            </Li>

                            <Li>
                                Partida:
                                <Ul>
                                    <Li>Descripción - {line.description}</Li>
                                    <Li>Rango - {line.range} W</Li>
                                    <Li>Coste - {currencyFormat(line.price)}</Li>
                                    <LiBold>
                                        Coste instalación - {currencyFormat(line.installationCost)}
                                    </LiBold>
                                </Ul>
                            </Li>

                            <Li>
                                Protecciones:
                                <Ul>
                                    {protections.protectionDC.hasProtectionDC && (
                                        <Li>
                                            Protección DC:
                                            <Ul>
                                                <Li>
                                                    Corriente - {protections.protectionDC.current}
                                                </Li>
                                                <Li>
                                                    Coste -{" "}
                                                    {currencyFormat(protections.protectionDC.price)}
                                                </Li>
                                                <LiBold>
                                                    Coste total -{" "}
                                                    {currencyFormat(
                                                        protections.protectionDC.totalPrice
                                                    )}
                                                </LiBold>
                                            </Ul>
                                        </Li>
                                    )}

                                    {protections.protectionAC.hasProtectionAC && (
                                        <Li>
                                            Protección AC:
                                            <Ul>
                                                <Li>
                                                    Corriente - {protections.protectionAC.current}
                                                </Li>
                                                <LiBold>
                                                    Coste -{" "}
                                                    {currencyFormat(protections.protectionAC.price)}
                                                </LiBold>
                                            </Ul>
                                        </Li>
                                    )}

                                    <LiBold>
                                        Coste total - {currencyFormat(protections.totalPrice)}
                                    </LiBold>
                                </Ul>
                            </Li>

                            <Li>
                                Costes fijos:
                                <Ul>
                                    <Li>Costes PM - {currencyFormat(fixedCosts.PMCost)}</Li>
                                    <Li>Transporte - {currencyFormat(fixedCosts.transportCost)}</Li>
                                    <Li>
                                        Legalización - {currencyFormat(fixedCosts.legalizationCost)}
                                    </Li>
                                    <Li>Tasas - {currencyFormat(fixedCosts.feesCost)}</Li>
                                    <Li>
                                        Visita técnica -{" "}
                                        {currencyFormat(fixedCosts.technicalVisitCost)}
                                    </Li>
                                    <Li>
                                        Costes captación -{" "}
                                        {currencyFormat(fixedCosts.acquisitionCosts)}
                                    </Li>
                                    <Li>
                                        Costes operaciones -{" "}
                                        {currencyFormat(fixedCosts.operatingCosts)}
                                    </Li>
                                    <Li>
                                        Costes mantenimiento -{" "}
                                        {currencyFormat(fixedCosts.maintenanceCost)}
                                    </Li>
                                    <LiBold>
                                        Coste total - {currencyFormat(fixedCosts.total)}
                                    </LiBold>
                                </Ul>
                            </Li>
                        </UlPrimary>
                    </Section>
                </Summary>
            )}
        </Container>
    );
};

export default FixedCosts;
