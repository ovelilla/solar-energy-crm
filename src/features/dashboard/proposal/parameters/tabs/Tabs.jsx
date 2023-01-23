import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TabContainer } from "./styles";
import { Consumption, Requirements, Installation } from "@features/dashboard/proposal/parameters/form";

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
            <TabPanel value="1">
                <Consumption />
            </TabPanel>
            <TabPanel value="2">
                <Requirements />
            </TabPanel>
            <TabPanel value="3">
                <Installation />
            </TabPanel>
        </TabContext>
    );
};

export default Tabs;
