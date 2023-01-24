import Wrapper from "@features/dashboard/proposal/parameters/wrapper";
import Header from "@features/dashboard/proposal/parameters/header";
import Body from "@features/dashboard/proposal/parameters/body";
import Tabs from "@features/dashboard/proposal/parameters/tabs";

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
