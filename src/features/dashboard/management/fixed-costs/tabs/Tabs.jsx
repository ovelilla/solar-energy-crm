import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { TabContainer, StyledTabPanel } from "./styles";
import {
    FixedCosts,
    Factors,
    Taxes,
    Various,
} from "@features/dashboard/management/fixed-costs/form";

const Tabs = () => {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <TabContext value={value}>
            <TabContainer>
                <TabList
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons={false}
                    aria-label="Fixed Costs tab"
                >
                    <Tab label="Gastos fijos" value="1" />
                    <Tab label="Coeficientes" value="2" />
                    <Tab label="Impuestos" value="3" />
                    <Tab label="Varios" value="4" />
                </TabList>
            </TabContainer>
            <StyledTabPanel value="1">
                <FixedCosts />
            </StyledTabPanel>
            <StyledTabPanel value="2">
                <Factors />
            </StyledTabPanel>
            <StyledTabPanel value="3">
                <Taxes />
            </StyledTabPanel>
            <StyledTabPanel value="4">
                <Various />
            </StyledTabPanel>
        </TabContext>
    );
};

export default Tabs;
