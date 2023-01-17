import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { white, slate, gray } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const Main = styled.main`
    display: flex;
    flex: 1 1 auto;
    width: 100%;
    height: 100%;
    font-size: 16px;
`;

export const ColumnLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    flex: 1 1 50%;
    position: relative;
    padding: 32px;
    background-color: ${white};

    ${media(breakpoints.sm)} {
        justify-content: center;
        background-color: ${slate[50]};
    }

    ${media(breakpoints.lg)} {
        align-items: flex-end;
        padding: 96px;
        background-color: ${white};
    }
`;

export const ContainerLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    max-width: 640px;
    background-color: ${white};

    ${media(breakpoints.sm)} {
        max-width: 560px;
        padding: 48px;
        box-shadow: ${shadows.md};
        border-radius: 16px;
    }

    ${media(breakpoints.lg)} {
        max-width: 480px;
        padding: 0;
        box-shadow: none;
        border-radius: 0;
    }
`;

export const ColumnRight = styled.div`
    display: none;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 50%;
    position: relative;
    padding: 32px;
    background-color: ${slate[800]};

    ${media(breakpoints.lg)} {
        display: flex;
        padding: 96px;
    }

    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        g {
            color: ${slate[500]};
            opacity: 0.2;
        }
    }
`;

export const ContainerRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    z-index: 1;
    width: 100%;
    max-width: 640px;
`;

export const Title = styled.h1`
    display: flex;
    flex-direction: column;
    color: ${white};
    font-size: 48px;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -1px;
`;

export const Text = styled.p`
    color: ${gray[400]};
`;
