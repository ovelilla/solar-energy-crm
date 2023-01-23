import { BodyStyled, Container } from "./styles";

const Body = ({ children }) => {
    return (
        <BodyStyled>
            <Container>{children}</Container>
        </BodyStyled>
    );
};

export default Body;
