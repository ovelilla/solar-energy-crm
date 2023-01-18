import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { white, slate, gray } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 32px 0;
    background-color: ${slate[100]};
`;

export const Avatar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: ${slate[300]};

    svg {
        width: 32px;
        height: 32px;
        color: ${white};
    }
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    border-bottom: 1px solid ${slate[200]};
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px 0;
`;

export const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 16px;
    height: 48px;
    padding: 0 16px;
    color: ${slate[600]};
    -webkit-tap-highlight-color: transparent;

    &:hover {
        background-color: ${slate[50]};
    }

    &:active {
        background-color: ${slate[100]};
    }

    svg {
        width: 22px;
        height: 22px;
        color: ${slate[400]};
    }
`;
