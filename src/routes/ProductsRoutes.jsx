import { PanelsProvider } from "@features/dashboard/products/panels/context/PanelsProvider";
import { BatteriesProvider } from "@features/dashboard/products/batteries/context/BatteriesProvider";
import { InvertersProvider } from "@features/dashboard/products/inverters/context/InvertersProvider";
import { MetersProvider } from "@features/dashboard/products/meters/context/MetersProvider";

import Panels from "@pages/products/Panels";
import Batteries from "@pages/products/Batteries";
import Inverters from "@pages/products/Inverters";
import Meters from "@pages/products/Meters";

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
        element: <MetersProvider />,
        children: [
            {
                path: "/meters",
                element: <Meters />,
            },
        ],
    },
];

export default ProductsRoutes;
