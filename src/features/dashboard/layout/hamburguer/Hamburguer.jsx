import { Container, Span } from "./styles";

const Hamburguer = ({ open }) => {
    return (
        <Container>
            <Span open={open} />
            <Span open={open} />
            <Span open={open} />
        </Container>
    );
};

export default Hamburguer;
