import { useEffect } from "react";
import Wrapper from "@features/dashboard/management/price-simulator/wrapper";
import Header from "@features/dashboard/management/price-simulator/header";
import Body from "@features/dashboard/management/price-simulator/body";
import Form from "@features/dashboard/management/price-simulator/form";
import Alert from "@features/ui/alert";
import Confirm from "@features/ui/confirm";

import useWindowSize from "@hooks/useWindowSize";
import usePriceSimulator from "@features/dashboard/management/price-simulator/hooks/usePriceSimulator";

const PriceSimulator = () => {
    const { width } = useWindowSize();
    const { readData } = usePriceSimulator();

    useEffect(() => {
        readData();
    }, []);

    return (
        <>
            <Alert />
            <Confirm />
            <Wrapper>
                {width > 468 && <Header />}

                <Body>
                    <Form />
                </Body>
            </Wrapper>
        </>
    );
};

export default PriceSimulator;
