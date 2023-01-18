import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { white, slate } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const StyledLogout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: ${slate[50]};
    padding: 16px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 32px 48px;
    background-color: ${white};
    box-shadow: ${shadows.md};
    border-radius: 16px;

    ${media(breakpoints.md)} {
        padding: 48px 64px;
    }

    ${media(breakpoints.xl)} {
        padding: 56px 96px;
    }
`;

export const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #324475;
    color: ${white};

    svg {
        width: 32px;
        height: 32px;
    }
`;

export const Title = styled.h2`
    text-align: center;
`;

export const Text = styled.p`
    font-size: 16px;
    color: ${slate[500]};
    text-align: center;
`;
