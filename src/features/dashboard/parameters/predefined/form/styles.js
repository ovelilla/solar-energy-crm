import styled from "@emotion/styled";

import { breakpoints, media } from "@styles/sizes";
import { white } from "@styles/colors";

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

export const Title = styled.h2`
    font-size: 24px;
    font-weight: 500;
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Label = styled.div``;
