import styled from "@emotion/styled";
import { white } from "@styles/colors";
import { breakpoints, media } from "@styles/sizes";

export const BodyStyled = styled.div`
    display: flex;
    justify-content: center;
    flex: 1 1 auto;
    background-color: ${white};
`;

export const Container = styled.div`
    width: 100%;
    padding: 24px;

    ${media(breakpoints.md)} {
        padding: 32px;
    }
`;
