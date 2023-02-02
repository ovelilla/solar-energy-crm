import AnimatedSuccess from "@icons/AnimatedSuccess";
import { StyledAlert, Header, Body, Title, Message } from "./styles";
import useUI from "@hooks/useUI";

const Alert = () => {
    const { stateAlert } = useUI();

    return (
        <StyledAlert onClose={() => {}} open={stateAlert.open}>
            <Header>
                <AnimatedSuccess />
            </Header>

            <Body>
                <Title>{stateAlert.title}</Title>
                <Message>{stateAlert.message}</Message>
            </Body>
        </StyledAlert>
    );
};

export default Alert;
