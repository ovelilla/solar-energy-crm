import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SummaryStyled, Section, Title, Ul, Li, LiBold } from "./styles";
import useProposal from "@features/dashboard/proposal/hooks/useProposal";
import dateTimeFormat from "@utils/dateTimeFormat";
import currencyFormat from "@utils/currencyFormat";

const Summary = () => {
    const { loading, proposal, readProposal } = useProposal();
    const { id } = useParams();

    useEffect(() => {
        readProposal(id);
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <SummaryStyled>
            <Section>
                <Title>Información general</Title>
                <Ul>
                    <Li>ID: {proposal._id}</Li>
                    <Li>IP del cliente: {proposal.clientIp}</Li>
                    <Li>Número de actualizaciones: {proposal.counter}</Li>
                    <Li>Fecha de creación: {dateTimeFormat(proposal.createdAt)}</Li>
                    <Li>Fecha de actualización: {dateTimeFormat(proposal.updatedAt)}</Li>
                </Ul>
            </Section>

            <Section>
                <Title>Resumen económico</Title>
                <Ul>
                    <Li>Retorno de la inversión: {proposal.summary.economic.investmentReturn.toFixed(2)} años</Li>
                    <Li>IVA: {currencyFormat(proposal.summary.economic.iva)}</Li>
                    <LiBold>Total: {currencyFormat(proposal.summary.economic.total)}</LiBold>
                    <Li>Ayudas: {currencyFormat(proposal.summary.economic.helps)}</Li>
                </Ul>
            </Section>

            <Section>
                <Title>Ahorro</Title>
                <Ul>
                    <Li>Ahorro mensual: {currencyFormat(proposal.summary.savings.monthly)}</Li>
                    <Li>Ahorro anual: {currencyFormat(proposal.summary.savings.yearly)}</Li>
                    <Li>Ahorro en 25 años: {currencyFormat(proposal.summary.savings.yearly25)}</Li>
                </Ul>
            </Section>

            <Section>
                <Title>Ubicación</Title>
                <Ul>
                    <Li>ID API Google Maps: {proposal.address.placeId}</Li>
                    <Li>Direccion completa: {proposal.address.formattedAddress}</Li>
                    <Li>Latitud: {proposal.address.latitude}</Li>
                    <Li>Longitud: {proposal.address.longitude}</Li>
                    <Li>
                        Componentes:
                        <Ul>
                            <Li>Calle: {proposal.address.components.street || ""}</Li>
                            <Li>Número: {proposal.address.components.number || ""}</Li>
                            <Li>Código postal: {proposal.address.components.postcode || ""}</Li>
                            <Li>Localidad: {proposal.address.components.location || ""}</Li>
                            <Li>Ciudad: {proposal.address.components.city || ""}</Li>
                            <Li>
                                Comunidad autónoma: {proposal.address.components.community || ""}
                            </Li>
                            <Li>País: {proposal.address.components.country || ""}</Li>
                        </Ul>
                    </Li>
                </Ul>
            </Section>

            <Section>
                <Title>Datos de consumo</Title>
                <Ul>
                    <Li>
                        €/ última factua:{" "}
                        {currencyFormat(proposal.consumption.lastInvoiceEnergyCost)}
                    </Li>
                    <Li>
                        kWh consumidos ultima factura: {proposal.consumption.kWhConsumedLastBill}{" "}
                        kWh
                    </Li>
                    <Li>
                        Consumo mensual (si pone total anual kW dividir en 12):{" "}
                        {proposal.consumption.monthlyEnergyConsumption} kWh
                    </Li>
                    <Li>Potencia contratada en Kw: {proposal.consumption.contractedPowerInKW}</Li>
                    <Li>
                        Precio medio kW potencia contratada (anual):{" "}
                        {proposal.consumption.avgPriceKWContractedPowerAnnual} kW
                    </Li>
                    <Li>IVA aplicado en facturas (mensual): {proposal.consumption.ivaRate} %</Li>
                    <Li>
                        Factura con autoconsumo:{" "}
                        {currencyFormat(proposal.consumption.invoiceEnergyCostWithSolar)}
                    </Li>
                </Ul>
            </Section>

            <Section>
                <Title>Datos de instalación</Title>
                <Ul>
                    <Li>Orientación de la cubierta: {proposal.installation.roofOrientation}</Li>
                    <Li>Pendiente de la cubierta: {proposal.installation.panelSlope}º</Li>
                    <Li>Tipo de estructura: {proposal.installation.structureType}</Li>
                    <Li>Tipo de instalación: {proposal.installation.installationType}</Li>
                    <Li>Corriente: {proposal.installation.current}</Li>
                    <Li>Número de paneles: {proposal.installation.numberPanels}</Li>
                    <Li>
                        Radiación potencial anual por kW:{" "}
                        {proposal.installation.potentialRadiationPerkWYear} kWh
                    </Li>
                    <Li>Pérdidas del sistema: {proposal.installation.systemLoss} %</Li>
                    <Li>Hábito de consumo: {proposal.installation.consumptionHabit}</Li>
                    <Li>Tiene batería: {proposal.installation.hasBattery ? "Si" : "No"}</Li>
                    {proposal.installation.hasBattery && (
                        <Li>
                            Batería:
                            <Ul>
                                <Li>Capacidad: {proposal.installation.battery.capacity} kWh</Li>
                                <Li>Descripción: {proposal.installation.battery.description}</Li>
                                <Li>Módulos: {proposal.installation.battery.modules}</Li>
                                <Li>Precio: {proposal.installation.battery.price} €</Li>
                            </Ul>
                        </Li>
                    )}
                    <Li>Cobertura estimada: {proposal.installation.estimatedCoverage} %</Li>
                    <Li>
                        Autoconsumo estimado: {proposal.installation.estimatedSelfConsumption} %
                    </Li>
                    <Li>
                        Capacidad de generación real: {proposal.installation.realGenerationCapacity}{" "}
                        kWh
                    </Li>
                    <Li>
                        Capacidad de generación por radiación potencial:{" "}
                        {proposal.installation.generationCapacityPerPotentialRadiation.toFixed(2)} kWh
                    </Li>
                    <Li>Módulos estimados: {proposal.installation.estimatedModules} módulos</Li>
                    <Li>Potencia de instalación: {proposal.installation.installationPower} W</Li>
                    <Li>Potencia de instalación: {proposal.installation.installationPowerKw} kW</Li>
                    <Li>
                        Producción anual estimada:{" "}
                        {proposal.installation.installationProductionKwhYear.toFixed(2)} kWh
                    </Li>
                </Ul>
            </Section>

            <Section>
                <Title>Información de pago</Title>
                <Ul>
                    <Li>
                        Metodo de pago:{" "}
                        {(() => {
                            if (proposal.payment.method === "cash") return "Efectivo";
                            if (proposal.payment.method === "financing") return "Financiación";
                            if (proposal.payment.method === "rentañ") return "Alquiler";
                        })()}
                    </Li>
                    <Li>
                        Cuota mensual 60 meses:{" "}
                        {currencyFormat(proposal.payment.financing.monthlyFee60)}
                    </Li>
                    <Li>
                        Cuota mensual 120 meses:{" "}
                        {currencyFormat(proposal.payment.financing.monthlyFee120)}
                    </Li>
                </Ul>
            </Section>

            <Section>
                <Title>Información de PVGIS</Title>
                <Ul>
                    <Li>Producción anual estimada: {proposal.pvgis.totals.E_y} kWh</Li>
                    <Li>
                        Producción mensual estimada:{" "}
                        {proposal.pvgis.monthly.map((month) => (
                            <Ul>
                                <Li>
                                    Mes: {month.month} Producción: {month.E_m} kWh
                                </Li>
                            </Ul>
                        ))}
                    </Li>
                </Ul>
            </Section>
        </SummaryStyled>
    );
};

export default Summary;
