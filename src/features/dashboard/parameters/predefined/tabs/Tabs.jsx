import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { TabContainer, StyledTabPanel } from "./styles";
import { Consumption, Requirements, Installation } from "@features/dashboard/parameters/predefined/form";

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
                    aria-label="Parameters tab"
                >
                    <Tab label="Datos factura" value="1" />
                    <Tab label="Necesidades cliente" value="2" />
                    <Tab label="Parametros instalación" value="3" />
                </TabList>
            </TabContainer>
            <StyledTabPanel value="1">
                <Consumption />
            </StyledTabPanel>
            <StyledTabPanel value="2">
                <Requirements />
            </StyledTabPanel>
            <StyledTabPanel value="3">
                <Installation />
            </StyledTabPanel>
        </TabContext>
    );
};

export default Tabs;
