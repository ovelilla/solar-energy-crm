import styled from "@emotion/styled";

import { breakpoints, media } from "@styles/sizes";
import { white, slate, gray } from "@styles/colors";

export const HeaderStyled = styled.div`
    display: flex;
    justify-content: center;
    background-color: ${white};
    border-bottom: 1px solid ${slate[100]};
`;

export const Container = styled.div`
    width: 100%;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;

    ${media(breakpoints.md)} {
        padding: 32px;
    }
`;

export const Text = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.4px;

    ${media(breakpoints.md)} {
        font-size: 32px;
    }
`;

export const Subtitle = styled.p`
    color: ${gray[500]};
`;
