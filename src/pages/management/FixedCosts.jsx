import { useEffect } from "react";

import useFixedCosts from "@features/dashboard/management/fixed-costs/hooks/useFixedCosts";

import Wrapper from "@features/dashboard/management/fixed-costs/wrapper";
import Header from "@features/dashboard/management/fixed-costs/header";
import Body from "@features/dashboard/management/fixed-costs/body";
import Tabs from "@features/dashboard/management/fixed-costs/tabs";
import Alert from "@features/ui/alert";
import Confirm from "@features/ui/confirm";

import useWindowSize from "@hooks/useWindowSize";

const FixedCosts = () => {
    const { width } = useWindowSize();
    const { values, readFixedCosts, checkChanges } = useFixedCosts();

    useEffect(() => {
        readFixedCosts();
    }, []);

    useEffect(() => {
        checkChanges();
    }, [values]);

    return (
        <>
            <Alert />
            <Confirm />
            <Wrapper>
                {width > 468 && <Header />}

                <Body>
                    <Tabs />
                </Body>
            </Wrapper>
        </>
    );
};

export default FixedCosts;
