import { HeaderStyled, Container, Content, Text, Title, Subtitle } from "./styles";

const Header = () => {
    return (
        <HeaderStyled>
            <Container>
                <Content>
                    <Text>
                        <Title>Simulador de tarifas</Title>
                        <Subtitle>Comprueba el precio final de tu tarifa, costes, márgenes, etc.</Subtitle>
                    </Text>
                </Content>
            </Container>
        </HeaderStyled>
    );
};

export default Header;
