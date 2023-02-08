import styled from "@emotion/styled";

import { breakpoints, media } from "@styles/sizes";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 720px;
`;

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${media(breakpoints.md)} {
        gap: 24px;
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${media(breakpoints.md)} {
        flex-direction: row;
        gap: 24px;
    }
`;

export const Title = styled.h2`
    font-size: 20px;
    font-weight: 500;

    ${media(breakpoints.md)} {
        font-size: 24px;
    }
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 4px;
`;

export const Label = styled.div``;
