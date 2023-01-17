import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 26px;
    height: 26px;
    line-height: 26px;
`;

export const Span = styled.div`
    display: block;
    height: 3px;
    background: #495057;
    border-radius: 6px;
    transition: width 0.3s ease, transform 0.3s ease;

    &:nth-of-type(1) {
        width: 80%;
    }

    &:nth-of-type(2) {
        width: 100%;
    }

    &:nth-of-type(3) {
        width: 60%;
    }

    ${(p) => {
        if (p.open) {
            return `
                &:nth-of-type(1) {
                    transform-origin: bottom;
                    width: 50%;
                    transform: rotatez(45deg) translate(2.5px, 1.5px);
                }

                &:nth-of-type(2) {
                    transform: rotatez(-45deg);
                }

                &:nth-of-type(3) {
                    transform-origin: bottom;
                    width: 50%;
                    transform: translate(10px, -4px) rotatez(45deg);
                }
            `;
        }
    }}
`;

const Hamburguer = () => {
    return (
        <Container>
            <Span></Span>
            <Span></Span>
            <Span></Span>
        </Container>
    );
};

export default Hamburguer;
