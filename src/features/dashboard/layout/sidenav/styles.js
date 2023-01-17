import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { breakpoints, media } from "@styles/sizes";
import { white, slate } from "@styles/colors";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    height: 64px;
    color: ${white};
    font-size: 20px;
    font-weight: 500;

    svg {
        width: 32px;
        height: 32px;
        color: rgb(147 197 253);
    }
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 16px;
`;

export const Group = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Subheader = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 16px;
`;

export const Title = styled.div`
    font-weight: 500;
    text-transform: uppercase;
    color: rgb(147 197 253);
`;

export const Subtitle = styled.div`
    font-size: 12px;
    color: ${slate[300]};
`;

export const Subbody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const ItemLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 16px;
    min-height: 48px;
    padding: 8px 16px;
    color: ${slate[300]};
    border-radius: 8px;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        background-color: ${slate[800]};
        color: ${white};

        svg {
            color: ${white};
        }
    }

    &:active {
        background-color: ${slate[700]};
    }

    svg {
        color: ${slate[400]};

        &:last-child {
            margin-left: auto;
            transition: transform 0.3s ease;
            transform: ${(p) => (p.open ? "rotate(90deg)" : "rotate(0deg)")};
        }
    }
`;

export const ItemButton = styled.button`
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    min-height: 48px;
    padding: 8px 16px;
    font-size: inherit;
    font-family: inherit;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    color: ${slate[300]};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        background-color: ${slate[800]};
        color: ${white};

        svg {
            color: ${white};
        }
    }

    &:active {
        background-color: ${slate[700]};
    }

    svg {
        color: ${slate[400]};

        &:last-child {
            margin-left: auto;
            transition: transform 0.3s ease;
            transform: ${(p) => (p.open ? "rotate(90deg)" : "rotate(0deg)")};
        }
    }
`;

export const Text = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Primary = styled.span``;

export const Secondary = styled.span`
    font-size: 12px;
    color: ${slate[400]};
`;

export const Submenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 4px;

    a {
        padding-left: 56px;
    }
`;
