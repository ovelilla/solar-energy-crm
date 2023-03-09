import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { gray } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;

    ${media(breakpoints.md)} {
        padding: 16px;
    }
`;

export const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    ${media(breakpoints.md)} {
        gap: 16px;
    }
`;

export const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const Title = styled.p`
    font-size: 20px;
    letter-spacing: -0.4px;
    color: ${gray[900]};

    &::first-letter {
        text-transform: uppercase;
    }

    ${media(breakpoints.md)} {
        font-size: 24px;
    }
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const Hamburguer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 24px;
    height: 24px;

    &:hover div {
        background-color: ${gray[700]};
    }
`;

export const Bar = styled.div`
    height: 3px;
    border-radius: 3px;
    background-color: ${gray[600]};
`;
