import { PanelsProvider } from "@features/dashboard/products/panels/context/PanelsProvider";
import { BatteriesProvider } from "@features/dashboard/products/batteries/context/BatteriesProvider";
import { InvertersProvider } from "@features/dashboard/products/inverters/context/InvertersProvider";
import { MicroinvertersProvider } from "@features/dashboard/products/microinverters/context/MicroinvertersProvider";
import { MetersProvider } from "@features/dashboard/products/meters/context/MetersProvider";
import { StructuresProvider } from "@features/dashboard/products/structures/context/StructuresProvider";
import { PeripheralsProvider } from "@features/dashboard/products/peripherals/context/PeripheralsProvider";

import Panels from "@pages/products/Panels";
import Batteries from "@pages/products/Batteries";
import Inverters from "@pages/products/Inverters";
import Microinverters from "@pages/products/Microinverters";
import Meters from "@pages/products/Meters";
import Structures from "@pages/products/Structures";
import Peripherals from "@pages/products/Peripherals";

const ProductsRoutes = [
    {
        element: <PanelsProvider />,
        children: [
            {
                path: "/paneles-solares",
                element: <Panels />,
            },
        ],
    },
    {
        element: <BatteriesProvider />,
        children: [
            {
                path: "/baterias",
                element: <Batteries />,
            },
        ],
    },
    {
        element: <InvertersProvider />,
        children: [
            {
                path: "/inversores",
                element: <Inverters />,
            },
        ],
    },
    {
        element: <MicroinvertersProvider />,
        children: [
            {
                path: "/microinversores",
                element: <Microinverters />,
            },
        ],
    },
    {
        element: <MetersProvider />,
        children: [
            {
                path: "/meters",
                element: <Meters />,
            },
        ],
    },
    {
        element: <StructuresProvider />,
        children: [
            {
                path: "/estructuras",
                element: <Structures />,
            },
        ],
    },
    {
        element: <PeripheralsProvider />,
        children: [
            {
                path: "/perifericos",
                element: <Peripherals />,
            },
        ],
    },
];

export default ProductsRoutes;
