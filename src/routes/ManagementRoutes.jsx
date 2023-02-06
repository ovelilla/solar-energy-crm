import { FixedCostsProvider } from "@features/dashboard/management/fixed-costs/context/FixedCostsProvider";
// import { PriceSimulatorProvider } from "@features/dashboard/management/price-simulator/context/PriceSimulatorProvider";

import FixedCosts from "@pages/management/FixedCosts";
import PriceSimulator from "@pages/management/PriceSimulator";

const ProductsRoutes = [
    {
        element: <FixedCostsProvider />,
        children: [
            {
                path: "/gastos-fijos",
                element: <FixedCosts />,
            },
        ],
    },
    // {
    //     element: <PriceSimulatorProvider />,
    //     children: [
            {
                path: "/simulador-tarifas",
                element: <PriceSimulator />,
            },
    //     ],
    // },
];

export default ProductsRoutes;
