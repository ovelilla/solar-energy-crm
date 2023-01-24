import Wrapper from "@features/dashboard/parameters/predefined/wrapper";
import Header from "@features/dashboard/parameters/predefined/header";
import Body from "@features/dashboard/parameters/predefined/body";
import Tabs from "@features/dashboard/parameters/predefined/tabs";

import useWindowSize from "@hooks/useWindowSize";

const Predefined = () => {
    const { width } = useWindowSize();

    return (
        <Wrapper>
            {width > 468 && <Header />}

            <Body>
                <Tabs />
            </Body>
        </Wrapper>
    );
};

export default Predefined;
