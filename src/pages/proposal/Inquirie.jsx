import Wrapper from "@features/dashboard/proposal/inquirie/wrapper";
import Header from "@features/dashboard/proposal/inquirie/header";
import Body from "@features/dashboard/proposal/inquirie/body";
import Summary from "@features/dashboard/proposal/inquirie/summary";

const Inquirie = () => {
    return (
        <Wrapper>
            <Header />
            <Body>
                <Summary />
            </Body>
        </Wrapper>
    );
};

export default Inquirie;
