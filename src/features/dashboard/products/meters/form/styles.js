import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    ${media(breakpoints.sm)} {
        flex-direction: row;
    }

    & > div {
        flex: 1;
    }
`;
