import { HeaderStyled, Container, Content, Text, Title, Subtitle } from "./styles";

const Header = () => {
    return (
        <HeaderStyled>
            <Container>
                <Content>
                    <Text>
                        <Title>Parametros predefinidos</Title>
                        <Subtitle>Gestiona los parametros predefinidos</Subtitle>
                    </Text>
                </Content>
            </Container>
        </HeaderStyled>
    );
};

export default Header;
