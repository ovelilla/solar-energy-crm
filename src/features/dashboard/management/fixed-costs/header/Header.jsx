import { HeaderStyled, Container, Content, Text, Title, Subtitle } from "./styles";

const Header = () => {
    return (
        <HeaderStyled>
            <Container>
                <Content>
                    <Text>
                        <Title>Gastos fijos</Title>
                        <Subtitle>Gestiona los gastos fijos</Subtitle>
                    </Text>
                </Content>
            </Container>
        </HeaderStyled>
    );
};

export default Header;
