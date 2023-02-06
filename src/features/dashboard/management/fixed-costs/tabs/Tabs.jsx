import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TabContainer } from "./styles";
import { FixedCosts, Factors, Taxes } from "@features/dashboard/management/fixed-costs/form";

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
                </TabList>
            </TabContainer>
            <TabPanel value="1">
                <FixedCosts />
            </TabPanel>
            <TabPanel value="2">
                <Factors />
            </TabPanel>
            <TabPanel value="3">
                <Taxes />
            </TabPanel>
        </TabContext>
    );
};

export default Tabs;
