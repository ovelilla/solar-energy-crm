// import { PanelsProvider } from "@features/dashboard/products/habit/context/PanelsProvider";
import { BatteriesProvider } from "@features/dashboard/products/batteries/context/BatteriesProvider";
// import { InvertersProvider } from "@features/dashboard/products/orientation/context/InvertersProvider";

// import Panels from "@pages/products/Panels";
import Batteries from "@pages/products/Batteries";
// import Inverters from "@pages/products/Inverters";

const ProductsRoutes = [
    // {
    //     element: <PanelsProvider />,
    //     children: [
    //         {
    //             path: "/paneles-solares",
    //             element: <Panels />,
    //         },
    //     ],
    // },
    {
        element: <BatteriesProvider />,
        children: [
            {
                path: "/baterias",
                element: <Batteries />,
            },
        ],
    },
    // {
    //     element: <InvertersProvider />,
    //     children: [
    //         {
    //             path: "/inversores",
    //             element: <Inverters />,
    //         },
    //     ],
    // },
];

export default ProductsRoutes;
