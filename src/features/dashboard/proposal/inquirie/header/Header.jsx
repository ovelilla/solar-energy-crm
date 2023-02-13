import { HeaderStyled, Container, Content, Text, Title, Subtitle } from "./styles";

const Header = () => {
    return (
        <HeaderStyled>
            <Container>
                <Content>
                    <Text>
                        <Title>Consulta web</Title>
                        <Subtitle>Informe completo de la consulta web.</Subtitle>
                    </Text>
                </Content>
            </Container>
        </HeaderStyled>
    );
};

export default Header;
